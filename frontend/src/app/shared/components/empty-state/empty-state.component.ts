import { Component, Input, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatCardModule],
  template: `
    <div class="empty-state-container">
      <mat-card class="empty-state-card">
        <div class="empty-state-icon">
          <mat-icon [color]="iconColor">{{ icon }}</mat-icon>
        </div>
        
        <h3 class="empty-state-title">{{ title }}</h3>
        <p class="empty-state-description">{{ description }}</p>
        
        <div class="empty-state-actions" *ngIf="actionText && actionRoute">
          <button 
            mat-raised-button 
            color="primary" 
            [routerLink]="actionRoute"
            class="action-button">
            <mat-icon>{{ actionIcon }}</mat-icon>
            {{ actionText }}
          </button>
        </div>
        
        <div class="empty-state-actions" *ngIf="actionText && !actionRoute">
          <button 
            mat-raised-button 
            color="primary" 
            (click)="actionClick.emit()"
            class="action-button">
            <mat-icon>{{ actionIcon }}</mat-icon>
            {{ actionText }}
          </button>
        </div>
      </mat-card>
    </div>
  `,
  styles: [`
    .empty-state-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
      padding: 40px 20px;
    }
    
    .empty-state-card {
      max-width: 500px;
      text-align: center;
      padding: 40px 32px;
    }
    
    .empty-state-icon {
      margin-bottom: 24px;
    }
    
    .empty-state-icon mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      opacity: 0.6;
    }
    
    .empty-state-title {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0 0 16px 0;
    }
    
    .empty-state-description {
      font-size: 16px;
      color: #666;
      line-height: 1.5;
      margin: 0 0 32px 0;
    }
    
    .empty-state-actions {
      display: flex;
      justify-content: center;
    }
    
    .action-button {
      padding: 12px 24px;
      font-size: 16px;
      font-weight: 500;
    }
    
    .action-button mat-icon {
      margin-right: 8px;
    }
    
    @media (max-width: 600px) {
      .empty-state-container {
        min-height: 300px;
        padding: 20px 16px;
      }
      
      .empty-state-card {
        padding: 32px 24px;
      }
      
      .empty-state-title {
        font-size: 20px;
      }
      
      .empty-state-description {
        font-size: 14px;
      }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input() iconColor: 'primary' | 'accent' | 'warn' = 'primary';
  @Input() title: string = 'Aucun contenu trouvé';
  @Input() description: string = 'Il semble qu\'il n\'y ait rien à afficher pour le moment.';
  @Input() actionText: string = '';
  @Input() actionRoute: string = '';
  @Input() actionIcon: string = 'add';
  
  // Event emitter for custom actions
  @Input() actionClick = new EventEmitter<void>();
}
