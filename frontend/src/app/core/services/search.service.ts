import { Injectable, inject } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, debounceTime, distinctUntilChanged, switchMap, catchError, of } from 'rxjs'
import { environment } from '../../../environments/environment'

export interface SearchFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  inStock?: boolean
  sortBy?: 'name' | 'price' | 'rating' | 'newest'
  sortDirection?: 'asc' | 'desc'
}

export interface SearchResult {
  id: number
  name: string
  description: string
  price: number
  imageUrl?: string
  rating: number
  reviewCount: number
  brand?: string
  category?: string
  inStock: boolean
  slug?: string
}

export interface SearchResponse {
  products: SearchResult[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  filters: {
    categories: Array<{name: string, count: number}>
    brands: Array<{name: string, count: number}>
    priceRange: {min: number, max: number}
  }
}

export interface SearchSuggestion {
  type: 'product' | 'category' | 'brand'
  text: string
  count?: number
  productId?: number
  category?: string
}

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api`

  // Current search state
  private searchQuerySubject = new BehaviorSubject<string>('')
  private filtersSubject = new BehaviorSubject<SearchFilters>({})
  private recentSearchesKey = 'recentSearches'

  searchQuery$ = this.searchQuerySubject.asObservable()
  filters$ = this.filtersSubject.asObservable()

  // Search with filters and pagination
  search(query: string, filters: SearchFilters = {}, page: number = 1, pageSize: number = 20): Observable<SearchResponse> {
    let params = new HttpParams()
      .set('query', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())

    // Add filters to params
    if (filters.category) params = params.set('category', filters.category)
    if (filters.minPrice !== undefined) params = params.set('minPrice', filters.minPrice.toString())
    if (filters.maxPrice !== undefined) params = params.set('maxPrice', filters.maxPrice.toString())
    if (filters.brand) params = params.set('brand', filters.brand)
    if (filters.rating !== undefined) params = params.set('rating', filters.rating.toString())
    if (filters.inStock !== undefined) params = params.set('inStock', filters.inStock.toString())
    if (filters.sortBy) params = params.set('sortBy', filters.sortBy)
    if (filters.sortDirection) params = params.set('sortDirection', filters.sortDirection)

    return this.http.get<SearchResponse>(`${this.apiUrl}/products/search`, { params })
      .pipe(
        catchError((error) => {
          console.error('Search error:', error)
          return of({
            products: [],
            total: 0,
            page: 1,
            pageSize: 20,
            totalPages: 0,
            filters: { categories: [], brands: [], priceRange: { min: 0, max: 0 } }
          })
        })
      )
  }

  // Live search suggestions with debouncing
  getSuggestions(query: string): Observable<SearchSuggestion[]> {
    if (!query || query.length < 2) {
      return of([])
    }

    const params = new HttpParams().set('query', query).set('limit', '8')
    return this.http.get<SearchSuggestion[]>(`${this.apiUrl}/products/suggestions`, { params })
      .pipe(
        catchError(() => of([]))
      )
  }

  // Auto-complete observable with debouncing
  getAutoComplete(query$: Observable<string>): Observable<SearchSuggestion[]> {
    return query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.getSuggestions(query))
    )
  }

  // Update search state
  updateSearchQuery(query: string) {
    this.searchQuerySubject.next(query)
    if (query.trim()) {
      this.addToRecentSearches(query.trim())
    }
  }

  updateFilters(filters: SearchFilters) {
    this.filtersSubject.next({ ...this.filtersSubject.value, ...filters })
  }

  clearFilters() {
    this.filtersSubject.next({})
  }

  // Recent searches management
  getRecentSearches(): string[] {
    const stored = localStorage.getItem(this.recentSearchesKey)
    return stored ? JSON.parse(stored) : []
  }

  private addToRecentSearches(query: string) {
    const recent = this.getRecentSearches()
    const filtered = recent.filter(item => item.toLowerCase() !== query.toLowerCase())
    const updated = [query, ...filtered].slice(0, 10) // Keep last 10 searches
    localStorage.setItem(this.recentSearchesKey, JSON.stringify(updated))
  }

  clearRecentSearches() {
    localStorage.removeItem(this.recentSearchesKey)
  }

  // Popular searches
  getPopularSearches(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/products/popular-searches`)
      .pipe(
        catchError(() => of(['smartphones', 'laptops', 'headphones', 'smart watch', 'gaming']))
      )
  }

  // Track search analytics
  trackSearch(query: string, resultsCount: number) {
    // Send analytics event
    this.http.post(`${this.apiUrl}/analytics/search`, {
      query,
      resultsCount,
      timestamp: new Date().toISOString()
    }).pipe(
      catchError(() => of(null))
    ).subscribe()
  }

  // Featured/trending products
  getTrendingProducts(): Observable<SearchResult[]> {
    return this.http.get<SearchResult[]>(`${this.apiUrl}/products/trending`)
      .pipe(
        catchError(() => of([]))
      )
  }

  // Search within category
  searchInCategory(categoryId: string, query: string = '', page: number = 1): Observable<SearchResponse> {
    const filters: SearchFilters = { category: categoryId }
    return this.search(query, filters, page)
  }

  // Quick search for header autocomplete
  quickSearch(query: string): Observable<{
    products: SearchResult[]
    suggestions: SearchSuggestion[]
    categories: Array<{name: string, slug: string}>
  }> {
    if (!query || query.length < 2) {
      return of({ products: [], suggestions: [], categories: [] })
    }

    const params = new HttpParams().set('q', query).set('quick', 'true')
    return this.http.get<any>(`${this.apiUrl}/products/quick-search`, { params })
      .pipe(
        catchError(() => of({ products: [], suggestions: [], categories: [] }))
      )
  }
}









