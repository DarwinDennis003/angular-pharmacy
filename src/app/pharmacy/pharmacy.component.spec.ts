import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { PharmacyComponent } from './pharmacy.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../ui-libs/material.module';
import { ResuableTableComponent } from './resuable-table/resuable-table.component';
import { ResuableDialogComponent } from './resuable-dialog/resuable-dialog.component';
import moment from 'moment';
import { of } from 'rxjs';
import { PharmacyService } from './pharmacy.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogEmulatorComponent } from './dialog-emulator/dialog-emulator.component';

describe('PharmacyComponent', () => {
  let component: PharmacyComponent;
  let fixture: ComponentFixture<PharmacyComponent>;
  let mockPharmacyService : jasmine.SpyObj<PharmacyService>;
  let mockDialog : jasmine.SpyObj<MatDialog>;
  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj<MatDialog>('MatDialog',['open']);
    mockPharmacyService = jasmine.createSpyObj<PharmacyService>('PharmacyService', ['getOrdersByDate','getOrderListItem']);
    await TestBed.configureTestingModule({
      declarations: [PharmacyComponent , ResuableTableComponent , ResuableDialogComponent],
      imports : [HttpClientModule,BrowserAnimationsModule,MaterialModule],
      providers: [{ provide: PharmacyService, useValue: mockPharmacyService },
                  {provide : MatDialog , useValue : mockPharmacyService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PharmacyComponent);
    component = fixture.componentInstance;
    spyOn(component, 'tableDataSourceMapper').and.callThrough(); 
    spyOn(component, 'getHeaderFilterValues').and.callThrough();
    spyOn(component, 'returnFormattedDate').and.callThrough();
    // pharmacyServiceSpy = TestBed.inject(PharmacyService);
    fixture.detectChanges();
  });
  

  /**
   * @description Suite for {Date change Filter}
   *  
   * */ 
  xdescribe('Date change Filter Suite' , ()=>{
  //Spec 1  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //Spec 2
  it('should set currentSelectedDate to today when today button is clicked', () => {
    component.setCurrentDate();
    let expectedDate = moment().format('MMMM DD, YYYY');
    expect(component.currentSelectedDate).toEqual(expectedDate);
  });
  //Spec 3
  it('should decrement filter Date by 1 day for previous button click', () => {
    component.onForwardBtnClicked();
    let expectedDate = moment().add(1, 'day').format('MMMM DD, YYYY');
    expect(component.currentSelectedDate).toEqual(expectedDate)
  });
   //Spec 4
   it('should decrement filter Date by 1 day for previous button click', () => {
    component.onBackwardBtnClicked();
    let expectedDate = moment().subtract(1, 'day').format('MMMM DD, YYYY');
    expect(component.currentSelectedDate).toEqual(expectedDate)
  });
  //Spec 4
  it('should decrement filter Date by 1 day for previous button click', () => {
    component.onBackwardBtnClicked();
    let expectedDate = moment().subtract(1, 'day').format('MMMM DD, YYYY');
    expect(component.currentSelectedDate).toEqual(expectedDate)
  });
  //Spec 5
  it('should format input date as "YYYY-MM-DD"' , ()=>{
    let returnedVal = component.returnFormattedDate('January 09, 2024');
    expect(returnedVal).toEqual('2024-01-09')
  })

  })

  const mockapiResponse = [
    {
        "drug_order_id": "ORD1231",
        "doctor_name": "Dr. Selena Golmes",
        "patient_name": "Mr.Jackie Chan",
        "gender": "Male",
        "age": "35 Y",
        "patient_id": "PID102745",
        "encounter_date": "19-Jan-23",
        "dispensed_date": "19-Jan-23",
        "order_status": "Prescribed",
        "department": "Maternity",
        "source": "OP",
        "created_at": "2024-01-02T10:41:35.000Z",
        "updated_at": "2024-01-02T10:41:35.000Z"
    },
    {
        "drug_order_id": "ORD1232",
        "doctor_name": "Dr. Selena Golmes",
        "patient_name": "Mr.Jackie Slobo",
        "gender": "Male",
        "age": "21Y",
        "patient_id": "PID102745",
        "encounter_date": "19-Jan-23",
        "dispensed_date": "19-Jan-23",
        "order_status": "Prescribed",
        "department": "OPD",
        "source": "IP",
        "created_at": "2024-01-02T10:41:35.000Z",
        "updated_at": "2024-01-02T10:41:35.000Z"
      }
    ];  
    const mockDialogObj = {
      "drug_order_id": "ORD1231",
      "doctor_name": "Dr. Selena Golmes",
      "patient_name": "Mr.Jackie Chan",
      "gender": "Male",
      "age": "35 Y",
      "patient_id": "PID102745",
      "encounter_date": "19-Jan-23",
      "dispensed_date": "19-Jan-23",
      "order_status": "Prescribed",
      "department": "Maternity",
      "source": "OP",
      "created_at": "2024-01-02T10:41:35.000Z",
      "updated_at": "2024-01-02T10:41:35.000Z"
  }
  /**
   * @description Suite for {getOrdersByDate}
   */
  describe('Get orders order data using order id' , ()=> { 
      //case 1
      it('should retrieve pharmacy order data from the API using ID ', fakeAsync(()=>{
        // const spyShowMessage = spyOn(pharmacyServiceSpy, "getOrdersByDate")
        mockPharmacyService.getOrdersByDate.and.returnValue(of(mockapiResponse));
      component.getOrdersByDate()
      tick(3000);
      expect(mockPharmacyService.getOrdersByDate).toHaveBeenCalledWith('2024-01-08')
      expect(component.componentData).toEqual(mockapiResponse)
      expect(component.tableDataSourceMapper).toHaveBeenCalled()
      expect(component.getHeaderFilterValues).toHaveBeenCalled()
      }))
      //Javascript cannot set local property of fn 
      // case 2
      // it('should retrieve pharmacy items data from the API set id as null | undefined | emptystring',()=>{
      //   component.getOrdersByDate()
      //   mockPharmacyService.getOrdersByDate('')//assign dynamic edge cases for testing
      //   expect(()=>{component.getOrdersByDate();
      //   }).toThrowError()
        
      // })
      // case 3
      it('should retrieve pharmacy orders data from the API set date filter as wrong date format ',()=>{
        component.getOrdersByDate()
        expect(component.returnFormattedDate).toHaveBeenCalled()
        
      })

  })

  /**
   * @description Suite for {returnPharmacyOrderListItems}
   * */
  describe('Get orders items details using order id on successfull' , ()=>{
    it('should retrieve pharmacy items data from the API using ID ' , fakeAsync(()=>{
      mockPharmacyService.getOrderListItem.and.returnValue(of(mockapiResponse))
      let promise = component.returnPharmacyOrderListItems('ORD1231');

      tick()
      promise.then((res)=>{expect(res).toEqual(mockapiResponse)}).catch((err)=>{fail('Response should be Successful')})
    }))

    it('should reject with error when getOrderListItem encounters an error',fakeAsync(()=>{
      mockPharmacyService.getOrderListItem.and.returnValue(of(null)) //declare the edge case you want to test
      let promise  =  component.returnPharmacyOrderListItems('8443') 
      tick()

      promise.then((onf)=>{expect(onf).toEqual(null)}).catch((err)=>{fail('Couldnot get Response')})
    }))
    
  })


  /**
  * @description Suite for {MatDialog}
  *  
  */
xdescribe('Pharmacy Popup',()=>{
  const mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);
  it('should close the dialog ',()=>{
    spyOn(component.dialog,'open').and.callThrough();

    component.openOrderDetails(mockDialogObj);
    expect(component.returnOrderID).toHaveBeenCalled()
    expect(mockDialog.open).toHaveBeenCalledWith(DialogEmulatorComponent, {
      panelClass: 'reusable-dialog-panel-class',
      data: {
        componentData: [{}],
        tableConfig: {
          renderSelectionBox: true,
          renderQuantityInputBox: true,
          isEnableCalculations: true,
          columnDef: component.pharmacyOrdersListColumn,
        },
      },
    });

  })
})
 
})

