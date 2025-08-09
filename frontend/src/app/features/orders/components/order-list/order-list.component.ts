import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner"
import { MatChipsModule } from "@angular/material/chips"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatCardModule } from "@angular/material/card"
import { OrderService } from "@core/services/order.service"
import type { OrderSummary } from "@core/models/order.model"

@Component({
  selector: "app-order-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: "./order-list.component.html",
  styleUrl: "./order-list.component.scss",
})
export class OrderListComponent implements OnInit {
  private orderService = inject(OrderService)
  private snackBar = inject(MatSnackBar)

  orders: OrderSummary[] = []
  loading = true
  displayedColumns: string[] = ["id", "date", "total", "status", "actions"]

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders(): void {
    this.loading = true
    this.orderService.getOrders().subscribe({
      next: (orders: OrderSummary[]) => { this.orders = orders; this.loading = false },
      error: () => {
        this.snackBar.open("Failed to load orders", "Close", { duration: 3000 })
        this.orders = []
        this.loading = false
      },
    })
  }
}
