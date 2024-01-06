import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_VERSION, SERVER_PORTS } from '../configs/connection-config';

@Injectable({
  providedIn: 'root'
})
export class PharmacyService {
  private pharmacyServerPort : string = SERVER_PORTS.pharmacyPort;
  private pharmacyUrl : string = `http://localhost:${this.pharmacyServerPort}/${API_VERSION}`


  constructor(private http: HttpClient) { }


  getOrdersByDate(date ?: string) : Observable<any>{
    const url : string = `${this.pharmacyUrl}/pharmacy/orders/${date}`;
    return this.http.get(url)
  }


  getOrderListItem(orderId ?: string) : Observable<any>{
    const url : string = `${this.pharmacyUrl}/pharmacy/order/list_items/${orderId}`;
    return this.http.get(url)
  }

  dispensePharmacyItems(dispense_items: any) : Observable<any>{
    const url : string = `${this.pharmacyUrl}/pharmacy/order/list_items/dispense`;
    return this.http.put(url,dispense_items)
  }
}
