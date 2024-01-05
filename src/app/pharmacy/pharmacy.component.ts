import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { HEADER_DROPDOWNS, HeaderBtnConstants, PHARMACY_ORDERS_LIST_ITEMS_TABLE, PHARMACY_ORDERS_TABLE, PharmacyOrders, PharmacyOrdersListTable, PharmacyOrdersTable } from './pharmacy.constants';
import moment from 'moment'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogEmulatorComponent } from './dialog-emulator/dialog-emulator.component';
import { ResuableTableConfig } from './resuable-table/resuable-table.component';
import { PharmacyService } from './pharmacy.service';
import { UtilityMethodService } from '../utils/utility-method.service';
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
  public matTabledataSource !: any;
  public pharmacyOrdersColumn : PharmacyOrdersTable[] = PHARMACY_ORDERS_TABLE;
  public pharmacyOrdersListColumn : PharmacyOrdersListTable[] = PHARMACY_ORDERS_LIST_ITEMS_TABLE;
  public departments : string [] = [];
  public source : string[] = ['IP','OP'];
  public componentData : any = []
  ngOnInit(): void {
    this.setCurrentDate();
  }

  constructor(
    private dialog : MatDialog ,
    private pharmacyService : PharmacyService,
    private utils: UtilityMethodService
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
    this.currentSelectedDate = moment(event.value).format('MMMM DD, YYYY');  
    this.getOrdersByDate()
  }

  /*
  API call for PharmacyOders 
   */
  getOrdersByDate(){
    let date : string = this.returnFormattedDate(this.currentSelectedDate);
    let res = this.pharmacyService.getOrdersByDate(date).subscribe(
      {
        next : (res : PharmacyOrders[]) => {
          this.componentData = res
          this.tableDataSourceMapper(res)
          this.getHeaderFilterValues(res)
          console.log(res);
        },
        error : (err) => {console.log(err);
        }
      }
    )
  }


  /* 
  Map api response to table datasource
   */

  tableDataSourceMapper(res : PharmacyOrders[]){
    this.matTabledataSource = res ; 
  }


  /* 
  Return the date in YYYY-MM-DD 
   */
  returnFormattedDate(date: string) : string{
    return moment(date).format('YYYY-MM-DD')
  }

  /* 
  * Add date by a day 
   */

  onForwardBtnClicked(){
    let date = new Date(this.currentSelectedDate)
    date.setDate(date.getDate() + 1);
    this.currentSelectedDate = moment(date).format('MMMM DD, YYYY'); 
    this.getOrdersByDate()
  }

  /* 
  Reduce date by a day
   */

  onBackwardBtnClicked(){
    let date = new Date(this.currentSelectedDate)
    date.setDate(date.getDate() - 1);
    this.currentSelectedDate = moment(date).format('MMMM DD, YYYY'); 
    this.getOrdersByDate()
  }


  /* 
  Open Order details dialog
   */

 async  openOrderDetails(data : any){
    let listItems = await this.returnPharmacyOrderListItems();
    let dialogInstance = await this.dialog.open(DialogEmulatorComponent,{
      panelClass : 'reusable-dialog-panel-class',
      data : {
        componentData : listItems ,
        tableConfig : {
          renderSelectionBox : true , 
          renderQuantityInputBox : true , 
          isEnableCalculations : true , 
          columnDef : this.pharmacyOrdersListColumn
        }
      } ,
    })

    let resFromDialog = await dialogInstance.afterClosed().toPromise() 
    if(resFromDialog)
    this.dispensePharmacyItems(resFromDialog);
  }


  /* 
  Return Order list for pharmacy order
   */
  returnPharmacyOrderListItems(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pharmacyService.getOrderListItem('ORD1231').subscribe(
        {
          next: (res) => {
            console.log(res, 'res');
            resolve(res);
          },
          error: (err: any) => {
            console.log(err);
            reject(err);
          },
        }
      );
    });
  }

  dispensePharmacyItems(dispenseItems : any ){
    this.pharmacyService.dispensePharmacyItems(dispenseItems).subscribe({
      next : (res) =>{console.log(res)},
      error : (error)=>{console.error(error)}
    })
  }

  /**
   * 
   * 
   *  */ 
  getHeaderFilterValues( res : any){
    this.departments = this.utils.getUniquePropertyValues(res,'department')
    this.headerDropdowns[0].value = this.departments
    this.headerDropdowns[1].value = this.source
  }


  /* 
   */

  onDropdownItemSelected(source  : string , value : string){
    let res = this.utils.almightyArrayFilter(this.componentData , source , value)
    this.tableDataSourceMapper(res);
  }

}
