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
  
  public columnDef !: string[] ;
  ngOnInit(): void {
    this.dataResolver()
  }

  constructor(){
    
  }

  dataResolver(){
    this.columnDef = this.tableConfig.columnDef || [];
  }

  closePopup(){   
    this.closeDialog.emit(this.dialogdata);
  }


}
