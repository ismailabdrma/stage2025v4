import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatTableModule } from "@angular/material/table"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { AddressService } from "@core/services/address.service"
import { AddressDialogComponent } from "@app/features/profile/components/address-dialog/address-dialog.component"

@Component({
  selector: "app-addresses",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./addresses.component.html",
  styleUrl: "./addresses.component.scss",
})
export class AddressesComponent implements OnInit {
  private addressService = inject(AddressService)
  private dialog = inject(MatDialog)
  private snackBar = inject(MatSnackBar)

  addresses: any[] = []
  loading = false

  ngOnInit(): void {
    this.loadAddresses()
  }

  loadAddresses(): void {
    this.loading = true
    this.addressService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses
        this.loading = false
      },
      error: () => {
        this.snackBar.open("Failed to load addresses", "Close", { duration: 3000 })
        this.addresses = []
        this.loading = false
      },
    })
  }

  openAddressDialog(address?: any): void {
    const dialogRef = this.dialog.open(AddressDialogComponent, {
      width: "500px",
      data: address || null,
    })

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (address) {
          this.addressService.updateAddress(address.id, result).subscribe({
            next: () => {
              this.snackBar.open("Address updated", "Close", { duration: 3000 })
              this.loadAddresses()
            },
            error: () => this.snackBar.open("Failed to update address", "Close", { duration: 3000 }),
          })
        } else {
          this.addressService.addAddress(result).subscribe({
            next: () => {
              this.snackBar.open("Address added", "Close", { duration: 3000 })
              this.loadAddresses()
            },
            error: () => this.snackBar.open("Failed to add address", "Close", { duration: 3000 }),
          })
        }
      }
    })
  }

  editAddress(address: any): void {
    this.openAddressDialog(address)
  }

  setDefault(addressId: number): void {
    this.addressService.setDefaultAddress(addressId).subscribe({
      next: () => {
        this.snackBar.open("Default address updated", "Close", { duration: 3000 })
        this.loadAddresses()
      },
      error: () => this.snackBar.open("Failed to set default address", "Close", { duration: 3000 })
    })
  }

  deleteAddress(id: number): void {
    this.addressService.deleteAddress(id).subscribe({
      next: () => {
        this.snackBar.open('Address deleted', 'Close', { duration: 3000 })
        this.loadAddresses()
      },
      error: () => this.snackBar.open('Failed to delete address', 'Close', { duration: 3000 })
    })
  }
}
