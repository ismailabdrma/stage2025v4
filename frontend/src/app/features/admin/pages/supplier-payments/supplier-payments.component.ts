import { Component, OnInit, inject, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { FormsModule } from "@angular/forms"
import { MatTabsModule } from "@angular/material/tabs"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTableModule } from "@angular/material/table"
import { MatChipsModule } from "@angular/material/chips"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatSelectModule } from "@angular/material/select"
import { MatInputModule } from "@angular/material/input"
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { SupplierPaymentService, type SupplierPayment, type PaymentDashboard, type SupplierPaymentSummary } from "@core/services/supplier-payment.service"

@Component({
  selector: "app-supplier-payments",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
  ],
  template: `
    <div class="payment-dashboard">
      <!-- Header -->
      <div class="dashboard-header">
        <h1>Gestion des Paiements Fournisseurs</h1>
        <div class="header-actions">
          <button mat-raised-button color="primary" (click)="refreshDashboard()">
            <mat-icon>refresh</mat-icon>
            Actualiser
          </button>
          <button mat-stroked-button (click)="processScheduledPayments()">
            <mat-icon>schedule</mat-icon>
            Traiter Paiements Programmés
          </button>
        </div>
      </div>

      <!-- KPI Cards -->
      <div class="kpi-grid" *ngIf="dashboard">
        <mat-card class="kpi-card pending">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ formatCurrency(dashboard.totalPendingAmount) }}</div>
                <div class="kpi-label">Paiements en attente</div>
                <div class="kpi-count">{{ dashboard.pendingCount }} paiements</div>
              </div>
              <mat-icon class="kpi-icon">schedule</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="kpi-card commission">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ formatCurrency(dashboard.totalCommissionEarned) }}</div>
                <div class="kpi-label">Commission totale</div>
                <div class="kpi-count">Ce mois</div>
              </div>
              <mat-icon class="kpi-icon">trending_up</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="kpi-card overdue" *ngIf="dashboard.overduePayments.length > 0">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ dashboard.overduePayments.length }}</div>
                <div class="kpi-label">Paiements en retard</div>
                <div class="kpi-count">Attention requise</div>
              </div>
              <mat-icon class="kpi-icon">warning</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="kpi-card recent">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ dashboard.recentPayments.length }}</div>
                <div class="kpi-label">Paiements récents</div>
                <div class="kpi-count">Dernières 24h</div>
              </div>
              <mat-icon class="kpi-icon">payment</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Main Content Tabs -->
      <mat-tab-group class="main-tabs" [(selectedIndex)]="selectedTab">
        
        <!-- Payments Overview Tab -->
        <mat-tab label="Vue d'ensemble">
          <div class="tab-content">
            
            <!-- Filters -->
            <mat-card class="filters-card">
              <mat-card-content>
                <div class="filters-row">
                  <mat-form-field appearance="outline">
                    <mat-label>Statut</mat-label>
                    <mat-select [(value)]="filters.status" (selectionChange)="applyFilters()">
                      <mat-option value="">Tous les statuts</mat-option>
                      <mat-option value="PENDING">En attente</mat-option>
                      <mat-option value="PROCESSING">En cours</mat-option>
                      <mat-option value="PAID">Payé</mat-option>
                      <mat-option value="FAILED">Échoué</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Type de paiement</mat-label>
                    <mat-select [(value)]="filters.paymentType" (selectionChange)="applyFilters()">
                      <mat-option value="">Tous les types</mat-option>
                      <mat-option value="IMMEDIATE">Immédiat</mat-option>
                      <mat-option value="DAILY">Quotidien</mat-option>
                      <mat-option value="WEEKLY">Hebdomadaire</mat-option>
                      <mat-option value="BI_WEEKLY">Bi-mensuel</mat-option>
                      <mat-option value="MONTHLY">Mensuel</mat-option>
                    </mat-select>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Date de début</mat-label>
                    <input matInput [matDatepicker]="startPicker" [(ngModel)]="filters.startDate" (dateChange)="applyFilters()">
                    <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                    <mat-datepicker #startPicker></mat-datepicker>
                  </mat-form-field>

                  <mat-form-field appearance="outline">
                    <mat-label>Date de fin</mat-label>
                    <input matInput [matDatepicker]="endPicker" [(ngModel)]="filters.endDate" (dateChange)="applyFilters()">
                    <mat-datepicker-toggle matSuffix [for]="endPicker"></mat-datepicker-toggle>
                    <mat-datepicker #endPicker></mat-datepicker>
                  </mat-form-field>

                  <button mat-stroked-button (click)="clearFilters()">
                    <mat-icon>clear</mat-icon>
                    Effacer
                  </button>
                </div>
              </mat-card-content>
            </mat-card>

            <!-- Payments Table -->
            <mat-card class="payments-table-card">
              <mat-card-header>
                <mat-card-title>Paiements Fournisseurs</mat-card-title>
                <div class="card-actions">
                  <button mat-button (click)="exportPayments()">
                    <mat-icon>download</mat-icon>
                    Exporter
                  </button>
                </div>
              </mat-card-header>
              <mat-card-content>
                <div class="table-container">
                  <table mat-table [dataSource]="payments" class="payments-table">
                    
                    <!-- Reference Column -->
                    <ng-container matColumnDef="reference">
                      <th mat-header-cell *matHeaderCellDef>Référence</th>
                      <td mat-cell *matCellDef="let payment">
                        <div class="reference-cell">
                          <span class="reference">{{ payment.paymentReference }}</span>
                          <mat-chip [class]="'chip-' + getStatusColor(payment.status)" size="small">
                            {{ getStatusLabel(payment.status) }}
                          </mat-chip>
                        </div>
                      </td>
                    </ng-container>

                    <!-- Supplier Column -->
                    <ng-container matColumnDef="supplier">
                      <th mat-header-cell *matHeaderCellDef>Fournisseur</th>
                      <td mat-cell *matCellDef="let payment">
                        <div class="supplier-cell">
                          <span class="supplier-name">{{ payment.supplierName }}</span>
                          <span class="supplier-email">{{ payment.supplierEmail }}</span>
                        </div>
                      </td>
                    </ng-container>

                    <!-- Amount Column -->
                    <ng-container matColumnDef="amount">
                      <th mat-header-cell *matHeaderCellDef>Montant</th>
                      <td mat-cell *matCellDef="let payment">
                        <div class="amount-cell">
                          <span class="total-amount">{{ formatCurrency(payment.totalAmount) }}</span>
                          <span class="payment-type" *ngIf="payment.isCommissionPayment">Commission</span>
                          <span class="payment-type" *ngIf="!payment.isCommissionPayment">Paiement</span>
                        </div>
                      </td>
                    </ng-container>

                    <!-- Type Column -->
                    <ng-container matColumnDef="type">
                      <th mat-header-cell *matHeaderCellDef>Fréquence</th>
                      <td mat-cell *matCellDef="let payment">
                        <mat-chip [class]="'chip-type-' + payment.paymentType.toLowerCase()">
                          {{ getPaymentTypeLabel(payment.paymentType) }}
                        </mat-chip>
                      </td>
                    </ng-container>

                    <!-- Dates Column -->
                    <ng-container matColumnDef="dates">
                      <th mat-header-cell *matHeaderCellDef>Dates</th>
                      <td mat-cell *matCellDef="let payment">
                        <div class="dates-cell">
                          <div class="date-row">
                            <span class="date-label">Créé:</span>
                            <span>{{ formatDate(payment.createdDate) }}</span>
                          </div>
                          <div class="date-row">
                            <span class="date-label">Programmé:</span>
                            <span>{{ formatDate(payment.scheduledDate) }}</span>
                          </div>
                          <div class="date-row" *ngIf="payment.processedDate">
                            <span class="date-label">Traité:</span>
                            <span>{{ formatDate(payment.processedDate) }}</span>
                          </div>
                        </div>
                      </td>
                    </ng-container>

                    <!-- Actions Column -->
                    <ng-container matColumnDef="actions">
                      <th mat-header-cell *matHeaderCellDef>Actions</th>
                      <td mat-cell *matCellDef="let payment">
                        <div class="actions-cell">
                          <button mat-icon-button (click)="viewPaymentDetails(payment.id)" matTooltip="Voir détails">
                            <mat-icon>visibility</mat-icon>
                          </button>
                          <button mat-icon-button *ngIf="payment.status === 'PENDING'" (click)="processPayment(payment)" matTooltip="Traiter">
                            <mat-icon>play_arrow</mat-icon>
                          </button>
                          <button mat-icon-button *ngIf="payment.status === 'PENDING'" (click)="cancelPayment(payment)" matTooltip="Annuler">
                            <mat-icon>cancel</mat-icon>
                          </button>
                          <button mat-icon-button color="primary" *ngIf="payment.status !== 'PAID'" (click)="markAsPaid(payment)" matTooltip="Marquer comme payé">
                            <mat-icon>done</mat-icon>
                          </button>
                        </div>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                  </table>
                </div>
              </mat-card-content>
            </mat-card>

          </div>
        </mat-tab>

        <!-- Suppliers Summary Tab -->
        <mat-tab label="Résumé Fournisseurs">
          <div class="tab-content">
            <div class="suppliers-grid">
              <mat-card *ngFor="let summary of supplierSummaries" class="supplier-summary-card">
                <mat-card-header>
                  <mat-card-title>{{ summary.supplierName }}</mat-card-title>
                  <mat-card-subtitle>{{ summary.supplierEmail }}</mat-card-subtitle>
                </mat-card-header>
                <mat-card-content>
                  <div class="summary-stats">
                    <div class="stat-row">
                      <span class="stat-label">En attente:</span>
                      <span class="stat-value pending">{{ formatCurrency(summary.totalPendingAmount) }}</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">Payé ce mois:</span>
                      <span class="stat-value paid">{{ formatCurrency(summary.totalPaidAmount) }}</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">Commission gagnée:</span>
                      <span class="stat-value commission">{{ formatCurrency(summary.totalCommissionEarned) }}</span>
                    </div>
                    <div class="stat-row">
                      <span class="stat-label">Nb commandes:</span>
                      <span class="stat-value">{{ summary.totalOrdersCount }}</span>
                    </div>
                  </div>
                  
                  <div class="summary-alerts" *ngIf="summary.requiresAttention">
                    <mat-chip color="warn" *ngIf="summary.hasOverduePayments">
                      <mat-icon>warning</mat-icon>
                      Paiements en retard
                    </mat-chip>
                    <mat-chip color="accent" *ngIf="summary.hasFailedPayments">
                      <mat-icon>error</mat-icon>
                      Paiements échoués
                    </mat-chip>
                  </div>
                </mat-card-content>
                <mat-card-actions>
                  <button mat-button [routerLink]="['/admin/suppliers', summary.supplierId]">Voir Détails</button>
                  <button mat-button (click)="viewSupplierPayments(summary.supplierId)">Paiements</button>
                </mat-card-actions>
              </mat-card>
            </div>
          </div>
        </mat-tab>

        <!-- Statistics Tab -->
        <mat-tab label="Statistiques">
          <div class="tab-content">
            <div class="stats-grid">
              <mat-card class="chart-card">
                <mat-card-header>
                  <mat-card-title>Tendances de Paiement</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <!-- Chart would go here -->
                  <div class="chart-placeholder">
                    <mat-icon>trending_up</mat-icon>
                    <p>Graphique des tendances de paiement</p>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card class="chart-card">
                <mat-card-header>
                  <mat-card-title>Répartition par Statut</mat-card-title>
                </mat-card-header>
                <mat-card-content>
                  <div class="status-breakdown" *ngIf="dashboard">
                    <div class="status-item" *ngFor="let status of getStatusBreakdown()">
                      <div class="status-info">
                        <span class="status-label">{{ status.label }}</span>
                        <span class="status-count">{{ status.count }}</span>
                      </div>
                      <div class="status-bar">
                        <div class="status-fill" [style.width.%]="status.percentage" [class]="'fill-' + status.color"></div>
                      </div>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>
          </div>
        </mat-tab>

      </mat-tab-group>

    </div>
  `,
  styleUrls: ["./supplier-payments.component.scss"]
})
export class SupplierPaymentsComponent implements OnInit {
  private paymentService = inject(SupplierPaymentService)
  private snackBar = inject(MatSnackBar)
  private dialog = inject(MatDialog)

  // Data
  dashboard: PaymentDashboard | null = null
  payments: SupplierPayment[] = []
  supplierSummaries: SupplierPaymentSummary[] = []
  
  // UI State
  selectedTab = 0
  loading = false
  
  // Filters
  filters = {
    status: '',
    paymentType: '',
    startDate: null as Date | null,
    endDate: null as Date | null,
    supplierId: null as number | null
  }

  // Table
  displayedColumns = ['reference', 'supplier', 'amount', 'type', 'dates', 'actions']

  ngOnInit(): void {
    this.loadData()
    
    // Subscribe to real-time updates
    this.paymentService.dashboard$.subscribe(dashboard => {
      if (dashboard) {
        this.dashboard = dashboard
      }
    })
  }

  loadData(): void {
    this.loading = true
    
    // Load dashboard
    this.paymentService.getDashboard().subscribe({
      next: (dashboard) => {
        this.dashboard = dashboard
        this.payments = dashboard.pendingPayments
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du chargement du tableau de bord', 'Fermer', { duration: 5000 })
        console.error('Dashboard error:', error)
      }
    })

    // Load supplier summaries
    this.paymentService.getAllSupplierSummaries().subscribe({
      next: (summaries) => {
        this.supplierSummaries = summaries
      },
      error: (error) => {
        console.error('Supplier summaries error:', error)
      }
    })

    this.loading = false
  }

  refreshDashboard(): void {
    this.paymentService.refreshDashboard()
    this.loadData()
    this.snackBar.open('Tableau de bord actualisé', 'Fermer', { duration: 2000 })
  }

  applyFilters(): void {
    const filterParams = {
      status: this.filters.status || undefined,
      startDate: this.filters.startDate?.toISOString() || undefined,
      endDate: this.filters.endDate?.toISOString() || undefined
    }

    this.paymentService.getAllPayments(filterParams).subscribe({
      next: (payments) => {
        this.payments = payments
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du filtrage', 'Fermer', { duration: 3000 })
      }
    })
  }

  clearFilters(): void {
    this.filters = {
      status: '',
      paymentType: '',
      startDate: null,
      endDate: null,
      supplierId: null
    }
    this.applyFilters()
  }

  processPayment(payment: SupplierPayment): void {
    this.paymentService.processPayment(payment.id).subscribe({
      next: (updatedPayment) => {
        this.snackBar.open('Paiement traité avec succès', 'Fermer', { duration: 3000 })
        this.loadData()
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du traitement du paiement', 'Fermer', { duration: 5000 })
      }
    })
  }

  markAsPaid(payment: SupplierPayment): void {
    this.paymentService.updatePaymentStatus(payment.id, 'PAID', 'Marked as paid by admin').subscribe({
      next: (updated) => {
        this.snackBar.open('Marqué comme payé', 'Fermer', { duration: 3000 })
        this.loadData()
      },
      error: () => this.snackBar.open('Erreur lors du marquage', 'Fermer', { duration: 3000 })
    })
  }

  cancelPayment(payment: SupplierPayment): void {
    const reason = prompt('Raison de l\'annulation:')
    if (reason) {
      this.paymentService.cancelPayment(payment.id, reason).subscribe({
        next: () => {
          this.snackBar.open('Paiement annulé', 'Fermer', { duration: 3000 })
          this.loadData()
        },
        error: (error) => {
          this.snackBar.open('Erreur lors de l\'annulation', 'Fermer', { duration: 5000 })
        }
      })
    }
  }

  processScheduledPayments(): void {
    this.paymentService.processScheduledPayments().subscribe({
      next: (processedPayments) => {
        this.snackBar.open(`${processedPayments.length} paiements traités`, 'Fermer', { duration: 3000 })
        this.loadData()
      },
      error: (error) => {
        this.snackBar.open('Erreur lors du traitement des paiements programmés', 'Fermer', { duration: 5000 })
      }
    })
  }

  viewSupplierPayments(supplierId: number): void {
    this.filters.supplierId = supplierId
    this.selectedTab = 0
    this.applyFilters()
  }

  exportPayments(): void {
    // Implementation for export functionality
    this.snackBar.open('Export en cours...', 'Fermer', { duration: 2000 })
  }

  getStatusBreakdown(): any[] {
    if (!this.dashboard) return []
    
    const total = Object.values(this.dashboard.paymentsByStatus).reduce((sum, count) => sum + count, 0)
    
    return Object.entries(this.dashboard.paymentsByStatus).map(([status, count]) => ({
      label: this.getStatusLabel(status),
      count,
      percentage: total > 0 ? (count / total) * 100 : 0,
      color: this.getStatusColor(status)
    }))
  }

  // Helper methods
  formatCurrency = this.paymentService.formatCurrency
  formatDate = this.paymentService.formatDate
  getStatusColor = this.paymentService.getStatusColor
  getStatusLabel = this.paymentService.getStatusLabel
  getPaymentTypeLabel = this.paymentService.getPaymentTypeLabel

  viewPaymentDetails(id: number): void {
    this.paymentService.getPayment(id).subscribe({
      next: (p) => {
        const msg = `Réf: ${p.paymentReference}\nFournisseur: ${p.supplierName}\nMontant: ${this.formatCurrency(p.totalAmount)}\nStatut: ${this.getStatusLabel(p.status)}\nProgrammé: ${p.scheduledDate ? this.formatDate(p.scheduledDate) : ''}`
        this.snackBar.open(msg, 'Fermer', { duration: 5000 })
      },
      error: () => this.snackBar.open('Impossible de charger les détails', 'Fermer', { duration: 3000 })
    })
  }
}

    


  // Helper methods
