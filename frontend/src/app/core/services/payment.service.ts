import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '@environments/environment'

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient)
  private ordersApi = `${environment.apiUrl}/api/orders`
  private paymentsApi = `${environment.apiUrl}/api/payments`

  // Creates an order from cart and returns PaymentIntent clientSecret and orderId
  createOrderAndPayment(addressId: number, shippingFee: number): Observable<{ orderId: number; clientSecret?: string; error?: string }> {
    return this.http.post<{ orderId: number; clientSecret?: string; error?: string }>(`${this.ordersApi}`, {
      addressId,
      shippingFee
    })
  }

  confirmOrderPayment(orderId: number, paymentIntentId: string): Observable<{ success: boolean; message?: string }> {
    // Confirm against payments endpoint which verifies with Stripe and sends emails
    return this.http.post<{ success: boolean; message?: string }>(`${this.paymentsApi}/confirm`, { paymentIntentId })
  }

  getStripeConfig(): Observable<{ publishableKey: string }> {
    return this.http.get<{ publishableKey: string }>(`${this.paymentsApi}/config`)
  }
}






