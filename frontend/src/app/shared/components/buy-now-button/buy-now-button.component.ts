import { Component, Input, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CartService } from '../../../core/services/cart.service'
import { AnalyticsService } from '../../../core/services/analytics.service'
import { ToastService } from '../toast-notification/toast-notification.component'
import { AuthService } from '../../../core/services/auth.service'

export interface ProductVariant {
  id: number
  name: string
  price: number
  originalPrice?: number
  inStock: boolean
  sku?: string
  attributes?: Record<string, string> // e.g. { color: 'red', size: 'M' }
}

export interface BuyNowProduct {
  id: number
  name: string
  image?: string
  basePrice: number
  variants?: ProductVariant[]
  category?: string
  brand?: string
  slug?: string
}

@Component({
  selector: 'app-buy-now-button',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  template: `
    <button 
      mat-raised-button 
      color="accent"
      class="buy-now-button"
      [disabled]="isLoading || !isAvailable"
      (click)="handleBuyNow()"
      [attr.aria-label]="getAriaLabel()">
      
      <mat-spinner *ngIf="isLoading" diameter="20" color="inherit"></mat-spinner>
      
      <ng-container *ngIf="!isLoading">
        <mat-icon>flash_on</mat-icon>
        <span>{{ buttonText }}</span>
      </ng-container>
    </button>
  `,
  styles: [`
    .buy-now-button {
      min-width: 160px;
      height: 48px;
      font-weight: 600;
      font-size: 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: all 0.2s ease;
      background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%);
      color: white;
      box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
    }

    .buy-now-button:hover:not(:disabled) {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(255, 107, 53, 0.4);
    }

    .buy-now-button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
      box-shadow: none;
    }

    .buy-now-button mat-spinner {
      margin-right: 8px;
    }

    .buy-now-button mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    @media (max-width: 768px) {
      .buy-now-button {
        width: 100%;
        min-width: auto;
      }
    }
  `]
})
export class BuyNowButtonComponent {
  @Input() product!: BuyNowProduct
  @Input() selectedVariant?: ProductVariant
  @Input() quantity: number = 1
  @Input() buttonText: string = 'Acheter maintenant'
  @Input() redirectToCheckout: boolean = true
  @Input() customClass?: string

  private cartService = inject(CartService)
  private router = inject(Router)
  private analyticsService = inject(AnalyticsService)
  private toastService = inject(ToastService)
  private authService = inject(AuthService)

  isLoading = false

  get isAvailable(): boolean {
    if (this.selectedVariant) {
      return this.selectedVariant.inStock && this.selectedVariant.price > 0
    }
    return this.product.basePrice > 0
  }

  get currentPrice(): number {
    return this.selectedVariant?.price || this.product.basePrice
  }

  get getAriaLabel(): () => string {
    return () => {
      if (!this.isAvailable) {
        return 'Produit non disponible'
      }
      return `Acheter ${this.product.name} maintenant pour ${this.currentPrice}€`
    }
  }

  async handleBuyNow() {
    if (!this.isAvailable || this.isLoading) {
      return
    }

    this.isLoading = true

    try {
      // Track analytics
      this.analyticsService.trackClick('buy_now_button', 'product_detail', {
        productId: this.product.id,
        productName: this.product.name,
        variantId: this.selectedVariant?.id,
        price: this.currentPrice,
        quantity: this.quantity
      })

      // Prepare cart item
      const cartItem = {
        productId: this.product.id,
        variantId: this.selectedVariant?.id,
        quantity: this.quantity,
        price: this.currentPrice,
        productName: this.product.name,
        productImage: this.product.image,
        variant: this.selectedVariant ? this.formatVariantName(this.selectedVariant) : undefined
      }

      // Add to cart
      await this.cartService.addItem(cartItem).toPromise()

      // Track add to cart analytics
      this.analyticsService.trackAddToCart({
        id: this.product.id,
        name: this.product.name,
        category: this.product.category,
        brand: this.product.brand,
        variant: cartItem.variant,
        price: this.currentPrice,
        quantity: this.quantity
      })

      if (this.redirectToCheckout) {
        // Navigate to checkout (respect login redirect)
        if (this.authService.isAuthenticated()) {
          this.router.navigate(['/orders/checkout'])
        } else {
          this.router.navigate(['/auth/login'], { queryParams: { redirect: '/orders/checkout' } })
        }

        // Track begin checkout
        this.analyticsService.trackBeginCheckout([{
          product_id: this.product.id,
          product_name: this.product.name,
          category: this.product.category,
          brand: this.product.brand,
          variant: cartItem.variant,
          price: this.currentPrice,
          quantity: this.quantity
        }], this.currentPrice * this.quantity)
      } else {
        // Show success message and open mini cart
        this.toastService.success(
          `${this.product.name} ajouté au panier`,
          'Voir le panier',
          () => this.router.navigate(['/cart'])
        )
      }

    } catch (error) {
      console.error('Buy now failed:', error)
      
      // Track error
      this.analyticsService.trackError(
        error instanceof Error ? error : new Error('Buy now failed'),
        'buy_now_button'
      )

      // Show error message
      this.toastService.error(
        'Erreur lors de l\'ajout au panier',
        'Réessayer',
        () => this.handleBuyNow()
      )
    } finally {
      this.isLoading = false
    }
  }

  private formatVariantName(variant: ProductVariant): string {
    if (variant.attributes) {
      return Object.entries(variant.attributes)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ')
    }
    return variant.name
  }
}

// Quantity Stepper Component for use with Buy Now
@Component({
  selector: 'app-quantity-stepper',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="quantity-stepper" [class.disabled]="disabled">
      <button 
        mat-icon-button 
        class="quantity-btn decrease"
        [disabled]="disabled || quantity <= minQuantity"
        (click)="decrease()"
        aria-label="Diminuer la quantité">
        <mat-icon>remove</mat-icon>
      </button>
      
      <input 
        type="number" 
        class="quantity-input"
        [value]="quantity"
        [min]="minQuantity"
        [max]="maxQuantity"
        [disabled]="disabled"
        (input)="onInputChange($event)"
        (blur)="onInputBlur()"
        aria-label="Quantité">
      
      <button 
        mat-icon-button 
        class="quantity-btn increase"
        [disabled]="disabled || quantity >= maxQuantity"
        (click)="increase()"
        aria-label="Augmenter la quantité">
        <mat-icon>add</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .quantity-stepper {
      display: inline-flex;
      align-items: center;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      overflow: hidden;
    }

    .quantity-stepper.disabled {
      opacity: 0.6;
      pointer-events: none;
    }

    .quantity-btn {
      width: 40px;
      height: 40px;
      border-radius: 0;
      border: none;
      background: transparent;
      color: #666;
      transition: all 0.2s ease;
    }

    .quantity-btn:hover:not(:disabled) {
      background: #f5f5f5;
      color: #333;
    }

    .quantity-btn:disabled {
      color: #ccc;
      cursor: not-allowed;
    }

    .quantity-input {
      width: 60px;
      height: 40px;
      border: none;
      outline: none;
      text-align: center;
      font-size: 16px;
      font-weight: 500;
      background: transparent;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
    }

    .quantity-input::-webkit-outer-spin-button,
    .quantity-input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    .quantity-input[type=number] {
      -moz-appearance: textfield;
    }

    .quantity-input:focus {
      background: #f8f9fa;
    }
  `]
})
export class QuantityStepperComponent {
  @Input() quantity: number = 1
  @Input() minQuantity: number = 1
  @Input() maxQuantity: number = 999
  @Input() disabled: boolean = false
  @Input() step: number = 1

  private analyticsService = inject(AnalyticsService)

  increase() {
    if (this.quantity < this.maxQuantity) {
      this.quantity += this.step
      this.trackQuantityChange('increase')
    }
  }

  decrease() {
    if (this.quantity > this.minQuantity) {
      this.quantity -= this.step
      this.trackQuantityChange('decrease')
    }
  }

  onInputChange(event: any) {
    const value = parseInt(event.target.value, 10)
    if (!isNaN(value) && value >= this.minQuantity && value <= this.maxQuantity) {
      this.quantity = value
      this.trackQuantityChange('input')
    }
  }

  onInputBlur() {
    // Ensure quantity is within bounds
    if (this.quantity < this.minQuantity) {
      this.quantity = this.minQuantity
    } else if (this.quantity > this.maxQuantity) {
      this.quantity = this.maxQuantity
    }
  }

  private trackQuantityChange(method: string) {
    this.analyticsService.trackClick('quantity_stepper', 'product_detail', {
      method,
      quantity: this.quantity
    })
  }
}