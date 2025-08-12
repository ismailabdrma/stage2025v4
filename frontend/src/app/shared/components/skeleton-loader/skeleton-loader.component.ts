import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton" [class]="'skeleton-' + type" [style.height.px]="height" [style.width.px]="width">
      <div class="skeleton-shimmer"></div>
    </div>
  `,
  styles: [`
    .skeleton {
      position: relative;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .skeleton-shimmer {
      position: absolute;
      top: 0;
      left: -100%;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.6),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .skeleton-text {
      height: 16px;
      border-radius: 2px;
    }

    .skeleton-title {
      height: 24px;
      border-radius: 4px;
    }

    .skeleton-image {
      border-radius: 8px;
    }

    .skeleton-button {
      height: 36px;
      border-radius: 18px;
    }

    .skeleton-card {
      border-radius: 12px;
    }

    .skeleton-circle {
      border-radius: 50%;
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() type: 'text' | 'title' | 'image' | 'button' | 'card' | 'circle' = 'text'
  @Input() height: number = 16
  @Input() width: number | undefined = undefined
}

// Product Card Skeleton
@Component({
  selector: 'app-product-card-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent],
  template: `
    <div class="product-card-skeleton">
      <app-skeleton-loader type="image" [height]="200" class="image-skeleton"></app-skeleton-loader>
      <div class="content-skeleton">
        <app-skeleton-loader type="title" [height]="20" class="title-skeleton"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="14" [width]="120" class="price-skeleton"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="12" [width]="80" class="rating-skeleton"></app-skeleton-loader>
        <app-skeleton-loader type="button" [height]="36" class="button-skeleton"></app-skeleton-loader>
      </div>
    </div>
  `,
  styles: [`
    .product-card-skeleton {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      overflow: hidden;
      background: white;
    }

    .image-skeleton {
      width: 100%;
    }

    .content-skeleton {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .title-skeleton {
      width: 100%;
    }

    .price-skeleton {
      margin-top: 4px;
    }

    .rating-skeleton {
      margin-bottom: 8px;
    }

    .button-skeleton {
      width: 100%;
    }
  `]
})
export class ProductCardSkeletonComponent {}

// Product Detail Skeleton
@Component({
  selector: 'app-product-detail-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent],
  template: `
    <div class="product-detail-skeleton">
      <div class="gallery-skeleton">
        <app-skeleton-loader type="image" [height]="400" class="main-image"></app-skeleton-loader>
        <div class="thumbnail-skeletons">
          <app-skeleton-loader 
            type="image" 
            [height]="60" 
            [width]="60" 
            *ngFor="let thumb of [1,2,3,4]">
          </app-skeleton-loader>
        </div>
      </div>
      <div class="details-skeleton">
        <app-skeleton-loader type="title" [height]="32" class="product-title"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="16" [width]="150" class="brand"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="20" [width]="100" class="price"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="14" [width]="120" class="rating"></app-skeleton-loader>
        
        <div class="variant-skeletons">
          <app-skeleton-loader type="text" [height]="14" [width]="60" class="variant-label"></app-skeleton-loader>
          <div class="variant-options">
            <app-skeleton-loader 
              type="button" 
              [height]="36" 
              [width]="60" 
              *ngFor="let option of [1,2,3]">
            </app-skeleton-loader>
          </div>
        </div>

        <div class="action-skeletons">
          <app-skeleton-loader type="button" [height]="48" [width]="120" class="quantity"></app-skeleton-loader>
          <app-skeleton-loader type="button" [height]="48" class="add-to-cart"></app-skeleton-loader>
          <app-skeleton-loader type="button" [height]="48" class="buy-now"></app-skeleton-loader>
        </div>

        <div class="description-skeleton">
          <app-skeleton-loader type="title" [height]="18" [width]="120" class="desc-title"></app-skeleton-loader>
          <app-skeleton-loader type="text" [height]="14" *ngFor="let line of [1,2,3,4,5]" class="desc-line"></app-skeleton-loader>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-skeleton {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 20px;
    }

    .gallery-skeleton {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .main-image {
      width: 100%;
    }

    .thumbnail-skeletons {
      display: flex;
      gap: 8px;
    }

    .details-skeleton {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .variant-skeletons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 16px 0;
    }

    .variant-options {
      display: flex;
      gap: 8px;
    }

    .action-skeletons {
      display: flex;
      gap: 12px;
      align-items: center;
      margin: 24px 0;
    }

    .add-to-cart, .buy-now {
      flex: 1;
    }

    .description-skeleton {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .desc-line {
      width: 100%;
    }

    .desc-line:last-child {
      width: 70%;
    }

    @media (max-width: 768px) {
      .product-detail-skeleton {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 16px;
      }

      .action-skeletons {
        flex-direction: column;
      }
    }
  `]
})
export class ProductDetailSkeletonComponent {}

// Search Results Skeleton
@Component({
  selector: 'app-search-results-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent, ProductCardSkeletonComponent],
  template: `
    <div class="search-results-skeleton">
      <div class="filters-skeleton">
        <app-skeleton-loader type="title" [height]="20" [width]="80" class="filter-title"></app-skeleton-loader>
        <div class="filter-groups" *ngFor="let group of [1,2,3,4]">
          <app-skeleton-loader type="text" [height]="16" [width]="100" class="filter-group-title"></app-skeleton-loader>
          <div class="filter-options">
            <app-skeleton-loader type="text" [height]="14" [width]="80" *ngFor="let option of [1,2,3]"></app-skeleton-loader>
          </div>
        </div>
      </div>
      <div class="results-skeleton">
        <div class="results-header">
          <app-skeleton-loader type="text" [height]="18" [width]="200" class="results-count"></app-skeleton-loader>
          <app-skeleton-loader type="button" [height]="36" [width]="120" class="sort-button"></app-skeleton-loader>
        </div>
        <div class="products-grid">
          <app-product-card-skeleton *ngFor="let card of [1,2,3,4,5,6,7,8,9,12]"></app-product-card-skeleton>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-results-skeleton {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 24px;
      padding: 20px;
    }

    .filters-skeleton {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .filter-groups {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-options {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-left: 12px;
    }

    .results-skeleton {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    @media (max-width: 768px) {
      .search-results-skeleton {
        grid-template-columns: 1fr;
        padding: 16px;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }
    }
  `]
})
export class SearchResultsSkeletonComponent {}

import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton" [class]="'skeleton-' + type" [style.height.px]="height" [style.width.px]="width">
      <div class="skeleton-shimmer"></div>
    </div>
  `,
  styles: [`
    .skeleton {
      position: relative;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
    }

    .skeleton-shimmer {
      position: absolute;
      top: 0;
      left: -100%;
      height: 100%;
      width: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.6),
        transparent
      );
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .skeleton-text {
      height: 16px;
      border-radius: 2px;
    }

    .skeleton-title {
      height: 24px;
      border-radius: 4px;
    }

    .skeleton-image {
      border-radius: 8px;
    }

    .skeleton-button {
      height: 36px;
      border-radius: 18px;
    }

    .skeleton-card {
      border-radius: 12px;
    }

    .skeleton-circle {
      border-radius: 50%;
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() type: 'text' | 'title' | 'image' | 'button' | 'card' | 'circle' = 'text'
  @Input() height: number = 16
  @Input() width: number | undefined = undefined
}

// Product Card Skeleton
@Component({
  selector: 'app-product-card-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent],
  template: `
    <div class="product-card-skeleton">
      <app-skeleton-loader type="image" [height]="200" class="image-skeleton"></app-skeleton-loader>
      <div class="content-skeleton">
        <app-skeleton-loader type="title" [height]="20" class="title-skeleton"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="14" [width]="120" class="price-skeleton"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="12" [width]="80" class="rating-skeleton"></app-skeleton-loader>
        <app-skeleton-loader type="button" [height]="36" class="button-skeleton"></app-skeleton-loader>
      </div>
    </div>
  `,
  styles: [`
    .product-card-skeleton {
      border: 1px solid #e0e0e0;
      border-radius: 12px;
      overflow: hidden;
      background: white;
    }

    .image-skeleton {
      width: 100%;
    }

    .content-skeleton {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .title-skeleton {
      width: 100%;
    }

    .price-skeleton {
      margin-top: 4px;
    }

    .rating-skeleton {
      margin-bottom: 8px;
    }

    .button-skeleton {
      width: 100%;
    }
  `]
})
export class ProductCardSkeletonComponent {}

// Product Detail Skeleton
@Component({
  selector: 'app-product-detail-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent],
  template: `
    <div class="product-detail-skeleton">
      <div class="gallery-skeleton">
        <app-skeleton-loader type="image" [height]="400" class="main-image"></app-skeleton-loader>
        <div class="thumbnail-skeletons">
          <app-skeleton-loader 
            type="image" 
            [height]="60" 
            [width]="60" 
            *ngFor="let thumb of [1,2,3,4]">
          </app-skeleton-loader>
        </div>
      </div>
      <div class="details-skeleton">
        <app-skeleton-loader type="title" [height]="32" class="product-title"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="16" [width]="150" class="brand"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="20" [width]="100" class="price"></app-skeleton-loader>
        <app-skeleton-loader type="text" [height]="14" [width]="120" class="rating"></app-skeleton-loader>
        
        <div class="variant-skeletons">
          <app-skeleton-loader type="text" [height]="14" [width]="60" class="variant-label"></app-skeleton-loader>
          <div class="variant-options">
            <app-skeleton-loader 
              type="button" 
              [height]="36" 
              [width]="60" 
              *ngFor="let option of [1,2,3]">
            </app-skeleton-loader>
          </div>
        </div>

        <div class="action-skeletons">
          <app-skeleton-loader type="button" [height]="48" [width]="120" class="quantity"></app-skeleton-loader>
          <app-skeleton-loader type="button" [height]="48" class="add-to-cart"></app-skeleton-loader>
          <app-skeleton-loader type="button" [height]="48" class="buy-now"></app-skeleton-loader>
        </div>

        <div class="description-skeleton">
          <app-skeleton-loader type="title" [height]="18" [width]="120" class="desc-title"></app-skeleton-loader>
          <app-skeleton-loader type="text" [height]="14" *ngFor="let line of [1,2,3,4,5]" class="desc-line"></app-skeleton-loader>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .product-detail-skeleton {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      padding: 20px;
    }

    .gallery-skeleton {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .main-image {
      width: 100%;
    }

    .thumbnail-skeletons {
      display: flex;
      gap: 8px;
    }

    .details-skeleton {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .variant-skeletons {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 16px 0;
    }

    .variant-options {
      display: flex;
      gap: 8px;
    }

    .action-skeletons {
      display: flex;
      gap: 12px;
      align-items: center;
      margin: 24px 0;
    }

    .add-to-cart, .buy-now {
      flex: 1;
    }

    .description-skeleton {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .desc-line {
      width: 100%;
    }

    .desc-line:last-child {
      width: 70%;
    }

    @media (max-width: 768px) {
      .product-detail-skeleton {
        grid-template-columns: 1fr;
        gap: 20px;
        padding: 16px;
      }

      .action-skeletons {
        flex-direction: column;
      }
    }
  `]
})
export class ProductDetailSkeletonComponent {}

// Search Results Skeleton
@Component({
  selector: 'app-search-results-skeleton',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent, ProductCardSkeletonComponent],
  template: `
    <div class="search-results-skeleton">
      <div class="filters-skeleton">
        <app-skeleton-loader type="title" [height]="20" [width]="80" class="filter-title"></app-skeleton-loader>
        <div class="filter-groups" *ngFor="let group of [1,2,3,4]">
          <app-skeleton-loader type="text" [height]="16" [width]="100" class="filter-group-title"></app-skeleton-loader>
          <div class="filter-options">
            <app-skeleton-loader type="text" [height]="14" [width]="80" *ngFor="let option of [1,2,3]"></app-skeleton-loader>
          </div>
        </div>
      </div>
      <div class="results-skeleton">
        <div class="results-header">
          <app-skeleton-loader type="text" [height]="18" [width]="200" class="results-count"></app-skeleton-loader>
          <app-skeleton-loader type="button" [height]="36" [width]="120" class="sort-button"></app-skeleton-loader>
        </div>
        <div class="products-grid">
          <app-product-card-skeleton *ngFor="let card of [1,2,3,4,5,6,7,8,9,12]"></app-product-card-skeleton>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .search-results-skeleton {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 24px;
      padding: 20px;
    }

    .filters-skeleton {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .filter-groups {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .filter-options {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin-left: 12px;
    }

    .results-skeleton {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .results-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }

    @media (max-width: 768px) {
      .search-results-skeleton {
        grid-template-columns: 1fr;
        padding: 16px;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
      }
    }
  `]
})
export class SearchResultsSkeletonComponent {}









