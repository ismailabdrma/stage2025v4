import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { AuthActions } from "@core/store/auth/auth.actions";
import { selectAuthError, selectAuthLoading } from "@core/store/auth/auth.selectors";

@Component({
    selector: "app-verify-otp",
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSnackBarModule,
        MatProgressSpinnerModule
    ],
    template: `
    <div class="otp-container">
      <h2>Vérification de connexion</h2>
      <p class="subtitle">Un code de vérification a été envoyé à {{ email }}</p>
      <form [formGroup]="otpForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Code de vérification</mat-label>
          <input matInput formControlName="otp" maxlength="6" placeholder="123456">
          <mat-error *ngIf="otpForm.get('otp')?.hasError('required')">
            Le code de vérification est requis
          </mat-error>
          <mat-error *ngIf="otpForm.get('otp')?.hasError('pattern')">
            Le code doit contenir 6 chiffres
          </mat-error>
        </mat-form-field>

        <button mat-raised-button color="primary" type="submit" [disabled]="otpForm.invalid || (loading$ | async)" class="verify-btn">
          <mat-spinner diameter="20" *ngIf="loading$ | async"></mat-spinner>
          <span *ngIf="!(loading$ | async)">Vérifier et se connecter</span>
        </button>
        
        <div class="resend-section">
          <button mat-button type="button" (click)="resendOtp()" [disabled]="loading$ | async">
            Renvoyer le code
          </button>
        </div>
      </form>
    </div>
  `,
    styles: [`
    .otp-container {
      padding: 20px;
      max-width: 400px;
      margin: 40px auto;
      text-align: center;
    }
    .subtitle {
      color: #666;
      margin-bottom: 24px;
      font-size: 14px;
    }
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }
    .verify-btn {
      width: 100%;
      margin-bottom: 16px;
      background: #FFEA00;
      color: #1B1B1B;
      font-weight: 700;
    }
    .resend-section {
      margin-top: 16px;
    }
  `],
})
export class VerifyOtpComponent implements OnInit {
    private fb = inject(FormBuilder);
    private route = inject(ActivatedRoute);
    private store = inject(Store);
    private snackBar = inject(MatSnackBar);
    private router = inject(Router);

    otpForm: FormGroup;
    loading$: Observable<boolean> = this.store.select(selectAuthLoading);
    error$: Observable<string | null> = this.store.select(selectAuthError);

    email: string = "";

    constructor() {
        this.otpForm = this.fb.group({
            otp: ["", [Validators.required, Validators.pattern(/^\d{6}$/)]],
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.email = params["email"];
        });

        this.error$.subscribe(error => {
            if (error) {
                this.snackBar.open(error, "Close", { duration: 4000 });
            }
        });
    }

    onSubmit(): void {
        if (this.otpForm.valid) {
            console.log('Submitting OTP verification for login');
            this.store.dispatch(AuthActions.loginVerifyOTP({
                request: {
                    email: this.email,
                    otp: this.otpForm.value.otp
                }
            }));
        }
    }

    resendOtp(): void {
        if (this.email) {
            console.log('Resending OTP for login');
            this.store.dispatch(AuthActions.resendOTP({ email: this.email, otpType: "LOGIN" }));
        }
    }
}
