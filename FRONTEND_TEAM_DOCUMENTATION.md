# Documentation Frontend - Stage2025 E-commerce Platform

## 📋 Table des Matières
1. [Architecture Frontend](#architecture-frontend)
2. [Structure du Projet](#structure-du-projet)
3. [Configuration et Démarrage](#configuration-et-démarrage)
4. [Composants Principaux](#composants-principaux)
5. [Services et State Management](#services-et-state-management)
6. [Routing et Navigation](#routing-et-navigation)
7. [Authentification et Sécurité](#authentification-et-sécurité)
8. [Intégration API](#intégration-api)
9. [UI/UX et Styling](#uiux-et-styling)
10. [Tests et Qualité](#tests-et-qualité)
11. [Build et Déploiement](#build-et-déploiement)
12. [Performance et Optimisation](#performance-et-optimisation)

## 🏗️ Architecture Frontend

### Stack Technologique
- **Framework** : Angular 16+
- **Language** : TypeScript 5.0+
- **Build Tool** : Angular CLI
- **Styling** : SCSS + Angular Material
- **State Management** : RxJS + Services
- **HTTP Client** : Angular HttpClient
- **Testing** : Jasmine + Karma + Cypress

### Architecture en Couches
```
┌─────────────────────────────────────┐
│           Components                │ ← Presentation Layer
├─────────────────────────────────────┤
│           Services                  │ ← Business Logic Layer
├─────────────────────────────────────┤
│           Models                    │ ← Data Models Layer
├─────────────────────────────────────┤
│           HTTP Client               │ ← Data Access Layer
└─────────────────────────────────────┘
```

## 📁 Structure du Projet

```
frontend/src/app/
├── core/                        # Services et fonctionnalités core
│   ├── services/                # Services principaux
│   │   ├── product.service.ts
│   │   ├── order.service.ts
│   │   ├── auth.service.ts
│   │   └── supplier.service.ts
│   ├── models/                  # Modèles de données
│   │   ├── product.model.ts
│   │   ├── order.model.ts
│   │   └── user.model.ts
│   ├── guards/                  # Guards de navigation
│   │   ├── auth.guard.ts
│   │   └── admin.guard.ts
│   └── interceptors/            # Intercepteurs HTTP
│       └── auth.interceptor.ts
├── features/                    # Fonctionnalités métier
│   ├── products/                # Gestion des produits
│   │   ├── product-list/
│   │   ├── product-detail/
│   │   └── product-admin/
│   ├── orders/                  # Gestion des commandes
│   │   ├── order-list/
│   │   ├── order-detail/
│   │   └── checkout/
│   ├── auth/                    # Authentification
│   │   ├── login/
│   │   ├── register/
│   │   └── profile/
│   └── admin/                   # Interface administrateur
│       ├── dashboard/
│       ├── product-management/
│       └── order-management/
├── shared/                      # Composants partagés
│   ├── components/              # Composants réutilisables
│   │   ├── product-card/
│   │   ├── loading-spinner/
│   │   ├── error-boundary/
│   │   └── search-filters/
│   ├── pipes/                   # Pipes personnalisés
│   │   ├── currency.pipe.ts
│   │   └── date.pipe.ts
│   └── directives/              # Directives personnalisées
│       └── highlight.directive.ts
├── app.component.ts             # Composant racine
├── app.routes.ts               # Configuration des routes
└── main.ts                     # Point d'entrée
```

## ⚙️ Configuration et Démarrage

### Prérequis
```bash
# Node.js 18.x ou 20.x LTS
node --version

# npm 9.x ou supérieur
npm --version

# Angular CLI 16.x
npm install -g @angular/cli@16
ng version
```

### Installation
```bash
# Cloner le projet
git clone [repository-url]
cd frontend

# Installer les dépendances
npm install

# Démarrer le serveur de développement
ng serve

# Ou avec proxy pour l'API
ng serve --proxy-config proxy.conf.json
```

### Configuration de l'Environnement
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  stripePublicKey: 'pk_test_your_public_key',
  appName: 'Stage2025',
  version: '1.0.0'
};

// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.stage2025.com/api',
  stripePublicKey: 'pk_live_your_public_key',
  appName: 'Stage2025',
  version: '1.0.0'
};
```

### Configuration du Proxy
```json
// proxy.conf.json
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
}
```

## 🧩 Composants Principaux

### ProductListComponent
```typescript
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    SearchFiltersComponent,
    LoadingSpinnerComponent,
    MatPaginatorModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  // Propriétés
  products: Product[] = [];
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  loadingProducts = true;
  currentPage = 1;
  pageSize = 12;
  totalProducts = 0;
  currentFilters: AppliedFilters | null = null;

  // Services injectés
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);
  private snackBar = inject(MatSnackBar);

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadProducts(filters?: AppliedFilters): void {
    this.loadingProducts = true;
    this.error = null;
    
    const params: any = {
      page: this.currentPage - 1,
      size: this.pageSize
    };

    // Application des filtres
    if (filters) {
      if (filters.search) params.search = filters.search;
      if (filters.category) {
        const category = this.filterOptions.categories.find(c => c.id === filters.category);
        if (category) params.category = category.name;
      }
      if (filters.supplier) {
        const supplier = this.filterOptions.suppliers.find(s => s.id === filters.supplier);
        if (supplier) params.supplier = supplier.name;
      }
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.sortBy) {
        params.sortBy = filters.sortBy;
        if (filters.sortDirection) {
          params.sortBy += ',' + filters.sortDirection;
        }
      }
    }

    this.productService.getActiveProducts(params).subscribe({
      next: (data: any) => {
        if (Array.isArray(data)) {
          this.products = data;
          this.totalProducts = data.length;
        } else {
          this.products = data?.content ?? [];
          this.totalProducts = data?.totalElements ?? this.products.length;
        }
        this.totalPages = Math.ceil(Math.max(1, this.totalProducts) / this.pageSize);
        this.loadingProducts = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.error = {
          message: 'Erreur lors du chargement des produits',
          details: error.message || 'Veuillez réessayer plus tard'
        };
        this.loadingProducts = false;
        this.snackBar.open('Erreur lors du chargement des produits', 'Fermer', { duration: 3000 });
      }
    });
  }

  onFiltersChanged(filters: AppliedFilters): void {
    this.currentFilters = filters;
    this.currentPage = 1;
    this.loadProducts(filters);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadProducts(this.currentFilters || undefined);
  }
}
```

### ProductCardComponent
```typescript
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: ProductCard;
  @Input() layout: 'grid' | 'list' = 'grid';
  @Output() addToCart = new EventEmitter<ProductCard>();
  @Output() viewDetails = new EventEmitter<ProductCard>();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }

  onViewDetails(): void {
    this.viewDetails.emit(this.product);
  }

  get hasDiscount(): boolean {
    return this.product.originalPrice && this.product.originalPrice > this.product.price;
  }

  get discountPercentage(): number {
    if (!this.hasDiscount) return 0;
    return Math.round(((this.product.originalPrice! - this.product.price) / this.product.originalPrice!) * 100);
  }
}
```

### SearchFiltersComponent
```typescript
@Component({
  selector: 'app-search-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule
  ],
  template: `
    <div class="search-filters-container">
      <!-- Barre de recherche -->
      <div class="search-section">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Rechercher un produit</mat-label>
          <input 
            matInput 
            [formControl]="searchControl"
            placeholder="Nom, description, catégorie..."
            type="search">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <!-- Filtres rapides -->
      <div class="quick-filters">
        <mat-chip-listbox 
          [formControl]="quickFiltersControl"
          class="filter-chips">
          <mat-chip-option value="inStock">En stock</mat-chip-option>
          <mat-chip-option value="onSale">En promotion</mat-chip-option>
          <mat-chip-option value="new">Nouveautés</mat-chip-option>
        </mat-chip-listbox>
      </div>

      <!-- Filtres avancés -->
      <mat-expansion-panel class="advanced-filters">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon>tune</mat-icon>
            Filtres avancés
          </mat-panel-title>
        </mat-expansion-panel-header>

        <form [formGroup]="filtersForm" class="filters-form">
          <div class="filters-grid">
            <!-- Filtre Catégorie -->
            <mat-form-field appearance="outline">
              <mat-label>Catégorie</mat-label>
              <mat-select formControlName="category">
                <mat-option value="">Toutes les catégories</mat-option>
                <mat-option 
                  *ngFor="let cat of filterOptions?.categories" 
                  [value]="cat.id">
                  {{ cat.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Filtre Fournisseur -->
            <mat-form-field appearance="outline">
              <mat-label>Fournisseur</mat-label>
              <mat-select formControlName="supplier">
                <mat-option value="">Tous les fournisseurs</mat-option>
                <mat-option 
                  *ngFor="let sup of filterOptions?.suppliers" 
                  [value]="sup.id">
                  {{ sup.name }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <!-- Fourchette de prix -->
            <div class="price-range">
              <label>Fourchette de prix</label>
              <div class="price-inputs">
                <mat-form-field appearance="outline">
                  <mat-label>Min</mat-label>
                  <input 
                    matInput 
                    type="number" 
                    formControlName="minPrice"
                    placeholder="0">
                </mat-form-field>
                <span class="price-separator">-</span>
                <mat-form-field appearance="outline">
                  <mat-label>Max</mat-label>
                  <input 
                    matInput 
                    type="number" 
                    formControlName="maxPrice"
                    placeholder="1000">
                </mat-form-field>
              </div>
            </div>
          </div>

          <!-- Actions des filtres -->
          <div class="filter-actions">
            <button 
              mat-stroked-button 
              (click)="clearFilters()"
              class="clear-btn">
              <mat-icon>clear</mat-icon>
              Effacer
            </button>
            <button 
              mat-raised-button 
              color="primary"
              (click)="applyFilters()"
              class="apply-btn">
              <mat-icon>filter_list</mat-icon>
              Appliquer
            </button>
          </div>
        </form>
      </mat-expansion-panel>
    </div>
  `,
  styles: [`
    .search-filters-container {
      background: white;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin-bottom: 24px;
    }

    .search-field {
      width: 100%;
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .price-inputs {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .filter-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }
  `]
})
export class SearchFiltersComponent implements OnInit {
  @Input() filterOptions: FilterOptions | null = null;
  @Output() filtersChanged = new EventEmitter<AppliedFilters>();

  private fb = inject(FormBuilder);

  searchControl = this.fb.control('');
  quickFiltersControl = this.fb.control<string[]>([]);
  filtersForm: FormGroup;

  constructor() {
    this.filtersForm = this.fb.group({
      category: [''],
      supplier: [''],
      minPrice: [null],
      maxPrice: [null],
      sortBy: ['name'],
      sortDirection: ['asc']
    });
  }

  ngOnInit() {
    // Debounce search input
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
      this.emitFilters();
    });

    // Watch for filter changes
    this.filtersForm.valueChanges.subscribe(() => {
      this.emitFilters();
    });

    this.quickFiltersControl.valueChanges.subscribe(() => {
      this.emitFilters();
    });
  }

  clearFilters() {
    this.searchControl.setValue('');
    this.quickFiltersControl.setValue([] as string[]);
    this.filtersForm.reset({
      category: '',
      supplier: '',
      minPrice: null,
      maxPrice: null,
      sortBy: 'name',
      sortDirection: 'asc'
    });
  }

  applyFilters() {
    this.emitFilters();
  }

  private emitFilters() {
    const filters: AppliedFilters = {
      search: this.searchControl.value || '',
      category: this.filtersForm.value.category || null,
      supplier: this.filtersForm.value.supplier || null,
      minPrice: this.filtersForm.value.minPrice || null,
      maxPrice: this.filtersForm.value.maxPrice || null,
      inStock: this.quickFiltersControl.value?.includes('inStock') || false,
      sortBy: this.filtersForm.value.sortBy,
      sortDirection: this.filtersForm.value.sortDirection
    };
    
    this.filtersChanged.emit(filters);
  }
}
```

## 🔧 Services et State Management

### ProductService
```typescript
@Injectable({
  providedIn: "root"
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/products`;

  getAllProducts(params?: {
    category?: string;
    supplier?: string;
    search?: string;
    sortBy?: string;
    page?: number;
    size?: number;
    includeInactive?: boolean;
  }): Observable<Product[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = (params as any)[key];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.append(key, value.toString());
        }
      });
    }
    
    return this.http.get<Product[]>(this.apiUrl, { params: httpParams });
  }

  getActiveProducts(params?: {
    category?: string;
    supplier?: string;
    search?: string;
    sortBy?: string;
    page?: number;
    size?: number;
    minPrice?: number;
    maxPrice?: number;
  }): Observable<Product[]> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = (params as any)[key];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.append(key, value.toString());
        }
      });
    }
    
    return this.http.get<Product[]>(this.apiUrl, { params: httpParams });
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/featured`);
  }

  getSuggestedProducts(id: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/${id}/suggested`);
  }
}
```

### AuthService
```typescript
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadUserFromStorage();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        this.setUser(response.user);
        this.setToken(response.token);
      }),
      catchError(error => {
        this.snackBar.open('Erreur de connexion', 'Fermer', { duration: 3000 });
        throw error;
      })
    );
  }

  register(userData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData).pipe(
      tap(response => {
        this.setUser(response.user);
        this.setToken(response.token);
      }),
      catchError(error => {
        this.snackBar.open('Erreur lors de l\'inscription', 'Fermer', { duration: 3000 });
        throw error;
      })
    );
  }

  logout(): void {
    this.clearUser();
    this.clearToken();
    this.router.navigate(['/login']);
    this.snackBar.open('Déconnexion réussie', 'Fermer', { duration: 2000 });
  }

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    return this.currentUserSubject.value?.role === 'ADMIN';
  }

  private setUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private clearUser(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  private clearToken(): void {
    localStorage.removeItem('token');
  }

  private loadUserFromStorage(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}
```

### CartService
```typescript
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({
        product,
        quantity,
        addedAt: new Date()
      });
    }

    this.updateCart(currentItems);
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.product.id !== productId);
    this.updateCart(updatedItems);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const item = currentItems.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.updateCart(currentItems);
      }
    }
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getCartItemsCount(): number {
    return this.cartItemsSubject.value.reduce((count, item) => count + item.quantity, 0);
  }

  private updateCart(items: CartItem[]): void {
    this.cartItemsSubject.next(items);
    localStorage.setItem('cart', JSON.stringify(items));
  }

  private loadCartFromStorage(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItemsSubject.next(JSON.parse(cart));
    }
  }
}
```

## 🛣️ Routing et Navigation

### Configuration des Routes
```typescript
// app.routes.ts
export const routes: Routes = [
  // Routes publiques
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: 'products', loadComponent: () => import('./features/products/product-list/product-list.component').then(m => m.ProductListComponent) },
  { path: 'products/:id', loadComponent: () => import('./features/products/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  
  // Routes protégées
  { 
    path: 'cart', 
    loadComponent: () => import('./features/orders/cart/cart.component').then(m => m.CartComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'checkout', 
    loadComponent: () => import('./features/orders/checkout/checkout.component').then(m => m.CheckoutComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'orders', 
    loadComponent: () => import('./features/orders/order-list/order-list.component').then(m => m.OrderListComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'orders/:id', 
    loadComponent: () => import('./features/orders/order-detail/order-detail.component').then(m => m.OrderDetailComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'profile', 
    loadComponent: () => import('./features/auth/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [AuthGuard]
  },
  
  // Routes administrateur
  { 
    path: 'admin', 
    loadComponent: () => import('./features/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/products', 
    loadComponent: () => import('./features/admin/product-management/product-management.component').then(m => m.ProductManagementComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  { 
    path: 'admin/orders', 
    loadComponent: () => import('./features/admin/order-management/order-management.component').then(m => m.OrderManagementComponent),
    canActivate: [AuthGuard, AdminGuard]
  },
  
  // Route de fallback
  { path: '**', loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent) }
];
```

### Guards de Navigation
```typescript
// auth.guard.ts
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}

// admin.guard.ts
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated() && this.authService.isAdmin()) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
```

## 🔐 Authentification et Sécurité

### Intercepteur HTTP
```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(authReq);
    }
    
    return next.handle(req);
  }
}
```

### Configuration des Intercepteurs
```typescript
// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([AuthInterceptor])),
    provideRouter(routes),
    provideAnimations(),
    // ... autres providers
  ]
});
```

## 🌐 Intégration API

### Configuration HTTP
```typescript
// http.config.ts
export const httpConfig = {
  baseUrl: environment.apiUrl,
  timeout: 30000,
  retryAttempts: 3,
  retryDelay: 1000
};

// Configuration dans main.ts
provideHttpClient(
  withInterceptors([AuthInterceptor]),
  withJsonpSupport(),
  withFetchBackend()
)
```

### Gestion des Erreurs
```typescript
@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private snackBar = inject(MatSnackBar);

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Une erreur est survenue';

    if (error.error instanceof ErrorEvent) {
      // Erreur côté client
      errorMessage = `Erreur: ${error.error.message}`;
    } else {
      // Erreur côté serveur
      switch (error.status) {
        case 400:
          errorMessage = 'Requête invalide';
          break;
        case 401:
          errorMessage = 'Non autorisé';
          break;
        case 403:
          errorMessage = 'Accès interdit';
          break;
        case 404:
          errorMessage = 'Ressource non trouvée';
          break;
        case 500:
          errorMessage = 'Erreur serveur';
          break;
        default:
          errorMessage = `Erreur ${error.status}: ${error.message}`;
      }
    }

    this.snackBar.open(errorMessage, 'Fermer', { duration: 5000 });
    return throwError(() => error);
  }
}
```

## 🎨 UI/UX et Styling

### Configuration Angular Material
```typescript
// app.config.ts
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideAnimationsAsync(),
    // ... autres providers
  ]
};
```

### Thème Personnalisé
```scss
// styles.scss
@use '@angular/material' as mat;

// Configuration du thème
$primary-palette: mat.define-palette(mat.$blue-palette);
$accent-palette: mat.define-palette(mat.$orange-palette);
$warn-palette: mat.define-palette(mat.$red-palette);

$theme: mat.define-light-theme((
  color: (
    primary: $primary-palette,
    accent: $accent-palette,
    warn: $warn-palette,
  ),
  typography: mat.define-typography-config(),
  density: 0,
));

@include mat.all-component-themes($theme);

// Styles personnalisés
.custom-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  }
}

.search-filters-container {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  padding: 24px 0;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 16px 0;
  }
}
```

## 🧪 Tests et Qualité

### Tests Unitaires
```typescript
// product.service.spec.ts
describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Test Product', price: 100, description: 'Test Description' }
    ];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });
});
```

### Tests d'Intégration
```typescript
// product-list.component.spec.ts
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getAllProducts']);

    await TestBed.configureTestingModule({
      imports: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Test Product', price: 100 }
    ];
    productService.getAllProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });
});
```

### Tests E2E avec Cypress
```typescript
// cypress/e2e/product-list.cy.ts
describe('Product List', () => {
  beforeEach(() => {
    cy.visit('/products');
  });

  it('should display products', () => {
    cy.get('[data-cy=product-card]').should('have.length.greaterThan', 0);
  });

  it('should filter products by category', () => {
    cy.get('[data-cy=category-filter]').click();
    cy.get('[data-cy=category-option]').first().click();
    cy.get('[data-cy=product-card]').should('be.visible');
  });

  it('should search products', () => {
    cy.get('[data-cy=search-input]').type('test');
    cy.get('[data-cy=search-button]').click();
    cy.get('[data-cy=product-card]').should('be.visible');
  });
});
```

## 🚀 Build et Déploiement

### Configuration de Build
```json
// angular.json
{
  "projects": {
    "stage2025": {
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/stage2025",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                }
              ],
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "outputHashing": "all"
            }
          }
        }
      }
    }
  }
}
```

### Scripts de Build
```json
// package.json
{
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "test": "ng test",
    "test:ci": "ng test --watch=false --browsers=ChromeHeadless",
    "e2e": "ng e2e",
    "lint": "ng lint",
    "serve:prod": "ng serve --configuration production"
  }
}
```

### Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build:prod

FROM nginx:alpine
COPY --from=build /app/dist/stage2025 /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## ⚡ Performance et Optimisation

### Lazy Loading
```typescript
// Configuration des routes avec lazy loading
const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('./features/products/product-list/product-list.component')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.adminRoutes)
  }
];
```

### OnPush Change Detection
```typescript
@Component({
  selector: 'app-product-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class ProductCardComponent {
  // ...
}
```

### Virtual Scrolling
```typescript
// Pour les listes longues
@Component({
  template: `
    <cdk-virtual-scroll-viewport itemSize="100" class="viewport">
      <div *cdkVirtualFor="let product of products" class="item">
        <app-product-card [product]="product"></app-product-card>
      </div>
    </cdk-virtual-scroll-viewport>
  `
})
export class ProductListComponent {
  // ...
}
```

---

## 📚 Ressources et Liens Utiles

- **Documentation Angular** : https://angular.io/docs
- **Angular Material** : https://material.angular.io/
- **RxJS** : https://rxjs.dev/
- **TypeScript** : https://www.typescriptlang.org/docs/
- **Cypress** : https://docs.cypress.io/

---

*Dernière mise à jour : Décembre 2024*
