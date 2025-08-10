# REST API – Stage2025

Base URL: `http://<host>:8082`

Auth
- POST `/api/auth/signup` { username, email, password, role }
- POST `/api/auth/login` { identifier, password }
  - Admin: returns JWT immediately
  - Users: returns OTP_REQUIRED → verify via `/api/auth/login/verify-otp`
- POST `/api/auth/login/verify-otp` { email, otp }
- POST `/api/auth/verify-email` { email, otp }
- POST `/api/auth/resend-otp` { email, type }
- POST `/api/auth/forgot-password` { email }
- POST `/api/auth/reset-password` { email, otp, newPassword }

Products (public)
- GET `/api/products` (via products.routes + ProductListComponent; supports paging/filtering on backend through `getAllProducts` service)
- GET `/api/products/{id}`
- GET `/api/products/featured`
- GET `/api/products/{id}/suggested`

Products (admin)
- GET `/api/products/pending`
- PUT `/api/products/{id}/approve`
- DELETE `/api/products/{id}/reject`
- PUT `/api/products/approve-multiple` { productIds: number[] }
- PUT `/api/products/{id}/suspend`
- PUT `/api/products/{id}/activate`
- DELETE `/api/products/{id}/permanent`
- PUT `/api/products/bulk-update` { productIds: number[], updateData: Partial<ProductDto> }

Categories (public)
- GET `/api/categories` (used by frontend home and filters)

Cart (auth required)
- GET `/api/cart`
- POST `/api/cart/add` { productId, quantity, unitPrice, productName }
- PUT `/api/cart/item/{cartItemId}` ?quantity=number
- DELETE `/api/cart/item/{cartItemId}`
- DELETE `/api/cart/clear`

Orders (auth required)
- GET `/api/orders` (per client)
- GET `/api/orders/{id}`
- (Creation from cart handled in service; endpoint may exist in OrderController if present)

Suppliers
- GET `/api/suppliers/{id}/debug-fetch` (admin) – fetch products without saving
- POST `/api/suppliers/{id}/refresh-metadata` (admin)
- POST `/api/suppliers/refresh-all-soap-metadata` (admin)
- (Excel upload endpoint available if Excel supplier is used)

Supplier Payments (admin)
- GET `/api/admin/supplier-payments/dashboard`
- GET `/api/admin/supplier-payments` (filters: supplierId, status, startDate, endDate)
- GET `/api/admin/supplier-payments/{paymentId}`
- POST `/api/admin/supplier-payments/{paymentId}/process` (header: X-Admin-Id)
- PUT `/api/admin/supplier-payments/{paymentId}/status` { status, notes } (header: X-Admin-Id)
- POST `/api/admin/supplier-payments/{paymentId}/cancel` { reason } (header: X-Admin-Id)
- GET `/api/admin/supplier-payments/suppliers/{supplierId}/summary`
- GET `/api/admin/supplier-payments/suppliers/summaries`
- POST `/api/admin/supplier-payments/process-scheduled`
- POST `/api/admin/supplier-payments/batch/weekly`
- POST `/api/admin/supplier-payments/batch/monthly`
- GET `/api/admin/supplier-payments/statistics` (optional date range)

Admin Users (admin)
- GET `/api/admin/users`
- GET `/api/admin/users/{id}`
- PUT `/api/admin/users/{id}` { firstName, lastName, email, phone }
- DELETE `/api/admin/users/{id}`
- PUT `/api/admin/users/{id}/suspend` { reason }
- PUT `/api/admin/users/{id}/activate`
- PUT `/api/admin/users/{id}/ban` { reason }
- PUT `/api/admin/users/{id}/unban`
- PUT `/api/admin/users/{id}/role` { role }
- PUT `/api/admin/users/bulk/suspend` { userIds, reason }
- PUT `/api/admin/users/bulk/activate` { userIds }
- DELETE `/api/admin/users/bulk` { userIds }
- POST `/api/admin/users/{id}/reset-password`
- POST `/api/admin/users/{id}/force-password-change`
- GET `/api/admin/users/search?term=...`
- POST `/api/admin/users/filter` { role?, active?, registeredAfter? }
- GET `/api/admin/users/statistics`

Admin Dashboard & Monitoring (admin)
- GET `/api/admin/dashboard/stats`
- GET `/api/admin/dashboard/health`
- GET `/api/admin/monitoring/health`
- GET `/api/admin/monitoring/metrics`
- GET `/api/admin/monitoring/performance`
- GET `/api/admin/monitoring/operations`
- GET `/api/admin/monitoring/operations/counts`
- GET `/api/admin/monitoring/stats`
- POST `/api/admin/monitoring/record/{event}`
- POST `/api/admin/monitoring/reset`
- GET `/api/admin/monitoring/operations/{operation}/average`
- POST `/api/admin/monitoring/health/check`

Images (public)
- GET `/api/images/proxy?url=...` – safe proxy for remote or local uploads

Notes
- All admin endpoints require JWT with role ADMIN.
- Public endpoints are whitelisted in security config (products, categories, images, auth).
- OTP flow applies to non-admin users for login and email verification.



