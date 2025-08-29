
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product, Category } from '../../core/models/product.model';
import { AuthService } from '../../core/services/auth.service';
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
  loadingCategories = true;
  loadingFeaturedProducts = true;

  private productService = inject(ProductService);
  private router = inject(Router);
  private authService = inject(AuthService);
  private snackBar = inject(MatSnackBar);
  
  ngOnInit(): void {
    this.loadCategories();
    this.loadFeaturedProducts();
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.hasRole('ADMIN');
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
    this.checkAuthStatus(); // Update auth status
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