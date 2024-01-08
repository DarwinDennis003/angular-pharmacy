import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PharmacyComponent } from './pharmacy.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../ui-libs/material.module';
import { ResuableTableComponent } from './resuable-table/resuable-table.component';
import { ResuableDialogComponent } from './resuable-dialog/resuable-dialog.component';
import moment from 'moment';

describe('PharmacyComponent', () => {
  let component: PharmacyComponent;
  let fixture: ComponentFixture<PharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PharmacyComponent , ResuableTableComponent , ResuableDialogComponent],
      imports : [HttpClientModule,BrowserAnimationsModule,MaterialModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  

  /**
   * @description Suite for {Date change Filter}
   *  
   * */ 
  describe('Date change Filter Suite' , ()=>{
  //Spec 1  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  //Spec 2
  xit('should set currentSelectedDate to today when today button is clicked', () => {
    component.setCurrentDate();
    let expectedDate = moment().format('MMMM DD, YYYY');
    expect(component.currentSelectedDate).toEqual(expectedDate);
  });
  //Spec 3
  xit('should decrement filter Date by 1 day for previous button click', () => {
    component.onForwardBtnClicked();
    let expectedDate = moment().add(1, 'day').format('MMMM DD, YYYY');
    expect(component.currentSelectedDate).toEqual(expectedDate)
  });
   //Spec 4
   xit('should decrement filter Date by 1 day for previous button click', () => {
    component.onBackwardBtnClicked();
    let expectedDate = moment().subtract(1, 'day').format('MMMM DD, YYYY');
    expect(component.currentSelectedDate).toEqual(expectedDate)
  });
  })
 
});
