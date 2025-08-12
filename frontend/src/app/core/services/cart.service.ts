import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, switchMap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Cart, CartItem } from '../models/cart.model';
import { AuthService } from './auth.service';
import { ToastService } from '../../shared/components/toast-notification/toast-notification.component';

interface GuestCartItem {
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  productName: string;
  productImage?: string;
  variant?: string;
  addedAt: string;
}

interface GuestCart {
  items: GuestCartItem[];
  total: number;
  itemCount: number;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly apiUrl = `${environment.apiUrl}/api/cart`;
  private readonly GUEST_CART_KEY = 'guestCart';
  
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  private cartSubject = new BehaviorSubject<Cart | null>(null);
  private guestCartSubject = new BehaviorSubject<GuestCart | null>(null);
  
  cart$ = this.cartSubject.asObservable();
  guestCart$ = this.guestCartSubject.asObservable();

  constructor() {
    // Load guest cart on initialization
    this.loadGuestCart();
    
    // Listen for auth state changes to merge carts
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        this.mergeGuestCartWithUserCart();
      } else {
        // User logged out, start fresh guest cart
        this.loadGuestCart();
      }
    });
  }

  // Main cart observable that returns either user cart or guest cart
  getCart(): Observable<Cart | null> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.getUserCart();
        } else {
          return this.guestCart$.pipe(
            switchMap(guestCart => of(this.convertGuestCartToCart(guestCart)))
          );
        }
      })
    );
  }

  private getUserCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl).pipe(
      tap(cart => this.cartSubject.next(cart)),
      catchError(error => {
        console.error('Failed to load user cart:', error);
        return of({ 
          id: 0, 
          createdDate: new Date().toISOString(), 
          updatedDate: new Date().toISOString(),
          items: [], 
          itemCount: 0,
          total: 0 
        } as Cart);
      })
    );
  }

  private loadGuestCart() {
    const stored = localStorage.getItem(this.GUEST_CART_KEY);
    if (stored) {
      try {
        const guestCart = JSON.parse(stored) as GuestCart;
        this.guestCartSubject.next(guestCart);
      } catch (error) {
        console.error('Failed to parse guest cart:', error);
        this.clearGuestCart();
      }
    } else {
      this.guestCartSubject.next({ items: [], total: 0, itemCount: 0, updatedAt: new Date().toISOString() });
    }
  }

  private saveGuestCart(cart: GuestCart) {
    cart.updatedAt = new Date().toISOString();
    localStorage.setItem(this.GUEST_CART_KEY, JSON.stringify(cart));
    this.guestCartSubject.next(cart);
  }

  private clearGuestCart() {
    localStorage.removeItem(this.GUEST_CART_KEY);
    this.guestCartSubject.next({ items: [], total: 0, itemCount: 0, updatedAt: new Date().toISOString() });
  }

  private convertGuestCartToCart(guestCart: GuestCart | null): Cart | null {
    if (!guestCart) return null;
    
    return {
      items: guestCart.items.map((item, index) => ({
        id: index + 1000, // Temporary IDs for guest items
        productId: item.productId,
        productName: item.productName,
        productImage: item.productImage,
        price: item.price,
        unitPrice: item.price, // Add unitPrice for compatibility
        quantity: item.quantity,
        variant: item.variant,
        variantId: item.variantId
      })),
      itemCount: guestCart.itemCount
    } as Cart;
  }

  // Add item to cart (works for both guest and authenticated users)
  addItem(item: { productId: number, variantId?: number, quantity: number, price: number, productName: string, productImage?: string, variant?: string }): Observable<Cart | null> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.addItemToUserCart(item);
        } else {
          return this.addItemToGuestCart(item);
        }
      }),
      tap(() => {
        this.toastService.addedToCart(item.productName);
      })
    );
  }

  private addItemToUserCart(item: Partial<CartItem>): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/items`, item).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  private addItemToGuestCart(item: { productId: number, variantId?: number, quantity: number, price: number, productName: string, productImage?: string, variant?: string }): Observable<Cart | null> {
    const currentGuestCart = this.guestCartSubject.value || { items: [], total: 0, itemCount: 0, updatedAt: new Date().toISOString() };
    
    // Check if item already exists
    const existingItemIndex = currentGuestCart.items.findIndex(cartItem => 
      cartItem.productId === item.productId && cartItem.variantId === item.variantId
    );

    if (existingItemIndex >= 0) {
      // Update quantity
      currentGuestCart.items[existingItemIndex].quantity += item.quantity;
    } else {
      // Add new item
      const guestCartItem: GuestCartItem = {
        ...item,
        addedAt: new Date().toISOString()
      };
      currentGuestCart.items.push(guestCartItem);
    }

    // Recalculate totals
    this.recalculateGuestCartTotals(currentGuestCart);
    this.saveGuestCart(currentGuestCart);
    
    return of(this.convertGuestCartToCart(currentGuestCart));
  }

  // Update quantity
  updateQuantity(itemId: number, quantity: number): Observable<Cart | null> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.updateUserCartQuantity(itemId, quantity);
        } else {
          return this.updateGuestCartQuantity(itemId, quantity);
        }
      })
    );
  }

  private updateUserCartQuantity(cartItemId: number, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/items/${cartItemId}`, { quantity }).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  private updateGuestCartQuantity(itemId: number, quantity: number): Observable<Cart | null> {
    const currentGuestCart = this.guestCartSubject.value;
    if (!currentGuestCart) return of(null);

    // For guest cart, itemId is the array index + 1000
    const itemIndex = itemId - 1000;
    if (itemIndex >= 0 && itemIndex < currentGuestCart.items.length) {
      if (quantity <= 0) {
        currentGuestCart.items.splice(itemIndex, 1);
      } else {
        currentGuestCart.items[itemIndex].quantity = quantity;
      }
      
      this.recalculateGuestCartTotals(currentGuestCart);
      this.saveGuestCart(currentGuestCart);
    }
    
    return of(this.convertGuestCartToCart(currentGuestCart));
  }

  // Remove item
  removeItem(itemId: number): Observable<Cart | null> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.removeUserCartItem(itemId);
        } else {
          return this.removeGuestCartItem(itemId);
        }
      })
    );
  }

  private removeUserCartItem(cartItemId: number): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/items/${cartItemId}`).pipe(
      tap(cart => this.cartSubject.next(cart))
    );
  }

  private removeGuestCartItem(itemId: number): Observable<Cart | null> {
    const currentGuestCart = this.guestCartSubject.value;
    if (!currentGuestCart) return of(null);

    const itemIndex = itemId - 1000;
    if (itemIndex >= 0 && itemIndex < currentGuestCart.items.length) {
      const removedItem = currentGuestCart.items[itemIndex];
      currentGuestCart.items.splice(itemIndex, 1);
      this.recalculateGuestCartTotals(currentGuestCart);
      this.saveGuestCart(currentGuestCart);
      this.toastService.removedFromCart(removedItem.productName);
    }
    
    return of(this.convertGuestCartToCart(currentGuestCart));
  }

  // Clear cart
  clearCart(): Observable<void> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.http.delete<void>(`${this.apiUrl}/clear`).pipe(
            tap(() => this.cartSubject.next({ 
              id: 0, 
              createdDate: new Date().toISOString(), 
              updatedDate: new Date().toISOString(),
              items: [], 
              itemCount: 0,
              total: 0 
            } as Cart))
          );
        } else {
          this.clearGuestCart();
          return of(void 0);
        }
      })
    );
  }

  // Merge guest cart with user cart after login
  private mergeGuestCartWithUserCart() {
    const guestCart = this.guestCartSubject.value;
    if (!guestCart || guestCart.items.length === 0) {
      // No guest cart to merge, just load user cart
      this.getUserCart().subscribe();
      return;
    }

    // Send guest cart items to server for merging
    this.http.post<Cart>(`${this.apiUrl}/merge`, {
      guestCartItems: guestCart.items
    }).pipe(
      tap(cart => {
        this.cartSubject.next(cart);
        this.clearGuestCart(); // Clear guest cart after successful merge
        if (guestCart.items.length > 0) {
          this.toastService.info(`${guestCart.items.length} articles de votre panier ont été sauvegardés`);
        }
      }),
      catchError(error => {
        console.error('Failed to merge guest cart:', error);
        // Fallback: just load user cart
        return this.getUserCart();
      })
    ).subscribe();
  }

  private recalculateGuestCartTotals(cart: GuestCart) {
    cart.total = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.itemCount = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Get cart item count for badge
  getCartItemCount(): Observable<number> {
    return this.getCart().pipe(
      switchMap(cart => of(cart?.itemCount || 0))
    );
  }

  // Legacy methods for compatibility
  addItemToCart(item: Partial<CartItem>): Observable<Cart> {
    return this.addItemToUserCart(item);
  }

  updateItemQuantity(cartItemId: number, quantity: number): Observable<Cart> {
    return this.updateUserCartQuantity(cartItemId, quantity);
  }

  removeItemFromCart(cartItemId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/item/${cartItemId}`);
  }
}