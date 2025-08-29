import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

export interface Notification {
  id: number;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'SYSTEM';
  title: string;
  message: string;
  category: 'ORDER' | 'PAYMENT' | 'PRODUCT' | 'SUPPLIER' | 'SYSTEM' | 'USER';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
  createdAt: string;
  expiresAt?: string;
  userId?: number;
  supplierId?: number;
}

export interface CreateNotificationRequest {
  type: Notification['type'];
  title: string;
  message: string;
  category: Notification['category'];
  priority: Notification['priority'];
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
  expiresAt?: string;
  userId?: number;
  supplierId?: number;
}

export interface NotificationPreferences {
  id: number;
  userId: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  categories: {
    ORDER: boolean;
    PAYMENT: boolean;
    PRODUCT: boolean;
    SUPPLIER: boolean;
    SYSTEM: boolean;
    USER: boolean;
  };
  priorities: {
    LOW: boolean;
    MEDIUM: boolean;
    HIGH: boolean;
    URGENT: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/notifications`;
  
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  private unreadCountSubject = new BehaviorSubject<number>(0);
  
  notifications$ = this.notificationsSubject.asObservable();
  unreadCount$ = this.unreadCountSubject.asObservable();

  constructor() {
    this.loadNotifications();
  }

  // Load user notifications
  loadNotifications(): void {
    this.http.get<Notification[]>(`${this.apiUrl}/user`).subscribe({
      next: (notifications) => {
        this.notificationsSubject.next(notifications);
        this.updateUnreadCount(notifications);
      },
      error: (error) => {
        console.error('Error loading notifications:', error);
      }
    });
  }

  // Get all notifications
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user`);
  }

  // Get unread notifications
  getUnreadNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/user/unread`);
  }

  // Mark notification as read
  markAsRead(notificationId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${notificationId}/read`, {});
  }

  // Mark all notifications as read
  markAllAsRead(): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/user/read-all`, {});
  }

  // Delete notification
  deleteNotification(notificationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${notificationId}`);
  }

  // Create notification (admin/supplier use)
  createNotification(request: CreateNotificationRequest): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, request);
  }

  // Get notification preferences
  getPreferences(): Observable<NotificationPreferences> {
    return this.http.get<NotificationPreferences>(`${this.apiUrl}/preferences`);
  }

  // Update notification preferences
  updatePreferences(preferences: Partial<NotificationPreferences>): Observable<NotificationPreferences> {
    return this.http.put<NotificationPreferences>(`${this.apiUrl}/preferences`, preferences);
  }

  // Send system notification to all users
  sendSystemNotification(request: Omit<CreateNotificationRequest, 'userId' | 'supplierId'>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/system`, request);
  }

  // Send notification to specific users
  sendUserNotification(userIds: number[], request: Omit<CreateNotificationRequest, 'userId'>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/users`, { userIds, ...request });
  }

  // Send notification to suppliers
  sendSupplierNotification(supplierIds: number[], request: Omit<CreateNotificationRequest, 'supplierId'>): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/suppliers`, { supplierIds, ...request });
  }

  // Get notification statistics
  getStatistics(): Observable<{
    total: number;
    unread: number;
    byCategory: Record<string, number>;
    byPriority: Record<string, number>;
  }> {
    return this.http.get<any>(`${this.apiUrl}/statistics`);
  }

  // Subscribe to real-time notifications (WebSocket)
  subscribeToRealtime(): Observable<Notification> {
    // This would typically use WebSocket or Server-Sent Events
    // For now, return an empty observable
    return of();
  }

  private updateUnreadCount(notifications: Notification[]): void {
    const unreadCount = notifications.filter(n => !n.read).length;
    this.unreadCountSubject.next(unreadCount);
  }

  // Helper methods for common notification types
  notifyOrderStatusChange(orderId: number, status: string, userId: number): Observable<Notification> {
    return this.createNotification({
      type: 'INFO',
      title: 'Order Status Updated',
      message: `Your order #${orderId} status has been updated to ${status}`,
      category: 'ORDER',
      priority: 'MEDIUM',
      actionUrl: `/orders/${orderId}`,
      actionText: 'View Order',
      userId
    });
  }

  notifyPaymentSuccess(orderId: number, amount: number, currency: string, userId: number): Observable<Notification> {
    return this.createNotification({
      type: 'SUCCESS',
      title: 'Payment Successful',
      message: `Payment of ${amount} ${currency} for order #${orderId} has been processed successfully`,
      category: 'PAYMENT',
      priority: 'HIGH',
      actionUrl: `/orders/${orderId}`,
      actionText: 'View Order',
      userId
    });
  }

  notifyLowStock(productId: number, productName: string, supplierId: number): Observable<Notification> {
    return this.createNotification({
      type: 'WARNING',
      title: 'Low Stock Alert',
      message: `Product "${productName}" is running low on stock`,
      category: 'PRODUCT',
      priority: 'HIGH',
      actionUrl: `/admin/products/${productId}`,
      actionText: 'Manage Product',
      supplierId
    });
  }

  notifySystemMaintenance(message: string, priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT' = 'MEDIUM'): Observable<void> {
    return this.sendSystemNotification({
      type: 'SYSTEM',
      title: 'System Maintenance',
      message,
      category: 'SYSTEM',
      priority
    });
  }
}

