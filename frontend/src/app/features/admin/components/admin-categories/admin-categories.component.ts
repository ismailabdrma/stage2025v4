import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from '@core/services/category.service';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  template: `
  <div class="admin-categories">
    <h2>Categories</h2>

    <div class="create-row">
      <mat-form-field appearance="outline">
        <mat-label>Name</mat-label>
        <input matInput [(ngModel)]="newName" />
      </mat-form-field>
      <mat-form-field appearance="outline">
        <mat-label>Description</mat-label>
        <input matInput [(ngModel)]="newDesc" />
      </mat-form-field>
      <button mat-raised-button color="primary" (click)="create()">Add</button>
    </div>

    <table mat-table [dataSource]="rows" class="mat-elevation-z1">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let r">
          <input [(ngModel)]="r.name" />
        </td>
      </ng-container>

      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Description</th>
        <td mat-cell *matCellDef="let r">
          <input [(ngModel)]="r.description" />
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let r">
          <button mat-icon-button color="primary" (click)="update(r)"><mat-icon>save</mat-icon></button>
          <button mat-icon-button color="warn" (click)="remove(r)"><mat-icon>delete</mat-icon></button>
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="cols"></tr>
      <tr mat-row *matRowDef="let row; columns: cols;"></tr>
    </table>
  </div>
  `,
  styles: [`
    .admin-categories { padding: 16px; }
    .create-row { display: flex; gap: 12px; align-items: center; margin-bottom: 16px; }
    table { width: 100%; }
    td input { width: 100%; }
  `]
})
export class AdminCategoriesComponent implements OnInit {
  private service = inject(CategoryService);
  private snack = inject(MatSnackBar);

  rows: any[] = [];
  cols = ['name', 'description', 'actions'];
  newName = '';
  newDesc = '';

  ngOnInit(): void { this.load(); }

  load(): void {
    this.service.getCategories().subscribe({ next: (data) => this.rows = data });
  }

  create(): void {
    if (!this.newName.trim()) { return; }
    this.service.createCategory({ name: this.newName, description: this.newDesc, active: true }).subscribe({
      next: () => { this.snack.open('Category created', 'Close', { duration: 2000 }); this.newName=''; this.newDesc=''; this.load(); },
      error: () => this.snack.open('Failed to create category', 'Close', { duration: 3000 })
    });
  }

  update(r: any): void {
    this.service.updateCategory(r.id, { name: r.name, description: r.description, active: true }).subscribe({
      next: () => this.snack.open('Category updated', 'Close', { duration: 2000 }),
      error: () => this.snack.open('Failed to update category', 'Close', { duration: 3000 })
    });
  }

  remove(r: any): void {
    this.service.deleteCategory(r.id).subscribe({
      next: () => { this.snack.open('Category deleted', 'Close', { duration: 2000 }); this.load(); },
      error: () => this.snack.open('Failed to delete category', 'Close', { duration: 3000 })
    });
  }
}