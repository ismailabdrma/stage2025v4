import { Injectable } from "@angular/core"
import { BehaviorSubject } from "rxjs"
import type { Product } from "../models/product.model"

@Injectable({
  providedIn: "root",
})
export class WishlistService {
  private wishlistKey = "stage2025_wishlist"
  private wishlistSubject = new BehaviorSubject<Product[]>(this.getWishlistFromStorage())

  wishlist$ = this.wishlistSubject.asObservable()

  private getWishlistFromStorage(): Product[] {
    const stored = localStorage.getItem(this.wishlistKey)
    return stored ? JSON.parse(stored) : []
  }

  private saveWishlistToStorage(wishlist: Product[]): void {
    localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist))
    this.wishlistSubject.next(wishlist)
  }

  addToWishlist(product: Product): void {
    const currentWishlist = this.getWishlistFromStorage()
    const exists = currentWishlist.find(item => item.id === product.id)
    
    if (!exists) {
      const newWishlist = [...currentWishlist, product]
      this.saveWishlistToStorage(newWishlist)
    }
  }

  removeFromWishlist(productId: number): void {
    const currentWishlist = this.getWishlistFromStorage()
    const newWishlist = currentWishlist.filter(item => item.id !== productId)
    this.saveWishlistToStorage(newWishlist)
  }

  isInWishlist(productId: number): boolean {
    const currentWishlist = this.getWishlistFromStorage()
    return currentWishlist.some(item => item.id === productId)
  }

  getWishlistCount(): number {
    return this.getWishlistFromStorage().length
  }

  clearWishlist(): void {
    this.saveWishlistToStorage([])
  }
}

