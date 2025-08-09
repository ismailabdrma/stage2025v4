import { Component, OnInit, inject, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService, PaymentRequest } from '@core/services/payment.service';
import { OrderService } from '@core/services/order.service';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChild('cardElement', { static: true }) cardElementRef!: ElementRef;

  private paymentService = inject(PaymentService);
  private orderService = inject(OrderService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);
  private fb = inject(FormBuilder);

  paymentForm: FormGroup;
  orderId: number = 0;
  totalAmount: number = 0;
  processing: boolean = false;
  cardError: string = '';
  
  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private cardElement: StripeCardElement | null = null;

  constructor() {
    this.paymentForm = this.fb.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]]
    });
  }

  async ngOnInit(): Promise<void> {
    this.route.params.subscribe(params => {
      this.orderId = +params['orderId'];
      this.loadOrderDetails();
    });

    await this.initializeStripe();
  }

  private async initializeStripe(): Promise<void> {
    try {
      // Replace with your actual Stripe publishable key
      const stripeKey = 'pk_test_your_stripe_publishable_key_here';
      this.stripe = await loadStripe(stripeKey);
      
      if (this.stripe) {
        this.elements = this.stripe.elements();
        this.cardElement = this.elements.create('card', {
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        });

        this.cardElement.mount(this.cardElementRef.nativeElement);
        
        this.cardElement.on('change', (event) => {
          this.cardError = event.error ? event.error.message : '';
        });
      }
    } catch (error) {
      console.error('Failed to initialize Stripe:', error);
      this.snackBar.open('Failed to initialize payment system', 'Close', { duration: 3000 });
    }
  }

  private loadOrderDetails(): void {
    if (this.orderId) {
      this.orderService.getOrderById(this.orderId).subscribe({
        next: (order) => {
          this.totalAmount = order.totalAmount;
          this.paymentForm.patchValue({
            fullName: order.customerName || '',
            email: order.customerEmail || '',
            phone: order.customerPhone || ''
          });
        },
        error: (error) => {
          console.error('Error loading order details:', error);
          this.snackBar.open('Failed to load order details', 'Close', { duration: 3000 });
        }
      });
    }
  }

  async onSubmit(): Promise<void> {
    if (this.paymentForm.invalid || !this.stripe || !this.cardElement) {
      return;
    }

    this.processing = true;
    this.cardError = '';

    try {
      // Create payment method
      const { paymentMethod, error } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.cardElement,
        billing_details: {
          name: this.paymentForm.value.fullName,
          email: this.paymentForm.value.email,
          phone: this.paymentForm.value.phone,
        },
      });

      if (error) {
        this.cardError = error.message || 'Payment method creation failed';
        this.processing = false;
        return;
      }

      // Create payment intent
      const paymentRequest: PaymentRequest = {
        amount: Math.round(this.totalAmount * 100), // Convert to cents
        currency: 'usd',
        orderId: this.orderId,
        paymentMethodId: paymentMethod.id
      };

      this.paymentService.createPaymentIntent(paymentRequest).subscribe({
        next: async (paymentIntent) => {
          try {
            // Confirm the payment
            const { paymentIntent: confirmedPayment, error } = await this.stripe!.confirmCardPayment(
              paymentIntent.client_secret,
              {
                payment_method: paymentMethod.id,
              }
            );

            if (error) {
              this.cardError = error.message || 'Payment confirmation failed';
              this.processing = false;
            } else if (confirmedPayment.status === 'succeeded') {
              this.snackBar.open('Payment successful!', 'Close', { duration: 3000 });
              this.router.navigate(['/orders', this.orderId]);
            } else {
              this.cardError = 'Payment failed. Please try again.';
              this.processing = false;
            }
          } catch (confirmError) {
            console.error('Payment confirmation error:', confirmError);
            this.cardError = 'Payment confirmation failed';
            this.processing = false;
          }
        },
        error: (error) => {
          console.error('Payment intent creation error:', error);
          this.cardError = 'Failed to create payment intent';
          this.processing = false;
        }
      });
    } catch (error) {
      console.error('Payment processing error:', error);
      this.cardError = 'Payment processing failed';
      this.processing = false;
    }
  }

  onCancel(): void {
    this.router.navigate(['/orders']);
  }
}
