import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { UserManagementService, UserManagement } from '@core/services/user-management.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatTableModule, MatButtonModule, MatIconModule,
    MatCardModule, MatChipsModule, MatCheckboxModule, MatFormFieldModule,
    MatInputModule, MatSelectModule
  ],
  template: `
    <div class="admin-users-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>User Management</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div class="controls">
            <mat-form-field>
              <input matInput [(ngModel)]="searchTerm" placeholder="Search users..." (input)="applyFilters()">
            </mat-form-field>
            <button mat-raised-button color="primary" (click)="refreshUsers()">Refresh</button>
          </div>

          <table mat-table [dataSource]="filteredUsers">
            <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                <mat-checkbox (change)="masterToggle()" [checked]="isAllSelected()"></mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let user">
                <mat-checkbox (change)="selection.toggle(user)" [checked]="selection.isSelected(user)"></mat-checkbox>
              </td>
            </ng-container>

            <ng-container matColumnDef="user">
              <th mat-header-cell *matHeaderCellDef>User</th>
              <td mat-cell *matCellDef="let user">
                <strong>{{ user.firstName }} {{ user.lastName }}</strong><br>
                <small>{{ user.email }}</small>
              </td>
            </ng-container>

            <ng-container matColumnDef="role">
              <th mat-header-cell *matHeaderCellDef>Role</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [color]="user.role === 'ADMIN' ? 'accent' : 'primary'">{{ user.role }}</mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let user">
                <mat-chip [color]="user.active ? 'primary' : 'warn'">{{ user.active ? 'Active' : 'Suspended' }}</mat-chip>
              </td>
            </ng-container>

            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let user">
                <button mat-icon-button [color]="user.active ? 'warn' : 'primary'" (click)="toggleUserStatus(user)">
                  <mat-icon>{{ user.active ? 'block' : 'check_circle' }}</mat-icon>
                </button>
                <button mat-icon-button color="accent" (click)="changeUserRole(user)">
                  <mat-icon>admin_panel_settings</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="deleteUser(user.id)">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
          </table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .admin-users-container { padding: 20px; }
    .controls { display: flex; gap: 20px; margin-bottom: 20px; align-items: center; }
    table { width: 100%; }
  `]
})
export class AdminUsersComponent implements OnInit {
  private userManagementService = inject(UserManagementService);
  private snackBar = inject(MatSnackBar);

  users: UserManagement[] = [];
  filteredUsers: UserManagement[] = [];
  searchTerm = '';
  selection = new SelectionModel<UserManagement>(true, []);
  displayedColumns = ['select', 'user', 'role', 'status', 'actions'];

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userManagementService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.applyFilters();
      },
      error: () => this.snackBar.open('Error loading users', 'Close', { duration: 3000 })
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user =>
      user.username.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  refreshUsers() {
    this.loadUsers();
  }

  isAllSelected() {
    return this.selection.selected.length === this.filteredUsers.length;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.filteredUsers.forEach(row => this.selection.select(row));
  }

  toggleUserStatus(user: UserManagement) {
    if (user.active) {
      const reason = prompt('Reason for suspension:') || 'Admin action';
      this.userManagementService.suspendUser(user.id, reason).subscribe({
        next: () => {
          this.snackBar.open(`User suspended`, 'Close', { duration: 3000 });
          this.loadUsers();
        }
      });
    } else {
      this.userManagementService.activateUser(user.id).subscribe({
        next: () => {
          this.snackBar.open(`User activated`, 'Close', { duration: 3000 });
          this.loadUsers();
        }
      });
    }
  }

  changeUserRole(user: UserManagement) {
    const newRole = user.role === 'ADMIN' ? 'CLIENT' : 'ADMIN';
    if (confirm(`Change role to ${newRole}?`)) {
      this.userManagementService.changeUserRole(user.id, newRole).subscribe({
        next: () => {
          this.snackBar.open(`Role changed`, 'Close', { duration: 3000 });
          this.loadUsers();
        }
      });
    }
  }

  deleteUser(userId: number) {
    if (confirm('Delete this user permanently?')) {
      this.userManagementService.deleteUser(userId).subscribe({
        next: () => {
          this.snackBar.open('User deleted', 'Close', { duration: 3000 });
          this.loadUsers();
        }
      });
    }
  }
}