import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pharmacy-popup',
  templateUrl: './pharmacy-popup.component.html',
  styleUrls: ['./pharmacy-popup.component.scss']
})
export class PharmacyPopupComponent {
  constructor(private dialogRef: MatDialogRef<PharmacyPopupComponent>) {}
  closePopUp(){
    this.dialogRef.close()
  }
  
  dataSource = [
    {
      Generic_Name: "paracetomol",
      Trade_Name: "Tab dolo 650mg",
      Batch: "B# 8832",
      Expiry_Date: "May 14 2024",
      Details: "1-0-0 2weeks",
      Stock: "221",
      Unit_Price: "3k",
      Quantity: "14",
      Total_Price: "42k",
      Status: "Not-Dispensed",
    }
  ];
  
  displayedColumns = [
    'Generic_Name',
    'Trade_Name',
    'Batch',
    'Expiry_Date',
    'Details',
    'Stock',
    'Unit_Price',
    'Quantity',
    'Total_Price',
    'Status',
  ];
}
