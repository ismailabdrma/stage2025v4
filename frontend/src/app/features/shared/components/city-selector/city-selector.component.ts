import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, FormsModule],
  template: `
    <div class="container" role="dialog" aria-modal="true" aria-label="Sélecteur de ville">
      <header class="header">
        <h2>Sélectionner une ville</h2>
        <button mat-icon-button (click)="close()" aria-label="Fermer"><mat-icon>close</mat-icon></button>
      </header>

      <div class="search-row">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Ville ou région</mat-label>
          <input matInput [(ngModel)]="query" placeholder="Rechercher..." />
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
      </div>

      <div class="alphabet" aria-label="Alphabet">
        <button mat-button class="alpha-btn" *ngFor="let letter of alphabet" (click)="filterBy(letter)">{{ letter }}</button>
      </div>

      <div class="content">
        <section class="cities" aria-label="Villes">
          <div class="city" *ngFor="let city of filteredCities()" (click)="selectCity(city)" tabindex="0">
            <div class="name">{{ city }}</div>
            <div class="services">
              <mat-icon title="Livraison">local_shipping</mat-icon>
              <mat-icon title="Retrait">storefront</mat-icon>
              <mat-icon title="Service">build</mat-icon>
            </div>
          </div>
        </section>

        <section class="stores" aria-label="Magasins">
          <div class="store-card" *ngFor="let store of stores">
            <div class="addr">
              <div class="title">{{ store.name }}</div>
              <div class="address">{{ store.address }}</div>
            </div>
            <button mat-stroked-button color="primary" class="choose" (click)="choose(store)">Choisir</button>
          </div>
        </section>
      </div>

      <footer class="footer">
        <button mat-raised-button class="cta" (click)="confirm()">Choisir</button>
      </footer>
    </div>
  `,
  styles: [`
    .container { width: min(1100px, 100%); max-height: 90vh; display: flex; flex-direction: column; background: var(--bg,#fff); border-radius: 12px; box-shadow: 0 12px 30px rgba(0,0,0,.08); }
    .header { display:flex; align-items:center; justify-content: space-between; padding: 16px 20px; border-bottom: 1px solid rgba(0,0,0,.06); }
    .search-row { padding: 12px 20px; }
    .search-field { width: 100%; }
    .alphabet { display:flex; flex-wrap: wrap; gap: 6px; padding: 0 20px 12px; }
    .alpha-btn { min-width: 32px; padding: 0 8px; }
    .content { display:grid; grid-template-columns: 360px 1fr; gap: 16px; padding: 0 20px 20px; }
    .cities { display: grid; gap: 8px; align-content: start; background: var(--bg-soft); padding: 12px; border-radius: 12px; }
    .city { display:flex; align-items:center; justify-content: space-between; padding: 10px 12px; border: 1px solid rgba(0,0,0,.08); border-radius: 12px; background:#fff; cursor:pointer; }
    .city:focus { outline: 2px solid var(--brand-primary); }
    .city .name { font-weight: 600; }
    .city .services { display:flex; gap: 8px; color: var(--text-secondary); }
    .stores { display: grid; gap: 12px; align-content:start; }
    .store-card { display:flex; align-items:center; justify-content: space-between; padding: 12px; border:1px solid var(--brand-primary); border-radius: 12px; background:#fff; }
    .choose { border-color: var(--brand-primary); }
    .footer { padding: 12px 20px; border-top: 1px solid rgba(0,0,0,.06); display:flex; justify-content: flex-end; }
    .cta { background: var(--brand-primary); color:#1B1B1B; font-weight:700; border-radius:12px; }

    @media (max-width: 900px) { .content { grid-template-columns: 1fr; } }
  `]
})
export class CitySelectorComponent {
  private dialogRef = inject(MatDialogRef<CitySelectorComponent>);
  alphabet = ALPHABET;
  query = '';

  cities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux'];
  stores = [
    { name: 'Magasin République', address: '12 Rue de la République, 75001 Paris' },
    { name: 'Magasin Opéra', address: '5 Avenue de l’Opéra, 75002 Paris' },
  ];

  filteredCities(): string[] {
    const q = this.query.toLowerCase().trim();
    return this.cities.filter(c => !q || c.toLowerCase().includes(q));
  }

  filterBy(letter: string): void { this.query = letter; }
  selectCity(city: string): void { this.query = city; }
  choose(store: any): void { this.dialogRef.close({ city: this.query, store }); }
  confirm(): void { this.dialogRef.close({ city: this.query }); }
  close(): void { this.dialogRef.close(); }
}
