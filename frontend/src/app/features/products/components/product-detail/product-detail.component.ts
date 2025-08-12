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
        this.selectedImage = (product.imageUrls && product.imageUrls.length) ? product.imageUrls[0] : ""
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
    this.selectedImage = image
  }

  addToCart(): void {
    if (!this.product) return

    // Check if user is authenticated first
    const authService = inject(AuthService)
    if (!authService.isAuthenticated()) {
      const snackBarRef = this.snackBar.open("Please login to add items to cart", "Login", {
        duration: 5000
      })
      snackBarRef.onAction().subscribe(() => {
        inject(Router).navigate(['/auth/login'])
      })
      return
    }

    this.cartService
      .addItemToCart({
        productId: this.product.id,
        productName: this.product.name,
        quantity: this.quantity,
        unitPrice: this.product.displayedPrice,
      })
      .subscribe({
        next: () => {
          this.snackBar.open(`${this.product!.name} added to cart!`, "Close", {
            duration: 3000,
          })
        },
        error: (error) => {
          console.error("Error adding to cart:", error)
          if (error.status === 401) {
            const snackBarRef = this.snackBar.open("Please login to add items to cart", "Login", {
              duration: 5000,
            })
            snackBarRef.onAction().subscribe(() => {
              inject(Router).navigate(['/auth/login'])
            })
          } else {
            this.snackBar.open("Error adding product to cart", "Close", {
              duration: 3000,
            })
          }
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
}
