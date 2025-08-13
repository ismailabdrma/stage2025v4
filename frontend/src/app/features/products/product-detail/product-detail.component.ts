import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button'
import { environment } from '@environments/environment'
import { CartService } from '@core/services/cart.service';
import { ProductCardComponent } from '@shared/components/product-card/product-card.component'
import { BuyNowButtonComponent } from '@shared/components/buy-now-button/buy-now-button.component'
@Component({
 // Add MatProgressSpinnerModule if not already imported in a shared module
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, BuyNowButtonComponent, MatButtonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  product: any;
  suggestedProducts: any[] = [];
  loadingProduct = true;
  imageUrls: string[] = [];
  buyNowProduct: any

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const productId = Number(params.get('id'));
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  loadProduct(id: number): void {
    this.loadingProduct = true;
    this.productService.getProductById(id).subscribe(
      (data) => {
        this.product = data;
        this.imageUrls = data.imageUrls || [];
        this.buyNowProduct = {
          id: data.id,
          name: data.name,
          image: (data.imageUrl ?? (data.imageUrls && data.imageUrls.length ? data.imageUrls[0] : undefined)),
          basePrice: data.displayedPrice,
          category: data.categoryName,
          brand: data.brand
        }
        this.loadingProduct = false;
        this.loadSuggestedProducts(id); // Load suggested products after main product
      },
      (error) => {
        console.error('Error fetching product details:', error);
        this.snackBar.open('Failed to load product details. Please try again.', 'Close', {
          duration: 3000,
        });
        this.loadingProduct = false;
      }
    );
  }

  loadSuggestedProducts(productId: number): void {
    // Add a loading indicator for suggested products if needed
    this.productService.getSuggestedProducts(productId).subscribe(
      (data) => {
        this.suggestedProducts = data;
      },
      (error) => {
        console.error('Error fetching suggested products:', error);
        this.snackBar.open('Failed to load suggested products.', 'Close', { duration: 3000 });
      }
    )
  }

  get isProductAvailable(): boolean {
    if (!this.product) return false
    const qty = this.product.syncedStock ?? this.product.stockQuantity ?? 0
    return qty > 0
  }

  addToCart(): void {
    if (this.product) {
      const cartItem = { 
        productId: this.product.id, 
        quantity: 1,
        price: this.product.displayedPrice,
        productName: this.product.name,
        productImage: (this.product.imageUrl ?? (this.product.imageUrls && this.product.imageUrls.length ? this.product.imageUrls[0] : undefined))
      };
      this.cartService.addItem(cartItem).subscribe(
        (response) => {
          console.log('Product added to cart', response);
          this.snackBar.open('Product added to cart!', 'Close', { duration: 3000 });
        },
        (error) => {
          console.error('Error adding product to cart:', error);
          this.snackBar.open('Failed to add product to cart.', 'Close', { duration: 3000 });
        }
      );
    }
  }

  addToWishlist(): void {
    this.snackBar.open('Adding to wishlist is not yet implemented.', 'Close', { duration: 3000 });
  }

  resolveImageUrl(url?: string): string | undefined {
    if (!url) return undefined;
    if (url.startsWith('/api/') || url.startsWith('/uploads/')) {
      return `${environment.apiUrl}${url}`;
    }
    return url;
  }
}