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
  ],
  template: `
    <div class="app-container">
      <mat-toolbar color="primary" class="app-toolbar">
        <button mat-icon-button (click)="sidenav.toggle()" aria-label="Toggle navigation">
          <mat-icon>menu</mat-icon>
        </button>

        <a class="brand" routerLink="/" aria-label="Aller à l'accueil">
          <img src="assets/logo.svg" alt="Brand" height="28" />
        </a>

        <form class="search" (submit)="onSearch(searchInput.value)" role="search" aria-label="Recherche de produits">
          <div class="search-box">
            <mat-icon class="prefix">search</mat-icon>
            <input #searchInput type="search" placeholder="Rechercher un produit…" aria-label="Rechercher" />
            <button type="button" (click)="searchInput.value=''; onSearch('')" aria-label="Effacer la recherche">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        </form>

        <span class="spacer"></span>

        <a class="cart-link" routerLink="/cart" aria-label="Ouvrir le panier">
          <mat-icon>shopping_cart</mat-icon>
          <span>Panier ({{ cartItemCount }})</span>
        </a>

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

      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav #sidenav mode="side" opened="false" class="sidenav">
          <mat-nav-list>
            <ng-container *ngIf="!isAdmin; else adminMenu">
            <a mat-list-item routerLink="/products" routerLinkActive="active">
              <mat-icon matListItemIcon>inventory</mat-icon>
              <span matListItemTitle>Produits</span>
            </a>
            <a mat-list-item routerLink="/cart" routerLinkActive="active">
              <mat-icon matListItemIcon>shopping_cart</mat-icon>
              <span matListItemTitle>Panier</span>
            </a>
            <a mat-list-item routerLink="/orders" routerLinkActive="active">
              <mat-icon matListItemIcon>receipt</mat-icon>
              <span matListItemTitle>Commandes</span>
            </a>
            <a mat-list-item routerLink="/profile" routerLinkActive="active">
              <mat-icon matListItemIcon>person</mat-icon>
              <span matListItemTitle>Profil</span>
            </a>
            </ng-container>
            <ng-template #adminMenu>
              <a mat-list-item routerLink="/admin" routerLinkActive="active">
                <mat-icon matListItemIcon>admin_panel_settings</mat-icon>
                <span matListItemTitle>Administration</span>
              </a>
            </ng-template>
          </mat-nav-list>
        </mat-sidenav>

        <mat-sidenav-content class="main-content">
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
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [
    `
      .app-container { height: 100vh; display: flex; flex-direction: column; }
      .app-toolbar { position: sticky; top: 0; z-index: 1000; }

      .brand { display: flex; align-items: center; margin: 0 12px; text-decoration: none; }

      .search { flex: 1 1 520px; max-width: 720px; margin-right: 16px; }
      .search-box { display: grid; grid-template-columns: 32px 1fr 40px; align-items: center; gap: 6px; padding: 6px 8px; background: #fff; border-radius: 8px; border: 1px solid rgba(0,0,0,0.12); }
      .search-box input { border: none; outline: none; font: inherit; padding: 8px 4px; }
      .search-box button { border: none; background: transparent; cursor: pointer; }
      .search-box .prefix { color: rgba(0,0,0,0.54); }

      .spacer { flex: 1 1 auto; }
      .cart-link { display:flex; align-items:center; gap:8px; text-decoration:none; color:#1B1B1B; padding:6px 10px; border:1px solid var(--brand-primary); border-radius:12px; }
      .cart-link:hover { background: var(--brand-primary); }

      .sidenav-container { flex: 1; }
      .sidenav { width: 250px; }
      .main-content { padding: 20px; }

      .footer { margin-top: 40px; padding: 24px 0; border-top: 1px solid rgba(0,0,0,0.08); color: #555; }
      .footer-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; }
      .footer a { color: inherit; text-decoration: none; display: block; margin: 6px 0; }
      .copy { margin-top: 12px; font-size: 12px; color: #777; }

      .active { background-color: rgba(0, 0, 0, 0.04); }

      @media (max-width: 768px) { .main-content { padding: 10px; } }
    `,
  ],
})
export class AppComponent implements OnInit {
  private store = inject(Store)
  private authService = inject(AuthService)
  private cartService = inject(CartService)
  private router = inject(Router)

  user$: Observable<User | null> = this.store.select(selectUser)
  isAuthenticated$: Observable<boolean> = this.store.select(selectIsAuthenticated)
  cartItemCount = 0
  isAdmin = false

  ngOnInit(): void {
    const token = localStorage.getItem("token")
    if (token) {
      this.store.dispatch(AuthActions.checkAuthStatus())
    }

    this.user$.subscribe((user) => {
      this.isAdmin = user?.role === "ADMIN"
    })

    this.cartService.getCart().subscribe((cart) => {
      this.cartItemCount = cart?.items?.length || 0
    })
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout())
  }

  onSearch(term: string): void {
    this.router.navigate(["/products"], { queryParams: { search: term || null }, queryParamsHandling: "merge" })
  }
}
