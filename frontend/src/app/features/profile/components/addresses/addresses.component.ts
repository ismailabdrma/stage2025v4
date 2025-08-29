import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { AddressService } from '../../../../core/services/address.service';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { Address } from '../../../../core/models/address.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    MatBadgeModule
  ],
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit, OnDestroy {
  private addressService = inject(AddressService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private destroy$ = new Subject<void>();

  addresses: Address[] = [];
  isLoading = false;
  error: string | null = null;

  ngOnInit(): void {
    this.loadAddresses();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAddresses(): void {
    this.isLoading = true;
    this.error = null;

    this.addressService.getAddresses().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (addresses) => {
        this.addresses = addresses || [];
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading addresses:', error);
        this.error = 'Erreur lors du chargement des adresses';
        this.isLoading = false;
      }
    });
  }

  addNewAddress(): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '600px',
      data: { isNew: true }
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$)).subscribe(result => {
      if (result) {
        this.addressService.createAddress(result).pipe(takeUntil(this.destroy$)).subscribe({
          next: (newAddress) => {
            this.addresses.push(newAddress);
            this.snackBar.open('Adresse ajoutée avec succès!', 'Fermer', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error creating address:', error);
            this.snackBar.open('Erreur lors de la création de l\'adresse', 'Fermer', { duration: 3000 });
          }
        });
      }
    });
  }

  openAddressDialog(): void {
    this.addNewAddress();
  }

  editAddress(address: Address): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: '600px',
      data: { ...address }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.updateAddress(address.id, result).pipe(
          takeUntil(this.destroy$)
        ).subscribe({
          next: (updatedAddress) => {
            const index = this.addresses.findIndex(a => a.id === address.id);
            if (index !== -1) {
              this.addresses[index] = updatedAddress;
            }
            this.snackBar.open('Adresse mise à jour avec succès!', 'Fermer', { duration: 3000 });
          },
          error: (error) => {
            console.error('Error updating address:', error);
            this.snackBar.open('Erreur lors de la mise à jour de l\'adresse', 'Fermer', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteAddress(address: Address): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer cette adresse ?\n\n${address.firstName} ${address.lastName}\n${address.street}\n${address.city} ${address.zipCode}`)) {
      this.addressService.deleteAddress(address.id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: () => {
          this.addresses = this.addresses.filter(a => a.id !== address.id);
          this.snackBar.open('Adresse supprimée avec succès!', 'Fermer', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error deleting address:', error);
          this.snackBar.open('Erreur lors de la suppression de l\'adresse', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  setDefault(addressId: number): void {
    this.addressService.setDefaultAddress(addressId).subscribe({
      next: (updatedAddress) => {
        // Update the addresses list to reflect the new default
        this.addresses = this.addresses.map(addr => ({
          ...addr,
          isDefault: addr.id === addressId
        }));
        
        this.snackBar.open('Adresse par défaut mise à jour', 'Fermer', { duration: 3000 });
      },
      error: (error) => {
        console.error('Error setting default address:', error);
        this.snackBar.open('Erreur lors de la mise à jour de l\'adresse par défaut', 'Fermer', { duration: 3000 });
      }
    });
  }

  // Helper methods for display
  getCountryFlag(countryCode: string): string {
    const countryFlags: { [key: string]: string } = {
      'MA': '🇲🇦',
      'FR': '🇫🇷',
      'BE': '🇧🇪',
      'DE': '🇩🇪',
      'ES': '🇪🇸',
      'IT': '🇮🇹',
      'US': '🇺🇸',
      'CA': '🇨🇦'
    };
    return countryFlags[countryCode] || '🏳️';
  }

  getCountryName(countryCode: string): string {
    const countryNames: { [key: string]: string } = {
      'MA': 'Maroc',
      'FR': 'France',
      'BE': 'Belgique',
      'DE': 'Allemagne',
      'ES': 'Espagne',
      'IT': 'Italie',
      'US': 'États-Unis',
      'CA': 'Canada'
    };
    return countryNames[countryCode] || countryCode;
  }

  getShippingFee(countryCode: string): string {
    const shippingFees: { [key: string]: number } = {
      'MA': 25,
      'FR': 5.99,
      'BE': 6.99,
      'DE': 7.99,
      'ES': 6.49,
      'IT': 7.49,
      'US': 12.99,
      'CA': 15.99
    };
    const fee = shippingFees[countryCode];
    if (fee) {
      const currency = countryCode === 'MA' ? 'MAD' : (countryCode === 'US' ? 'USD' : 'EUR');
      return `${fee} ${currency}`;
    }
    return 'À calculer';
  }

  goToCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
