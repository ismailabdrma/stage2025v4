import { Component, inject, OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms"
import { RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { Store } from "@ngrx/store"
import type { Observable } from "rxjs"
import { AuthActions } from "@core/store/auth/auth.actions"
import { selectAuthLoading, selectAuthError, selectAuthMessage } from "@core/store/auth/auth.selectors"

@Component({
  selector: "app-reset-password",
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
  ],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.scss",
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder)
  private store = inject(Store)
  private snackBar = inject(MatSnackBar)

  // Step-based approach: 1 = verify OTP, 2 = new password
  currentStep = 1
  email = ""
  
  otpForm: FormGroup
  passwordForm: FormGroup
  hidePassword = true
  hideConfirmPassword = true
  loading$: Observable<boolean> = this.store.select(selectAuthLoading)
  error$: Observable<string | null> = this.store.select(selectAuthError);
  message$: Observable<string | null> = this.store.select(selectAuthMessage);

  constructor() {
    // Step 1: OTP verification
    this.otpForm = this.fb.group({
      otp: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
    })
    
    // Step 2: New password
    this.passwordForm = this.fb.group(
      {
        newPassword: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]],
      },
      { validators: this.passwordMatchValidator },
    )
  }

  ngOnInit(): void {
    // Get email from query params (from forgot password page)
    this.email = new URLSearchParams(window.location.search).get('email') || ''
    
    this.message$.subscribe(message => {
      if (message) {
        this.snackBar.open(message, "Close", { duration: 5000 });
      }
    });

    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(error, "Close", { duration: 5000 });
      }
    });
  }


  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get("newPassword")
    const confirmPassword = form.get("confirmPassword")

    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ mismatch: true })
    } else {
      confirmPassword?.setErrors(null)
    }

    return null
  }

  verifyOtp(): void {
    if (this.otpForm.valid) {
      // In a real implementation, you would verify the OTP here
      // For now, we'll just proceed to step 2
      this.currentStep = 2
      this.snackBar.open("Code verified! Please enter your new password.", "Close", { duration: 3000 })
    }
  }

  resetPassword(): void {
    if (this.passwordForm.valid) {
      const { newPassword } = this.passwordForm.value
      const otp = this.otpForm.get('otp')?.value
      this.store.dispatch(AuthActions.resetPassword({ email: this.email, otp, newPassword }))
    }
  }

  goBack(): void {
    this.currentStep = 1
  }
}
