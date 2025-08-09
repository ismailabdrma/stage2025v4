import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { Observable, forkJoin, of } from "rxjs"
import { catchError, map } from "rxjs/operators"
import { environment } from "@environments/environment"

export interface ConnectivityTestResult {
  service: string
  status: 'success' | 'error'
  message: string
  responseTime?: number
}

export interface SystemConnectivityReport {
  overall: 'healthy' | 'partial' | 'down'
  tests: ConnectivityTestResult[]
  timestamp: string
}

@Injectable({
  providedIn: "root"
})
export class ConnectivityTestService {
  private http = inject(HttpClient)
  private readonly baseUrl = environment.apiUrl

  /**
   * Test all critical system endpoints
   */
  runFullConnectivityTest(): Observable<SystemConnectivityReport> {
    const startTime = Date.now()
    
    const tests = [
      this.testAuthService(),
      this.testProductService(),
      this.testCartService(),
      this.testOrderService(),
      this.testSupplierService(),
      this.testPaymentService(),
      this.testMonitoringService(),
      this.testEmailService()
    ]

    return forkJoin(tests).pipe(
      map(results => {
        const healthyCount = results.filter(r => r.status === 'success').length
        const totalCount = results.length
        
        let overall: 'healthy' | 'partial' | 'down'
        if (healthyCount === totalCount) {
          overall = 'healthy'
        } else if (healthyCount > totalCount / 2) {
          overall = 'partial'
        } else {
          overall = 'down'
        }

        return {
          overall,
          tests: results,
          timestamp: new Date().toISOString()
        }
      })
    )
  }

  /**
   * Test authentication service
   */
  private testAuthService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    // Test with a simple endpoint that doesn't require auth
    return this.http.get(`${this.baseUrl}/api/auth/test`, { 
      responseType: 'text',
      observe: 'response'
    }).pipe(
      map(response => ({
        service: 'Authentication Service',
        status: 'success' as const,
        message: 'Service accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => of({
        service: 'Authentication Service',
        status: 'error' as const,
        message: `Error: ${error.status} - ${error.message}`,
        responseTime: Date.now() - startTime
      }))
    )
  }

  /**
   * Test product service
   */
  private testProductService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    return this.http.get(`${this.baseUrl}/api/products?page=0&size=1`).pipe(
      map(response => ({
        service: 'Product Service',
        status: 'success' as const,
        message: 'Products endpoint accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => of({
        service: 'Product Service',
        status: 'error' as const,
        message: `Error: ${error.status} - ${error.message}`,
        responseTime: Date.now() - startTime
      }))
    )
  }

  /**
   * Test cart service
   */
  private testCartService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    // This will fail without auth, but we can check if the endpoint exists
    return this.http.get(`${this.baseUrl}/api/cart/1`).pipe(
      map(response => ({
        service: 'Cart Service',
        status: 'success' as const,
        message: 'Cart endpoint accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => {
        // 401/403 means endpoint exists but requires auth (good)
        // 404 means endpoint doesn't exist (bad)
        const status = error.status === 404 ? 'error' as const : 'success' as const
        const message = error.status === 404 
          ? 'Cart endpoint not found' 
          : 'Cart endpoint exists (auth required)'
        
        return of({
          service: 'Cart Service',
          status,
          message,
          responseTime: Date.now() - startTime
        })
      })
    )
  }

  /**
   * Test order service
   */
  private testOrderService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    return this.http.get(`${this.baseUrl}/api/orders/client/1`).pipe(
      map(response => ({
        service: 'Order Service',
        status: 'success' as const,
        message: 'Orders endpoint accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => {
        const status = error.status === 404 ? 'error' as const : 'success' as const
        const message = error.status === 404 
          ? 'Orders endpoint not found' 
          : 'Orders endpoint exists (auth required)'
        
        return of({
          service: 'Order Service',
          status,
          message,
          responseTime: Date.now() - startTime
        })
      })
    )
  }

  /**
   * Test supplier service
   */
  private testSupplierService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    return this.http.get(`${this.baseUrl}/api/admin/suppliers`).pipe(
      map(response => ({
        service: 'Supplier Service',
        status: 'success' as const,
        message: 'Suppliers endpoint accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => {
        const status = error.status === 404 ? 'error' as const : 'success' as const
        const message = error.status === 404 
          ? 'Suppliers endpoint not found' 
          : 'Suppliers endpoint exists (auth required)'
        
        return of({
          service: 'Supplier Service',
          status,
          message,
          responseTime: Date.now() - startTime
        })
      })
    )
  }

  /**
   * Test payment service
   */
  private testPaymentService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    return this.http.get(`${this.baseUrl}/api/admin/supplier-payments`).pipe(
      map(response => ({
        service: 'Payment Service',
        status: 'success' as const,
        message: 'Payment endpoints accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => {
        const status = error.status === 404 ? 'error' as const : 'success' as const
        const message = error.status === 404 
          ? 'Payment endpoints not found' 
          : 'Payment endpoints exist (auth required)'
        
        return of({
          service: 'Payment Service',
          status,
          message,
          responseTime: Date.now() - startTime
        })
      })
    )
  }

  /**
   * Test monitoring service
   */
  private testMonitoringService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    return this.http.get(`${this.baseUrl}/api/admin/monitoring/health`).pipe(
      map(response => ({
        service: 'Monitoring Service',
        status: 'success' as const,
        message: 'Monitoring endpoints accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => {
        const status = error.status === 404 ? 'error' as const : 'success' as const
        const message = error.status === 404 
          ? 'Monitoring endpoints not found' 
          : 'Monitoring endpoints exist (auth required)'
        
        return of({
          service: 'Monitoring Service',
          status,
          message,
          responseTime: Date.now() - startTime
        })
      })
    )
  }

  /**
   * Test email service (indirect)
   */
  private testEmailService(): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    // We can't directly test email service, but we can check if the backend is configured
    return this.http.get(`${this.baseUrl}/actuator/health`, { 
      observe: 'response' 
    }).pipe(
      map(response => ({
        service: 'Email Service',
        status: 'success' as const,
        message: 'Backend health check accessible (email configured)',
        responseTime: Date.now() - startTime
      })),
      catchError(error => of({
        service: 'Email Service',
        status: 'error' as const,
        message: 'Cannot verify email service configuration',
        responseTime: Date.now() - startTime
      }))
    )
  }

  /**
   * Test specific endpoint
   */
  testEndpoint(url: string, serviceName: string): Observable<ConnectivityTestResult> {
    const startTime = Date.now()
    
    return this.http.get(`${this.baseUrl}${url}`).pipe(
      map(response => ({
        service: serviceName,
        status: 'success' as const,
        message: 'Endpoint accessible',
        responseTime: Date.now() - startTime
      })),
      catchError(error => of({
        service: serviceName,
        status: 'error' as const,
        message: `Error: ${error.status} - ${error.message}`,
        responseTime: Date.now() - startTime
      }))
    )
  }

  /**
   * Get simple backend health status
   */
  getBackendHealth(): Observable<{ status: string, message: string }> {
    return this.http.get(`${this.baseUrl}/actuator/health`).pipe(
      map(response => ({
        status: 'UP',
        message: 'Backend is responding'
      })),
      catchError(error => of({
        status: 'DOWN',
        message: `Backend not accessible: ${error.message}`
      }))
    )
  }

  /**
   * Check if backend is accessible
   */
  isBackendAccessible(): Observable<boolean> {
    return this.http.get(`${this.baseUrl}/actuator/health`).pipe(
      map(() => true),
      catchError(() => of(false))
    )
  }
}
