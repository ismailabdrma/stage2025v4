import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../../../core/services/payment.service';
import { OrderService } from '../../../../core/services/order.service';
import { CommonModule } from '@angular/common';

interface OrderDetails {
  id: number;
  orderNumber: string;
  total: number;
  currency: string;
  status: string;
  items: any[];
  supplierName?: string;
}

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="success-container">
      <div class="success-card" *ngIf="!loading">
        <!-- Success Header -->
        <div class="success-header" *ngIf="paymentConfirmed && !error">
          <div class="success-icon">✅</div>
          <h1>Payment Successful!</h1>
          <p>Thank you for your order. Your payment has been processed successfully.</p>
        </div>

        <!-- Error Header -->
        <div class="error-header" *ngIf="error">
          <div class="error-icon">❌</div>
          <h1>Payment Failed</h1>
          <p>{{ errorMessage }}</p>
        </div>

        <!-- Order Details -->
        <div class="order-details" *ngIf="orderDetails && !error">
          <h2>Order Details</h2>
          <div class="detail-row">
            <span class="label">Order Number:</span>
            <span class="value">{{ orderDetails.orderNumber }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total Amount:</span>
            <span class="value">{{ orderDetails.total | currency:'EUR':'symbol':'1.2-2' }}</span>
          </div>
          <div class="detail-row" *ngIf="orderDetails.supplierName">
            <span class="label">Supplier:</span>
            <span class="value">{{ orderDetails.supplierName }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Status:</span>
            <span class="value status-paid">{{ orderDetails.status }}</span>
          </div>
        </div>

        <!-- Session Info -->
        <div class="session-info" *ngIf="sessionId">
          <h3>Payment Session</h3>
          <p><strong>Session ID:</strong> {{ sessionId }}</p>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button class="btn-primary" (click)="goToOrders()">View My Orders</button>
          <button class="btn-secondary" (click)="goToHome()">Continue Shopping</button>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-card" *ngIf="loading">
        <div class="loading-spinner"></div>
        <h2>Processing your payment...</h2>
        <p>Please wait while we confirm your payment.</p>
      </div>
    </div>
  `,
  styles: [`
    .success-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      padding: 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .success-card, .loading-card {
      background: white;
      border-radius: 12px;
      padding: 3rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      max-width: 600px;
      width: 100%;
      text-align: center;
    }

    .success-header, .error-header {
      margin-bottom: 2rem;
    }

    .success-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .error-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .success-header h1 {
      color: #28a745;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .error-header h1 {
      color: #dc3545;
      font-size: 2.5rem;
      margin-bottom: 1rem;
    }

    .order-details {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 2rem;
      margin: 2rem 0;
      text-align: left;
    }

    .order-details h2 {
      margin-bottom: 1.5rem;
      color: #333;
      text-align: center;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 0;
      border-bottom: 1px solid #dee2e6;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .label {
      font-weight: 600;
      color: #666;
    }

    .value {
      font-weight: 500;
      color: #333;
    }

    .status-paid {
      color: #28a745;
      font-weight: 600;
    }

    .session-info {
      background: #e9ecef;
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .session-info h3 {
      margin-bottom: 1rem;
      color: #495057;
    }

    .session-info p {
      word-break: break-all;
      font-family: monospace;
      background: white;
      padding: 0.5rem;
      border-radius: 4px;
    }

    .actions {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .btn-primary, .btn-secondary {
      padding: 12px 24px;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-block;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover {
      background: #545b62;
      transform: translateY(-2px);
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #007bff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 2rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-card h2 {
      color: #333;
      margin-bottom: 1rem;
    }

    .loading-card p {
      color: #666;
    }

    @media (max-width: 768px) {
      .success-container {
        padding: 1rem;
      }

      .success-card, .loading-card {
        padding: 2rem;
      }

      .actions {
        flex-direction: column;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
      }
    }
  `]
})
export class OrderSuccessComponent implements OnInit {
  loading = true;
  paymentConfirmed = false;
  error = false;
  errorMessage = '';
  sessionId: string | null = null;
  orderDetails: OrderDetails | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentService: PaymentService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    console.log('OrderSuccessComponent initialized');
    
    // Extract session_id from URL parameters
    this.route.queryParams.subscribe(params => {
      this.sessionId = params['session_id'];
      console.log('Extracted session_id from URL:', this.sessionId);
      
      if (this.sessionId) {
        this.confirmPayment();
      } else {
        this.handleError('No payment session found in URL');
      }
    });
  }

  private async confirmPayment() {
    try {
      console.log('Confirming payment for session:', this.sessionId);
      
      // Call backend to confirm the payment and get order details
      const response = await this.paymentService.confirmPaymentSession(this.sessionId!).toPromise();
      
      console.log('Payment confirmation response:', response);
      
      if (response && response.success) {
        this.paymentConfirmed = true;
        
        // Get order details if orderId is provided
        if (response.orderId) {
          await this.loadOrderDetails(response.orderId);
        }
      } else {
        this.handleError(response?.message || 'Payment confirmation failed');
      }
    } catch (error: any) {
      console.error('Payment confirmation error:', error);
      this.handleError('Failed to confirm payment: ' + (error.message || 'Unknown error'));
    } finally {
      this.loading = false;
    }
  }

  private async loadOrderDetails(orderId: number) {
    try {
      console.log('Loading order details for order:', orderId);
      
      const order = await this.orderService.getOrderById(orderId).toPromise();
      
      if (order) {
        this.orderDetails = {
          id: order.id,
          orderNumber: `#${order.id}`, // Use order ID as order number
          total: order.total,
          currency: 'EUR', // Default currency
          status: 'PAID',
          items: order.items || [],
          supplierName: 'Supplier' // Will be updated when backend provides this
        };
        
        console.log('Order details loaded:', this.orderDetails);
      }
    } catch (error) {
      console.error('Failed to load order details:', error);
      // Don't fail the whole page if order details can't be loaded
    }
  }

  private handleError(message: string) {
    this.error = true;
    this.errorMessage = message;
    this.loading = false;
    console.error('Payment success page error:', message);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}


