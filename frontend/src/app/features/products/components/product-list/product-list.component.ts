import { Component, type OnInit, inject, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule, Router, ActivatedRoute } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatSelectModule } from "@angular/material/select"
import { MatChipsModule } from "@angular/material/chips"
import { MatDividerModule } from "@angular/material/divider"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBar } from "@angular/material/snack-bar"
import { ProductService } from "@core/services/product.service"
import { CartService } from "@core/services/cart.service"
import { SupplierService } from "@core/services/supplier.service"
import type { Product, Category } from "@core/models/product.model"
import type { Supplier } from "@core/models/supplier.model"
import { trigger, transition, style, animate } from "@angular/animations"

@Component({
  selector: "app-product-list",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.scss",
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(6px)" }),
        animate("200ms ease-out", style({ opacity: 1, transform: "none" })),
      ]),
    ]),
  ],
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService)
  private cartService = inject(CartService)
  private supplierService = inject(SupplierService)
  private snackBar = inject(MatSnackBar)
  private router = inject(Router)
  private route = inject(ActivatedRoute)

  products: Product[] = []
  categories: Category[] = []
  suppliers: Supplier[] = []
  filteredProducts: Product[] = []
  loading = true
  error: string | null = null
  loadingSuppliers = false

  // Filters
  searchTerm = ""
  selectedCategory = ""
  selectedSupplier = ""
  minPrice: number | null = null
  maxPrice: number | null = null
  sortBy: "relevance" | "newest" | "priceAsc" | "priceDesc" = "relevance"

  ngOnInit(): void {
    // Read from query params to pre-populate filters
    const qp = this.route.snapshot.queryParamMap
    this.searchTerm = qp.get("search") || this.searchTerm
    this.selectedCategory = qp.get("category") || this.selectedCategory
    this.selectedSupplier = qp.get("supplier") || this.selectedSupplier
    const min = qp.get("minPrice"); const max = qp.get("maxPrice")
    this.minPrice = min !== null ? Number(min) : this.minPrice
    this.maxPrice = max !== null ? Number(max) : this.maxPrice

    this.loadProducts()
    this.loadCategories()
    this.loadSuppliers()
  }

  private updateUrl(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm || null,
        category: this.selectedCategory || null,
        supplier: this.selectedSupplier || null,
        minPrice: this.minPrice ?? null,
        maxPrice: this.maxPrice ?? null,
      },
      queryParamsHandling: "merge",
    })
  }

  loadProducts(): void {
    this.loading = true
    const params: any = {}
    if (this.selectedCategory) params.category = this.selectedCategory
    if (this.selectedSupplier) params.supplier = this.selectedSupplier
    if (this.searchTerm) params.search = this.searchTerm
    if (this.minPrice != null) params.minPrice = this.minPrice
    if (this.maxPrice != null) params.maxPrice = this.maxPrice

    this.productService.getAllProducts(params).subscribe({
      next: (products) => {
        this.products = products
        this.filteredProducts = this.applyLocalSort(products)
        this.loading = false
        this.error = null
      },
      error: (error) => {
        console.error("Error loading products:", error)
        this.loading = false
        this.error = "Failed to load products"
        this.snackBar.open("Failed to load products", "Close", { duration: 3000 })
      },
    })
  }

  loadCategories(): void {
    this.productService.getAllCategories().subscribe({
      next: (categories) => (this.categories = categories),
      error: () => void 0,
    })
  }

  loadSuppliers(): void {
    this.loadingSuppliers = true
    this.supplierService.getAllSuppliers().subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers
        this.loadingSuppliers = false
      },
      error: () => {
        this.loadingSuppliers = false
        this.snackBar.open("Failed to load suppliers for filtering.", "Close", { duration: 3000 })
      },
    })
  }

  onSearch(): void { this.updateUrl(); this.loadProducts() }
  onCategoryChange(): void { this.updateUrl(); this.loadProducts() }
  onSupplierChange(): void { this.updateUrl(); this.loadProducts() }
  onPriceChange(): void { this.updateUrl(); this.loadProducts() }
  onSortChange(): void { this.filteredProducts = this.applyLocalSort(this.filteredProducts.slice()) }

  clearFilter(kind: "search" | "category" | "supplier" | "minPrice" | "maxPrice"): void {
    if (kind === "search") this.searchTerm = ""
    if (kind === "category") this.selectedCategory = ""
    if (kind === "supplier") this.selectedSupplier = ""
    if (kind === "minPrice") this.minPrice = null
    if (kind === "maxPrice") this.maxPrice = null
    this.updateUrl()
    this.loadProducts()
  }

  private applyLocalSort(list: Product[]): Product[] {
    switch (this.sortBy) {
      case "priceAsc":
        return list.sort((a, b) => a.displayedPrice - b.displayedPrice)
      case "priceDesc":
        return list.sort((a, b) => b.displayedPrice - a.displayedPrice)
      case "newest":
        return list.slice().reverse()
      default:
        return list
    }
  }

  addToCart(product: Product): void {
    this.cartService
      .addItemToCart({
        productId: product.id,
        productName: product.name,
        quantity: 1,
        unitPrice: product.displayedPrice,
      })
      .subscribe({
        next: () => this.snackBar.open(`${product.name} added to cart!`, "Close", { duration: 3000 }),
        error: () => this.snackBar.open("Error adding product to cart", "Close", { duration: 3000 }),
      })
  }
}
