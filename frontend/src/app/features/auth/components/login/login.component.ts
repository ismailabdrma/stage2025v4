import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, type FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import {Router, ActivatedRoute, RouterLink} from "@angular/router";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Store } from "@ngrx/store";
import type { Observable } from "rxjs";
import { AuthActions } from "@core/store/auth/auth.actions";
import { selectAuthLoading, selectAuthError, selectAuthMessage } from "@core/store/auth/auth.selectors";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    RouterLink,
  ],
  template: `
    <div class="auth-container">
      <div class="auth-content">
        <div class="auth-header">
          <h1>Connexion</h1>
          <p class="subtitle">Connectez-vous à votre compte</p>
        </div>
        
        <mat-card class="auth-card">
          <mat-card-content>
            <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Nom d'utilisateur ou Email</mat-label>
                <input matInput formControlName="identifier" required />
                <mat-icon matPrefix>person</mat-icon>
                <mat-error *ngIf="loginForm.get('identifier')?.hasError('required')">
                  Le nom d'utilisateur ou l'email est requis
                </mat-error>
              </mat-form-field>
              
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Mot de passe</mat-label>
                <input
                  matInput
                  [type]="hidePassword ? 'password' : 'text'"
                  formControlName="password"
                  required
                />
                <mat-icon matPrefix>lock</mat-icon>
                <button
                  mat-icon-button
                  matSuffix
                  (click)="hidePassword = !hidePassword"
                  type="button"
                >
                  <mat-icon>{{ hidePassword ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
                  Le mot de passe est requis
                </mat-error>
              </mat-form-field>
              
              <button
                mat-raised-button
                color="primary"
                type="submit"
                class="login-btn"
                [disabled]="loginForm.invalid || (loading$ | async)"
              >
                <mat-spinner diameter="20" *ngIf="loading$ | async"></mat-spinner>
                <span *ngIf="!(loading$ | async)">Se connecter</span>
              </button>
            </form>
            
            <div class="auth-links">
              <a mat-button routerLink="/auth/forgot-password" class="link-btn">
                Mot de passe oublié ?
              </a>
              <span class="divider">•</span>
              <a mat-button routerLink="/auth/signup" class="link-btn">
                Créer un compte
              </a>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .auth-container { 
      min-height: calc(100vh - 140px); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      padding: 24px; 
      background: linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%); 
    }

    .auth-content { 
      width: 100%; 
      max-width: 400px; 
    }

    .auth-header { 
      text-align: center; 
      margin-bottom: 32px; 
    }
    .auth-header h1 { 
      font-size: 2rem; 
      font-weight: 700; 
      color: #1B1B1B; 
      margin: 0 0 8px; 
    }
    .auth-header .subtitle { 
      color: #6A6A6A; 
      margin: 0; 
      font-size: 1rem; 
    }

    .auth-card { 
      border-radius: 12px; 
      box-shadow: 0 4px 24px rgba(0,0,0,0.08); 
      overflow: hidden; 
    }

    .login-form { 
      display: flex; 
      flex-direction: column; 
      gap: 24px; 
      margin-bottom: 24px; 
    }

    .full-width { 
      width: 100%; 
    }

    .login-btn { 
      background: #FFEA00; 
      color: #1B1B1B; 
      font-weight: 700; 
      border-radius: 12px; 
      height: 48px; 
      font-size: 16px; 
    }
    .login-btn:disabled { 
      background: #E0E0E0; 
      color: #9E9E9E; 
    }

    .auth-links { 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      gap: 16px; 
      padding-top: 16px; 
      border-top: 1px solid rgba(0,0,0,0.08); 
    }
    .link-btn { 
      color: #1B1B1B; 
      font-weight: 500; 
      text-decoration: none; 
    }
    .link-btn:hover { 
      color: #FFEA00; 
      background: transparent; 
    }
    .divider { 
      color: #6A6A6A; 
      font-size: 12px; 
    }

    @media (max-width: 480px) {
      .auth-container { 
        padding: 16px; 
      }
      .auth-header h1 { 
        font-size: 1.75rem; 
      }
      .auth-links { 
        flex-direction: column; 
        gap: 8px; 
      }
      .divider { 
        display: none; 
      }
    }
  `],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private snackBar = inject(MatSnackBar);

  loginForm: FormGroup;
  hidePassword = true;

  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);
  message$: Observable<string | null> = this.store.select(selectAuthMessage);

  constructor() {
    this.loginForm = this.fb.group({
      identifier: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.store.dispatch(AuthActions.resetAuthUI());
    this.route.queryParams.subscribe(params => {
      if (params["email"]) {
        this.loginForm.patchValue({ identifier: params["email"] });
      }
    });

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

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ request: formValue }));
      // TODO: Intelligent redirection after successful login or requiring OTP is handled in NgRx effects
    }
  }
}
