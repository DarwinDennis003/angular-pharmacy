import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PharmacyComponent } from './pharmacy.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../ui-libs/material.module';
import { ResuableTableComponent } from './resuable-table/resuable-table.component';
import { ResuableDialogComponent } from './resuable-dialog/resuable-dialog.component';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
