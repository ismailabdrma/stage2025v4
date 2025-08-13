import { Component, OnInit, inject, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { Product, Category } from '@core/models/product.model';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-product-approval',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  template: `
    <div class="product-approval-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Product Approval Management</mat-card-title>
          <mat-card-subtitle>Review and approve imported products before making them live</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <!-- Filters -->
          <div class="filters-section">
            <mat-form-field appearance="outline">
              <mat-label>Status Filter</mat-label>
              <mat-select [(ngModel)]="statusFilter" (selectionChange)="applyFilters()">
                <mat-option value="">All Products</mat-option>
                <mat-option value="PENDING">Pending Approval</mat-option>
                <mat-option value="APPROVED">Approved</mat-option>
                <mat-option value="REJECTED">Rejected</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Search Products</mat-label>
              <input matInput [(ngModel)]="searchTerm" (input)="applyFilters()" placeholder="Search by name or description">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>

            <button mat-raised-button color="primary" (click)="loadProducts()">
              <mat-icon>refresh</mat-icon>
              Refresh
            </button>
          </div>

          <!-- Products Table -->
          <div *ngIf="loading" class="loading-container">
            <mat-spinner></mat-spinner>
            <p>Loading products...</p>
          </div>

          <div *ngIf="!loading && filteredProducts.length > 0" class="table-container">
            <table mat-table [dataSource]="filteredProducts" matSort class="products-table">
              <!-- Image Column -->
               <ng-container matColumnDef="image">
                <th mat-header-cell *matHeaderCellDef>Image</th>
                <td mat-cell *matCellDef="let product">
                  <img *ngIf="product.imageUrls && product.imageUrls.length > 0" 
                       [src]="resolveImageUrl(product.imageUrls[0])" 
                       [alt]="product.name"
                       class="product-image">
                  <div *ngIf="!product.imageUrls || product.imageUrls.length === 0" class="no-image">
                    No Image
                  </div>
                </td>
              </ng-container>

              <!-- Name Column -->
              <ng-container matColumnDef="name">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Name</th>
                <td mat-cell *matCellDef="let product">{{ product.name }}</td>
              </ng-container>

              <!-- Price Column -->
              <ng-container matColumnDef="price">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Price</th>
                <td mat-cell *matCellDef="let product">\${{ product.displayedPrice | number:'1.2-2' }}</td>
              </ng-container>

              <!-- Stock Column -->
              <ng-container matColumnDef="stock">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Stock</th>
                <td mat-cell *matCellDef="let product">{{ product.syncedStock || 'N/A' }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let product">
                  <span [class]="'status-badge status-' + getProductStatus(product).toLowerCase()">
                    {{ getProductStatus(product) }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let product">
                  <button mat-icon-button (click)="editProduct(product)" matTooltip="Edit Product">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="approveProduct(product)" 
                          *ngIf="!isProductActive(product)"
                          matTooltip="Approve Product">
                    <mat-icon>check</mat-icon>
                  </button>
                  <button mat-icon-button (click)="rejectProduct(product)" 
                          *ngIf="!isProductActive(product)"
                          matTooltip="Reject Product">
                    <mat-icon>close</mat-icon>
                  </button>
                  <button mat-icon-button (click)="deactivateProduct(product)" 
                          *ngIf="isProductActive(product)"
                          matTooltip="Deactivate Product">
                    <mat-icon>block</mat-icon>
                  </button>
                </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>

            <mat-paginator [pageSizeOptions]="[10, 25, 50, 100]" 
                          showFirstLastButtons 
                          aria-label="Select page of products">
            </mat-paginator>
          </div>

          <div *ngIf="!loading && filteredProducts.length === 0" class="no-products">
            <mat-icon>inventory_2</mat-icon>
            <h3>No products found</h3>
            <p>No products match your current filters.</p>
          </div>

          <!-- Bulk Actions -->
          <div *ngIf="selectedProducts.length > 0" class="bulk-actions">
            <mat-card>
              <mat-card-content>
                <p>{{ selectedProducts.length }} products selected</p>
                <button mat-raised-button color="primary" (click)="bulkApprove()">
                  <mat-icon>check</mat-icon>
                  Approve Selected
                </button>
                <button mat-raised-button color="warn" (click)="bulkReject()">
                  <mat-icon>close</mat-icon>
                  Reject Selected
                </button>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-card-content>
      </mat-card>
    </div>

    <!-- Product Edit Dialog -->
    <ng-template #productEditDialog>
      <div class="dialog-container">
        <h2 mat-dialog-title>Edit Product</h2>
        <mat-dialog-content>
          <form [formGroup]="productForm" class="product-form">
            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Product Name</mat-label>
                <input matInput formControlName="name" required>
                <mat-error *ngIf="productForm.get('name')?.hasError('required')">
                  Product name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Category</mat-label>
                <mat-select formControlName="categoryName" required>
                  <mat-option *ngFor="let category of categories" [value]="category.name">
                    {{ category.name }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="productForm.get('categoryName')?.hasError('required')">
                  Category is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>

            <div class="form-row">
              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Display Price</mat-label>
                <input matInput type="number" formControlName="displayedPrice" required>
                <mat-error *ngIf="productForm.get('displayedPrice')?.hasError('required')">
                  Display price is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline" class="half-width">
                <mat-label>Stock</mat-label>
                <input matInput type="number" formControlName="syncedStock" required>
                <mat-error *ngIf="productForm.get('syncedStock')?.hasError('required')">
                  Stock is required
                </mat-error>
              </mat-form-field>
            </div>

            <mat-checkbox formControlName="active">
              Make product active (visible to customers)
            </mat-checkbox>
          </form>
        </mat-dialog-content>
        <mat-dialog-actions align="end">
          <button mat-button mat-dialog-close>Cancel</button>
          <button mat-raised-button color="primary" (click)="saveProduct()" [disabled]="productForm.invalid || saving">
            <mat-spinner *ngIf="saving" diameter="20"></mat-spinner>
            <span *ngIf="!saving">Save Changes</span>
          </button>
        </mat-dialog-actions>
      </div>
    </ng-template>
  `,
  styles: [`
    .product-approval-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .filters-section {
      display: flex;
      gap: 16px;
      margin-bottom: 24px;
      flex-wrap: wrap;
      align-items: center;
    }

    .filters-section mat-form-field {
      min-width: 200px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px;
    }

    .table-container {
      margin-top: 20px;
    }

    .products-table {
      width: 100%;
    }

    .product-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
    }

    .no-image {
      width: 50px;
      height: 50px;
      background-color: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      font-size: 12px;
      color: #666;
    }

    .status-badge {
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-pending {
      background-color: #fff3cd;
      color: #856404;
    }

    .status-approved {
      background-color: #d4edda;
      color: #155724;
    }

    .status-rejected {
      background-color: #f8d7da;
      color: #721c24;
    }

    .status-active {
      background-color: #d4edda;
      color: #155724;
    }

    .status-inactive {
      background-color: #f8d7da;
      color: #721c24;
    }

    .no-products {
      text-align: center;
      padding: 40px;
      color: #666;
    }

    .no-products mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
    }

    .bulk-actions {
      margin-top: 20px;
    }

    .dialog-container {
      padding: 20px;
      min-width: 500px;
    }

    .product-form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .form-row {
      display: flex;
      gap: 16px;
    }

    .full-width {
      width: 100%;
    }

    .half-width {
      flex: 1;
    }

    @media (max-width: 768px) {
      .filters-section {
        flex-direction: column;
      }
      
      .form-row {
        flex-direction: column;
      }
      
      .dialog-container {
        min-width: 300px;
      }
    }
  `]
})
export class ProductApprovalComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private fb = inject(FormBuilder);

  @ViewChild('productEditDialog', { static: true }) productEditDialog!: TemplateRef<any>;

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  selectedProducts: Product[] = [];
  loading = true;
  saving = false;

  // Filters
  statusFilter = '';
  searchTerm = '';

  // Table
  displayedColumns = ['image', 'name', 'price', 'stock', 'status', 'actions'];

  // Form
  productForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    categoryName: ['', Validators.required],
    displayedPrice: ['', [Validators.required, Validators.min(0)]],
    syncedStock: ['', [Validators.required, Validators.min(0)]],
    active: [false]
  });
  
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts(): void {
    this.loading = true;
    console.log('Loading products for admin panel...');

    // First try to get all products using the simple endpoint
    this.productService.getAllProducts().subscribe({
      next: (products) => {
        console.log('Loaded all products:', products.length, products);
        this.products = products || [];
        this.applyFilters();
        this.loading = false;

        if (this.products.length === 0) {
          console.warn('No products found - trying pending products');
          this.loadPendingProductsFallback();
        }
      },
      error: (error) => {
        console.error('Error loading all products:', error);
        // Try pending products as fallback
        this.loadPendingProductsFallback();
      }
    });
  }

  private loadPendingProductsFallback(): void {
    this.productService.getPendingProducts().subscribe({
      next: (pendingProducts) => {
        console.log('Loaded pending products as fallback:', pendingProducts.length);
        this.products = pendingProducts || [];
        this.applyFilters();
        this.loading = false;

        if (this.products.length === 0) {
          this.snackBar.open('No products found in the system', 'Close', { duration: 3000 });
        }
      },
      error: (fallbackError) => {
        console.error('Fallback also failed:', fallbackError);
        this.snackBar.open(`Failed to load products: ${fallbackError.message || 'Unknown error'}`, 'Close', { duration: 5000 });
        this.loading = false;
        this.products = [];
        this.filteredProducts = [];
      }
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: (categories: any[]) => {
        this.categories = categories;
      },
      error: (error: any) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Search filter
      if (this.searchTerm && !product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
          !product.description?.toLowerCase().includes(this.searchTerm.toLowerCase())) {
        return false;
      }

      // Status filter - simplified for now
      if (this.statusFilter === 'PENDING' && this.isProductActive(product)) {
        return false;
      }
      if (this.statusFilter === 'APPROVED' && !this.isProductActive(product)) {
        return false;
      }

      return true;
    });
  }

  isProductActive(product: Product): boolean {
    return Boolean(product.active);
  }

  getProductStatus(product: Product): string {
    return this.isProductActive(product) ? 'ACTIVE' : 'PENDING';
  }

  resolveImageUrl(url?: string): string | undefined {
    if (!url) return undefined;

    // Handle data URLs (base64 images)
    if (url.startsWith('data:image')) return url;

    // Handle absolute URLs
    if (url.startsWith('http://') || url.startsWith('https://')) return url;

    // Handle API paths that already include the base path
    if (url.startsWith('/api/') || url.startsWith('/uploads/') || url.startsWith('/images/')) {
      return `${environment.apiUrl}${url}`;
    }

    // Handle relative paths - normalize to uploads/images
    const clean = url.replace(/^\/?(images\/)?/, '');
    return `${environment.apiUrl}/uploads/images/${clean}`;
  }

  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description || '',
      categoryName: (product as any).categoryName || '',
      displayedPrice: product.displayedPrice,
      syncedStock: product.syncedStock || 0,
      active: product.active || false
    });

    this.dialog.open(this.productEditDialog, {
      width: '600px',
      disableClose: true
    });
  }

  saveProduct(): void {
    if (this.productForm.invalid || !this.selectedProduct) {
      // Mark all fields as touched to show validation errors
      this.productForm.markAllAsTouched();
      this.snackBar.open('Please fix validation errors before saving', 'Close', { duration: 3000 });
      return;
    }

    this.saving = true;
    const formValue = this.productForm.value;

    // Validate required fields explicitly
    if (!formValue.name || !formValue.categoryName || formValue.displayedPrice == null) {
      this.snackBar.open('Name, Category, and Price are required fields', 'Close', { duration: 3000 });
      this.saving = false;
      return;
    }

    // Ensure we only send fields the backend expects and do not send id in body
    const payload = {
      name: formValue.name.trim(),
      description: formValue.description?.trim() || '',
      categoryName: formValue.categoryName,
      displayedPrice: Number(formValue.displayedPrice),
      syncedStock: Number(formValue.syncedStock) || 0,
      active: Boolean(formValue.active)
    };

    console.log('Saving product with payload:', payload);

    this.productService.updateProduct(this.selectedProduct.id, payload).subscribe({
      next: (product) => {
        this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
        this.loadProducts();
        this.dialog.closeAll();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error updating product:', error);
        const msg = error?.error?.message || error?.message || 'Failed to update product';
        this.snackBar.open(msg, 'Close', { duration: 4000 });
        this.saving = false;
      }
    });
  }

  approveProduct(product: Product): void {
    this.productService.approveProduct(product.id).subscribe({
      next: () => {
        this.snackBar.open('Product approved successfully', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error approving product:', error);
        this.snackBar.open('Failed to approve product', 'Close', { duration: 3000 });
      }
    });
  }

  rejectProduct(product: Product): void {
    this.productService.rejectProduct(product.id).subscribe({
      next: () => {
        this.snackBar.open('Product rejected successfully', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error rejecting product:', error);
        this.snackBar.open('Failed to reject product', 'Close', { duration: 3000 });
      }
    });
  }

  deactivateProduct(product: Product): void {
    this.productService.updateProductStatus(product.id, false).subscribe({
      next: () => {
        this.snackBar.open('Product deactivated successfully', 'Close', { duration: 3000 });
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error deactivating product:', error);
        this.snackBar.open('Failed to deactivate product', 'Close', { duration: 3000 });
      }
    });
  }

  bulkApprove(): void {
    const ids = this.selectedProducts.map(p => p.id);
    this.productService.approveMultipleProducts(ids).subscribe({
      next: () => {
        this.snackBar.open(`${ids.length} products approved successfully`, 'Close', { duration: 3000 });
        this.selectedProducts = [];
        this.loadProducts();
      },
      error: (error) => {
        console.error('Error approving products:', error);
        this.snackBar.open('Failed to approve products', 'Close', { duration: 3000 });
      }
    });
  }

  bulkReject(): void {
    // For bulk reject, we'll need to call individual reject for each product
    // since the backend doesn't have a bulk reject endpoint
    const rejectPromises = this.selectedProducts.map(product => 
      this.productService.rejectProduct(product.id).toPromise()
    );

    Promise.all(rejectPromises).then(() => {
      this.snackBar.open(`${this.selectedProducts.length} products rejected successfully`, 'Close', { duration: 3000 });
      this.selectedProducts = [];
      this.loadProducts();
    }).catch((error) => {
      console.error('Error rejecting products:', error);
      this.snackBar.open('Failed to reject some products', 'Close', { duration: 3000 });
    });
  }
}