import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable, of, switchMap, tap, catchError } from 'rxjs'
import { environment } from '../../../environments/environment'
import { AuthService } from './auth.service'
import { ToastService } from '../../shared/components/toast-notification/toast-notification.component'

export interface WishlistItem {
  id: number
  productId: number
  productName: string
  productImage?: string
  price: number
  addedAt: string
  variant?: string
  variantId?: number
  inStock?: boolean
  slug?: string
}

export interface Wishlist {
  id: number
  name: string
  items: WishlistItem[]
  isDefault: boolean
  createdAt: string
  updatedAt: string
}

export interface GuestWishlistItem {
  productId: number
  productName: string
  productImage?: string
  price: number
  addedAt: string
  variant?: string
  variantId?: number
}

export interface GuestWishlist {
  items: GuestWishlistItem[]
  updatedAt: string
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient)
  private authService = inject(AuthService)
  private toastService = inject(ToastService)
  private apiUrl = `${environment.apiUrl}/api/wishlists`

  private readonly GUEST_WISHLIST_KEY = 'guestWishlist'
  private wishlistsSubject = new BehaviorSubject<Wishlist[]>([])
  private guestWishlistSubject = new BehaviorSubject<GuestWishlist | null>(null)

  wishlists$ = this.wishlistsSubject.asObservable()
  guestWishlist$ = this.guestWishlistSubject.asObservable()

  constructor() {
    // Load guest wishlist on initialization
    this.loadGuestWishlist()
    
    // Listen for auth state changes to merge wishlists
    this.authService.isAuthenticated$.subscribe(isAuth => {
      if (isAuth) {
        // Backend wishlist API not available yet: avoid HTTP calls
        this.mergeGuestWishlistWithUserWishlist()
      } else {
        // User logged out, start fresh guest wishlist
        this.loadGuestWishlist()
        this.wishlistsSubject.next([])
      }
    })
  }

  // Get all wishlists (user only)
  getWishlists(): Observable<Wishlist[]> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          // No backend: return in-memory list (empty for now)
          return of(this.wishlistsSubject.value)
        } else {
          return of([])
        }
      })
    )
  }

  // Get default wishlist items (works for both guest and authenticated)
  getDefaultWishlistItems(): Observable<WishlistItem[]> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.wishlists$.pipe(
            switchMap(wishlists => {
              const defaultWishlist = wishlists.find(w => w.isDefault)
              return of(defaultWishlist?.items || [])
            })
          )
        } else {
          return this.guestWishlist$.pipe(
            switchMap(guestWishlist => of(this.convertGuestWishlistItems(guestWishlist)))
          )
        }
      })
    )
  }

  private loadUserWishlists(): Observable<Wishlist[]> {
    return this.http.get<Wishlist[]>(this.apiUrl).pipe(
      tap(wishlists => this.wishlistsSubject.next(wishlists)),
      catchError(error => {
        console.error('Failed to load wishlists:', error)
        return of([])
      })
    )
  }

  private loadGuestWishlist() {
    const stored = localStorage.getItem(this.GUEST_WISHLIST_KEY)
    if (stored) {
      try {
        const guestWishlist = JSON.parse(stored) as GuestWishlist
        this.guestWishlistSubject.next(guestWishlist)
      } catch (error) {
        console.error('Failed to parse guest wishlist:', error)
        this.clearGuestWishlist()
      }
    } else {
      this.guestWishlistSubject.next({ items: [], updatedAt: new Date().toISOString() })
    }
  }

  private saveGuestWishlist(wishlist: GuestWishlist) {
    wishlist.updatedAt = new Date().toISOString()
    localStorage.setItem(this.GUEST_WISHLIST_KEY, JSON.stringify(wishlist))
    this.guestWishlistSubject.next(wishlist)
  }

  private clearGuestWishlist() {
    localStorage.removeItem(this.GUEST_WISHLIST_KEY)
    this.guestWishlistSubject.next({ items: [], updatedAt: new Date().toISOString() })
  }

  private convertGuestWishlistItems(guestWishlist: GuestWishlist | null): WishlistItem[] {
    if (!guestWishlist) return []
    
    return guestWishlist.items.map((item, index) => ({
      id: index + 2000, // Temporary IDs for guest items
      productId: item.productId,
      productName: item.productName,
      productImage: item.productImage,
      price: item.price,
      addedAt: item.addedAt,
      variant: item.variant,
      variantId: item.variantId
    }))
  }

  // Add item to wishlist
  addToWishlist(item: { productId: number, productName: string, productImage?: string, price: number, variant?: string, variantId?: number }, wishlistId?: number): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.addToUserWishlist(item, wishlistId)
        } else {
          return this.addToGuestWishlist(item)
        }
      }),
      tap(success => {
        if (success) {
          this.toastService.addedToWishlist(item.productName)
        }
      })
    )
  }

  private addToUserWishlist(item: any, wishlistId?: number): Observable<boolean> {
    // Backend not available: fallback to guest wishlist even when authenticated
    this.toastService.info('Favoris enregistrés localement (mode hors-ligne)')
    return this.addToGuestWishlist(item)
  }

  private addToGuestWishlist(item: { productId: number, productName: string, productImage?: string, price: number, variant?: string, variantId?: number }): Observable<boolean> {
    const currentWishlist = this.guestWishlistSubject.value || { items: [], updatedAt: new Date().toISOString() }
    
    // Check if item already exists
    const existingItemIndex = currentWishlist.items.findIndex(wishlistItem => 
      wishlistItem.productId === item.productId && wishlistItem.variantId === item.variantId
    )

    if (existingItemIndex >= 0) {
      // Item already in wishlist
      this.toastService.info('Ce produit est déjà dans vos favoris')
      return of(false)
    }

    // Add new item
    const guestWishlistItem: GuestWishlistItem = {
      ...item,
      addedAt: new Date().toISOString()
    }
    currentWishlist.items.push(guestWishlistItem)

    this.saveGuestWishlist(currentWishlist)
    return of(true)
  }

  // Remove from wishlist
  removeFromWishlist(productId: number, variantId?: number, wishlistId?: number): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.removeFromUserWishlist(productId, variantId, wishlistId)
        } else {
          return this.removeFromGuestWishlist(productId, variantId)
        }
      })
    )
  }

  private removeFromUserWishlist(productId: number, variantId?: number, wishlistId?: number): Observable<boolean> {
    // Backend not available: fallback to guest wishlist removal
    return this.removeFromGuestWishlist(productId, variantId)
  }

  private removeFromGuestWishlist(productId: number, variantId?: number): Observable<boolean> {
    const currentWishlist = this.guestWishlistSubject.value
    if (!currentWishlist) return of(false)

    const itemIndex = currentWishlist.items.findIndex(item => 
      item.productId === productId && item.variantId === variantId
    )

    if (itemIndex >= 0) {
      currentWishlist.items.splice(itemIndex, 1)
      this.saveGuestWishlist(currentWishlist)
      return of(true)
    }

    return of(false)
  }

  // Check if product is in wishlist
  isInWishlist(productId: number, variantId?: number): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.wishlists$.pipe(
            switchMap(wishlists => {
              const inWishlist = wishlists.some(wishlist => 
                wishlist.items.some(item => 
                  item.productId === productId && item.variantId === variantId
                )
              )
              return of(inWishlist)
            })
          )
        } else {
          return this.guestWishlist$.pipe(
            switchMap(guestWishlist => {
              const inWishlist = guestWishlist?.items.some(item => 
                item.productId === productId && item.variantId === variantId
              ) || false
              return of(inWishlist)
            })
          )
        }
      })
    )
  }

  // Create new wishlist (authenticated users only)
  createWishlist(name: string, isDefault: boolean = false): Observable<Wishlist> {
    return this.http.post<Wishlist>(this.apiUrl, { name, isDefault }).pipe(
      tap(() => this.loadUserWishlists().subscribe())
    )
  }

  // Delete wishlist (authenticated users only)
  deleteWishlist(wishlistId: number): Observable<boolean> {
    return this.http.delete<void>(`${this.apiUrl}/${wishlistId}`).pipe(
      tap(() => this.loadUserWishlists().subscribe()),
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }

  // Get wishlist by ID
  getWishlist(wishlistId: number): Observable<Wishlist | null> {
    return this.http.get<Wishlist>(`${this.apiUrl}/${wishlistId}`).pipe(
      catchError(() => of(null))
    )
  }

  // Merge guest wishlist with user wishlist after login
  private mergeGuestWishlistWithUserWishlist() {
    const guestWishlist = this.guestWishlistSubject.value
    if (!guestWishlist || guestWishlist.items.length === 0) {
      return
    }
    // No backend for wishlists: Avoid HTTP call to /merge; keep items locally and notify user
    this.toastService.info(`${guestWishlist.items.length} favoris conservés (pas de synchronisation serveur)`)    
  }

  private getDefaultWishlistId(): number | null {
    const wishlists = this.wishlistsSubject.value
    const defaultWishlist = wishlists.find(w => w.isDefault)
    return defaultWishlist?.id || null
  }

  // Get wishlist item count
  getWishlistItemCount(): Observable<number> {
    return this.authService.isAuthenticated$.pipe(
      switchMap(isAuthenticated => {
        if (isAuthenticated) {
          return this.wishlists$.pipe(
            switchMap(wishlists => {
              const totalItems = wishlists.reduce((sum, wishlist) => sum + wishlist.items.length, 0)
              return of(totalItems)
            })
          )
        } else {
          return this.guestWishlist$.pipe(
            switchMap(guestWishlist => of(guestWishlist?.items.length || 0))
          )
        }
      })
    )
  }

  // Move item between wishlists (authenticated users only)
  moveToWishlist(itemId: number, fromWishlistId: number, toWishlistId: number): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/${fromWishlistId}/items/${itemId}/move`, {
      targetWishlistId: toWishlistId
    }).pipe(
      tap(() => this.loadUserWishlists().subscribe()),
      switchMap(() => of(true)),
      catchError(() => of(false))
    )
  }
}