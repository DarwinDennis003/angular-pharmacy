import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEmulatorComponent } from './dialog-emulator.component';
import { ResuableDialogComponent } from '../resuable-dialog/resuable-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../ui-libs/material.module';
import { ResuableTableComponent } from '../resuable-table/resuable-table.component';

describe('DialogEmulatorComponent', () => {
  let component: DialogEmulatorComponent;
  let fixture: ComponentFixture<DialogEmulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEmulatorComponent,ResuableDialogComponent,ResuableTableComponent],
      imports : [MaterialModule],
      providers : [{provide:MAT_DIALOG_DATA,useValue : {}},
                    {provide : MatDialogRef , useValue : {}}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEmulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
