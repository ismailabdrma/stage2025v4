"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_admin_components_system-status_system-status_component_ts"],{

/***/ 434:
/*!************************************************************!*\
  !*** ./src/app/core/services/connectivity-test.service.ts ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConnectivityTestService: () => (/* binding */ ConnectivityTestService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1873);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @environments/environment */ 5312);






class ConnectivityTestService {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient);
    this.baseUrl = _environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl;
  }
  /**
   * Test all critical system endpoints
   */
  runFullConnectivityTest() {
    const startTime = Date.now();
    const tests = [this.testAuthService(), this.testProductService(), this.testCartService(), this.testOrderService(), this.testSupplierService(), this.testPaymentService(), this.testMonitoringService(), this.testEmailService()];
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.forkJoin)(tests).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(results => {
      const healthyCount = results.filter(r => r.status === 'success').length;
      const totalCount = results.length;
      let overall;
      if (healthyCount === totalCount) {
        overall = 'healthy';
      } else if (healthyCount > totalCount / 2) {
        overall = 'partial';
      } else {
        overall = 'down';
      }
      return {
        overall,
        tests: results,
        timestamp: new Date().toISOString()
      };
    }));
  }
  /**
   * Test authentication service
   */
  testAuthService() {
    const startTime = Date.now();
    // Test with a simple endpoint that doesn't require auth
    return this.http.get(`${this.baseUrl}/api/auth/test`, {
      responseType: 'text',
      observe: 'response'
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Authentication Service',
      status: 'success',
      message: 'Service accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
      service: 'Authentication Service',
      status: 'error',
      message: `Error: ${error.status} - ${error.message}`,
      responseTime: Date.now() - startTime
    })));
  }
  /**
   * Test product service
   */
  testProductService() {
    const startTime = Date.now();
    return this.http.get(`${this.baseUrl}/api/products?page=0&size=1`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Product Service',
      status: 'success',
      message: 'Products endpoint accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
      service: 'Product Service',
      status: 'error',
      message: `Error: ${error.status} - ${error.message}`,
      responseTime: Date.now() - startTime
    })));
  }
  /**
   * Test cart service
   */
  testCartService() {
    const startTime = Date.now();
    // This will fail without auth, but we can check if the endpoint exists
    return this.http.get(`${this.baseUrl}/api/cart/1`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Cart Service',
      status: 'success',
      message: 'Cart endpoint accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      // 401/403 means endpoint exists but requires auth (good)
      // 404 means endpoint doesn't exist (bad)
      const status = error.status === 404 ? 'error' : 'success';
      const message = error.status === 404 ? 'Cart endpoint not found' : 'Cart endpoint exists (auth required)';
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
        service: 'Cart Service',
        status,
        message,
        responseTime: Date.now() - startTime
      });
    }));
  }
  /**
   * Test order service
   */
  testOrderService() {
    const startTime = Date.now();
    return this.http.get(`${this.baseUrl}/api/orders/client/1`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Order Service',
      status: 'success',
      message: 'Orders endpoint accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      const status = error.status === 404 ? 'error' : 'success';
      const message = error.status === 404 ? 'Orders endpoint not found' : 'Orders endpoint exists (auth required)';
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
        service: 'Order Service',
        status,
        message,
        responseTime: Date.now() - startTime
      });
    }));
  }
  /**
   * Test supplier service
   */
  testSupplierService() {
    const startTime = Date.now();
    return this.http.get(`${this.baseUrl}/api/admin/suppliers`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Supplier Service',
      status: 'success',
      message: 'Suppliers endpoint accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      const status = error.status === 404 ? 'error' : 'success';
      const message = error.status === 404 ? 'Suppliers endpoint not found' : 'Suppliers endpoint exists (auth required)';
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
        service: 'Supplier Service',
        status,
        message,
        responseTime: Date.now() - startTime
      });
    }));
  }
  /**
   * Test payment service
   */
  testPaymentService() {
    const startTime = Date.now();
    return this.http.get(`${this.baseUrl}/api/admin/supplier-payments`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Payment Service',
      status: 'success',
      message: 'Payment endpoints accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      const status = error.status === 404 ? 'error' : 'success';
      const message = error.status === 404 ? 'Payment endpoints not found' : 'Payment endpoints exist (auth required)';
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
        service: 'Payment Service',
        status,
        message,
        responseTime: Date.now() - startTime
      });
    }));
  }
  /**
   * Test monitoring service
   */
  testMonitoringService() {
    const startTime = Date.now();
    return this.http.get(`${this.baseUrl}/api/admin/monitoring/health`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Monitoring Service',
      status: 'success',
      message: 'Monitoring endpoints accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => {
      const status = error.status === 404 ? 'error' : 'success';
      const message = error.status === 404 ? 'Monitoring endpoints not found' : 'Monitoring endpoints exist (auth required)';
      return (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
        service: 'Monitoring Service',
        status,
        message,
        responseTime: Date.now() - startTime
      });
    }));
  }
  /**
   * Test email service (indirect)
   */
  testEmailService() {
    const startTime = Date.now();
    // We can't directly test email service, but we can check if the backend is configured
    return this.http.get(`${this.baseUrl}/actuator/health`, {
      observe: 'response'
    }).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: 'Email Service',
      status: 'success',
      message: 'Backend health check accessible (email configured)',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
      service: 'Email Service',
      status: 'error',
      message: 'Cannot verify email service configuration',
      responseTime: Date.now() - startTime
    })));
  }
  /**
   * Test specific endpoint
   */
  testEndpoint(url, serviceName) {
    const startTime = Date.now();
    return this.http.get(`${this.baseUrl}${url}`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      service: serviceName,
      status: 'success',
      message: 'Endpoint accessible',
      responseTime: Date.now() - startTime
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
      service: serviceName,
      status: 'error',
      message: `Error: ${error.status} - ${error.message}`,
      responseTime: Date.now() - startTime
    })));
  }
  /**
   * Get simple backend health status
   */
  getBackendHealth() {
    return this.http.get(`${this.baseUrl}/actuator/health`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(response => ({
      status: 'UP',
      message: 'Backend is responding'
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)({
      status: 'DOWN',
      message: `Backend not accessible: ${error.message}`
    })));
  }
  /**
   * Check if backend is accessible
   */
  isBackendAccessible() {
    return this.http.get(`${this.baseUrl}/actuator/health`).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.map)(() => true), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.catchError)(() => (0,rxjs__WEBPACK_IMPORTED_MODULE_6__.of)(false)));
  }
  static {
    this.ɵfac = function ConnectivityTestService_Factory(t) {
      return new (t || ConnectivityTestService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ConnectivityTestService,
      factory: ConnectivityTestService.ɵfac,
      providedIn: "root"
    });
  }
}

/***/ }),

/***/ 575:
/*!************************************************************************************!*\
  !*** ./src/app/features/admin/components/system-status/system-status.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SystemStatusComponent: () => (/* binding */ SystemStatusComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _core_services_connectivity_test_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/connectivity-test.service */ 434);

















function SystemStatusComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-spinner", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Test de connectivit\u00E9 en cours...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function SystemStatusComponent_div_13_th_38_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Service");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemStatusComponent_div_13_td_39_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const test_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](test_r1.service);
  }
}
function SystemStatusComponent_div_13_th_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Statut");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemStatusComponent_div_13_td_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 30)(1, "mat-chip")(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const test_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r2.getServiceStatusClass(test_r2.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.getServiceStatusIcon(test_r2.status));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", test_r2.status === "success" ? "OK" : "ERREUR", " ");
  }
}
function SystemStatusComponent_div_13_th_44_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Message");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemStatusComponent_div_13_td_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const test_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](test_r4.message);
  }
}
function SystemStatusComponent_div_13_th_47_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Temps de R\u00E9ponse");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemStatusComponent_div_13_td_48_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 30)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const test_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r2.getResponseTimeClass(test_r5.responseTime || 0));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", test_r5.responseTime || 0, "ms ");
  }
}
function SystemStatusComponent_div_13_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 31);
  }
}
function SystemStatusComponent_div_13_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 32);
  }
}
function SystemStatusComponent_div_13_mat_card_51_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 37)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div")(4, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const recommendation_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](recommendation_r6.icon);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](recommendation_r6.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](recommendation_r6.description);
  }
}
function SystemStatusComponent_div_13_mat_card_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 33)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "warning");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, " Recommandations ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-card-content")(7, "div", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, SystemStatusComponent_div_13_mat_card_51_div_8_Template, 8, 3, "div", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r2.getRecommendations());
  }
}
function SystemStatusComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 8)(1, "mat-card", 9)(2, "mat-card-content")(3, "div", 10)(4, "div", 11)(5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "\u00C9tat G\u00E9n\u00E9ral");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-chip")(8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "p", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](13, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "div", 13)(15, "div", 14)(16, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Services OK");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "div", 14)(21, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Erreurs");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "div", 14)(26, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "Temps Moyen");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-card", 17)(31, "mat-card-header")(32, "mat-card-title");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "D\u00E9tails des Services");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](34, "mat-card-content")(35, "div", 18)(36, "table", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](37, 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](38, SystemStatusComponent_div_13_th_38_Template, 2, 0, "th", 21)(39, SystemStatusComponent_div_13_td_39_Template, 2, 1, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](40, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](41, SystemStatusComponent_div_13_th_41_Template, 2, 0, "th", 21)(42, SystemStatusComponent_div_13_td_42_Template, 5, 4, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](43, 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](44, SystemStatusComponent_div_13_th_44_Template, 2, 0, "th", 21)(45, SystemStatusComponent_div_13_td_45_Template, 2, 1, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](46, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](47, SystemStatusComponent_div_13_th_47_Template, 2, 0, "th", 21)(48, SystemStatusComponent_div_13_td_48_Template, 3, 3, "td", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](49, SystemStatusComponent_div_13_tr_49_Template, 1, 0, "tr", 26)(50, SystemStatusComponent_div_13_tr_50_Template, 1, 0, "tr", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](51, SystemStatusComponent_div_13_mat_card_51_Template, 9, 1, "mat-card", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r2.getOverallStatusClass(ctx_r2.testReport.overall));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.getOverallStatusIcon(ctx_r2.testReport.overall));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.getOverallStatusText(ctx_r2.testReport.overall), " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Derni\u00E8re v\u00E9rification: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](13, 12, ctx_r2.testReport.timestamp, "medium"), "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.getSuccessCount());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.getErrorCount());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r2.getAverageResponseTime(), "ms");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dataSource", ctx_r2.testReport.tests);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matHeaderRowDef", ctx_r2.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRowDefColumns", ctx_r2.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r2.getErrorCount() > 0);
  }
}
function SystemStatusComponent_mat_card_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-card", 38)(1, "mat-card-content")(2, "div", 39)(3, "mat-icon", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Erreur lors du test de connectivit\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "button", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SystemStatusComponent_mat_card_14_Template_button_click_9_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r2.runTest());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, " R\u00E9essayer ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r2.error);
  }
}
class SystemStatusComponent {
  constructor() {
    this.connectivityService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_core_services_connectivity_test_service__WEBPACK_IMPORTED_MODULE_0__.ConnectivityTestService);
    this.isLoading = false;
    this.testReport = null;
    this.error = null;
    this.displayedColumns = ['service', 'status', 'message', 'responseTime'];
  }
  ngOnInit() {
    this.runTest();
  }
  runTest() {
    this.isLoading = true;
    this.error = null;
    this.connectivityService.runFullConnectivityTest().subscribe({
      next: report => {
        this.testReport = report;
        this.isLoading = false;
        console.log('Connectivity test completed:', report);
      },
      error: error => {
        this.error = 'Impossible d\'exécuter le test de connectivité: ' + error.message;
        this.isLoading = false;
        console.error('Connectivity test failed:', error);
      }
    });
  }
  // Status helper methods
  getOverallStatusClass(status) {
    switch (status) {
      case 'healthy':
        return 'status-healthy';
      case 'partial':
        return 'status-warning';
      case 'down':
        return 'status-error';
      default:
        return 'status-unknown';
    }
  }
  getOverallStatusIcon(status) {
    switch (status) {
      case 'healthy':
        return 'check_circle';
      case 'partial':
        return 'warning';
      case 'down':
        return 'error';
      default:
        return 'help';
    }
  }
  getOverallStatusText(status) {
    switch (status) {
      case 'healthy':
        return 'SYSTÈME OPÉRATIONNEL';
      case 'partial':
        return 'FONCTIONNEMENT PARTIEL';
      case 'down':
        return 'SYSTÈME INDISPONIBLE';
      default:
        return 'STATUT INCONNU';
    }
  }
  getServiceStatusClass(status) {
    return status === 'success' ? 'service-success' : 'service-error';
  }
  getServiceStatusIcon(status) {
    return status === 'success' ? 'check_circle' : 'error';
  }
  getResponseTimeClass(responseTime) {
    if (responseTime < 500) return 'response-fast';
    if (responseTime < 2000) return 'response-medium';
    return 'response-slow';
  }
  // Summary methods
  getSuccessCount() {
    return this.testReport?.tests.filter(t => t.status === 'success').length || 0;
  }
  getErrorCount() {
    return this.testReport?.tests.filter(t => t.status === 'error').length || 0;
  }
  getAverageResponseTime() {
    if (!this.testReport?.tests.length) return 0;
    const validTimes = this.testReport.tests.filter(t => t.responseTime !== undefined).map(t => t.responseTime);
    if (!validTimes.length) return 0;
    return Math.round(validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length);
  }
  // Recommendations
  getRecommendations() {
    const recommendations = [];
    if (!this.testReport) return recommendations;
    const failedServices = this.testReport.tests.filter(t => t.status === 'error');
    for (const service of failedServices) {
      switch (service.service) {
        case 'Authentication Service':
          recommendations.push({
            icon: 'security',
            title: 'Service d\'authentification indisponible',
            description: 'Vérifiez que le serveur backend est démarré et que les endpoints d\'authentification sont configurés.'
          });
          break;
        case 'Product Service':
          recommendations.push({
            icon: 'inventory',
            title: 'Service de produits indisponible',
            description: 'Vérifiez la configuration de la base de données et les endpoints de produits.'
          });
          break;
        case 'Cart Service':
          recommendations.push({
            icon: 'shopping_cart',
            title: 'Service de panier indisponible',
            description: 'Vérifiez les endpoints du panier et l\'authentification requise.'
          });
          break;
        case 'Order Service':
          recommendations.push({
            icon: 'receipt',
            title: 'Service de commandes indisponible',
            description: 'Vérifiez les endpoints de commandes et la configuration de la base de données.'
          });
          break;
        case 'Payment Service':
          recommendations.push({
            icon: 'payment',
            title: 'Service de paiement indisponible',
            description: 'Vérifiez la configuration Stripe et les endpoints de paiement.'
          });
          break;
        case 'Monitoring Service':
          recommendations.push({
            icon: 'monitoring',
            title: 'Service de surveillance indisponible',
            description: 'Vérifiez la configuration Spring Actuator et les endpoints de monitoring.'
          });
          break;
      }
    }
    if (recommendations.length === 0 && this.testReport.overall !== 'healthy') {
      recommendations.push({
        icon: 'info',
        title: 'Problèmes de performance détectés',
        description: 'Certains services répondent mais avec des temps de réponse élevés. Vérifiez les performances du serveur.'
      });
    }
    return recommendations;
  }
  static {
    this.ɵfac = function SystemStatusComponent_Factory(t) {
      return new (t || SystemStatusComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: SystemStatusComponent,
      selectors: [["app-system-status"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 15,
      vars: 5,
      consts: [[1, "system-status-container"], [1, "status-header"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["class", "loading-container", 4, "ngIf"], ["class", "test-results", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], [1, "loading-container"], ["diameter", "50"], [1, "test-results"], [1, "overall-status"], [1, "status-content"], [1, "status-info"], [1, "timestamp"], [1, "status-summary"], [1, "summary-item"], [1, "summary-value"], [1, "summary-label"], [1, "service-details"], [1, "services-table"], ["mat-table", "", 1, "connectivity-table", 3, "dataSource"], ["matColumnDef", "service"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "status"], ["matColumnDef", "message"], ["matColumnDef", "responseTime"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "recommendations", 4, "ngIf"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""], [1, "recommendations"], ["color", "warn"], [1, "recommendations-list"], ["class", "recommendation-item", 4, "ngFor", "ngForOf"], [1, "recommendation-item"], [1, "error-state"], [1, "error-content"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
      template: function SystemStatusComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "\u00C9tat de Connectivit\u00E9 du Syst\u00E8me");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-card-subtitle");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "V\u00E9rification de tous les services backend");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-card-actions")(8, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SystemStatusComponent_Template_button_click_8_listener() {
            return ctx.runTest();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "refresh");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, SystemStatusComponent_div_12_Template, 4, 0, "div", 3)(13, SystemStatusComponent_div_13_Template, 52, 15, "div", 4)(14, SystemStatusComponent_mat_card_14_Template, 11, 1, "mat-card", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.isLoading ? "Test en cours..." : "Ex\u00E9cuter Tests", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.testReport && !ctx.isLoading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.error && !ctx.isLoading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_2__.DatePipe, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardActions, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardSubtitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_3__.MatCardTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_4__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__.MatIcon, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_6__.MatProgressSpinner, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChipsModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_7__.MatChip, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTableModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_8__.MatRow],
      styles: [".system-status-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 24px;\n  background: #F5F7FA;\n  min-height: 100vh;\n}\n\n.status-header[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n}\n.status-header[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.status-header[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #1F2937;\n}\n.status-header[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-subtitle[_ngcontent-%COMP%] {\n  color: #6B7280;\n  margin-top: 4px;\n}\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 64px;\n  background: white;\n  border-radius: 12px;\n  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin-top: 16px;\n  color: #6B7280;\n  font-size: 1.125rem;\n}\n\n.test-results[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.overall-status[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n}\n.overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%]   .status-info[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: #1F2937;\n}\n.overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%]   .status-info[_ngcontent-%COMP%]   .timestamp[_ngcontent-%COMP%] {\n  margin: 8px 0 0 0;\n  color: #6B7280;\n  font-size: 0.875rem;\n}\n.overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%]   .status-summary[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 32px;\n}\n.overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%]   .status-summary[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%] {\n  text-align: center;\n}\n.overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%]   .status-summary[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {\n  display: block;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1F2937;\n}\n.overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%]   .status-summary[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-label[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6B7280;\n}\n\n.status-healthy[_ngcontent-%COMP%] {\n  background: #D1FAE5;\n  color: #065F46;\n  font-weight: 600;\n}\n.status-healthy[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #10B981;\n}\n\n.status-warning[_ngcontent-%COMP%] {\n  background: #FEF3C7;\n  color: #92400E;\n  font-weight: 600;\n}\n.status-warning[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #F59E0B;\n}\n\n.status-error[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #991B1B;\n  font-weight: 600;\n}\n.status-error[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #EF4444;\n}\n\n.status-unknown[_ngcontent-%COMP%] {\n  background: #F3F4F6;\n  color: #374151;\n  font-weight: 600;\n}\n\n.service-details[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n}\n\n.services-table[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  margin: -16px;\n  padding: 16px;\n}\n\n.connectivity-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.connectivity-table[_ngcontent-%COMP%]   .mat-mdc-header-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.875rem;\n  border-bottom: 2px solid #E5E7EB;\n}\n.connectivity-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #F3F4F6;\n  padding: 16px 8px;\n}\n.connectivity-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #F9FAFB;\n}\n\n.service-success[_ngcontent-%COMP%] {\n  background: #D1FAE5;\n  color: #065F46;\n}\n.service-success[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #10B981;\n}\n\n.service-error[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #991B1B;\n}\n.service-error[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #EF4444;\n}\n\n.response-fast[_ngcontent-%COMP%] {\n  color: #059669;\n  font-weight: 600;\n}\n\n.response-medium[_ngcontent-%COMP%] {\n  color: #D97706;\n  font-weight: 600;\n}\n\n.response-slow[_ngcontent-%COMP%] {\n  color: #DC2626;\n  font-weight: 600;\n}\n\n.recommendations[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 2px solid #FCD34D;\n  background: #FFFBEB;\n}\n.recommendations[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  color: #92400E;\n}\n.recommendations[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #F59E0B;\n}\n\n.recommendations-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n.recommendations-list[_ngcontent-%COMP%]   .recommendation-item[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  align-items: flex-start;\n}\n.recommendations-list[_ngcontent-%COMP%]   .recommendation-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #F59E0B;\n  margin-top: 2px;\n}\n.recommendations-list[_ngcontent-%COMP%]   .recommendation-item[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  margin: 0 0 4px 0;\n  font-size: 1rem;\n  font-weight: 600;\n  color: #92400E;\n}\n.recommendations-list[_ngcontent-%COMP%]   .recommendation-item[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #78350F;\n  line-height: 1.5;\n}\n\n.error-state[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 2px solid #EF4444;\n  background: #FEF2F2;\n}\n.error-state[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 32px;\n}\n.error-state[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 16px;\n}\n.error-state[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: #991B1B;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.error-state[_ngcontent-%COMP%]   .error-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0 0 24px 0;\n  color: #7F1D1D;\n  line-height: 1.5;\n}\n\n@media (max-width: 768px) {\n  .system-status-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 24px;\n    align-items: flex-start;\n  }\n  .overall-status[_ngcontent-%COMP%]   .status-content[_ngcontent-%COMP%]   .status-summary[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-around;\n  }\n  .services-table[_ngcontent-%COMP%] {\n    font-size: 0.875rem;\n  }\n  .recommendations-list[_ngcontent-%COMP%]   .recommendation-item[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n  }\n  .recommendations-list[_ngcontent-%COMP%]   .recommendation-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    margin-top: 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vY29tcG9uZW50cy9zeXN0ZW0tc3RhdHVzL3N5c3RlbS1zdGF0dXMuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUVBO0VBQ0UsbUJBQUE7RUFDQSxtQkFBQTtFQUNBLHlCQUFBO0FBQ0Y7QUFDRTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0FBQ0o7QUFDSTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBQ047QUFFSTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBQU47O0FBS0E7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSx5Q0FBQTtBQUZGO0FBSUU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQUZKOztBQU1BO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQUhGOztBQU1BO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtBQUhGO0FBS0U7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtBQUhKO0FBTU07RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBSlI7QUFPTTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBTFI7QUFTSTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBUE47QUFTTTtFQUNFLGtCQUFBO0FBUFI7QUFTUTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FBUFY7QUFVUTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQVJWOztBQWdCQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBYkY7QUFlRTtFQUNFLGNBQUE7QUFiSjs7QUFpQkE7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQWRGO0FBZ0JFO0VBQ0UsY0FBQTtBQWRKOztBQWtCQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBZkY7QUFpQkU7RUFDRSxjQUFBO0FBZko7O0FBbUJBO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUFoQkY7O0FBbUJBO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtBQWhCRjs7QUFtQkE7RUFDRSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxhQUFBO0FBaEJGOztBQW1CQTtFQUNFLFdBQUE7QUFoQkY7QUFrQkU7RUFDRSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdDQUFBO0FBaEJKO0FBbUJFO0VBQ0UsZ0NBQUE7RUFDQSxpQkFBQTtBQWpCSjtBQW9CRTtFQUNFLHlCQUFBO0FBbEJKOztBQXNCQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQW5CRjtBQXFCRTtFQUNFLGNBQUE7QUFuQko7O0FBdUJBO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0FBcEJGO0FBc0JFO0VBQ0UsY0FBQTtBQXBCSjs7QUF3QkE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7QUFyQkY7O0FBd0JBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0FBckJGOztBQXdCQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtBQXJCRjs7QUF3QkE7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EsbUJBQUE7QUFyQkY7QUF3Qkk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0VBQ0EsY0FBQTtBQXRCTjtBQXdCTTtFQUNFLGNBQUE7QUF0QlI7O0FBNEJBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtBQXpCRjtBQTJCRTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsdUJBQUE7QUF6Qko7QUEyQkk7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQXpCTjtBQTRCSTtFQUNFLGlCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtBQTFCTjtBQTZCSTtFQUNFLFNBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUEzQk47O0FBZ0NBO0VBQ0UsbUJBQUE7RUFDQSx5QkFBQTtFQUNBLG1CQUFBO0FBN0JGO0FBK0JFO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0FBN0JKO0FBK0JJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7QUE3Qk47QUFnQ0k7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0FBOUJOO0FBaUNJO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUEvQk47O0FBcUNBO0VBQ0U7SUFDRSxhQUFBO0VBbENGO0VBcUNBO0lBQ0Usc0JBQUE7SUFDQSxTQUFBO0lBQ0EsdUJBQUE7RUFuQ0Y7RUFxQ0U7SUFDRSxXQUFBO0lBQ0EsNkJBQUE7RUFuQ0o7RUF1Q0E7SUFDRSxtQkFBQTtFQXJDRjtFQXdDQTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7RUF0Q0Y7RUF3Q0U7SUFDRSxhQUFBO0VBdENKO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuc3lzdGVtLXN0YXR1cy1jb250YWluZXIge1xyXG4gIG1heC13aWR0aDogMTIwMHB4O1xyXG4gIG1hcmdpbjogMCBhdXRvO1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbiAgYmFja2dyb3VuZDogI0Y1RjdGQTtcclxuICBtaW4taGVpZ2h0OiAxMDB2aDtcclxufVxyXG5cclxuLnN0YXR1cy1oZWFkZXIge1xyXG4gIG1hcmdpbi1ib3R0b206IDI0cHg7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjRTVFN0VCO1xyXG4gIFxyXG4gIG1hdC1jYXJkLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIFxyXG4gICAgbWF0LWNhcmQtdGl0bGUge1xyXG4gICAgICBmb250LXNpemU6IDEuNXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcclxuICAgICAgY29sb3I6ICMxRjI5Mzc7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIG1hdC1jYXJkLXN1YnRpdGxlIHtcclxuICAgICAgY29sb3I6ICM2QjcyODA7XHJcbiAgICAgIG1hcmdpbi10b3A6IDRweDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgcGFkZGluZzogNjRweDtcclxuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIFxyXG4gIHAge1xyXG4gICAgbWFyZ2luLXRvcDogMTZweDtcclxuICAgIGNvbG9yOiAjNkI3MjgwO1xyXG4gICAgZm9udC1zaXplOiAxLjEyNXJlbTtcclxuICB9XHJcbn1cclxuXHJcbi50ZXN0LXJlc3VsdHMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICBnYXA6IDI0cHg7XHJcbn1cclxuXHJcbi5vdmVyYWxsLXN0YXR1cyB7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjRTVFN0VCO1xyXG4gIFxyXG4gIC5zdGF0dXMtY29udGVudCB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIFxyXG4gICAgLnN0YXR1cy1pbmZvIHtcclxuICAgICAgaDIge1xyXG4gICAgICAgIG1hcmdpbjogMCAwIDEycHggMDtcclxuICAgICAgICBmb250LXNpemU6IDEuMjVyZW07XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogIzFGMjkzNztcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLnRpbWVzdGFtcCB7XHJcbiAgICAgICAgbWFyZ2luOiA4cHggMCAwIDA7XHJcbiAgICAgICAgY29sb3I6ICM2QjcyODA7XHJcbiAgICAgICAgZm9udC1zaXplOiAwLjg3NXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAuc3RhdHVzLXN1bW1hcnkge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBnYXA6IDMycHg7XHJcbiAgICAgIFxyXG4gICAgICAuc3VtbWFyeS1pdGVtIHtcclxuICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLnN1bW1hcnktdmFsdWUge1xyXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICBmb250LXNpemU6IDJyZW07XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgY29sb3I6ICMxRjI5Mzc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5zdW1tYXJ5LWxhYmVsIHtcclxuICAgICAgICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICAgICAgICBjb2xvcjogIzZCNzI4MDtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFN0YXR1cyBjaGlwc1xyXG4uc3RhdHVzLWhlYWx0aHkge1xyXG4gIGJhY2tncm91bmQ6ICNEMUZBRTU7XHJcbiAgY29sb3I6ICMwNjVGNDY7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICBcclxuICBtYXQtaWNvbiB7XHJcbiAgICBjb2xvcjogIzEwQjk4MTtcclxuICB9XHJcbn1cclxuXHJcbi5zdGF0dXMtd2FybmluZyB7XHJcbiAgYmFja2dyb3VuZDogI0ZFRjNDNztcclxuICBjb2xvcjogIzkyNDAwRTtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIFxyXG4gIG1hdC1pY29uIHtcclxuICAgIGNvbG9yOiAjRjU5RTBCO1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXR1cy1lcnJvciB7XHJcbiAgYmFja2dyb3VuZDogI0ZFRTJFMjtcclxuICBjb2xvcjogIzk5MUIxQjtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG4gIFxyXG4gIG1hdC1pY29uIHtcclxuICAgIGNvbG9yOiAjRUY0NDQ0O1xyXG4gIH1cclxufVxyXG5cclxuLnN0YXR1cy11bmtub3duIHtcclxuICBiYWNrZ3JvdW5kOiAjRjNGNEY2O1xyXG4gIGNvbG9yOiAjMzc0MTUxO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5zZXJ2aWNlLWRldGFpbHMge1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI0U1RTdFQjtcclxufVxyXG5cclxuLnNlcnZpY2VzLXRhYmxlIHtcclxuICBvdmVyZmxvdy14OiBhdXRvO1xyXG4gIG1hcmdpbjogLTE2cHg7XHJcbiAgcGFkZGluZzogMTZweDtcclxufVxyXG5cclxuLmNvbm5lY3Rpdml0eS10YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbiAgXHJcbiAgLm1hdC1tZGMtaGVhZGVyLWNlbGwge1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIGNvbG9yOiAjMzc0MTUxO1xyXG4gICAgZm9udC1zaXplOiAwLjg3NXJlbTtcclxuICAgIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCAjRTVFN0VCO1xyXG4gIH1cclxuICBcclxuICAubWF0LW1kYy1jZWxsIHtcclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjRjNGNEY2O1xyXG4gICAgcGFkZGluZzogMTZweCA4cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5tYXQtbWRjLXJvdzpob3ZlciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjlGQUZCO1xyXG4gIH1cclxufVxyXG5cclxuLnNlcnZpY2Utc3VjY2VzcyB7XHJcbiAgYmFja2dyb3VuZDogI0QxRkFFNTtcclxuICBjb2xvcjogIzA2NUY0NjtcclxuICBcclxuICBtYXQtaWNvbiB7XHJcbiAgICBjb2xvcjogIzEwQjk4MTtcclxuICB9XHJcbn1cclxuXHJcbi5zZXJ2aWNlLWVycm9yIHtcclxuICBiYWNrZ3JvdW5kOiAjRkVFMkUyO1xyXG4gIGNvbG9yOiAjOTkxQjFCO1xyXG4gIFxyXG4gIG1hdC1pY29uIHtcclxuICAgIGNvbG9yOiAjRUY0NDQ0O1xyXG4gIH1cclxufVxyXG5cclxuLnJlc3BvbnNlLWZhc3Qge1xyXG4gIGNvbG9yOiAjMDU5NjY5O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5yZXNwb25zZS1tZWRpdW0ge1xyXG4gIGNvbG9yOiAjRDk3NzA2O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5yZXNwb25zZS1zbG93IHtcclxuICBjb2xvcjogI0RDMjYyNjtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcblxyXG4ucmVjb21tZW5kYXRpb25zIHtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJvcmRlcjogMnB4IHNvbGlkICNGQ0QzNEQ7XHJcbiAgYmFja2dyb3VuZDogI0ZGRkJFQjtcclxuICBcclxuICBtYXQtY2FyZC1oZWFkZXIge1xyXG4gICAgbWF0LWNhcmQtdGl0bGUge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gICAgICBnYXA6IDhweDtcclxuICAgICAgY29sb3I6ICM5MjQwMEU7XHJcbiAgICAgIFxyXG4gICAgICBtYXQtaWNvbiB7XHJcbiAgICAgICAgY29sb3I6ICNGNTlFMEI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi5yZWNvbW1lbmRhdGlvbnMtbGlzdCB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTZweDtcclxuICBcclxuICAucmVjb21tZW5kYXRpb24taXRlbSB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZ2FwOiAxMnB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBcclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgY29sb3I6ICNGNTlFMEI7XHJcbiAgICAgIG1hcmdpbi10b3A6IDJweDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaDQge1xyXG4gICAgICBtYXJnaW46IDAgMCA0cHggMDtcclxuICAgICAgZm9udC1zaXplOiAxcmVtO1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICBjb2xvcjogIzkyNDAwRTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcCB7XHJcbiAgICAgIG1hcmdpbjogMDtcclxuICAgICAgY29sb3I6ICM3ODM1MEY7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4uZXJyb3Itc3RhdGUge1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm9yZGVyOiAycHggc29saWQgI0VGNDQ0NDtcclxuICBiYWNrZ3JvdW5kOiAjRkVGMkYyO1xyXG4gIFxyXG4gIC5lcnJvci1jb250ZW50IHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIHBhZGRpbmc6IDMycHg7XHJcbiAgICBcclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgZm9udC1zaXplOiA0OHB4O1xyXG4gICAgICB3aWR0aDogNDhweDtcclxuICAgICAgaGVpZ2h0OiA0OHB4O1xyXG4gICAgICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBoMyB7XHJcbiAgICAgIG1hcmdpbjogMCAwIDEycHggMDtcclxuICAgICAgY29sb3I6ICM5OTFCMUI7XHJcbiAgICAgIGZvbnQtc2l6ZTogMS4yNXJlbTtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgcCB7XHJcbiAgICAgIG1hcmdpbjogMCAwIDI0cHggMDtcclxuICAgICAgY29sb3I6ICM3RjFEMUQ7XHJcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIGRlc2lnblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuc3lzdGVtLXN0YXR1cy1jb250YWluZXIge1xyXG4gICAgcGFkZGluZzogMTZweDtcclxuICB9XHJcbiAgXHJcbiAgLm92ZXJhbGwtc3RhdHVzIC5zdGF0dXMtY29udGVudCB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAyNHB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBcclxuICAgIC5zdGF0dXMtc3VtbWFyeSB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLnNlcnZpY2VzLXRhYmxlIHtcclxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgfVxyXG4gIFxyXG4gIC5yZWNvbW1lbmRhdGlvbnMtbGlzdCAucmVjb21tZW5kYXRpb24taXRlbSB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBcclxuICAgIG1hdC1pY29uIHtcclxuICAgICAgbWFyZ2luLXRvcDogMDtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_admin_components_system-status_system-status_component_ts.js.map