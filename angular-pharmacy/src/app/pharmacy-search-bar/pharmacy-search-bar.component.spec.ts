import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySearchBarComponent } from './pharmacy-search-bar.component';

describe('PharmacySearchBarComponent', () => {
  let component: PharmacySearchBarComponent;
  let fixture: ComponentFixture<PharmacySearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmacySearchBarComponent]
    });
    fixture = TestBed.createComponent(PharmacySearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
