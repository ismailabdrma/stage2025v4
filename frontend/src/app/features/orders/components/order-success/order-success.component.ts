import { Component, OnInit, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule, ActivatedRoute, Router } from '@angular/router'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatIconModule } from '@angular/material/icon'
import { MatSnackBar } from '@angular/material/snack-bar'
import { PaymentService } from '@core/services/payment.service'

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatProgressSpinnerModule, MatIconModule],
  template: `
    <div class="center">
      <mat-card class="card">
        <mat-card-header>
          <mat-card-title>Paiement</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <div *ngIf="loading" class="loading">
            <mat-progress-spinner diameter="36" mode="indeterminate"></mat-progress-spinner>
            <div>Validation du paiement…</div>
          </div>

          <div *ngIf="!loading && success" class="success">
            <mat-icon color="primary">check_circle</mat-icon>
            <h3>Paiement confirmé</h3>
            <p>Merci pour votre commande.</p>
          </div>

          <div *ngIf="!loading && !success" class="error">
            <mat-icon color="warn">error</mat-icon>
            <h3>Échec de confirmation</h3>
            <p>{{errorMessage || 'Nous n\'avons pas pu confirmer votre paiement.'}}</p>
          </div>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" routerLink="/">Aller à l\'accueil</button>
          <button mat-button routerLink="/orders">Voir mes commandes</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .center { display: flex; justify-content: center; padding: 32px; }
    .card { max-width: 520px; width: 100%; }
    .loading, .success, .error { display: flex; flex-direction: column; gap: 12px; align-items: center; }
    .success mat-icon, .error mat-icon { font-size: 48px; height: 48px; width: 48px; }
  `]
})
export class OrderSuccessComponent implements OnInit {
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  private paymentService = inject(PaymentService)
  private snackBar = inject(MatSnackBar)

  loading = true
  success = false
  errorMessage = ''

  async ngOnInit(): Promise<void> {
    // Stripe redirects with payment_intent and client_secret; we still call backend confirm
    const pi = this.route.snapshot.queryParamMap.get('payment_intent')
    const status = this.route.snapshot.queryParamMap.get('redirect_status')

    if (!pi) {
      this.loading = false
      this.success = false
      this.errorMessage = 'Référence de paiement introuvable.'
      return
    }

    try {
      const res = await this.paymentService.confirmOrderPayment(0 as any, pi).toPromise()
      this.success = !!res?.success
      if (!this.success) {
        this.errorMessage = res?.message || `Statut: ${status || 'inconnu'}`
      }
    } catch (e: any) {
      this.success = false
      this.errorMessage = e?.message || 'Erreur lors de la confirmation du paiement'
      this.snackBar.open(this.errorMessage, 'Close', { duration: 4000 })
    } finally {
      this.loading = false
    }
  }
}


