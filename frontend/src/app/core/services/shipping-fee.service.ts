import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ShippingFee {
  id?: number;
  countryCode: string;
  countryName: string;
  region?: string;
  city?: string;
  postalCodeFrom?: string;
  postalCodeTo?: string;
  baseFee: number;
  currency: string;
  minOrderAmount?: number;
  freeShippingThreshold?: number;
  deliveryTime?: string;
  active: boolean;
  priority?: number;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ShippingFeeService {
  private apiUrl = `${environment.apiUrl}/api/admin/shipping-fees`;

  constructor(private http: HttpClient) {}

  getAllActiveShippingFees(): Observable<ShippingFee[]> {
    return this.http.get<ShippingFee[]>(this.apiUrl);
  }

  getShippingFeesByCountry(countryCode: string): Observable<ShippingFee[]> {
    return this.http.get<ShippingFee[]>(`${this.apiUrl}/country/${countryCode}`);
  }

  getShippingFeeById(id: number): Observable<ShippingFee> {
    return this.http.get<ShippingFee>(`${this.apiUrl}/${id}`);
  }

  createShippingFee(shippingFee: ShippingFee): Observable<ShippingFee> {
    return this.http.post<ShippingFee>(this.apiUrl, shippingFee);
  }

  updateShippingFee(id: number, shippingFee: ShippingFee): Observable<ShippingFee> {
    return this.http.put<ShippingFee>(`${this.apiUrl}/${id}`, shippingFee);
  }

  deleteShippingFee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleShippingFeeStatus(id: number): Observable<ShippingFee> {
    return this.http.patch<ShippingFee>(`${this.apiUrl}/${id}/toggle-status`, {});
  }

  initializeDefaultShippingFees(): Observable<any> {
    return this.http.post(`${this.apiUrl}/initialize-defaults`, {});
  }

  testShippingFeeCalculation(request: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/test-calculation`, request);
  }

  getShippingFeeStatistics(): Observable<any> {
    return this.http.get(`${this.apiUrl}/statistics`);
  }

  debugShippingFees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/debug`);
  }
}
