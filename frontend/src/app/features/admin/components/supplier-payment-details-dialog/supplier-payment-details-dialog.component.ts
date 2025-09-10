import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SupplierPaymentService } from '@core/services/supplier-payment.service';

export interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  icon: string;
  requiresReference: boolean;
  requiresConfirmation: boolean;
}

export interface SupplierPaymentDetailsData {
  payment: any;
}

@Component({
  selector: 'app-supplier-payment-details-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  template: `
    <div class="payment-details-dialog">
      <h2 mat-dialog-title>
        <mat-icon>payment</mat-icon>
        Payment Details - {{ data.payment?.supplierName }}
      </h2>

      <mat-dialog-content class="dialog-content">
        <!-- Payment Information Card -->
        <mat-card class="payment-info-card">
          <mat-card-header>
            <mat-card-title>Payment Information</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="info-grid">
              <div class="info-item">
                <label>Payment ID:</label>
                <span>#{{ data.payment?.id }}</span>
              </div>
              <div class="info-item">
                <label>Supplier:</label>
                <span>{{ data.payment?.supplierName }}</span>
              </div>
              <div class="info-item">
                <label>Amount:</label>
                <span class="amount">€{{ data.payment?.amount | number:'1.2-2' }}</span>
              </div>
              <div class="info-item">
                <label>Status:</label>
                <span class="status" [class]="'status-' + data.payment?.status?.toLowerCase()">
                  {{ data.payment?.status }}
                </span>
              </div>
              <div class="info-item">
                <label>Created Date:</label>
                <span>{{ data.payment?.paymentDate | date:'medium' }}</span>
              </div>
              <div class="info-item" *ngIf="data.payment?.description">
                <label>Description:</label>
                <span>{{ data.payment?.description }}</span>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Payment Method Selection -->
        <mat-card class="payment-method-card" *ngIf="data.payment?.status === 'PENDING'">
          <mat-card-header>
            <mat-card-title>Select Payment Method</mat-card-title>
            <mat-card-subtitle>Choose how to process this payment</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <form [formGroup]="paymentForm" (ngSubmit)="processPayment()">
              <div class="payment-methods">
                <mat-card 
                  *ngFor="let method of paymentMethods" 
                  class="payment-method-option"
                  [class.selected]="selectedPaymentMethod === method.id"
                  (click)="selectPaymentMethod(method.id)">
                  <mat-card-content>
                    <div class="method-header">
                      <mat-checkbox 
                        [checked]="selectedPaymentMethod === method.id"
                        (change)="selectPaymentMethod(method.id)">
                      </mat-checkbox>
                      <mat-icon class="method-icon">{{ method.icon }}</mat-icon>
                      <div class="method-info">
                        <h4>{{ method.name }}</h4>
                        <p>{{ method.description }}</p>
                      </div>
                    </div>
                  </mat-card-content>
                </mat-card>
              </div>

              <!-- Payment Reference (if required) -->
              <mat-form-field appearance="outline" *ngIf="selectedPaymentMethod && requiresReference">
                <mat-label>Payment Reference</mat-label>
                <input matInput 
                       formControlName="paymentReference" 
                       placeholder="Enter payment reference number">
                <mat-icon matSuffix>receipt</mat-icon>
                <mat-hint>Bank transfer reference, transaction ID, or receipt number</mat-hint>
              </mat-form-field>

              <!-- Additional Notes -->
              <mat-form-field appearance="outline">
                <mat-label>Processing Notes</mat-label>
                <textarea matInput 
                          formControlName="processingNotes"
                          placeholder="Add any additional notes about this payment"
                          rows="3"></textarea>
                <mat-icon matSuffix>note</mat-icon>
              </mat-form-field>

              <!-- Confirmation Checkbox -->
              <div class="confirmation-section" *ngIf="selectedPaymentMethod && requiresConfirmation">
                <mat-checkbox formControlName="paymentConfirmed">
                  I confirm that this payment has been successfully processed
                </mat-checkbox>
              </div>
            </form>
          </mat-card-content>
        </mat-card>

        <!-- Payment History (if available) -->
        <mat-card class="payment-history-card" *ngIf="paymentHistory.length > 0">
          <mat-card-header>
            <mat-card-title>Payment History</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="history-timeline">
              <div *ngFor="let event of paymentHistory" class="history-event">
                <div class="event-icon">
                  <mat-icon>{{ event.icon }}</mat-icon>
                </div>
                <div class="event-content">
                  <h4>{{ event.title }}</h4>
                  <p>{{ event.description }}</p>
                  <span class="event-date">{{ event.date | date:'medium' }}</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="closeDialog()">Close</button>
        <button mat-button 
                *ngIf="data.payment?.status === 'PENDING'"
                (click)="processPayment()" 
                [disabled]="!canProcessPayment() || processing"
                color="primary">
          <mat-spinner *ngIf="processing" diameter="20"></mat-spinner>
          <mat-icon *ngIf="!processing">payment</mat-icon>
          {{ processing ? 'Processing...' : 'Process Payment' }}
        </button>
        <button mat-button 
                *ngIf="data.payment?.status === 'PROCESSING'"
                (click)="confirmPayment()" 
                [disabled]="processing"
                color="accent">
          <mat-icon>check_circle</mat-icon>
          Confirm Payment
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .payment-details-dialog {
      min-width: 600px;
      max-width: 800px;
    }

    .dialog-content {
      max-height: 70vh;
      overflow-y: auto;
    }

    .payment-info-card,
    .payment-method-card,
    .payment-history-card {
      margin-bottom: 20px;
    }

    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .info-item {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .info-item label {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
    }

    .info-item span {
      color: #333;
    }

    .amount {
      font-size: 1.2rem;
      font-weight: 700;
      color: #2e7d32;
    }

    .status {
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-pending {
      background: #fff3e0;
      color: #f57c00;
    }

    .status-processing {
      background: #e3f2fd;
      color: #1976d2;
    }

    .status-paid {
      background: #e8f5e8;
      color: #2e7d32;
    }

    .status-failed {
      background: #ffebee;
      color: #d32f2f;
    }

    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .payment-method-option {
      cursor: pointer;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .payment-method-option:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .payment-method-option.selected {
      border-color: #2196f3;
      background: #f3f9ff;
    }

    .method-header {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .method-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #2196f3;
    }

    .method-info h4 {
      margin: 0 0 4px 0;
      color: #333;
    }

    .method-info p {
      margin: 0;
      color: #666;
      font-size: 0.9rem;
    }

    .confirmation-section {
      margin-top: 20px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .history-timeline {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .history-event {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      background: #f8f9fa;
      border-radius: 8px;
    }

    .event-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #2196f3;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .event-content h4 {
      margin: 0 0 4px 0;
      color: #333;
    }

    .event-content p {
      margin: 0 0 8px 0;
      color: #666;
    }

    .event-date {
      font-size: 0.8rem;
      color: #999;
    }

    mat-dialog-actions {
      padding: 20px;
      border-top: 1px solid #e0e0e0;
    }

    @media (max-width: 768px) {
      .payment-details-dialog {
        min-width: 100%;
        max-width: 100%;
      }

      .info-grid {
        grid-template-columns: 1fr;
      }

      .method-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 8px;
      }
    }
  `]
})
export class SupplierPaymentDetailsDialogComponent implements OnInit {
  paymentForm: FormGroup;
  selectedPaymentMethod: string | null = null;
  processing = false;
  paymentHistory: any[] = [];

  paymentMethods: PaymentMethod[] = [
    {
      id: 'bank_transfer',
      name: 'Bank Transfer',
      description: 'Transfer funds directly to supplier bank account',
      icon: 'account_balance',
      requiresReference: true,
      requiresConfirmation: true
    },
    {
      id: 'cash',
      name: 'Cash Payment',
      description: 'Physical cash payment to supplier',
      icon: 'money',
      requiresReference: false,
      requiresConfirmation: true
    },
    {
      id: 'api_payment',
      name: 'API Payment',
      description: 'Process payment through supplier API integration',
      icon: 'api',
      requiresReference: true,
      requiresConfirmation: false
    },
    {
      id: 'manual',
      name: 'Manual Payment',
      description: 'Record external payment (check, wire, etc.)',
      icon: 'receipt_long',
      requiresReference: true,
      requiresConfirmation: true
    }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SupplierPaymentDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SupplierPaymentDetailsData,
    private supplierPaymentService: SupplierPaymentService,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      paymentReference: [''],
      processingNotes: [''],
      paymentConfirmed: [false]
    });
  }

  ngOnInit(): void {
    this.loadPaymentHistory();
  }

  get requiresReference(): boolean {
    const method = this.paymentMethods.find(m => m.id === this.selectedPaymentMethod);
    return method?.requiresReference || false;
  }

  get requiresConfirmation(): boolean {
    const method = this.paymentMethods.find(m => m.id === this.selectedPaymentMethod);
    return method?.requiresConfirmation || false;
  }

  selectPaymentMethod(methodId: string): void {
    this.selectedPaymentMethod = methodId;
    this.paymentForm.patchValue({ paymentMethod: methodId });
    
    // Clear reference if not required
    if (!this.requiresReference) {
      this.paymentForm.patchValue({ paymentReference: '' });
    }
  }

  canProcessPayment(): boolean {
    if (!this.selectedPaymentMethod) return false;
    
    const formValue = this.paymentForm.value;
    
    // Check if reference is required and provided
    if (this.requiresReference && !formValue.paymentReference?.trim()) {
      return false;
    }
    
    // Check if confirmation is required
    if (this.requiresConfirmation && !formValue.paymentConfirmed) {
      return false;
    }
    
    return true;
  }

  processPayment(): void {
    if (!this.canProcessPayment()) {
      this.snackBar.open('Please fill in all required fields', 'Close', { duration: 3000 });
      return;
    }

    this.processing = true;
    const formValue = this.paymentForm.value;

    const paymentData = {
      paymentId: this.data.payment.id,
      paymentMethod: this.selectedPaymentMethod,
      paymentReference: formValue.paymentReference,
      processingNotes: formValue.processingNotes,
      confirmed: formValue.paymentConfirmed
    };

    this.supplierPaymentService.processPayment(paymentData).subscribe({
      next: (response) => {
        this.snackBar.open('Payment processed successfully', 'Close', { duration: 3000 });
        this.dialogRef.close({ success: true, payment: response });
        this.processing = false;
      },
      error: (error) => {
        console.error('Error processing payment:', error);
        this.snackBar.open('Failed to process payment: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 5000 });
        this.processing = false;
      }
    });
  }

  confirmPayment(): void {
    this.processing = true;
    
    this.supplierPaymentService.confirmPayment(this.data.payment.id).subscribe({
      next: (response) => {
        this.snackBar.open('Payment confirmed successfully', 'Close', { duration: 3000 });
        this.dialogRef.close({ success: true, payment: response });
        this.processing = false;
      },
      error: (error) => {
        console.error('Error confirming payment:', error);
        this.snackBar.open('Failed to confirm payment: ' + (error.error?.message || 'Unknown error'), 'Close', { duration: 5000 });
        this.processing = false;
      }
    });
  }

  loadPaymentHistory(): void {
    // Mock payment history - in real implementation, this would come from the service
    this.paymentHistory = [
      {
        title: 'Payment Created',
        description: 'Payment was created and scheduled',
        date: this.data.payment?.paymentDate,
        icon: 'add_circle'
      },
      {
        title: 'Status Updated',
        description: 'Payment status changed to ' + this.data.payment?.status,
        date: this.data.payment?.paymentDate,
        icon: 'update'
      }
    ];
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}



