import { Component, Input, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export interface FilterOptions {
  categories: Array<{ id: number; name: string }>;
  suppliers: Array<{ id: number; name: string }>;
  priceRange: { min: number; max: number };
  sortOptions: Array<{ value: string; label: string }>;
}

export interface AppliedFilters {
  search: string;
  category: number | null;
  supplier: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  inStock: boolean;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}

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
    MatExpansionModule,
    MatSliderModule,
    MatCheckboxModule,
    MatDividerModule
  ],
  template: `
    <div class="search-filters-container">
      <!-- Search Bar -->
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

      <!-- Quick Filters -->
      <div class="quick-filters">
        <mat-chip-listbox 
          [formControl]="quickFiltersControl"
          class="filter-chips">
          <mat-chip-option value="inStock">En stock</mat-chip-option>
          <mat-chip-option value="onSale">En promotion</mat-chip-option>
          <mat-chip-option value="new">Nouveautés</mat-chip-option>
        </mat-chip-listbox>
      </div>

      <!-- Advanced Filters -->
      <mat-expansion-panel class="advanced-filters">
        <mat-expansion-panel-header>
          <mat-panel-title>
            <mat-icon>tune</mat-icon>
            Filtres avancés
          </mat-panel-title>
        </mat-expansion-panel-header>

        <form [formGroup]="filtersForm" class="filters-form">
          <div class="filters-grid">
            <!-- Category Filter -->
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

            <!-- Supplier Filter -->
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

            <!-- Price Range -->
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

            <!-- Sort Options -->
            <div class="sort-section">
              <label>Trier par</label>
              <div class="sort-controls">
                <mat-form-field appearance="outline">
                  <mat-label>Critère</mat-label>
                  <mat-select formControlName="sortBy">
                    <mat-option 
                      *ngFor="let option of filterOptions?.sortOptions" 
                      [value]="option.value">
                      {{ option.label }}
                    </mat-option>
                  </mat-select>
                </mat-form-field>
                
                <button 
                  mat-icon-button 
                  [class.active]="filtersForm.get('sortDirection')?.value === 'desc'"
                  (click)="toggleSortDirection()"
                  class="sort-direction-btn">
                  <mat-icon>{{ getSortIcon() }}</mat-icon>
                </button>
              </div>
            </div>
          </div>

          <!-- Filter Actions -->
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

      <!-- Active Filters Display -->
      <div class="active-filters" *ngIf="hasActiveFilters()">
        <h4>Filtres actifs:</h4>
        <div class="active-filter-chips">
          <mat-chip 
            *ngFor="let filter of getActiveFilters()" 
            (removed)="removeFilter(filter.key)"
            removable>
            {{ filter.label }}
            <mat-icon matChipRemove>cancel</mat-icon>
          </mat-chip>
        </div>
      </div>
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

    .search-section {
      margin-bottom: 20px;
    }

    .search-field {
      width: 100%;
    }

    .quick-filters {
      margin-bottom: 20px;
    }

    .filter-chips {
      gap: 8px;
    }

    .advanced-filters {
      margin-bottom: 20px;
    }

    .filters-form {
      padding-top: 16px;
    }

    .filters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .price-range label,
    .sort-section label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #333;
    }

    .price-inputs {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .price-separator {
      font-weight: 500;
      color: #666;
    }

    .sort-controls {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .sort-direction-btn {
      border: 1px solid #ddd;
      transition: all 0.2s ease;
    }

    .sort-direction-btn.active {
      background: #1976d2;
      color: white;
    }

    .filter-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      padding-top: 16px;
      border-top: 1px solid #eee;
    }

    .active-filters {
      margin-top: 20px;
      padding-top: 20px;
      border-top: 1px solid #eee;
    }

    .active-filters h4 {
      margin: 0 0 12px 0;
      font-size: 14px;
      color: #666;
    }

    .active-filter-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    @media (max-width: 768px) {
      .search-filters-container {
        padding: 16px;
      }

      .filters-grid {
        grid-template-columns: 1fr;
        gap: 16px;
      }

      .price-inputs {
        flex-direction: column;
        gap: 8px;
      }

      .filter-actions {
        flex-direction: column;
      }
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

  toggleSortDirection() {
    const currentDirection = this.filtersForm.get('sortDirection')?.value;
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    this.filtersForm.patchValue({ sortDirection: newDirection });
  }

  getSortIcon(): string {
    return this.filtersForm.get('sortDirection')?.value === 'asc' ? 'arrow_upward' : 'arrow_downward';
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

  removeFilter(filterKey: string) {
    switch (filterKey) {
      case 'search':
        this.searchControl.setValue('');
        break;
      case 'category':
        this.filtersForm.patchValue({ category: '' });
        break;
      case 'supplier':
        this.filtersForm.patchValue({ supplier: '' });
        break;
      case 'minPrice':
        this.filtersForm.patchValue({ minPrice: null });
        break;
      case 'maxPrice':
        this.filtersForm.patchValue({ maxPrice: null });
        break;
    }
  }

  hasActiveFilters(): boolean {
    return this.searchControl.value || 
           this.filtersForm.value.category || 
           this.filtersForm.value.supplier ||
           this.filtersForm.value.minPrice ||
           this.filtersForm.value.maxPrice ||
           (this.quickFiltersControl.value && this.quickFiltersControl.value.length > 0);
  }

  getActiveFilters(): Array<{ key: string; label: string }> {
    const filters: Array<{ key: string; label: string }> = [];
    
    if (this.searchControl.value) {
      filters.push({ key: 'search', label: `Recherche: "${this.searchControl.value}"` });
    }
    
    if (this.filtersForm.value.category) {
      const category = this.filterOptions?.categories.find(c => c.id === this.filtersForm.value.category);
      if (category) {
        filters.push({ key: 'category', label: `Catégorie: ${category.name}` });
      }
    }
    
    if (this.filtersForm.value.supplier) {
      const supplier = this.filterOptions?.suppliers.find(s => s.id === this.filtersForm.value.supplier);
      if (supplier) {
        filters.push({ key: 'supplier', label: `Fournisseur: ${supplier.name}` });
      }
    }
    
    if (this.filtersForm.value.minPrice) {
      filters.push({ key: 'minPrice', label: `Prix min: ${this.filtersForm.value.minPrice}€` });
    }
    
    if (this.filtersForm.value.maxPrice) {
      filters.push({ key: 'maxPrice', label: `Prix max: ${this.filtersForm.value.maxPrice}€` });
    }

    return filters;
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
