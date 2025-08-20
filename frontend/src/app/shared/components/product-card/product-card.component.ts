import { Component, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { ToastService } from '../toast-notification/toast-notification.component';
import { environment } from '@environments/environment';

export interface ProductCard {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl?: string;
  description?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  stockQuantity?: number;
  discount?: number;
  isNew?: boolean;
  isBestseller?: boolean;
  category?: string;
  brand?: string;
  slug?: string;
  externalProductId?: string;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatCardModule, 
    MatBadgeModule,
    MatTooltipModule
  ],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  @Input() product!: ProductCard;
  @Input() showQuickActions = true;
  @Input() showWishlist = true;
  @Input() showCompare = false;
  @Input() layout: 'grid' | 'list' = 'grid';

  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private analyticsService = inject(AnalyticsService);
  private toastService = inject(ToastService);

  isInWishlist = false;
  isAddingToCart = false;
  Math = Math; // Expose Math to template

  ngOnInit() {
    if (this.product && this.showWishlist) {
      this.checkWishlistStatus();
    }
  }

  private checkWishlistStatus() {
    this.wishlistService.isInWishlist(this.product.id).subscribe(inWishlist => {
      this.isInWishlist = inWishlist;
    });
  }

  onProductClick() {
    this.analyticsService.trackProductView({
      id: this.product.id,
      name: this.product.name,
      category: this.product.category,
      brand: this.product.brand,
      price: this.product.price
    });
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    if (this.isAddingToCart || !this.product.inStock) return;
    
    this.isAddingToCart = true;
    
    const cartItem = {
      productId: this.product.id,
      quantity: 1,
      price: this.product.price,
      productName: this.product.name,
      productImage: this.product.imageUrl,
      externalProductId: this.product.externalProductId
    };

    this.cartService.addItem(cartItem).subscribe({
      next: () => {
        this.isAddingToCart = false;
        this.toastService.addedToCart(this.product.name);
        
        this.analyticsService.trackAddToCart({
          id: this.product.id,
          name: this.product.name,
          category: this.product.category,
          brand: this.product.brand,
          price: this.product.price,
          quantity: 1
        });
      },
      error: (error) => {
        this.isAddingToCart = false;
        console.error('Failed to add to cart:', error);
        this.toastService.error('Erreur lors de l\'ajout au panier');
      }
    });
  }

  onToggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    const wishlistItem = {
      productId: this.product.id,
      productName: this.product.name,
      productImage: this.product.imageUrl,
      price: this.product.price
    };

    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id).subscribe(() => {
        this.isInWishlist = false;
        this.toastService.info('Retiré des favoris');
      });
    } else {
      this.wishlistService.addToWishlist(wishlistItem).subscribe(() => {
        this.isInWishlist = true;
        this.toastService.addedToWishlist(this.product.name);
        
        this.analyticsService.trackAddToWishlist({
          id: this.product.id,
          name: this.product.name,
          category: this.product.category,
          brand: this.product.brand,
          price: this.product.price
        });
      });
    }
  }

  onQuickView(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    // TODO: Implement quick view modal
    console.log('Quick view for product:', this.product.id);
  }

  get hasDiscount(): boolean {
    return !!(this.product.originalPrice && this.product.originalPrice > this.product.price);
  }

  get discountPercentage(): number {
    if (!this.hasDiscount) return 0;
    return Math.round(((this.product.originalPrice! - this.product.price) / this.product.originalPrice!) * 100);
  }

  get stockStatus(): 'in-stock' | 'low-stock' | 'out-of-stock' {
    const qty = this.product.stockQuantity ?? 0
    if (!this.product.inStock || qty <= 0) return 'out-of-stock'
    if (qty <= 5) return 'low-stock'
    return 'in-stock'
  }

  get productUrl(): string {
    return this.product.slug ? `/products/${this.product.slug}` : `/products/${this.product.id}`;
  }

  resolveImageUrl(url?: string): string | undefined {
    if (!url) return undefined
    if (url.startsWith('data:image')) return url
    if (url.startsWith('/api/') || url.startsWith('/uploads/') || url.startsWith('/images/')) {
      return `${environment.apiUrl}${url}`
    }
    try {
      new URL(url)
      return url
    } catch {
      // bare filename or relative path → default to /uploads/images
      const clean = url.replace(/^\/?(images\/?)/, '')
      return `${environment.apiUrl}/uploads/images/${clean}`
    }
  }
}