import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '@environments/environment'

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api/orders`

  // Creates an order from cart and returns PaymentIntent clientSecret and orderId
  createOrderAndPayment(addressId: number, shippingFee: number): Observable<{ orderId: number; clientSecret?: string; error?: string }> {
    return this.http.post<{ orderId: number; clientSecret?: string; error?: string }>(`${this.apiUrl}`, {
      addressId,
      shippingFee
    })
  }

  confirmOrderPayment(orderId: number, paymentIntentId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${orderId}/confirm-payment`, { paymentIntentId })
  }
}





