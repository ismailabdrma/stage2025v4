import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface PaymentErrorDetails {
  errorCode?: string;
  errorMessage: string;
  orderId?: string;
  supplierId?: string;
  sessionId?: string;
  amount?: number;
  currency?: string;
  timestamp: Date;
}

@Component({
  selector: 'app-payment-failed',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="failed-container">
      <div class="failed-card">
        <!-- Error Header -->
        <div class="error-header">
          <div class="error-icon">💥</div>
          <h1>Payment Failed</h1>
          <p class="error-subtitle">We're sorry, but your payment could not be processed at this time.</p>
          <div class="error-badge">
            <span class="badge-icon">❌</span>
            <span class="badge-text">Failed</span>
          </div>
        </div>

        <!-- Error Details -->
        <div class="error-details" *ngIf="errorDetails">
          <h2>Error Details</h2>
          <div class="error-grid">
            <div class="error-item">
              <span class="label">Error Message</span>
              <span class="value error-message">{{ errorDetails.errorMessage }}</span>
            </div>
            <div class="error-item" *ngIf="errorDetails.errorCode">
              <span class="label">Error Code</span>
              <span class="value">{{ errorDetails.errorCode }}</span>
            </div>
            <div class="error-item" *ngIf="errorDetails.orderId">
              <span class="label">Order ID</span>
              <span class="value">{{ errorDetails.orderId }}</span>
            </div>
            <div class="error-item" *ngIf="errorDetails.amount">
              <span class="label">Amount</span>
              <span class="value amount">{{ errorDetails.currency || 'EUR' }} {{ errorDetails.amount }}</span>
            </div>
            <div class="error-item">
              <span class="label">Timestamp</span>
              <span class="value">{{ errorDetails.timestamp | date:'medium' }}</span>
            </div>
          </div>
        </div>

        <!-- Common Error Solutions -->
        <div class="error-solutions">
          <h2>What You Can Do</h2>
          <div class="solutions-grid">
            <div class="solution-item">
              <div class="solution-icon">🔄</div>
              <h3>Try Again</h3>
              <p>Sometimes payment issues are temporary. You can attempt the payment again.</p>
              <button class="btn-retry" (click)="retryPayment()">
                <span class="btn-icon">🔄</span>
                Retry Payment
              </button>
            </div>
            
            <div class="solution-item">
              <div class="solution-icon">💳</div>
              <h3>Check Payment Method</h3>
              <p>Verify your card details, expiry date, and available balance.</p>
              <button class="btn-secondary" (click)="goToPayment()">
                <span class="btn-icon">💳</span>
                Update Payment Method
              </button>
            </div>
            
            <div class="solution-item">
              <div class="solution-icon">📞</div>
              <h3>Contact Support</h3>
              <p>Our support team is here to help resolve any payment issues.</p>
              <button class="btn-support" (click)="contactSupport()">
                <span class="btn-icon">📞</span>
                Contact Support
              </button>
            </div>
          </div>
        </div>

        <!-- Support Information -->
        <div class="support-info">
          <h2>Need Help?</h2>
          <div class="support-grid">
            <div class="support-item">
              <div class="support-icon">📧</div>
              <h3>Email Support</h3>
                             <p>support&#64;yourcompany.com</p>
              <button class="btn-email" (click)="sendEmail()">
                <span class="btn-icon">📧</span>
                Send Email
              </button>
            </div>
            
            <div class="support-item">
              <div class="support-icon">💬</div>
              <h3>Live Chat</h3>
              <p>Available 24/7 for immediate assistance</p>
              <button class="btn-chat" (click)="startChat()">
                <span class="btn-icon">💬</span>
                Start Chat
              </button>
            </div>
            
            <div class="support-item">
              <div class="support-icon">📱</div>
              <h3>Phone Support</h3>
              <p>+1 (555) 123-4567</p>
              <button class="btn-phone" (click)="callSupport()">
                <span class="btn-icon">📱</span>
                Call Now
              </button>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions">
          <button class="btn-primary" (click)="goToOrders()">
            <span class="btn-icon">📋</span>
            View My Orders
          </button>
          <button class="btn-secondary" (click)="goToHome()">
            <span class="btn-icon">🛍️</span>
            Continue Shopping
          </button>
          <button class="btn-debug" (click)="toggleDebugInfo()">
            <span class="btn-icon">🔍</span>
            {{ showDebugInfo ? 'Hide' : 'Show' }} Debug Info
          </button>
        </div>

        <!-- Debug Info -->
        <div class="debug-info" *ngIf="showDebugInfo">
          <h3>Debug Information</h3>
          <p><strong>Current URL:</strong> {{ currentUrl }}</p>
          <p><strong>URL Parameters:</strong> {{ urlParams | json }}</p>
          <p><strong>Error Details:</strong> {{ errorDetails | json }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .failed-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 2rem;
      background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .failed-card {
      background: white;
      border-radius: 20px;
      padding: 3rem;
      box-shadow: 0 25px 50px rgba(0,0,0,0.15);
      max-width: 1000px;
      width: 100%;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .failed-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, #dc3545, #c82333, #bd2130);
    }

    .error-header {
      margin-bottom: 2.5rem;
      position: relative;
    }

    .error-icon {
      font-size: 5rem;
      margin-bottom: 1.5rem;
      animation: shake 0.5s ease-in-out;
    }

    .error-header h1 {
      color: #dc3545;
      font-size: 3rem;
      margin-bottom: 1rem;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .error-subtitle {
      font-size: 1.2rem;
      color: #6c757d;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .error-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 25px;
      font-weight: 600;
      font-size: 0.9rem;
      background: linear-gradient(135deg, #f8d7da, #f5c6cb);
      color: #721c24;
      border: 2px solid #dc3545;
    }

    .badge-icon {
      font-size: 1.2rem;
    }

    .error-details {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-radius: 15px;
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid #dee2e6;
    }

    .error-details h2 {
      color: #495057;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .error-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }

    .error-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.05);
      border: 1px solid #e9ecef;
    }

    .error-item .label {
      font-size: 0.85rem;
      color: #6c757d;
      margin-bottom: 0.5rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .error-item .value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #495057;
      text-align: center;
    }

    .error-item .value.error-message {
      color: #dc3545;
      font-size: 1rem;
      word-break: break-word;
    }

    .error-item .value.amount {
      color: #28a745;
      font-size: 1.3rem;
    }

    .error-solutions {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-radius: 15px;
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid #dee2e6;
    }

    .error-solutions h2 {
      color: #495057;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .solution-item {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      border: 1px solid #e9ecef;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .solution-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }

    .solution-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .solution-item h3 {
      color: #495057;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .solution-item p {
      color: #6c757d;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .support-info {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border-radius: 15px;
      padding: 2rem;
      margin: 2rem 0;
      border: 1px solid #dee2e6;
    }

    .support-info h2 {
      color: #495057;
      margin-bottom: 1.5rem;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .support-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .support-item {
      background: white;
      border-radius: 15px;
      padding: 2rem;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      border: 1px solid #e9ecef;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .support-item:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0,0,0,0.15);
    }

    .support-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .support-item h3 {
      color: #495057;
      margin-bottom: 1rem;
      font-size: 1.3rem;
      font-weight: 600;
    }

    .support-item p {
      color: #6c757d;
      margin-bottom: 1.5rem;
      line-height: 1.6;
    }

    .actions {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 3rem;
    }

    .btn-primary, .btn-secondary, .btn-debug, .btn-retry, .btn-support, .btn-email, .btn-chat, .btn-phone {
      padding: 1rem 2rem;
      border: none;
      border-radius: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 1rem;
      min-width: 180px;
      justify-content: center;
    }

    .btn-primary {
      background: linear-gradient(135deg, #007bff, #0056b3);
      color: white;
      box-shadow: 0 4px 15px rgba(0, 123, 255, 0.3);
    }

    .btn-primary:hover {
      background: linear-gradient(135deg, #0056b3, #004085);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(0, 123, 255, 0.4);
    }

    .btn-secondary {
      background: linear-gradient(135deg, #6c757d, #545b62);
      color: white;
      box-shadow: 0 4px 15px rgba(108, 117, 125, 0.3);
    }

    .btn-secondary:hover {
      background: linear-gradient(135deg, #545b62, #3d4449);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
    }

    .btn-debug {
      background: linear-gradient(135deg, #ffc107, #e0a800);
      color: #212529;
      box-shadow: 0 4px 15px rgba(255, 193, 7, 0.3);
    }

    .btn-debug:hover {
      background: linear-gradient(135deg, #e0a800, #c69500);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(255, 193, 7, 0.4);
    }

    .btn-retry {
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
    }

    .btn-retry:hover {
      background: linear-gradient(135deg, #20c997, #17a2b8);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
    }

    .btn-support {
      background: linear-gradient(135deg, #17a2b8, #138496);
      color: white;
      box-shadow: 0 4px 15px rgba(23, 162, 184, 0.3);
    }

    .btn-support:hover {
      background: linear-gradient(135deg, #138496, #117a8b);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
    }

    .btn-email {
      background: linear-gradient(135deg, #6f42c1, #5a2d91);
      color: white;
      box-shadow: 0 4px 15px rgba(111, 66, 193, 0.3);
    }

    .btn-email:hover {
      background: linear-gradient(135deg, #5a2d91, #4a1d7a);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(111, 66, 193, 0.4);
    }

    .btn-chat {
      background: linear-gradient(135deg, #fd7e14, #e55a00);
      color: white;
      box-shadow: 0 4px 15px rgba(253, 126, 20, 0.3);
    }

    .btn-chat:hover {
      background: linear-gradient(135deg, #e55a00, #cc4e00);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(253, 126, 20, 0.4);
    }

    .btn-phone {
      background: linear-gradient(135deg, #20c997, #17a2b8);
      color: white;
      box-shadow: 0 4px 15px rgba(32, 201, 151, 0.3);
    }

    .btn-phone:hover {
      background: linear-gradient(135deg, #17a2b8, #138496);
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(32, 201, 151, 0.4);
    }

    .btn-icon {
      font-size: 1.2rem;
    }

    .debug-info {
      background: linear-gradient(135deg, #f8f9fa, #e9ecef);
      border: 2px solid #dee2e6;
      border-radius: 15px;
      padding: 2rem;
      margin: 2rem 0;
      text-align: left;
    }

    .debug-info h3 {
      margin-bottom: 1.5rem;
      color: #495057;
      text-align: center;
      font-size: 1.5rem;
      font-weight: 600;
    }

    .debug-info p {
      margin: 0.5rem 0;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @media (max-width: 768px) {
      .failed-container {
        padding: 1rem;
      }

      .failed-card {
        padding: 2rem;
        border-radius: 15px;
      }

      .error-header h1 {
        font-size: 2.5rem;
      }

      .error-grid, .solutions-grid, .support-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
      }

      .actions {
        flex-direction: column;
        gap: 1rem;
      }

      .btn-primary, .btn-secondary, .btn-debug, .btn-retry, .btn-support, .btn-email, .btn-chat, .btn-phone {
        width: 100%;
        min-width: auto;
      }
    }
  `]
})
export class PaymentFailedComponent implements OnInit {
  errorDetails: PaymentErrorDetails | null = null;
  currentUrl = '';
  urlParams: any = {};
  showDebugInfo = false;

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private http = inject(HttpClient);

  ngOnInit() {
    this.currentUrl = window.location.href;
    
    this.route.queryParams.subscribe(params => {
      this.urlParams = params;
      
      // Extract error details from URL parameters
      this.errorDetails = {
        errorCode: params['error_code'],
        errorMessage: params['error_message'] || 'Payment processing failed',
        orderId: params['order_id'],
        supplierId: params['supplier_id'],
        sessionId: params['session_id'],
        amount: params['amount'] ? parseFloat(params['amount']) : undefined,
        currency: params['currency'] || 'EUR',
        timestamp: new Date()
      };
    });
  }

  retryPayment() {
    // Navigate back to payment page or retry logic
    if (this.errorDetails?.orderId) {
      this.router.navigate(['/payment', this.errorDetails.orderId]);
    } else {
      this.router.navigate(['/payment']);
    }
  }

  goToPayment() {
    this.router.navigate(['/payment']);
  }

     contactSupport() {
     // Open support contact form or redirect
     window.open('mailto:support&#64;yourcompany.com?subject=Payment%20Issue', '_blank');
   }

     sendEmail() {
     window.open('mailto:support&#64;yourcompany.com?subject=Payment%20Issue', '_blank');
   }

  startChat() {
    // Implement live chat functionality
    alert('Live chat feature coming soon!');
  }

  callSupport() {
    window.open('tel:+15551234567', '_blank');
  }

  toggleDebugInfo() {
    this.showDebugInfo = !this.showDebugInfo;
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
