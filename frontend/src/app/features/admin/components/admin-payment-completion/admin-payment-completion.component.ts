import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-admin-payment-completion',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  template: `
    <div class="payment-completion-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Manual Payment Completion</mat-card-title>
          <mat-card-subtitle>
            Complete payments when Stripe doesn't redirect back properly
          </mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <form [formGroup]="paymentForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Session ID</mat-label>
              <input matInput formControlName="sessionId" placeholder="e.g., cs_test_...">
              <mat-hint>Enter the Stripe session ID or payment session ID</mat-hint>
              <mat-error *ngIf="paymentForm.get('sessionId')?.hasError('required')">
                Session ID is required
              </mat-error>
            </mat-form-field>
            
            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="paymentForm.invalid || loading">
                <span *ngIf="!loading">Complete Payment</span>
                <span *ngIf="loading">Processing...</span>
              </button>
              
              <button mat-raised-button color="accent" type="button" 
                      (click)="checkPaymentStatus()" [disabled]="paymentForm.invalid || checkingStatus">
                <span *ngIf="!checkingStatus">Check Payment Status</span>
                <span *ngIf="checkingStatus">Checking...</span>
              </button>
            </div>
          </form>
          
          <div *ngIf="result" class="result-section">
            <h3>Payment Completion Result:</h3>
            <pre>{{ result | json }}</pre>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .payment-completion-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    
    .form-actions {
      margin-top: 16px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    
    .form-actions button {
      flex: 1;
      min-width: 140px;
    }
    
    .result-section {
      margin-top: 24px;
      padding: 16px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    
    .result-section pre {
      background-color: white;
      padding: 12px;
      border-radius: 4px;
      overflow-x: auto;
    }
  `]
})
export class AdminPaymentCompletionComponent {
  paymentForm: FormGroup;
  loading = false;
  checkingStatus = false;
  result: any = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.paymentForm = this.fb.group({
      sessionId: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.loading = true;
      this.result = null;

      const sessionId = this.paymentForm.get('sessionId')?.value;

      // Try to complete payment by session ID
      this.http.post(`${environment.apiUrl}/api/payment-success/complete-by-session`, {
        sessionId: sessionId
      }).subscribe({
        next: (response: any) => {
          this.result = response;
          this.loading = false;
          
          if (response.success) {
            this.snackBar.open('Payment completed successfully!', 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('Payment completion failed: ' + response.error, 'Close', { duration: 5000 });
          }
        },
        error: (error) => {
          this.result = { success: false, error: error.message };
          this.loading = false;
          this.snackBar.open('Error completing payment: ' + error.message, 'Close', { duration: 5000 });
        }
      });
    }
  }

  checkPaymentStatus() {
    if (this.paymentForm.valid) {
      this.checkingStatus = true;
      this.result = null;

      const sessionId = this.paymentForm.get('sessionId')?.value;

      // Check payment status
      this.http.post(`${environment.apiUrl}/api/payment-success/check-payment-status`, {
        sessionId: sessionId
      }).subscribe({
        next: (response: any) => {
          this.result = response;
          this.checkingStatus = false;
          
          if (response.success) {
            this.snackBar.open('Payment status check completed: ' + response.message, 'Close', { duration: 5000 });
          } else {
            this.snackBar.open('Payment status check failed: ' + response.error, 'Close', { duration: 5000 });
          }
        },
        error: (error) => {
          this.result = { success: false, error: error.message };
          this.checkingStatus = false;
          this.snackBar.open('Error checking payment status: ' + error.message, 'Close', { duration: 5000 });
        }
      });
    }
  }
} 