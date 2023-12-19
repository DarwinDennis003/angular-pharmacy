import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyPopupComponent } from './pharmacy-popup.component';

describe('PharmacyPopupComponent', () => {
  let component: PharmacyPopupComponent;
  let fixture: ComponentFixture<PharmacyPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmacyPopupComponent]
    });
    fixture = TestBed.createComponent(PharmacyPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
