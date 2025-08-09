

import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatTableModule } from "@angular/material/table"
import { MatInputModule } from "@angular/material/input"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ConfirmDialogComponent } from "@shared/components/confirm-dialog/confirm-dialog.component" // Assuming path to ConfirmDialogComponent
import { CartService } from "@core/services/cart.service"
import type { Cart, CartItem } from "@core/models/cart.model"

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  template: `
    <div class="cart-container">
      <div class="page-header">
        <h1>Panier</h1>
        <p class="subtitle">Gérez vos articles avant de finaliser votre commande</p>
      </div>

      <div class="cart-layout" *ngIf="!loading && cart && cart.items.length > 0">
        <div class="cart-main">
          <mat-card class="items-card">
            <mat-card-header>
              <mat-card-title>Articles dans votre panier</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="cart-items">
                <div *ngFor="let item of cart.items" class="cart-item">
                  <div class="item-image">
                    <mat-icon>shopping_bag</mat-icon>
                  </div>
                  <div class="item-details">
                    <h3>{{ item.productName }}</h3>
                    <p class="item-price">{{ item.unitPrice | currency:'EUR':'symbol':'1.2-2':'fr-FR' }}</p>
                  </div>
                  <div class="quantity-controls">
                    <button mat-icon-button (click)="updateQuantity(item, item.quantity - 1)" class="quantity-btn">
                      <mat-icon>remove</mat-icon>
                    </button>
                    <span class="quantity">{{ item.quantity }}</span>
                    <button mat-icon-button (click)="updateQuantity(item, item.quantity + 1)" class="quantity-btn">
                      <mat-icon>add</mat-icon>
                    </button>
                  </div>
                  <div class="item-total">
                    <span class="total-price">{{ (item.unitPrice * item.quantity) | currency:'EUR':'symbol':'1.2-2':'fr-FR' }}</span>
                  </div>
                  <div class="item-actions">
                    <button mat-icon-button (click)="removeItem(item)" class="remove-btn">
                      <mat-icon>delete_outline</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <div class="cart-sidebar">
          <mat-card class="summary-card">
            <mat-card-header>
              <mat-card-title>Récapitulatif</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="summary-content">
                <div class="summary-line">
                  <span>Sous-total</span>
                  <span>{{ getCartTotal() | currency:'EUR':'symbol':'1.2-2':'fr-FR' }}</span>
                </div>
                <div class="summary-line">
                  <span>Frais de livraison</span>
                  <span>Gratuit</span>
                </div>
                <div class="summary-line total">
                  <span>Total</span>
                  <span>{{ getCartTotal() | currency:'EUR':'symbol':'1.2-2':'fr-FR' }}</span>
                </div>
                <div class="cart-actions">
                  <button mat-stroked-button (click)="clearCart()" class="clear-btn">Vider le panier</button>
                  <button mat-raised-button color="primary" class="cta" routerLink="/orders/checkout">
                    Passer la commande
                  </button>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Chargement du panier…</p>
      </div>

      <div *ngIf="!loading && (!cart || cart.items.length === 0)" class="empty-cart">
        <mat-card class="empty-card">
          <mat-card-content>
            <div class="empty-content">
              <mat-icon class="empty-icon">shopping_cart</mat-icon>
              <h2>Votre panier est vide</h2>
              <p>Découvrez nos produits et ajoutez vos articles préférés.</p>
              <button mat-raised-button color="primary" class="cta" routerLink="/products">
                Voir les produits
              </button>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .cart-container { 
      max-width: 1200px; 
      margin: 0 auto; 
      padding: 24px; 
    }

    .page-header { 
      margin-bottom: 32px; 
    }
    .page-header h1 { 
      font-size: 2rem; 
      font-weight: 700; 
      color: #1B1B1B; 
      margin: 0 0 8px; 
    }
    .page-header .subtitle { 
      color: #6A6A6A; 
      margin: 0; 
      font-size: 1rem; 
    }

    .cart-layout { 
      display: grid; 
      grid-template-columns: 1fr 360px; 
      gap: 24px; 
    }

    .cart-main { 
      min-height: 400px; 
    }
    .items-card { 
      border-radius: 12px; 
    }

    .cart-items { 
      display: flex; 
      flex-direction: column; 
      gap: 16px; 
    }
    .cart-item { 
      display: grid; 
      grid-template-columns: 60px 1fr auto auto auto; 
      gap: 16px; 
      align-items: center; 
      padding: 16px; 
      border: 1px solid rgba(0,0,0,0.08); 
      border-radius: 12px; 
      background: #FFFFFF; 
    }

    .item-image { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      width: 60px; 
      height: 60px; 
      background: #F9F9F9; 
      border-radius: 8px; 
    }
    .item-image mat-icon { 
      color: #6A6A6A; 
      font-size: 24px; 
    }

    .item-details h3 { 
      margin: 0 0 4px; 
      font-weight: 600; 
      color: #1B1B1B; 
    }
    .item-details .item-price { 
      margin: 0; 
      color: #6A6A6A; 
      font-size: 14px; 
    }

    .quantity-controls { 
      display: flex; 
      align-items: center; 
      gap: 8px; 
    }
    .quantity-btn { 
      width: 32px; 
      height: 32px; 
      border-radius: 50%; 
    }
    .quantity { 
      min-width: 40px; 
      text-align: center; 
      font-weight: 600; 
    }

    .item-total .total-price { 
      font-weight: 700; 
      color: #1B1B1B; 
    }

    .remove-btn { 
      color: #FF5252; 
    }

    .cart-sidebar { 
      position: sticky; 
      top: 24px; 
      align-self: start; 
    }
    .summary-card { 
      border-radius: 12px; 
    }

    .summary-content { 
      display: flex; 
      flex-direction: column; 
      gap: 16px; 
    }
    .summary-line { 
      display: flex; 
      justify-content: space-between; 
      padding: 8px 0; 
    }
    .summary-line.total { 
      font-weight: 700; 
      font-size: 18px; 
      color: #1B1B1B; 
      border-top: 1px solid rgba(0,0,0,0.12); 
      padding-top: 16px; 
    }

    .cart-actions { 
      display: flex; 
      flex-direction: column; 
      gap: 12px; 
      margin-top: 16px; 
    }
    .cta { 
      background: #FFEA00; 
      color: #1B1B1B; 
      font-weight: 700; 
      border-radius: 12px; 
    }
    .clear-btn { 
      border-radius: 12px; 
    }

    .loading-container { 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      padding: 80px 20px; 
    }

    .empty-cart { 
      display: flex; 
      justify-content: center; 
      margin-top: 40px; 
    }
    .empty-card { 
      max-width: 400px; 
      border-radius: 12px; 
    }
    .empty-content { 
      text-align: center; 
      padding: 40px 20px; 
    }
    .empty-icon { 
      font-size: 64px; 
      color: #6A6A6A; 
      margin-bottom: 16px; 
    }
    .empty-content h2 { 
      margin: 0 0 8px; 
      color: #1B1B1B; 
    }
    .empty-content p { 
      color: #6A6A6A; 
      margin-bottom: 24px; 
    }

    @media (max-width: 1024px) {
      .cart-layout { 
        grid-template-columns: 1fr; 
        gap: 16px; 
      }
      .cart-sidebar { 
        position: static; 
        order: -1; 
      }
      .cart-item { 
        grid-template-columns: 1fr; 
        gap: 12px; 
        text-align: center; 
      }
    }
  `],
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService)

  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)
  cart: Cart | null = null
  loading = true
  displayedColumns = ["product", "price", "quantity", "total", "actions"]

  ngOnInit(): void {
    this.loadCart()
  }

  loadCart(): void {
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart
        this.loading = false
      },
      error: (error) => {
        console.error("Error loading cart:", error)
        this.loading = false
      },
    })
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(item)
      return
    }

    this.cartService.updateItemQuantity(item.id, newQuantity).subscribe({
      next: (cart) => {
        this.cart = cart
      },
      error: (error: any) => {
        let errorMessage = 'Failed to update quantity.';
        if (error.status === 400 && error.error?.message) {
          errorMessage = error.error.message;
        }
        console.error("Error updating quantity:", error)
      },
    })
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItemFromCart(item.id).subscribe({
      next: () => {
        this.loadCart()
      },
      error: (error: any) => {
        this.snackBar.open('Failed to remove item from cart.', 'Close', { duration: 3000 });

        console.error("Error removing item:", error)
      },
    })
  }

  clearCart(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Clear Cart",
        message: "Are you sure you want to clear your cart?",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cartService.clearCart().subscribe({
          next: () => this.loadCart(),
          error: (error: any) => {
            this.snackBar.open('Failed to clear cart.', 'Close', { duration: 3000 });
            console.error("Error clearing cart:", error)
          },
        })
      }
    })
  }

  getCartTotal(): number {
    if (!this.cart || !this.cart.items) return 0
    return this.cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
  }
}
