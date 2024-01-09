import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ResuableTableConfig } from '../resuable-table/resuable-table.component';
@Component({
  selector: 'app-resuable-dialog',
  templateUrl: './resuable-dialog.component.html',
  styleUrl: './resuable-dialog.component.scss'
})
export class ResuableDialogComponent implements OnInit{

  @Input() dialogdata : any = [];
  @Input() tableConfig !: ResuableTableConfig;
  @Output() closeDialog : EventEmitter<any> = new EventEmitter();
  @Output() emitToEmulator : EventEmitter<any>  = new EventEmitter();
  public columnDef !: string[] ;
  public emittedTableData : any ; 
  public dispensedDate !: string;



  ngOnInit(): void {
    this.dataResolver()
  }

  constructor(){
    
  }

  /**
   * @description Resolve input data 
   * */
  dataResolver(){
    this.dispensedDate = this.dialogdata[0]?.dispensed_date;
    this.columnDef = this.tableConfig?.columnDef || [];
  }

  /**
   * @description Close popup on @event closeDialog
   * */ 
  closePopup(){   
    this.closeDialog.emit();
  }

  /**
   * @description Handle data emitted by table component
   * @params data 
   * */ 
  handleTableDataEmission(data:any){
    this.emittedTableData = data ;
  }
  
  /**
   * @description Emit table data to emulator through @event emitToEmulator
   * */
  handleConfirmClickEvent(){
    this.emitToEmulator.emit(this.emittedTableData )
  }

}
