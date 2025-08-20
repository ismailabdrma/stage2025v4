// src/app/core/services/supplier.service.ts
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "@environments/environment";
import { Observable } from "rxjs";
import type { Supplier } from "@core/models/supplier.model";

@Injectable({ providedIn: "root" })
export class SupplierService {
    private api = `${environment.apiUrl}/api/suppliers`;

    constructor(private http: HttpClient) {}

    getAllSuppliers(): Observable<Supplier[]> {
        return this.http.get<Supplier[]>(this.api);
    }

    createSupplier(supplier: any): Observable<Supplier> {
        return this.http.post<Supplier>(this.api, supplier);
    }

  // Create SOAP supplier and auto-extract WSDL operations on backend
  createSupplierAutoSoap(supplier: any): Observable<Supplier> {
    return this.http.post<Supplier>(`${this.api}/auto-soap`, supplier);
  }

  // Upload Excel file for a supplier import
  uploadExcel(file: File, supplierId: number): Observable<any> {
    const form = new FormData()
    form.append('file', file)
    form.append('supplierId', String(supplierId))
    return this.http.post(`${environment.apiUrl}/api/admin/product-import/excel`, form)
  }

    // Proxy WSDL operations fetch through backend to avoid CORS
    getWsdlOperations(wsdlUrl: string): Observable<string[]> {
        const url = `${environment.apiUrl}/api/wsdl/operations?url=${encodeURIComponent(wsdlUrl)}`
        return this.http.get<string[]>(url)
    }

    updateSupplier(id: number, supplier: any): Observable<Supplier> {
        return this.http.put<Supplier>(`${this.api}/${id}`, supplier);
    }

    deleteSupplier(id: number): Observable<void> {
        return this.http.delete<void>(`${this.api}/${id}`);
    }

    activateSupplier(id: number): Observable<void> {
        return this.http.put<void>(`${this.api}/${id}/activate`, {});
    }

    deactivateSupplier(id: number): Observable<void> {
        return this.http.put<void>(`${this.api}/${id}/deactivate`, {});
    }

    importProducts(id: number): Observable<any> {
        return this.http.post<any>(`${this.api}/${id}/import-products`, {});
    }

    refreshMetadata(supplierId: number): Observable<any> {
        return this.http.post<any>(`${this.api}/${supplierId}/refresh-metadata`, {});
    }

    refreshAllSoapMetadata(): Observable<any> {
        return this.http.post<any>(`${this.api}/refresh-all-soap-metadata`, {});
    }
}
