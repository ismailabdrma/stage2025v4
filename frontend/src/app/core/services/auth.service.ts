import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import type { Observable } from "rxjs"
import { BehaviorSubject, map } from "rxjs"
import { environment } from "@environments/environment"
import type { LoginRequest, SignupRequest, OtpVerifyRequest, JwtResponse, User } from "../models/user.model"

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient)
  private apiUrl = `${environment.apiUrl}/api/auth`
  
  // Add observable for authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken())
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  signup(request: SignupRequest): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/signup`, request).pipe(
      map((resp: any) => (resp && typeof resp === 'object' ? resp.message : resp) || 'Registration successful')
    )
  }

  verifyEmail(request: OtpVerifyRequest): Observable<string> {
    return this.http.post<any>(`${this.apiUrl}/verify-email`, request).pipe(
      map((resp: any) => (resp && typeof resp === 'object' ? resp.message : resp) || 'Email verified successfully')
    )
  }

  // Update login method to handle OTP/admin JSON responses correctly
  login(request: any): Observable<any> {
    // Map frontend 'identifier' to backend 'username'
    const loginRequest = {
      username: request.identifier || request.username,
      password: request.password
    };
    return this.http.post<any>(`${this.apiUrl}/login`, loginRequest).pipe(
      map((response: any) => {
        // Backend may return ApiResponse with status: 'OTP_REQUIRED'
        if (response && (response.status === 'OTP_REQUIRED' || response?.status?.toUpperCase?.() === 'OTP_REQUIRED')) {
          return { status: 'OTP_REQUIRED' };
        }
        // Admin path returns JwtResponse { token, ... }
        return response;
      })
    );
  }

  loginVerifyOtp(request: OtpVerifyRequest): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login/verify-otp`, request)
  }

  resendOtp(email: string, type: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/resend-otp`, { email, type })
  }

  forgotPassword(email: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/forgot-password`, { email })
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/reset-password`, {
      email,
      otp,
      newPassword,
    })
  }

  updateUserProfile(user: Partial<User>): Observable<User> {
 return this.http.put<User>(`${environment.apiUrl}/api/users/me`, user);
  }

  changePassword(passwordChangeRequest: any): Observable<any> {
 return this.http.put<any>(`${environment.apiUrl}/api/users/me/password`, passwordChangeRequest);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/api/users/me`)
  }

  logout(): void {
    localStorage.removeItem("token")
    sessionStorage.clear() // Clear any session data
    this.isAuthenticatedSubject.next(false)
  }

  getToken(): string | null {
    return localStorage.getItem("token")
  }

  setToken(token: string): void {
    localStorage.setItem("token", token)
    this.isAuthenticatedSubject.next(true)
  }

  isAuthenticated(): boolean {
    return this.hasValidToken()
  }

  private hasValidToken(): boolean {
    const token = this.getToken()
    if (!token) return false

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const isValid = payload.exp > Date.now() / 1000
      
      if (!isValid) {
        // Token is expired, clean up
        this.logout()
      }
      
      return isValid
    } catch {
      // Token is malformed, clean up
      this.logout()
      return false
    }
  }

  // Method to initialize auth state without making HTTP calls
  initializeAuthState(): boolean {
    const isValid = this.hasValidToken()
    this.isAuthenticatedSubject.next(isValid)
    return isValid
  }

  // Admin User Management Methods
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/api/users`);
  }

  updateUserStatus(id: number, status: boolean): Observable<User> {
    return this.http.put<User>(`${environment.apiUrl}/api/users/${id}/status`, { active: status });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/api/users/${id}`);
  }

  createUser(user: any): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/api/users`, user);
  }
}
