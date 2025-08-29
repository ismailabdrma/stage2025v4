import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { Observable } from 'rxjs';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatBadgeModule,
    MatDividerModule
  ],
  template: `
    <div class="admin-layout">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened="true" class="admin-sidenav">
          <div class="sidenav-header">
            <h3>Admin Panel</h3>
          </div>
          
          <mat-nav-list>
            <!-- Dashboard -->
            <a mat-list-item routerLink="/admin" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
              <mat-icon matListItemIcon>dashboard</mat-icon>
              <span matListItemTitle>Dashboard</span>
            </a>

            <mat-divider></mat-divider>

            <!-- Product Management -->
            <div class="nav-section">
              <div class="section-header">Product Management</div>
              
              <a mat-list-item routerLink="/admin/products" routerLinkActive="active">
                <mat-icon matListItemIcon>inventory</mat-icon>
                <span matListItemTitle>All Products</span>
              </a>
              
              <a mat-list-item routerLink="/admin/product-approval" routerLinkActive="active">
                <mat-icon matListItemIcon>approval</mat-icon>
                <span matListItemTitle>Product Approval</span>
                <span matListItemMeta>
                  <span class="badge" *ngIf="pendingProductsCount > 0">{{ pendingProductsCount }}</span>
                </span>
              </a>
              
              <a mat-list-item routerLink="/admin/categories" routerLinkActive="active">
                <mat-icon matListItemIcon>category</mat-icon>
                <span matListItemTitle>Categories</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <!-- Supplier Management -->
            <div class="nav-section">
              <div class="section-header">Supplier Management</div>
              
              <a mat-list-item routerLink="/admin/suppliers" routerLinkActive="active">
                <mat-icon matListItemIcon>business</mat-icon>
                <span matListItemTitle>Suppliers</span>
              </a>
              
              <a mat-list-item routerLink="/admin/supplier-payments" routerLinkActive="active">
                <mat-icon matListItemIcon>payment</mat-icon>
                <span matListItemTitle>Supplier Payments</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <!-- Order Management -->
            <div class="nav-section">
              <div class="section-header">Order Management</div>
              
              <a mat-list-item routerLink="/admin/orders" routerLinkActive="active">
                <mat-icon matListItemIcon>shopping_cart</mat-icon>
                <span matListItemTitle>Orders</span>
              </a>

              <a mat-list-item routerLink="/admin/shipping-fees" routerLinkActive="active">
                <mat-icon matListItemIcon>local_shipping</mat-icon>
                <span matListItemTitle>Shipping Fees</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <!-- User Management -->
            <div class="nav-section">
              <div class="section-header">User Management</div>
              
              <a mat-list-item routerLink="/admin/users" routerLinkActive="active">
                <mat-icon matListItemIcon>people</mat-icon>
                <span matListItemTitle>Users</span>
              </a>
            </div>

            <mat-divider></mat-divider>

            <!-- System Management -->
            <div class="nav-section">
              <div class="section-header">System</div>
              
              <a mat-list-item routerLink="/admin/system-monitoring" routerLinkActive="active">
                <mat-icon matListItemIcon>monitor</mat-icon>
                <span matListItemTitle>System Monitoring</span>
              </a>
              
              <a mat-list-item routerLink="/admin/system-status" routerLinkActive="active">
                <mat-icon matListItemIcon>health_and_safety</mat-icon>
                <span matListItemTitle>System Status</span>
              </a>
              
              <a mat-list-item routerLink="/admin/payment-completion" routerLinkActive="active">
                <mat-icon matListItemIcon>payment</mat-icon>
                <span matListItemTitle>Payment Completion</span>
              </a>
            </div>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .admin-layout {
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .sidenav-container {
      flex: 1;
    }

    .admin-sidenav {
      width: 280px;
      background: #fafafa;
      border-right: 1px solid #e0e0e0;
    }

    .sidenav-header {
      padding: 20px 16px;
      background: #1976d2;
      color: white;
      margin-bottom: 8px;
    }

    .sidenav-header h3 {
      margin: 0;
      font-weight: 500;
    }

    .nav-section {
      margin: 8px 0;
    }

    .section-header {
      padding: 8px 16px;
      font-size: 12px;
      font-weight: 500;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .mat-mdc-list-item {
      margin: 2px 8px;
      border-radius: 8px;
    }

    .mat-mdc-list-item.active {
      background-color: #e3f2fd;
      color: #1976d2;
    }

    .mat-mdc-list-item.active mat-icon {
      color: #1976d2;
    }

    .badge {
      background-color: #f44336;
      color: white;
      padding: 2px 6px;
      border-radius: 10px;
      font-size: 11px;
      min-width: 16px;
      text-align: center;
    }

    .main-content {
      padding: 20px;
      background: #f5f5f5;
      min-height: 100vh;
    }

    @media (max-width: 768px) {
      .admin-sidenav {
        width: 260px;
      }
      
      .main-content {
        padding: 10px;
      }
    }
  `]
})
export class AdminLayoutComponent implements OnInit {
  private productService = inject(ProductService);
  private router = inject(Router);

  pendingProductsCount = 0;

  ngOnInit(): void {
    this.loadPendingProductsCount();
  }

  private loadPendingProductsCount(): void {
    // Load pending products count for badge display
    this.productService.getPendingProducts().subscribe({
      next: (products) => {
        this.pendingProductsCount = products.length;
      },
      error: (error) => {
        console.error('Error loading pending products count:', error);
      }
    });
  }
}


