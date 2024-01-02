import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PharmacyComponent } from './pharmacy.component';
import { MaterialModule } from '../ui-libs/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { ResuableTableComponent } from './resuable-table/resuable-table.component';
import { ResuableDialogComponent } from './resuable-dialog/resuable-dialog.component';
import { DialogEmulatorComponent } from './dialog-emulator/dialog-emulator.component';



@NgModule({
  declarations: [
    PharmacyComponent,
    ResuableTableComponent,
    ResuableDialogComponent,
    DialogEmulatorComponent
  ],
  imports: [
    CommonModule,
    MaterialModule ,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule
  ],
  exports : [PharmacyComponent]
})
export class PharmacyModule { }
