import { Component, OnInit, OnDestroy, AfterViewInit, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule, MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';

import { ShippingFeeService } from '../../../../core/services/shipping-fee.service';
import { ShippingFee } from '../../../../core/models/shipping-fee.model';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shipping-fees',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule,
    MatExpansionModule,
    MatDividerModule,
    MatBadgeModule
  ],
  templateUrl: './shipping-fees.component.html',
  styleUrls: ['./shipping-fees.component.scss']
})
export class ShippingFeesComponent implements OnInit, AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private shippingFeeService = inject(ShippingFeeService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private destroy$ = new Subject<void>();

  shippingFees: ShippingFee[] = [];
  dataSource = new MatTableDataSource<ShippingFee>([]);
  isLoading = false;
  error: string | null = null;
  
  // Table properties
  displayedColumns: string[] = ['country', 'city', 'baseFee', 'currency', 'deliveryTime', 'status', 'actions'];
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  currentPage = 0;
  totalItems = 0;
  
  // Paginator reference
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  // Form properties
  shippingFeeForm: FormGroup;
  isEditing = false;
  editingId: number | null = null;
  
  // Filter properties
  filterCountry = '';
  filterCurrency = '';
  filterStatus = 'all';
  
  // Statistics
  statistics: any = null;

  constructor() {
    this.shippingFeeForm = this.fb.group({
      countryCode: ['', Validators.required],
      countryName: ['', Validators.required],
      region: [''],
      city: [''],
      postalCodeFrom: [''],
      postalCodeTo: [''],
      baseFee: ['', [Validators.required, Validators.min(0)]],
      currency: ['EUR', Validators.required],
      minOrderAmount: [''],
      freeShippingThreshold: [''],
      deliveryTimeDays: ['', [Validators.required, Validators.min(1)]],
      isActive: [true],
      priority: [100, [Validators.required, Validators.min(1)]],
      notes: ['']
    });
  }

  ngOnInit(): void {
    console.log('ShippingFeesComponent initialized');
    this.loadShippingFees();
    this.loadStatistics();
  }

  ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadShippingFees(): void {
    this.isLoading = true;
    this.error = null;

    console.log('Loading shipping fees...');
    this.shippingFeeService.getAllActiveShippingFees().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (fees) => {
        console.log('Shipping fees loaded:', fees);
        console.log('Number of fees:', fees.length);
        console.log('Fees by country:', fees.reduce((acc: {[key: string]: number}, fee) => {
          acc[fee.countryCode] = (acc[fee.countryCode] || 0) + 1;
          return acc;
        }, {}));
        this.shippingFees = fees;
        this.dataSource.data = fees;
        this.totalItems = fees.length;
        this.isLoading = false;
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Error loading shipping fees:', error);
        this.error = 'Erreur lors du chargement des frais de livraison';
        this.isLoading = false;
      }
    });
  }

  loadStatistics(): void {
    // This would call the backend statistics endpoint
    // For now, we'll calculate from the loaded data
    this.calculateStatistics();
  }

  private calculateStatistics(): void {
    if (this.shippingFees.length === 0) return;

    const totalFees = this.shippingFees.length;
    const activeFees = this.shippingFees.filter(f => f.active).length;
    const inactiveFees = totalFees - activeFees;

    // Count by currency
    const eurFees = this.shippingFees.filter(f => f.currency === 'EUR').length;
    const madFees = this.shippingFees.filter(f => f.currency === 'MAD').length;
    const usdFees = this.shippingFees.filter(f => f.currency === 'USD').length;

    // Count by country
    const moroccoFees = this.shippingFees.filter(f => f.countryCode === 'MA').length;
    const franceFees = this.shippingFees.filter(f => f.countryCode === 'FR').length;
    const otherFees = totalFees - moroccoFees - franceFees;

    console.log('Statistics calculated:', { totalFees, activeFees, inactiveFees, moroccoFees, franceFees });

    this.statistics = {
      totalFees,
      activeFees,
      inactiveFees,
      byCurrency: { EUR: eurFees, MAD: madFees, USD: usdFees },
      byCountry: { Morocco: moroccoFees, France: franceFees, Other: otherFees }
    };
  }

  addNewShippingFee(): void {
    this.isEditing = false;
    this.editingId = null;
    this.shippingFeeForm.reset({
      currency: 'EUR',
      isActive: true,
      priority: 100
    });
  }

  editShippingFee(fee: ShippingFee): void {
    this.isEditing = true;
    this.editingId = fee.id || null;
    this.shippingFeeForm.patchValue({
      countryCode: fee.countryCode,
      countryName: fee.countryName,
      region: fee.region,
      city: fee.city,
      postalCodeFrom: fee.postalCodeFrom,
      postalCodeTo: fee.postalCodeTo,
      baseFee: fee.baseFee,
      currency: fee.currency,
      minOrderAmount: fee.minOrderAmount,
      freeShippingThreshold: fee.freeShippingThreshold,
      deliveryTimeDays: fee.deliveryTimeDays,
      isActive: fee.active,
      priority: fee.priority,
      notes: fee.notes
    });
  }

  saveShippingFee(): void {
    if (this.shippingFeeForm.invalid) return;

    const formValue = this.shippingFeeForm.value;
    const shippingFeeData = {
      ...formValue,
      baseFee: parseFloat(formValue.baseFee),
      minOrderAmount: formValue.minOrderAmount ? parseFloat(formValue.minOrderAmount) : null,
      freeShippingThreshold: formValue.freeShippingThreshold ? parseFloat(formValue.freeShippingThreshold) : null,
      deliveryTimeDays: parseInt(formValue.deliveryTimeDays),
      priority: parseInt(formValue.priority)
    };

    if (this.isEditing && this.editingId) {
      this.updateShippingFee(this.editingId, shippingFeeData);
    } else {
      this.createShippingFee(shippingFeeData);
    }
  }

  private createShippingFee(data: any): void {
    this.shippingFeeService.createShippingFee(data).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (newFee) => {
        this.shippingFees.push(newFee);
        this.dataSource.data = [...this.shippingFees];
        this.snackBar.open('Frais de livraison créés avec succès!', 'Fermer', { duration: 3000 });
        this.resetForm();
        this.loadStatistics();
      },
      error: (error) => {
        console.error('Error creating shipping fee:', error);
        this.snackBar.open('Erreur lors de la création des frais de livraison', 'Fermer', { duration: 3000 });
      }
    });
  }

  private updateShippingFee(id: number, data: any): void {
    this.shippingFeeService.updateShippingFee(id, data).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (updatedFee) => {
        const index = this.shippingFees.findIndex(f => f.id === id);
        if (index !== -1) {
          this.shippingFees[index] = updatedFee;
          this.dataSource.data = [...this.shippingFees];
        }
        this.snackBar.open('Frais de livraison mis à jour avec succès!', 'Fermer', { duration: 3000 });
        this.resetForm();
        this.loadStatistics();
      },
      error: (error) => {
        console.error('Error updating shipping fee:', error);
        this.snackBar.open('Erreur lors de la mise à jour des frais de livraison', 'Fermer', { duration: 3000 });
      }
    });
  }

  deleteShippingFee(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ces frais de livraison ?')) {
      this.shippingFeeService.deleteShippingFee(id).pipe(
        takeUntil(this.destroy$)
      ).subscribe({
              next: () => {
        this.shippingFees = this.shippingFees.filter(f => f.id !== id);
        this.dataSource.data = [...this.shippingFees];
        this.snackBar.open('Frais de livraison supprimés avec succès!', 'Fermer', { duration: 3000 });
        this.loadStatistics();
      },
        error: (error) => {
          console.error('Error deleting shipping fee:', error);
          this.snackBar.open('Erreur lors de la suppression des frais de livraison', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  toggleStatus(id: number): void {
    this.shippingFeeService.toggleShippingFeeStatus(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (updatedFee) => {
        const index = this.shippingFees.findIndex(f => f.id === id);
        if (index !== -1) {
          this.shippingFees[index] = updatedFee;
          this.dataSource.data = [...this.shippingFees];
        }
        this.snackBar.open('Statut mis à jour avec succès!', 'Fermer', { duration: 3000 });
        this.loadStatistics();
      },
      error: (error) => {
        console.error('Error toggling status:', error);
        this.snackBar.open('Erreur lors de la mise à jour du statut', 'Fermer', { duration: 3000 });
      }
    });
  }

  resetForm(): void {
    this.shippingFeeForm.reset({
      currency: 'EUR',
      isActive: true,
      priority: 100
    });
    this.isEditing = false;
    this.editingId = null;
  }

  initializeDefaults(): void {
    if (confirm('Voulez-vous initialiser les frais de livraison par défaut ?\n\nCela va installer les frais pour:\n• Toutes les villes du Maroc (60+ villes)\n• France et Belgique\n\nLes frais existants seront remplacés.')) {
      console.log('Initializing default shipping fees...');
      this.shippingFeeService.initializeDefaultShippingFees().pipe(
        takeUntil(this.destroy$)
      ).subscribe({
        next: (response) => {
          console.log('Default shipping fees initialized:', response);
          this.snackBar.open('✅ Frais de livraison initialisés avec succès!\n60+ villes du Maroc + France/Belgique', 'Fermer', { duration: 5000 });
          // Force refresh the data
          setTimeout(() => {
            this.loadShippingFees();
          }, 1000);
        },
        error: (error) => {
          console.error('Error initializing defaults:', error);
          this.snackBar.open('❌ Erreur lors de l\'initialisation des frais par défaut', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  // Manual refresh method
  refreshData(): void {
    console.log('Manually refreshing shipping fees data...');
    this.loadShippingFees();
  }

  // Debug method
  debugData(): void {
    console.log('Debugging shipping fees data...');
    this.shippingFeeService.debugShippingFees().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (debugInfo) => {
        console.log('Debug info:', debugInfo);
        this.snackBar.open(`Debug: Total=${debugInfo.totalCount}, Morocco=${debugInfo.moroccoCount}, All=${debugInfo.allFeesCount}`, 'Fermer', { duration: 5000 });
      },
      error: (error) => {
        console.error('Debug error:', error);
        this.snackBar.open('Debug error: ' + error.message, 'Fermer', { duration: 5000 });
      }
    });
  }

  // Helper methods
  getCountryFlag(countryCode: string): string {
    const flags: { [key: string]: string } = {
      'MA': '🇲🇦', 'FR': '🇫🇷', 'BE': '🇧🇪', 'DE': '🇩🇪', 'ES': '🇪🇸',
      'IT': '🇮🇹', 'NL': '🇳🇱', 'CH': '🇨🇭', 'CA': '🇨🇦', 'US': '🇺🇸'
    };
    return flags[countryCode] || '🌍';
  }

  getStatusColor(status: boolean): string {
    return status ? 'success' : 'warn';
  }

  getStatusText(status: boolean): string {
    return status ? 'Actif' : 'Inactif';
  }

  // Table event handlers
  onPageChange(event: PageEvent): void {
    // Pagination is now handled by MatTableDataSource
    console.log('Page changed:', event);
  }

  onSortChange(sort: Sort): void {
    // Implement sorting logic
    console.log('Sort changed:', sort);
  }

  // Filter methods
  applyFilters(): void {
    // Implement filtering logic
    console.log('Filters applied:', {
      country: this.filterCountry,
      currency: this.filterCurrency,
      status: this.filterStatus
    });
  }

  clearFilters(): void {
    this.filterCountry = '';
    this.filterCurrency = '';
    this.filterStatus = 'all';
    this.applyFilters();
  }
}
