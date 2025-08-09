import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';

export interface PaymentIntent {
  id: string;
  amount: number;
  currency: string;
  status: string;
  client_secret: string;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  orderId: number;
  paymentMethodId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api`;
  private stripe: Stripe | null = null;

  constructor() {
    this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    // Using your Stripe publishable key
    const stripeKey = 'pk_test_51Rr41JPPNyvPFtTkFLXSJmqnXvDLkFWcZDGVWAkBhWdQUcWCgLfp6mLVsq1stP1XwpJrQq1OJQ1J4';
    this.stripe = await loadStripe(stripeKey);
  }

  createPaymentIntent(paymentRequest: PaymentRequest): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(`${this.apiUrl}/payments/create-payment-intent`, paymentRequest);
  }

  confirmPayment(paymentIntentId: string, paymentMethodId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/payments/confirm`, {
      paymentIntentId,
      paymentMethodId
    });
  }

  getStripe(): Stripe | null {
    return this.stripe;
  }

  async createPaymentMethod(cardElement: any): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    const { paymentMethod, error } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      throw error;
    }

    return paymentMethod;
  }

  async confirmCardPayment(clientSecret: string, paymentMethodId: string): Promise<any> {
    if (!this.stripe) {
      throw new Error('Stripe not initialized');
    }

    const { paymentIntent, error } = await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodId,
    });

    if (error) {
      throw error;
    }

    return paymentIntent;
  }
}