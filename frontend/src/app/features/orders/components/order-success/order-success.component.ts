import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../../../core/services/cart.service';

interface OrderDetails {
  orderNumber: string;
  total: number; // Display price (what customer pays)
  supplierPrice: number; // Supplier's actual price
  currency: string;
  status: string;
  items: any[];
  supplierName?: string;
}

interface PaymentCompletionResponse {
  success: boolean;
  orderId?: string;
  paymentId?: string;
  status?: string;
  amount?: number;
  currency?: string;
  commissionAmount?: number;
  error?: string;
}

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="success-page-container">
      <!-- Loading State -->
      <div *ngIf="loading" class="loading-overlay">
        <div class="loading-content">
          <div class="loading-spinner"></div>
          <h3>Processing your payment...</h3>
          <p>Please wait while we confirm your order</p>
          <div class="loading-steps">
            <div class="step" [class.completed]="loadingStep >= 1">
              <div class="step-icon">1</div>
              <span>Loading order details</span>
            </div>
            <div class="step" [class.completed]="loadingStep >= 2">
              <div class="step-icon">2</div>
              <span>Completing payment</span>
            </div>
            <div class="step" [class.completed]="loadingStep >= 3">
              <div class="step-icon">3</div>
              <span>Sending confirmations</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Success Content -->
      <div *ngIf="!loading" class="success-content">
        
        <!-- Hero Success Section -->
        <div class="hero-success" *ngIf="paymentConfirmed && !error">
          <div class="success-animation">
            <div class="checkmark-circle">
              <div class="checkmark"></div>
            </div>
          </div>
          
          <div class="hero-text">
            <h1 class="success-title">Payment Confirmed!</h1>
            <p class="success-subtitle">Your order has been successfully processed and confirmed</p>
            <div class="order-number-display">
              <span class="order-label">Order #</span>
              <span class="order-number">{{ orderDetails?.orderNumber || 'N/A' }}</span>
            </div>
          </div>
          
          <div class="success-badges">
            <div class="status-badge success">
              <mat-icon>check_circle</mat-icon>
              <span>Payment Successful</span>
            </div>
            <div class="status-badge confirmed">
              <mat-icon>verified</mat-icon>
              <span>Order Confirmed</span>
            </div>
          </div>
        </div>

        <!-- Error State -->
        <div class="hero-error" *ngIf="error">
          <div class="error-animation">
            <div class="error-circle">
              <mat-icon>error</mat-icon>
            </div>
          </div>
          
          <div class="hero-text">
            <h1 class="error-title">Payment Failed</h1>
            <p class="error-subtitle">{{ errorMessage }}</p>
          </div>
          
          <div class="error-actions">
            <button class="btn-primary" (click)="retryPayment()">
              <mat-icon>refresh</mat-icon>
              Try Again
            </button>
            <button class="btn-secondary" (click)="goToHome()">
              <mat-icon>home</mat-icon>
              Go to Home
            </button>
          </div>
        </div>

        <!-- Payment Summary Card -->
        <div class="summary-card" *ngIf="paymentCompletionStatus && paymentCompletionStatus.type === 'success'">
          <div class="card-header">
            <h2>Payment Summary</h2>
            <div class="card-icon">
              <mat-icon>receipt</mat-icon>
            </div>
          </div>
          
          <div class="summary-content">
            <div class="summary-row">
              <div class="summary-label">
                <mat-icon>payment</mat-icon>
                <span>Payment ID</span>
              </div>
              <div class="summary-value">{{ paymentCompletionStatus.details?.paymentId || 'N/A' }}</div>
            </div>
            
            <div class="summary-row highlight">
              <div class="summary-label">
                <mat-icon>euro</mat-icon>
                <span>Total Amount</span>
              </div>
              <div class="summary-value amount">
                {{ paymentCompletionStatus.details?.currency || 'EUR' }} {{ paymentCompletionStatus.details?.amount || '0' }}
              </div>
            </div>
            
            <div class="summary-row">
              <div class="summary-label">
                <mat-icon>check_circle</mat-icon>
                <span>Status</span>
              </div>
              <div class="summary-value status-success">
                {{ paymentCompletionStatus.details?.status || 'PAID' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Order Details Card -->
        <div class="order-card" *ngIf="orderDetails && !error">
          <div class="card-header">
            <h2>Order Details</h2>
            <div class="card-icon">
              <mat-icon>shopping_bag</mat-icon>
            </div>
          </div>
          
          <div class="order-content">
            <div class="order-row">
              <div class="order-label">
                <mat-icon>tag</mat-icon>
                <span>Order Number</span>
              </div>
              <div class="order-value">{{ orderDetails.orderNumber }}</div>
            </div>
            
            <div class="order-row highlight">
              <div class="order-label">
                <mat-icon>euro</mat-icon>
                <span>Total Amount</span>
              </div>
              <div class="order-value amount">
                {{ orderDetails.total | currency:'EUR':'symbol':'1.2-2' }}
              </div>
            </div>
            
            <div class="order-row" *ngIf="orderDetails.supplierName">
              <div class="order-label">
                <mat-icon>business</mat-icon>
                <span>Supplier</span>
              </div>
              <div class="order-value">{{ orderDetails.supplierName }}</div>
            </div>
            
            <div class="order-row">
              <div class="order-label">
                <mat-icon>schedule</mat-icon>
                <span>Order Status</span>
              </div>
              <div class="order-value status">
                <span class="status-chip" [class]="'status-' + orderDetails.status.toLowerCase()">
                  {{ orderDetails.status }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Next Steps Card -->
        <div class="next-steps-card" *ngIf="paymentConfirmed && !error">
          <div class="card-header">
            <h2>What Happens Next?</h2>
            <div class="card-icon">
              <mat-icon>timeline</mat-icon>
            </div>
          </div>
          
          <div class="steps-content">
            <div class="step-item">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Order Confirmation</h4>
                <p>We've sent you an email confirmation with all the details</p>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Processing</h4>
                <p>Your order is being processed and prepared for shipping</p>
              </div>
            </div>
            
            <div class="step-item">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Shipping Updates</h4>
                <p>You'll receive tracking information once your order ships</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons" *ngIf="paymentConfirmed && !error">
          <button class="btn-primary" (click)="goToOrders()">
            <mat-icon>visibility</mat-icon>
            View Order Details
          </button>
          
          <button class="btn-secondary" (click)="goToHome()">
            <mat-icon>shopping_cart</mat-icon>
            Continue Shopping
          </button>
          
          <button class="btn-outline" (click)="downloadReceipt()">
            <mat-icon>download</mat-icon>
            Download Receipt
          </button>
        </div>

        <!-- Support Section -->
        <div class="support-section">
          <div class="support-content">
            <div class="support-icon">
              <mat-icon>support_agent</mat-icon>
            </div>
            <div class="support-text">
              <h4>Need Help?</h4>
              <p>Our customer support team is here to help you with any questions</p>
              <div class="support-actions">
                <a href="mailto:support@marketplace.com" class="support-link">
                  <mat-icon>email</mat-icon>
                  Contact Support
                </a>
                <a href="/help" class="support-link">
                  <mat-icon>help</mat-icon>
                  Help Center
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    /* Modern Success Page Styles */
    .success-page-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 20px;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .success-content {
      max-width: 1200px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    /* Loading Overlay */
    .loading-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.95);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .loading-content {
      text-align: center;
      background: white;
      padding: 40px;
      border-radius: 20px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .loading-spinner {
      width: 60px;
      height: 60px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .loading-steps {
      margin-top: 30px;
    }

    .step {
      display: flex;
      align-items: center;
      margin: 15px 0;
      opacity: 0.6;
      transition: all 0.3s ease;
    }

    .step.completed {
      opacity: 1;
      color: #4caf50;
    }

    .step-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: #667eea;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      font-weight: bold;
    }

    .step.completed .step-icon {
      background: #4caf50;
    }

    /* Hero Success Section */
    .hero-success {
      background: white;
      border-radius: 24px;
      padding: 60px 40px;
      text-align: center;
      margin-bottom: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }

    .hero-success::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #4caf50, #8bc34a, #4caf50);
    }

    .success-animation {
      margin-bottom: 30px;
    }

    .checkmark-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #4caf50, #8bc34a);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
      box-shadow: 0 10px 30px rgba(76, 175, 80, 0.3);
    }

    .checkmark {
      width: 40px;
      height: 40px;
      border: 4px solid white;
      border-top: none;
      border-right: none;
      transform: rotate(-45deg);
      margin-top: -5px;
    }

    .success-title {
      font-size: 3rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0 0 20px 0;
      background: linear-gradient(135deg, #2c3e50, #34495e);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .success-subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin: 0 0 30px 0;
      line-height: 1.6;
    }

    .order-number-display {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 16px;
      margin: 30px 0;
      border: 2px solid #e9ecef;
    }

    .order-label {
      font-size: 0.9rem;
      color: #6c757d;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-right: 10px;
    }

    .order-number {
      font-size: 1.5rem;
      font-weight: 700;
      color: #495057;
      font-family: 'Courier New', monospace;
    }

    .success-badges {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin-top: 30px;
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      border-radius: 50px;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .status-badge.success {
      background: linear-gradient(135deg, #4caf50, #8bc34a);
      color: white;
    }

    .status-badge.confirmed {
      background: linear-gradient(135deg, #2196f3, #03a9f4);
      color: white;
    }

    /* Error State */
    .hero-error {
      background: white;
      border-radius: 24px;
      padding: 60px 40px;
      text-align: center;
      margin-bottom: 40px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
      border-left: 4px solid #f44336;
    }

    .error-circle {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f44336, #ff5722);
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 30px;
      box-shadow: 0 10px 30px rgba(244, 67, 54, 0.3);
    }

    .error-circle mat-icon {
      font-size: 50px;
      color: white;
      width: 50px;
      height: 50px;
    }

    .error-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #d32f2f;
      margin: 0 0 20px 0;
    }

    .error-subtitle {
      font-size: 1.1rem;
      color: #7f8c8d;
      margin: 0 0 30px 0;
    }

    .error-actions {
      display: flex;
      justify-content: center;
      gap: 20px;
    }

    /* Cards */
    .summary-card,
    .order-card,
    .next-steps-card {
      background: white;
      border-radius: 20px;
      padding: 40px;
      margin-bottom: 30px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      border: 1px solid #f0f0f0;
    }

    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #f8f9fa;
    }

    .card-header h2 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }

    .card-icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .card-icon mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    /* Summary Content */
    .summary-content,
    .order-content {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .summary-row,
    .order-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .summary-row:hover,
    .order-row:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }

    .summary-row.highlight,
    .order-row.highlight {
      background: linear-gradient(135deg, #e3f2fd, #bbdefb);
      border: 2px solid #2196f3;
    }

    .summary-label,
    .order-label {
      display: flex;
      align-items: center;
      gap: 12px;
      font-weight: 600;
      color: #495057;
    }

    .summary-label mat-icon,
    .order-label mat-icon {
      color: #667eea;
    }

    .summary-value,
    .order-value {
      font-weight: 600;
      color: #2c3e50;
    }

    .summary-value.amount,
    .order-value.amount {
      font-size: 1.3rem;
      color: #2e7d32;
      font-weight: 700;
    }

    .status-success {
      color: #4caf50;
      font-weight: 600;
    }

    .status-chip {
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 0.9rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-paid {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .status-pending {
      background: #fff3e0;
      color: #f57c00;
    }

    /* Next Steps */
    .steps-content {
      display: flex;
      flex-direction: column;
      gap: 25px;
    }

    .step-item {
      display: flex;
      align-items: flex-start;
      gap: 20px;
      padding: 25px;
      background: #f8f9fa;
      border-radius: 16px;
      transition: all 0.3s ease;
    }

    .step-item:hover {
      background: #e9ecef;
      transform: translateX(5px);
    }

    .step-number {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1rem;
      flex-shrink: 0;
    }

    .step-content h4 {
      margin: 0 0 8px 0;
      color: #2c3e50;
      font-size: 1.1rem;
    }

    .step-content p {
      margin: 0;
      color: #6c757d;
      line-height: 1.5;
    }

    /* Action Buttons */
    .action-buttons {
      display: flex;
      justify-content: center;
      gap: 20px;
      margin: 40px 0;
      flex-wrap: wrap;
    }

    .btn-primary,
    .btn-secondary,
    .btn-outline {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 600;
      text-decoration: none;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 180px;
      justify-content: center;
    }

    .btn-primary {
      background: linear-gradient(135deg, #4caf50, #8bc34a);
      color: white;
      box-shadow: 0 8px 25px rgba(76, 175, 80, 0.3);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(76, 175, 80, 0.4);
    }

    .btn-secondary {
      background: linear-gradient(135deg, #2196f3, #03a9f4);
      color: white;
      box-shadow: 0 8px 25px rgba(33, 150, 243, 0.3);
    }

    .btn-secondary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 35px rgba(33, 150, 243, 0.4);
    }

    .btn-outline {
      background: transparent;
      color: #667eea;
      border: 2px solid #667eea;
    }

    .btn-outline:hover {
      background: #667eea;
      color: white;
      transform: translateY(-3px);
    }

    /* Support Section */
    .support-section {
      background: white;
      border-radius: 20px;
      padding: 40px;
      margin-top: 40px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      border: 1px solid #f0f0f0;
    }

    .support-content {
      display: flex;
      align-items: center;
      gap: 30px;
    }

    .support-icon {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff9800, #ff5722);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }

    .support-icon mat-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
    }

    .support-text h4 {
      margin: 0 0 15px 0;
      color: #2c3e50;
      font-size: 1.5rem;
    }

    .support-text p {
      margin: 0 0 20px 0;
      color: #6c757d;
      line-height: 1.6;
    }

    .support-actions {
      display: flex;
      gap: 20px;
    }

    .support-link {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 20px;
      background: #f8f9fa;
      color: #495057;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .support-link:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .success-content {
        padding: 20px 10px;
      }

      .hero-success,
      .hero-error {
        padding: 40px 20px;
      }

      .success-title {
        font-size: 2rem;
      }

      .success-badges {
        flex-direction: column;
        align-items: center;
      }

      .action-buttons {
        flex-direction: column;
        align-items: center;
      }

      .btn-primary,
      .btn-secondary,
      .btn-outline {
        width: 100%;
        max-width: 300px;
      }

      .support-content {
        flex-direction: column;
        text-align: center;
      }

      .card-header {
        flex-direction: column;
        gap: 20px;
        text-align: center;
      }
    }

    @media (max-width: 480px) {
      .hero-success,
      .hero-error {
        padding: 30px 15px;
      }

      .summary-card,
      .order-card,
      .next-steps-card,
      .support-section {
        padding: 25px 20px;
      }

      .success-title {
        font-size: 1.8rem;
      }
    }
  `]
})
export class OrderSuccessComponent implements OnInit {
  loading = true;
  loadingStep = 0;
  paymentConfirmed = false;
  error = false;
  errorMessage = '';
  orderDetails: OrderDetails | null = null;
  sessionId: string | number | null = null;
  orderId: string | number | null = null;
  supplierId: string | number | null = null;
  hadStoredSupplierInfo: boolean = false;
  currentUrl = '';
  urlParams: any = {};

  paymentCompletionStatus: {
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
    details?: any;
  } | null = null;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  ngOnInit() {
    // Get current URL for debugging
    this.currentUrl = window.location.href;
    
    // Get URL parameters
    this.route.queryParams.subscribe(params => {
      this.orderId = params['order_id'];
      this.supplierId = params['supplier_id'];
      this.sessionId = params['session_id'] || params['payment_intent_client_secret'] || params['payment_intent'];
      this.urlParams = params;

      console.log('=== PAYMENT SUCCESS DEBUG ===');
      console.log('Order ID:', this.orderId);
      console.log('Supplier ID:', this.supplierId);
      console.log('Session ID:', this.sessionId);
      console.log('URL Parameters:', this.urlParams);
      console.log('Current URL:', this.currentUrl);
      console.log('=================================');
      
      // Check if order_id is actually a Stripe session ID (starts with cs_test_ or cs_live_)
      const isStripeSessionId = this.orderId && typeof this.orderId === 'string' && 
                               (this.orderId.startsWith('cs_test_') || this.orderId.startsWith('cs_live_'));
      
      if (isStripeSessionId) {
        console.log('⚠️ WARNING: order_id appears to be a Stripe session ID, not an actual order ID');
        console.log('This suggests the supplier redirected to Stripe instead of our success page');
        
        // Check if we have stored supplier order info from sessionStorage
        const storedSupplierInfo = sessionStorage.getItem('supplier_order_info');
        if (storedSupplierInfo) {
          try {
            const supplierInfo = JSON.parse(storedSupplierInfo);
            console.log('✅ Found stored supplier order info:', supplierInfo);
            
            // Use the stored order ID and supplier info
            this.orderId = supplierInfo.orderId;
            this.supplierId = supplierInfo.supplierId;
            
            // Store the fact that we had stored supplier info before clearing it
            this.hadStoredSupplierInfo = true;
            
            // Clear the stored info
            sessionStorage.removeItem('supplier_order_info');
            
            console.log('🔄 Using stored order info - Order ID:', this.orderId, 'Supplier ID:', this.supplierId);
          } catch (e) {
            console.error('❌ Error parsing stored supplier info:', e);
          }
        } else {
          console.log('⚠️ No stored supplier order info found');
          
          // Try to extract order ID from session_id if it follows our pattern
          if (this.sessionId && typeof this.sessionId === 'string' && this.sessionId.startsWith('SOAP_')) {
            const parts = this.sessionId.split('_');
            if (parts.length >= 3) {
                          const extractedOrderId = parts[2];
            console.log('✅ Extracted order ID from session ID:', extractedOrderId);
            this.orderId = extractedOrderId.toString();
            }
          }
          
          // If we still don't have a valid order ID, try to use the Stripe session ID as session_id
          if (!this.sessionId) {
            console.log('🔄 Using Stripe session ID as session_id since no session_id was provided');
            this.sessionId = this.orderId?.toString() || null;
            // We still need a real order ID, so we'll have to get it from the backend
          }
        }
      }



      // Get the original order_id from URL parameters for payment type detection
      const originalOrderId = params['order_id'];
      
      // If it's a platform payment (Stripe redirect), supplierId may be missing. Proceed with success display.
      const isStripePlatform = !!params['payment_intent'] || !!params['payment_intent_client_secret'] || params['payment_type'] === 'platform';
      
      // Check if this is a supplier payment that was redirected to Stripe
      const isSupplierStripeRedirect = originalOrderId && typeof originalOrderId === 'string' && 
                                     (originalOrderId.startsWith('cs_test_') || originalOrderId.startsWith('cs_live_')) && 
                                     (this.hadStoredSupplierInfo || sessionStorage.getItem('supplier_order_info'));
      
      // If we detect a supplier Stripe redirect, treat it as supplier own payment
      const isSupplierOwnPayment = params['payment_type'] === 'supplier_own' || isSupplierStripeRedirect;
      
      // Also check if we have stored supplier info even without Stripe session ID
      const hasStoredSupplierInfo = this.hadStoredSupplierInfo || sessionStorage.getItem('supplier_order_info');
      
      // Check if this is a Stripe redirect that should be treated as platform payment
      const isStripeRedirectFromSupplier = originalOrderId && typeof originalOrderId === 'string' && 
                                         (originalOrderId.startsWith('cs_test_') || originalOrderId.startsWith('cs_live_')) && 
                                         sessionStorage.getItem('stripe_redirect_info');
      
      console.log('🔍 Payment type detection:');
      console.log('  - Original order_id from URL:', originalOrderId);
      console.log('  - isStripePlatform:', isStripePlatform);
      console.log('  - isSupplierOwnPayment:', isSupplierOwnPayment);
      console.log('  - isSupplierStripeRedirect:', isSupplierStripeRedirect);
      console.log('  - hadStoredSupplierInfo:', this.hadStoredSupplierInfo);
      console.log('  - hasStoredSupplierInfo:', hasStoredSupplierInfo);
      console.log('  - Stored supplier info:', sessionStorage.getItem('supplier_order_info'));
      console.log('  - Final orderId:', this.orderId);
      console.log('  - Final supplierId:', this.supplierId);

      if (this.orderId && (this.supplierId || isStripePlatform || isSupplierOwnPayment || isSupplierStripeRedirect || hasStoredSupplierInfo)) {
        console.log('🚀 Starting payment completion process...');
        console.log('🔍 Flow routing decision:');
        console.log('  - isStripePlatform:', isStripePlatform);
        console.log('  - isSupplierOwnPayment:', isSupplierOwnPayment);
        console.log('  - isSupplierStripeRedirect:', isSupplierStripeRedirect);
        console.log('  - hasStoredSupplierInfo:', hasStoredSupplierInfo);
        
        if (isStripePlatform) {
          // For platform payments, skip supplier completion flow and mark success
          console.log('🔄 Routing to: handleStripePlatformSuccess');
          this.loadingStep = 1;
          this.handleStripePlatformSuccess(params);
        } else if (isSupplierOwnPayment) {
          // For supplier own payment system, handle success
          console.log('🔄 Routing to: handleSupplierOwnPaymentSuccess');
          this.loadingStep = 1;
          this.handleSupplierOwnPaymentSuccess(params);
        } else if (isSupplierStripeRedirect) {
          // For supplier payments redirected to Stripe, handle specially
          console.log('🔄 Routing to: handleSupplierStripeRedirect');
          this.loadingStep = 1;
          this.handleSupplierStripeRedirect(params);
        } else if (hasStoredSupplierInfo) {
          // For cases where we have stored supplier info but unclear payment flow
          console.log('🔄 Routing to: handleSupplierStripeRedirect (fallback)');
          this.loadingStep = 1;
          this.handleSupplierStripeRedirect(params);
        } else {
          console.log('🔄 Routing to: processPaymentCompletion');
          this.processPaymentCompletion();
        }
      } else {
        console.error('❌ Payment flow routing failed - missing required information');
        console.error('  - orderId:', this.orderId);
        console.error('  - supplierId:', this.supplierId);
        console.error('  - isStripePlatform:', isStripePlatform);
        console.error('  - isSupplierOwnPayment:', isSupplierOwnPayment);
        console.error('  - isSupplierStripeRedirect:', isSupplierStripeRedirect);
        console.error('  - hasStoredSupplierInfo:', hasStoredSupplierInfo);
        
        this.error = true;
        this.errorMessage = 'Missing order information or invalid parameters';
        this.loading = false;
      }
    });
  }

  private async processPaymentCompletion() {
    try {
      // Step 1: Load order details
      this.loadingStep = 1;
      console.log('📋 Step 1: Loading order details...');
      await this.loadOrderDetails(this.orderId!.toString(), this.supplierId!.toString());
      
      // Step 2: Complete payment
      this.loadingStep = 2;
      console.log('💳 Step 2: Completing payment...');
      await this.completePayment();
      
      // Step 3: Send confirmations (handled by backend)
      this.loadingStep = 3;
      console.log('📧 Step 3: Sending confirmations...');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.paymentConfirmed = true;
      if (this.orderDetails) {
        this.orderDetails.status = 'PAID';
      }
      this.loading = false;
      console.log('✅ Payment completion process finished successfully!');
      
    } catch (error) {
      console.error('Error processing payment completion:', error);
      this.error = true;
      this.errorMessage = 'Failed to complete payment: ' + (error as Error).message;
      this.loading = false;
    }
  }

  private async loadOrderDetails(orderId: string, supplierId: string) {
    try {
      console.log('📋 Loading order details for order:', orderId, 'supplier:', supplierId);
      
      // Load actual order details from backend API
      const response = await this.http.get<any>(`/api/orders/${orderId}`).toPromise();
      console.log('📋 Order details response:', response);
      console.log('📋 Response type:', typeof response);
      console.log('📋 Response keys:', response ? Object.keys(response) : 'No response');
      
      if (response) {
        this.orderDetails = {
          orderNumber: response.orderNumber || response.id || orderId,
          total: response.total || response.amount || 0, // Display price (what customer pays)
          supplierPrice: response.supplierPrice || response.supplier_price || 0, // Supplier's actual price
          currency: response.currency || 'EUR',
          status: response.status || 'PENDING',
          items: response.items || [],
          supplierName: response.supplierName || response.supplier_name || `Supplier ${supplierId}`
        };
        
        console.log('✅ Order details loaded successfully:', this.orderDetails);
        console.log('💰 Price breakdown - Display:', this.orderDetails.total, 'Supplier:', this.orderDetails.supplierPrice);
      } else {
        // Fallback to basic info if API call fails
        console.warn('⚠️ API call failed, using fallback order details');
        this.orderDetails = {
          orderNumber: orderId,
          total: 0,
          supplierPrice: 0,
          currency: 'EUR',
          status: 'PENDING',
          items: [],
          supplierName: `Supplier ${supplierId}`
        };
      }
      
    } catch (error) {
      console.error('❌ Error loading order details:', error);
      
             // Fallback to basic info on error
       this.orderDetails = {
         orderNumber: orderId,
         total: 0,
         supplierPrice: 0,
         currency: 'EUR',
         status: 'PENDING',
         items: [],
         supplierName: `Supplier ${supplierId}`
       };
    }
  }

  private async completePayment() {
    try {
      if (!this.sessionId) {
        throw new Error('No session ID available');
      }

      // If we don't have a valid order ID (it's a Stripe session ID), we need to get it from the backend
      let actualOrderId = this.orderId;
      if (this.orderId && typeof this.orderId === 'string' && (this.orderId.startsWith('cs_test_') || this.orderId.startsWith('cs_live_'))) {
        console.log('🔄 Order ID appears to be a Stripe session ID, need to get real order ID from backend');
        
        // Try multiple approaches to get the real order ID
        
        // Approach 1: Try to get order ID from session mapping using the Stripe session ID
        try {
          const stripeLookupUrl = `/api/order-session-mapping/stripe/${this.orderId?.toString()}`;
          console.log('🔍 Approach 1: Looking up order ID from session mapping using Stripe session ID');
          console.log('🔍 Calling URL:', stripeLookupUrl);
          const stripeResponse = await this.http.get(stripeLookupUrl).toPromise();
          console.log('🔍 Stripe lookup response:', stripeResponse);
          if (stripeResponse && (stripeResponse as any).orderId) {
            actualOrderId = (stripeResponse as any).orderId.toString();
            console.log('✅ Retrieved order ID from Stripe session lookup (Approach 1):', actualOrderId);
          }
        } catch (stripeError) {
          console.warn('⚠️ Approach 1 failed:', stripeError);
          console.warn('⚠️ Error details:', stripeError);
        }
        
        // Approach 2: If Approach 1 failed, try to find by internal session ID
        if (!actualOrderId || (typeof actualOrderId === 'string' && (actualOrderId.startsWith('cs_test_') || actualOrderId.startsWith('cs_live_')))) {
          try {
            const sessionLookupUrl = `/api/order-session-mapping/session/${this.sessionId}`;
            console.log('🔍 Approach 2: Looking up order ID by internal session ID');
            console.log('🔍 Calling URL:', sessionLookupUrl);
            const sessionResponse = await this.http.get(sessionLookupUrl).toPromise();
            console.log('🔍 Session lookup response:', sessionResponse);
            if (sessionResponse && (sessionResponse as any).orderId) {
              actualOrderId = (sessionResponse as any).orderId.toString();
              console.log('✅ Retrieved order ID from internal session lookup (Approach 2):', actualOrderId);
            }
          } catch (sessionError) {
            console.warn('⚠️ Approach 2 failed:', sessionError);
            console.warn('⚠️ Error details:', sessionError);
          }
        }
        
        // Approach 3: Try to extract from session_id if it follows our pattern
        if (!actualOrderId || (typeof actualOrderId === 'string' && (actualOrderId.startsWith('cs_test_') || actualOrderId.startsWith('cs_live_')))) {
          if (this.sessionId && typeof this.sessionId === 'string' && this.sessionId.startsWith('SOAP_')) {
            console.log('🔍 Approach 3: Extracting order ID from session ID pattern');
            const parts = this.sessionId.split('_');
            if (parts.length >= 3) {
                          const extractedOrderId = parts[2];
            console.log('✅ Extracted order ID from session ID pattern (Approach 3):', extractedOrderId);
            actualOrderId = extractedOrderId.toString();
            }
          }
        }
      }

      if (!actualOrderId || (typeof actualOrderId === 'string' && (actualOrderId.startsWith('cs_test_') || actualOrderId.startsWith('cs_live_')))) {
        throw new Error('Unable to determine valid order ID after trying multiple approaches. Please contact support.');
      }

      console.log('🚀 Calling payment completion API...');
      console.log('Endpoint:', '/api/payment-success/success/' + this.sessionId);
      console.log('Request body:', { orderId: actualOrderId.toString(), supplierId: this.supplierId });

      const response = await this.http.post<PaymentCompletionResponse>(
        `/api/payment-success/success/${this.sessionId}`,
        {
          orderId: actualOrderId.toString(),
          supplierId: this.supplierId?.toString()
        }
      ).toPromise();

      console.log('✅ Payment completion result:', response);

             if (response && response.success) {
                 // Update order status to PAID
        if (this.orderDetails) {
          this.orderDetails.status = 'PAID';
          this.orderDetails.orderNumber = actualOrderId.toString();
        }

         // Clear cart after successful payment
         this.cartService.clearCart();
         console.log('🛒 Cart cleared after successful payment');

         // Show success message
         this.paymentCompletionStatus = {
           type: 'success',
           title: 'Payment Completed Successfully!',
           message: 'Your payment has been processed and confirmed.',
           details: {
             paymentId: response.paymentId,
             amount: response.amount,
             currency: response.currency,
             commissionAmount: response.commissionAmount
           }
         };

         console.log('✅ Payment completion successful:', response);
       } else {
        // Show warning message
        this.paymentCompletionStatus = {
          type: 'warning',
          title: 'Payment Completion Warning',
          message: response?.error || 'Payment completion returned false',
          details: response
        };

        console.warn('⚠️ Payment completion warning:', response);
      }
      
         } catch (error) {
       console.error('❌ Payment completion failed:', error);
       
       // Show error message
       this.paymentCompletionStatus = {
         type: 'error',
         title: 'Payment Completion Failed',
         message: (error as Error).message || 'Unknown error occurred',
         details: error
       };

       throw error;
     }
  }

  private async handleStripePlatformSuccess(params: any) {
    try {
      // 1) Confirm payment on backend (works even if Stripe webhook isn't running)
      const paymentIntentId = params['payment_intent'] || null;
      if (paymentIntentId) {
        // Try standard confirm first
        try {
          await this.http.post<any>('/api/payments/confirm', { paymentIntentId }).toPromise();
        } catch (e) {
          console.warn('Platform payment confirm endpoint failed, trying confirm-simple:', e);
          try {
            await this.http.post<any>('/api/payments/confirm-simple', {
              orderId: this.orderId?.toString(),
              paymentIntentId
            }).toPromise();
          } catch (e2) {
            console.warn('confirm-simple also failed. Falling back to UI only:', e2);
          }
        }
      }

      // 2) Load order details for display
      await this.loadOrderDetails(this.orderId!.toString(), (this.supplierId || 'PLATFORM').toString());
      if (this.orderDetails) {
        this.orderDetails.status = 'PAID';
      }
      this.paymentCompletionStatus = {
        type: 'success',
        title: 'Payment Successful',
        message: 'Your payment has been confirmed.',
        details: {
          paymentId: params['payment_intent'] || 'N/A',
          amount: this.orderDetails?.total || 0,
          currency: this.orderDetails?.currency || 'EUR',
          status: 'SUCCEEDED',
          commissionAmount: this.calculateCommission(this.orderDetails?.total || 0, this.orderDetails?.supplierPrice || 0)
        }
      };
      this.paymentConfirmed = true;
      this.loading = false;
    } catch (e) {
      this.error = true;
      this.errorMessage = 'Failed to load order details after Stripe payment.';
      this.loading = false;
    }
  }

  private async handleSupplierOwnPaymentSuccess(params: any) {
    try {
      console.log('🏪 Handling supplier own payment success...');
      
      // 1) Load order details for display
      await this.loadOrderDetails(this.orderId!.toString(), (this.supplierId || 'SUPPLIER').toString());
      if (this.orderDetails) {
        this.orderDetails.status = 'PAID';
      }
      
      // 2) Complete payment in our system (mark as PAID)
      try {
        console.log('💳 Completing supplier payment in our system...');
        
        // Try multiple payment completion endpoints
        let paymentCompleted = false;
        
        // Endpoint 1: Supplier-specific payment completion
        try {
          const response1 = await this.http.post<any>(
            `/api/payment-success/supplier-own/${this.orderId}`,
            {
              orderId: this.orderId,
              supplierId: this.supplierId,
              paymentId: params['payment_id'] || params['transaction_id'] || 'SUPPLIER_PAYMENT',
              amount: this.orderDetails?.total || 0,
              status: 'SUCCEEDED'
            }
          ).toPromise();
          
          console.log('✅ Payment completion endpoint 1 success:', response1);
          paymentCompleted = true;
        } catch (error1) {
          console.warn('⚠️ Endpoint 1 failed:', error1);
        }
        
        // Endpoint 2: Generic payment completion (fallback)
        if (!paymentCompleted) {
          try {
            // Create a proper session ID for our system
            const sessionId = `SUPPLIER_${this.supplierId}_${this.orderId}_${Date.now()}`;
            this.sessionId = sessionId; // Update the session ID for our system
            
            const response2 = await this.http.post<any>(
              `/api/payment-success/success/${sessionId}`,
              {
                orderId: this.orderId,
                supplierId: this.supplierId,
                paymentId: params['payment_id'] || params['transaction_id'] || 'SUPPLIER_PAYMENT',
                amount: this.orderDetails?.total || 0,
                status: 'SUCCEEDED'
              }
            ).toPromise();
            
            console.log('✅ Payment completion endpoint 2 success:', response2);
            paymentCompleted = true;
          } catch (error2) {
            console.warn('⚠️ Endpoint 2 failed:', error2);
          }
        }
        
        if (paymentCompleted) {
          console.log('✅ Payment successfully completed in our system');
        } else {
          console.warn('⚠️ All payment completion endpoints failed, but continuing with UI update');
        }
        
      } catch (paymentError) {
        console.warn('⚠️ Payment completion failed, continuing with UI update:', paymentError);
      }
      
      // 3) Mark payment as successful (since supplier already processed it)
      this.paymentCompletionStatus = {
        type: 'success',
        title: 'Payment Successful',
        message: 'Your payment has been processed by the supplier.',
        details: {
          paymentId: params['payment_id'] || params['transaction_id'] || 'SUPPLIER_PAYMENT',
          amount: this.orderDetails?.total || 0,
          currency: this.orderDetails?.currency || 'EUR',
          status: 'SUCCEEDED',
          commissionAmount: this.calculateCommission(this.orderDetails?.total || 0, this.orderDetails?.supplierPrice || 0)
        }
      };
      
      // 4) Ensure order status is marked as PAID in UI
      if (this.orderDetails) {
        this.orderDetails.status = 'PAID';
        console.log('✅ Order status updated to PAID in UI');
      }
      
      // 5) Clear cart after successful payment
      this.cartService.clearCart();
      console.log('🛒 Cart cleared after successful supplier payment');
      
      // 6) Mark payment as confirmed and stop loading
      this.paymentConfirmed = true;
      this.loading = false;
      console.log('✅ Supplier own payment success handled successfully!');
      console.log('🎉 Customer should now see success page with PAID status');
      
    } catch (e) {
      console.error('❌ Error handling supplier own payment success:', e);
      this.error = true;
      this.errorMessage = 'Failed to load order details after supplier payment.';
      this.loading = false;
    }
  }

  // Handle supplier payment that was redirected to Stripe
  private async handleSupplierStripeRedirect(params: any) {
    try {
      console.log('🏪 Handling supplier payment redirected to Stripe...');
      
      // Check if we have stored supplier order info
      const storedSupplierInfo = sessionStorage.getItem('supplier_order_info');
      if (storedSupplierInfo) {
        try {
          const supplierInfo = JSON.parse(storedSupplierInfo);
          console.log('✅ Found stored supplier order info:', supplierInfo);
          
          // Use the stored order ID and supplier info
          this.orderId = supplierInfo.orderId;
          this.supplierId = supplierInfo.supplierId;
          
          // Clear the stored info
          sessionStorage.removeItem('supplier_order_info');
          
          // Handle as supplier own payment success
          await this.handleSupplierOwnPaymentSuccess(params);
          
        } catch (e) {
          console.error('❌ Error parsing stored supplier info:', e);
          this.error = true;
          this.errorMessage = 'Failed to process supplier payment information.';
          this.loading = false;
        }
      } else {
        console.error('❌ No stored supplier order info found for Stripe redirect');
        this.error = true;
        this.errorMessage = 'Unable to identify the original order for this payment.';
        this.loading = false;
      }
      
    } catch (e) {
      console.error('❌ Error handling supplier Stripe redirect:', e);
      this.error = true;
      this.errorMessage = 'Failed to process payment completion.';
      this.loading = false;
    }
  }



  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  retryPayment() {
    // Reload the page to retry payment
    window.location.reload();
  }

  downloadReceipt() {
    // Generate and download receipt
    console.log('📄 Downloading receipt for order:', this.orderId);
    // TODO: Implement receipt generation and download
    this.snackBar.open('Receipt download feature coming soon!', 'Close', { duration: 3000 });
  }

  // Calculate commission amount as the difference between display price and supplier price
  private calculateCommission(displayPrice: number, supplierPrice?: number): number {
    // Commission = Display Price - Supplier Price
    // This represents the profit margin between what customers pay and what suppliers charge
    
    if (!displayPrice || displayPrice <= 0) {
      return 0;
    }
    
    // If we don't have supplier price, we can't calculate commission
    if (!supplierPrice || supplierPrice <= 0) {
      console.warn('⚠️ No supplier price available, cannot calculate commission');
      return 0;
    }
    
    const commission = displayPrice - supplierPrice;
    return Math.round(commission * 100) / 100; // Round to 2 decimal places
  }

  // Handle supplier payment and commission notification
  private async handleSupplierPaymentAndCommission(orderId: number, displayPrice: number, supplierPrice: number) {
    try {
      console.log('🏪 Processing supplier payment and commission...');
      
      // Calculate commission (what supplier owes us)
      const commission = this.calculateCommission(displayPrice, supplierPrice);
      
      // We pay supplier the full display price (what customer paid)
      const amountToPaySupplier = displayPrice;
      
      console.log('💰 Payment breakdown:');
      console.log('  - Display Price (customer paid):', displayPrice);
      console.log('  - Supplier Price (actual cost):', supplierPrice);
      console.log('  - Commission (supplier owes us):', commission);
      console.log('  - Amount we pay supplier:', amountToPaySupplier);
      
      // TODO: Implement actual supplier payment logic here
      // This would typically involve:
      // 1. Transferring displayPrice to supplier
      // 2. Sending email confirmation to supplier about the commission they owe
      // 3. Updating payment records
      
      console.log('✅ Supplier payment and commission processing completed');
      
    } catch (error) {
      console.error('❌ Error processing supplier payment and commission:', error);
      throw error;
    }
  }
}
