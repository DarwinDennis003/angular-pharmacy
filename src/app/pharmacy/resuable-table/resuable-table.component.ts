import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
export interface ResuableTableConfig{
  renderSelectionBox ?: boolean ,
  columnDef ?: string[] 
}
@Component({
  selector: 'app-resuable-table',
  templateUrl: './resuable-table.component.html',
  styleUrl: './resuable-table.component.scss'
})


export class ResuableTableComponent implements OnInit{

  

  @Input() dataSource : any ;
  @Input() columnDef : any = []; 
  @Input() tableConfig !: ResuableTableConfig ;
  @Output() closeComponent : EventEmitter<any> = new EventEmitter();

  public matTableColumns : any ; 

  ngOnInit(): void {
  }

  

  constructor(){

  }

  

  emitCloseComponentEvent(row : any ){
    this.closeComponent.emit(row)
  }
}
