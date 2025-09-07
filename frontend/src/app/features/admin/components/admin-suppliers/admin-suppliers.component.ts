import { Component, OnInit, inject, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatChipsModule } from "@angular/material/chips";
import { MatTooltipModule } from "@angular/material/tooltip";
import { SupplierService } from "@core/services/supplier.service";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateSupplierDialogComponent } from "./create-supplier-dialog/supplier-dialog.component";
import { Supplier } from "@core/models/supplier.model";
import { AuthService } from "@core/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: "app-admin-suppliers",
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatChipsModule,
        MatTooltipModule,
        MatSnackBarModule,
    ],
    templateUrl: "./admin-suppliers.component.html",
    styleUrl: "./admin-suppliers.component.scss",
})
export class AdminSuppliersComponent implements OnInit {
    private supplierService = inject(SupplierService);
    private snackBar = inject(MatSnackBar);
    private dialog = inject(MatDialog);
    private authService = inject(AuthService);
    private router = inject(Router);

    @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

    suppliers: Supplier[] = [];
    displayedColumns: string[] = ["name", "type", "config", "status", "actions"];
    loading = false;

    ngOnInit(): void {
        // Check if user is authenticated and has ADMIN role
        if (!this.authService.isAuthenticated()) {
            this.snackBar.open('Please log in to access admin panel', 'Close', { duration: 3000 });
            this.router.navigate(['/auth/login']);
            return;
        }

        if (!this.authService.hasRole('ADMIN')) {
            this.snackBar.open('Access denied. ADMIN role required.', 'Close', { duration: 3000 });
            this.router.navigate(['/']);
            return;
        }

        this.loadSuppliers();
    }

    loadSuppliers(): void {
        this.loading = true;
        this.supplierService.getAllSuppliers().subscribe({
            next: (suppliers) => {
                this.suppliers = suppliers;
                this.loading = false;
            },
            error: () => {
                this.suppliers = [];
                this.snackBar.open('Failed to load suppliers.', 'Close', { duration: 3000 });
                this.loading = false;
            },
        });
    }

    openCreateSupplierDialog(): void {
        const dialogRef = this.dialog.open(CreateSupplierDialogComponent, {
            width: "800px",
            maxWidth: "95vw",
            maxHeight: "90vh",
            data: null,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.loadSuppliers();
        });
    }

    openEditSupplierDialog(supplier: Supplier): void {
        const dialogRef = this.dialog.open(CreateSupplierDialogComponent, {
            width: "800px",
            maxWidth: "95vw",
            maxHeight: "90vh",
            data: supplier,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) this.loadSuppliers();
        });
    }

    // Statistics methods
    getActiveSuppliers(): number {
        return this.suppliers.filter(s => s.active).length;
    }

    getSuppliersByType(type: string): number {
        return this.suppliers.filter(s => s.type === type).length;
    }

    // UI helper methods
    getTypeIcon(type: string): string {
        switch (type) {
            case 'API': return 'api';
            case 'SOAP': return 'soap';
            case 'EXCEL': return 'table_view';
            case 'CSV': return 'insert_drive_file';
            default: return 'business';
        }
    }

    getTypeClass(type: string): string {
        switch (type) {
            case 'API': return 'api-type';
            case 'SOAP': return 'soap-type';
            case 'EXCEL': return 'excel-type';
            case 'CSV': return 'csv-type';
            default: return '';
        }
    }

    truncateUrl(url: string): string {
        if (!url) return '';
        return url.length > 40 ? url.substring(0, 40) + '...' : url;
    }

    triggerFileUpload(supplier: Supplier): void {
        // Create a temporary file input for this specific supplier
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = supplier.type === 'CSV' ? '.csv' : '.xlsx,.xls';
        input.style.display = 'none';
        
        input.onchange = (event: any) => {
            this.onExcelSelected(event, supplier.id);
        };
        
        document.body.appendChild(input);
        input.click();
        document.body.removeChild(input);
    }

    toggleActive(supplier: any): void {
        const operation = supplier.active ? this.supplierService.deactivateSupplier(supplier.id) : this.supplierService.activateSupplier(supplier.id);
        const successMessage = supplier.active ? 'Supplier deactivated successfully.' : 'Supplier activated successfully.';

        operation.subscribe({
            next: (response: any) => {
                // Handle both old and new response formats
                if (response && typeof response === 'object' && 'success' in response) {
                    // New response format
                    if (response.success) {
                        this.snackBar.open(response.message || successMessage, 'Close', { duration: 3000 });
                        this.loadSuppliers();
                    } else {
                        this.snackBar.open(`Failed to update supplier status: ${response.error || 'Unknown error'}`, 'Close', { duration: 5000 });
                    }
                } else {
                    // Old response format (simple string)
                    this.snackBar.open(successMessage, 'Close', { duration: 3000 });
                    this.loadSuppliers();
                }
            },
            error: (err) => {
                console.error('Failed to toggle supplier status', err);
                let errorMessage = 'Failed to update supplier status.';
                
                if (err.error && err.error.error) {
                    errorMessage = err.error.error;
                } else if (err.message) {
                    errorMessage = err.message;
                }
                
                this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
            }
        });
    }

    deleteSupplier(id: number): void {
        if (confirm("Are you sure you want to delete this supplier?")) {
            this.supplierService.deleteSupplier(id).subscribe({
                next: (response: any) => {
                    // Handle both old and new response formats
                    if (response && typeof response === 'object' && 'success' in response) {
                        if (response.success) {
                            this.snackBar.open(response.message || 'Supplier deleted successfully.', 'Close', { duration: 3000 });
                            this.loadSuppliers();
                        } else {
                            // Check if it's a conflict error with suggestion
                            if (response.error === 'CONFLICT' && response.suggestion) {
                                const forceDelete = confirm(`${response.message}\n\n${response.suggestion}\n\nDo you want to force delete?`);
                                if (forceDelete) {
                                    this.forceDeleteSupplier(id);
                                }
                            } else {
                                this.snackBar.open(`Failed to delete supplier: ${response.message || 'Unknown error'}`, 'Close', { duration: 5000 });
                            }
                        }
                    } else {
                        // Old response format (simple string)
                        this.snackBar.open('Supplier deleted successfully.', 'Close', { duration: 3000 });
                        this.loadSuppliers();
                    }
                },
                error: (err) => {
                    console.error('Failed to delete supplier', err);
                    let errorMessage = 'Failed to delete supplier.';
                    
                    if (err.error && err.error.message) {
                        errorMessage = err.error.message;
                        // Check if it's a conflict error with suggestion
                        if (err.error.error === 'CONFLICT' && err.error.suggestion) {
                            const forceDelete = confirm(`${err.error.message}\n\n${err.error.suggestion}\n\nDo you want to force delete?`);
                            if (forceDelete) {
                                this.forceDeleteSupplier(id);
                                return;
                            }
                        }
                    } else if (err.message) {
                        errorMessage = err.message;
                    }
                    
                    this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
                }
            });
        }
    }

    forceDeleteSupplier(id: number): void {
        this.supplierService.deleteSupplier(id, true).subscribe({
            next: (response: any) => {
                if (response && typeof response === 'object' && 'success' in response) {
                    if (response.success) {
                        this.snackBar.open(response.message || 'Supplier force deleted successfully.', 'Close', { duration: 3000 });
                        this.loadSuppliers();
                    } else {
                        this.snackBar.open(`Failed to force delete supplier: ${response.message || 'Unknown error'}`, 'Close', { duration: 5000 });
                    }
                } else {
                    this.snackBar.open('Supplier force deleted successfully.', 'Close', { duration: 3000 });
                    this.loadSuppliers();
                }
            },
            error: (err) => {
                console.error('Failed to force delete supplier', err);
                let errorMessage = 'Failed to force delete supplier.';
                
                if (err.error && err.error.message) {
                    errorMessage = err.error.message;
                } else if (err.message) {
                    errorMessage = err.message;
                }
                
                this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
            }
        });
    }

    importProducts(supplierId: number): void {
        this.supplierService.importProducts(supplierId).subscribe({
            next: () => {
                this.snackBar.open('Product import initiated successfully.', 'Close', { duration: 3000 });
            },
            error: (err) => {
                console.error('Failed to initiate product import', err);
                this.snackBar.open('Failed to initiate product import.', 'Close', { duration: 3000 });
            }
        });
    }

  onExcelSelected(event: Event, supplierId: number): void {
    const input = event.target as HTMLInputElement
    const file = input.files && input.files[0]
    if (!file) return
    this.supplierService.uploadExcel(file, supplierId).subscribe({
      next: () => {
        this.snackBar.open('Excel uploaded and import started.', 'Close', { duration: 3000 })
      },
      error: (err) => {
        console.error('Excel upload failed', err)
        this.snackBar.open('Excel upload failed.', 'Close', { duration: 3000 })
      }
    })
    // reset input
    input.value = ''
  }

  refreshSupplierMetadata(supplierId: number): void {
    this.supplierService.refreshMetadata(supplierId).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open('Metadata refreshed successfully!', 'Close', { duration: 3000 })
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 3000 })
        }
      },
      error: (err) => {
        console.error('Failed to refresh metadata', err)
        this.snackBar.open('Failed to refresh metadata.', 'Close', { duration: 3000 })
      }
    })
  }

  refreshAllSoapMetadata(): void {
    this.supplierService.refreshAllSoapMetadata().subscribe({
      next: (response) => {
        if (response.success) {
          this.snackBar.open(`${response.message}`, 'Close', { duration: 5000 })
        } else {
          this.snackBar.open(response.message, 'Close', { duration: 3000 })
        }
      },
      error: (err) => {
        console.error('Failed to refresh all SOAP metadata', err)
        this.snackBar.open('Failed to refresh all SOAP metadata.', 'Close', { duration: 3000 })
      }
    })
  }
}

