import { Component, OnInit, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { ProductService } from '@core/services/product.service';
import { ProductCardComponent, ProductCard } from '@shared/components/product-card/product-card.component';
import { SearchFiltersComponent, FilterOptions, AppliedFilters } from '@shared/components/search-filters/search-filters.component';
import { LoadingSpinnerComponent } from '@shared/components/loading-spinner/loading-spinner.component';
import { ErrorBoundaryComponent } from '@shared/components/error-boundary/error-boundary.component';
import { EmptyStateComponent } from '@shared/components/empty-state/empty-state.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SupplierService } from '@core/services/supplier.service';
import { MatInputModule } from '@angular/material/input';
import { Subject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    ProductCardComponent, 
    SearchFiltersComponent,
    LoadingSpinnerComponent,
    ErrorBoundaryComponent,
    EmptyStateComponent,
    FormsModule, 
    MatProgressSpinnerModule, 
    MatPaginatorModule, 
    MatSelectModule, 
    MatOptionModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  private snackBar = inject(MatSnackBar);
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private supplierService = inject(SupplierService);

  private subscriptions: Subscription[] = [];

  // Data
  products: any[] = [];
  categories: any[] = [];
  suppliers: any[] = [];
  
  // Filter options for search component
  filterOptions: FilterOptions = {
    categories: [],
    suppliers: [],
    priceRange: { min: 0, max: 1000 },
    sortOptions: [
      { value: 'name', label: 'Nom' },
      { value: 'price', label: 'Prix' },
      { value: 'createdAt', label: 'Date de création' },
      { value: 'popularity', label: 'Popularité' }
    ]
  };

  // State
  loadingProducts = true;
  loadingSuppliers = true;
  loadingCategories = true;
  error: { message: string; details?: string } | null = null;
  
  // Pagination
  currentPage: number = 1;
  pageSize: number = 12;
  totalProducts: number = 0;
  totalPages: number = 0;

  // View options
  viewMode: 'grid' | 'list' = 'grid';
  showFilters = true;

  ngOnInit(): void {
    this.loadInitialData();
    this.setupRouteSubscriptions();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadInitialData(): void {
    this.loadCategories();
    this.loadSuppliers();
    this.loadProducts();
  }

  private setupRouteSubscriptions(): void {
    // Subscribe to query params for initial state
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        this.currentPage = +params['page'] || 1;
        this.pageSize = +params['size'] || 12;
        this.loadProducts();
      })
    );
  }

  loadCategories(): void {
    this.loadingCategories = true;
    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.filterOptions.categories = data.map(cat => ({ id: cat.id, name: cat.name }));
        this.loadingCategories = false;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Erreur lors du chargement des catégories', 'Fermer', { duration: 3000 });
        this.loadingCategories = false;
      }
    });
  }

  loadSuppliers(): void {
    this.loadingSuppliers = true;
    this.supplierService.getAllSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.filterOptions.suppliers = data.map(sup => ({ id: sup.id, name: sup.name }));
        this.loadingSuppliers = false;
      },
      error: (error) => {
        console.error('Error fetching suppliers:', error);
        this.snackBar.open('Erreur lors du chargement des fournisseurs', 'Fermer', { duration: 3000 });
        this.loadingSuppliers = false;
      }
    });
  }

  loadProducts(): void {
    this.loadingProducts = true;
    this.error = null;
    
    const params: any = {
      page: this.currentPage - 1,
      size: this.pageSize
    };

    this.productService.getAllProducts(params).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.products = data;
          this.totalProducts = data.length;
        } else {
          this.products = data?.content ?? [];
          this.totalProducts = data?.totalElements ?? this.products.length;
        }
        this.totalPages = Math.ceil(Math.max(1, this.totalProducts) / this.pageSize);
        this.loadingProducts = false;
        this.updateQueryParams();
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.error = {
          message: 'Erreur lors du chargement des produits',
          details: error.message || 'Veuillez réessayer plus tard'
        };
        this.loadingProducts = false;
        this.snackBar.open('Erreur lors du chargement des produits', 'Fermer', { duration: 3000 });
      }
    });
  }

  onFiltersChanged(filters: AppliedFilters): void {
    // Apply filters and reload products
    this.currentPage = 1; // Reset to first page when filters change
    this.loadProducts();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'grid' ? 'list' : 'grid';
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  retry(): void {
    this.error = null;
    this.loadProducts();
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  private updateQueryParams(): void {
    const queryParams: any = {};
    if (this.currentPage > 1) queryParams.page = this.currentPage;
    if (this.pageSize !== 12) queryParams.size = this.pageSize;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }

  get hasProducts(): boolean {
    return this.products.length > 0;
  }

  get isLoading(): boolean {
    return this.loadingProducts || this.loadingCategories || this.loadingSuppliers;
  }

  // Add missing methods referenced in template
  mapToProductCard(product: any): ProductCard {
    return {
      id: product.id,
      name: product.name,
      price: product.displayedPrice,
      originalPrice: product.supplierPrice && product.supplierPrice > product.displayedPrice ? product.supplierPrice : undefined,
      imageUrl: product.imageUrls?.[0],
      description: product.description,
      inStock: (product.syncedStock ?? 0) > 0,
      stockQuantity: product.syncedStock ?? 0,
      category: product.categoryName,
      brand: product.supplierName,
      slug: product.id.toString()
    };
  }

  trackByProductId(index: number, product: any): number {
    return product.id;
  }
}