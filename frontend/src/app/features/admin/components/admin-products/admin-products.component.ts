import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { ProductService } from "@core/services/product.service"
import type { Product } from "@core/models/product.model"
import { CreateProductDialogComponent } from "./create-product-dialog/create-product-dialog.component"
import { ConfirmDialogComponent } from "../../../../shared/components/confirm-dialog/confirm-dialog.component"
import { environment } from "@environments/environment"

@Component({
  selector: "app-admin-products",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  templateUrl: "./admin-products.component.html",
  styleUrl: "./admin-products.component.scss",
})
export class AdminProductsComponent implements OnInit {
  private productService = inject(ProductService)
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)

  products: Product[] = []
  displayedColumns: string[] = ["image", "id", "name", "category", "price", "stock", "actions"]
  loading = false
  
  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true
    this.productService.getAllProducts({ includeInactive: true }).subscribe({
      next: (products) => {
        console.log('[AdminProducts] loaded products:', products?.length, products)
        this.products = products || []
        this.loading = false
      },
      error: (error) => {
        console.error('[AdminProducts] load error:', error)
        this.snackBar.open(`Error loading products: ${error?.message || error?.status}`, "Close", { duration: 3500 })
        this.products = []
        this.loading = false
      },
    })
  }

  openCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      width: "500px",
      data: null,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts()
      }
    })
  }

  openEditProductDialog(product: Product): void {
    const dialogRef = this.dialog.open(CreateProductDialogComponent, {
      width: "500px",
      data: product,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadProducts()
      }
    })
  }

  deleteProduct(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Confirm Deletion",
        message: "Are you sure you want to delete this product?",
      },
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('🗑️ Attempting to delete product with ID:', id);
        this.productService.deleteProduct(id).subscribe({
          next: () => {
            console.log('✅ Product deleted successfully:', id);
            this.snackBar.open("Product deleted successfully.", "Close", { duration: 3000 })
            this.loadProducts()
          },
          error: (error) => {
            console.error('❌ Error deleting product:', error);
            console.error('Error details:', error);
            this.snackBar.open(`Error deleting product: ${error.error?.message || error.message || 'Unknown error'}`, "Close", { duration: 5000 })
          },
        })
      }
    })
  }

  toggleProductStatus(product: Product): void {
    const newStatus = !(product as any).active
    this.productService.updateProductStatus(product.id, newStatus).subscribe({
      next: (updatedProduct: any) => {
        this.snackBar.open(`Product ${updatedProduct.active ? 'activated' : 'deactivated'} successfully.`, "Close", { duration: 3000 })
        this.loadProducts()
      },
      error: () => {
        this.snackBar.open("Error updating product status.", "Close", { duration: 3000 })
      },
    })
  }

  // Resolve image URLs that come from backend proxy or uploads
  resolveImageUrl(url?: string): string {
    if (!url) return 'assets/placeholder.png'
    if (url.startsWith('/api/') || url.startsWith('/uploads/') || url.startsWith('/images/')) {
      return `${environment.apiUrl}${url}`
    }
    return url
  }
}
