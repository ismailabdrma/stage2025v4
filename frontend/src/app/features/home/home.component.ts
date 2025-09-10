
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, Category } from '../../core/models/product.model';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ProductCardComponent, ProductCard } from '@app/shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    MatProgressSpinnerModule, 
    MatIconModule,
    MatCardModule, 
    MatButtonModule,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  featuredProducts: Product[] = [];
  searchKeyword: string = '';
  isAdmin: boolean = false;
  isAuthenticated: boolean = false;
  currentUser: User | null = null;
  loadingCategories = true;
  loadingFeaturedProducts = true;
  loadingUser = false;
  
  // Test property to verify template binding
  testUsername = 'Test Username';

  private productService = inject(ProductService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  
  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedProducts();
    this.checkAuthStatus();
    
    // Force load user data if authenticated
    if (this.isAuthenticated) {
      this.forceLoadUserData();
    }
    
    // Set test username immediately
    this.setTestUsername();
  }

  private setTestUsername(): void {
    console.log('🔧 Setting test username...');
    
    if (this.isAuthenticated) {
      // Try to get username from token first
      const token = this.authService.getToken();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          const username = payload.sub || payload.username || payload.preferred_username || 'Utilisateur';
          this.testUsername = username;
          console.log('✅ Test username set from token:', username);
          return;
        } catch (error) {
          console.error('❌ Error parsing token:', error);
        }
      }
      
      // Fallback to a default username
      this.testUsername = 'Utilisateur Connecté';
      console.log('✅ Test username set to fallback:', this.testUsername);
    } else {
      this.testUsername = 'Utilisateur';
    }
  }

  private forceLoadUserData(): void {
    console.log('🔄 Force loading user data...');
    
    // First try to get from token immediately
    this.getUsernameFromToken();
    
    // Then try API call
    this.loadCurrentUser();
    
    // If still no user data after a short delay, try again
    setTimeout(() => {
      if (this.isAuthenticated && !this.currentUser) {
        console.log('🔄 Retrying user data load...');
        this.getUsernameFromToken();
        this.loadCurrentUser();
      }
    }, 1000);
  }

  private checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.hasRole('ADMIN');
    
    if (this.isAuthenticated) {
      // Try to get username from token first as a fallback
      this.getUsernameFromToken();
      // Then try to load full user data
      this.loadCurrentUser();
      // Set test username
      this.setTestUsername();
    } else {
      this.currentUser = null;
      this.testUsername = 'Utilisateur';
    }
  }

  private loadCurrentUser(): void {
    this.loadingUser = true;
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('✅ User loaded successfully:', user);
        this.currentUser = user;
        this.loadingUser = false;
        
        // Update test username with real user data
        if (user) {
          const firstName = user.firstName || '';
          const lastName = user.lastName || '';
          const username = user.username || 'Utilisateur';
          
          if (firstName && lastName) {
            this.testUsername = `${firstName} ${lastName}`;
          } else if (firstName) {
            this.testUsername = firstName;
          } else if (lastName) {
            this.testUsername = lastName;
          } else {
            this.testUsername = username;
          }
          console.log('✅ Test username updated with real data:', this.testUsername);
        }
      },
      error: (error) => {
        console.error('❌ Error fetching current user:', error);
        this.loadingUser = false;
        // Try to get username from token as fallback
        this.getUsernameFromToken();
      }
    });
  }

  private getUsernameFromToken(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log('🔍 JWT Payload:', payload);
        
        // Try different possible username fields
        const username = payload.sub || payload.username || payload.preferred_username || payload.name || 'Utilisateur';
        const firstName = payload.firstName || payload.given_name || '';
        const lastName = payload.lastName || payload.family_name || '';
        
        this.currentUser = {
          id: payload.sub || payload.userId || payload.id || 0,
          username: username,
          email: payload.email || '',
          firstName: firstName,
          lastName: lastName,
          phone: payload.phone || '',
          role: payload.role || payload.authorities?.[0] || 'CLIENT',
          active: true
        };
        
        // Update test username with token data
        if (firstName && lastName) {
          this.testUsername = `${firstName} ${lastName}`;
        } else if (firstName) {
          this.testUsername = firstName;
        } else if (lastName) {
          this.testUsername = lastName;
        } else {
          this.testUsername = username;
        }
        
        console.log('✅ Username extracted from token:', this.currentUser.username);
        console.log('✅ Test username updated from token:', this.testUsername);
      } catch (error) {
        console.error('❌ Error parsing token:', error);
        this.currentUser = {
          id: 0,
          username: 'Utilisateur',
          email: '',
          firstName: '',
          lastName: '',
          phone: '',
          role: 'CLIENT',
          active: true
        };
        this.testUsername = 'Utilisateur';
      }
    } else {
      console.log('❌ No token found');
      this.currentUser = {
        id: 0,
        username: 'Utilisateur',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        role: 'CLIENT',
        active: true
      };
      this.testUsername = 'Utilisateur';
    }
  }

  search(): void {
    if (this.searchKeyword && this.searchKeyword.trim().length > 0) {
      this.router.navigate(['/products'], { queryParams: { q: this.searchKeyword } });
    }
  }

  loadCategories(): void {
    this.loadingCategories = true;
    this.productService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Failed to load categories.', 'Close', { duration: 3000 });
        this.loadingCategories = false;
      }
    });
  }

  loadFeaturedProducts(): void {
    this.loadingFeaturedProducts = true;
    this.productService.getFeaturedProducts().subscribe({
      next: (data) => {
        this.featuredProducts = data;
        this.loadingFeaturedProducts = false;
      },
      error: (error) => {
        console.error('Error fetching featured products:', error);
        this.snackBar.open('Failed to load featured products.', 'Close', { duration: 3000 });
        this.loadingFeaturedProducts = false;
      }
    });
  }

  navigateToCategory(categoryId: number): void {
    this.router.navigate(['/products'], { queryParams: { category: categoryId } });
  }

  navigateToProductDetail(productId: number): void {
    this.router.navigate(['/products', productId]);
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open('Déconnecté avec succès', 'Fermer', { duration: 3000 });
    this.currentUser = null; // Clear user data
    this.checkAuthStatus(); // Update auth status
  }

  get userDisplayName(): string {
    console.log('🔍 Getting user display name:', {
      currentUser: this.currentUser,
      isAuthenticated: this.isAuthenticated,
      loadingUser: this.loadingUser
    });
    
    // If user is authenticated, always show something
    if (this.isAuthenticated) {
      if (this.loadingUser) {
        return 'Chargement...';
      }
      
      if (this.currentUser) {
        const firstName = this.currentUser.firstName || '';
        const lastName = this.currentUser.lastName || '';
        const username = this.currentUser.username || 'Utilisateur';
        
        console.log('🔍 User data:', { firstName, lastName, username });
        
        // Always prioritize full name if available, otherwise use username
        if (firstName && lastName) {
          return `${firstName} ${lastName}`;
        } else if (firstName) {
          return firstName;
        } else if (lastName) {
          return lastName;
        } else {
          return username;
        }
      } else {
        // If authenticated but no user data, try to get from token
        const token = this.authService.getToken();
        if (token) {
          try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const username = payload.sub || payload.username || payload.preferred_username || 'Utilisateur';
            console.log('🔍 Username from token:', username);
            return username;
          } catch (error) {
            console.error('❌ Error parsing token:', error);
            return 'Utilisateur';
          }
        }
        return 'Utilisateur';
      }
    }
    
    return 'Utilisateur';
  }

  // Convert Product to ProductCard for the product-card component
  mapToProductCard(product: Product): ProductCard {
    return {
      id: product.id,
      name: product.name,
      price: product.displayedPrice,
      originalPrice: product.supplierPrice && product.supplierPrice > product.displayedPrice ? product.supplierPrice : undefined,
      imageUrl: product.imageUrls?.[0],
      description: product.description,
      inStock: (product.syncedStock ?? 0) > 0,
      stockQuantity: product.syncedStock ?? 0,
      category: product.categoryName,
      slug: product.id.toString()
    };
  }
}