import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBookingComponent } from './patient-booking.component';

describe('PatientBookingComponent', () => {
  let component: PatientBookingComponent;
  let fixture: ComponentFixture<PatientBookingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PatientBookingComponent]
    });
    fixture = TestBed.createComponent(PatientBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
