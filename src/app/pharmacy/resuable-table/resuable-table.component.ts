import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, computed, inject, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
export interface ResuableTableConfig{
  renderSelectionBox ?: boolean ,
  renderQuantityInputBox ?: boolean ,
  isEnableCalculations ? : boolean , 
  columnDef ?: string[] 
}
@Component({
  selector: 'app-resuable-table',
  templateUrl: './resuable-table.component.html',
  styleUrl: './resuable-table.component.scss'
})


export class ResuableTableComponent implements OnInit{

  

  @Input() dataSource : any = [];
  @Input() columnDef : any = []; 
  @Input() tableConfig !: ResuableTableConfig ;
  @Output() closeComponent : EventEmitter<any> = new EventEmitter();
  @Output() dataEmitter : EventEmitter<any> = new EventEmitter();
  selection = new SelectionModel<any>(true, []);
  public matTableDataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: any;
  matSelectedData:any

  public quantity = signal<number>(1);
  public unitPrice = signal<number>(1);
 
  
  ngOnInit(): void 
  {
    this.inputDataResolver();
  }


  /** 
   * @hook ngOnchanges
   * @description change detection on @var {dataSource}
   * */  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource'] && !changes['dataSource'].firstChange) {
      this.inputDataResolver();
    }

  }

  constructor(){

  }


  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

   /**
    *  @description Selects all rows if they are not all selected; otherwise clear selection. 
    * */
   toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    let rowsToSelect = this.dataSource.filter((row : any)=> !row.isDisabled);
  }

   /** 
    * @description The label for the checkbox on the passed row 
    * */
   checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


/**
 * @description Filter selected row data for dispense
 */
  filterItemsForDispense(rowItem : any){
    this.matSelectedData = this.selection.selected 
    this.dataEmitter.emit(this.matSelectedData)
  }

  /** 
  * @description Resolve component data for table 
  * @callback processInputDataForDOM
  */
  inputDataResolver(){
    let processedData = this.processInputDataForDOM(this.dataSource)
    this.matTableDataSource = new MatTableDataSource<any>(processedData);
    this.displayedColumns = this.columnDef?.map((column: any) => column.id);
  }

  /**
   *@description Your customn preprocessing goes here..
   * Only for DOM rendering purpose , No modify original data @var {this.dataSource}
   */ 
  processInputDataForDOM(data : any ){
    if(data)
    return data.forEach((x : any)=>{x.is_dispensed ?? (x.is_dispensed == 1 || x?.order_status == 'Dispensed') ? 
                    ( x.is_dispensed = 'Dispensed', x.isDisabled = true , x.colorClass = 'dispensed-bg-color') : 
                    (x.is_dispensed = 0) ? 
                    ( x.is_dispensed = 'Partially-dispensed' , x.isDisabled = false) : 
                    ( x.is_dispensed = 'Prescribed' , x.isDisabled = false)})
    
    else 
    return []
  }

  /**
   * Initialize calculations operands on @isEnableCalculations true  
   * Initialize your concerned signals here ..
   */ 
  preProcessCalulationOperand(row : any){ 
    this.quantity.set(row.quantity);
    this.unitPrice.set(row.drug_unit_price);
  }
   

  /**
   * @description Your customn calcuations goes...
   * @todo Add more dynamic calcs 
   * */
  calculateTotalPrice(row : any){    
    this.preProcessCalulationOperand(row);
    let totalPrice = computed(() => this.quantity() * this.unitPrice());
    row.total_price = totalPrice()
  }
  
  /**
   * @description emit @event closeComponent 
   * */ 
  emitCloseComponentEvent(row : any ){
    this.closeComponent.emit(row)
  }

}