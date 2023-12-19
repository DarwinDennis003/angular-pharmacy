import { Component } from '@angular/core';
import { PharmacyPopupComponent } from '../pharmacy-popup/pharmacy-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { TOP_BAR } from '../pharmacy-table/pharmacy-table.constant';

@Component({
  selector: 'app-patient-booking',
  templateUrl: './patient-booking.component.html',
  styleUrls: ['./patient-booking.component.scss']
})
export class PatientBookingComponent {
  private isPopupOpen = false;

  public TopBar = TOP_BAR;
  constructor(public dialog: MatDialog){}
  
  openPatientDetails(row: any) {
    this.dialog.open(PharmacyPopupComponent, {
      data: row,
      minWidth: '70%',
      minHeight: '100%',
    }).afterClosed().subscribe(()=>{
      this.isPopupOpen = false;
    });
  }

  dataSource = [
    {
      doctorName: "Dr. John Smith",
      patientName: "Jane Doe",
      gender: "Female",
      age: "30",
      patientId: "PID12345",
      encounterDate: "2023-12-18",
      dispensedDate: "2023-12-18",
      orderStatus: "Prescribed",
      department: "Cardiology",
      source: "OP",
    }, {
      doctorName: "Dr. John Smith",
      patientName: "Jane Doe",
      gender: "Female",
      age: "30",
      patientId: "PID12345",
      encounterDate: "2023-12-18",
      dispensedDate: "2023-12-18",
      orderStatus: "Dispensed",
      department: "Cardiology",
      source: "OP",
    }, {
      doctorName: "Dr. John Smith",
      patientName: "Jane Doe",
      gender: "Female",
      age: "30",
      patientId: "PID12345",
      encounterDate: "2023-12-18",
      dispensedDate: "2023-12-18",
      orderStatus: "Prescribed",
      department: "Cardiology",
      source: "OP",
    }, {
      doctorName: "Dr. John Smith",
      patientName: "Jane Doe",
      gender: "Female",
      age: "30",
      patientId: "PID12345",
      encounterDate: "2023-12-18",
      dispensedDate: "2023-12-18",
      orderStatus: "Dispensed",
      department: "Cardiology",
      source: "OP",
    }
  ];
  
  displayedColumns = [
    'doctorName',
    'patientName',
    'gender',
    'age',
    'patientId',
    'encounterDate',
    'dispensedDate',
    'orderStatus',
    'department',
    'source',
  ];
}
