import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="error-container" *ngIf="error">
      <mat-card class="error-card">
        <mat-card-header>
          <mat-icon mat-card-avatar color="warn">error</mat-icon>
          <mat-card-title>Une erreur s'est produite</mat-card-title>
          <mat-card-subtitle>{{ error.message || 'Erreur inattendue' }}</mat-card-subtitle>
        </mat-card-header>
        
        <mat-card-content>
          <p *ngIf="error.details">{{ error.details }}</p>
          <p *ngIf="!error.details">Veuillez réessayer ou contacter le support si le problème persiste.</p>
        </mat-card-content>
        
        <mat-card-actions>
          <button mat-button color="primary" (click)="retry.emit()">
            <mat-icon>refresh</mat-icon>
            Réessayer
          </button>
          <button mat-button (click)="goHome.emit()">
            <mat-icon>home</mat-icon>
            Accueil
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .error-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 300px;
      padding: 20px;
    }
    
    .error-card {
      max-width: 500px;
      text-align: center;
    }
    
    .error-card mat-card-header {
      justify-content: center;
      margin-bottom: 20px;
    }
    
    .error-card mat-card-actions {
      justify-content: center;
      gap: 16px;
    }
  `]
})
export class ErrorBoundaryComponent {
  @Input() error: { message: string; details?: string } | null = null;
  @Output() retry = new EventEmitter<void>();
  @Output() goHome = new EventEmitter<void>();
}

