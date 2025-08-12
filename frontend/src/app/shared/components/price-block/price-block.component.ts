import { Component, Input, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatChipsModule } from '@angular/material/chips'

export interface PriceData {
  current: number
  original?: number
  compareAt?: number
  currency: string
  taxIncluded?: boolean
  shippingIncluded?: boolean
  discount?: {
    type: 'percentage' | 'amount'
    value: number
    label?: string
    startDate?: string
    endDate?: string
  }
  priceRange?: {
    min: number
    max: number
  }
  variants?: Array<{
    id: number
    name: string
    price: number
    originalPrice?: number
  }>
}

export interface PriceDisplayOptions {
  showOriginalPrice: boolean
  showDiscount: boolean
  showSavings: boolean
  showTaxInfo: boolean
  showShippingInfo: boolean
  showPriceRange: boolean
  size: 'small' | 'medium' | 'large'
  alignment: 'left' | 'center' | 'right'
  showCurrency: boolean
  highlightDiscount: boolean
}

@Component({
  selector: 'app-price-block',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ],
  template: `
    <div class="price-block" [class]="'size-' + options.size + ' align-' + options.alignment">
      
      <!-- Price Range Display -->
      <div *ngIf="showPriceRange && priceData.priceRange" class="price-range">
        <span class="price-label">À partir de</span>
        <span class="range-price">
          {{ priceData.priceRange.min | currency:priceData.currency:'symbol':'1.2-2' }}
        </span>
        <span class="range-separator">-</span>
        <span class="range-price">
          {{ priceData.priceRange.max | currency:priceData.currency:'symbol':'1.2-2' }}
        </span>
      </div>

      <!-- Single Price Display -->
      <div *ngIf="!showPriceRange" class="single-price">
        
        <!-- Current Price -->
        <div class="price-main">
          <span class="current-price" [class.discounted]="hasDiscount">
            {{ priceData.current | currency:priceData.currency:'symbol':'1.2-2' }}
          </span>
          
          <!-- Original Price (crossed out) -->
          <span *ngIf="options.showOriginalPrice && priceData.original && priceData.original > priceData.current" 
                class="original-price">
            {{ priceData.original | currency:priceData.currency:'symbol':'1.2-2' }}
          </span>
        </div>

        <!-- Discount Badge -->
        <div *ngIf="options.showDiscount && hasDiscount" 
             class="discount-info" 
             [class.highlighted]="options.highlightDiscount">
          
          <mat-chip class="discount-chip" [class.percentage]="priceData.discount?.type === 'percentage'">
            <mat-icon>local_offer</mat-icon>
            <span *ngIf="priceData.discount?.type === 'percentage'">
              -{{ priceData.discount.value }}%
            </span>
            <span *ngIf="priceData.discount?.type === 'amount'">
              -{{ priceData.discount.value | currency:priceData.currency:'symbol':'1.2-2' }}
            </span>
          </mat-chip>
          
          <span *ngIf="priceData.discount?.label" class="discount-label">
            {{ priceData.discount.label }}
          </span>
        </div>

        <!-- Savings Amount -->
        <div *ngIf="options.showSavings && getSavingsAmount() > 0" class="savings">
          <mat-icon>savings</mat-icon>
          <span>Vous économisez {{ getSavingsAmount() | currency:priceData.currency:'symbol':'1.2-2' }}</span>
        </div>

        <!-- Compare At Price -->
        <div *ngIf="priceData.compareAt && priceData.compareAt > priceData.current" class="compare-price">
          <span class="compare-label">Prix ailleurs:</span>
          <span class="compare-amount">{{ priceData.compareAt | currency:priceData.currency:'symbol':'1.2-2' }}</span>
          <mat-chip class="savings-chip">
            <mat-icon>trending_down</mat-icon>
            {{ getComparisonSavings() | currency:priceData.currency:'symbol':'1.2-2' }} en moins
          </mat-chip>
        </div>
      </div>

      <!-- Price Details -->
      <div class="price-details" *ngIf="options.showTaxInfo || options.showShippingInfo">
        
        <!-- Tax Information -->
        <div *ngIf="options.showTaxInfo" class="tax-info">
          <mat-icon class="info-icon">info</mat-icon>
          <span *ngIf="priceData.taxIncluded; else taxExcluded">TVA incluse</span>
          <ng-template #taxExcluded>
            <span>Hors TVA</span>
          </ng-template>
        </div>

        <!-- Shipping Information -->
        <div *ngIf="options.showShippingInfo" class="shipping-info">
          <mat-icon class="info-icon">local_shipping</mat-icon>
          <span *ngIf="priceData.shippingIncluded; else shippingExtra">
            Livraison incluse
          </span>
          <ng-template #shippingExtra>
            <span>+ frais de livraison</span>
          </ng-template>
        </div>
      </div>

      <!-- Limited Time Offer -->
      <div *ngIf="hasTimeLimit()" class="limited-offer">
        <mat-icon>schedule</mat-icon>
        <span>Offre limitée</span>
        <span *ngIf="getTimeRemaining()" class="time-remaining">
          {{ getTimeRemaining() }}
        </span>
      </div>

      <!-- Variant Prices -->
      <div *ngIf="priceData.variants && priceData.variants.length > 0" class="variant-prices">
        <span class="variants-label">Autres tailles/couleurs:</span>
        <div class="variant-price-list">
          <span *ngFor="let variant of priceData.variants.slice(0, 3)" 
                class="variant-price"
                [matTooltip]="variant.name">
            {{ variant.price | currency:priceData.currency:'symbol':'1.2-2' }}
          </span>
          <span *ngIf="priceData.variants.length > 3" class="more-variants">
            +{{ priceData.variants.length - 3 }} autres
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .price-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Size Variants */
    .size-small {
      font-size: 14px;
    }

    .size-medium {
      font-size: 16px;
    }

    .size-large {
      font-size: 18px;
    }

    /* Alignment */
    .align-left {
      align-items: flex-start;
      text-align: left;
    }

    .align-center {
      align-items: center;
      text-align: center;
    }

    .align-right {
      align-items: flex-end;
      text-align: right;
    }

    /* Price Range */
    .price-range {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .price-label {
      color: #666;
      font-size: 0.9em;
    }

    .range-price {
      font-weight: 700;
      color: #1976d2;
    }

    .range-separator {
      color: #999;
    }

    /* Single Price */
    .price-main {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .current-price {
      font-weight: 700;
      color: #333;
      font-size: 1.2em;
    }

    .current-price.discounted {
      color: #d32f2f;
      font-size: 1.4em;
    }

    .size-large .current-price {
      font-size: 1.6em;
    }

    .size-large .current-price.discounted {
      font-size: 1.8em;
    }

    .original-price {
      color: #999;
      text-decoration: line-through;
      font-size: 0.9em;
    }

    /* Discount Info */
    .discount-info {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .discount-info.highlighted {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .discount-chip {
      background: #4caf50;
      color: white;
      font-weight: 600;
    }

    .discount-chip.percentage {
      background: #ff5722;
    }

    .discount-chip mat-icon {
      font-size: 16px;
      margin-right: 4px;
    }

    .discount-label {
      color: #4caf50;
      font-weight: 500;
      font-size: 0.9em;
    }

    /* Savings */
    .savings {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #4caf50;
      font-weight: 500;
      font-size: 0.9em;
    }

    .savings mat-icon {
      font-size: 16px;
    }

    /* Compare Price */
    .compare-price {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding: 8px;
      background: #f0f7ff;
      border-radius: 6px;
      border: 1px solid #e3f2fd;
    }

    .compare-label {
      color: #666;
      font-size: 0.9em;
    }

    .compare-amount {
      text-decoration: line-through;
      color: #999;
    }

    .savings-chip {
      background: #1976d2;
      color: white;
      font-size: 0.8em;
    }

    .savings-chip mat-icon {
      font-size: 14px;
      margin-right: 4px;
    }

    /* Price Details */
    .price-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 8px;
    }

    .tax-info, .shipping-info {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;
      font-size: 0.85em;
    }

    .info-icon {
      font-size: 14px;
      opacity: 0.7;
    }

    /* Limited Offer */
    .limited-offer {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ff5722;
      font-weight: 500;
      font-size: 0.9em;
      background: #fff3e0;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #ffcc02;
    }

    .limited-offer mat-icon {
      font-size: 16px;
    }

    .time-remaining {
      font-weight: 700;
      color: #d84315;
    }

    /* Variant Prices */
    .variant-prices {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #f0f0f0;
    }

    .variants-label {
      color: #666;
      font-size: 0.85em;
      display: block;
      margin-bottom: 4px;
    }

    .variant-price-list {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .variant-price {
      color: #1976d2;
      font-weight: 500;
      font-size: 0.9em;
      cursor: pointer;
      text-decoration: underline;
      text-decoration-color: transparent;
      transition: text-decoration-color 0.2s ease;
    }

    .variant-price:hover {
      text-decoration-color: #1976d2;
    }

    .more-variants {
      color: #999;
      font-size: 0.85em;
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
      .price-main {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .align-center .price-main {
        align-items: center;
      }
      
      .align-right .price-main {
        align-items: flex-end;
      }
      
      .compare-price {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
      
      .variant-price-list {
        justify-content: center;
      }
    }
  `]
})
export class PriceBlockComponent implements OnInit {
  @Input() priceData!: PriceData
  @Input() options: PriceDisplayOptions = {
    showOriginalPrice: true,
    showDiscount: true,
    showSavings: true,
    showTaxInfo: true,
    showShippingInfo: true,
    showPriceRange: false,
    size: 'medium',
    alignment: 'left',
    showCurrency: true,
    highlightDiscount: false
  }

  get hasDiscount(): boolean {
    return !!(this.priceData.discount || 
             (this.priceData.original && this.priceData.original > this.priceData.current))
  }

  get showPriceRange(): boolean {
    return this.options.showPriceRange && !!this.priceData.priceRange
  }

  ngOnInit() {
    // Set default currency if not provided
    if (!this.priceData.currency) {
      this.priceData.currency = 'EUR'
    }
  }

  getSavingsAmount(): number {
    if (this.priceData.original && this.priceData.original > this.priceData.current) {
      return this.priceData.original - this.priceData.current
    }
    
    if (this.priceData.discount?.type === 'amount') {
      return this.priceData.discount.value
    }
    
    if (this.priceData.discount?.type === 'percentage') {
      return (this.priceData.current * this.priceData.discount.value) / (100 - this.priceData.discount.value)
    }
    
    return 0
  }

  getComparisonSavings(): number {
    return this.priceData.compareAt ? this.priceData.compareAt - this.priceData.current : 0
  }

  hasTimeLimit(): boolean {
    return !!(this.priceData.discount?.endDate)
  }

  getTimeRemaining(): string | null {
    if (!this.priceData.discount?.endDate) {
      return null
    }

    const endDate = new Date(this.priceData.discount.endDate)
    const now = new Date()
    const timeDiff = endDate.getTime() - now.getTime()

    if (timeDiff <= 0) {
      return 'Expiré'
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      return `${days}j ${hours}h restantes`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m restantes`
    } else {
      return `${minutes}m restantes`
    }
  }

  getDiscountPercentage(): number {
    if (this.priceData.discount?.type === 'percentage') {
      return this.priceData.discount.value
    }
    
    if (this.priceData.original && this.priceData.original > this.priceData.current) {
      return Math.round(((this.priceData.original - this.priceData.current) / this.priceData.original) * 100)
    }
    
    return 0
  }
}

import { CommonModule } from '@angular/common'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatChipsModule } from '@angular/material/chips'

export interface PriceData {
  current: number
  original?: number
  compareAt?: number
  currency: string
  taxIncluded?: boolean
  shippingIncluded?: boolean
  discount?: {
    type: 'percentage' | 'amount'
    value: number
    label?: string
    startDate?: string
    endDate?: string
  }
  priceRange?: {
    min: number
    max: number
  }
  variants?: Array<{
    id: number
    name: string
    price: number
    originalPrice?: number
  }>
}

export interface PriceDisplayOptions {
  showOriginalPrice: boolean
  showDiscount: boolean
  showSavings: boolean
  showTaxInfo: boolean
  showShippingInfo: boolean
  showPriceRange: boolean
  size: 'small' | 'medium' | 'large'
  alignment: 'left' | 'center' | 'right'
  showCurrency: boolean
  highlightDiscount: boolean
}

@Component({
  selector: 'app-price-block',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule
  ],
  template: `
    <div class="price-block" [class]="'size-' + options.size + ' align-' + options.alignment">
      
      <!-- Price Range Display -->
      <div *ngIf="showPriceRange && priceData.priceRange" class="price-range">
        <span class="price-label">À partir de</span>
        <span class="range-price">
          {{ priceData.priceRange.min | currency:priceData.currency:'symbol':'1.2-2' }}
        </span>
        <span class="range-separator">-</span>
        <span class="range-price">
          {{ priceData.priceRange.max | currency:priceData.currency:'symbol':'1.2-2' }}
        </span>
      </div>

      <!-- Single Price Display -->
      <div *ngIf="!showPriceRange" class="single-price">
        
        <!-- Current Price -->
        <div class="price-main">
          <span class="current-price" [class.discounted]="hasDiscount">
            {{ priceData.current | currency:priceData.currency:'symbol':'1.2-2' }}
          </span>
          
          <!-- Original Price (crossed out) -->
          <span *ngIf="options.showOriginalPrice && priceData.original && priceData.original > priceData.current" 
                class="original-price">
            {{ priceData.original | currency:priceData.currency:'symbol':'1.2-2' }}
          </span>
        </div>

        <!-- Discount Badge -->
        <div *ngIf="options.showDiscount && hasDiscount" 
             class="discount-info" 
             [class.highlighted]="options.highlightDiscount">
          
          <mat-chip class="discount-chip" [class.percentage]="priceData.discount?.type === 'percentage'">
            <mat-icon>local_offer</mat-icon>
            <span *ngIf="priceData.discount?.type === 'percentage'">
              -{{ priceData.discount.value }}%
            </span>
            <span *ngIf="priceData.discount?.type === 'amount'">
              -{{ priceData.discount.value | currency:priceData.currency:'symbol':'1.2-2' }}
            </span>
          </mat-chip>
          
          <span *ngIf="priceData.discount?.label" class="discount-label">
            {{ priceData.discount.label }}
          </span>
        </div>

        <!-- Savings Amount -->
        <div *ngIf="options.showSavings && getSavingsAmount() > 0" class="savings">
          <mat-icon>savings</mat-icon>
          <span>Vous économisez {{ getSavingsAmount() | currency:priceData.currency:'symbol':'1.2-2' }}</span>
        </div>

        <!-- Compare At Price -->
        <div *ngIf="priceData.compareAt && priceData.compareAt > priceData.current" class="compare-price">
          <span class="compare-label">Prix ailleurs:</span>
          <span class="compare-amount">{{ priceData.compareAt | currency:priceData.currency:'symbol':'1.2-2' }}</span>
          <mat-chip class="savings-chip">
            <mat-icon>trending_down</mat-icon>
            {{ getComparisonSavings() | currency:priceData.currency:'symbol':'1.2-2' }} en moins
          </mat-chip>
        </div>
      </div>

      <!-- Price Details -->
      <div class="price-details" *ngIf="options.showTaxInfo || options.showShippingInfo">
        
        <!-- Tax Information -->
        <div *ngIf="options.showTaxInfo" class="tax-info">
          <mat-icon class="info-icon">info</mat-icon>
          <span *ngIf="priceData.taxIncluded; else taxExcluded">TVA incluse</span>
          <ng-template #taxExcluded>
            <span>Hors TVA</span>
          </ng-template>
        </div>

        <!-- Shipping Information -->
        <div *ngIf="options.showShippingInfo" class="shipping-info">
          <mat-icon class="info-icon">local_shipping</mat-icon>
          <span *ngIf="priceData.shippingIncluded; else shippingExtra">
            Livraison incluse
          </span>
          <ng-template #shippingExtra>
            <span>+ frais de livraison</span>
          </ng-template>
        </div>
      </div>

      <!-- Limited Time Offer -->
      <div *ngIf="hasTimeLimit()" class="limited-offer">
        <mat-icon>schedule</mat-icon>
        <span>Offre limitée</span>
        <span *ngIf="getTimeRemaining()" class="time-remaining">
          {{ getTimeRemaining() }}
        </span>
      </div>

      <!-- Variant Prices -->
      <div *ngIf="priceData.variants && priceData.variants.length > 0" class="variant-prices">
        <span class="variants-label">Autres tailles/couleurs:</span>
        <div class="variant-price-list">
          <span *ngFor="let variant of priceData.variants.slice(0, 3)" 
                class="variant-price"
                [matTooltip]="variant.name">
            {{ variant.price | currency:priceData.currency:'symbol':'1.2-2' }}
          </span>
          <span *ngIf="priceData.variants.length > 3" class="more-variants">
            +{{ priceData.variants.length - 3 }} autres
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .price-block {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    /* Size Variants */
    .size-small {
      font-size: 14px;
    }

    .size-medium {
      font-size: 16px;
    }

    .size-large {
      font-size: 18px;
    }

    /* Alignment */
    .align-left {
      align-items: flex-start;
      text-align: left;
    }

    .align-center {
      align-items: center;
      text-align: center;
    }

    .align-right {
      align-items: flex-end;
      text-align: right;
    }

    /* Price Range */
    .price-range {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .price-label {
      color: #666;
      font-size: 0.9em;
    }

    .range-price {
      font-weight: 700;
      color: #1976d2;
    }

    .range-separator {
      color: #999;
    }

    /* Single Price */
    .price-main {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-wrap: wrap;
    }

    .current-price {
      font-weight: 700;
      color: #333;
      font-size: 1.2em;
    }

    .current-price.discounted {
      color: #d32f2f;
      font-size: 1.4em;
    }

    .size-large .current-price {
      font-size: 1.6em;
    }

    .size-large .current-price.discounted {
      font-size: 1.8em;
    }

    .original-price {
      color: #999;
      text-decoration: line-through;
      font-size: 0.9em;
    }

    /* Discount Info */
    .discount-info {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .discount-info.highlighted {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }

    .discount-chip {
      background: #4caf50;
      color: white;
      font-weight: 600;
    }

    .discount-chip.percentage {
      background: #ff5722;
    }

    .discount-chip mat-icon {
      font-size: 16px;
      margin-right: 4px;
    }

    .discount-label {
      color: #4caf50;
      font-weight: 500;
      font-size: 0.9em;
    }

    /* Savings */
    .savings {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #4caf50;
      font-weight: 500;
      font-size: 0.9em;
    }

    .savings mat-icon {
      font-size: 16px;
    }

    /* Compare Price */
    .compare-price {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
      padding: 8px;
      background: #f0f7ff;
      border-radius: 6px;
      border: 1px solid #e3f2fd;
    }

    .compare-label {
      color: #666;
      font-size: 0.9em;
    }

    .compare-amount {
      text-decoration: line-through;
      color: #999;
    }

    .savings-chip {
      background: #1976d2;
      color: white;
      font-size: 0.8em;
    }

    .savings-chip mat-icon {
      font-size: 14px;
      margin-right: 4px;
    }

    /* Price Details */
    .price-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
      margin-top: 8px;
    }

    .tax-info, .shipping-info {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #666;
      font-size: 0.85em;
    }

    .info-icon {
      font-size: 14px;
      opacity: 0.7;
    }

    /* Limited Offer */
    .limited-offer {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ff5722;
      font-weight: 500;
      font-size: 0.9em;
      background: #fff3e0;
      padding: 6px 10px;
      border-radius: 6px;
      border: 1px solid #ffcc02;
    }

    .limited-offer mat-icon {
      font-size: 16px;
    }

    .time-remaining {
      font-weight: 700;
      color: #d84315;
    }

    /* Variant Prices */
    .variant-prices {
      margin-top: 8px;
      padding-top: 8px;
      border-top: 1px solid #f0f0f0;
    }

    .variants-label {
      color: #666;
      font-size: 0.85em;
      display: block;
      margin-bottom: 4px;
    }

    .variant-price-list {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .variant-price {
      color: #1976d2;
      font-weight: 500;
      font-size: 0.9em;
      cursor: pointer;
      text-decoration: underline;
      text-decoration-color: transparent;
      transition: text-decoration-color 0.2s ease;
    }

    .variant-price:hover {
      text-decoration-color: #1976d2;
    }

    .more-variants {
      color: #999;
      font-size: 0.85em;
    }

    /* Mobile Responsiveness */
    @media (max-width: 768px) {
      .price-main {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
      
      .align-center .price-main {
        align-items: center;
      }
      
      .align-right .price-main {
        align-items: flex-end;
      }
      
      .compare-price {
        flex-direction: column;
        align-items: flex-start;
        gap: 4px;
      }
      
      .variant-price-list {
        justify-content: center;
      }
    }
  `]
})
export class PriceBlockComponent implements OnInit {
  @Input() priceData!: PriceData
  @Input() options: PriceDisplayOptions = {
    showOriginalPrice: true,
    showDiscount: true,
    showSavings: true,
    showTaxInfo: true,
    showShippingInfo: true,
    showPriceRange: false,
    size: 'medium',
    alignment: 'left',
    showCurrency: true,
    highlightDiscount: false
  }

  get hasDiscount(): boolean {
    return !!(this.priceData.discount || 
             (this.priceData.original && this.priceData.original > this.priceData.current))
  }

  get showPriceRange(): boolean {
    return this.options.showPriceRange && !!this.priceData.priceRange
  }

  ngOnInit() {
    // Set default currency if not provided
    if (!this.priceData.currency) {
      this.priceData.currency = 'EUR'
    }
  }

  getSavingsAmount(): number {
    if (this.priceData.original && this.priceData.original > this.priceData.current) {
      return this.priceData.original - this.priceData.current
    }
    
    if (this.priceData.discount?.type === 'amount') {
      return this.priceData.discount.value
    }
    
    if (this.priceData.discount?.type === 'percentage') {
      return (this.priceData.current * this.priceData.discount.value) / (100 - this.priceData.discount.value)
    }
    
    return 0
  }

  getComparisonSavings(): number {
    return this.priceData.compareAt ? this.priceData.compareAt - this.priceData.current : 0
  }

  hasTimeLimit(): boolean {
    return !!(this.priceData.discount?.endDate)
  }

  getTimeRemaining(): string | null {
    if (!this.priceData.discount?.endDate) {
      return null
    }

    const endDate = new Date(this.priceData.discount.endDate)
    const now = new Date()
    const timeDiff = endDate.getTime() - now.getTime()

    if (timeDiff <= 0) {
      return 'Expiré'
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) {
      return `${days}j ${hours}h restantes`
    } else if (hours > 0) {
      return `${hours}h ${minutes}m restantes`
    } else {
      return `${minutes}m restantes`
    }
  }

  getDiscountPercentage(): number {
    if (this.priceData.discount?.type === 'percentage') {
      return this.priceData.discount.value
    }
    
    if (this.priceData.original && this.priceData.original > this.priceData.current) {
      return Math.round(((this.priceData.original - this.priceData.current) / this.priceData.original) * 100)
    }
    
    return 0
  }
}









