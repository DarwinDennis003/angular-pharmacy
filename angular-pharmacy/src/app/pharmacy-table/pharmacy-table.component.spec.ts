import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyTableComponent } from './pharmacy-table.component';

describe('PharmacyTableComponent', () => {
  let component: PharmacyTableComponent;
  let fixture: ComponentFixture<PharmacyTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmacyTableComponent]
    });
    fixture = TestBed.createComponent(PharmacyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
