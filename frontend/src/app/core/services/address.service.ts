import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Address, CreateAddressRequest, UpdateAddressRequest } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/addresses`;

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.apiUrl);
  }

  addAddress(address: CreateAddressRequest): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }

  updateAddress(id: number, address: UpdateAddressRequest): Observable<Address> {
    return this.http.put<Address>(`${this.apiUrl}/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  setDefaultAddress(addressId: number): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/${addressId}/default`, {});
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.apiUrl, address);
  }
}