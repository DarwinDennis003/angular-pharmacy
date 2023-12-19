import { Component } from '@angular/core';
import { TOP_BAR } from './pharmacy-table.constant';

@Component({
  selector: 'app-pharmacy-table',
  templateUrl: './pharmacy-table.component.html',
  styleUrls: ['./pharmacy-table.component.scss']
})
export class PharmacyTableComponent {
  public TopBar = TOP_BAR;
  selected = 'option2';
  image = "";
}
