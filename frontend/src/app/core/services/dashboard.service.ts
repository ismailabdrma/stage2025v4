import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface DashboardStats {
  // Basic counts
  totalUsers: number;
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  pendingProducts: number;
  totalSuppliers: number;
  activeSuppliers: number;
  inactiveSuppliers: number;
  totalCategories: number;
  
  // Order statistics
  totalOrders: number;
  pendingOrders: number;
  processingOrders: number;
  completedOrders: number;
  shippedOrders: number;
  deliveredOrders: number;
  cancelledOrders: number;
  
  // Revenue statistics
  totalRevenue: number;
  todayRevenue: number;
  monthRevenue: number;
  averageOrderValue: number;
  
  // Growth metrics
  userGrowthRate: number;
  orderGrowthRate: number;
  revenueGrowthRate: number;
  
  // System health
  systemStatus: string;
  lastUpdated?: number;
  error?: string;
  
  // Recent activity
  recentOrders: RecentOrder[];
  lowStockProducts: LowStockProduct[];
  pendingPayments: PendingPayment[];
  
  // Performance data
  supplierPerformance: SupplierPerformance[];
  topSellingProducts: TopProduct[];
  categoryDistribution: CategoryDistribution[];
}

export interface RecentOrder {
  id: number;
  clientName: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  itemCount: number;
}

export interface LowStockProduct {
  id: number;
  name: string;
  stock: number;
  supplier: string;
  price: number;
}

export interface PendingPayment {
  id: number;
  supplier: string;
  amount: number;
  dueDate: string;
  description: string;
}

export interface SupplierPerformance {
  id: number;
  name: string;
  type: string;
  productCount: number;
  revenue: number;
  pendingPayments: number;
  lastImport: string;
}

export interface TopProduct {
  id: number;
  name: string;
  soldQuantity: number;
  revenue: number;
  supplier: string;
}

export interface CategoryDistribution {
  category: string;
  productCount: number;
}

export interface SystemHealth {
  status: string;
  timestamp: number;
  services?: {
    database: string;
    cache: string;
    soap: string;
  };
  error?: string;
}

export interface SystemPerformance {
  memoryUsage: number;
  cpuUsage: number;
  avgResponseTime: number;
  requestsPerSecond: number;
  errorRate: number;
  uptime: string;
}

export interface SystemLog {
  id: number;
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  source?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private api = `${environment.apiUrl}/api/admin/dashboard`;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.api}/stats`);
  }

  getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.api}/health`);
  }

  getSystemPerformance(): Observable<SystemPerformance> {
    return this.http.get<SystemPerformance>(`${this.api}/performance`);
  }

  getSystemLogs(): Observable<SystemLog[]> {
    return this.http.get<SystemLog[]>(`${this.api}/logs`);
  }
}