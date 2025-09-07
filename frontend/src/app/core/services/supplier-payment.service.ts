import { Injectable, inject } from "@angular/core"
import { HttpClient, HttpParams } from "@angular/common/http"
import { Observable, BehaviorSubject } from "rxjs"
import { environment } from "@environments/environment"

export interface SupplierPayment {
  id: number
  supplierId: number
  supplierName: string
  supplierEmail: string
  totalAmount: number
  ourPrice: number
  supplierPrice: number
  commissionAmount: number
  commissionPercentage: number
  status: 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED' | 'CANCELLED'
  paymentType: 'IMMEDIATE' | 'DAILY' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY' | 'CUSTOM'
  createdDate: string
  scheduledDate: string
  processedDate?: string
  confirmedDate?: string
  paymentReference: string
  batchId?: string
  periodStart?: string
  periodEnd?: string
  description: string
  processingNotes?: string
  processedByAdminId?: number
  processedByAdminName?: string
  supplierHandlesPayment: boolean
  isCommissionPayment: boolean
  notificationSent: boolean
  totalOrders: number
  totalItems: number
  paymentItems: SupplierPaymentItem[]
}

export interface SupplierPaymentItem {
  id: number
  orderId: number
  orderItemId: number
  productName: string
  productExternalId: string
  quantity: number
  customerPaidPrice: number
  supplierPrice: number
  commissionPerUnit: number
  totalCustomerAmount: number
  totalSupplierAmount: number
  totalCommissionAmount: number
  orderDate: string
  addedToPaymentDate: string
}

export interface SupplierPaymentSummary {
  supplierId: number
  supplierName: string
  supplierEmail: string
  totalPendingAmount: number
  totalPaidAmount: number
  totalCommissionEarned: number
  pendingPaymentsCount: number
  paidPaymentsCount: number
  failedPaymentsCount: number
  totalOrdersCount: number
  oldestPendingDate?: string
  lastPaymentDate?: string
  nextScheduledPayment?: string
  averagePaymentAmount: number
  averageCommissionRate: number
  hasOverduePayments: boolean
  hasFailedPayments: boolean
  requiresAttention: boolean
}

export interface PaymentDashboard {
  pendingPayments: SupplierPayment[]
  summary: SupplierPaymentSummary
  pendingCount: number
  totalPendingAmount: number
  totalCommissionEarned: number
  overduePayments: SupplierPayment[]
  recentPayments: SupplierPayment[]
  paymentsByStatus: { [key: string]: number }
  paymentTrends: { date: string; amount: number; count: number }[]
}

@Injectable({
  providedIn: "root",
})
export class SupplierPaymentService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api/admin/supplier-payments`

  // Real-time updates
  private dashboardSubject = new BehaviorSubject<PaymentDashboard | null>(null)
  public dashboard$ = this.dashboardSubject.asObservable()

  // Dashboard
  getDashboard(): Observable<PaymentDashboard> {
    return this.http.get<PaymentDashboard>(`${this.apiUrl}/dashboard`)
  }

  // Payments
  getAllPayments(filters?: {
    supplierId?: number
    status?: string
    startDate?: string
    endDate?: string
    page?: number
    size?: number
  }): Observable<SupplierPayment[]> {
    let params = new HttpParams()
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = (filters as any)[key]
        if (value !== undefined && value !== null) {
          params = params.append(key, value.toString())
        }
      })
    }
    return this.http.get<SupplierPayment[]>(this.apiUrl, { params })
  }

  getPayment(paymentId: number): Observable<SupplierPayment> {
    return this.http.get<SupplierPayment>(`${this.apiUrl}/${paymentId}`)
  }

  // Payment actions
  processPayment(paymentData: any): Observable<SupplierPayment> {
    return this.http.post<SupplierPayment>(`${this.apiUrl}/${paymentData.paymentId}/process`, paymentData)
  }

  confirmPayment(paymentId: number): Observable<SupplierPayment> {
    return this.http.post<SupplierPayment>(`${this.apiUrl}/${paymentId}/confirm`, {})
  }

  updatePaymentStatus(paymentId: number, status: string, notes?: string): Observable<SupplierPayment> {
    return this.http.put<SupplierPayment>(`${this.apiUrl}/${paymentId}/status`, {
      status,
      notes
    })
  }

  cancelPayment(paymentId: number, reason: string): Observable<SupplierPayment> {
    return this.http.post<SupplierPayment>(`${this.apiUrl}/${paymentId}/cancel`, {
      reason
    })
  }

  // Batch operations
  processScheduledPayments(): Observable<SupplierPayment[]> {
    return this.http.post<SupplierPayment[]>(`${this.apiUrl}/process-scheduled`, {})
  }

  createWeeklyPayments(): Observable<SupplierPayment[]> {
    return this.http.post<SupplierPayment[]>(`${this.apiUrl}/batch/weekly`, {})
  }

  createMonthlyPayments(): Observable<SupplierPayment[]> {
    return this.http.post<SupplierPayment[]>(`${this.apiUrl}/batch/monthly`, {})
  }

  // Supplier summaries
  getSupplierSummary(supplierId: number): Observable<SupplierPaymentSummary> {
    return this.http.get<SupplierPaymentSummary>(`${this.apiUrl}/suppliers/${supplierId}/summary`)
  }

  getAllSupplierSummaries(): Observable<SupplierPaymentSummary[]> {
    return this.http.get<SupplierPaymentSummary[]>(`${this.apiUrl}/suppliers/summaries`)
  }

  // Statistics
  getPaymentStatistics(filters?: {
    startDate?: string
    endDate?: string
  }): Observable<any> {
    let params = new HttpParams()
    if (filters) {
      Object.keys(filters).forEach(key => {
        const value = (filters as any)[key]
        if (value !== undefined && value !== null) {
          params = params.append(key, value.toString())
        }
      })
    }
    return this.http.get<any>(`${this.apiUrl}/statistics`, { params })
  }

  // Payment history and audit
  getPaymentHistory(paymentId: number): Observable<SupplierPayment[]> {
    return this.http.get<SupplierPayment[]>(`${this.apiUrl}/${paymentId}/history`)
  }

  // Real-time dashboard updates
  refreshDashboard(): void {
    this.getDashboard().subscribe(dashboard => {
      this.dashboardSubject.next(dashboard)
    })
  }

  // Helper methods
  getStatusColor(status: string): string {
    switch (status) {
      case 'PENDING': return 'warning'
      case 'PROCESSING': return 'info'
      case 'PAID': return 'success'
      case 'FAILED': return 'danger'
      case 'CANCELLED': return 'secondary'
      default: return 'light'
    }
  }

  getPaymentTypeLabel(type: string): string {
    switch (type) {
      case 'IMMEDIATE': return 'Immédiat'
      case 'DAILY': return 'Quotidien'
      case 'WEEKLY': return 'Hebdomadaire'
      case 'BI_WEEKLY': return 'Bi-mensuel'
      case 'MONTHLY': return 'Mensuel'
      case 'CUSTOM': return 'Personnalisé'
      default: return type
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'PENDING': return 'En attente'
      case 'PROCESSING': return 'En cours'
      case 'PAID': return 'Payé'
      case 'FAILED': return 'Échoué'
      case 'CANCELLED': return 'Annulé'
      default: return status
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  formatDate(date: string): string {
    return new Intl.DateTimeFormat('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }
}