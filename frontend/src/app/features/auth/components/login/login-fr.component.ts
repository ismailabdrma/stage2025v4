import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-fr',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="login-wrap">
      <mat-card class="login-card mat-elevation-z4" role="form" aria-label="Connexion à votre compte">
        <h2>Connexion à votre compte</h2>
        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
          <mat-form-field appearance="outline" class="full">
            <mat-label>Email ou Téléphone</mat-label>
            <mat-icon matPrefix>alternate_email</mat-icon>
            <input matInput formControlName="login" required />
          </mat-form-field>

          <mat-form-field appearance="outline" class="full">
            <mat-label>Mot de passe</mat-label>
            <mat-icon matPrefix>lock</mat-icon>
            <input matInput [type]="showPassword ? 'text' : 'password'" formControlName="password" required />
            <button mat-icon-button matSuffix type="button" (click)="toggleShowPassword()" [attr.aria-label]="showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'">
              <mat-icon>{{ showPassword ? 'visibility_off' : 'visibility' }}</mat-icon>
            </button>
          </mat-form-field>

          <div class="row">
            <mat-checkbox formControlName="remember">Se souvenir de moi</mat-checkbox>
            <a routerLink="/auth/forgot" class="link">Mot de passe oublié ?</a>
          </div>

          <button mat-raised-button class="cta" color="primary" [disabled]="form.invalid">Se connecter</button>

          <div class="links">
            <a routerLink="/auth/signup" class="link">Créer un compte</a>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .login-wrap { min-height: calc(100vh - 160px); display:grid; place-items:center; padding: 32px; background: var(--bg,#fff); }
    .login-card { width: min(400px, 100%); padding: 20px 20px 24px; border-radius: 12px; }
    h2 { margin: 4px 0 16px; font-size: 20px; color:#1B1B1B; }
    .full { width: 100%; }
    .row { display:flex; justify-content: space-between; align-items:center; margin: 8px 0 12px; }
    .cta { background: var(--brand-primary,#FFEA00); color:#1B1B1B; font-weight:700; border-radius:12px; width: 100%; padding: 10px 16px; font-size: 16px; }
    .cta:hover { filter: brightness(0.97); }
    .links { display:flex; justify-content: center; gap: 16px; margin-top: 10px; color: var(--text-secondary,#6A6A6A); }
    .link { text-decoration: none; color: inherit; }

    /* Focus visible, A11y */
    button:focus-visible, a:focus-visible, input:focus-visible { outline: 3px solid var(--brand-primary,#FFEA00); outline-offset: 2px; border-radius: 8px; }

    /* Typography & spacing */
    input[matInput] { font-size: 16px; }
    .mat-mdc-form-field { --mdc-outlined-text-field-outline-color: rgba(0,0,0,0.12); border-radius: 12px; }
    .mat-mdc-checkbox { font-size: 14px; }

    @media (max-width: 600px) {
      .login-wrap { padding: 16px; }
      .login-card { padding: 16px; }
      .cta { padding: 12px 14px; }
    }
  `]
})
export class LoginFrComponent {
  showPassword = false;
  form = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(private fb: FormBuilder) {}

  toggleShowPassword(): void { this.showPassword = !this.showPassword; }

  onSubmit(): void {
    if (this.form.valid) {
      // hook to auth service
    }
  }
}
