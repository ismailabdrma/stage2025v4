import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap, catchError } from 'rxjs'
import { environment } from '@environments/environment'

// NEW INTERFACES FOR SMART PAYMENT ROUTING
export interface PaymentIntentRequest {
  orderId: number;
  amount: number;
  currency: string;
}

export interface PaymentIntentResponse {
  id: string;
  amount: number;
  currency: string;
  status: string;
  clientSecret?: string;
  paymentFlow?: string;        // "DIRECT_TO_SUPPLIER" or "PLATFORM_PAYMENT"
  paymentUrl?: string;         // For direct supplier payments
  supplierName?: string;       // For direct supplier payments
  supplierId?: number;         // For direct supplier payments
  supplierCount?: number;      // For platform payments
  description?: string;        // Payment description
  success?: boolean;           // For error responses
  message?: string;            // For error responses
}

export interface PaymentRoutingResult {
  success: boolean;
  message: string;
  paymentFlow: 'DIRECT_TO_SUPPLIER' | 'PLATFORM_PAYMENT';
  orderId: number;
  totalAmount: number;
  primarySupplier?: {          // For direct payments
    id: number;
    name: string;
  };
  supplierCount?: number;      // For platform payments
}

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private http = inject(HttpClient)
  private ordersApi = `${environment.apiUrl}/api/orders`
  private paymentsApi = `${environment.apiUrl}/api/payments`

  // UPDATED - Now calls create-with-payment endpoint that handles smart routing
  createOrderAndPayment(addressId: number, shippingFee: number): Observable<{
    success: boolean;
    orderId: number;
    clientSecret?: string;
    error?: string;
    paymentFlow?: string;
    supplierName?: string;
    redirectRequired?: boolean;
    message?: string;
    paymentIntentId?: string;
    paymentUrl?: string;
    supplierId?: number;
  }> {
    return this.http.post<{
      success: boolean;
      orderId: number;
      clientSecret?: string;
      error?: string;
      paymentFlow?: string;
      supplierName?: string;
      redirectRequired?: boolean;
      message?: string;
      paymentIntentId?: string;
      paymentUrl?: string;
      supplierId?: number;
    }>(`${this.ordersApi}/create-with-payment`, {
      addressId,
      shippingFee
    })
  }

  // NEW - Get payment routing information for an order
  getPaymentRouting(orderId: number): Observable<PaymentRoutingResult> {
    console.log('PaymentService: Making getPaymentRouting call for order', orderId);
    return this.http.get<PaymentRoutingResult>(`${this.paymentsApi}/payment-routing/${orderId}`).pipe(
      tap(result => console.log('PaymentService: getPaymentRouting response:', result)),
      catchError(error => {
        console.error('PaymentService: getPaymentRouting error:', error);
        throw error;
      })
    );
  }

  // NEW - Create smart payment intent (uses routing logic)
  createPaymentIntent(request: PaymentIntentRequest): Observable<PaymentIntentResponse> {
    return this.http.post<PaymentIntentResponse>(`${this.paymentsApi}/payment-intent`, request);
  }

  // EXISTING - No changes needed
  confirmOrderPayment(orderId: number, paymentIntentId: string): Observable<{ success: boolean; message?: string }> {
    return this.http.post<{ success: boolean; message?: string }>(`${this.paymentsApi}/confirm`, {
      paymentIntentId,
      orderId
    })
  }

  // EXISTING - No changes needed
  getStripeConfig(): Observable<{ publishableKey: string }> {
    return this.http.get<{ publishableKey: string }>(`${this.paymentsApi}/config`)
  }

  // NEW - Process supplier payment callback
  processSupplierCallback(supplierId: string, callbackData: any): Observable<any> {
    return this.http.post(`${this.paymentsApi}/supplier-callback/${supplierId}`, callbackData);
  }

  // NEW - Refund and capture methods
  refundPayment(paymentIntentId: string): Observable<any> {
    return this.http.post(`${this.paymentsApi}/refund`, { paymentIntentId });
  }

  capturePayment(paymentIntentId: string): Observable<any> {
    return this.http.post(`${this.paymentsApi}/capture`, { paymentIntentId });
  }

  // NEW - Confirm payment session after Stripe redirect
  confirmPaymentSession(sessionId: string): Observable<{ success: boolean; message?: string; orderId?: number }> {
    return this.http.post<{ success: boolean; message?: string; orderId?: number }>(`${this.paymentsApi}/confirm-session`, { sessionId });
  }
}