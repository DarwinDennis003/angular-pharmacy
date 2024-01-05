import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ResuableTableConfig } from '../resuable-table/resuable-table.component';
export interface DialogData{
  componentData : any ,
  tableConfig : ResuableTableConfig,
}
@Component({
  selector: 'app-dialog-emulator',
  templateUrl: './dialog-emulator.component.html',
  styleUrl: './dialog-emulator.component.scss'
})
export class DialogEmulatorComponent implements OnInit{

  public componentData : any ;
  public tableConfig !: ResuableTableConfig ;
  constructor(
    @Inject(MAT_DIALOG_DATA) public popupMetaData : DialogData ,
    public dialogRef: MatDialogRef<DialogEmulatorComponent>,
    public dialog : MatDialog ,
  ){
    
  }

  ngOnInit(): void {
    this.dataResolver()
  }


  /* 
   */

  dataResolver(){
    this.componentData = this.popupMetaData.componentData; 
    this.tableConfig  = this.popupMetaData.tableConfig || []; 

    console.log(this.componentData);
    
  }

 /* 
  */
 closeEmulatorAndDialog(data : any){
  this.dialogRef.close(data)
 }

 emitToParentComponent(data:any){
  this.closeEmulatorAndDialog(data)
 }



}
