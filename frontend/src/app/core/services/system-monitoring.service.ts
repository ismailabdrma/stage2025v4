import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { environment } from "@environments/environment"

export interface SystemHealth {
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

export interface SystemMetrics {
  memoryUsed: number
  memoryTotal: number
  memoryMax: number
  processorCount: number
  systemLoad: number
  timestamp: string
}

export interface PerformanceReport {
  order_creation_avg_time: number
  order_creation_count: number
  payment_processing_avg_time: number
  payment_processing_count: number
  total_orders: number
  total_payments: number
  active_users: number
  error_rate: number
}

export interface RealTimeStats {
  totalOrders: number
  totalPayments: number
  activeUsers: number
  errorCount: number
}

@Injectable({
  providedIn: "root"
})
export class SystemMonitoringService {
  private http = inject(HttpClient)
  private readonly apiUrl = `${environment.apiUrl}/api/admin/monitoring`

  /**
   * Get system health status
   */
  getSystemHealth(): Observable<SystemHealth> {
    return this.http.get<SystemHealth>(`${this.apiUrl}/health`).pipe(
      catchError(error => {
        console.error('Failed to fetch system health:', error)
        return this.getDefaultHealth()
      })
    )
  }

  /**
   * Get system metrics
   */
  getSystemMetrics(): Observable<SystemMetrics> {
    return this.http.get<SystemMetrics>(`${this.apiUrl}/metrics`).pipe(
      catchError(error => {
        console.error('Failed to fetch system metrics:', error)
        return this.getDefaultMetrics()
      })
    )
  }

  /**
   * Get performance report
   */
  getPerformanceReport(): Observable<PerformanceReport> {
    return this.http.get<PerformanceReport>(`${this.apiUrl}/performance`).pipe(
      catchError(error => {
        console.error('Failed to fetch performance report:', error)
        return this.getDefaultPerformanceReport()
      })
    )
  }

  /**
   * Get operation timings
   */
  getOperationTimings(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/operations`).pipe(
      catchError(error => {
        console.error('Failed to fetch operation timings:', error)
        return new Observable(observer => observer.next({}))
      })
    )
  }

  /**
   * Get operation counts
   */
  getOperationCounts(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/operations/counts`).pipe(
      catchError(error => {
        console.error('Failed to fetch operation counts:', error)
        return new Observable(observer => observer.next({}))
      })
    )
  }

  /**
   * Get real-time statistics
   */
  getRealTimeStats(): Observable<RealTimeStats> {
    return this.http.get<RealTimeStats>(`${this.apiUrl}/stats`).pipe(
      catchError(error => {
        console.error('Failed to fetch real-time stats:', error)
        return this.getDefaultStats()
      })
    )
  }

  /**
   * Record a manual event
   */
  recordEvent(event: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/record/${event}`, {}).pipe(
      catchError(error => {
        console.error(`Failed to record event ${event}:`, error)
        return new Observable(observer => observer.next(`Failed to record ${event}`))
      })
    )
  }

  /**
   * Reset monitoring counters
   */
  resetCounters(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reset`, {}).pipe(
      catchError(error => {
        console.error('Failed to reset counters:', error)
        return new Observable(observer => observer.next('Failed to reset counters'))
      })
    )
  }

  /**
   * Get average operation time for specific operation
   */
  getAverageOperationTime(operation: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/operations/${operation}/average`).pipe(
      catchError(error => {
        console.error(`Failed to fetch average time for ${operation}:`, error)
        return new Observable(observer => observer.next(0))
      })
    )
  }

  /**
   * Trigger manual health check
   */
  triggerHealthCheck(): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/health/check`, {}).pipe(
      catchError(error => {
        console.error('Failed to trigger health check:', error)
        return new Observable(observer => observer.next('Health check failed'))
      })
    )
  }

  // Default/fallback data methods

  private getDefaultHealth(): Observable<SystemHealth> {
    return new Observable(observer => {
      observer.next({
        status: 'DOWN',
        details: {
          totalOrders: 0,
          totalPayments: 0,
          activeUsers: 0,
          errorCount: 999,
          systemLoad: 0,
          databaseHealth: false,
          paymentSystemHealth: false,
          emailSystemHealth: false,
          lastHealthCheck: new Date().toISOString()
        }
      })
    })
  }

  private getDefaultMetrics(): Observable<SystemMetrics> {
    return new Observable(observer => {
      observer.next({
        memoryUsed: 0,
        memoryTotal: 0,
        memoryMax: 0,
        processorCount: 0,
        systemLoad: 0,
        timestamp: new Date().toISOString()
      })
    })
  }

  private getDefaultPerformanceReport(): Observable<PerformanceReport> {
    return new Observable(observer => {
      observer.next({
        order_creation_avg_time: 0,
        order_creation_count: 0,
        payment_processing_avg_time: 0,
        payment_processing_count: 0,
        total_orders: 0,
        total_payments: 0,
        active_users: 0,
        error_rate: 1.0
      })
    })
  }

  private getDefaultStats(): Observable<RealTimeStats> {
    return new Observable(observer => {
      observer.next({
        totalOrders: 0,
        totalPayments: 0,
        activeUsers: 0,
        errorCount: 999
      })
    })
  }

  /**
   * Check if the monitoring system is available
   */
  isMonitoringAvailable(): Observable<boolean> {
    return this.http.get(`${this.apiUrl}/health`).pipe(
      map(() => true),
      catchError(() => new Observable(observer => observer.next(false)))
    )
  }

  /**
   * Get a comprehensive dashboard summary
   */
  getDashboardSummary(): Observable<{
    health: SystemHealth,
    metrics: SystemMetrics,
    performance: PerformanceReport,
    stats: RealTimeStats
  }> {
    return new Observable(observer => {
      // Fetch all data in parallel
      Promise.all([
        this.getSystemHealth().toPromise(),
        this.getSystemMetrics().toPromise(),
        this.getPerformanceReport().toPromise(),
        this.getRealTimeStats().toPromise()
      ]).then(([health, metrics, performance, stats]) => {
        observer.next({
          health: health!,
          metrics: metrics!,
          performance: performance!,
          stats: stats!
        })
        observer.complete()
      }).catch(error => {
        console.error('Failed to fetch dashboard summary:', error)
        observer.error(error)
      })
    })
  }
}
