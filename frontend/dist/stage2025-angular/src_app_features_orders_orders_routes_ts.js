"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_orders_orders_routes_ts"],{

/***/ 9871:
/*!**************************************************!*\
  !*** ./src/app/features/orders/orders.routes.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ordersRoutes: () => (/* binding */ ordersRoutes)
/* harmony export */ });
const ordersRoutes = [{
  path: "",
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_table_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_select_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_chips_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_paginator_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_sort_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_orders_components_order-list_order-list_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/order-list/order-list.component */ 2356)).then(m => m.OrderListComponent)
}, {
  path: "checkout",
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_select_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_dialog_mjs"), __webpack_require__.e("default-src_app_core_services_address_service_ts-src_app_features_profile_components_address--b409b4"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_orders_components_checkout_checkout_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/checkout/checkout.component */ 3685)).then(m => m.CheckoutComponent)
}, {
  path: ":id",
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_table_mjs"), __webpack_require__.e("default-node_modules_angular_material_fesm2022_chips_mjs"), __webpack_require__.e("common"), __webpack_require__.e("src_app_features_orders_components_order-detail_order-detail_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/order-detail/order-detail.component */ 9921)).then(m => m.OrderDetailComponent)
}, {
  path: ":orderId/payment",
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("common"), __webpack_require__.e("src_app_features_orders_components_payment_payment_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/payment/payment.component */ 2415)).then(m => m.PaymentComponent)
}];

/***/ })

}]);
//# sourceMappingURL=src_app_features_orders_orders_routes_ts.js.map