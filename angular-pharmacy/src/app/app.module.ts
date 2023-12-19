import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PharmacyMainComponent } from './pharmacy-main/pharmacy-main.component';
import { PatientBookingComponent } from './patient-booking/patient-booking.component';
import { PharmacyPopupComponent } from './pharmacy-popup/pharmacy-popup.component';
import { PharmacySearchBarComponent } from './pharmacy-search-bar/pharmacy-search-bar.component';
import { PharmacyTableComponent } from './pharmacy-table/pharmacy-table.component';
import { MaterialModule } from 'src/ui-libs/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [
    AppComponent,
    PharmacyMainComponent,
    PatientBookingComponent,
    PharmacyPopupComponent,
    PharmacySearchBarComponent,
    PharmacyTableComponent
  ],
  imports: [
    BrowserModule,
        AppRoutingModule,
        MaterialModule,
        BrowserAnimationsModule,
        PatientBookingComponent,
        MatTableModule,
        PharmacyPopupComponent,
        CommonModule,
        FormsModule,
        ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
