import { Component, type OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-admin-commissions',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    MatCardModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule,
    MatDialogModule, 
    MatMenuModule,
    MatChipsModule,
    MatTooltipModule
  ],
  templateUrl: './admin-commissions.component.html',
  styleUrls: ['./admin-commissions.component.scss'],
})
export class AdminCommissionsComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private dialog = inject(MatDialog);

  commissions: any[] = [];
  loading = true;
  displayedColumns: string[] = ['id', 'supplier', 'order', 'amount', 'status', 'dueDate', 'actions'];

  // Dashboard data
  dashboardData: any = {
    totalCommissionOwed: 0,
    pendingCommissionsCount: 0,
    overdueCommissionsCount: 0,
    totalCommissions: 0
  };

  ngOnInit(): void {
    this.loadCommissions();
    this.loadDashboard();
  }

  loadCommissions(): void {
    this.loading = true;
    // TODO: Replace with actual service call
    setTimeout(() => {
      this.commissions = [
        {
          id: 1,
          supplierName: 'TechGear Pro',
          orderId: 'ORD-001',
          commissionAmount: 30.00,
          status: 'PENDING',
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          displayPrice: 130.00,
          supplierPrice: 100.00
        },
        {
          id: 2,
          supplierName: 'Electronics Plus',
          orderId: 'ORD-002',
          commissionAmount: 25.00,
          status: 'INVOICED',
          dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
          displayPrice: 125.00,
          supplierPrice: 100.00
        }
      ];
      this.loading = false;
    }, 1000);
  }

  loadDashboard(): void {
    // TODO: Replace with actual service call
    this.dashboardData = {
      totalCommissionOwed: 55.00,
      pendingCommissionsCount: 2,
      overdueCommissionsCount: 0,
      totalCommissions: 2
    };
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'primary';
      case 'INVOICED': return 'accent';
      case 'OVERDUE': return 'warn';
      case 'PAID': return 'success';
      case 'DISPUTED': return 'warn';
      case 'CANCELLED': return 'default';
      default: return 'default';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'PENDING': return 'pending';
      case 'INVOICED': return 'receipt';
      case 'OVERDUE': return 'warning';
      case 'PAID': return 'check_circle';
      case 'DISPUTED': return 'help';
      case 'CANCELLED': return 'cancel';
      default: return 'help';
    }
  }

  openInvoiceDialog(commission: any): void {
    this.snackBar.open(`Invoicing ${commission.supplierName} for €${commission.commissionAmount}`, 'Close', { duration: 3000 });
  }

  markAsPaid(commission: any): void {
    this.snackBar.open(`Marking commission as paid for ${commission.supplierName}`, 'Close', { duration: 3000 });
  }

  viewDetails(commission: any): void {
    console.log('View commission details:', commission);
  }

  sendReminder(commission: any): void {
    this.snackBar.open(`Sending reminder to ${commission.supplierName}`, 'Close', { duration: 3000 });
  }

  processOverdue(): void {
    this.snackBar.open('Processing overdue commissions...', 'Close', { duration: 3000 });
  }

  sendAllReminders(): void {
    this.snackBar.open('Sending payment reminders to all suppliers...', 'Close', { duration: 3000 });
  }
} 