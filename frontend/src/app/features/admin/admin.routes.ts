import type { Routes } from "@angular/router"

export const adminRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./components/admin-dashboard/admin-dashboard.component").then((m) => m.AdminDashboardComponent),
  },
  {
    path: "products",
    loadComponent: () =>
      import("./components/admin-products/admin-products.component").then((m) => m.AdminProductsComponent),
  },
  {
    path: "orders",
    loadComponent: () => import("./components/admin-orders/admin-orders.component").then((m) => m.AdminOrdersComponent),
  },
  {
    path: "users",
    loadComponent: () => import("./components/admin-users/admin-users.component").then((m) => m.AdminUsersComponent),
  },
  {
    path: "suppliers",
    loadComponent: () =>
        import("./components/admin-suppliers/admin-suppliers.component").then((m) => m.AdminSuppliersComponent),
  },
  {
    path: "supplier-payments",
    loadComponent: () =>
        import("./pages/supplier-payments/supplier-payments.component").then((m) => m.SupplierPaymentsComponent),
  },
  {
    path: "system-monitoring",
    loadComponent: () =>
        import("./pages/system-monitoring/system-monitoring.component").then((m) => m.SystemMonitoringComponent),
  },
  {
    path: "system-status",
    loadComponent: () =>
        import("./components/system-status/system-status.component").then((m) => m.SystemStatusComponent),
  }
]
