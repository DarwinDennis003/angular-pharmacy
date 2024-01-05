import { Component, EventEmitter, Input, OnInit, Output, computed, inject, signal } from '@angular/core';
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
  // Your customn component calcuations goes here
 
  
  ngOnInit(): void 
  {
    this.inputDataResolver();
  }

  

  constructor(){

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.length;
    return numSelected === numRows;
  }

   /** Selects all rows if they are not all selected; otherwise clear selection. */
   toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
 
    this.selection.select(...this.dataSource);
  }

   /** The label for the checkbox on the passed row */
   checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


/**
 * Filter selected row data for dispense
 */
  filterItemsForDispense(rowItem : any){
    this.matSelectedData = this.selection.selected 
    this.dataEmitter.emit(this.matSelectedData)
  }

  inputDataResolver(){
    this.matTableDataSource = new MatTableDataSource<any>(this.dataSource);
    this.displayedColumns = this.columnDef.map((column: any) => column.id);
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
   *  
   * 
   * */
  calculateTotalPrice(row : any){    
    this.preProcessCalulationOperand(row);
    let totalPrice = computed(() => this.quantity() * this.unitPrice());
    row.total_price = totalPrice()
  }
  

  emitCloseComponentEvent(row : any ){
    this.closeComponent.emit(row)
  }

}