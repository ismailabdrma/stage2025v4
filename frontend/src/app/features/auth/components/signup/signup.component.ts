import { Component, inject, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, Validators, type FormGroup, ReactiveFormsModule } from "@angular/forms"
import { RouterModule, Router } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatSelectModule } from "@angular/material/select"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { AuthActions } from "@core/store/auth/auth.actions"
import { selectAuthLoading, selectAuthMessage, selectAuthError } from "@core/store/auth/auth.selectors"

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: "./signup.component.html",
  styleUrl: "./signup.component.scss",
})
export class SignupComponent implements OnInit {
  private fb = inject(FormBuilder)
  private store = inject(Store)
  private router = inject(Router)
  private snackBar = inject(MatSnackBar)

  signupForm: FormGroup
  hidePassword = true
  hideConfirmPassword = true
  loading$: Observable<boolean> = this.store.select(selectAuthLoading)
  message$: Observable<string | null> = this.store.select(selectAuthMessage)
  error$: Observable<string | null> = this.store.select(selectAuthError)

  constructor() {
    this.signupForm = this.fb.group({
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.message$.subscribe((message) => {
      if (message) {
        this.snackBar.open(message, "Close", { duration: 5000 })
        // If signup successful, redirect to email verification with email
        if (message.includes("successful") || message.includes("created")) {
          setTimeout(() => {
            this.router.navigate(["/auth/verify-email"], {
              queryParams: { email: this.signupForm.get('email')?.value }
            });
          }, 2000);
        }
      }
    })

    this.error$.subscribe((error) => {
      if (error) {
        this.snackBar.open(error, "Close", { duration: 5000 })
      }
    })
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      // Don't send role field - backend automatically sets it to CLIENT
      // Only send fields that exist in the form and are not empty
      const signupData: any = {
        username: this.signupForm.get('username')?.value,
        email: this.signupForm.get('email')?.value,
        password: this.signupForm.get('password')?.value
      }
      
      // Only add optional fields if they exist in the form and have values
      const firstName = this.signupForm.get('firstName')?.value;
      if (firstName && firstName.trim()) {
        signupData.firstName = firstName;
      }
      
      const lastName = this.signupForm.get('lastName')?.value;
      if (lastName && lastName.trim()) {
        signupData.lastName = lastName;
      }
      
      const phone = this.signupForm.get('phone')?.value;
      if (phone && phone.trim()) {
        signupData.phone = phone;
      }
      
      // Store email for effects-based redirect safeguard
      const email = this.signupForm.get('email')?.value
      if (email) {
        sessionStorage.setItem('signup_email', email)
      }
      console.log('🔍 Sending signup data:', signupData);
      this.store.dispatch(AuthActions.signup({ request: signupData }))
    }
  }
}