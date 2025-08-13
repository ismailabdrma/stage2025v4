import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, ActivatedRoute, Router } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ProductService } from "@core/services/product.service"
import { CartService } from "@core/services/cart.service"
import { AuthService } from "@core/services/auth.service"
import { WishlistService } from "@core/services/wishlist.service"
import type { Product } from "@core/models/product.model"
import { environment } from "@environments/environment"
import { BuyNowButtonComponent } from "@shared/components/buy-now-button/buy-now-button.component"

@Component({
  selector: "app-product-detail",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BuyNowButtonComponent,
  ],
  templateUrl: "./product-detail.component.html",
  styleUrl: "./product-detail.component.scss",
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private productService = inject(ProductService)
  private cartService = inject(CartService)
  private wishlistService = inject(WishlistService)
  private snackBar = inject(MatSnackBar)

  product: Product | null = null
  loading = true
  quantity = 1
  selectedImage = ""
  isInWishlist = false
  buyNowProduct: any

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"]
    if (id) {
      this.loadProduct(+id)
    }
  }

  loadProduct(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.product = product
        const firstImage = (product.imageUrls && product.imageUrls.length) ? product.imageUrls[0] : ""
        this.selectedImage = this.resolveImageUrl(firstImage) || ""
        this.buyNowProduct = {
          id: product.id,
          name: product.name,
          image: firstImage,
          basePrice: product.displayedPrice,
          category: product.categoryName,
          brand: (product as any).brand
        }
        this.wishlistService.isInWishlist(product.id).subscribe(inWishlist => {
          this.isInWishlist = inWishlist;
        });
        this.loading = false
      },
      error: (error) => {
        this.loading = false
        this.product = null
      },
    })
  }

  selectImage(image: string): void {
    this.selectedImage = this.resolveImageUrl(image) || '/assets/placeholder-product.jpg'
  }

  addToCart(): void {
    if (!this.product) return

    // Use unified cart service that supports guest or auth carts
    this.cartService
      .addItem({
        productId: this.product.id,
        quantity: this.quantity,
        price: this.product.displayedPrice,
        productName: this.product.name,
        productImage: (this.product.imageUrls && this.product.imageUrls.length ? this.product.imageUrls[0] : undefined),
      })
      .subscribe({
        next: () => {
          this.snackBar.open(`${this.product!.name} added to cart!`, "Close", { duration: 3000 })
        },
        error: () => {
          this.snackBar.open("Error adding product to cart", "Close", { duration: 3000 })
        },
      })
  }

  addToWishlist(): void {
    if (!this.product) return

    if (this.isInWishlist) {
      this.wishlistService.removeFromWishlist(this.product.id)
      this.isInWishlist = false
      this.snackBar.open(`${this.product.name} removed from favorites!`, "Close", {
        duration: 3000,
      })
    } else {
      const wishlistItem = {
        productId: this.product.id,
        productName: this.product.name,
        productImage: this.product.imageUrls?.[0],
        price: this.product.displayedPrice
      };
      this.wishlistService.addToWishlist(wishlistItem).subscribe(() => {
        this.isInWishlist = true;
        this.snackBar.open(`${this.product?.name} added to favorites!`, "Close", {
          duration: 3000,
        });
      });
    }
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
      const clean = url.replace(/^\/?(images\/?)/, '')
      return `${environment.apiUrl}/uploads/images/${clean}`
    }
  }
}
