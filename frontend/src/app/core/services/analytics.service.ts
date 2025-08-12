import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable, of, catchError } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface AnalyticsEvent {
  type: string
  category: string
  action: string
  label?: string
  value?: number
  metadata?: Record<string, any>
  timestamp: string
  sessionId: string
  userId?: string
  productId?: number
  orderId?: number
}

export interface EcommerceEvent {
  event_type: 'view_item' | 'add_to_cart' | 'remove_from_cart' | 'begin_checkout' | 'purchase' | 'add_to_wishlist'
  product_id?: number
  product_name?: string
  category?: string
  brand?: string
  variant?: string
  price?: number
  quantity?: number
  currency?: string
  order_id?: string
  order_value?: number
  items?: Array<{
    product_id: number
    product_name: string
    category?: string
    brand?: string
    variant?: string
    price: number
    quantity: number
  }>
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api/analytics`
  private sessionId: string
  private userId?: string

  constructor() {
    this.sessionId = this.generateSessionId()
    this.initializeAnalytics()
  }

  private generateSessionId(): string {
    return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now()
  }

  private initializeAnalytics() {
    // Track session start
    this.trackEvent({
      type: 'session',
      category: 'engagement',
      action: 'session_start',
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      metadata: {
        userAgent: navigator.userAgent,
        screenResolution: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer
      }
    })

    // Track page visibility changes
    document.addEventListener('visibilitychange', () => {
      this.trackEvent({
        type: 'engagement',
        category: 'page',
        action: document.hidden ? 'page_hidden' : 'page_visible',
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId
      })
    })

    // Track page unload
    window.addEventListener('beforeunload', () => {
      this.trackEvent({
        type: 'session',
        category: 'engagement',
        action: 'session_end',
        timestamp: new Date().toISOString(),
        sessionId: this.sessionId
      })
    })
  }

  setUserId(userId: string) {
    this.userId = userId
  }

  clearUserId() {
    this.userId = undefined
  }

  // Generic event tracking
  trackEvent(event: Partial<AnalyticsEvent>): Observable<any> {
    const fullEvent: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      userId: this.userId,
      ...event,
      type: event.type || 'custom',
      category: event.category || 'general',
      action: event.action || 'unknown'
    }

    return this.http.post(`${this.apiUrl}/events`, fullEvent).pipe(
      catchError(error => {
        console.warn('Analytics tracking failed:', error)
        return of(null)
      })
    )
  }

  // E-commerce specific events
  trackEcommerceEvent(event: EcommerceEvent): Observable<any> {
    const analyticsEvent: Partial<AnalyticsEvent> = {
      type: 'ecommerce',
      category: 'shopping',
      action: event.event_type,
      productId: event.product_id,
      orderId: event.order_id ? Number(event.order_id) : undefined,
      value: event.price || event.order_value,
      metadata: {
        ...event,
        currency: event.currency || 'EUR'
      }
    }

    return this.trackEvent(analyticsEvent)
  }

  // Product view tracking
  trackProductView(product: {
    id: number
    name: string
    category?: string
    brand?: string
    price: number
    variant?: string
  }) {
    this.trackEcommerceEvent({
      event_type: 'view_item',
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      brand: product.brand,
      variant: product.variant,
      price: product.price,
      currency: 'EUR'
    }).subscribe()

    // Also track as page view
    this.trackPageView(`/products/${product.id}`, product.name).subscribe()
  }

  // Add to cart tracking
  trackAddToCart(product: {
    id: number
    name: string
    category?: string
    brand?: string
    variant?: string
    price: number
    quantity: number
  }) {
    this.trackEcommerceEvent({
      event_type: 'add_to_cart',
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      brand: product.brand,
      variant: product.variant,
      price: product.price,
      quantity: product.quantity,
      currency: 'EUR'
    }).subscribe()
  }

  // Remove from cart tracking
  trackRemoveFromCart(product: {
    id: number
    name: string
    price: number
    quantity: number
  }) {
    this.trackEcommerceEvent({
      event_type: 'remove_from_cart',
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: product.quantity,
      currency: 'EUR'
    }).subscribe()
  }

  // Begin checkout tracking
  trackBeginCheckout(items: Array<{
    product_id: number
    product_name: string
    category?: string
    brand?: string
    variant?: string
    price: number
    quantity: number
  }>, totalValue: number) {
    this.trackEcommerceEvent({
      event_type: 'begin_checkout',
      order_value: totalValue,
      currency: 'EUR',
      items: items
    }).subscribe()
  }

  // Purchase tracking
  trackPurchase(order: {
    orderId: string
    totalValue: number
    items: Array<{
      product_id: number
      product_name: string
      category?: string
      brand?: string
      variant?: string
      price: number
      quantity: number
    }>
  }) {
    this.trackEcommerceEvent({
      event_type: 'purchase',
      order_id: order.orderId,
      order_value: order.totalValue,
      currency: 'EUR',
      items: order.items
    }).subscribe()
  }

  // Add to wishlist tracking
  trackAddToWishlist(product: {
    id: number
    name: string
    category?: string
    brand?: string
    price: number
  }) {
    this.trackEcommerceEvent({
      event_type: 'add_to_wishlist',
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      currency: 'EUR'
    }).subscribe()
  }

  // Page view tracking
  trackPageView(path: string, title?: string): Observable<any> {
    return this.trackEvent({
      type: 'navigation',
      category: 'page',
      action: 'page_view',
      label: path,
      metadata: {
        path: path,
        title: title || document.title,
        url: window.location.href
      }
    })
  }

  // Search tracking
  trackSearch(query: string, resultsCount: number, filters?: Record<string, any>) {
    this.trackEvent({
      type: 'search',
      category: 'discovery',
      action: 'search',
      label: query,
      value: resultsCount,
      metadata: {
        query: query,
        resultsCount: resultsCount,
        filters: filters
      }
    }).subscribe()
  }

  // Click tracking
  trackClick(element: string, location: string, metadata?: Record<string, any>) {
    this.trackEvent({
      type: 'interaction',
      category: 'ui',
      action: 'click',
      label: element,
      metadata: {
        element: element,
        location: location,
        ...metadata
      }
    }).subscribe()
  }

  // Error tracking
  trackError(error: Error, context?: string) {
    this.trackEvent({
      type: 'error',
      category: 'technical',
      action: 'error',
      label: error.message,
      metadata: {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
        context: context,
        url: window.location.href
      }
    }).subscribe()
  }

  // Performance tracking
  trackPerformance(metric: string, value: number, unit: string = 'ms') {
    this.trackEvent({
      type: 'performance',
      category: 'technical',
      action: metric,
      value: value,
      metadata: {
        metric: metric,
        value: value,
        unit: unit,
        url: window.location.href
      }
    }).subscribe()
  }

  // Form interaction tracking
  trackFormInteraction(formName: string, action: 'start' | 'complete' | 'abandon', fieldName?: string) {
    this.trackEvent({
      type: 'form',
      category: 'interaction',
      action: `form_${action}`,
      label: formName,
      metadata: {
        formName: formName,
        fieldName: fieldName,
        action: action
      }
    }).subscribe()
  }

  // Social sharing tracking
  trackSocialShare(platform: string, content: string, url?: string) {
    this.trackEvent({
      type: 'social',
      category: 'sharing',
      action: 'share',
      label: platform,
      metadata: {
        platform: platform,
        content: content,
        url: url || window.location.href
      }
    }).subscribe()
  }

  // Newsletter subscription tracking
  trackNewsletterSubscription(email: string, source: string) {
    this.trackEvent({
      type: 'engagement',
      category: 'newsletter',
      action: 'subscribe',
      label: source,
      metadata: {
        email: email, // Consider privacy implications
        source: source
      }
    }).subscribe()
  }

  // Video interaction tracking
  trackVideoInteraction(videoId: string, action: 'play' | 'pause' | 'complete' | 'seek', currentTime?: number) {
    this.trackEvent({
      type: 'media',
      category: 'video',
      action: `video_${action}`,
      label: videoId,
      value: currentTime,
      metadata: {
        videoId: videoId,
        action: action,
        currentTime: currentTime
      }
    }).subscribe()
  }

  // Filter usage tracking
  trackFilterUsage(filterType: string, filterValue: string, resultsCount: number) {
    this.trackEvent({
      type: 'interaction',
      category: 'filter',
      action: 'apply_filter',
      label: filterType,
      value: resultsCount,
      metadata: {
        filterType: filterType,
        filterValue: filterValue,
        resultsCount: resultsCount
      }
    }).subscribe()
  }

  // Recommendation interaction tracking
  trackRecommendationClick(recommendationType: string, productId: number, position: number) {
    this.trackEvent({
      type: 'recommendation',
      category: 'discovery',
      action: 'recommendation_click',
      label: recommendationType,
      productId: productId,
      value: position,
      metadata: {
        recommendationType: recommendationType,
        productId: productId,
        position: position
      }
    }).subscribe()
  }

  // Get analytics data (for admin dashboard)
  getAnalyticsData(params: {
    startDate?: string
    endDate?: string
    eventType?: string
    category?: string
  } = {}): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard`, { params: params as any }).pipe(
      catchError(error => {
        console.error('Failed to load analytics data:', error)
        return of(null)
      })
    )
  }
}