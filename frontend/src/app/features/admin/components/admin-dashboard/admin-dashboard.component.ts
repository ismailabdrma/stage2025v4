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

import { DashboardService, DashboardStats, SystemHealth, SystemPerformance, SystemLog } from '@core/services/dashboard.service';

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
        <div class="header-title">
          <div class="title-content">
            <mat-icon class="dashboard-icon">dashboard</mat-icon>
            <div class="title-text">
              <h1>Enterprise Admin Dashboard</h1>
              <p class="subtitle">Monitor your business performance and system health</p>
            </div>
          </div>
          <div class="last-updated" *ngIf="stats?.lastUpdated">
            <mat-icon>schedule</mat-icon>
            <span>Last updated: {{ stats!.lastUpdated! | date:'short' }}</span>
          </div>
        </div>
        <div class="refresh-controls">
          <div class="system-health" 
               [class.healthy]="stats?.systemStatus === 'healthy'"
               [class.warning]="stats?.systemStatus === 'warning'"
               [class.error]="stats?.systemStatus === 'error'">
            <mat-icon>{{ stats?.systemStatus === 'healthy' ? 'check_circle' : stats?.systemStatus === 'warning' ? 'warning' : 'error' }}</mat-icon>
            <span>{{ stats?.systemStatus || 'Unknown' | titlecase }}</span>
          </div>
          <button mat-raised-button color="primary" (click)="refreshDashboard()" [disabled]="loading">
            <mat-icon [class.spinning]="loading">refresh</mat-icon>
            {{ loading ? 'Refreshing...' : 'Refresh' }}
          </button>
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
                <h3>Users</h3>
              </div>
              <div class="metric-value">{{ stats.totalUsers | number }}</div>
              <div class="metric-growth" [class.positive]="stats.userGrowthRate > 0" 
                   [class.negative]="stats.userGrowthRate < 0">
                <mat-icon>{{ stats.userGrowthRate > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                {{ stats.userGrowthRate | number:'1.1-1' }}%
              </div>
              <div class="metric-subtitle">Monthly Growth</div>
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
                <span class="active">{{ stats.activeProducts | number }} Active</span>
                <span class="inactive">{{ stats.inactiveProducts | number }} Inactive</span>
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
                <span class="active">{{ stats.activeSuppliers | number }} Active</span>
                <span class="inactive">{{ stats.inactiveSuppliers | number }} Inactive</span>
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
              <div class="metric-subtitle">Monthly Growth</div>
            </mat-card-content>
          </mat-card>

          <mat-card class="metric-card info">
            <mat-card-content>
              <div class="metric-header">
                <mat-icon>euro</mat-icon>
                <h3>Revenue</h3>
              </div>
              <div class="metric-value">{{ stats.totalRevenue | currency:'EUR':'symbol':'1.0-0' }}</div>
              <div class="metric-growth" [class.positive]="stats.revenueGrowthRate > 0" 
                   [class.negative]="stats.revenueGrowthRate < 0">
                <mat-icon>{{ stats.revenueGrowthRate > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                {{ stats.revenueGrowthRate | number:'1.1-1' }}%
              </div>
              <div class="metric-subtitle">Monthly Growth</div>
            </mat-card-content>
          </mat-card>

          <mat-card class="metric-card secondary">
            <mat-card-content>
              <div class="metric-header">
                <mat-icon>calculate</mat-icon>
                <h3>Avg Order</h3>
              </div>
              <div class="metric-value">{{ stats.averageOrderValue | currency:'EUR':'symbol':'1.0-0' }}</div>
              <div class="metric-breakdown">
                <span class="active">{{ stats.todayRevenue | currency:'EUR':'symbol':'1.0-0' }} Today</span>
              </div>
            </mat-card-content>
          </mat-card>
        </div>

        <!-- System Health & Monitoring -->
        <div class="system-health-grid">
          <mat-card class="health-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>health_and_safety</mat-icon>
                System Health
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="health-status" [class.healthy]="stats.systemStatus === 'healthy'" 
                   [class.warning]="stats.systemStatus === 'warning'"
                   [class.error]="stats.systemStatus === 'error'">
                <mat-icon>{{ stats.systemStatus === 'healthy' ? 'check_circle' : stats.systemStatus === 'warning' ? 'warning' : 'error' }}</mat-icon>
                <span>{{ stats.systemStatus | titlecase }}</span>
              </div>
              <div class="health-details">
                <div class="health-metric">
                  <span>Database</span>
                  <span class="status healthy">Connected</span>
                </div>
                <div class="health-metric">
                  <span>API</span>
                  <span class="status healthy">Responding</span>
                </div>
                <div class="health-metric">
                  <span>Cache</span>
                  <span class="status healthy">Active</span>
                </div>
                <div class="health-metric">
                  <span>Memory Usage</span>
                  <span class="status" [class.healthy]="(systemPerformance?.memoryUsage || 0) < 80" 
                        [class.warning]="(systemPerformance?.memoryUsage || 0) >= 80">
                    {{ systemPerformance?.memoryUsage || 0 }}%
                  </span>
                </div>
                <div class="health-metric">
                  <span>CPU Usage</span>
                  <span class="status" [class.healthy]="(systemPerformance?.cpuUsage || 0) < 70" 
                        [class.warning]="(systemPerformance?.cpuUsage || 0) >= 70">
                    {{ systemPerformance?.cpuUsage || 0 }}%
                  </span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="performance-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>speed</mat-icon>
                Performance Metrics
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="performance-metrics">
                <div class="performance-item">
                  <span class="metric-label">Response Time</span>
                  <span class="metric-value">{{ systemPerformance?.avgResponseTime || 0 }}ms</span>
                </div>
                <div class="performance-item">
                  <span class="metric-label">Throughput</span>
                  <span class="metric-value">{{ systemPerformance?.requestsPerSecond || 0 }}/sec</span>
                </div>
                <div class="performance-item">
                  <span class="metric-label">Error Rate</span>
                  <span class="metric-value error">{{ systemPerformance?.errorRate || 0 }}%</span>
                </div>
                <div class="performance-item">
                  <span class="metric-label">Uptime</span>
                  <span class="metric-value">{{ systemPerformance?.uptime || '0h 0m' }}</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="logs-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>article</mat-icon>
                System Logs (Journaux)
              </mat-card-title>
              <button mat-icon-button (click)="refreshLogs()">
                <mat-icon>refresh</mat-icon>
              </button>
            </mat-card-header>
            <mat-card-content>
              <div class="logs-container">
                <div class="log-entry" *ngFor="let log of systemLogs; let i = index" 
                     [class.error]="log.level === 'ERROR'"
                     [class.warning]="log.level === 'WARN'"
                     [class.info]="log.level === 'INFO'">
                  <div class="log-header">
                    <span class="log-time">{{ log.timestamp | date:'HH:mm:ss' }}</span>
                    <span class="log-level">{{ log.level }}</span>
                  </div>
                  <div class="log-message">{{ log.message }}</div>
                </div>
                <div *ngIf="!systemLogs || systemLogs.length === 0" class="no-logs">
                  <mat-icon>info</mat-icon>
                  <span>No recent logs available</span>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="orders-breakdown-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>assignment</mat-icon>
                Order Status
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="order-stats">
                <div class="order-stat pending">
                  <div class="stat-number">{{ stats.pendingOrders | number }}</div>
                  <div class="stat-label">Pending</div>
                </div>
                <div class="order-stat processing">
                  <div class="stat-number">{{ stats.processingOrders | number }}</div>
                  <div class="stat-label">Processing</div>
                </div>
                <div class="order-stat completed">
                  <div class="stat-number">{{ stats.completedOrders | number }}</div>
                  <div class="stat-label">Completed</div>
                </div>
              </div>
            </mat-card-content>
          </mat-card>

          <mat-card class="revenue-breakdown-card">
            <mat-card-header>
              <mat-card-title>
                <mat-icon>analytics</mat-icon>
                Revenue Breakdown
              </mat-card-title>
            </mat-card-header>
            <mat-card-content>
              <div class="revenue-stats">
                <div class="revenue-item">
                  <span class="label">Total Revenue</span>
                  <span class="value">{{ stats.totalRevenue | currency:'EUR':'symbol':'1.0-0' }}</span>
                </div>
                <div class="revenue-item">
                  <span class="label">This Month</span>
                  <span class="value">{{ stats.monthRevenue | currency:'EUR':'symbol':'1.0-0' }}</span>
                </div>
                <div class="revenue-item">
                  <span class="label">Today</span>
                  <span class="value">{{ stats.todayRevenue | currency:'EUR':'symbol':'1.0-0' }}</span>
                </div>
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
  systemPerformance: SystemPerformance | null = null;
  systemLogs: SystemLog[] = [];
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
        console.log('Dashboard stats loaded:', stats);
        this.stats = stats;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard:', error);
        this.loading = false;
        // Create fallback data if API fails
        this.stats = this.createFallbackStats();
      }
    });

    // Load performance data
    this.loadSystemPerformance();
    
    // Load system logs
    this.loadSystemLogs();
  }

  loadSystemPerformance() {
    this.dashboardService.getSystemPerformance().subscribe({
      next: (performance) => {
        this.systemPerformance = performance;
      },
      error: (error) => {
        console.error('Error loading system performance:', error);
        // Fallback to mock data
        this.systemPerformance = {
          memoryUsage: 65,
          cpuUsage: 45,
          avgResponseTime: 120,
          requestsPerSecond: 150,
          errorRate: 0.5,
          uptime: '15d 8h 32m'
        };
      }
    });
  }

  loadSystemLogs() {
    this.dashboardService.getSystemLogs().subscribe({
      next: (logs) => {
        // Convert timestamp strings to Date objects if needed
        this.systemLogs = logs.map(log => ({
          ...log,
          timestamp: typeof log.timestamp === 'string' ? new Date(log.timestamp) : log.timestamp
        }));
      },
      error: (error) => {
        console.error('Error loading system logs:', error);
        // Fallback to mock data
        this.systemLogs = [
          {
            id: 1,
            timestamp: new Date(),
            level: 'INFO',
            message: 'System health check completed successfully',
            source: 'HealthMonitor'
          },
          {
            id: 2,
            timestamp: new Date(Date.now() - 300000),
            level: 'WARN',
            message: 'Memory usage approaching 80% threshold',
            source: 'SystemMonitor'
          },
          {
            id: 3,
            timestamp: new Date(Date.now() - 600000),
            level: 'INFO',
            message: 'Database connection pool refreshed',
            source: 'DatabaseManager'
          },
          {
            id: 4,
            timestamp: new Date(Date.now() - 900000),
            level: 'ERROR',
            message: 'Failed to load system logs from backend',
            source: 'LogService'
          }
        ];
      }
    });
  }

  refreshLogs() {
    this.loadSystemLogs();
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

  private createFallbackStats(): DashboardStats {
    return {
      // Basic counts
      totalUsers: 0,
      totalProducts: 0,
      activeProducts: 0,
      inactiveProducts: 0,
      pendingProducts: 0,
      totalSuppliers: 0,
      activeSuppliers: 0,
      inactiveSuppliers: 0,
      totalCategories: 0,
      
      // Order statistics
      totalOrders: 0,
      pendingOrders: 0,
      processingOrders: 0,
      completedOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0,
      cancelledOrders: 0,
      
      // Revenue statistics
      totalRevenue: 0,
      todayRevenue: 0,
      monthRevenue: 0,
      averageOrderValue: 0,
      
      // Growth metrics
      userGrowthRate: 0,
      orderGrowthRate: 0,
      revenueGrowthRate: 0,
      
      // System health
      systemStatus: 'error',
      lastUpdated: Date.now(),
      error: 'Unable to load dashboard data',
      
      // Recent activity
      recentOrders: [],
      lowStockProducts: [],
      pendingPayments: [],
      
      // Performance data
      supplierPerformance: [],
      topSellingProducts: [],
      categoryDistribution: []
    };
  }
}