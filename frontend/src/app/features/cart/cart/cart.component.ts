import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CartService } from '@core/services/cart.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit, OnDestroy {
  cart: any;
  cart$!: Observable<any>;
  private cartService = inject(CartService);
  private router = inject(Router);
  private cartSubscription?: any;

  ngOnInit(): void {
    // Expose observable for async template binding and load current state
    this.cart$ = this.cartService.getCart();
    this.cartSubscription = this.cart$.subscribe(c => { if (c) this.cart = c; });
  }

  ngOnDestroy(): void {
    this.cartSubscription?.unsubscribe?.();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cart = data;
      },
      (error) => {
        console.error('Error loading cart:', error);
        // TODO: Implement user-friendly error handling
      }
    );
  }

  updateQuantity(item: any): void {
    // Ensure quantity is at least 1
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    // Unified update so it works for guest and authenticated carts
    this.cartService.updateQuantity(item.id, item.quantity).subscribe(
      (data) => {
        if (data) this.cart = data;
      },
      (error) => {
        console.error('Error updating item quantity:', error);
        // TODO: Implement user-friendly error handling (e.g., check for insufficient stock)
        this.cartService.refreshCart();
      }
    );
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId).subscribe(
      (updated) => {
        if (updated) this.cart = updated;
      },
      (error) => {
        console.error('Error removing item from cart:', error);
      }
    );
  }

  clearCart(): void {
    this.cartService.clearCart().subscribe(
      () => {
        this.loadCart();
      },
      (error) => {
        console.error('Error clearing cart:', error);
        // TODO: Implement user-friendly error handling
      }
    );
  }

  trackByItemId = (_: number, item: any) => item.id;

  get subtotal(): number {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce(
      (sum: number, item: any) => sum + ((item.unitPrice ?? item.price ?? 0) * (item.quantity ?? 0)),
      0
    );
  }

  get total(): number {
    const backendTotal = this.cart?.total;
    return typeof backendTotal === 'number' ? backendTotal : this.subtotal;
  }

  calcSubtotal(cart: any): number {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce(
      (sum: number, item: any) => sum + ((item.unitPrice ?? item.price ?? 0) * (item.quantity ?? 0)),
      0
    );
  }

  calcTotal(cart: any): number {
    const backendTotal = cart?.total;
    return typeof backendTotal === 'number' ? backendTotal : this.calcSubtotal(cart);
  }

  get isCartEmpty(): boolean {
    return !this.cart || !this.cart.items || this.cart.items.length === 0;
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
  

