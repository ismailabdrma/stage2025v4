import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterOutlet, RouterModule, Router } from "@angular/router"
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatSidenavModule } from "@angular/material/sidenav"
import { MatListModule } from "@angular/material/list"
import { MatMenuModule } from "@angular/material/menu"
import { MatBadgeModule } from "@angular/material/badge"
import { MatDividerModule } from "@angular/material/divider"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { AuthService } from "./core/services/auth.service"
import { CartService } from "./core/services/cart.service"
import { selectUser, selectIsAuthenticated } from "./core/store/auth/auth.selectors"
import { AuthActions } from "./core/store/auth/auth.actions"
import type { User } from "./core/models/user.model"
import { MiniCartDrawerComponent } from "./shared/components/mini-cart-drawer/mini-cart-drawer.component"
import { ToastService } from "./shared/components/toast-notification/toast-notification.component"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    MatBadgeModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MiniCartDrawerComponent,
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <a class="brand" routerLink="/" aria-label="Aller à l'accueil">
          <img src="assets/logo.svg" alt="Brand" height="28" />
        </a>

        <!-- Navigation buttons for non-admin users -->
        <ng-container *ngIf="!isAdmin">
          <div class="nav-buttons">
            <button mat-button routerLink="/products" routerLinkActive="active">
              <mat-icon>inventory_2</mat-icon>
              <span>Produits</span>
            </button>
            <button mat-button routerLink="/cart" routerLinkActive="active" (click)="toggleMiniCart()">
              <mat-icon aria-hidden="false" [matBadge]="cartItemCount" [matBadgeHidden]="cartItemCount === 0" matBadgeColor="accent">shopping_cart</mat-icon>
              <span>Panier</span>
            </button>
            <button mat-button routerLink="/orders" routerLinkActive="active">
              <mat-icon>receipt_long</mat-icon>
              <span>Commandes</span>
            </button>
            <button mat-button routerLink="/profile" routerLinkActive="active">
              <mat-icon>person</mat-icon>
              <span>Profil</span>
            </button>
          </div>

          <form class="search" (submit)="onSearch(searchInput.value)" role="search" aria-label="Recherche de produits">
            <div class="search-box">
              <mat-icon class="prefix">search</mat-icon>
              <input #searchInput type="search" placeholder="Rechercher un produit…" aria-label="Rechercher" />
              <button type="button" (click)="searchInput.value=''; onSearch('')" aria-label="Effacer la recherche">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </form>
        </ng-container>

        <!-- Admin navigation -->
        <ng-container *ngIf="isAdmin">
          <div class="nav-buttons">
            <button mat-button routerLink="/admin" routerLinkActive="active">
              <mat-icon>admin_panel_settings</mat-icon>
              <span>Administration</span>
            </button>
          </div>
        </ng-container>

        <span class="spacer"></span>

        <ng-container *ngIf="isAuthenticated$ | async; else loginButton">
          <button mat-button [matMenuTriggerFor]="userMenu">
            <mat-icon>account_circle</mat-icon>
            Mon compte
          </button>

          <mat-menu #userMenu="matMenu">
            <button mat-menu-item routerLink="/profile"><mat-icon>person</mat-icon><span>Profil</span></button>
            <button mat-menu-item routerLink="/orders"><mat-icon>receipt</mat-icon><span>Mes commandes</span></button>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()"><mat-icon>logout</mat-icon><span>Se déconnecter</span></button>
          </mat-menu>
        </ng-container>

        <ng-template #loginButton>
          <button mat-button routerLink="/auth/login"><mat-icon>login</mat-icon><span>Se connecter</span></button>
        </ng-template>
      </mat-toolbar>

      <div class="main-content">
        <router-outlet></router-outlet>
        <footer class="footer">
          <div class="footer-grid">
            <div>
              <h4>Catalogue</h4>
              <a routerLink="/products">Tous les produits</a>
            </div>
            <div>
              <h4>Support</h4>
              <a routerLink="/profile">Mon compte</a>
            </div>
            <div>
              <h4>Société</h4>
              <a routerLink="/">À propos</a>
            </div>
          </div>
          <div class="copy">© Stage2025</div>
        </footer>
      </div>

      <!-- Mini Cart Drawer -->
      <app-mini-cart-drawer 
        [isOpen]="isMiniCartOpen" 
        (closeDrawer)="closeMiniCart()">
      </app-mini-cart-drawer>
    </div>
  `,
  styles: [
    `
      .app-container { height: 100vh; display: flex; flex-direction: column; }
      .app-toolbar { 
        position: sticky; 
        top: 0; 
        z-index: 1000; 
        display: flex; 
        align-items: center; 
        gap: 16px;
        padding: 0 16px;
      }

      .brand { 
        display: flex; 
        align-items: center; 
        margin-right: 24px; 
        text-decoration: none; 
        flex-shrink: 0;
      }

      .nav-buttons {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-shrink: 0;
      }

      .nav-buttons button {
        display: flex;
        align-items: center;
        gap: 6px;
        color: inherit;
        border-radius: 8px;
        transition: all 0.2s ease;
      }

      .nav-buttons button:hover {
        background: rgba(255,255,255,0.1);
      }

      .nav-buttons button.active {
        background: rgba(255,255,255,0.2);
      }

      .search { 
        flex: 1 1 400px; 
        max-width: 600px; 
        margin: 0 16px; 
      }
      .search-box { 
        display: grid; 
        grid-template-columns: 32px 1fr 40px; 
        align-items: center; 
        gap: 6px; 
        padding: 6px 8px; 
        background: #fff; 
        border-radius: 8px; 
        border: 1px solid rgba(0,0,0,0.12); 
      }
      .search-box input { 
        border: none; 
        outline: none; 
        font: inherit; 
        padding: 8px 4px; 
      }
      .search-box button { 
        border: none; 
        background: transparent; 
        cursor: pointer; 
      }
      .search-box .prefix { 
        color: rgba(0,0,0,0.54); 
      }

      .spacer { flex: 1 1 auto; }

      .main-content { 
        flex: 1; 
        padding: 20px; 
        overflow-y: auto;
      }

      .footer { 
        margin-top: 40px; 
        padding: 24px 0; 
        border-top: 1px solid rgba(0,0,0,0.08); 
        color: #555; 
      }
      .footer-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); 
        gap: 16px; 
      }
      .footer a { 
        color: inherit; 
        text-decoration: none; 
        display: block; 
        margin: 6px 0; 
      }
      .copy { 
        margin-top: 12px; 
        font-size: 12px; 
        color: #777; 
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .search {
          flex: 1 1 300px;
          max-width: 400px;
        }
      }

      @media (max-width: 768px) {
        .app-toolbar {
          flex-wrap: wrap;
          gap: 8px;
          padding: 8px 12px;
        }

        .nav-buttons {
          order: 3;
          width: 100%;
          justify-content: center;
          margin-top: 8px;
        }

        .nav-buttons button {
          flex: 1;
          justify-content: center;
          min-width: 0;
        }

        .nav-buttons button span {
          display: none;
        }

        .search {
          order: 2;
          flex: 1 1 100%;
          margin: 8px 0;
        }

        .main-content {
          padding: 10px;
        }
      }

      @media (max-width: 480px) {
        .nav-buttons button {
          padding: 8px 4px;
        }
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  private store = inject(Store)
  private authService = inject(AuthService)
  private cartService = inject(CartService)
  private router = inject(Router)
  private toastService = inject(ToastService)

  user$: Observable<User | null> = this.store.select(selectUser)
  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated)
  cartItemCount = 0
  isAdmin = false
  isMiniCartOpen = false

  ngOnInit(): void {
    // Initialize auth state first - this checks token validity without HTTP calls
    const hasValidToken = this.authService.initializeAuthState()
    
    // Only dispatch checkAuthStatus if we have a valid token
    if (hasValidToken) {
      this.store.dispatch(AuthActions.checkAuthStatus())
    }

    this.user$.subscribe((user) => {
      this.isAdmin = user?.role === "ADMIN"
      
      // Only subscribe to cart for non-admin users
      if (!this.isAdmin) {
        this.cartService.getCartItemCount().subscribe((count) => {
          this.cartItemCount = count
        })
      } else {
        // Admin users don't have carts
        this.cartItemCount = 0
      }
    })
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout())
  }

  onSearch(term: string): void {
    this.router.navigate(["/products"], { queryParams: { search: term || null }, queryParamsHandling: "merge" })
  }

  toggleMiniCart(): void {
    this.isMiniCartOpen = !this.isMiniCartOpen
  }

  closeMiniCart(): void {
    this.isMiniCartOpen = false
  }
}
