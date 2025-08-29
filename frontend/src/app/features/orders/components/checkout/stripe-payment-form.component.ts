import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { loadStripe, Stripe, StripeElements, StripePaymentElement } from '@stripe/stripe-js';
import { environment } from '../../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stripe-payment-form',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="stripe-payment-form">
      <div class="payment-header">
        <h3>Paiement sécurisé avec Stripe</h3>
        <p>Commande #{{ orderId }} - {{ amount | currency:'EUR':'symbol':'1.2-2' }}</p>
      </div>
      
      <div class="payment-form">
        <div id="payment-element" class="payment-element"></div>
        <div id="card-errors" class="card-errors" role="alert"></div>
        
        <div class="payment-actions">
          <button 
            mat-raised-button 
            color="primary" 
            [disabled]="isProcessing || !stripeLoaded"
            (click)="handlePayment()"
            class="pay-button">
            <mat-spinner *ngIf="isProcessing" diameter="20"></mat-spinner>
            <span *ngIf="!isProcessing">{{ isProcessing ? 'Traitement...' : 'Payer maintenant' }}</span>
          </button>
          
          <button 
            mat-button 
            [disabled]="isProcessing"
            (click)="onCancel.emit()"
            class="cancel-button">
            Annuler
          </button>
        </div>
      </div>
      
      <div class="payment-info">
        <p><small>Vos informations de paiement sont sécurisées et chiffrées par Stripe.</small></p>
      </div>
    </div>
  `,
  styles: [`
    .stripe-payment-form {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
    }
    
    .payment-header {
      text-align: center;
      margin-bottom: 20px;
    }
    
    .payment-header h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    
    .payment-header p {
      margin: 0;
      color: #666;
      font-size: 16px;
    }
    
    .payment-form {
      margin-bottom: 20px;
    }
    
    .payment-element {
      padding: 12px;
      border: 1px solid #ccc;
      border-radius: 4px;
      background: white;
      margin-bottom: 15px;
      min-height: 40px;
    }
    
    .card-errors {
      color: #dc3545;
      font-size: 14px;
      margin-bottom: 15px;
      min-height: 20px;
    }
    
    .payment-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    
    .pay-button {
      min-width: 150px;
    }
    
    .cancel-button {
      min-width: 100px;
    }
    
    .payment-info {
      text-align: center;
      color: #666;
      font-size: 12px;
    }
    
    .payment-info small {
      color: #999;
    }
  `]
})
export class StripePaymentFormComponent implements OnInit, OnDestroy {
  @Input() orderId!: number;
  @Input() amount!: number;
  @Input() clientSecret!: string;
  @Output() onSuccess = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<void>();
  @Output() onError = new EventEmitter<string>();

  private stripe: Stripe | null = null;
  private elements: StripeElements | null = null;
  private paymentElement: StripePaymentElement | null = null;
  
  stripeLoaded = false;
  isProcessing = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      // Load Stripe
      this.stripe = await loadStripe(environment.stripePublicKey);
      if (!this.stripe) {
        throw new Error('Failed to load Stripe');
      }

      // Create elements
      this.elements = this.stripe.elements({
        clientSecret: this.clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#1976d2',
            colorBackground: '#ffffff',
            colorText: '#333333',
            colorDanger: '#dc3545',
            fontFamily: 'Roboto, sans-serif',
            spacingUnit: '4px',
            borderRadius: '4px'
          }
        }
      });

      // Create payment element
      this.paymentElement = this.elements.create('payment');
      
      // Mount payment element
      if (this.paymentElement) {
        this.paymentElement.mount('#payment-element');
      }

      this.stripeLoaded = true;
      console.log('✅ Stripe payment form initialized successfully');
      
    } catch (error) {
      console.error('❌ Error initializing Stripe payment form:', error);
      this.onError.emit('Erreur lors de l\'initialisation du formulaire de paiement');
    }
  }

  async handlePayment() {
    if (!this.stripe || !this.elements || !this.paymentElement) {
      this.onError.emit('Formulaire de paiement non initialisé');
      return;
    }

    this.isProcessing = true;
    const displayError = document.getElementById('card-errors');

    try {
      // Confirm payment
      const { error, paymentIntent } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/orders/success?order_id=${this.orderId}&payment_type=stripe_embedded`,
        },
        redirect: 'if_required'
      });

      if (error) {
        // Handle payment error
        if (displayError) {
          displayError.textContent = error.message || 'Une erreur est survenue lors du paiement';
        }
        this.onError.emit(error.message || 'Erreur de paiement');
        return;
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        console.log('✅ Payment successful:', paymentIntent);
        this.snackBar.open('Paiement réussi!', 'Fermer', { duration: 5000 });
        this.onSuccess.emit(paymentIntent);
      } else {
        // Payment requires additional action
        console.log('⚠️ Payment requires additional action:', paymentIntent?.status);
        this.onError.emit('Le paiement nécessite une action supplémentaire');
      }

    } catch (error) {
      console.error('❌ Error processing payment:', error);
      if (displayError) {
        displayError.textContent = 'Une erreur inattendue est survenue';
      }
      this.onError.emit('Erreur lors du traitement du paiement');
    } finally {
      this.isProcessing = false;
    }
  }

  ngOnDestroy() {
    if (this.paymentElement) {
      this.paymentElement.destroy();
    }
  }
}
