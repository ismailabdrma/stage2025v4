import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';

import { DashboardService, DashboardStats, SystemHealth } from '@core/services/dashboard.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatGridListModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Enterprise Admin Dashboard</h1>
        <div class="refresh-controls">
          <button mat-raised-button color="primary" (click)="refreshDashboard()" [disabled]="loading">
            <mat-icon>refresh</mat-icon>
            Refresh
          </button>
          <div class="system-health" [class.healthy]="systemHealth?.status === 'healthy'" 
               [class.degraded]="systemHealth?.status === 'degraded'">
            <mat-icon>{{ systemHealth?.status === 'healthy' ? 'check_circle' : 'warning' }}</mat-icon>
            {{ systemHealth?.status || 'Unknown' }}
          </div>
        </div>
      </div>

      <div *ngIf="loading" class="loading-container">
        <mat-spinner></mat-spinner>
        <p>Loading dashboard statistics...</p>
      </div>

      <div *ngIf="!loading && stats" class="dashboard-content">
        <!-- Key Metrics Grid -->
        <div class="metrics-grid">
          <mat-card class="metric-card primary">
            <mat-card-content>
              <div class="metric-header">
                <mat-icon>people</mat-icon>
                <h3>Total Users</h3>
              </div>
              <div class="metric-value">{{ stats.totalUsers | number }}</div>
              <div class="metric-growth" [class.positive]="stats.userGrowthRate > 0" 
                   [class.negative]="stats.userGrowthRate < 0">
                <mat-icon>{{ stats.userGrowthRate > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                {{ stats.userGrowthRate | number:'1.1-1' }}%
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="metric-card success">
            <mat-card-content>
              <div class="metric-header">
                <mat-icon>inventory</mat-icon>
                <h3>Products</h3>
              </div>
              <div class="metric-value">{{ stats.totalProducts | number }}</div>
              <div class="metric-breakdown">
                <span class="active">{{ stats.activeProducts }} Active</span>
                <span class="pending">{{ stats.pendingProducts }} Pending</span>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="metric-card warning">
            <mat-card-content>
              <div class="metric-header">
                <mat-icon>business</mat-icon>
                <h3>Suppliers</h3>
              </div>
              <div class="metric-value">{{ stats.totalSuppliers | number }}</div>
              <div class="metric-breakdown">
                <span class="active">{{ stats.activeSuppliers }} Active</span>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="metric-card accent">
            <mat-card-content>
              <div class="metric-header">
                <mat-icon>shopping_cart</mat-icon>
                <h3>Orders</h3>
              </div>
              <div class="metric-value">{{ stats.totalOrders | number }}</div>
              <div class="metric-growth" [class.positive]="stats.orderGrowthRate > 0" 
                   [class.negative]="stats.orderGrowthRate < 0">
                <mat-icon>{{ stats.orderGrowthRate > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                {{ stats.orderGrowthRate | number:'1.1-1' }}%
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Revenue Section -->
        <div class="revenue-section">
          <mat-card class="revenue-card">
            <mat-card-header>
              <mat-card-title>Revenue Overview</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="revenue-grid">
                <div class="revenue-item">
                  <h4>Total Revenue</h4>
                  <div class="amount">{{ stats.totalRevenue | currency }}</div>
                  <div class="growth" [class.positive]="stats.revenueGrowthRate > 0" 
                       [class.negative]="stats.revenueGrowthRate < 0">
                    {{ stats.revenueGrowthRate | number:'1.1-1' }}% from last month
                  </div>
                </div>
                <div class="revenue-item">
                  <h4>Today's Revenue</h4>
                  <div class="amount">{{ stats.todayRevenue | currency }}</div>
                </div>
                <div class="revenue-item">
                  <h4>This Month</h4>
                  <div class="amount">{{ stats.monthRevenue | currency }}</div>
                </div>
                <div class="revenue-item">
                  <h4>Average Order</h4>
                  <div class="amount">{{ stats.averageOrderValue | currency }}</div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Order Status Grid -->
        <div class="order-status-section">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Order Status Breakdown</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="order-status-grid">
                <div class="status-item pending">
                  <mat-icon>schedule</mat-icon>
                  <span class="count">{{ stats.pendingOrders }}</span>
                  <span class="label">Pending</span>
                </div>
                <div class="status-item processing">
                  <mat-icon>settings</mat-icon>
                  <span class="count">{{ stats.processingOrders }}</span>
                  <span class="label">Processing</span>
                </div>
                <div class="status-item shipped">
                  <mat-icon>local_shipping</mat-icon>
                  <span class="count">{{ stats.shippedOrders }}</span>
                  <span class="label">Shipped</span>
                </div>
                <div class="status-item delivered">
                  <mat-icon>check_circle</mat-icon>
                  <span class="count">{{ stats.deliveredOrders }}</span>
                  <span class="label">Delivered</span>
                </div>
                <div class="status-item cancelled">
                  <mat-icon>cancel</mat-icon>
                  <span class="count">{{ stats.cancelledOrders }}</span>
                  <span class="label">Cancelled</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- Data Tables Section -->
        <mat-tab-group class="data-tables">
          <!-- Recent Orders Tab -->
          <mat-tab label="Recent Orders">
            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="stats.recentOrders" class="recent-orders-table">
                  <ng-container matColumnDef="id">
                    <th mat-header-cell *matHeaderCellDef>Order ID</th>
                    <td mat-cell *matCellDef="let order">#{{ order.id }}</td>
                  </ng-container>
                  <ng-container matColumnDef="client">
                    <th mat-header-cell *matHeaderCellDef>Client</th>
                    <td mat-cell *matCellDef="let order">{{ order.clientName }}</td>
                  </ng-container>
                  <ng-container matColumnDef="amount">
                    <th mat-header-cell *matHeaderCellDef>Amount</th>
                    <td mat-cell *matCellDef="let order">{{ order.totalAmount | currency }}</td>
                  </ng-container>
                  <ng-container matColumnDef="status">
                    <th mat-header-cell *matHeaderCellDef>Status</th>
                    <td mat-cell *matCellDef="let order">
                      <mat-chip [color]="getOrderStatusColor(order.status)">{{ order.status }}</mat-chip>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="date">
                    <th mat-header-cell *matHeaderCellDef>Date</th>
                    <td mat-cell *matCellDef="let order">{{ order.createdAt | date:'short' }}</td>
                  </ng-container>
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let order">
                      <button mat-icon-button (click)="viewOrder(order.id)">
                        <mat-icon>visibility</mat-icon>
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="recentOrdersColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: recentOrdersColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </mat-tab>

          <!-- Low Stock Products Tab -->
          <mat-tab label="Low Stock Alert">
            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="stats.lowStockProducts" class="low-stock-table">
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Product</th>
                    <td mat-cell *matCellDef="let product">{{ product.name }}</td>
                  </ng-container>
                  <ng-container matColumnDef="stock">
                    <th mat-header-cell *matHeaderCellDef>Stock</th>
                    <td mat-cell *matCellDef="let product">
                      <span class="stock-level" [class.critical]="product.stock < 5">
                        {{ product.stock }}
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="supplier">
                    <th mat-header-cell *matHeaderCellDef>Supplier</th>
                    <td mat-cell *matCellDef="let product">{{ product.supplier }}</td>
                  </ng-container>
                  <ng-container matColumnDef="price">
                    <th mat-header-cell *matHeaderCellDef>Price</th>
                    <td mat-cell *matCellDef="let product">{{ product.price | currency }}</td>
                  </ng-container>
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let product">
                      <button mat-icon-button (click)="viewProduct(product.id)">
                        <mat-icon>edit</mat-icon>
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="lowStockColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: lowStockColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </mat-tab>

          <!-- Pending Payments Tab -->
          <mat-tab label="Pending Payments">
            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="stats.pendingPayments" class="pending-payments-table">
                  <ng-container matColumnDef="supplier">
                    <th mat-header-cell *matHeaderCellDef>Supplier</th>
                    <td mat-cell *matCellDef="let payment">{{ payment.supplier }}</td>
                  </ng-container>
                  <ng-container matColumnDef="amount">
                    <th mat-header-cell *matHeaderCellDef>Amount</th>
                    <td mat-cell *matCellDef="let payment">{{ payment.amount | currency }}</td>
                  </ng-container>
                  <ng-container matColumnDef="dueDate">
                    <th mat-header-cell *matHeaderCellDef>Due Date</th>
                    <td mat-cell *matCellDef="let payment">
                      <span [class.overdue]="isOverdue(payment.dueDate)">
                        {{ payment.dueDate | date:'short' }}
                      </span>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="description">
                    <th mat-header-cell *matHeaderCellDef>Description</th>
                    <td mat-cell *matCellDef="let payment">{{ payment.description }}</td>
                  </ng-container>
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let payment">
                      <button mat-icon-button (click)="processPayment(payment.id)">
                        <mat-icon>payment</mat-icon>
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="pendingPaymentsColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: pendingPaymentsColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </mat-tab>

          <!-- Supplier Performance Tab -->
          <mat-tab label="Supplier Performance">
            <mat-card>
              <mat-card-content>
                <table mat-table [dataSource]="stats.supplierPerformance" class="supplier-performance-table">
                  <ng-container matColumnDef="name">
                    <th mat-header-cell *matHeaderCellDef>Supplier</th>
                    <td mat-cell *matCellDef="let supplier">
                      <div class="supplier-info">
                        <strong>{{ supplier.name }}</strong>
                        <span class="supplier-type">{{ supplier.type }}</span>
                      </div>
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="products">
                    <th mat-header-cell *matHeaderCellDef>Products</th>
                    <td mat-cell *matCellDef="let supplier">{{ supplier.productCount }}</td>
                  </ng-container>
                  <ng-container matColumnDef="revenue">
                    <th mat-header-cell *matHeaderCellDef>Revenue</th>
                    <td mat-cell *matCellDef="let supplier">{{ supplier.revenue | currency }}</td>
                  </ng-container>
                  <ng-container matColumnDef="pending">
                    <th mat-header-cell *matHeaderCellDef>Pending</th>
                    <td mat-cell *matCellDef="let supplier">{{ supplier.pendingPayments | currency }}</td>
                  </ng-container>
                  <ng-container matColumnDef="lastImport">
                    <th mat-header-cell *matHeaderCellDef>Last Import</th>
                    <td mat-cell *matCellDef="let supplier">
                      {{ supplier.lastImport ? (supplier.lastImport | date:'short') : 'Never' }}
                    </td>
                  </ng-container>
                  <ng-container matColumnDef="actions">
                    <th mat-header-cell *matHeaderCellDef>Actions</th>
                    <td mat-cell *matCellDef="let supplier">
                      <button mat-icon-button (click)="manageSupplier(supplier.id)">
                        <mat-icon>settings</mat-icon>
                      </button>
                    </td>
                  </ng-container>
                  <tr mat-header-row *matHeaderRowDef="supplierPerformanceColumns"></tr>
                  <tr mat-row *matRowDef="let row; columns: supplierPerformanceColumns;"></tr>
                </table>
              </mat-card-content>
            </mat-card>
          </mat-tab>
        </mat-tab-group>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <mat-card>
            <mat-card-header>
              <mat-card-title>Quick Actions</mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="action-buttons">
                <button mat-raised-button color="primary" (click)="navigateTo('/admin/product-approval')">
                  <mat-icon>approval</mat-icon>
                  Review Pending Products ({{ stats.pendingProducts }})
                </button>
                <button mat-raised-button color="accent" (click)="navigateTo('/admin/suppliers')">
                  <mat-icon>business</mat-icon>
                  Manage Suppliers
                </button>
                <button mat-raised-button color="warn" (click)="navigateTo('/admin/supplier-payments')">
                  <mat-icon>payment</mat-icon>
                  Process Payments
                </button>
                <button mat-raised-button (click)="navigateTo('/admin/orders')">
                  <mat-icon>inventory</mat-icon>
                  Manage Orders
                </button>
              </div>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  private dashboardService = inject(DashboardService);
  private router = inject(Router);

  stats: DashboardStats | null = null;
  systemHealth: SystemHealth | null = null;
  loading = true;
  private refreshSubscription?: Subscription;

  // Table columns
  recentOrdersColumns = ['id', 'client', 'amount', 'status', 'date', 'actions'];
  lowStockColumns = ['name', 'stock', 'supplier', 'price', 'actions'];
  pendingPaymentsColumns = ['supplier', 'amount', 'dueDate', 'description', 'actions'];
  supplierPerformanceColumns = ['name', 'products', 'revenue', 'pending', 'lastImport', 'actions'];

  ngOnInit() {
    this.loadDashboard();
    this.setupAutoRefresh();
  }

  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }

  private setupAutoRefresh() {
    // Auto-refresh every 5 minutes
    this.refreshSubscription = interval(300000) // 5 minutes
      .pipe(
        startWith(0),
        switchMap(() => this.dashboardService.getSystemHealth())
      )
      .subscribe(health => {
        this.systemHealth = health;
      });
  }

  loadDashboard() {
    this.loading = true;
    this.dashboardService.getDashboardStats().subscribe({
      next: (stats) => {
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.loading = false;
        // Could show error message to user
      }
    });
  }

  refreshDashboard() {
    this.loadDashboard();
  }

  getOrderStatusColor(status: string): 'primary' | 'accent' | 'warn' | undefined {
    switch (status.toLowerCase()) {
      case 'pending': return 'warn';
      case 'processing': return 'accent';
      case 'delivered': return 'primary';
      case 'cancelled': return 'warn';
      default: return undefined;
    }
  }

  isOverdue(dueDate: string): boolean {
    return new Date(dueDate) < new Date();
  }

  // Navigation methods
  viewOrder(orderId: number) {
    this.router.navigate(['/admin/orders', orderId]);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/admin/products', productId]);
  }

  processPayment(paymentId: number) {
    this.router.navigate(['/admin/payments', paymentId]);
  }

  manageSupplier(supplierId: number) {
    this.router.navigate(['/admin/suppliers', supplierId]);
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}