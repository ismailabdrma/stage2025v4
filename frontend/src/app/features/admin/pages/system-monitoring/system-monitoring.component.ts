import { Component, OnInit, OnDestroy, inject, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatChipsModule } from "@angular/material/chips"
import { MatTableModule } from "@angular/material/table"
import { MatTabsModule } from "@angular/material/tabs"
import { interval, Subscription } from "rxjs"
import { HttpClient } from "@angular/common/http"
import { environment } from "@environments/environment"

interface SystemHealth {
  status: 'UP' | 'DOWN'
  details: {
    totalOrders: number
    totalPayments: number
    activeUsers: number
    errorCount: number
    systemLoad: number
    databaseHealth: boolean
    paymentSystemHealth: boolean
    emailSystemHealth: boolean
    lastHealthCheck: string
  }
}

interface SystemMetrics {
  memoryUsed: number
  memoryTotal: number
  memoryMax: number
  processorCount: number
  systemLoad: number
  timestamp: string
}

interface PerformanceReport {
  order_creation_avg_time: number
  order_creation_count: number
  payment_processing_avg_time: number
  payment_processing_count: number
  total_orders: number
  total_payments: number
  active_users: number
  error_rate: number
}

@Component({
  selector: "app-system-monitoring",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatChipsModule,
    MatTableModule,
    MatTabsModule,
  ],
  template: `
    <div class="monitoring-dashboard">
      
      <!-- Header -->
      <div class="dashboard-header">
        <h1>Surveillance Système Enterprise</h1>
        <div class="header-actions">
          <button mat-raised-button color="primary" (click)="refreshData()">
            <mat-icon>refresh</mat-icon>
            Actualiser
          </button>
          <mat-chip [class]="systemHealth?.status === 'UP' ? 'status-healthy' : 'status-unhealthy'">
            <mat-icon>{{ systemHealth?.status === 'UP' ? 'health_and_safety' : 'error' }}</mat-icon>
            {{ systemHealth?.status === 'UP' ? 'Système Opérationnel' : 'Problème Détecté' }}
          </mat-chip>
        </div>
      </div>

      <!-- Real-time KPIs -->
      <div class="kpi-grid">
        <mat-card class="kpi-card orders">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ systemHealth?.details?.totalOrders || 0 | number }}</div>
                <div class="kpi-label">Commandes Totales</div>
                <div class="kpi-trend" [class.positive]="orderTrend > 0" [class.negative]="orderTrend < 0">
                  <mat-icon>{{ orderTrend > 0 ? 'trending_up' : orderTrend < 0 ? 'trending_down' : 'trending_flat' }}</mat-icon>
                  {{ orderTrend | number:'1.1-1' }}%
                </div>
              </div>
              <mat-icon class="kpi-icon">shopping_cart</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="kpi-card payments">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ systemHealth?.details?.totalPayments || 0 | number }}</div>
                <div class="kpi-label">Paiements Traités</div>
                <div class="kpi-trend" [class.positive]="paymentTrend > 0">
                  <mat-icon>trending_up</mat-icon>
                  {{ paymentTrend | number:'1.1-1' }}%
                </div>
              </div>
              <mat-icon class="kpi-icon">payment</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="kpi-card users">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ systemHealth?.details?.activeUsers || 0 | number }}</div>
                <div class="kpi-label">Utilisateurs Actifs</div>
                <div class="kpi-sublabel">En temps réel</div>
              </div>
              <mat-icon class="kpi-icon">people</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="kpi-card errors" [class.alert]="(systemHealth?.details?.errorCount || 0) > 10">
          <mat-card-content>
            <div class="kpi-content">
              <div class="kpi-info">
                <div class="kpi-value">{{ systemHealth?.details?.errorCount || 0 | number }}</div>
                <div class="kpi-label">Erreurs</div>
                <div class="kpi-sublabel">Dernière heure</div>
              </div>
              <mat-icon class="kpi-icon">error_outline</mat-icon>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <!-- Main Tabs -->
      <mat-tab-group class="monitoring-tabs">
        
        <!-- System Health Tab -->
        <mat-tab label="État du Système">
          <div class="tab-content">
            
            <!-- Component Status -->
            <div class="components-grid">
              <mat-card class="component-card">
                <mat-card-header>
                  <mat-card-title>Base de Données</mat-card-title>
                  <mat-chip [class]="systemHealth?.details?.databaseHealth ? 'status-up' : 'status-down'">
                    {{ systemHealth?.details?.databaseHealth ? 'ACTIF' : 'INACTIF' }}
                  </mat-chip>
                </mat-card-header>
                <mat-card-content>
                  <div class="component-metrics">
                    <div class="metric">
                      <span class="metric-label">Latence:</span>
                      <span class="metric-value">{{ databaseLatency }}ms</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Connexions:</span>
                      <span class="metric-value">{{ databaseConnections }}</span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card class="component-card">
                <mat-card-header>
                  <mat-card-title>Système de Paiement</mat-card-title>
                  <mat-chip [class]="systemHealth?.details?.paymentSystemHealth ? 'status-up' : 'status-down'">
                    {{ systemHealth?.details?.paymentSystemHealth ? 'ACTIF' : 'INACTIF' }}
                  </mat-chip>
                </mat-card-header>
                <mat-card-content>
                  <div class="component-metrics">
                    <div class="metric">
                      <span class="metric-label">Taux de succès:</span>
                      <span class="metric-value">{{ paymentSuccessRate | number:'1.1-1' }}%</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Temps moyen:</span>
                      <span class="metric-value">{{ averagePaymentTime }}ms</span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>

              <mat-card class="component-card">
                <mat-card-header>
                  <mat-card-title>Système Email</mat-card-title>
                  <mat-chip [class]="systemHealth?.details?.emailSystemHealth ? 'status-up' : 'status-down'">
                    {{ systemHealth?.details?.emailSystemHealth ? 'ACTIF' : 'INACTIF' }}
                  </mat-chip>
                </mat-card-header>
                <mat-card-content>
                  <div class="component-metrics">
                    <div class="metric">
                      <span class="metric-label">Emails envoyés:</span>
                      <span class="metric-value">{{ emailsSent | number }}</span>
                    </div>
                    <div class="metric">
                      <span class="metric-label">Taux de livraison:</span>
                      <span class="metric-value">{{ emailDeliveryRate | number:'1.1-1' }}%</span>
                    </div>
                  </div>
                </mat-card-content>
              </mat-card>
            </div>

            <!-- System Resources -->
            <mat-card class="resources-card">
              <mat-card-header>
                <mat-card-title>Ressources Système</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="resource-metrics">
                  
                  <div class="resource-item">
                    <div class="resource-header">
                      <span class="resource-label">Utilisation Mémoire</span>
                      <span class="resource-value">{{ getMemoryUsagePercent() | number:'1.1-1' }}%</span>
                    </div>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="getMemoryUsagePercent()"
                      [class]="getMemoryUsagePercent() > 80 ? 'progress-danger' : getMemoryUsagePercent() > 60 ? 'progress-warning' : 'progress-success'">
                    </mat-progress-bar>
                    <div class="resource-details">
                      <span>{{ (systemMetrics?.memoryUsed || 0) / 1024 / 1024 | number:'1.0-0' }} MB / {{ (systemMetrics?.memoryMax || 0) / 1024 / 1024 | number:'1.0-0' }} MB</span>
                    </div>
                  </div>

                  <div class="resource-item">
                    <div class="resource-header">
                      <span class="resource-label">Charge Système</span>
                      <span class="resource-value">{{ systemHealth?.details?.systemLoad | number:'1.2-2' }}</span>
                    </div>
                    <mat-progress-bar 
                      mode="determinate" 
                      [value]="getSystemLoadPercent()"
                      [class]="getSystemLoadPercent() > 80 ? 'progress-danger' : getSystemLoadPercent() > 60 ? 'progress-warning' : 'progress-success'">
                    </mat-progress-bar>
                    <div class="resource-details">
                      <span>{{ systemMetrics?.processorCount || 0 }} processeurs disponibles</span>
                    </div>
                  </div>

                </div>
              </mat-card-content>
            </mat-card>

          </div>
        </mat-tab>

        <!-- Performance Tab -->
        <mat-tab label="Performance">
          <div class="tab-content">
            
            <mat-card class="performance-card">
              <mat-card-header>
                <mat-card-title>Métriques de Performance</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <div class="performance-table">
                  <table mat-table [dataSource]="performanceData" class="performance-metrics-table">
                    
                    <ng-container matColumnDef="operation">
                      <th mat-header-cell *matHeaderCellDef>Opération</th>
                      <td mat-cell *matCellDef="let metric">{{ metric.operation }}</td>
                    </ng-container>

                    <ng-container matColumnDef="avgTime">
                      <th mat-header-cell *matHeaderCellDef>Temps Moyen</th>
                      <td mat-cell *matCellDef="let metric">
                        <span [class]="getPerformanceClass(metric.avgTime)">
                          {{ metric.avgTime | number:'1.0-0' }}ms
                        </span>
                      </td>
                    </ng-container>

                    <ng-container matColumnDef="count">
                      <th mat-header-cell *matHeaderCellDef>Nombre d'opérations</th>
                      <td mat-cell *matCellDef="let metric">{{ metric.count | number }}</td>
                    </ng-container>

                    <ng-container matColumnDef="status">
                      <th mat-header-cell *matHeaderCellDef>Statut</th>
                      <td mat-cell *matCellDef="let metric">
                        <mat-chip [class]="getStatusChipClass(metric.avgTime)">
                          {{ getStatusText(metric.avgTime) }}
                        </mat-chip>
                      </td>
                    </ng-container>

                    <tr mat-header-row *matHeaderRowDef="performanceColumns"></tr>
                    <tr mat-row *matRowDef="let row; columns: performanceColumns;"></tr>
                  </table>
                </div>
              </mat-card-content>
            </mat-card>

          </div>
        </mat-tab>

        <!-- Logs Tab -->
        <mat-tab label="Journaux">
          <div class="tab-content">
            <mat-card class="logs-card">
              <mat-card-header>
                <mat-card-title>Journaux Système</mat-card-title>
                <div class="card-actions">
                  <button mat-button (click)="clearLogs()">
                    <mat-icon>clear_all</mat-icon>
                    Effacer
                  </button>
                </div>
              </mat-card-header>
              <mat-card-content>
                <div class="logs-container">
                  <div *ngFor="let log of systemLogs" class="log-entry" [class]="'log-' + log.level">
                    <span class="log-timestamp">{{ log.timestamp | date:'HH:mm:ss' }}</span>
                    <span class="log-level">{{ log.level }}</span>
                    <span class="log-component">{{ log.component }}</span>
                    <span class="log-message">{{ log.message }}</span>
                  </div>
                </div>
              </mat-card-content>
            </mat-card>
          </div>
        </mat-tab>

      </mat-tab-group>

    </div>
  `,
  styleUrl: "./system-monitoring.component.scss"
})
export class SystemMonitoringComponent implements OnInit, OnDestroy {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api/admin/monitoring`
  
  // Data
  systemHealth: SystemHealth | null = null
  systemMetrics: SystemMetrics | null = null
  performanceReport: PerformanceReport | null = null
  
  // UI Data
  orderTrend = 5.2
  paymentTrend = 8.1
  databaseLatency = 45
  databaseConnections = 23
  paymentSuccessRate = 99.7
  averagePaymentTime = 1250
  emailsSent = 1543
  emailDeliveryRate = 98.9
  
  performanceData: any[] = []
  performanceColumns = ['operation', 'avgTime', 'count', 'status']
  
  systemLogs: any[] = [
    { timestamp: new Date(), level: 'INFO', component: 'OrderService', message: 'Order ORD-1234567890 created successfully' },
    { timestamp: new Date(), level: 'WARN', component: 'PaymentService', message: 'Payment processing took longer than expected: 5.2s' },
    { timestamp: new Date(), level: 'INFO', component: 'EmailService', message: 'Order confirmation email sent to user@example.com' },
    { timestamp: new Date(), level: 'ERROR', component: 'SupplierAPI', message: 'Failed to sync stock from supplier API: timeout' },
  ]

  // Subscriptions
  private refreshSubscription?: Subscription

  ngOnInit(): void {
    this.loadData()
    this.startAutoRefresh()
  }

  ngOnDestroy(): void {
    this.refreshSubscription?.unsubscribe()
  }

  loadData(): void {
    // Load system health
    this.http.get<SystemHealth>(`${this.apiUrl}/health`).subscribe({
      next: (health) => {
        this.systemHealth = health
      },
      error: (error) => {
        console.error('Failed to load system health:', error)
      }
    })

    // Load system metrics
    this.http.get<SystemMetrics>(`${this.apiUrl}/metrics`).subscribe({
      next: (metrics) => {
        this.systemMetrics = metrics
      },
      error: (error) => {
        console.error('Failed to load system metrics:', error)
      }
    })

    // Load performance report
    this.http.get<PerformanceReport>(`${this.apiUrl}/performance`).subscribe({
      next: (report) => {
        this.performanceReport = report
        this.updatePerformanceData(report)
      },
      error: (error) => {
        console.error('Failed to load performance report:', error)
      }
    })
  }

  refreshData(): void {
    this.loadData()
  }

  startAutoRefresh(): void {
    // Refresh every 30 seconds
    this.refreshSubscription = interval(30000).subscribe(() => {
      this.loadData()
    })
  }

  clearLogs(): void {
    this.systemLogs = []
  }

  // Helper methods
  getMemoryUsagePercent(): number {
    if (!this.systemMetrics) return 0
    return (this.systemMetrics.memoryUsed / this.systemMetrics.memoryMax) * 100
  }

  getSystemLoadPercent(): number {
    if (!this.systemHealth || !this.systemMetrics) return 0
    return (this.systemHealth.details.systemLoad / this.systemMetrics.processorCount) * 100
  }

  updatePerformanceData(report: PerformanceReport): void {
    this.performanceData = [
      {
        operation: 'Création de commande',
        avgTime: report.order_creation_avg_time || 0,
        count: report.order_creation_count || 0
      },
      {
        operation: 'Traitement de paiement',
        avgTime: report.payment_processing_avg_time || 0,
        count: report.payment_processing_count || 0
      }
    ]
  }

  getPerformanceClass(avgTime: number): string {
    if (avgTime > 3000) return 'performance-slow'
    if (avgTime > 1000) return 'performance-medium'
    return 'performance-fast'
  }

  getStatusChipClass(avgTime: number): string {
    if (avgTime > 3000) return 'status-slow'
    if (avgTime > 1000) return 'status-medium'
    return 'status-fast'
  }

  getStatusText(avgTime: number): string {
    if (avgTime > 3000) return 'LENT'
    if (avgTime > 1000) return 'MOYEN'
    return 'RAPIDE'
  }
}
