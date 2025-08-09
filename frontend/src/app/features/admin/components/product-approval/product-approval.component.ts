import { Component, OnInit, inject } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductService } from '@core/services/product.service';
import { CategoryService } from '@core/services/category.service';
import { Product, Category } from '@core/models/product.model';

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
    MatSortModule
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
              <mat-label>Supplier Filter</mat-label>
              <mat-select [(ngModel)]="supplierFilter" (selectionChange)="applyFilters()">
                <mat-option value="">All Suppliers</mat-option>
                <mat-option *ngFor="let supplier of suppliers" [value]="supplier.id">
                  {{ supplier.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Search Products</mat-label>
              <input matInput [(ngModel)]="searchTerm" (input)="applyFilters()" placeholder="Search by name or description">
              <mat-icon matSuffix>search</mat-icon>
            </mat-form-field>
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
                       [src]="product.imageUrls[0]" 
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

              <!-- Supplier Column -->
              <ng-container matColumnDef="supplier">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Supplier</th>
                <td mat-cell *matCellDef="let product">{{ product.supplier?.name || 'N/A' }}</td>
              </ng-container>

              <!-- Price Column -->
              <ng-container matColumnDef="price">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Price</th>
                <td mat-cell *matCellDef="let product">${{ product.displayedPrice | number:'1.2-2' }}</td>
              </ng-container>

              <!-- Stock Column -->
              <ng-container matColumnDef="stock">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Stock</th>
                <td mat-cell *matCellDef="let product">{{ product.syncedStock }}</td>
              </ng-container>

              <!-- Status Column -->
              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef mat-sort-header>Status</th>
                <td mat-cell *matCellDef="let product">
                  <span [class]="'status-badge status-' + product.status?.toLowerCase()">
                    {{ product.status }}
                  </span>
                </td>
              </ng-container>

              <!-- Actions Column -->
              <ng-container matColumnDef="actions">
                <th mat-header-cell *matHeaderCellDef>Actions</th>
                <td mat-cell *matCellDef="let product">
                  <button mat-icon-button (click)="viewProduct(product)" matTooltip="View Details">
                    <mat-icon>visibility</mat-icon>
                  </button>
                  <button mat-icon-button (click)="editProduct(product)" matTooltip="Edit Product">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button (click)="approveProduct(product)" 
                          *ngIf="product.status === 'PENDING'"
                          matTooltip="Approve Product">
                    <mat-icon>check</mat-icon>
                  </button>
                  <button mat-icon-button (click)="rejectProduct(product)" 
                          *ngIf="product.status === 'PENDING'"
                          matTooltip="Reject Product">
                    <mat-icon>close</mat-icon>
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
                <mat-select formControlName="categoryId" required>
                  <mat-option *ngFor="let category of categories" [value]="category.id">
                    {{ category.name }}
                  </mat-option>
                </mat-select>
                <mat-error *ngIf="productForm.get('categoryId')?.hasError('required')">
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

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  suppliers: any[] = [];
  loading = true;
  saving = false;

  // Filters
  statusFilter = '';
  supplierFilter = '';
  searchTerm = '';

  // Table
  displayedColumns = ['image', 'name', 'supplier', 'price', 'stock', 'status', 'actions'];

  // Form
  productForm: FormGroup;
  selectedProduct: Product | null = null;

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadSuppliers();
    this.initForm();
  }

  private initForm(): void {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      categoryId: ['', Validators.required],
      displayedPrice: ['', [Validators.required, Validators.min(0)]],
      syncedStock: ['', [Validators.required, Validators.min(0)]],
      active: [false]
    });
  }

  private loadProducts(): void {
    this.loading = true;
    this.productService.getAllProducts({ includeInactive: true }).subscribe({
      next: (products) => {
        this.products = products;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading products:', error);
        this.snackBar.open('Failed to load products', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  private loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
      }
    });
  }

  private loadSuppliers(): void {
    // Load suppliers - implement based on your supplier service
    this.suppliers = [];
  }

  applyFilters(): void {
    this.filteredProducts = this.products.filter(product => {
      // Status filter
      if (this.statusFilter && product.status !== this.statusFilter) {
        return false;
      }

      // Supplier filter
      if (this.supplierFilter && product.supplier?.id !== this.supplierFilter) {
        return false;
      }

      // Search term
      if (this.searchTerm) {
        const search = this.searchTerm.toLowerCase();
        return product.name.toLowerCase().includes(search) ||
               product.description?.toLowerCase().includes(search);
      }

      return true;
    });
  }

  viewProduct(product: Product): void {
    // Implement product detail view
    console.log('View product:', product);
  }

  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      categoryId: product.category?.id,
      displayedPrice: product.displayedPrice,
      syncedStock: product.syncedStock,
      active: product.active
    });

    this.dialog.open(this.productEditDialog, {
      width: '600px',
      data: product
    });
  }

  saveProduct(): void {
    if (this.productForm.invalid || !this.selectedProduct) {
      return;
    }

    this.saving = true;
    const updatedProduct = {
      ...this.selectedProduct,
      ...this.productForm.value
    };

    this.productService.updateProduct(this.selectedProduct.id, updatedProduct).subscribe({
      next: () => {
        this.snackBar.open('Product updated successfully', 'Close', { duration: 3000 });
        this.loadProducts();
        this.dialog.closeAll();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error updating product:', error);
        this.snackBar.open('Failed to update product', 'Close', { duration: 3000 });
        this.saving = false;
      }
    });
  }

  approveProduct(product: Product): void {
    this.productService.updateProductStatus(product.id, true).subscribe({
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
    // Implement product rejection logic
    console.log('Reject product:', product);
  }
}
