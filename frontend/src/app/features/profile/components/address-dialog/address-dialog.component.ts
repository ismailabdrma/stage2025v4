import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Address, CreateAddressRequest } from '@core/models/address.model';

@Component({
  selector: 'app-address-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data ? 'Edit Address' : 'Add New Address' }}</h2>
    <div mat-dialog-content>
      <form [formGroup]="addressForm">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Label (e.g., Home, Work)</mat-label>
          <input matInput formControlName="label">
        </mat-form-field>

        <mat-form-field appearance="outline" class="half-width">
          <mat-label>First Name</mat-label>
          <input matInput formControlName="firstName" required>
          <mat-error *ngIf="addressForm.get('firstName')?.hasError('required')">
            First Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="half-width">
          <mat-label>Last Name</mat-label>
          <input matInput formControlName="lastName" required>
          <mat-error *ngIf="addressForm.get('lastName')?.hasError('required')">
            Last Name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Street Address</mat-label>
          <input matInput formControlName="street" required>
          <mat-error *ngIf="addressForm.get('street')?.hasError('required')">
            Street Address is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="half-width">
          <mat-label>City</mat-label>
          <input matInput formControlName="city" required>
          <mat-error *ngIf="addressForm.get('city')?.hasError('required')">
            City is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="half-width">
          <mat-label>Postal Code</mat-label>
          <input matInput formControlName="zipCode" required>
          <mat-error *ngIf="addressForm.get('zipCode')?.hasError('required')">
            Postal Code is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Country</mat-label>
          <mat-select formControlName="country" required>
            <mat-option value="MA">🇲🇦 Morocco</mat-option>
            <mat-option value="FR">🇫🇷 France</mat-option>
            <mat-option value="BE">🇧🇪 Belgium</mat-option>
            <mat-option value="CH">🇨🇭 Switzerland</mat-option>
            <mat-option value="CA">🇨🇦 Canada</mat-option>
            <mat-option value="US">🇺🇸 United States</mat-option>
            <mat-option value="GB">🇬🇧 United Kingdom</mat-option>
            <mat-option value="DE">🇩🇪 Germany</mat-option>
            <mat-option value="IT">🇮🇹 Italy</mat-option>
            <mat-option value="ES">🇪🇸 Spain</mat-option>
            <mat-option value="NL">🇳🇱 Netherlands</mat-option>
            <mat-option value="PT">🇵🇹 Portugal</mat-option>
            <mat-option value="SE">🇸🇪 Sweden</mat-option>
            <mat-option value="NO">🇳🇴 Norway</mat-option>
            <mat-option value="DK">🇩🇰 Denmark</mat-option>
            <mat-option value="FI">🇫🇮 Finland</mat-option>
            <mat-option value="AT">🇦🇹 Austria</mat-option>
            <mat-option value="IE">🇮🇪 Ireland</mat-option>
            <mat-option value="LU">🇱🇺 Luxembourg</mat-option>
            <mat-option value="MT">🇲🇹 Malta</mat-option>
            <mat-option value="CY">🇨🇾 Cyprus</mat-option>
            <mat-option value="EE">🇪🇪 Estonia</mat-option>
            <mat-option value="LV">🇱🇻 Latvia</mat-option>
            <mat-option value="LT">🇱🇹 Lithuania</mat-option>
            <mat-option value="PL">🇵🇱 Poland</mat-option>
            <mat-option value="CZ">🇨🇿 Czech Republic</mat-option>
            <mat-option value="SK">🇸🇰 Slovakia</mat-option>
            <mat-option value="HU">🇭🇺 Hungary</mat-option>
            <mat-option value="RO">🇷🇴 Romania</mat-option>
            <mat-option value="BG">🇧🇬 Bulgaria</mat-option>
            <mat-option value="HR">🇭🇷 Croatia</mat-option>
            <mat-option value="SI">🇸🇮 Slovenia</mat-option>
            <mat-option value="GR">🇬🇷 Greece</mat-option>
          </mat-select>
          <mat-error *ngIf="addressForm.get('country')?.hasError('required')">
            Country is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Phone</mat-label>
          <input matInput formControlName="phone">
        </mat-form-field>

        <mat-checkbox formControlName="isDefault">Set as Default Address</mat-checkbox>
      </form>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cancel</button>
      <button mat-raised-button color="primary" [disabled]="addressForm.invalid" (click)="onSaveClick()">Save</button>
    </div>
  `,
  styles: [
    `
      .full-width {
        width: 100%;
      }
      .half-width {
        width: 48%; // Adjust as needed
        margin-right: 4%; // Adjust as needed
        &:last-child {
          margin-right: 0;
        }
      }
    `
  ]
})
export class AddressDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  addressForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Address | null
  ) {
    this.addressForm = this.fb.group({
      label: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      zipCode: ['', Validators.required],
      country: ['MA', Validators.required], // Default to Morocco
      phone: [''],
      isDefault: [false]
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.addressForm.patchValue({
        ...this.data,
        isDefault: this.data.isDefault || false
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.addressForm.valid) {
      const formValue = this.addressForm.value;
      // Map to backend AddressDto shape
      const dto: CreateAddressRequest = {
        label: formValue.label,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        street: formValue.street,
        city: formValue.city,
        state: formValue.state,
        zipCode: formValue.zipCode,
        country: formValue.country,
        phone: formValue.phone,
        isDefault: formValue.isDefault
      };
      
      this.dialogRef.close(dto);
    }
  }
}