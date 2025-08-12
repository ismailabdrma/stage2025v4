import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { AnalyticsService } from '../../../core/services/analytics.service'

export interface VariantOption {
  id: number
  name: string
  value: string
  price: number
  originalPrice?: number
  inStock: boolean
  stockQuantity?: number
  sku?: string
  imageUrl?: string
  description?: string
  isDefault?: boolean
  attributes: Record<string, string>
}

export interface VariantAttribute {
  key: string
  label: string
  type: 'color' | 'size' | 'material' | 'style' | 'text'
  required: boolean
  displayStyle: 'buttons' | 'dropdown' | 'chips' | 'color-swatches'
  options: Array<{
    value: string
    label: string
    color?: string // For color swatches
    disabled?: boolean
    tooltip?: string
  }>
}

@Component({
  selector: 'app-variant-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="variant-selector" *ngIf="attributes.length > 0">
      
      <!-- Variant Attributes -->
      <div class="variant-section" *ngFor="let attribute of attributes">
        <label class="variant-label">
          {{ attribute.label }}
          <span class="required" *ngIf="attribute.required">*</span>
        </label>

        <!-- Color Swatches -->
        <div *ngIf="attribute.type === 'color' && attribute.displayStyle === 'color-swatches'" 
             class="color-swatches">
          <button 
            *ngFor="let option of attribute.options"
            type="button"
            class="color-swatch"
            [class.selected]="selectedAttributes[attribute.key] === option.value"
            [class.disabled]="option.disabled"
            [style.background-color]="option.color"
            [matTooltip]="option.tooltip || option.label"
            [disabled]="option.disabled"
            (click)="selectAttribute(attribute.key, option.value)"
            [attr.aria-label]="'Couleur ' + option.label">
            <mat-icon *ngIf="selectedAttributes[attribute.key] === option.value" class="check-icon">check</mat-icon>
          </button>
        </div>

        <!-- Size Buttons -->
        <div *ngIf="attribute.type === 'size' && attribute.displayStyle === 'buttons'" 
             class="size-buttons">
          <button 
            *ngFor="let option of attribute.options"
            type="button"
            mat-stroked-button
            class="size-button"
            [class.selected]="selectedAttributes[attribute.key] === option.value"
            [disabled]="option.disabled"
            [matTooltip]="option.tooltip"
            (click)="selectAttribute(attribute.key, option.value)"
            [attr.aria-label]="'Taille ' + option.label">
            {{ option.label }}
          </button>
        </div>

        <!-- Generic Button Toggle -->
        <mat-button-toggle-group 
          *ngIf="attribute.displayStyle === 'buttons' && attribute.type !== 'size'"
          class="variant-toggle-group"
          [value]="selectedAttributes[attribute.key]"
          (change)="selectAttribute(attribute.key, $event.value)">
          <mat-button-toggle 
            *ngFor="let option of attribute.options"
            [value]="option.value"
            [disabled]="option.disabled"
            [matTooltip]="option.tooltip">
            {{ option.label }}
          </mat-button-toggle>
        </mat-button-toggle-group>

        <!-- Chips Display -->
        <mat-chip-listbox 
          *ngIf="attribute.displayStyle === 'chips'"
          class="variant-chips"
          [value]="selectedAttributes[attribute.key]">
          <mat-chip-option 
            *ngFor="let option of attribute.options"
            [value]="option.value"
            [disabled]="option.disabled"
            [matTooltip]="option.tooltip"
            (click)="selectAttribute(attribute.key, option.value)">
            {{ option.label }}
          </mat-chip-option>
        </mat-chip-listbox>
      </div>

      <!-- Selected Variant Info -->
      <div class="variant-info" *ngIf="selectedVariant">
        <div class="variant-details">
          <div class="variant-name">{{ selectedVariant.name }}</div>
          <div class="variant-sku" *ngIf="selectedVariant.sku">SKU: {{ selectedVariant.sku }}</div>
          
          <!-- Price Display -->
          <div class="price-section">
            <span class="current-price">{{ selectedVariant.price | currency:'EUR':'symbol':'1.2-2' }}</span>
            <span *ngIf="selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price" 
                  class="original-price">{{ selectedVariant.originalPrice | currency:'EUR':'symbol':'1.2-2' }}</span>
            <span *ngIf="getPriceDiscount() > 0" class="discount-badge">-{{ getPriceDiscount() }}%</span>
          </div>

          <!-- Stock Status -->
          <div class="stock-status">
            <ng-container *ngIf="selectedVariant.inStock; else outOfStock">
              <mat-icon class="stock-icon available">check_circle</mat-icon>
              <span class="stock-text available">
                {{ selectedVariant.stockQuantity ? 
                    (selectedVariant.stockQuantity + ' en stock') : 
                    'En stock' }}
              </span>
            </ng-container>
            <ng-template #outOfStock>
              <mat-icon class="stock-icon unavailable">cancel</mat-icon>
              <span class="stock-text unavailable">Rupture de stock</span>
            </ng-template>
          </div>

          <!-- Low Stock Warning -->
          <div *ngIf="isLowStock()" class="low-stock-warning">
            <mat-icon>warning</mat-icon>
            <span>Plus que {{ selectedVariant.stockQuantity }} en stock !</span>
          </div>
        </div>

        <!-- Variant Image -->
        <div class="variant-image" *ngIf="selectedVariant.imageUrl">
          <img [src]="selectedVariant.imageUrl" [alt]="selectedVariant.name" loading="lazy">
        </div>
      </div>

      <!-- Validation Errors -->
      <div class="validation-errors" *ngIf="validationErrors.length > 0">
        <div class="error-message" *ngFor="let error of validationErrors">
          <mat-icon>error</mat-icon>
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .variant-selector {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .variant-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .variant-label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    .required {
      color: #d32f2f;
      margin-left: 4px;
    }

    /* Color Swatches */
    .color-swatches {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 40px;
      height: 40px;
      border: 2px solid #e0e0e0;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }

    .color-swatch:hover:not(.disabled) {
      border-color: #1976d2;
      transform: scale(1.05);
    }

    .color-swatch.selected {
      border-color: #1976d2;
      border-width: 3px;
    }

    .color-swatch.disabled {
      opacity: 0.4;
      cursor: not-allowed;
      position: relative;
    }

    .color-swatch.disabled::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 2px;
      height: 120%;
      background: #d32f2f;
    }

    .check-icon {
      color: white;
      font-size: 20px;
      text-shadow: 0 0 3px rgba(0,0,0,0.5);
    }

    /* Size Buttons */
    .size-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .size-button {
      min-width: 48px;
      height: 48px;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .size-button.selected {
      background: #1976d2;
      color: white;
      border-color: #1976d2;
    }

    .size-button:disabled {
      opacity: 0.4;
      text-decoration: line-through;
    }

    /* Toggle Groups */
    .variant-toggle-group {
      flex-wrap: wrap;
    }

    /* Chips */
    .variant-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Variant Info */
    .variant-info {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .variant-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .variant-name {
      font-weight: 600;
      font-size: 16px;
      color: #333;
    }

    .variant-sku {
      font-size: 12px;
      color: #666;
      font-family: monospace;
    }

    .price-section {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
    }

    .current-price {
      font-size: 20px;
      font-weight: 700;
      color: #1976d2;
    }

    .original-price {
      font-size: 16px;
      color: #999;
      text-decoration: line-through;
    }

    .discount-badge {
      background: #4caf50;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .stock-status {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stock-icon {
      font-size: 18px;
    }

    .stock-icon.available {
      color: #4caf50;
    }

    .stock-icon.unavailable {
      color: #f44336;
    }

    .stock-text {
      font-size: 14px;
      font-weight: 500;
    }

    .stock-text.available {
      color: #4caf50;
    }

    .stock-text.unavailable {
      color: #f44336;
    }

    .low-stock-warning {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ff9800;
      font-size: 13px;
      font-weight: 500;
    }

    .low-stock-warning mat-icon {
      font-size: 16px;
    }

    .variant-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .variant-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Validation Errors */
    .validation-errors {
      background: #ffebee;
      border: 1px solid #f44336;
      border-radius: 4px;
      padding: 12px;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #d32f2f;
      font-size: 14px;
    }

    .error-message mat-icon {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .variant-info {
        flex-direction: column;
      }
      
      .variant-image {
        width: 100%;
        height: 200px;
      }
      
      .color-swatches {
        justify-content: center;
      }
      
      .size-buttons {
        justify-content: center;
      }
    }
  `]
})
export class VariantSelectorComponent implements OnInit {
  @Input() variants: VariantOption[] = []
  @Input() attributes: VariantAttribute[] = []
  @Input() defaultVariant?: VariantOption
  @Input() showPricing: boolean = true
  @Input() showStock: boolean = true
  @Input() lowStockThreshold: number = 5

  @Output() variantSelected = new EventEmitter<VariantOption | null>()
  @Output() attributeChanged = new EventEmitter<{ key: string, value: string }>()
  @Output() validationChanged = new EventEmitter<boolean>()

  private analyticsService = inject(AnalyticsService)

  selectedAttributes: Record<string, string> = {}
  selectedVariant: VariantOption | null = null
  validationErrors: string[] = []

  ngOnInit() {
    // Set default variant if provided
    if (this.defaultVariant) {
      this.selectedVariant = this.defaultVariant
      this.selectedAttributes = { ...this.defaultVariant.attributes }
      this.variantSelected.emit(this.selectedVariant)
    } else if (this.variants.length > 0) {
      // Auto-select first available variant
      const firstAvailable = this.variants.find(v => v.inStock) || this.variants[0]
      if (firstAvailable) {
        this.selectedVariant = firstAvailable
        this.selectedAttributes = { ...firstAvailable.attributes }
        this.variantSelected.emit(this.selectedVariant)
      }
    }

    this.validateSelection()
  }

  selectAttribute(key: string, value: string) {
    this.selectedAttributes[key] = value
    this.attributeChanged.emit({ key, value })
    
    // Find matching variant
    this.findMatchingVariant()
    
    // Validate selection
    this.validateSelection()

    // Track analytics
    this.analyticsService.trackClick('variant_selector', 'product_detail', {
      attribute: key,
      value: value,
      variantId: this.selectedVariant?.id
    })
  }

  private findMatchingVariant() {
    const matchingVariant = this.variants.find(variant => {
      return Object.entries(this.selectedAttributes).every(([key, value]) => {
        return variant.attributes[key] === value
      })
    })

    if (matchingVariant && matchingVariant !== this.selectedVariant) {
      this.selectedVariant = matchingVariant
      this.variantSelected.emit(this.selectedVariant)
    } else if (!matchingVariant) {
      this.selectedVariant = null
      this.variantSelected.emit(null)
    }
  }

  private validateSelection(): boolean {
    this.validationErrors = []

    // Check required attributes
    for (const attribute of this.attributes) {
      if (attribute.required && !this.selectedAttributes[attribute.key]) {
        this.validationErrors.push(`Veuillez sélectionner ${attribute.label.toLowerCase()}`)
      }
    }

    // Check if selected variant is available
    if (this.selectedVariant && !this.selectedVariant.inStock) {
      this.validationErrors.push('Cette variante n\'est pas disponible')
    }

    const isValid = this.validationErrors.length === 0 && this.selectedVariant !== null
    this.validationChanged.emit(isValid)
    
    return isValid
  }

  getPriceDiscount(): number {
    if (!this.selectedVariant?.originalPrice || !this.selectedVariant.price) {
      return 0
    }
    
    const discount = ((this.selectedVariant.originalPrice - this.selectedVariant.price) / this.selectedVariant.originalPrice) * 100
    return Math.round(discount)
  }

  isLowStock(): boolean {
    return this.selectedVariant?.inStock && 
           this.selectedVariant.stockQuantity !== undefined && 
           this.selectedVariant.stockQuantity <= this.lowStockThreshold
  }

  // Public method to get current selection state
  getSelectionState(): {
    isValid: boolean
    selectedVariant: VariantOption | null
    selectedAttributes: Record<string, string>
    errors: string[]
  } {
    return {
      isValid: this.validateSelection(),
      selectedVariant: this.selectedVariant,
      selectedAttributes: this.selectedAttributes,
      errors: this.validationErrors
    }
  }

  // Reset selection
  resetSelection() {
    this.selectedAttributes = {}
    this.selectedVariant = null
    this.validationErrors = []
    this.variantSelected.emit(null)
    this.validationChanged.emit(false)
  }
}

import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip'
import { AnalyticsService } from '../../../core/services/analytics.service'

export interface VariantOption {
  id: number
  name: string
  value: string
  price: number
  originalPrice?: number
  inStock: boolean
  stockQuantity?: number
  sku?: string
  imageUrl?: string
  description?: string
  isDefault?: boolean
  attributes: Record<string, string>
}

export interface VariantAttribute {
  key: string
  label: string
  type: 'color' | 'size' | 'material' | 'style' | 'text'
  required: boolean
  displayStyle: 'buttons' | 'dropdown' | 'chips' | 'color-swatches'
  options: Array<{
    value: string
    label: string
    color?: string // For color swatches
    disabled?: boolean
    tooltip?: string
  }>
}

@Component({
  selector: 'app-variant-selector',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatTooltipModule
  ],
  template: `
    <div class="variant-selector" *ngIf="attributes.length > 0">
      
      <!-- Variant Attributes -->
      <div class="variant-section" *ngFor="let attribute of attributes">
        <label class="variant-label">
          {{ attribute.label }}
          <span class="required" *ngIf="attribute.required">*</span>
        </label>

        <!-- Color Swatches -->
        <div *ngIf="attribute.type === 'color' && attribute.displayStyle === 'color-swatches'" 
             class="color-swatches">
          <button 
            *ngFor="let option of attribute.options"
            type="button"
            class="color-swatch"
            [class.selected]="selectedAttributes[attribute.key] === option.value"
            [class.disabled]="option.disabled"
            [style.background-color]="option.color"
            [matTooltip]="option.tooltip || option.label"
            [disabled]="option.disabled"
            (click)="selectAttribute(attribute.key, option.value)"
            [attr.aria-label]="'Couleur ' + option.label">
            <mat-icon *ngIf="selectedAttributes[attribute.key] === option.value" class="check-icon">check</mat-icon>
          </button>
        </div>

        <!-- Size Buttons -->
        <div *ngIf="attribute.type === 'size' && attribute.displayStyle === 'buttons'" 
             class="size-buttons">
          <button 
            *ngFor="let option of attribute.options"
            type="button"
            mat-stroked-button
            class="size-button"
            [class.selected]="selectedAttributes[attribute.key] === option.value"
            [disabled]="option.disabled"
            [matTooltip]="option.tooltip"
            (click)="selectAttribute(attribute.key, option.value)"
            [attr.aria-label]="'Taille ' + option.label">
            {{ option.label }}
          </button>
        </div>

        <!-- Generic Button Toggle -->
        <mat-button-toggle-group 
          *ngIf="attribute.displayStyle === 'buttons' && attribute.type !== 'size'"
          class="variant-toggle-group"
          [value]="selectedAttributes[attribute.key]"
          (change)="selectAttribute(attribute.key, $event.value)">
          <mat-button-toggle 
            *ngFor="let option of attribute.options"
            [value]="option.value"
            [disabled]="option.disabled"
            [matTooltip]="option.tooltip">
            {{ option.label }}
          </mat-button-toggle>
        </mat-button-toggle-group>

        <!-- Chips Display -->
        <mat-chip-listbox 
          *ngIf="attribute.displayStyle === 'chips'"
          class="variant-chips"
          [value]="selectedAttributes[attribute.key]">
          <mat-chip-option 
            *ngFor="let option of attribute.options"
            [value]="option.value"
            [disabled]="option.disabled"
            [matTooltip]="option.tooltip"
            (click)="selectAttribute(attribute.key, option.value)">
            {{ option.label }}
          </mat-chip-option>
        </mat-chip-listbox>
      </div>

      <!-- Selected Variant Info -->
      <div class="variant-info" *ngIf="selectedVariant">
        <div class="variant-details">
          <div class="variant-name">{{ selectedVariant.name }}</div>
          <div class="variant-sku" *ngIf="selectedVariant.sku">SKU: {{ selectedVariant.sku }}</div>
          
          <!-- Price Display -->
          <div class="price-section">
            <span class="current-price">{{ selectedVariant.price | currency:'EUR':'symbol':'1.2-2' }}</span>
            <span *ngIf="selectedVariant.originalPrice && selectedVariant.originalPrice > selectedVariant.price" 
                  class="original-price">{{ selectedVariant.originalPrice | currency:'EUR':'symbol':'1.2-2' }}</span>
            <span *ngIf="getPriceDiscount() > 0" class="discount-badge">-{{ getPriceDiscount() }}%</span>
          </div>

          <!-- Stock Status -->
          <div class="stock-status">
            <ng-container *ngIf="selectedVariant.inStock; else outOfStock">
              <mat-icon class="stock-icon available">check_circle</mat-icon>
              <span class="stock-text available">
                {{ selectedVariant.stockQuantity ? 
                    (selectedVariant.stockQuantity + ' en stock') : 
                    'En stock' }}
              </span>
            </ng-container>
            <ng-template #outOfStock>
              <mat-icon class="stock-icon unavailable">cancel</mat-icon>
              <span class="stock-text unavailable">Rupture de stock</span>
            </ng-template>
          </div>

          <!-- Low Stock Warning -->
          <div *ngIf="isLowStock()" class="low-stock-warning">
            <mat-icon>warning</mat-icon>
            <span>Plus que {{ selectedVariant.stockQuantity }} en stock !</span>
          </div>
        </div>

        <!-- Variant Image -->
        <div class="variant-image" *ngIf="selectedVariant.imageUrl">
          <img [src]="selectedVariant.imageUrl" [alt]="selectedVariant.name" loading="lazy">
        </div>
      </div>

      <!-- Validation Errors -->
      <div class="validation-errors" *ngIf="validationErrors.length > 0">
        <div class="error-message" *ngFor="let error of validationErrors">
          <mat-icon>error</mat-icon>
          <span>{{ error }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .variant-selector {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .variant-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .variant-label {
      font-weight: 500;
      color: #333;
      font-size: 14px;
    }

    .required {
      color: #d32f2f;
      margin-left: 4px;
    }

    /* Color Swatches */
    .color-swatches {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .color-swatch {
      width: 40px;
      height: 40px;
      border: 2px solid #e0e0e0;
      border-radius: 50%;
      cursor: pointer;
      transition: all 0.2s ease;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      background: white;
    }

    .color-swatch:hover:not(.disabled) {
      border-color: #1976d2;
      transform: scale(1.05);
    }

    .color-swatch.selected {
      border-color: #1976d2;
      border-width: 3px;
    }

    .color-swatch.disabled {
      opacity: 0.4;
      cursor: not-allowed;
      position: relative;
    }

    .color-swatch.disabled::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      width: 2px;
      height: 120%;
      background: #d32f2f;
    }

    .check-icon {
      color: white;
      font-size: 20px;
      text-shadow: 0 0 3px rgba(0,0,0,0.5);
    }

    /* Size Buttons */
    .size-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .size-button {
      min-width: 48px;
      height: 48px;
      border-radius: 8px;
      font-weight: 500;
      transition: all 0.2s ease;
    }

    .size-button.selected {
      background: #1976d2;
      color: white;
      border-color: #1976d2;
    }

    .size-button:disabled {
      opacity: 0.4;
      text-decoration: line-through;
    }

    /* Toggle Groups */
    .variant-toggle-group {
      flex-wrap: wrap;
    }

    /* Chips */
    .variant-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    /* Variant Info */
    .variant-info {
      display: flex;
      gap: 16px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .variant-details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .variant-name {
      font-weight: 600;
      font-size: 16px;
      color: #333;
    }

    .variant-sku {
      font-size: 12px;
      color: #666;
      font-family: monospace;
    }

    .price-section {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
    }

    .current-price {
      font-size: 20px;
      font-weight: 700;
      color: #1976d2;
    }

    .original-price {
      font-size: 16px;
      color: #999;
      text-decoration: line-through;
    }

    .discount-badge {
      background: #4caf50;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
    }

    .stock-status {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .stock-icon {
      font-size: 18px;
    }

    .stock-icon.available {
      color: #4caf50;
    }

    .stock-icon.unavailable {
      color: #f44336;
    }

    .stock-text {
      font-size: 14px;
      font-weight: 500;
    }

    .stock-text.available {
      color: #4caf50;
    }

    .stock-text.unavailable {
      color: #f44336;
    }

    .low-stock-warning {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ff9800;
      font-size: 13px;
      font-weight: 500;
    }

    .low-stock-warning mat-icon {
      font-size: 16px;
    }

    .variant-image {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      overflow: hidden;
      flex-shrink: 0;
    }

    .variant-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    /* Validation Errors */
    .validation-errors {
      background: #ffebee;
      border: 1px solid #f44336;
      border-radius: 4px;
      padding: 12px;
    }

    .error-message {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #d32f2f;
      font-size: 14px;
    }

    .error-message mat-icon {
      font-size: 18px;
    }

    @media (max-width: 768px) {
      .variant-info {
        flex-direction: column;
      }
      
      .variant-image {
        width: 100%;
        height: 200px;
      }
      
      .color-swatches {
        justify-content: center;
      }
      
      .size-buttons {
        justify-content: center;
      }
    }
  `]
})
export class VariantSelectorComponent implements OnInit {
  @Input() variants: VariantOption[] = []
  @Input() attributes: VariantAttribute[] = []
  @Input() defaultVariant?: VariantOption
  @Input() showPricing: boolean = true
  @Input() showStock: boolean = true
  @Input() lowStockThreshold: number = 5

  @Output() variantSelected = new EventEmitter<VariantOption | null>()
  @Output() attributeChanged = new EventEmitter<{ key: string, value: string }>()
  @Output() validationChanged = new EventEmitter<boolean>()

  private analyticsService = inject(AnalyticsService)

  selectedAttributes: Record<string, string> = {}
  selectedVariant: VariantOption | null = null
  validationErrors: string[] = []

  ngOnInit() {
    // Set default variant if provided
    if (this.defaultVariant) {
      this.selectedVariant = this.defaultVariant
      this.selectedAttributes = { ...this.defaultVariant.attributes }
      this.variantSelected.emit(this.selectedVariant)
    } else if (this.variants.length > 0) {
      // Auto-select first available variant
      const firstAvailable = this.variants.find(v => v.inStock) || this.variants[0]
      if (firstAvailable) {
        this.selectedVariant = firstAvailable
        this.selectedAttributes = { ...firstAvailable.attributes }
        this.variantSelected.emit(this.selectedVariant)
      }
    }

    this.validateSelection()
  }

  selectAttribute(key: string, value: string) {
    this.selectedAttributes[key] = value
    this.attributeChanged.emit({ key, value })
    
    // Find matching variant
    this.findMatchingVariant()
    
    // Validate selection
    this.validateSelection()

    // Track analytics
    this.analyticsService.trackClick('variant_selector', 'product_detail', {
      attribute: key,
      value: value,
      variantId: this.selectedVariant?.id
    })
  }

  private findMatchingVariant() {
    const matchingVariant = this.variants.find(variant => {
      return Object.entries(this.selectedAttributes).every(([key, value]) => {
        return variant.attributes[key] === value
      })
    })

    if (matchingVariant && matchingVariant !== this.selectedVariant) {
      this.selectedVariant = matchingVariant
      this.variantSelected.emit(this.selectedVariant)
    } else if (!matchingVariant) {
      this.selectedVariant = null
      this.variantSelected.emit(null)
    }
  }

  private validateSelection(): boolean {
    this.validationErrors = []

    // Check required attributes
    for (const attribute of this.attributes) {
      if (attribute.required && !this.selectedAttributes[attribute.key]) {
        this.validationErrors.push(`Veuillez sélectionner ${attribute.label.toLowerCase()}`)
      }
    }

    // Check if selected variant is available
    if (this.selectedVariant && !this.selectedVariant.inStock) {
      this.validationErrors.push('Cette variante n\'est pas disponible')
    }

    const isValid = this.validationErrors.length === 0 && this.selectedVariant !== null
    this.validationChanged.emit(isValid)
    
    return isValid
  }

  getPriceDiscount(): number {
    if (!this.selectedVariant?.originalPrice || !this.selectedVariant.price) {
      return 0
    }
    
    const discount = ((this.selectedVariant.originalPrice - this.selectedVariant.price) / this.selectedVariant.originalPrice) * 100
    return Math.round(discount)
  }

  isLowStock(): boolean {
    return this.selectedVariant?.inStock && 
           this.selectedVariant.stockQuantity !== undefined && 
           this.selectedVariant.stockQuantity <= this.lowStockThreshold
  }

  // Public method to get current selection state
  getSelectionState(): {
    isValid: boolean
    selectedVariant: VariantOption | null
    selectedAttributes: Record<string, string>
    errors: string[]
  } {
    return {
      isValid: this.validateSelection(),
      selectedVariant: this.selectedVariant,
      selectedAttributes: this.selectedAttributes,
      errors: this.validationErrors
    }
  }

  // Reset selection
  resetSelection() {
    this.selectedAttributes = {}
    this.selectedVariant = null
    this.validationErrors = []
    this.variantSelected.emit(null)
    this.validationChanged.emit(false)
  }
}









