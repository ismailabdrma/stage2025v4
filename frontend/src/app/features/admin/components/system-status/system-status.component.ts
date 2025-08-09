import { Component, OnInit, inject, ChangeDetectionStrategy } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatChipsModule } from "@angular/material/chips"
import { MatTableModule } from "@angular/material/table"
import { ConnectivityTestService, SystemConnectivityReport, ConnectivityTestResult } from "@core/services/connectivity-test.service"

@Component({
  selector: "app-system-status",
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTableModule,
  ],
  template: `
    <div class="system-status-container">
      
      <mat-card class="status-header">
        <mat-card-header>
          <mat-card-title>État de Connectivité du Système</mat-card-title>
          <mat-card-subtitle>Vérification de tous les services backend</mat-card-subtitle>
        </mat-card-header>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="runTest()" [disabled]="isLoading">
            <mat-icon>refresh</mat-icon>
            {{ isLoading ? 'Test en cours...' : 'Exécuter Tests' }}
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Loading Spinner -->
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="50"></mat-spinner>
        <p>Test de connectivité en cours...</p>
      </div>

      <!-- Test Results -->
      <div *ngIf="testReport && !isLoading" class="test-results">
        
        <!-- Overall Status -->
        <mat-card class="overall-status">
          <mat-card-content>
            <div class="status-content">
              <div class="status-info">
                <h2>État Général</h2>
                <mat-chip [class]="getOverallStatusClass(testReport.overall)">
                  <mat-icon>{{ getOverallStatusIcon(testReport.overall) }}</mat-icon>
                  {{ getOverallStatusText(testReport.overall) }}
                </mat-chip>
                <p class="timestamp">Dernière vérification: {{ testReport.timestamp | date:'medium' }}</p>
              </div>
              <div class="status-summary">
                <div class="summary-item">
                  <span class="summary-value">{{ getSuccessCount() }}</span>
                  <span class="summary-label">Services OK</span>
                </div>
                <div class="summary-item">
                  <span class="summary-value">{{ getErrorCount() }}</span>
                  <span class="summary-label">Erreurs</span>
                </div>
                <div class="summary-item">
                  <span class="summary-value">{{ getAverageResponseTime() }}ms</span>
                  <span class="summary-label">Temps Moyen</span>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Service Details -->
        <mat-card class="service-details">
          <mat-card-header>
            <mat-card-title>Détails des Services</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="services-table">
              <table mat-table [dataSource]="testReport.tests" class="connectivity-table">
                
                <ng-container matColumnDef="service">
                  <th mat-header-cell *matHeaderCellDef>Service</th>
                  <td mat-cell *matCellDef="let test">{{ test.service }}</td>
                </ng-container>

                <ng-container matColumnDef="status">
                  <th mat-header-cell *matHeaderCellDef>Statut</th>
                  <td mat-cell *matCellDef="let test">
                    <mat-chip [class]="getServiceStatusClass(test.status)">
                      <mat-icon>{{ getServiceStatusIcon(test.status) }}</mat-icon>
                      {{ test.status === 'success' ? 'OK' : 'ERREUR' }}
                    </mat-chip>
                  </td>
                </ng-container>

                <ng-container matColumnDef="message">
                  <th mat-header-cell *matHeaderCellDef>Message</th>
                  <td mat-cell *matCellDef="let test">{{ test.message }}</td>
                </ng-container>

                <ng-container matColumnDef="responseTime">
                  <th mat-header-cell *matHeaderCellDef>Temps de Réponse</th>
                  <td mat-cell *matCellDef="let test">
                    <span [class]="getResponseTimeClass(test.responseTime || 0)">
                      {{ test.responseTime || 0 }}ms
                    </span>
                  </td>
                </ng-container>

                <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
              </table>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Recommendations -->
        <mat-card *ngIf="getErrorCount() > 0" class="recommendations">
          <mat-card-header>
            <mat-card-title>
              <mat-icon color="warn">warning</mat-icon>
              Recommandations
            </mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="recommendations-list">
              <div *ngFor="let recommendation of getRecommendations()" class="recommendation-item">
                <mat-icon>{{ recommendation.icon }}</mat-icon>
                <div>
                  <h4>{{ recommendation.title }}</h4>
                  <p>{{ recommendation.description }}</p>
                </div>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

      </div>

      <!-- Error State -->
      <mat-card *ngIf="error && !isLoading" class="error-state">
        <mat-card-content>
          <div class="error-content">
            <mat-icon color="warn">error</mat-icon>
            <h3>Erreur lors du test de connectivité</h3>
            <p>{{ error }}</p>
            <button mat-raised-button color="primary" (click)="runTest()">
              Réessayer
            </button>
          </div>
        </mat-card-content>
      </mat-card>

    </div>
  `,
  styleUrl: "./system-status.component.scss"
})
export class SystemStatusComponent implements OnInit {
  private connectivityService = inject(ConnectivityTestService)
  
  isLoading = false
  testReport: SystemConnectivityReport | null = null
  error: string | null = null
  displayedColumns = ['service', 'status', 'message', 'responseTime']

  ngOnInit(): void {
    this.runTest()
  }

  runTest(): void {
    this.isLoading = true
    this.error = null
    
    this.connectivityService.runFullConnectivityTest().subscribe({
      next: (report) => {
        this.testReport = report
        this.isLoading = false
        console.log('Connectivity test completed:', report)
      },
      error: (error) => {
        this.error = 'Impossible d\'exécuter le test de connectivité: ' + error.message
        this.isLoading = false
        console.error('Connectivity test failed:', error)
      }
    })
  }

  // Status helper methods
  getOverallStatusClass(status: string): string {
    switch (status) {
      case 'healthy': return 'status-healthy'
      case 'partial': return 'status-warning'
      case 'down': return 'status-error'
      default: return 'status-unknown'
    }
  }

  getOverallStatusIcon(status: string): string {
    switch (status) {
      case 'healthy': return 'check_circle'
      case 'partial': return 'warning'
      case 'down': return 'error'
      default: return 'help'
    }
  }

  getOverallStatusText(status: string): string {
    switch (status) {
      case 'healthy': return 'SYSTÈME OPÉRATIONNEL'
      case 'partial': return 'FONCTIONNEMENT PARTIEL'
      case 'down': return 'SYSTÈME INDISPONIBLE'
      default: return 'STATUT INCONNU'
    }
  }

  getServiceStatusClass(status: string): string {
    return status === 'success' ? 'service-success' : 'service-error'
  }

  getServiceStatusIcon(status: string): string {
    return status === 'success' ? 'check_circle' : 'error'
  }

  getResponseTimeClass(responseTime: number): string {
    if (responseTime < 500) return 'response-fast'
    if (responseTime < 2000) return 'response-medium'
    return 'response-slow'
  }

  // Summary methods
  getSuccessCount(): number {
    return this.testReport?.tests.filter(t => t.status === 'success').length || 0
  }

  getErrorCount(): number {
    return this.testReport?.tests.filter(t => t.status === 'error').length || 0
  }

  getAverageResponseTime(): number {
    if (!this.testReport?.tests.length) return 0
    
    const validTimes = this.testReport.tests
      .filter(t => t.responseTime !== undefined)
      .map(t => t.responseTime!)
    
    if (!validTimes.length) return 0
    
    return Math.round(validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length)
  }

  // Recommendations
  getRecommendations(): Array<{icon: string, title: string, description: string}> {
    const recommendations: Array<{icon: string, title: string, description: string}> = []
    
    if (!this.testReport) return recommendations
    
    const failedServices = this.testReport.tests.filter(t => t.status === 'error')
    
    for (const service of failedServices) {
      switch (service.service) {
        case 'Authentication Service':
          recommendations.push({
            icon: 'security',
            title: 'Service d\'authentification indisponible',
            description: 'Vérifiez que le serveur backend est démarré et que les endpoints d\'authentification sont configurés.'
          })
          break
        case 'Product Service':
          recommendations.push({
            icon: 'inventory',
            title: 'Service de produits indisponible',
            description: 'Vérifiez la configuration de la base de données et les endpoints de produits.'
          })
          break
        case 'Cart Service':
          recommendations.push({
            icon: 'shopping_cart',
            title: 'Service de panier indisponible',
            description: 'Vérifiez les endpoints du panier et l\'authentification requise.'
          })
          break
        case 'Order Service':
          recommendations.push({
            icon: 'receipt',
            title: 'Service de commandes indisponible',
            description: 'Vérifiez les endpoints de commandes et la configuration de la base de données.'
          })
          break
        case 'Payment Service':
          recommendations.push({
            icon: 'payment',
            title: 'Service de paiement indisponible',
            description: 'Vérifiez la configuration Stripe et les endpoints de paiement.'
          })
          break
        case 'Monitoring Service':
          recommendations.push({
            icon: 'monitoring',
            title: 'Service de surveillance indisponible',
            description: 'Vérifiez la configuration Spring Actuator et les endpoints de monitoring.'
          })
          break
      }
    }
    
    if (recommendations.length === 0 && this.testReport.overall !== 'healthy') {
      recommendations.push({
        icon: 'info',
        title: 'Problèmes de performance détectés',
        description: 'Certains services répondent mais avec des temps de réponse élevés. Vérifiez les performances du serveur.'
      })
    }
    
    return recommendations
  }
}
