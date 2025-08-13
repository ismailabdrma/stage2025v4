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
            <mat-stepper [linear]="true" #stepper orientation="vertical">
            <mat-step [stepControl]="shippingForm" label="Adresse de livraison">
              <form [formGroup]="shippingForm">
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
                    <mat-option *ngFor="let address of addresses" [value]="address.id">
                      {{ address.label }} - {{ address.address }}, {{ address.city }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>

                <button mat-button (click)="openAddressDialog()">Ajouter une adresse</button>
                <div class="step-actions">
                  <button mat-raised-button color="primary" matStepperNext>Suivant</button>
                </div>
              </form>
            </mat-step>

            <mat-step [stepControl]="paymentForm" label="Paiement">
              <form [formGroup]="paymentForm">
                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Numéro de carte</mat-label>
                  <input matInput formControlName="cardNumber" placeholder="1234 5678 9012 3456" required>
                </mat-form-field>

                <div class="form-row">
                  <mat-form-field appearance="outline" class="half-width">
                  <mat-label>Date d'expiration</mat-label>
                    <input matInput formControlName="expiryDate" placeholder="MM/YY" required>
                  </mat-form-field>
                  <mat-form-field appearance="outline" class="half-width">
                  <mat-label>CVV</mat-label>
                    <input matInput formControlName="cvv" placeholder="123" required>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="full-width">
                  <mat-label>Nom sur la carte</mat-label>
                  <input matInput formControlName="cardholderName" required>
                </mat-form-field>

                <div class="step-actions">
                  <button mat-button matStepperPrevious>Retour</button>
                  <button mat-raised-button color="primary" matStepperNext>Suivant</button>
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
  addresses: any[] = [];
  selectedAddressId: number | null = null;
  stripe?: any;
  cardElement?: any;

  constructor() {
    this.shippingForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      address: ["", Validators.required],
      city: ["", Validators.required],
      postalCode: ["", Validators.required],
      country: [""],
      phone: [""]
    })

    this.paymentForm = this.fb.group({
      cardNumber: ["", Validators.required],
      expiryDate: ["", Validators.required],
      cvv: ["", Validators.required],
      cardholderName: ["", Validators.required],
    })
  }

  ngOnInit(): void {
    this.loadCart();
    this.loadAddresses();
    // Initialize Stripe.js
    this.loadStripe()
  }
  private async loadStripe() {
    if (!(window as any).Stripe) {
      await this.injectStripeJs()
    }
    this.stripe = (window as any).Stripe(environment.stripePublicKey)
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
        this.addresses = addresses;
      },
      error: (error) => console.error("Error loading addresses:", error)
    });
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart
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
    const selectedAddress = this.addresses.find(addr => addr.id === this.selectedAddressId);
    if (selectedAddress) {
      this.shippingForm.patchValue(selectedAddress);
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
          next: () => this.loadAddresses(), // Refresh list after adding
          error: (error) => console.error("Error adding address:", error)
        });
      }
    });
  }

  async placeOrder(): Promise<void> {
    if (!(this.shippingForm.valid && this.cart && this.cart.items.length > 0)) return
    if (!this.stripe) {
      this.snackBar.open('Stripe non initialisé', 'Close', { duration: 3000 })
      return
    }
    this.placingOrder = true

    try {
      // 1) Ask backend to create order and PaymentIntent
      const addressId = this.selectedAddressId || 0
      const shippingFee = 0
      const res = await this.paymentService.createOrderAndPayment(addressId, shippingFee).toPromise()
      const orderId = res?.orderId
      const clientSecret = res?.clientSecret

      if (!orderId || !clientSecret) {
        this.snackBar.open('Échec de la création du paiement', 'Close', { duration: 3000 })
        this.placingOrder = false
        return
      }

      // 2) Confirm payment with Stripe (assuming automatic payment methods)
      const result = await this.stripe.confirmPayment({
        elements: undefined,
        clientSecret,
        confirmParams: {}
      })

      if (result.error) {
        this.snackBar.open(result.error.message || 'Paiement échoué', 'Close', { duration: 4000 })
        this.placingOrder = false
        return
      }

      const paymentIntentId = result.paymentIntent?.id
      if (!paymentIntentId) {
        this.snackBar.open('Paiement non confirmé', 'Close', { duration: 3000 })
        this.placingOrder = false
        return
      }

      // 3) Notify backend to mark order paid and send emails
      await this.paymentService.confirmOrderPayment(orderId, paymentIntentId).toPromise()

      // 4) Go to receipt page
      this.router.navigate(['/orders', orderId])

    } catch (e) {
      console.error(e)
      this.snackBar.open('Erreur lors du paiement', 'Close', { duration: 3000 })
    } finally {
      this.placingOrder = false
    }
  }
}
