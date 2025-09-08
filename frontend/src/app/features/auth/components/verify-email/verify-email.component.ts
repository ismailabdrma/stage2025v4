import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import type { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthActions } from "@core/store/auth/auth.actions";
import { selectAuthLoading, selectAuthMessage, selectAuthError } from "@core/store/auth/auth.selectors";

@Component({
  selector: "app-verify-email",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: "./verify-email.component.html",
  styleUrl: "./verify-email.component.scss",
})
export class VerifyEmailComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  verifyForm: FormGroup;
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  message$: Observable<string | null> = this.store.select(selectAuthMessage);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  userEmail: string = '';
  emailReadonly: boolean = false;

  constructor() {
    this.verifyForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      otp: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  }

  ngOnInit() {
    console.log('🔍 VerifyEmailComponent ngOnInit called');
    console.log('🔍 Current URL:', window.location.href);
    
    // Clear any prior auth UI state (e.g., signup success message) to avoid unintended redirects
    this.store.dispatch(AuthActions.resetAuthUI());

    this.route.queryParams.subscribe(params => {
      console.log('🔍 Query params:', params);
      if (params["email"]) {
        this.userEmail = params["email"];
        this.emailReadonly = true;
        this.verifyForm.patchValue({ email: params["email"] });
        this.verifyForm.get('email')?.disable(); // Disable email field if passed from signup
        console.log('🔍 Email set from params:', params["email"]);
      }
    });

    this.message$.pipe(
        tap(message => {
          if (message) {
            console.log('🔍 Message received:', message);
            this.snackBar.open(message, "Close", { duration: 5000 });
            // Do not navigate here; global effect handles redirect after successful verification
          }
        })
    ).subscribe();

    this.error$.subscribe(error => {
      if (error) {
        console.log('🔍 Error received:', error);
        this.snackBar.open(error, "Close", { duration: 5000 });
      }
    });
  }

  onSubmit(): void {
    if (this.verifyForm.valid) {
      // Include email even if disabled
      const verifyData = {
        email: this.userEmail || this.verifyForm.get('email')?.value,
        otp: this.verifyForm.get('otp')?.value
      };
      console.log('Dispatching verifyEmail action with data:', verifyData);
      this.store.dispatch(AuthActions.verifyEmail({ request: verifyData }));
    } else {
      console.log('Form is invalid:', this.verifyForm.errors);
    }
  }

  resendCode(): void {
    const email = this.userEmail || this.verifyForm.get("email")?.value;
    if (email) {
      this.store.dispatch(AuthActions.resendOTP({ email, otpType: "REGISTRATION" }));
    }
  }

  goToLogin(): void {
    console.log('🔍 Manual navigation to login clicked');
    this.router.navigate(["/auth/login"], { replaceUrl: true });
  }
}