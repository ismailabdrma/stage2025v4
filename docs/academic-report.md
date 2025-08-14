## Stage2025 Marketplace: Academic Report

### Abstract
This report presents the design, implementation, and evaluation of Stage2025, a two-tier marketplace application composed of an Angular frontend and a Spring Boot backend. The system enables product browsing, shopping cart management (guest and authenticated), checkout with Stripe, order lifecycle management, supplier payout processing, and an administrative dashboard. We detail architecture decisions, data models, key workflows, security, error handling, and recent fixes that brought the system to a production-ready baseline.

### 1. Introduction
Modern marketplaces must integrate seamless cart and checkout experiences, robust order management, supplier settlements, and real-time administrative insights. Stage2025 addresses these goals through a modular architecture that separates UI concerns (Angular) from domain logic and persistence (Spring Boot + MySQL).

Objectives:
- Provide a reactive cart experience for both guest and authenticated users.
- Support secure checkout via Stripe with the latest recommended flow.
- Offer order management and administrative dashboards, including low-stock alerts and supplier payments.
- Ensure reliability via transactional boundaries, DTO mapping, and consistent error handling.

### 2. System Overview
- Frontend (Angular): SPA with modular features (Cart, Orders, Admin, Shared).
- Backend (Spring Boot): REST APIs secured with JWT, JPA/Hibernate for persistence, SMTP for email, Stripe integration for payments.
- Database (MySQL): Domain entities (User/Client/Admin, Product, Supplier, Cart/CartItem, Order/OrderItem, SupplierPayment, Payment, ShippingAddress).

### 3. Requirements
#### 3.1 Functional
- Browsing products and adding/removing items to/from cart.
- Guest cart (local) and authenticated cart (server) with post-login merge.
- Stripe-based checkout and order creation.
- Order retrieval, status update (e.g., PAID, SHIPPED), and detailed view (including shipping address).
- Admin dashboard: metrics, recent paid orders, low-stock alerts (threshold ≤ 10), supplier payment summaries.
- Supplier payment processing for two flows: commission owed to marketplace vs. payouts owed to suppliers.
- Email notifications to clients, suppliers, and admin on key events.

#### 3.2 Non-Functional
- Reliability: transactional service methods; consistent DTO mapping.
- Performance: repository counts over in-memory aggregation; batch supplier payments for weekly/monthly.
- Security: JWT-based authentication and role-based authorization.
- Maintainability: modular services, DTOs, and clear separation of concerns.

### 4. Architecture
#### 4.1 Frontend (Angular)
- Standalone components; RxJS streams for reactivity.
- `CartService` uses `BehaviorSubject` to unify guest and authenticated cart states; normalization layer aligns backend DTOs with UI expectations.
- Angular Material used for UI; forms via `FormsModule`.

#### 4.2 Backend (Spring Boot)
- Controllers expose REST endpoints; Services encapsulate business logic; Repositories provide persistence operations.
- Security with JWT filter chain and role checks; Stripe configured via dedicated config.
- Email via JavaMailSender; “From” set to SMTP username for deliverability.

### 5. Data Model (selected)
- User (Admin/Client via roles), Supplier, Product (stockQuantity, reservedStock), Cart/CartItem, Order/OrderItem, Payment, SupplierPayment, ShippingAddress.
- SupplierPayment supports two flows: commission (supplier owes marketplace) and payout (marketplace pays supplier).

### 6. Key Workflows
#### 6.1 Authentication
- Frontend stores JWT; `AuthService.isAuthenticated$` drives guarded flows.

#### 6.2 Cart (Guest vs Authenticated)
- Guest cart stored in `localStorage` and mirrored via a `BehaviorSubject`.
- Authenticated cart fetched from `/api/cart` and normalized to frontend shape.
- Post-login merge: POST `/api/cart/merge` with guest items; server consolidates and returns updated cart; guest cart is cleared.
- Normalization maps server `CartDto` fields (e.g., `totalAmount`, `totalItems`) to frontend (`total`, `itemCount`), ensuring reactive totals and item counts.

#### 6.3 Checkout (Stripe)
- Stripe Elements integration adheres to latest guidance: call `elements.submit()` before `confirmPayment()` to validate UI inputs and handle asynchronous flows.
- PaymentIntent lifecycle handled server-side; upon success, order is created and emails are sent.

#### 6.4 Orders
- Order creation upon payment confirmation; includes `subtotal`, `shippingFee`, and `createdAt` in DTOs.
- Status updates via `PUT /api/orders/{orderId}/status` or existing `PATCH` mapping.
- Order detail view displays shipping address and provides receipt download.

#### 6.5 Admin Dashboard
- Displays recent paid orders, order status counts, user/product metrics, and low-stock alerts (≤ 10).
- Uses transactional read-only service methods and repository-level counts for efficiency and to avoid lazy loading issues.

#### 6.6 Supplier Payments
- Flow A (Supplier handles payment): create a commission record (supplier owes us). Commission notification and possible invoicing via API.
- Flow B (Marketplace pays supplier): create payout records (we owe the supplier their price), scheduled by frequency (immediate/weekly/monthly).
- Admin actions: process immediate payment, mark as paid; supports batch processing for scheduled groups. Email notifications inform suppliers.

#### 6.7 Email Subsystem
- Client: order confirmations, password/admin notifications.
- Supplier: order inclusion details, commission/payout notifications.
- Admin: new order/supplier notifications.
- Deliverability improved by setting the "From" address to the SMTP username.

### 7. Implementation Highlights
- Angular fixes: removed duplicate class declarations; added missing `FormsModule` and Angular Material imports; simplified templates to avoid parser errors; ensured reactivity in cart.
- Backend fixes: added `@Transactional(readOnly = true)` where needed; introduced PUT status updates; expanded DTO mappings (`OrderDto`, `ShippingAddressDto`); completed supplier payment service methods and dashboards; normalized email sender behavior.

### 8. API Surface (selected)
- Cart
  - GET `/api/cart` → current cart (server dto)
  - POST `/api/cart/items` → add item (variant-aware)
  - PUT `/api/cart/items/{cartItemId}` body `{quantity}` → update quantity
  - DELETE `/api/cart/items/{cartItemId}` → remove item (returns updated cart)
  - DELETE `/api/cart/clear` → clear
  - POST `/api/cart/merge` → merge guest items after login
  - GET `/api/cart/count` → `{count}`
- Orders
  - PUT `/api/orders/{orderId}/status` with JSON `{status}`
- Supplier Payments (Admin)
  - GET `/api/admin/supplier-payments` (list), GET `/api/admin/supplier-payments/{id}` (detail)
  - POST `/{id}/process` (immediate processing)
  - PUT `/{id}/status` body `{status, notes, adminId}` (mark paid/failed)
  - GET `/api/admin/supplier-payments/dashboard` (aggregates)

### 9. Error Handling and Logging
- Global exception handling for REST controllers; structured logs emitted for controller mappings, Hibernate operations, and security filter chain.
- Frontend uses RxJS `catchError` to provide fallbacks (e.g., guest cart when authenticated cart fails) and user-facing snackbars/toasts.

### 10. Security
- JWT authentication with filter chain; anonymous paths restricted; role checks for admin endpoints.
- CORS configured to allow SPA backend communication in development.

### 11. Performance Considerations
- Repository-level counts and queries for dashboards (avoids in-memory aggregations).
- Supplier payments batch processing for weekly/monthly groups.
- Angular change detection aided by trackBy in lists and immutable updates via streams.

### 12. Build & Run
Backend:
```bash
mvn spring-boot:run
```

Frontend:
```bash
cd frontend
npm install
ng serve
```

Configuration (examples):
- Database: `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`
- Mail: `spring.mail.host`, `spring.mail.port`, `spring.mail.username`, `spring.mail.password`, `app.email.from`
- Stripe: secret key; see Stripe configuration in backend

### 13. Testing and Evaluation
- Manual test plan covers: cart guest/auth flows, merge after login, subtotal/total reactivity, checkout success path, order views, admin dashboard visibility, supplier payment actions, and email delivery.
- Validations:
  - Cart reactivity: updates reflect immediately for both guest and authenticated states.
  - Stripe flow: enforced `elements.submit()` prior to `confirmPayment()`.
  - Dashboard: recent paid orders and low-stock alerts visible with seed data.

### 14. Limitations and Future Work
- Wishlist merge API is not yet implemented; frontend temporarily uses local wishlist for authenticated users to avoid server errors.
- Improve payment reconciliation with actual provider callbacks for supplier payouts and commissions.
- Add automated tests (unit/integration/E2E) and CI pipeline.
- Enhance reporting/analytics with trend charts and export features.

### 15. Conclusion
Stage2025 achieves a complete marketplace flow with a clean separation of concerns, reactive UX, and robust backend services. The cart now reflects changes instantly in both guest and authenticated contexts; checkout adheres to current Stripe guidance; administrative and supplier features deliver practical oversight and controls. The foundation supports future enhancements in analytics, automation, and third-party integrations.

### 16. References
- Angular documentation: [Angular Docs](https://angular.io/docs)
- RxJS documentation: [RxJS Docs](https://rxjs.dev/)
- Spring Boot documentation: [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- Spring Data JPA: [Spring Data JPA Docs](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- Stripe Elements (deferred payment): [Stripe Elements integration guide](https://stripe.com/docs/payments/accept-a-payment-deferred)



### Abstract
This report presents the design, implementation, and evaluation of Stage2025, a two-tier marketplace application composed of an Angular frontend and a Spring Boot backend. The system enables product browsing, shopping cart management (guest and authenticated), checkout with Stripe, order lifecycle management, supplier payout processing, and an administrative dashboard. We detail architecture decisions, data models, key workflows, security, error handling, and recent fixes that brought the system to a production-ready baseline.

### 1. Introduction
Modern marketplaces must integrate seamless cart and checkout experiences, robust order management, supplier settlements, and real-time administrative insights. Stage2025 addresses these goals through a modular architecture that separates UI concerns (Angular) from domain logic and persistence (Spring Boot + MySQL).

Objectives:
- Provide a reactive cart experience for both guest and authenticated users.
- Support secure checkout via Stripe with the latest recommended flow.
- Offer order management and administrative dashboards, including low-stock alerts and supplier payments.
- Ensure reliability via transactional boundaries, DTO mapping, and consistent error handling.

### 2. System Overview
- Frontend (Angular): SPA with modular features (Cart, Orders, Admin, Shared).
- Backend (Spring Boot): REST APIs secured with JWT, JPA/Hibernate for persistence, SMTP for email, Stripe integration for payments.
- Database (MySQL): Domain entities (User/Client/Admin, Product, Supplier, Cart/CartItem, Order/OrderItem, SupplierPayment, Payment, ShippingAddress).

### 3. Requirements
#### 3.1 Functional
- Browsing products and adding/removing items to/from cart.
- Guest cart (local) and authenticated cart (server) with post-login merge.
- Stripe-based checkout and order creation.
- Order retrieval, status update (e.g., PAID, SHIPPED), and detailed view (including shipping address).
- Admin dashboard: metrics, recent paid orders, low-stock alerts (threshold ≤ 10), supplier payment summaries.
- Supplier payment processing for two flows: commission owed to marketplace vs. payouts owed to suppliers.
- Email notifications to clients, suppliers, and admin on key events.

#### 3.2 Non-Functional
- Reliability: transactional service methods; consistent DTO mapping.
- Performance: repository counts over in-memory aggregation; batch supplier payments for weekly/monthly.
- Security: JWT-based authentication and role-based authorization.
- Maintainability: modular services, DTOs, and clear separation of concerns.

### 4. Architecture
#### 4.1 Frontend (Angular)
- Standalone components; RxJS streams for reactivity.
- `CartService` uses `BehaviorSubject` to unify guest and authenticated cart states; normalization layer aligns backend DTOs with UI expectations.
- Angular Material used for UI; forms via `FormsModule`.

#### 4.2 Backend (Spring Boot)
- Controllers expose REST endpoints; Services encapsulate business logic; Repositories provide persistence operations.
- Security with JWT filter chain and role checks; Stripe configured via dedicated config.
- Email via JavaMailSender; “From” set to SMTP username for deliverability.

### 5. Data Model (selected)
- User (Admin/Client via roles), Supplier, Product (stockQuantity, reservedStock), Cart/CartItem, Order/OrderItem, Payment, SupplierPayment, ShippingAddress.
- SupplierPayment supports two flows: commission (supplier owes marketplace) and payout (marketplace pays supplier).

### 6. Key Workflows
#### 6.1 Authentication
- Frontend stores JWT; `AuthService.isAuthenticated$` drives guarded flows.

#### 6.2 Cart (Guest vs Authenticated)
- Guest cart stored in `localStorage` and mirrored via a `BehaviorSubject`.
- Authenticated cart fetched from `/api/cart` and normalized to frontend shape.
- Post-login merge: POST `/api/cart/merge` with guest items; server consolidates and returns updated cart; guest cart is cleared.
- Normalization maps server `CartDto` fields (e.g., `totalAmount`, `totalItems`) to frontend (`total`, `itemCount`), ensuring reactive totals and item counts.

#### 6.3 Checkout (Stripe)
- Stripe Elements integration adheres to latest guidance: call `elements.submit()` before `confirmPayment()` to validate UI inputs and handle asynchronous flows.
- PaymentIntent lifecycle handled server-side; upon success, order is created and emails are sent.

#### 6.4 Orders
- Order creation upon payment confirmation; includes `subtotal`, `shippingFee`, and `createdAt` in DTOs.
- Status updates via `PUT /api/orders/{orderId}/status` or existing `PATCH` mapping.
- Order detail view displays shipping address and provides receipt download.

#### 6.5 Admin Dashboard
- Displays recent paid orders, order status counts, user/product metrics, and low-stock alerts (≤ 10).
- Uses transactional read-only service methods and repository-level counts for efficiency and to avoid lazy loading issues.

#### 6.6 Supplier Payments
- Flow A (Supplier handles payment): create a commission record (supplier owes us). Commission notification and possible invoicing via API.
- Flow B (Marketplace pays supplier): create payout records (we owe the supplier their price), scheduled by frequency (immediate/weekly/monthly).
- Admin actions: process immediate payment, mark as paid; supports batch processing for scheduled groups. Email notifications inform suppliers.

#### 6.7 Email Subsystem
- Client: order confirmations, password/admin notifications.
- Supplier: order inclusion details, commission/payout notifications.
- Admin: new order/supplier notifications.
- Deliverability improved by setting the "From" address to the SMTP username.

### 7. Implementation Highlights
- Angular fixes: removed duplicate class declarations; added missing `FormsModule` and Angular Material imports; simplified templates to avoid parser errors; ensured reactivity in cart.
- Backend fixes: added `@Transactional(readOnly = true)` where needed; introduced PUT status updates; expanded DTO mappings (`OrderDto`, `ShippingAddressDto`); completed supplier payment service methods and dashboards; normalized email sender behavior.

### 8. API Surface (selected)
- Cart
  - GET `/api/cart` → current cart (server dto)
  - POST `/api/cart/items` → add item (variant-aware)
  - PUT `/api/cart/items/{cartItemId}` body `{quantity}` → update quantity
  - DELETE `/api/cart/items/{cartItemId}` → remove item (returns updated cart)
  - DELETE `/api/cart/clear` → clear
  - POST `/api/cart/merge` → merge guest items after login
  - GET `/api/cart/count` → `{count}`
- Orders
  - PUT `/api/orders/{orderId}/status` with JSON `{status}`
- Supplier Payments (Admin)
  - GET `/api/admin/supplier-payments` (list), GET `/api/admin/supplier-payments/{id}` (detail)
  - POST `/{id}/process` (immediate processing)
  - PUT `/{id}/status` body `{status, notes, adminId}` (mark paid/failed)
  - GET `/api/admin/supplier-payments/dashboard` (aggregates)

### 9. Error Handling and Logging
- Global exception handling for REST controllers; structured logs emitted for controller mappings, Hibernate operations, and security filter chain.
- Frontend uses RxJS `catchError` to provide fallbacks (e.g., guest cart when authenticated cart fails) and user-facing snackbars/toasts.

### 10. Security
- JWT authentication with filter chain; anonymous paths restricted; role checks for admin endpoints.
- CORS configured to allow SPA backend communication in development.

### 11. Performance Considerations
- Repository-level counts and queries for dashboards (avoids in-memory aggregations).
- Supplier payments batch processing for weekly/monthly groups.
- Angular change detection aided by trackBy in lists and immutable updates via streams.

### 12. Build & Run
Backend:
```bash
mvn spring-boot:run
```

Frontend:
```bash
cd frontend
npm install
ng serve
```

Configuration (examples):
- Database: `spring.datasource.url`, `spring.datasource.username`, `spring.datasource.password`
- Mail: `spring.mail.host`, `spring.mail.port`, `spring.mail.username`, `spring.mail.password`, `app.email.from`
- Stripe: secret key; see Stripe configuration in backend

### 13. Testing and Evaluation
- Manual test plan covers: cart guest/auth flows, merge after login, subtotal/total reactivity, checkout success path, order views, admin dashboard visibility, supplier payment actions, and email delivery.
- Validations:
  - Cart reactivity: updates reflect immediately for both guest and authenticated states.
  - Stripe flow: enforced `elements.submit()` prior to `confirmPayment()`.
  - Dashboard: recent paid orders and low-stock alerts visible with seed data.

### 14. Limitations and Future Work
- Wishlist merge API is not yet implemented; frontend temporarily uses local wishlist for authenticated users to avoid server errors.
- Improve payment reconciliation with actual provider callbacks for supplier payouts and commissions.
- Add automated tests (unit/integration/E2E) and CI pipeline.
- Enhance reporting/analytics with trend charts and export features.

### 15. Conclusion
Stage2025 achieves a complete marketplace flow with a clean separation of concerns, reactive UX, and robust backend services. The cart now reflects changes instantly in both guest and authenticated contexts; checkout adheres to current Stripe guidance; administrative and supplier features deliver practical oversight and controls. The foundation supports future enhancements in analytics, automation, and third-party integrations.

### 16. References
- Angular documentation: [Angular Docs](https://angular.io/docs)
- RxJS documentation: [RxJS Docs](https://rxjs.dev/)
- Spring Boot documentation: [Spring Boot Docs](https://docs.spring.io/spring-boot/docs/current/reference/html/)
- Spring Data JPA: [Spring Data JPA Docs](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/)
- Stripe Elements (deferred payment): [Stripe Elements integration guide](https://stripe.com/docs/payments/accept-a-payment-deferred)


