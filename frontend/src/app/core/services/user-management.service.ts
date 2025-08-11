import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

export interface UserManagement {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'ADMIN' | 'CLIENT';
  active: boolean;
  createdAt: string;
  lastLoginAt?: string;
}

export interface UserStatistics {
  total: number;
  active: number;
  suspended: number;
  admins: number;
  clients: number;
  recentRegistrations: number;
}

export interface BulkUserRequest {
  userIds: number[];
  reason?: string;
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
}

export interface RoleChangeRequest {
  role: 'ADMIN' | 'CLIENT';
}

export interface FilterRequest {
  role?: 'ADMIN' | 'CLIENT';
  active?: boolean;
  registeredAfter?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private api = `${environment.apiUrl}/api/admin/users`;

  constructor(private http: HttpClient) {}

  // Basic CRUD operations
  getAllUsers(): Observable<UserManagement[]> {
    return this.http.get<UserManagement[]>(this.api);
  }

  getUserById(id: number): Observable<UserManagement> {
    return this.http.get<UserManagement>(`${this.api}/${id}`);
  }

  updateUser(id: number, user: UserUpdateRequest): Observable<UserManagement> {
    return this.http.put<UserManagement>(`${this.api}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  // User status management
  suspendUser(id: number, reason: string): Observable<UserManagement> {
    return this.http.put<UserManagement>(`${this.api}/${id}/suspend`, { reason });
  }

  activateUser(id: number): Observable<UserManagement> {
    return this.http.put<UserManagement>(`${this.api}/${id}/activate`, {});
  }

  banUser(id: number, reason: string): Observable<UserManagement> {
    return this.http.put<UserManagement>(`${this.api}/${id}/ban`, { reason });
  }

  unbanUser(id: number): Observable<UserManagement> {
    return this.http.put<UserManagement>(`${this.api}/${id}/unban`, {});
  }

  // Bulk operations
  bulkSuspendUsers(userIds: number[], reason: string): Observable<UserManagement[]> {
    return this.http.put<UserManagement[]>(`${this.api}/bulk/suspend`, { userIds, reason });
  }

  bulkActivateUsers(userIds: number[]): Observable<UserManagement[]> {
    return this.http.put<UserManagement[]>(`${this.api}/bulk/activate`, { userIds });
  }

  bulkDeleteUsers(userIds: number[]): Observable<void> {
    return this.http.delete<void>(`${this.api}/bulk`, { body: { userIds } });
  }

  // Role management
  changeUserRole(id: number, role: 'ADMIN' | 'CLIENT'): Observable<UserManagement> {
    return this.http.put<UserManagement>(`${this.api}/${id}/role`, { role });
  }

  getUsersByRole(role: 'ADMIN' | 'CLIENT'): Observable<UserManagement[]> {
    return this.http.get<UserManagement[]>(`${this.api}/by-role/${role}`);
  }

  // Statistics and filtering
  getUserStatistics(): Observable<UserStatistics> {
    return this.http.get<UserStatistics>(`${this.api}/statistics`);
  }

  getActiveUsers(): Observable<UserManagement[]> {
    return this.http.get<UserManagement[]>(`${this.api}/active`);
  }

  getSuspendedUsers(): Observable<UserManagement[]> {
    return this.http.get<UserManagement[]>(`${this.api}/suspended`);
  }

  getRecentlyRegisteredUsers(days: number = 30): Observable<UserManagement[]> {
    return this.http.get<UserManagement[]>(`${this.api}/recent?days=${days}`);
  }

  // Password management
  resetUserPassword(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.api}/${id}/reset-password`, {});
  }

  forcePasswordChange(id: number): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.api}/${id}/force-password-change`, {});
  }

  // Search and filter
  searchUsers(term: string): Observable<UserManagement[]> {
    return this.http.get<UserManagement[]>(`${this.api}/search?term=${encodeURIComponent(term)}`);
  }

  filterUsers(filters: FilterRequest): Observable<UserManagement[]> {
    return this.http.post<UserManagement[]>(`${this.api}/filter`, filters);
  }
}


