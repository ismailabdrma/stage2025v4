import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule, FormsModule } from "@angular/forms"
import { RouterModule, Router } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatStepperModule } from "@angular/material/stepper"
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from "@core/services/cart.service"
import { AddressService } from "@core/services/address.service"
import { MatDialog } from "@angular/material/dialog"
import { AddressDialogComponent } from "@app/features/profile/components/address-dialog/address-dialog.component"
import { OrderService } from "@core/services/order.service"
import { PaymentService } from "@core/services/payment.service"
import { environment } from "@environments/environment"
import type { Cart } from "@core/models/cart.model"

@Component({
  selector: "app-checkout",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatStepperModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="checkout-layout">
      <div class="checkout-main">
        <mat-card class="checkout-card">
          <mat-card-header>
            <mat-card-title>Paiement</mat-card-title>
          </mat-card-header>

          <mat-card-content>
            <mat-stepper [linear]="true" #stepper orientation="vertical" (selectionChange)="onStepChange($event)">
            <mat-step [stepControl]="shippingForm" label="Adresse de livraison">
              <form [formGroup]="shippingForm" (ngSubmit)="goToPayment(stepper)">
                <div class="form-row">
                  <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Prénom</mat-label>
                    <input matInput formControlName="firstName" required>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Nom</mat-label>
                    <input matInput formControlName="lastName" required>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Adresse</mat-label>
                  <input matInput formControlName="address" required>
                </mat-form-field>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Ville</mat-label>
                    <input matInput formControlName="city" required>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Code postal</mat-label>
                    <input matInput formControlName="postalCode" required>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Adresse enregistrée</mat-label>
                  <mat-select [(ngModel)]="selectedAddressId" (selectionChange)="onAddressSelect()" [ngModelOptions]="{standalone: true}">
                    <mat-option *ngFor="let a of addresses" [value]="a.id">
                      {{ a.label || 'Adresse' }} - {{ a.street || a.address }}, {{ a.city }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-button type="button" (click)="openAddressDialog()">Ajouter une adresse</button>
                <div class="step-actions">
                  <button mat-raised-button color="primary" type="submit">Suivant</button>
                </div>
              </form>
            </mat-step>

            <mat-step [stepControl]="paymentForm" label="Paiement">
              <div class="payment-methods">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Mode de paiement</mat-label>
                  <mat-select [(ngModel)]="selectedPaymentMethod" [ngModelOptions]="{standalone: true}">
                    <mat-option value="STRIPE">Stripe</mat-option>
                    <mat-option value="SUPPLIER" *ngIf="supplierHasOwnPayment">Paiement fournisseur</mat-option>
                  </mat-select>
                </mat-form-field>
              </div>
              <form [formGroup]="paymentForm">
                <div class="full-width" *ngIf="selectedPaymentMethod==='STRIPE'">
                  <div id="payment-element" class="payment-element"></div>
                </div>
                <div class="step-actions">
                  <button mat-button matStepperPrevious>Retour</button>
                  <button mat-raised-button color="primary" matStepperNext [disabled]="creatingIntent">Suivant</button>
                </div>
              </form>
            </mat-step>

            <mat-step label="Confirmation">
              <div class="confirmation-content">
                <h3>Votre commande est prête</h3>
                <p>Vérifiez les informations ci-dessous avant de finaliser.</p>
                <div class="step-actions">
                  <button mat-button matStepperPrevious>Retour</button>
                  <button mat-raised-button color="primary" class="cta" (click)="placeOrder()" [disabled]="placingOrder">
                    <mat-spinner diameter="20" *ngIf="placingOrder"></mat-spinner>
                    <span *ngIf="!placingOrder">Passer la commande</span>
                  </button>
                </div>
              </div>
            </mat-step>
            </mat-stepper>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Sticky Summary Card -->
      <div class="summary-sidebar">
        <mat-card class="summary-card">
          <mat-card-header>
            <mat-card-title>Récapitulatif</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div *ngIf="cart && cart.items.length > 0" class="summary-content">
              <div class="items-list">
                <div *ngFor="let item of cart.items" class="summary-item">
                  <div class="item-name">{{ item.productName }}</div>
                  <div class="item-details">
                    <span class="quantity">× {{ item.quantity }}</span>
                    <span class="price">{{ getItemTotal(item) | currency:'EUR':'symbol':'1.2-2':'fr-FR' }}</span>
                  </div>
                </div>
              </div>
              
              <div class="summary-totals">
                <div class="total-row">
                  <span>Sous-total</span>
                  <span>{{ getCartTotal() | currency:'EUR':'symbol':'1.2-2':'fr-FR' }}</span>
                </div>
                <div class="total-row">
                  <span>Frais de livraison</span>
                  <span>Gratuit</span>
                </div>
                <div class="total-row final">
                  <span>Total</span>
                  <span>{{ getCartTotal() | currency:'EUR':'symbol':'1.2-2':'fr-FR' }}</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .checkout-layout { 
      display: grid; 
      grid-template-columns: 1fr 360px; 
      gap: 24px; 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 24px; 
    }

    .checkout-main { display: flex; flex-direction: column; }
    .checkout-card { border-radius: 12px; }

    .form-row { display: flex; gap: 16px; }
    .full-width { width: 100%; margin-bottom: 16px; }
    .half-width { flex: 1; margin-bottom: 16px; }

    .step-actions { 
      display: flex; 
      gap: 16px; 
      justify-content: flex-end; 
      margin-top: 24px; 
    }
    .step-actions .cta { 
      background: var(--brand-primary,#FFEA00); 
      color: #1B1B1B; 
      font-weight: 700; 
      border-radius: 12px; 
    }

    .summary-sidebar { position: sticky; top: 24px; align-self: start; }
    .summary-card { border-radius: 12px; }
    
    .summary-content { display: flex; flex-direction: column; gap: 16px; }
    .items-list { display: flex; flex-direction: column; gap: 12px; }
    .summary-item { padding: 12px 0; border-bottom: 1px solid rgba(0,0,0,0.08); }
    .item-name { font-weight: 600; margin-bottom: 4px; }
    .item-details { display: flex; justify-content: space-between; color: var(--text-secondary,#6A6A6A); }
    
    .summary-totals { border-top: 1px solid rgba(0,0,0,0.12); padding-top: 16px; }
    .total-row { display: flex; justify-content: space-between; margin-bottom: 8px; }
    .total-row.final { font-weight: 700; font-size: 18px; color: #1B1B1B; }

    .confirmation-content h3 { margin: 0 0 8px; }
    .confirmation-content p { color: var(--text-secondary,#6A6A6A); margin: 0 0 16px; }

    @media (max-width: 1024px) {
      .checkout-layout { 
        grid-template-columns: 1fr; 
        gap: 16px; 
        padding: 16px; 
      }
      .summary-sidebar { 
        position: static; 
        order: -1; 
      }
      .form-row { flex-direction: column; }
    }
  `],
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder)
  private cartService = inject(CartService)
  private router = inject(Router)
  private orderService = inject(OrderService)
  private paymentService = inject(PaymentService)
  private addressService = inject(AddressService)
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  shippingForm: FormGroup
  paymentForm: FormGroup
  cart: Cart | null = null
  loadingCart = true;
  loadingAddresses = true;
  placingOrder = false;
  creatingAddress = false;
  addresses: any[] = [];
  selectedAddressId: number | null = null;
  stripe?: any;
  cardElement?: any;
  elements?: any;
  paymentElement?: any;
  paymentElementMounted = false;
  clientSecret?: string;
  createdOrderId?: number;
  creatingIntent = false;
  selectedPaymentMethod: 'STRIPE' | 'SUPPLIER' = 'STRIPE';
  supplierHasOwnPayment = false;

  constructor() {
    this.shippingForm = this.fb.group({
      firstName: [""],
      lastName: [""],
      address: ["", Validators.required],
      city: ["", Validators.required],
      postalCode: ["", Validators.required],
      country: [""],
      phone: [""],
      addressId: [null]
    })

    // No manual card fields when using Stripe Payment Element
    this.paymentForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.loadCart();
    this.loadAddresses();
    // Initialize Stripe.js
    this.loadStripe()
  }
  private async loadStripe() {
    try {
      if (!(window as any).Stripe) {
        console.log('Loading Stripe.js...');
        await this.injectStripeJs()
      }
      // Fetch publishable key from backend to ensure it matches server account
      const cfg = await this.paymentService.getStripeConfig().toPromise().catch(() => ({ publishableKey: environment.stripePublicKey }))
      const pubKey = cfg?.publishableKey || environment.stripePublicKey
      console.log('Initializing Stripe with key:', pubKey);
      this.stripe = (window as any).Stripe(pubKey)
      console.log('Stripe initialized successfully:', this.stripe);
    } catch (error) {
      console.error('Error loading Stripe:', error);
      this.snackBar.open('Erreur lors du chargement de Stripe', 'Close', { duration: 3000 });
    }
  }

  private injectStripeJs(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://js.stripe.com/v3/'
      script.async = true
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Stripe.js'))
      document.body.appendChild(script)
    })
  }


  loadAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses || [];
        // Auto-select default address if available (various backend keys)
        const def = this.addresses.find((a: any) => (a?.defaultAddress === true) || (a?.isDefault === true) || (a?.DefaultAddress === true));
        this.selectedAddressId = def?.id ?? (this.addresses[0]?.id ?? null);
        if (this.selectedAddressId) {
          this.onAddressSelect();
        }
      },
      error: (error) => console.error("Error loading addresses:", error)
    });
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart
        // Determine if any supplier in cart has its own payment system
        try {
          const suppliers = new Set<number>();
          this.supplierHasOwnPayment = false;
          ((cart && cart.items) ? cart.items : []).forEach((i: any) => {
            const sup = i?.product?.supplier;
            if (sup?.id && !suppliers.has(sup.id)) {
              suppliers.add(sup.id);
              if (sup?.hasOwnPaymentSystem) this.supplierHasOwnPayment = true;
            }
          });
          if (this.supplierHasOwnPayment) {
            this.selectedPaymentMethod = 'SUPPLIER';
          }
        } catch {}
      },
      error: (error) => {
        console.error("Error loading cart:", error)
      },
    })
  }

  getCartTotal(): number {
    if (!this.cart || !this.cart.items) return 0
    const sum = this.cart.items.reduce((total, item) => total + (item.unitPrice ?? item.price ?? 0) * item.quantity, 0)
    return sum > 0 ? sum : (this.cart.total ?? 0)
  }

  getItemTotal(item: any): number {
    const unit = item?.unitPrice ?? item?.price ?? 0
    const qty = item?.quantity ?? 0
    return unit * qty
  }

  onAddressSelect(): void {
    const selectedAddress = (this.addresses || []).find((addr: any) => addr && addr.id === this.selectedAddressId);
    if (selectedAddress) {
      const mapped = {
        address: selectedAddress.street || selectedAddress.address || '',
        city: selectedAddress.city || '',
        postalCode: selectedAddress.zipCode || selectedAddress.postalCode || '',
        country: selectedAddress.country || '',
        addressId: this.selectedAddressId
      } as any;
      this.shippingForm.patchValue(mapped);
      this.shippingForm.updateValueAndValidity();
    }
  }

  openAddressDialog(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '400px',
      data: null // No data for adding a new address
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.addAddress(result).subscribe({
          next: (created) => {
            // Optimistically add and select the new address
            if (created) {
              this.addresses = [created, ...(this.addresses || [])];
              this.selectedAddressId = created.id;
              this.onAddressSelect();
            } else {
              this.loadAddresses();
            }
          },
          error: (error) => console.error("Error adding address:", error)
        });
      }
    });
  }

  goToPayment(stepper: any): void {
    // Minimal check: require a selected addressId and basic fields
    const id = this.shippingForm.get('addressId')?.value || this.selectedAddressId;
    const addr = this.shippingForm.get('address')?.value || (this.addresses||[]).find((a:any)=>a.id===id)?.street;
    const city = this.shippingForm.get('city')?.value || (this.addresses||[]).find((a:any)=>a.id===id)?.city;
    const postal = this.shippingForm.get('postalCode')?.value || (this.addresses||[]).find((a:any)=>a.id===id)?.zipCode;
    if (addr && city && postal) {
      // ensure addressId is set
      if (!id) {
        // Create address silently if not selected
        this.creatingAddress = true;
        const country = this.shippingForm.get('country')?.value || '';
        const payload = { street: addr, city, zipCode: postal, country, defaultAddress: true };
        this.addressService.addAddress(payload).subscribe({
          next: (created: any) => {
            if (created?.id) {
              this.addresses = [created, ...(this.addresses || [])];
              this.selectedAddressId = created.id;
              this.shippingForm.patchValue({ addressId: created.id });
              stepper.next();
            } else {
              stepper.next();
            }
          },
          error: () => stepper.next(),
          complete: () => { this.creatingAddress = false; }
        })
      } else {
        this.shippingForm.patchValue({ addressId: id });
        stepper.next();
      }
    } else {
      // If user filled manual fields but has no saved addressId, create it now
      this.snackBar.open('Veuillez compléter l\'adresse', 'Close', { duration: 2000 })
    }
  }

  async onStepChange(event: any) {
    // When entering the payment step, create PaymentIntent + mount Stripe Element
    if (event?.selectedIndex === 1) {
      if (this.selectedPaymentMethod === 'STRIPE') {
        await this.ensureClientSecret();
        await this.mountStripePaymentElement();
      }
    }
  }

  private async ensureClientSecret() {
    if (this.clientSecret && this.createdOrderId) return;
    if (!this.stripe) {
      this.snackBar.open('Stripe non initialisé', 'Close', { duration: 3000 })
      return;
    }
    try {
      this.creatingIntent = true;
      const addressId = this.shippingForm.get('addressId')?.value || this.selectedAddressId || 0
      const shippingFee = 0
      console.log('Creating order with addressId:', addressId, 'shippingFee:', shippingFee);

      const res = await this.paymentService.createOrderAndPayment(addressId, shippingFee).toPromise()
      console.log('Order creation response:', res);

      this.createdOrderId = res?.orderId
      this.clientSecret = res?.clientSecret

      console.log('Order created:', { orderId: this.createdOrderId, clientSecret: this.clientSecret });

      if (!this.clientSecret) {
        console.error('No client secret received from order creation');
        this.snackBar.open('Impossible de créer l\'intention de paiement', 'Close', { duration: 3000 })
      }
    } catch (e: any) {
      console.error('Error creating order:', e);
      console.error('Error details:', e.message, e.error);
      this.snackBar.open('Erreur lors de la préparation du paiement: ' + (e.message || 'Unknown error'), 'Close', { duration: 5000 })
    } finally {
      this.creatingIntent = false;
    }
  }

  private async mountStripePaymentElement() {
    if (!this.stripe) return;
    if (!this.clientSecret) return;

    // Always reinitialize Elements with the latest clientSecret
    this.elements = this.stripe.elements({ clientSecret: this.clientSecret });

    // Clean container and safely destroy any previous element
    const container = document.getElementById('payment-element');
    if (container) {
      try {
        while (container.firstChild) {
          container.removeChild(container.firstChild);
        }
      } catch {}
    }

    if (this.paymentElement) {
      try { this.paymentElement.destroy(); } catch {}
      this.paymentElement = undefined;
      this.paymentElementMounted = false;
    }

    // Create fresh Payment Element and mount
    this.paymentElement = this.elements.create('payment');
    this.paymentElement.on('ready', () => this.paymentElementMounted = true);
    this.paymentElement.on('change', (e: any) => {
      if (e?.error?.message) {
        this.snackBar.open(e.error.message, 'Close', { duration: 3000 })
      }
    });
    if (container) {
      try {
        this.paymentElement.mount('#payment-element');
      } catch (err) {
        // If the element was destroyed unexpectedly, recreate and mount once more
        try { this.paymentElement.destroy(); } catch {}
        this.paymentElement = this.elements.create('payment');
        this.paymentElement.on('ready', () => this.paymentElementMounted = true);
        this.paymentElement.mount('#payment-element');
      }
    }
  }

  async placeOrder(): Promise<void> {
    console.log('Place order called');
    console.log('Form valid:', this.shippingForm.valid);
    console.log('Cart:', this.cart);
    console.log('Cart items:', this.cart?.items?.length);

    if (!(this.shippingForm.valid && this.cart && this.cart.items.length > 0)) {
      console.log('Validation failed - form or cart invalid');
      return;
    }

    if (!this.stripe) {
      console.error('Stripe not initialized');
      this.snackBar.open('Stripe non initialisé', 'Close', { duration: 3000 })
      return
    }

    console.log('Starting payment process...');
    this.placingOrder = true

    try {
      // Ensure we have a clientSecret and order created from the payment step
      const orderId = this.createdOrderId;

      if (this.selectedPaymentMethod === 'SUPPLIER') {
        // Redirect to supplier payment URL if provided in cart metadata
        const url = (this.cart as any)?.supplierPaymentUrl || (this.cart as any)?.items?.[0]?.product?.supplier?.paymentApiEndpoint
        if (url) {
          window.location.href = `${url}?orderId=${orderId}`
          return
        }
        this.snackBar.open('URL de paiement fournisseur introuvable', 'Close', { duration: 3000 })
        this.placingOrder = false
        return
      }

      // STRIPE FLOW
      if (!this.clientSecret || !this.createdOrderId) {
        await this.ensureClientSecret();
      }
      const clientSecret = this.clientSecret;
      if (!orderId || !clientSecret) {
        this.snackBar.open('Échec de la préparation du paiement', 'Close', { duration: 3000 })
        this.placingOrder = false
        return
      }

      // Ensure Elements and Payment Element are initialized and mounted before confirming
      if (!this.elements) {
        this.elements = this.stripe.elements({ clientSecret });
      }
      if (!this.paymentElementMounted) {
        await this.mountStripePaymentElement();
      }
      if (!this.paymentElementMounted) {
        console.error('Payment Element failed to mount');
        this.snackBar.open('Le composant de paiement ne s\'est pas chargé. Réessayez.', 'Close', { duration: 4000 })
        this.placingOrder = false
        return
      }

      // Submit the Payment Element first to run synchronous validations and wallet flows
      const submitResult = await this.elements.submit();
      if ((submitResult as any)?.error) {
        const msg = (submitResult as any).error?.message || 'Validation du paiement échouée';
        console.error('Elements submit error:', (submitResult as any).error);
        this.snackBar.open(msg, 'Close', { duration: 4000 });
        this.placingOrder = false;
        return;
      }

      console.log('Confirming payment with Stripe...');
      console.log('Client secret:', clientSecret);
      console.log('Elements:', this.elements);

      const result = await this.stripe.confirmPayment({
        elements: this.elements,
        clientSecret,
        confirmParams: {
          return_url: window.location.origin + '/orders/success'
        }
      })

      console.log('Stripe payment result:', result);

      if (result.error) {
        console.error('Stripe payment error:', result.error);
        this.snackBar.open(result.error.message || 'Paiement échoué', 'Close', { duration: 4000 })
        this.placingOrder = false
        return
      }

      // Check if payment requires action (3D Secure, etc.)
      if (result.paymentIntent && result.paymentIntent.status === 'requires_action') {
        console.log('Payment requires additional action');
        this.snackBar.open('Authentification requise - veuillez suivre les instructions', 'Close', { duration: 5000 });
        this.placingOrder = false;
        return;
      }

      const paymentIntentId = result.paymentIntent?.id
      if (!paymentIntentId) {
        console.error('No payment intent ID received');
        this.snackBar.open('Paiement non confirmé', 'Close', { duration: 3000 })
        this.placingOrder = false
        return
      }

      console.log('Confirming payment with backend:', paymentIntentId);
      try {
        const confirmRes = await this.paymentService.confirmOrderPayment(orderId, paymentIntentId).toPromise()
        console.log('Backend confirmation result:', confirmRes);

        if (confirmRes?.success) {
          this.snackBar.open('Paiement réussi', 'Close', { duration: 2000 })
          this.router.navigate(['/'])
        } else {
          this.snackBar.open(confirmRes?.message || 'Confirmation du paiement échouée', 'Close', { duration: 3000 })
          this.router.navigate(['/orders/checkout'])
        }
      } catch (backendError) {
        console.error('Backend confirmation error:', backendError);
        this.snackBar.open('Erreur de confirmation du paiement', 'Close', { duration: 3000 });
      }

    } catch (e: any) {
      console.error('Payment error:', e);
      console.error('Error details:', e.message, e.stack);

      let errorMessage = 'Erreur lors du paiement';
      if (e.message) {
        errorMessage += ': ' + e.message;
      }

      this.snackBar.open(errorMessage, 'Close', { duration: 5000 })
    } finally {
      this.placingOrder = false
    }
  }
}


