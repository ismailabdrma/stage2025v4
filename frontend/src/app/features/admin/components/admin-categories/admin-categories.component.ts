import { Component, type OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '@core/services/category.service'; // Using CategoryService for categories
import type { Category } from '@core/models/product.model';
import { CategoryDialogComponent } from '../category-dialog/category-dialog.component';

import { ConfirmDialogComponent } from '@shared/components/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
  ],
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.scss',
})
export class AdminCategoriesComponent implements OnInit {
  private categoryService = inject(CategoryService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  categories: Category[] = [];
  filtered: Category[] = [];
  loading = true;
  displayedColumns: string[] = ['name', 'actions'];

  // Search & pagination
  searchTerm = '';
  pageIndex = 0;
  pageSize = 10;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading = true;
    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
        this.applyFilter();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading categories:', error);
        this.snackBar.open('Failed to load categories.', 'Close', { duration: 3000 });
        this.loading = false;
      },
    });
  }

  applyFilter(): void {
    const term = this.searchTerm.toLowerCase().trim();
    this.filtered = this.categories.filter(c => !term || c.name.toLowerCase().includes(term));
    this.pageIndex = 0;
  }

  onPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get paged(): Category[] {
    const start = this.pageIndex * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  openCategoryDialog(category?: Category): void {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: category, // Pass category data for editing
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.id) {
          this.snackBar.open('Category updated successfully!', 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('Category added successfully!', 'Close', { duration: 3000 });
        }
        this.loadCategories();
      }
    });
  }

  editCategory(category: Category): void {
    this.openCategoryDialog(category);
  }

  deleteCategory(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this category?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.categoryService.deleteCategory(id).subscribe({
          next: () => {
            this.snackBar.open('Category deleted successfully!', 'Close', { duration: 3000 });
            this.loadCategories();
          },
          error: (error) => {
            console.error('Error deleting category:', error);
            this.snackBar.open('Failed to delete category.', 'Close', { duration: 3000 });
          },
        });
      }
    });
  }
}