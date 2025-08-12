import { Injectable, inject } from "@angular/core"
import { Observable } from "rxjs"
import { HttpClient, HttpParams } from "@angular/common/http"
import { environment } from "@environments/environment"
import { Product, Category } from "../models/product.model"

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api`

  getAllProducts(params?: {
    category?: string;
    supplier?: string;
    search?: string;
    sortBy?: string;
    page?: number;
    size?: number;
    includeInactive?: boolean;
  }): Observable<Product[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = (params as any)[key];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.append(key, value.toString());
        }
      });
    }
    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params: httpParams,
    });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`)
  }

  getProductsByCategory(categoryName: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/category/${categoryName}`)
  }

  createProduct(product: Partial<Product>): Observable<Product> {
    return this.http.post<Product>(`${this.apiUrl}/products`, product)
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}`, product)
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}`)
  }

  // Match backend endpoints /activate and /deactivate
  updateProductStatus(id: number, isActive: boolean): Observable<Product> {
    const path = isActive ? "activate" : "deactivate";
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/${path}`, {});
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/featured`);
  }

  getSuggestedProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/${id}/suggested`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // Product approval methods
  getPendingProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/pending`)
  }

  approveProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/approve`, {})
  }

  rejectProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}/reject`)
  }

  approveMultipleProducts(ids: number[]): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.apiUrl}/products/approve-multiple`, { productIds: ids })
  }

  // Additional admin product operations
  suspendProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/suspend`, {})
  }

  activateProduct(id: number): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/products/${id}/activate`, {})
  }

  permanentDeleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/products/${id}/permanent`)
  }

  bulkUpdateProducts(productIds: number[], updateData: Partial<Product>): Observable<Product[]> {
    return this.http.put<Product[]>(`${this.apiUrl}/products/bulk-update`, { productIds, updateData })
  }
}
