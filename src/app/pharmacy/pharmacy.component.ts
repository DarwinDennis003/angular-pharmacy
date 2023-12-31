import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { HEADER_DROPDOWNS, HeaderBtnConstants, PHARMACY_ORDERS_LIST_ITEMS_TABLE, PHARMACY_ORDERS_TABLE, PharmacyOrders, PharmacyOrdersListTable, PharmacyOrdersTable } from './pharmacy.constants';
import moment from 'moment'; 
import { MatDialog } from '@angular/material/dialog';
import { DialogEmulatorComponent } from './dialog-emulator/dialog-emulator.component';
import { ResuableTableConfig } from './resuable-table/resuable-table.component';
import { PharmacyService } from './pharmacy.service';
import { UtilityMethodService } from '../utils/utility-method.service';
import { Observable, Subscription } from 'rxjs';
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
    this.preloader()
  }

  /**
   *@constructor 
   * 
   */
  constructor(
    public dialog : MatDialog ,
    private pharmacyService : PharmacyService,
    private utils: UtilityMethodService
  ){

  }


  private preloader(){
    this.setCurrentDate();
    this.getOrdersByDate();
  }

  /**
   * @description Set current date 
   * @event onTodayBtnclicked
   * @callback getOrdersByDate
   */ 
  setCurrentDate(){
    this.currentSelectedDate=moment().format('MMMM DD, YYYY');
    this.getOrdersByDate()
  }


  /**
   * This will update and change the selected date
   * @param event
   * @callback getOrdersByDate
   */
  onDateChangeEvent(event: any){
    this.currentSelectedDate = moment(event.value).format('MMMM DD, YYYY');  
    this.getOrdersByDate()
  }


  /**
   * @description HTTP call for Pharmacy Orders
   * @callback returnFormattedDate
   * @callback tableDataSourceMapper
   * @callback getHeaderFilterValues
   * */ 
  getOrdersByDate() {
    let date : string = this.returnFormattedDate(this.currentSelectedDate);
    try {
      if (date) {
        let res = this.pharmacyService.getOrdersByDate(date).subscribe(
          {
            next : (res : PharmacyOrders[]) => {
              this.componentData = res
              this.tableDataSourceMapper(res)
              this.getHeaderFilterValues(res)
              console.log(res);
            },
            error : (err) => {console.log(err);
            this.componentData = []
            }
          }
        )
      } else {
        throw new Error("Date possibly undefined or null");
      }
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * @param {PharmacyOrders[]} res 
   * */
  tableDataSourceMapper(res : PharmacyOrders[]){
    this.matTabledataSource = res ; 
  }


  /**
   * @param {string} date
   * @returns {string} moment(date)
   * */ 
  returnFormattedDate(date: string) : string{
    return moment(date).format('YYYY-MM-DD')
  }

  
  /**
   * @event @description When forwardbtn event triggered
   * @callback getOrdersByDate 
   */
  onForwardBtnClicked(){
    let date = new Date(this.currentSelectedDate)
    date.setDate(date.getDate() + 1);
    this.currentSelectedDate = moment(date).format('MMMM DD, YYYY'); 
    this.getOrdersByDate()
  }

  
  /** 
  *@event @description When backwardBtn event triggered
  *@callback getOrdersByDate
  */
  onBackwardBtnClicked(){
    let date = new Date(this.currentSelectedDate)
    date.setDate(date.getDate() - 1);
    this.currentSelectedDate = moment(date).format('MMMM DD, YYYY'); 
    this.getOrdersByDate()
  }


  /**
  * @description Opens {DialogEmulatorComponent} component
  * @callback returnOrderID
  * @callback returnPharmacyOrderListItems
  * @callback dispensePharmacyItems
  */
 async  openOrderDetails(data:any){
    let orderID = this.returnOrderID(data)
    try {
    let listItems = await this.returnPharmacyOrderListItems(orderID);
    let dialogInstance  = await this.dialog.open(DialogEmulatorComponent,{
      minHeight: '41vw',
      minWidth: '90vw',
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
    let resFromDialog  = await dialogInstance.afterClosed().toPromise() 
    if(resFromDialog.length>1)
    this.dispensePharmacyItems(resFromDialog);  
    } catch (error) {
      console.error('Unable to open dialog component')
    }
    
  }

  /** 
  * @description Processor for returning OrderId
  * @param data
  * @returns drug_order_id
  */
  returnOrderID(data : any){
    return data.drug_order_id
     
  }

  /**
   * @type {Promise<any>}
   * @param orderID 
   * @returns {Promise}
   * @callback getOrderListItem
   * */ 
  returnPharmacyOrderListItems(orderID : string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.pharmacyService.getOrderListItem(orderID).subscribe(
        {
          next: (res) => {
            console.log(res, 'res');
            resolve(res);
          },
          error: (err: any) => {
            console.error(err);
            reject(err);
          },
        }
      );
    });
  }


  /**
   *  @param dispenseItems
   *  @callback dispensePharmacyItems
   * */ 
  dispensePharmacyItems(dispenseItems : any ){
    let sub:Subscription = this.pharmacyService.dispensePharmacyItems(dispenseItems).subscribe({
      next : (res) =>{console.log(res)},
      error : (error)=>{console.error(error)}
    })
    sub.unsubscribe();
    //trigger for getOrders API call
    this.setCurrentDate();
  }


  /**
   * @description Assign FilterDropdown values 
   * @param {any} res
   *  */ 
  getHeaderFilterValues( res : any){
    this.departments = this.utils.getUniquePropertyValues(res,'department')
    this.headerDropdowns[0].value = this.departments
    this.headerDropdowns[1].value = this.source
  }


  /**
   * @description Filter row items based on dropdown values
   * @param {string} source
   * @param {sring} value
   *  */
  onDropdownItemSelected(source  : string , value : string){
    let res = this.utils.almightyArrayFilter(this.componentData , source , value)
    this.tableDataSourceMapper(res);
  }

}
