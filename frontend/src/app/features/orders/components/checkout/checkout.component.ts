import { Component, OnInit, OnDestroy, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { environment } from '@environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CartService } from '../../../../core/services/cart.service';
import { OrderService } from '../../../../core/services/order.service';
import { AddressService } from '../../../../core/services/address.service';

declare const Stripe: any;

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private cartService = inject(CartService);
  private orderService = inject(OrderService);
  private addressService = inject(AddressService);
  private cdr = inject(ChangeDetectorRef);

  addressForm!: FormGroup;
  currentStep = 1;
  isLoading = false;
  statusMessage = '';
  statusClass = '';

  countries: Array<{ code: string; name: string }> = [];
  cart: any = null;
  addresses: any[] = [];
  selectedAddressId: number | null = null;

  paymentFlow: 'PLATFORM_PAYMENT' | 'DIRECT_TO_SUPPLIER' | null = null;
  supplierName = '';
  supplierId: number | null = null;
  supplierPaymentUrl: string | null = null;
  clientSecret = '';
  orderId: number | null = null;

  stripe: any = null;
  stripeElements: any = null;
  paymentElement: any = null;
  stripeReady = false;

  async ngOnInit() {
    this.addressForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });

    await this.loadInitialData();
  }

  ngOnDestroy() {
    this.cleanupStripe();
  }

  private async loadInitialData() {
    try {
      this.isLoading = true;
      this.statusMessage = 'Chargement...';

      this.countries = [
        { code: 'FR', name: 'France' },
        { code: 'BE', name: 'Belgique' },
        { code: 'DE', name: 'Allemagne' },
        { code: 'ES', name: 'Espagne' },
        { code: 'IT', name: 'Italie' },
        { code: 'NL', name: 'Pays-Bas' },
        { code: 'CH', name: 'Suisse' }
      ];

      const [cart, addresses] = await Promise.all([
        firstValueFrom(this.cartService.getCart()),
        firstValueFrom(this.addressService.getAddresses())
      ]);
      this.cart = cart as any;
      this.addresses = addresses || [];
      this.selectedAddressId = this.addresses.find((a: any) => a.isDefault)?.id || this.addresses[0]?.id || null;

      if (!this.cart || !this.cart.items || this.cart.items.length === 0) {
        this.statusMessage = 'Votre panier est vide.';
        this.statusClass = 'info';
        this.isLoading = false;
        return;
      }

      this.statusMessage = '';
      this.isLoading = false;
    } catch (error) {
      console.error('Error loading initial data:', error);
      this.statusMessage = 'Erreur lors du chargement. Veuillez rafraîchir la page.';
      this.statusClass = 'error';
      this.isLoading = false;
    }
  }

  async proceedToPayment() {
    if (this.addressForm.invalid) return;

    try {
      this.isLoading = true;
      this.statusMessage = 'Création de la commande...';

      // Ensure we have an addressId
      if (!this.selectedAddressId) {
        // Create a new address from the form
        const created = await firstValueFrom(this.addressService.addAddress(this.addressForm.value));
        this.selectedAddressId = created?.id;
      }

      // Call the backend smart endpoint
      const orderResponse = await firstValueFrom(
        this.orderService.createOrderWithPayment({
          addressId: this.selectedAddressId!,
          shippingFee: 0
        })
      ) as any;

      this.orderId = orderResponse.orderId;
      this.clientSecret = orderResponse.clientSecret || '';
      this.paymentFlow = orderResponse.paymentFlow;
      this.supplierName = orderResponse.supplierName || '';
      this.supplierId = orderResponse.supplierId || null;
      this.supplierPaymentUrl = orderResponse.paymentUrl || null;

      if (this.paymentFlow === 'PLATFORM_PAYMENT') {
        await this.setupStripePayment();
      }

      this.currentStep = 2;
      this.statusMessage = '';
      this.isLoading = false;
    } catch (error) {
      console.error('Error creating order:', error);
      this.statusMessage = 'Erreur lors de la création de la commande.';
      this.statusClass = 'error';
      this.isLoading = false;
    }
  }

  private async setupStripePayment() {
    try {
      if (!this.stripe) {
        await this.loadStripe();
      }

      if (!this.clientSecret) {
        this.statusMessage = "Session de paiement indisponible. Veuillez réessayer.";
        this.statusClass = 'error';
        this.isLoading = false;
        return;
      }

      this.stripeElements = this.stripe.elements({ clientSecret: this.clientSecret });
      this.paymentElement = this.stripeElements.create('payment');

      setTimeout(() => {
        this.paymentElement.mount('#stripe-payment-element');
        this.paymentElement.on('ready', () => {
          this.stripeReady = true;
          this.cdr.detectChanges();
        });
        this.paymentElement.on('change', (event: any) => {
          if (event.error) {
            console.error('Stripe element error:', event.error);
          }
        });
      });
    } catch (error) {
      console.error('Error setting up Stripe:', error);
      throw error;
    }
  }

  private async loadStripe() {
    return new Promise((resolve, reject) => {
      if ((window as any).Stripe) {
        this.stripe = (window as any).Stripe(environment.stripePublicKey);
        resolve(this.stripe);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/';
      script.onload = () => {
        this.stripe = (window as any).Stripe(environment.stripePublicKey);
        resolve(this.stripe);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  async processStripePayment() {
    if (!this.stripe || !this.stripeElements || !this.stripeReady) {
      this.snackBar.open('Stripe non initialisé. Veuillez attendre.', 'Fermer', { duration: 3000 });
      return;
    }
    try {
      this.isLoading = true;
      this.statusMessage = 'Traitement du paiement...';

      const { error } = await this.stripe.confirmPayment({
        elements: this.stripeElements,
        confirmParams: {
          return_url: `${window.location.origin}/success?order_id=${this.orderId}&payment_type=platform`
        }
      });

      if (error) {
        this.statusMessage = `Erreur de paiement: ${error.message}`;
        this.statusClass = 'error';
        this.isLoading = false;
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      this.statusMessage = 'Erreur lors du traitement du paiement.';
      this.statusClass = 'error';
      this.isLoading = false;
    }
  }

  async processSupplierPayment() {
    try {
      this.isLoading = true;
      this.statusMessage = 'Redirection vers le fournisseur...';
      const supplierUrl = this.supplierPaymentUrl || `/supplier-payment?order_id=${this.orderId}&supplier=${this.supplierName}`;
      setTimeout(() => {
        window.location.href = supplierUrl;
      }, 500);
    } catch (error) {
      console.error('Supplier payment error:', error);
      this.statusMessage = 'Erreur lors de la redirection.';
      this.statusClass = 'error';
      this.isLoading = false;
    }
  }

  goBackToAddress() {
    this.currentStep = 1;
    this.cleanupStripe();
  }

  private cleanupStripe() {
    if (this.paymentElement) {
      try { this.paymentElement.unmount(); } catch {}
      this.paymentElement = null;
    }
    this.stripeElements = null;
    this.stripeReady = false;
  }
}


