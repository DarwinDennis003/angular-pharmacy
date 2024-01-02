import { Component, OnInit, signal } from '@angular/core';
import { HEADER_DROPDOWNS, HeaderBtnConstants } from './pharmacy.constants';
import moment from 'moment'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogEmulatorComponent } from './dialog-emulator/dialog-emulator.component';
import { ResuableTableConfig } from './resuable-table/resuable-table.component';
@Component({
  selector: 'app-pharmacy',
  templateUrl: './pharmacy.component.html',
  styleUrl: './pharmacy.component.scss'
})
export class PharmacyComponent implements OnInit{
  headerBtnConstants : any = HeaderBtnConstants ;
  public headerDropdowns : any = HEADER_DROPDOWNS ; 
  currentSelectedDate !: string ;
  public tableConfig : ResuableTableConfig = {
    renderSelectionBox : false ,
  }

  dummyColumn : any = ['Name' , "Age" , 'Sex'];
  dataSource : any = [{
    'Name' : 'darwin',
    'Age' : 23 ,
    'Sex' : 'Male'
    }]

  public pharmacyOrdersColumn : string[] = ['Doctor Name','Patient Name' ,'Gender' ,'Age' ,
                                            'Patient ID','Encounter Date','Order Status', 'Department',
                                            'Source'
                                          ]
  public pharmacyOrdersListColumn : string[] = ['Generic Name','Trade Name','Batch No','Expiry Date','Details','Stock',
                                                'Unit Price','Quantity','Total Price','Status'
                                          ]
  ngOnInit(): void {
    this.setCurrentDate();
  }

  constructor(
    private dialog : MatDialog ,
  ){

  }

  /* 
  Set current date to singal 
   */
  setCurrentDate(){
    this.currentSelectedDate=moment().format('MMMM DD, YYYY');
  }

  /**
   * This will update and change the selected date
   * @param event
   */
  onDateChangeEvent(event: any){
    this.currentSelectedDate = moment(event.value).format('MMMM DD, YYYY');  }

  /* 
  * Add date by a day 
   */

  onForwardBtnClicked(){
    let date = new Date(this.currentSelectedDate)
    date.setDate(date.getDate() + 1);
    this.currentSelectedDate = moment(date).format('MMMM DD, YYYY'); 
  }

  /* 
  Reduce date by a day
   */

  onBackwardBtnClicked(){
    let date = new Date(this.currentSelectedDate)
    date.setDate(date.getDate() - 1);
    this.currentSelectedDate = moment(date).format('MMMM DD, YYYY'); 
  }


  /* 
   */

 async  openOrderDetails(data : any){
    console.log(data,"data");
    let dialogInstance = await this.dialog.open(DialogEmulatorComponent,{
      panelClass : 'reusable-dialog-panel-class',
      data : {
        componentData : data ,
        tableConfig : {
          renderSelectionBox : true , 
          columnDef : this.pharmacyOrdersListColumn
        }
      } ,
    })

    let resFromDialog = await dialogInstance.afterClosed().toPromise() 
  }
}
