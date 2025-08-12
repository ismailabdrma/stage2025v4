import { Component, Input, Output, EventEmitter, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatBadgeModule } from '@angular/material/badge'
import { CartService } from '../../../core/services/cart.service'
import { Cart, CartItem } from '../../../core/models/cart.model'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-mini-cart-drawer',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatBadgeModule
  ],
  template: `
    <div class="mini-cart-overlay" [class.open]="isOpen" (click)="close()">
      <div class="mini-cart-drawer" (click)="$event.stopPropagation()">
        <div class="drawer-header">
          <h3><mat-icon>shopping_cart</mat-icon> Panier ({{ cart?.itemCount || 0 }})</h3>
          <button mat-icon-button (click)="close()" aria-label="Fermer le panier">
            <mat-icon>close</mat-icon>
          </button>
        </div>

        <div class="drawer-content" *ngIf="cart && cart.items.length > 0; else emptyCart">
          <div class="cart-items">
            <div class="cart-item" *ngFor="let item of cart.items; trackBy: trackByItemId">
              <div class="item-image">
                <img [src]="item.productImage || '/assets/placeholder-product.jpg'" 
                     [alt]="item.productName" 
                     loading="lazy">
              </div>
              <div class="item-details">
                <h4 class="item-name">{{ item.productName }}</h4>
                <p class="item-variant" *ngIf="item.variant">{{ item.variant }}</p>
                <div class="item-price-qty">
                  <span class="price">{{ item.price | currency:'EUR':'symbol':'1.2-2' }}</span>
                  <div class="quantity-controls">
                    <button mat-icon-button 
                            class="qty-btn"
                            (click)="updateQuantity(item.id, item.quantity - 1)"
                            [disabled]="item.quantity <= 1"
                            aria-label="Diminuer la quantité">
                      <mat-icon>remove</mat-icon>
                    </button>
                    <span class="qty">{{ item.quantity }}</span>
                    <button mat-icon-button 
                            class="qty-btn"
                            (click)="updateQuantity(item.id, item.quantity + 1)"
                            aria-label="Augmenter la quantité">
                      <mat-icon>add</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
              <button mat-icon-button 
                      class="remove-btn"
                      (click)="removeItem(item.id)"
                      aria-label="Supprimer du panier">
                <mat-icon>delete_outline</mat-icon>
              </button>
            </div>
          </div>

          <mat-divider></mat-divider>

          <div class="drawer-footer">
            <div class="total-section">
              <div class="subtotal">
                <span>Sous-total:</span>
                <span class="amount">{{ cart.total | currency:'EUR':'symbol':'1.2-2' }}</span>
              </div>
              <p class="shipping-note">Livraison et taxes calculées au checkout</p>
            </div>

            <div class="action-buttons">
              <button mat-stroked-button 
                      class="view-cart-btn"
                      routerLink="/cart"
                      (click)="close()">
                Voir le panier
              </button>
              <button mat-raised-button 
                      color="primary"
                      class="checkout-btn"
                      routerLink="/checkout"
                      (click)="close()">
                Commander
              </button>
            </div>

            <!-- Upsells section -->
            <div class="upsells" *ngIf="suggestedItems && suggestedItems.length > 0">
              <h4>Souvent achetés ensemble</h4>
              <div class="suggested-items">
                <div class="suggested-item" *ngFor="let item of suggestedItems">
                  <img [src]="item.image" [alt]="item.name" loading="lazy">
                  <div class="suggested-details">
                    <span class="suggested-name">{{ item.name }}</span>
                    <span class="suggested-price">{{ item.price | currency:'EUR':'symbol':'1.2-2' }}</span>
                  </div>
                  <button mat-icon-button 
                          (click)="addSuggestedItem(item)"
                          aria-label="Ajouter au panier">
                    <mat-icon>add</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ng-template #emptyCart>
          <div class="empty-cart">
            <mat-icon class="empty-icon">shopping_cart_outlined</mat-icon>
            <h3>Votre panier est vide</h3>
            <p>Découvrez nos produits et ajoutez vos favoris au panier</p>
            <button mat-raised-button 
                    color="primary"
                    routerLink="/products"
                    (click)="close()">
              Commencer mes achats
            </button>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  styles: [`
    .mini-cart-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1100;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .mini-cart-overlay.open {
      opacity: 1;
      visibility: visible;
    }

    .mini-cart-drawer {
      position: absolute;
      top: 0;
      right: 0;
      width: 400px;
      max-width: 90vw;
      height: 100vh;
      background: white;
      box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
      transform: translateX(100%);
      transition: transform 0.3s ease;
      display: flex;
      flex-direction: column;
    }

    .mini-cart-overlay.open .mini-cart-drawer {
      transform: translateX(0);
    }

    .drawer-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #e0e0e0;
      background: #f8f9fa;
    }

    .drawer-header h3 {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 500;
    }

    .drawer-content {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .cart-items {
      flex: 1;
      padding: 0;
    }

    .cart-item {
      display: flex;
      align-items: flex-start;
      padding: 16px 20px;
      border-bottom: 1px solid #f0f0f0;
      gap: 12px;
    }

    .item-image {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      border-radius: 8px;
      overflow: hidden;
      background: #f5f5f5;
    }

    .item-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .item-details {
      flex: 1;
      min-width: 0;
    }

    .item-name {
      font-size: 14px;
      font-weight: 500;
      margin: 0 0 4px 0;
      line-height: 1.3;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .item-variant {
      font-size: 12px;
      color: #666;
      margin: 0 0 8px 0;
    }

    .item-price-qty {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .price {
      font-weight: 600;
      color: #1976d2;
    }

    .quantity-controls {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .qty-btn {
      width: 28px;
      height: 28px;
      line-height: 1;
    }

    .qty-btn mat-icon {
      font-size: 16px;
    }

    .qty {
      min-width: 32px;
      text-align: center;
      font-weight: 500;
    }

    .remove-btn {
      color: #666;
      flex-shrink: 0;
    }

    .remove-btn:hover {
      color: #d32f2f;
    }

    .drawer-footer {
      border-top: 1px solid #e0e0e0;
      padding: 20px;
    }

    .total-section {
      margin-bottom: 16px;
    }

    .subtotal {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 4px;
    }

    .amount {
      color: #1976d2;
    }

    .shipping-note {
      font-size: 12px;
      color: #666;
      margin: 0;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }

    .view-cart-btn {
      flex: 1;
    }

    .checkout-btn {
      flex: 1;
    }

    .upsells {
      border-top: 1px solid #f0f0f0;
      padding-top: 16px;
    }

    .upsells h4 {
      font-size: 14px;
      margin: 0 0 12px 0;
      color: #333;
    }

    .suggested-items {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .suggested-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      border-radius: 6px;
      background: #f8f9fa;
    }

    .suggested-item img {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      object-fit: cover;
    }

    .suggested-details {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .suggested-name {
      font-size: 12px;
      font-weight: 500;
      line-height: 1.2;
    }

    .suggested-price {
      font-size: 11px;
      color: #1976d2;
      font-weight: 600;
    }

    .empty-cart {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      text-align: center;
    }

    .empty-icon {
      font-size: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }

    .empty-cart h3 {
      margin: 0 0 8px 0;
      color: #333;
    }

    .empty-cart p {
      color: #666;
      margin: 0 0 24px 0;
      line-height: 1.4;
    }

    @media (max-width: 480px) {
      .mini-cart-drawer {
        width: 100vw;
      }
      
      .cart-item {
        padding: 12px 16px;
      }
      
      .drawer-footer {
        padding: 16px;
      }
      
      .action-buttons {
        flex-direction: column;
      }
    }
  `]
})
export class MiniCartDrawerComponent implements OnInit {
  @Input() isOpen = false
  @Output() closeDrawer = new EventEmitter<void>()

  private cartService = inject(CartService)
  
  cart$: Observable<Cart | null> = this.cartService.getCart()
  cart: Cart | null = null
  suggestedItems: any[] = [] // TODO: implement suggested items logic

  ngOnInit() {
    this.cart$.subscribe(cart => {
      this.cart = cart
    })
  }

  close() {
    this.closeDrawer.emit()
  }

  trackByItemId(index: number, item: CartItem): number {
    return item.id
  }

  updateQuantity(itemId: number, newQuantity: number) {
    if (newQuantity <= 0) {
      this.removeItem(itemId)
      return
    }
    this.cartService.updateQuantity(itemId, newQuantity).subscribe()
  }

  removeItem(itemId: number) {
    this.cartService.removeItem(itemId).subscribe()
  }

  addSuggestedItem(item: any) {
    // TODO: implement add to cart logic
    console.log('Adding suggested item:', item)
  }
}
