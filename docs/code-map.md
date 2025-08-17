## Stage2025 Code Map (Per-file Documentation)

This document lists the key backend and frontend files and describes what each does.

### Backend (Spring Boot)

#### Controllers (`src/main/java/com/example/stage2025/controller`)
- `AuthController.java`: Authentication endpoints (login, signup, OTP verification, password reset).
- `UserController.java`: User self-service endpoints (profile, addresses, etc.).
- `UserManagementController.java`: Admin user management (CRUD, roles).
- `ProductController.java`: Public and admin product operations (list, detail, create/update).
- `CategoryController.java`: Manage product categories.
- `SupplierController.java`: Supplier listing and admin supplier operations.
- `CartController.java`: Cart APIs: get cart, add/update/remove items, clear, merge guest cart, count.
- `OrderController.java`: Order listing/detail, status update (PUT/PATCH), create flows.
- `PaymentController.java`: Stripe intent creation/confirmation and payment status callbacks.
- `DashboardController.java`: Admin dashboard stats (users, orders, revenue, low stock, recent paid orders).
- `AdminSupplierPaymentController.java`: Admin supplier payments list/detail, process, mark paid, dashboard.
- `ShippingController.java`: Shipping quotes and related endpoints.
- `AddressController.java`: Manage customer addresses.
- `ImageController.java`, `FileUploadController.java`: Asset upload and retrieval.
- `ProductImportController.java`, `ImportLogController.java`: Product import endpoints and logs.
- Diagnostics: `AdminMonitoringController.java`, `AnalyticsController.java`, `DiagnosticController.java`, `DebugController.java`, SOAP test controllers.

#### Services (`src/main/java/com/example/stage2025/service`)
- `OrderService` (+ `impl/OrderServiceImpl.java`): Order creation, retrieval, status management; transactional boundaries to avoid lazy loading.
- `CartService` (+ `impl/CartServiceImpl.java`): Server-side cart management for authenticated users.
- `SupplierPaymentService` (+ `impl/SupplierPaymentServiceComplete.java`): Full supplier payment logic (commission vs payout), batch processing, notifications, dashboards.
- `SupplierService` (+ `impl/SupplierServiceImpl.java`): Supplier CRUD and queries.
- `ProductService` (+ `impl/ProductServiceImpl.java`): Product CRUD, stock handling.
- `PaymentService` (+ `impl/PaymentServiceImpl.java`): Stripe integration and payment entity management.
- `ShippingService` (+ `impl/ShippingServiceImpl.java`): Shipping quotes and policies.
- `DashboardService.java`: Aggregates system stats for admin dashboard (read-only, optimized queries).
- `EmailService` (+ `impl/EmailServiceImpl.java`): SMTP-based email delivery to clients, suppliers, and admin.
- Other services: stock sync, import services, user management, OTP, activity logs, SOAP parsers/fetchers.

#### Repositories (`src/main/java/com/example/stage2025/repository`)
- `OrderRepository`, `OrderItemRepository`: Order-level persistence and queries.
- `CartRepository`, `CartItemRepository`: Cart persistence for authenticated users.
- `SupplierPaymentRepository`, `SupplierPaymentItemRepository`: Supplier payments and items.
- `ProductRepository`, `CategoryRepository`: Product and category persistence.
- `UserRepository`, `AdminRepository`, `ClientRepository`: User hierarchy.
- `AddressRepository`: Customer addresses.
- `PaymentRepository`: Payments.
- `ImportLogRepository`, `ActivityLogRepository`, `OtpTokenRepository`: Auxiliary persistence.

#### DTOs (`src/main/java/com/example/stage2025/dto`)
- `OrderDto`, `OrderItemDto`: Orders exposed to frontend; includes `subtotal`, `shippingFee`, `createdAt`.
- `ShippingAddressDto`: Structured address details for delivery.
- `CartDto`, `CartItemDto`: Cart data from server (uses `totalAmount`, `totalItems`).
- `SupplierPaymentDto`, `SupplierPaymentItemDto`, `SupplierPaymentSummaryDto`: Payments to and from suppliers; dashboards.
- `PaymentIntentRequest/Response`, `PaymentConfirmRequest`: Stripe integration payloads.
- `DashboardStatsDto`: Admin metrics payload.
- Auth-related DTOs (Login, Register, OTP, JWT, etc.) and entity CRUD DTOs.

#### Entities (`src/main/java/com/example/stage2025/entity`)
- `User`, `Admin`, `Client`: User model with roles and profiles.
- `Product`, `Category`: Catalog data, including stock levels and supplier relationships.
- `Supplier`: Supplier profile; flags for own payment system and payout frequency.
- `Cart`, `CartItem`: Cart state persisted for authenticated users.
- `Order`, `OrderItem`: Orders; monetary fields; relationships to client, items, and payments.
- `Payment`: Payment records (Stripe refs, status).
- `SupplierPayment`, `SupplierPaymentItem`: Commission vs payout models.
- `Address`: Shipping addresses; linked to orders and users.
- Auxiliary: `ImportLog`, `ActivityLog`, `OtpToken`, SOAP supplier metadata.

### Frontend (Angular)

#### Core models (`frontend/src/app/core/models`)
- `cart.model.ts`: Cart and CartItem interfaces used across UI.
- `order.model.ts`, `product.model.ts`, `user.model.ts`, `supplier.model.ts`: Domain models for binding.

#### Core services (`frontend/src/app/core/services`)
- `auth.service.ts`: JWT auth, user state, guards.
- `cart.service.ts`: Reactive cart for guest/auth users, merge on login, normalization of server `CartDto` to UI shape, exposes `cart$` and helpers.
- `order.service.ts`: Fetch orders; update status; order detail.
- `payment.service.ts`: Stripe client-side helpers.
- `supplier-payment.service.ts`: Admin supplier payment endpoints (process, mark paid, dashboard).
- `dashboard.service.ts`: Admin dashboard queries (stats, recent orders, low stock).
- `wishlist.service.ts`: Local wishlist with merge temporarily disabled.
- Others: products, suppliers, search, analytics, address, system monitoring, activity log, import logs.

#### Interceptors, guards, store
- `auth.interceptor.ts`: Attaches JWT to requests.
- Guards: `auth.guard.ts`, `admin.guard.ts`, `home-redirect.guard.ts` for navigation control.
- NgRx store (auth): actions/reducer/effects/selectors for authentication.

#### Features
- Cart
  - `features/cart/cart/cart.component.ts|html`: Cart UI; binds to `cartService.getCart()`; quantity updates and removals update stream; subtotal/total reflect immediately.
  - `features/cart/components/cart/cart.component.ts`: Older/aux cart component (if present).
  - `features/cart/cart.routes.ts`: Routing for cart feature.
- Orders
  - `features/orders/components/checkout/checkout.component.ts`: Stripe Elements flow with `elements.submit()` then `confirmPayment()`.
  - `features/orders/components/order-list/order-list.component.ts`: Displays user orders.
  - `features/orders/components/order-detail/order-detail.component.ts`: Shows shipping address; receipt download.
  - `features/orders/orders.routes.ts`: Routing for orders feature.
- Admin
  - `features/admin/components/admin-dashboard/admin-dashboard.component.ts`: Stats, recent paid orders, low stock.
  - `features/admin/components/admin-orders/admin-orders.component.ts`: Filter, sort (PAID first, newest).
  - `features/admin/pages/supplier-payments/supplier-payments.component.ts`: Payments table with Process/Mark Paid; details via snackbar.
  - `features/admin/components/admin-supplier-payments/admin-supplier-payments.component.ts`: Supplier payments component (alternative UI).
  - Additional admin components: users, products (pending/approval/create), categories, activity logs, monitoring.
- Products
  - `features/products/product-list/*` and `product-detail/*`: Catalog pages; variant selector; buy-now and add-to-cart.
- Auth
  - `features/auth/*`: Login/Signup/OTP/Reset/Forgot; French login variant; guards.
- Profile
  - `features/profile/*`: Profile, addresses, dialogs, routes.
- Shared
  - Components: `variant-selector`, `price-block`, `skeleton-loader`, `mini-cart-drawer`, `toast-notification`, `confirm-dialog`, `product-card`, `buy-now-button`, `city-selector`.

### How to Use This Map
- Use it as a quick index for onboarding and code navigation.
- Each path is relative to the repository root.
- Pair with the academic report for high-level context and workflows.







