import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SupplierService } from '@core/services/supplier.service';
import { Supplier } from '@core/models/supplier.model';

@Component({
  selector: 'app-create-supplier-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule
  ],
  template: `
    <div class="supplier-dialog">
      <mat-card>
        <mat-card-header>
          <mat-card-title>
            <mat-icon>business</mat-icon>
            {{ data ? 'Modifier le fournisseur' : 'Créer un nouveau fournisseur' }}
          </mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="supplierForm" (ngSubmit)="onSubmit()">
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Nom du fournisseur</mat-label>
                <input matInput formControlName="name" required>
                <mat-error *ngIf="supplierForm.get('name')?.hasError('required')">
                  Le nom est requis
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Type</mat-label>
                <mat-select formControlName="type" required>
                  <mat-option value="API">API</mat-option>
                  <mat-option value="MANUAL">Manuel</mat-option>
                  <mat-option value="CSV">CSV</mat-option>
                </mat-select>
                <mat-error *ngIf="supplierForm.get('type')?.hasError('required')">
                  Le type est requis
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput type="email" formControlName="email">
                <mat-error *ngIf="supplierForm.get('email')?.hasError('email')">
                  Email invalide
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Téléphone</mat-label>
                <input matInput formControlName="phone">
              </mat-form-field>
            </div>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Configuration (JSON)</mat-label>
              <textarea matInput formControlName="config" rows="4" 
                        placeholder='{"apiKey": "your-api-key", "endpoint": "https://..."}'></textarea>
              <mat-hint>Configuration au format JSON pour l'intégration</mat-hint>
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Description</mat-label>
              <textarea matInput formControlName="description" rows="3"></textarea>
            </mat-form-field>

            <div class="form-actions">
              <button mat-button type="button" (click)="onCancel()">
                <mat-icon>cancel</mat-icon>
                Annuler
              </button>
              <button mat-raised-button color="primary" type="submit" 
                      [disabled]="supplierForm.invalid || loading">
                <mat-spinner diameter="20" *ngIf="loading"></mat-spinner>
                <mat-icon *ngIf="!loading">{{ data ? 'save' : 'add' }}</mat-icon>
                {{ data ? 'Modifier' : 'Créer' }}
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .supplier-dialog {
      padding: 20px;
      max-width: 600px;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 16px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .form-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }

    mat-card-header {
      margin-bottom: 24px;
    }

    mat-card-title {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    @media (max-width: 600px) {
      .form-row {
        grid-template-columns: 1fr;
        gap: 12px;
      }
    }
  `]
})
export class CreateSupplierDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private supplierService = inject(SupplierService);
  private snackBar = inject(MatSnackBar);

  supplierForm: FormGroup;
  loading = false;

  constructor(
    public dialogRef: MatDialogRef<CreateSupplierDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Supplier | null
  ) {
    this.supplierForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', [Validators.email]],
      phone: [''],
      config: ['{}'],
      description: [''],
      active: [true]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.supplierForm.patchValue({
        name: this.data.name,
        type: this.data.type,
        email: this.data.email || '',
        phone: this.data.phone || '',
        config: this.data.config || '{}',
        description: this.data.description || '',
        active: this.data.active
      });
    }
  }

  onSubmit(): void {
    if (this.supplierForm.invalid) return;

    this.loading = true;
    const supplierData = this.supplierForm.value;

    try {
      // Parse config if it's a string
      if (typeof supplierData.config === 'string') {
        supplierData.config = JSON.parse(supplierData.config);
      }
    } catch (error) {
      this.snackBar.open('Configuration JSON invalide', 'Fermer', { duration: 3000 });
      this.loading = false;
      return;
    }

    if (this.data) {
      // Update existing supplier
      this.supplierService.updateSupplier(this.data.id, supplierData).subscribe({
        next: () => {
          this.snackBar.open('Fournisseur modifié avec succès', 'Fermer', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error updating supplier:', error);
          this.snackBar.open('Erreur lors de la modification', 'Fermer', { duration: 3000 });
          this.loading = false;
        }
      });
    } else {
      // Create new supplier
      this.supplierService.createSupplier(supplierData).subscribe({
        next: () => {
          this.snackBar.open('Fournisseur créé avec succès', 'Fermer', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error('Error creating supplier:', error);
          this.snackBar.open('Erreur lors de la création', 'Fermer', { duration: 3000 });
          this.loading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
} 