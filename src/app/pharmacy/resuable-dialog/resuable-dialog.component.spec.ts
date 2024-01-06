import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResuableDialogComponent } from './resuable-dialog.component';
import { ResuableTableComponent } from '../resuable-table/resuable-table.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../ui-libs/material.module';
import { DialogEmulatorComponent } from '../dialog-emulator/dialog-emulator.component';

describe('ResuableDialogComponent', () => {
  let component: ResuableDialogComponent;
  let fixture: ComponentFixture<ResuableDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResuableDialogComponent , ResuableTableComponent],
      imports : [MaterialModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResuableDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
