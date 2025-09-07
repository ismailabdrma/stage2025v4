import { Component, type OnInit, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { RouterModule } from "@angular/router"
import { MatCardModule } from "@angular/material/card"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from "@angular/material/paginator"
import { MatSortModule } from "@angular/material/sort"
import { MatFormFieldModule } from "@angular/material/form-field"
import { MatInputModule } from "@angular/material/input"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from "@angular/material/icon"
import { MatChipsModule } from "@angular/material/chips"
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar"
import { MatSelectModule } from "@angular/material/select"
import { MatOptionModule } from "@angular/material/core"
import { OrderService } from "@core/services/order.service"
import type { Order } from "@core/models/order.model"

interface OrderStatusResponse {
  success: boolean
  message?: string
  orderId?: number
  newStatus?: string
  error?: string
}

@Component({
  selector: "app-admin-orders",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: "./admin-orders.component.html",
  styleUrl: "./admin-orders.component.scss",
})
export class AdminOrdersComponent implements OnInit {
  private snackBar = inject(MatSnackBar)
  private orderService = inject(OrderService)

  orders: Order[] = []
  displayedColumns: string[] = ["id", "customerName", "orderDate", "total", "status", "actions"]
  statuses = [
    { value: 'ALL', label: 'All' },
    { value: 'PAID', label: 'Paid' },
    { value: 'PENDING', label: 'Pending' },
    { value: 'CONFIRMED', label: 'Confirmed' },
    { value: 'SHIPPED', label: 'Shipped' },
    { value: 'DELIVERED', label: 'Delivered' },
    { value: 'CANCELLED', label: 'Cancelled' },
  ]
  selectedStatus = 'ALL'

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders(): void {
    const obs = this.selectedStatus === 'ALL'
      ? this.orderService.getAllOrders()
      : this.orderService.getOrdersByStatus(this.selectedStatus)

    obs.subscribe({
      next: (orders) => {
        this.orders = this.sortPaidFirst(orders)
      },
      error: (error) => {
        console.error("Error loading orders:", error)
        this.snackBar.open("Failed to load orders.", "Close", { duration: 3000 })
        this.orders = []
      },
    })
  }

  onStatusFilterChange(value: string) {
    this.selectedStatus = value
    this.loadOrders()
  }

  private sortPaidFirst(orders: Order[]): Order[] {
    const statusPriority: Record<string, number> = { PAID: 0 }
    return [...orders].sort((a, b) => {
      const pa = statusPriority[a.status] ?? 1
      const pb = statusPriority[b.status] ?? 1
      if (pa !== pb) return pa - pb
      const da = new Date(a.orderDate).getTime()
      const db = new Date(b.orderDate).getTime()
      return db - da
    })
  }

  getStatusColor(status: string): string {
    switch (status) {
      case "PENDING":
        return "warn"
      case "PROCESSING":
        return "accent"
      case "CONFIRMED":
        return "primary"
      case "PAID":
        return "primary"
      case "SHIPPED":
        return "accent"
      case "DELIVERED":
        return "primary"
      case "COMPLETED":
        return "primary"
      case "CANCELLED":
        return "warn"
      case "PAYMENT_FAILED":
        return "warn"
      default:
        return ""
    }
  }

  updateOrderStatus(order: Order, status: string): void {
    this.orderService.updateOrderStatus(order.id, status).subscribe({
      next: (response: Order | OrderStatusResponse) => {
        // Handle both old and new response formats
        if (response && typeof response === 'object' && 'success' in response) {
          // New response format (OrderStatusResponse)
          const statusResponse = response as OrderStatusResponse
          if (statusResponse.success) {
            this.snackBar.open(`Order #${order.id} status updated to ${status}`, "Close", { duration: 3000 })
            this.loadOrders() // Refresh the list
          } else {
            this.snackBar.open(`Failed to update order status: ${statusResponse.error || 'Unknown error'}`, "Close", { duration: 5000 })
          }
        } else {
          // Old response format (Order object)
          this.snackBar.open(`Order #${order.id} status updated to ${status}`, "Close", { duration: 3000 })
          this.loadOrders() // Refresh the list
        }
      },
      error: (error) => {
        console.error("Error updating order status:", error)
        let errorMessage = "Failed to update order status."
        
        if (error.error && error.error.error) {
          errorMessage = error.error.error
        } else if (error.message) {
          errorMessage = error.message
        }
        
        this.snackBar.open(errorMessage, "Close", { duration: 5000 })
      },
    })
  }
}
