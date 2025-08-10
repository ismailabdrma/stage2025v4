import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { ProductService } from '@core/services/product.service';
import { Product } from '@core/models/product.model';

@Component({
  selector: 'app-pending-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule
  ],
  template: `
    <div class="pending-products-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>approval</mat-icon>
            Pending Products Approval
          </mat-card-title>
          <mat-card-subtitle>
            Review and approve products imported from suppliers
          </mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <div *ngIf="loading" class="loading">
            Loading pending products...
          </div>
          
          <div *ngIf="!loading && pendingProducts.length === 0" class="empty-state">
            <mat-icon>check_circle</mat-icon>
            <h3>No pending products</h3>
            <p>All products have been reviewed and approved.</p>
          </div>
          
          <table mat-table [dataSource]="pendingProducts" *ngIf="!loading && pendingProducts.length > 0">
            <!-- Image Column -->
            <ng-container matColumnDef="image">
              <th mat-header-cell *matHeaderCellDef>Image</th>
              <td mat-cell *matCellDef="let product">
                <img [src]="getProductImage(product)" [alt]="product.name" class="product-image">
              </td>
            </ng-container>
            
            <!-- Name Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Product Name</th>
              <td mat-cell *matCellDef="let product">
                <div class="product-info">
                  <strong>{{ product.name }}</strong>
                  <small>ID: {{ product.externalProductId }}</small>
                </div>
              </td>
            </ng-container>
            
            <!-- Supplier Column -->
            <ng-container matColumnDef="supplier">
              <th mat-header-cell *matHeaderCellDef>Supplier</th>
              <td mat-cell *matCellDef="let product">
                <mat-chip color="accent">{{ product.supplierName }}</mat-chip>
              </td>
            </ng-container>
            
            <!-- Price Column -->
            <ng-container matColumnDef="price">
              <th mat-header-cell *matHeaderCellDef>Price</th>
              <td mat-cell *matCellDef="let product">
                <div class="price-info">
                  <div class="supplier-price">Supplier: {{ product.supplierPrice | currency }}</div>
                  <div class="display-price">Display: {{ product.displayedPrice | currency }}</div>
                </div>
              </td>
            </ng-container>
            
            <!-- Stock Column -->
            <ng-container matColumnDef="stock">
              <th mat-header-cell *matHeaderCellDef>Stock</th>
              <td mat-cell *matCellDef="let product">
                <span class="stock-badge" [class.low-stock]="product.syncedStock < 10">
                  {{ product.syncedStock }}
                </span>
              </td>
            </ng-container>
            
            <!-- Category Column -->
            <ng-container matColumnDef="category">
              <th mat-header-cell *matHeaderCellDef>Category</th>
              <td mat-cell *matCellDef="let product">
                {{ product.categoryName || 'Uncategorized' }}
              </td>
            </ng-container>
            
            <!-- Import Date Column -->
            <ng-container matColumnDef="importDate">
              <th mat-header-cell *matHeaderCellDef>Imported</th>
              <td mat-cell *matCellDef="let product">
                {{ product.lastFetched | date:'short' }}
              </td>
            </ng-container>
            
            <!-- Actions Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let product">
                <div class="action-buttons">
                  <button mat-raised-button color="primary" (click)="approveProduct(product.id)">
                    <mat-icon>check</mat-icon>
                    Approve
                  </button>
                  <button mat-stroked-button (click)="editProduct(product.id)">
                    <mat-icon>edit</mat-icon>
                    Edit
                  </button>
                  <button mat-stroked-button color="warn" (click)="rejectProduct(product.id)">
                    <mat-icon>close</mat-icon>
                    Reject
                  </button>
                </div>
              </td>
            </ng-container>
            
            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
        
        <mat-card-actions *ngIf="pendingProducts.length > 0">
          <button mat-raised-button color="primary" (click)="approveAllProducts()">
            <mat-icon>done_all</mat-icon>
            Approve All ({{ pendingProducts.length }})
          </button>
          <button mat-stroked-button (click)="refreshProducts()">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .pending-products-container {
      padding: 20px;
      max-width: 1400px;
      margin: 0 auto;
    }
    
    .loading {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #666;
      
      mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #4caf50;
        margin-bottom: 16px;
      }
      
      h3 {
        margin: 16px 0 8px;
        color: #333;
      }
    }
    
    .product-image {
      width: 50px;
      height: 50px;
      object-fit: cover;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }
    
    .product-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
      
      small {
        color: #666;
        font-size: 0.75rem;
      }
    }
    
    .price-info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: 0.875rem;
      
      .supplier-price {
        color: #666;
      }
      
      .display-price {
        font-weight: 500;
        color: #2e7d32;
      }
    }
    
    .stock-badge {
      display: inline-block;
      padding: 4px 8px;
      border-radius: 12px;
      background-color: #e8f5e8;
      color: #2e7d32;
      font-weight: 500;
      font-size: 0.875rem;
      
      &.low-stock {
        background-color: #ffebee;
        color: #d32f2f;
      }
    }
    
    .action-buttons {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      
      button {
        min-width: 80px;
      }
    }
    
    table {
      width: 100%;
      margin-top: 16px;
    }
    
    .mat-mdc-cell, .mat-mdc-header-cell {
      padding: 12px 8px;
    }
    
    .mat-mdc-header-cell {
      font-weight: 600;
      color: #2c3e50;
    }
    
    @media (max-width: 768px) {
      .action-buttons {
        flex-direction: column;
        
        button {
          width: 100%;
        }
      }
    }
  `]
})
export class PendingProductsComponent implements OnInit {
  private productService = inject(ProductService);
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);
  private router = inject(Router);

  pendingProducts: Product[] = [];
  loading = true;
  
  displayedColumns = ['image', 'name', 'supplier', 'price', 'stock', 'category', 'importDate', 'actions'];

  ngOnInit() {
    this.loadPendingProducts();
  }

  loadPendingProducts() {
    this.loading = true;
    this.productService.getPendingProducts().subscribe({
      next: (products) => {
        this.pendingProducts = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading pending products:', error);
        this.snackBar.open('Error loading pending products', 'Close', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  approveProduct(productId: number) {
    this.productService.approveProduct(productId).subscribe({
      next: () => {
        this.snackBar.open('Product approved successfully', 'Close', { duration: 3000 });
        this.loadPendingProducts(); // Reload the list
      },
      error: (error) => {
        console.error('Error approving product:', error);
        this.snackBar.open('Error approving product', 'Close', { duration: 3000 });
      }
    });
  }

  rejectProduct(productId: number) {
    if (confirm('Are you sure you want to reject this product? This action cannot be undone.')) {
      this.productService.rejectProduct(productId).subscribe({
        next: () => {
          this.snackBar.open('Product rejected successfully', 'Close', { duration: 3000 });
          this.loadPendingProducts(); // Reload the list
        },
        error: (error) => {
          console.error('Error rejecting product:', error);
          this.snackBar.open('Error rejecting product', 'Close', { duration: 3000 });
        }
      });
    }
  }

  editProduct(productId: number) {
    this.router.navigate(['/admin/products', productId, 'edit']);
  }

  approveAllProducts() {
    if (confirm(`Are you sure you want to approve all ${this.pendingProducts.length} pending products?`)) {
      const productIds = this.pendingProducts.map(p => p.id);
      this.productService.approveMultipleProducts(productIds).subscribe({
        next: () => {
          this.snackBar.open(`${productIds.length} products approved successfully`, 'Close', { duration: 3000 });
          this.loadPendingProducts(); // Reload the list
        },
        error: (error) => {
          console.error('Error approving products:', error);
          this.snackBar.open('Error approving products', 'Close', { duration: 3000 });
        }
      });
    }
  }

  refreshProducts() {
    this.loadPendingProducts();
  }

  getProductImage(product: Product): string {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0];
    }
    return 'assets/placeholder.png';
  }
}

