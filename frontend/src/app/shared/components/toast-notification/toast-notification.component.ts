import { Component, inject, Inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatSnackBarModule, MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'

export interface ToastConfig {
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: string
  actionHandler?: () => void
}

@Component({
  selector: 'app-toast-notification',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="toast-container" [class]="'toast-' + data.type">
      <mat-icon class="toast-icon">{{ getIcon() }}</mat-icon>
      <span class="toast-message">{{ data.message }}</span>
      <button *ngIf="data.action" 
              mat-button 
              class="toast-action"
              (click)="handleAction()">
        {{ data.action }}
      </button>
    </div>
  `,
  styles: [`
    .toast-container {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      min-width: 300px;
      max-width: 400px;
    }

    .toast-icon {
      flex-shrink: 0;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .toast-message {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
    }

    .toast-action {
      flex-shrink: 0;
      min-width: auto;
      padding: 4px 8px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .toast-success {
      background: #4caf50;
      color: white;
    }

    .toast-error {
      background: #f44336;
      color: white;
    }

    .toast-warning {
      background: #ff9800;
      color: white;
    }

    .toast-info {
      background: #2196f3;
      color: white;
    }

    .toast-success .toast-action,
    .toast-error .toast-action,
    .toast-warning .toast-action,
    .toast-info .toast-action {
      color: white;
      border-color: rgba(255, 255, 255, 0.3);
    }

    .toast-action:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `]
})
export class ToastNotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ToastConfig) {}

  getIcon(): string {
    switch (this.data.type) {
      case 'success': return 'check_circle'
      case 'error': return 'error'
      case 'warning': return 'warning'
      case 'info': return 'info'
      default: return 'info'
    }
  }

  handleAction() {
    if (this.data.actionHandler) {
      this.data.actionHandler()
    }
  }
}

// Toast Service
import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBar = inject(MatSnackBar)

  show(config: ToastConfig) {
    this.snackBar.openFromComponent(ToastNotificationComponent, {
      data: config,
      duration: config.duration || 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['toast-snackbar']
    })
  }

  success(message: string, action?: string, actionHandler?: () => void) {
    this.show({
      message,
      type: 'success',
      action,
      actionHandler
    })
  }

  error(message: string, action?: string, actionHandler?: () => void) {
    this.show({
      message,
      type: 'error',
      duration: 6000,
      action,
      actionHandler
    })
  }

  warning(message: string, action?: string, actionHandler?: () => void) {
    this.show({
      message,
      type: 'warning',
      action,
      actionHandler
    })
  }

  info(message: string, action?: string, actionHandler?: () => void) {
    this.show({
      message,
      type: 'info',
      action,
      actionHandler
    })
  }

  // Common e-commerce toasts
  addedToCart(productName: string) {
    this.success(
      `${productName} ajouté au panier`,
      'Voir le panier',
      () => {
        // Navigate to cart - implement navigation logic here
        console.log('Navigate to cart')
      }
    )
  }

  removedFromCart(productName: string) {
    this.info(`${productName} retiré du panier`)
  }

  addedToWishlist(productName: string) {
    this.success(`${productName} ajouté aux favoris`)
  }

  outOfStock() {
    this.warning('Ce produit est actuellement en rupture de stock')
  }

  networkError() {
    this.error(
      'Erreur de connexion. Vérifiez votre réseau.',
      'Réessayer',
      () => window.location.reload()
    )
  }

  savedForLater() {
    this.info('Votre panier a été sauvegardé pour plus tard')
  }
}
