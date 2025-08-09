"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_admin_pages_system-monitoring_system-monitoring_component_ts"],{

/***/ 8865:
/*!***************************************************************************************!*\
  !*** ./src/app/features/admin/pages/system-monitoring/system-monitoring.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SystemMonitoringComponent: () => (/* binding */ SystemMonitoringComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-bar */ 6354);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_tabs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/tabs */ 8223);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 9240);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @environments/environment */ 5312);





















function SystemMonitoringComponent_th_173_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Op\u00E9ration");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemMonitoringComponent_td_174_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const metric_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](metric_r1.operation);
  }
}
function SystemMonitoringComponent_th_176_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Temps Moyen");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemMonitoringComponent_td_177_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 52)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const metric_r2 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r2.getPerformanceClass(metric_r2.avgTime));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](3, 3, metric_r2.avgTime, "1.0-0"), "ms ");
  }
}
function SystemMonitoringComponent_th_179_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Nombre d'op\u00E9rations");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemMonitoringComponent_td_180_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 52);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const metric_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, metric_r4.count));
  }
}
function SystemMonitoringComponent_th_182_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 51);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Statut");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function SystemMonitoringComponent_td_183_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 52)(1, "mat-chip");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const metric_r5 = ctx.$implicit;
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx_r2.getStatusChipClass(metric_r5.avgTime));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx_r2.getStatusText(metric_r5.avgTime), " ");
  }
}
function SystemMonitoringComponent_tr_184_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 53);
  }
}
function SystemMonitoringComponent_tr_185_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 54);
  }
}
function SystemMonitoringComponent_div_199_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 55)(1, "span", 56);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](3, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "span", 57);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span", 58);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "span", 59);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const log_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]("log-" + log_r6.level);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](3, 6, log_r6.timestamp, "HH:mm:ss"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](log_r6.level);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](log_r6.component);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](log_r6.message);
  }
}
class SystemMonitoringComponent {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient);
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/admin/monitoring`;
    // Data
    this.systemHealth = null;
    this.systemMetrics = null;
    this.performanceReport = null;
    // UI Data
    this.orderTrend = 5.2;
    this.paymentTrend = 8.1;
    this.databaseLatency = 45;
    this.databaseConnections = 23;
    this.paymentSuccessRate = 99.7;
    this.averagePaymentTime = 1250;
    this.emailsSent = 1543;
    this.emailDeliveryRate = 98.9;
    this.performanceData = [];
    this.performanceColumns = ['operation', 'avgTime', 'count', 'status'];
    this.systemLogs = [{
      timestamp: new Date(),
      level: 'INFO',
      component: 'OrderService',
      message: 'Order ORD-1234567890 created successfully'
    }, {
      timestamp: new Date(),
      level: 'WARN',
      component: 'PaymentService',
      message: 'Payment processing took longer than expected: 5.2s'
    }, {
      timestamp: new Date(),
      level: 'INFO',
      component: 'EmailService',
      message: 'Order confirmation email sent to user@example.com'
    }, {
      timestamp: new Date(),
      level: 'ERROR',
      component: 'SupplierAPI',
      message: 'Failed to sync stock from supplier API: timeout'
    }];
  }
  ngOnInit() {
    this.loadData();
    this.startAutoRefresh();
  }
  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }
  loadData() {
    // Load system health
    this.http.get(`${this.apiUrl}/health`).subscribe({
      next: health => {
        this.systemHealth = health;
      },
      error: error => {
        console.error('Failed to load system health:', error);
      }
    });
    // Load system metrics
    this.http.get(`${this.apiUrl}/metrics`).subscribe({
      next: metrics => {
        this.systemMetrics = metrics;
      },
      error: error => {
        console.error('Failed to load system metrics:', error);
      }
    });
    // Load performance report
    this.http.get(`${this.apiUrl}/performance`).subscribe({
      next: report => {
        this.performanceReport = report;
        this.updatePerformanceData(report);
      },
      error: error => {
        console.error('Failed to load performance report:', error);
      }
    });
  }
  refreshData() {
    this.loadData();
  }
  startAutoRefresh() {
    // Refresh every 30 seconds
    this.refreshSubscription = (0,rxjs__WEBPACK_IMPORTED_MODULE_3__.interval)(30000).subscribe(() => {
      this.loadData();
    });
  }
  clearLogs() {
    this.systemLogs = [];
  }
  // Helper methods
  getMemoryUsagePercent() {
    if (!this.systemMetrics) return 0;
    return this.systemMetrics.memoryUsed / this.systemMetrics.memoryMax * 100;
  }
  getSystemLoadPercent() {
    if (!this.systemHealth || !this.systemMetrics) return 0;
    return this.systemHealth.details.systemLoad / this.systemMetrics.processorCount * 100;
  }
  updatePerformanceData(report) {
    this.performanceData = [{
      operation: 'Création de commande',
      avgTime: report.order_creation_avg_time || 0,
      count: report.order_creation_count || 0
    }, {
      operation: 'Traitement de paiement',
      avgTime: report.payment_processing_avg_time || 0,
      count: report.payment_processing_count || 0
    }];
  }
  getPerformanceClass(avgTime) {
    if (avgTime > 3000) return 'performance-slow';
    if (avgTime > 1000) return 'performance-medium';
    return 'performance-fast';
  }
  getStatusChipClass(avgTime) {
    if (avgTime > 3000) return 'status-slow';
    if (avgTime > 1000) return 'status-medium';
    return 'status-fast';
  }
  getStatusText(avgTime) {
    if (avgTime > 3000) return 'LENT';
    if (avgTime > 1000) return 'MOYEN';
    return 'RAPIDE';
  }
  static {
    this.ɵfac = function SystemMonitoringComponent_Factory(t) {
      return new (t || SystemMonitoringComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: SystemMonitoringComponent,
      selectors: [["app-system-monitoring"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 200,
      vars: 83,
      consts: [[1, "monitoring-dashboard"], [1, "dashboard-header"], [1, "header-actions"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "kpi-grid"], [1, "kpi-card", "orders"], [1, "kpi-content"], [1, "kpi-info"], [1, "kpi-value"], [1, "kpi-label"], [1, "kpi-trend"], [1, "kpi-icon"], [1, "kpi-card", "payments"], [1, "kpi-card", "users"], [1, "kpi-sublabel"], [1, "kpi-card", "errors"], [1, "monitoring-tabs"], ["label", "\u00C9tat du Syst\u00E8me"], [1, "tab-content"], [1, "components-grid"], [1, "component-card"], [1, "component-metrics"], [1, "metric"], [1, "metric-label"], [1, "metric-value"], [1, "resources-card"], [1, "resource-metrics"], [1, "resource-item"], [1, "resource-header"], [1, "resource-label"], [1, "resource-value"], ["mode", "determinate", 3, "value"], [1, "resource-details"], ["label", "Performance"], [1, "performance-card"], [1, "performance-table"], ["mat-table", "", 1, "performance-metrics-table", 3, "dataSource"], ["matColumnDef", "operation"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "avgTime"], ["matColumnDef", "count"], ["matColumnDef", "status"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["label", "Journaux"], [1, "logs-card"], [1, "card-actions"], ["mat-button", "", 3, "click"], [1, "logs-container"], ["class", "log-entry", 3, "class", 4, "ngFor", "ngForOf"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", ""], [1, "log-entry"], [1, "log-timestamp"], [1, "log-level"], [1, "log-component"], [1, "log-message"]],
      template: function SystemMonitoringComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Surveillance Syst\u00E8me Enterprise");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 2)(5, "button", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SystemMonitoringComponent_Template_button_click_5_listener() {
            return ctx.refreshData();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, "refresh");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, " Actualiser ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-chip")(10, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "div", 4)(14, "mat-card", 5)(15, "mat-card-content")(16, "div", 6)(17, "div", 7)(18, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](20, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Commandes Totales");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "div", 10)(24, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](25);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](27, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "mat-icon", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "shopping_cart");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "mat-card", 12)(31, "mat-card-content")(32, "div", 6)(33, "div", 7)(34, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](36, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "Paiements Trait\u00E9s");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "div", 10)(40, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](41, "trending_up");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](43, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "mat-icon", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "payment");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "mat-card", 13)(47, "mat-card-content")(48, "div", 6)(49, "div", 7)(50, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](51);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](52, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](53, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](54, "Utilisateurs Actifs");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](55, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](56, "En temps r\u00E9el");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](57, "mat-icon", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](58, "people");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "mat-card", 15)(60, "mat-card-content")(61, "div", 6)(62, "div", 7)(63, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](64);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](65, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](66, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](67, "Erreurs");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](68, "div", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](69, "Derni\u00E8re heure");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](70, "mat-icon", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](71, "error_outline");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](72, "mat-tab-group", 16)(73, "mat-tab", 17)(74, "div", 18)(75, "div", 19)(76, "mat-card", 20)(77, "mat-card-header")(78, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](79, "Base de Donn\u00E9es");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](80, "mat-chip");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](81);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](82, "mat-card-content")(83, "div", 21)(84, "div", 22)(85, "span", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](86, "Latence:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](87, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](88);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](89, "div", 22)(90, "span", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](91, "Connexions:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](92, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](93);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](94, "mat-card", 20)(95, "mat-card-header")(96, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](97, "Syst\u00E8me de Paiement");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](98, "mat-chip");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](99);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](100, "mat-card-content")(101, "div", 21)(102, "div", 22)(103, "span", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](104, "Taux de succ\u00E8s:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](105, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](106);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](107, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](108, "div", 22)(109, "span", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](110, "Temps moyen:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](111, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](112);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](113, "mat-card", 20)(114, "mat-card-header")(115, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](116, "Syst\u00E8me Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](117, "mat-chip");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](118);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](119, "mat-card-content")(120, "div", 21)(121, "div", 22)(122, "span", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](123, "Emails envoy\u00E9s:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](124, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](125);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](126, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](127, "div", 22)(128, "span", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](129, "Taux de livraison:");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](130, "span", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](131);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](132, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](133, "mat-card", 25)(134, "mat-card-header")(135, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](136, "Ressources Syst\u00E8me");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](137, "mat-card-content")(138, "div", 26)(139, "div", 27)(140, "div", 28)(141, "span", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](142, "Utilisation M\u00E9moire");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](143, "span", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](144);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](145, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](146, "mat-progress-bar", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](147, "div", 32)(148, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](149);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](150, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](151, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](152, "div", 27)(153, "div", 28)(154, "span", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](155, "Charge Syst\u00E8me");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](156, "span", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](157);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](158, "number");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](159, "mat-progress-bar", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](160, "div", 32)(161, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](162);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](163, "mat-tab", 33)(164, "div", 18)(165, "mat-card", 34)(166, "mat-card-header")(167, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](168, "M\u00E9triques de Performance");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](169, "mat-card-content")(170, "div", 35)(171, "table", 36);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](172, 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](173, SystemMonitoringComponent_th_173_Template, 2, 0, "th", 38)(174, SystemMonitoringComponent_td_174_Template, 2, 1, "td", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](175, 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](176, SystemMonitoringComponent_th_176_Template, 2, 0, "th", 38)(177, SystemMonitoringComponent_td_177_Template, 4, 6, "td", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](178, 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](179, SystemMonitoringComponent_th_179_Template, 2, 0, "th", 38)(180, SystemMonitoringComponent_td_180_Template, 3, 3, "td", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](181, 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](182, SystemMonitoringComponent_th_182_Template, 2, 0, "th", 38)(183, SystemMonitoringComponent_td_183_Template, 3, 3, "td", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](184, SystemMonitoringComponent_tr_184_Template, 1, 0, "tr", 43)(185, SystemMonitoringComponent_tr_185_Template, 1, 0, "tr", 44);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](186, "mat-tab", 45)(187, "div", 18)(188, "mat-card", 46)(189, "mat-card-header")(190, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](191, "Journaux Syst\u00E8me");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](192, "div", 47)(193, "button", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function SystemMonitoringComponent_Template_button_click_193_listener() {
            return ctx.clearLogs();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](194, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](195, "clear_all");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](196, " Effacer ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](197, "mat-card-content")(198, "div", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](199, SystemMonitoringComponent_div_199_Template, 10, 9, "div", 50);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()()()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]((ctx.systemHealth == null ? null : ctx.systemHealth.status) === "UP" ? "status-healthy" : "status-unhealthy");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"]((ctx.systemHealth == null ? null : ctx.systemHealth.status) === "UP" ? "health_and_safety" : "error");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (ctx.systemHealth == null ? null : ctx.systemHealth.status) === "UP" ? "Syst\u00E8me Op\u00E9rationnel" : "Probl\u00E8me D\u00E9tect\u00E9", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](20, 49, (ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.totalOrders) || 0));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("positive", ctx.orderTrend > 0)("negative", ctx.orderTrend < 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.orderTrend > 0 ? "trending_up" : ctx.orderTrend < 0 ? "trending_down" : "trending_flat");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](27, 51, ctx.orderTrend, "1.1-1"), "% ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](36, 54, (ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.totalPayments) || 0));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("positive", ctx.paymentTrend > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](43, 56, ctx.paymentTrend, "1.1-1"), "% ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](52, 59, (ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.activeUsers) || 0));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassProp"]("alert", ((ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.errorCount) || 0) > 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](65, 61, (ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.errorCount) || 0));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]((ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.databaseHealth) ? "status-up" : "status-down");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.databaseHealth) ? "ACTIF" : "INACTIF", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.databaseLatency, "ms");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.databaseConnections);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]((ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.paymentSystemHealth) ? "status-up" : "status-down");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.paymentSystemHealth) ? "ACTIF" : "INACTIF", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](107, 63, ctx.paymentSuccessRate, "1.1-1"), "%");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx.averagePaymentTime, "ms");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"]((ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.emailSystemHealth) ? "status-up" : "status-down");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", (ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.emailSystemHealth) ? "ACTIF" : "INACTIF", " ");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](126, 66, ctx.emailsSent));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](132, 68, ctx.emailDeliveryRate, "1.1-1"), "%");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](145, 71, ctx.getMemoryUsagePercent(), "1.1-1"), "%");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx.getMemoryUsagePercent() > 80 ? "progress-danger" : ctx.getMemoryUsagePercent() > 60 ? "progress-warning" : "progress-success");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.getMemoryUsagePercent());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](150, 74, ((ctx.systemMetrics == null ? null : ctx.systemMetrics.memoryUsed) || 0) / 1024 / 1024, "1.0-0"), " MB / ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](151, 77, ((ctx.systemMetrics == null ? null : ctx.systemMetrics.memoryMax) || 0) / 1024 / 1024, "1.0-0"), " MB");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](158, 80, ctx.systemHealth == null ? null : ctx.systemHealth.details == null ? null : ctx.systemHealth.details.systemLoad, "1.2-2"));
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵclassMap"](ctx.getSystemLoadPercent() > 80 ? "progress-danger" : ctx.getSystemLoadPercent() > 60 ? "progress-warning" : "progress-success");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.getSystemLoadPercent());
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", (ctx.systemMetrics == null ? null : ctx.systemMetrics.processorCount) || 0, " processeurs disponibles");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dataSource", ctx.performanceData);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matHeaderRowDef", ctx.performanceColumns);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRowDefColumns", ctx.performanceColumns);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](14);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.systemLogs);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_4__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_4__.DatePipe, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_5__.MatCardTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_6__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__.MatIcon, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__.MatProgressBarModule, _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_8__.MatProgressBar, _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__.MatChipsModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_9__.MatChip, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatTableModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_10__.MatRow, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_11__.MatTabsModule, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_11__.MatTab, _angular_material_tabs__WEBPACK_IMPORTED_MODULE_11__.MatTabGroup],
      styles: [".monitoring-dashboard[_ngcontent-%COMP%] {\n  max-width: 1600px;\n  margin: 0 auto;\n  padding: 24px;\n  background: #F5F7FA;\n  min-height: 100vh;\n}\n\n.dashboard-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 32px;\n}\n.dashboard-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.25rem;\n  font-weight: 700;\n  color: #1B1B1B;\n  margin: 0;\n}\n.dashboard-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  align-items: center;\n}\n.dashboard-header[_ngcontent-%COMP%]   .status-healthy[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #D4EDDA 0%, #28A745 100%);\n  color: #155724;\n  font-weight: 600;\n}\n.dashboard-header[_ngcontent-%COMP%]   .status-healthy[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #28A745;\n}\n.dashboard-header[_ngcontent-%COMP%]   .status-unhealthy[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #F8D7DA 0%, #DC3545 100%);\n  color: #721C24;\n  font-weight: 600;\n}\n.dashboard-header[_ngcontent-%COMP%]   .status-unhealthy[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #DC3545;\n}\n\n.kpi-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 24px;\n  margin-bottom: 32px;\n}\n\n.kpi-card[_ngcontent-%COMP%] {\n  border-radius: 16px;\n  border: none;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n  position: relative;\n  overflow: hidden;\n}\n.kpi-card[_ngcontent-%COMP%]::before {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  height: 4px;\n  background: var(--accent-color, #FFEA00);\n}\n.kpi-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-content[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-info[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 800;\n  margin-bottom: 4px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-label[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #374151;\n  margin-bottom: 8px;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-trend[_ngcontent-%COMP%], .kpi-card[_ngcontent-%COMP%]   .kpi-sublabel[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: #6B7280;\n  display: flex;\n  align-items: center;\n  gap: 4px;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-trend.positive[_ngcontent-%COMP%], .kpi-card[_ngcontent-%COMP%]   .kpi-sublabel.positive[_ngcontent-%COMP%] {\n  color: #059669;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-trend.positive[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .kpi-card[_ngcontent-%COMP%]   .kpi-sublabel.positive[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #059669;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-trend.negative[_ngcontent-%COMP%], .kpi-card[_ngcontent-%COMP%]   .kpi-sublabel.negative[_ngcontent-%COMP%] {\n  color: #DC2626;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-trend.negative[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .kpi-card[_ngcontent-%COMP%]   .kpi-sublabel.negative[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #DC2626;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-trend[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .kpi-card[_ngcontent-%COMP%]   .kpi-sublabel[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.kpi-card[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n  font-size: 56px;\n  width: 56px;\n  height: 56px;\n  opacity: 0.6;\n  color: #9CA3AF;\n}\n.kpi-card.orders[_ngcontent-%COMP%] {\n  --accent-color: #3B82F6;\n}\n.kpi-card.orders[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n  color: #3B82F6;\n}\n.kpi-card.payments[_ngcontent-%COMP%] {\n  --accent-color: #10B981;\n}\n.kpi-card.payments[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n  color: #10B981;\n}\n.kpi-card.users[_ngcontent-%COMP%] {\n  --accent-color: #8B5CF6;\n}\n.kpi-card.users[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n  color: #8B5CF6;\n}\n.kpi-card.errors[_ngcontent-%COMP%] {\n  --accent-color: #EF4444;\n}\n.kpi-card.errors[_ngcontent-%COMP%]   .kpi-icon[_ngcontent-%COMP%] {\n  color: #EF4444;\n}\n.kpi-card.errors.alert[_ngcontent-%COMP%] {\n  background: linear-gradient(135deg, #FEE2E2 0%, #FECACA 100%);\n  border: 2px solid #EF4444;\n}\n.kpi-card.errors.alert[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  color: #DC2626;\n  -webkit-text-fill-color: #DC2626;\n}\n\n.monitoring-tabs[_ngcontent-%COMP%] {\n  background: white;\n  border-radius: 16px;\n  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n.monitoring-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-group .mat-mdc-tab-header {\n  border-bottom: 1px solid #E5E7EB;\n  background: #F9FAFB;\n}\n.monitoring-tabs[_ngcontent-%COMP%]     .mat-mdc-tab-group .mat-mdc-tab-header .mat-mdc-tab {\n  min-width: 200px;\n  font-weight: 600;\n  font-size: 1rem;\n}\n\n.tab-content[_ngcontent-%COMP%] {\n  padding: 32px;\n}\n\n.components-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\n  gap: 24px;\n  margin-bottom: 32px;\n}\n\n.component-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n  transition: all 0.3s ease;\n}\n.component-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);\n}\n.component-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.component-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1F2937;\n}\n.component-card[_ngcontent-%COMP%]   .component-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n  margin-top: 16px;\n}\n.component-card[_ngcontent-%COMP%]   .component-metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 8px 0;\n  border-bottom: 1px solid #F3F4F6;\n}\n.component-card[_ngcontent-%COMP%]   .component-metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.component-card[_ngcontent-%COMP%]   .component-metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   .metric-label[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #6B7280;\n}\n.component-card[_ngcontent-%COMP%]   .component-metrics[_ngcontent-%COMP%]   .metric[_ngcontent-%COMP%]   .metric-value[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1F2937;\n}\n\n.status-up[_ngcontent-%COMP%] {\n  background: #D1FAE5;\n  color: #065F46;\n  font-weight: 600;\n}\n\n.status-down[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #991B1B;\n  font-weight: 600;\n}\n\n.resources-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n}\n.resources-card[_ngcontent-%COMP%]   .resource-metrics[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n.resources-card[_ngcontent-%COMP%]   .resource-metrics[_ngcontent-%COMP%]   .resource-item[_ngcontent-%COMP%]   .resource-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n}\n.resources-card[_ngcontent-%COMP%]   .resource-metrics[_ngcontent-%COMP%]   .resource-item[_ngcontent-%COMP%]   .resource-header[_ngcontent-%COMP%]   .resource-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #1F2937;\n}\n.resources-card[_ngcontent-%COMP%]   .resource-metrics[_ngcontent-%COMP%]   .resource-item[_ngcontent-%COMP%]   .resource-header[_ngcontent-%COMP%]   .resource-value[_ngcontent-%COMP%] {\n  font-weight: 700;\n  color: #374151;\n}\n.resources-card[_ngcontent-%COMP%]   .resource-metrics[_ngcontent-%COMP%]   .resource-item[_ngcontent-%COMP%]   .resource-details[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  font-size: 0.875rem;\n  color: #6B7280;\n}\n\n.mat-mdc-progress-bar[_ngcontent-%COMP%] {\n  height: 8px;\n  border-radius: 4px;\n}\n.mat-mdc-progress-bar.progress-success[_ngcontent-%COMP%]     .mdc-linear-progress__bar-inner {\n  border-color: #10B981;\n}\n.mat-mdc-progress-bar.progress-warning[_ngcontent-%COMP%]     .mdc-linear-progress__bar-inner {\n  border-color: #F59E0B;\n}\n.mat-mdc-progress-bar.progress-danger[_ngcontent-%COMP%]     .mdc-linear-progress__bar-inner {\n  border-color: #EF4444;\n}\n\n.performance-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n}\n\n.performance-table[_ngcontent-%COMP%] {\n  margin: -16px;\n  padding: 16px;\n  overflow-x: auto;\n}\n\n.performance-metrics-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.performance-metrics-table[_ngcontent-%COMP%]   .mat-mdc-header-cell[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #374151;\n  font-size: 0.875rem;\n  border-bottom: 2px solid #E5E7EB;\n}\n.performance-metrics-table[_ngcontent-%COMP%]   .mat-mdc-cell[_ngcontent-%COMP%] {\n  border-bottom: 1px solid #F3F4F6;\n  padding: 16px 8px;\n}\n.performance-metrics-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #F9FAFB;\n}\n\n.performance-fast[_ngcontent-%COMP%] {\n  color: #059669;\n  font-weight: 600;\n}\n\n.performance-medium[_ngcontent-%COMP%] {\n  color: #D97706;\n  font-weight: 600;\n}\n\n.performance-slow[_ngcontent-%COMP%] {\n  color: #DC2626;\n  font-weight: 600;\n}\n\n.status-fast[_ngcontent-%COMP%] {\n  background: #D1FAE5;\n  color: #065F46;\n}\n\n.status-medium[_ngcontent-%COMP%] {\n  background: #FEF3C7;\n  color: #92400E;\n}\n\n.status-slow[_ngcontent-%COMP%] {\n  background: #FEE2E2;\n  color: #991B1B;\n}\n\n.logs-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  border: 1px solid #E5E7EB;\n}\n.logs-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.logs-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .card-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n}\n\n.logs-container[_ngcontent-%COMP%] {\n  max-height: 500px;\n  overflow-y: auto;\n  background: #1F2937;\n  border-radius: 8px;\n  padding: 16px;\n  font-family: \"JetBrains Mono\", \"Courier New\", monospace;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n  padding: 4px 0;\n  font-size: 0.875rem;\n  border-bottom: 1px solid #374151;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry[_ngcontent-%COMP%]   .log-timestamp[_ngcontent-%COMP%] {\n  color: #9CA3AF;\n  min-width: 80px;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry[_ngcontent-%COMP%]   .log-level[_ngcontent-%COMP%] {\n  min-width: 60px;\n  font-weight: 600;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry[_ngcontent-%COMP%]   .log-component[_ngcontent-%COMP%] {\n  color: #60A5FA;\n  min-width: 120px;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry[_ngcontent-%COMP%]   .log-message[_ngcontent-%COMP%] {\n  color: #E5E7EB;\n  flex: 1;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry.log-INFO[_ngcontent-%COMP%]   .log-level[_ngcontent-%COMP%] {\n  color: #10B981;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry.log-WARN[_ngcontent-%COMP%]   .log-level[_ngcontent-%COMP%] {\n  color: #F59E0B;\n}\n.logs-container[_ngcontent-%COMP%]   .log-entry.log-ERROR[_ngcontent-%COMP%]   .log-level[_ngcontent-%COMP%] {\n  color: #EF4444;\n}\n\n@media (max-width: 1200px) {\n  .monitoring-dashboard[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n    gap: 16px;\n  }\n  .components-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n    gap: 16px;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 24px;\n  }\n}\n@media (max-width: 768px) {\n  .dashboard-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: flex-start;\n  }\n  .dashboard-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n    justify-content: space-between;\n  }\n  .kpi-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .components-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .kpi-value[_ngcontent-%COMP%] {\n    font-size: 2rem !important;\n  }\n  .kpi-icon[_ngcontent-%COMP%] {\n    font-size: 40px !important;\n    width: 40px !important;\n    height: 40px !important;\n  }\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.7;\n  }\n}\n.kpi-card.alert[_ngcontent-%COMP%]   .kpi-value[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse 2s infinite;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vcGFnZXMvc3lzdGVtLW1vbml0b3Jpbmcvc3lzdGVtLW1vbml0b3JpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUNGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxtQkFBQTtBQUFGO0FBRUU7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLFNBQUE7QUFBSjtBQUdFO0VBQ0UsYUFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQURKO0FBSUU7RUFDRSw2REFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtBQUZKO0FBSUk7RUFDRSxjQUFBO0FBRk47QUFNRTtFQUNFLDZEQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBSko7QUFNSTtFQUNFLGNBQUE7QUFKTjs7QUFVQTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQVBGOztBQVVBO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0VBQ0EseUNBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7QUFQRjtBQVNFO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsV0FBQTtFQUNBLHdDQUFBO0FBUEo7QUFVRTtFQUNFLDJCQUFBO0VBQ0EsMkNBQUE7QUFSSjtBQVdFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FBVEo7QUFZRTtFQUNFLE9BQUE7QUFWSjtBQWFFO0VBQ0UsaUJBQUE7RUFDQSxnQkFBQTtFQUNBLGtCQUFBO0VBQ0EsNkRBQUE7RUFDQSw2QkFBQTtFQUNBLG9DQUFBO0VBQ0EscUJBQUE7QUFYSjtBQWNFO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxrQkFBQTtBQVpKO0FBZUU7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBYko7QUFlSTtFQUNFLGNBQUE7QUFiTjtBQWVNO0VBQ0UsY0FBQTtBQWJSO0FBaUJJO0VBQ0UsY0FBQTtBQWZOO0FBaUJNO0VBQ0UsY0FBQTtBQWZSO0FBbUJJO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FBakJOO0FBcUJFO0VBQ0UsZUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUFuQko7QUF1QkU7RUFDRSx1QkFBQTtBQXJCSjtBQXNCSTtFQUFZLGNBQUE7QUFuQmhCO0FBc0JFO0VBQ0UsdUJBQUE7QUFwQko7QUFxQkk7RUFBWSxjQUFBO0FBbEJoQjtBQXFCRTtFQUNFLHVCQUFBO0FBbkJKO0FBb0JJO0VBQVksY0FBQTtBQWpCaEI7QUFvQkU7RUFDRSx1QkFBQTtBQWxCSjtBQW1CSTtFQUFZLGNBQUE7QUFoQmhCO0FBa0JJO0VBQ0UsNkRBQUE7RUFDQSx5QkFBQTtBQWhCTjtBQWtCTTtFQUNFLGNBQUE7RUFDQSxnQ0FBQTtBQWhCUjs7QUF1QkE7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtBQXBCRjtBQXVCSTtFQUNFLGdDQUFBO0VBQ0EsbUJBQUE7QUFyQk47QUF1Qk07RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtBQXJCUjs7QUEyQkE7RUFDRSxhQUFBO0FBeEJGOztBQTRCQTtFQUNFLGFBQUE7RUFDQSwyREFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtBQXpCRjs7QUE0QkE7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0VBQ0EseUJBQUE7QUF6QkY7QUEyQkU7RUFDRSwyQkFBQTtFQUNBLHlDQUFBO0FBekJKO0FBNEJFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUExQko7QUE0Qkk7RUFDRSxnQkFBQTtFQUNBLGNBQUE7QUExQk47QUE4QkU7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsZ0JBQUE7QUE1Qko7QUE4Qkk7RUFDRSxhQUFBO0VBQ0EsOEJBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxnQ0FBQTtBQTVCTjtBQThCTTtFQUNFLG1CQUFBO0FBNUJSO0FBK0JNO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBN0JSO0FBZ0NNO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0FBOUJSOztBQXFDQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBbENGOztBQXFDQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FBbENGOztBQXNDQTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7QUFuQ0Y7QUFxQ0U7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0FBbkNKO0FBc0NNO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQXBDUjtBQXNDUTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQXBDVjtBQXVDUTtFQUNFLGdCQUFBO0VBQ0EsY0FBQTtBQXJDVjtBQXlDTTtFQUNFLGVBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7QUF2Q1I7O0FBOENBO0VBQ0UsV0FBQTtFQUNBLGtCQUFBO0FBM0NGO0FBOENJO0VBQ0UscUJBQUE7QUE1Q047QUFpREk7RUFDRSxxQkFBQTtBQS9DTjtBQW9ESTtFQUNFLHFCQUFBO0FBbEROOztBQXdEQTtFQUNFLG1CQUFBO0VBQ0EseUJBQUE7QUFyREY7O0FBd0RBO0VBQ0UsYUFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQXJERjs7QUF3REE7RUFDRSxXQUFBO0FBckRGO0FBdURFO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQ0FBQTtBQXJESjtBQXdERTtFQUNFLGdDQUFBO0VBQ0EsaUJBQUE7QUF0REo7QUF5REU7RUFDRSx5QkFBQTtBQXZESjs7QUE0REE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7QUF6REY7O0FBNERBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0FBekRGOztBQTREQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtBQXpERjs7QUE0REE7RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUF6REY7O0FBNERBO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0FBekRGOztBQTREQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQXpERjs7QUE2REE7RUFDRSxtQkFBQTtFQUNBLHlCQUFBO0FBMURGO0FBNERFO0VBQ0UsYUFBQTtFQUNBLDhCQUFBO0VBQ0EsbUJBQUE7QUExREo7QUE0REk7RUFDRSxhQUFBO0VBQ0EsUUFBQTtBQTFETjs7QUErREE7RUFDRSxpQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBQUE7RUFDQSx1REFBQTtBQTVERjtBQThERTtFQUNFLGFBQUE7RUFDQSxTQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0NBQUE7QUE1REo7QUE4REk7RUFDRSxtQkFBQTtBQTVETjtBQStESTtFQUNFLGNBQUE7RUFDQSxlQUFBO0FBN0ROO0FBZ0VJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FBOUROO0FBaUVJO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0FBL0ROO0FBa0VJO0VBQ0UsY0FBQTtFQUNBLE9BQUE7QUFoRU47QUFvRU07RUFDRSxjQUFBO0FBbEVSO0FBdUVNO0VBQ0UsY0FBQTtBQXJFUjtBQTBFTTtFQUNFLGNBQUE7QUF4RVI7O0FBK0VBO0VBQ0U7SUFDRSxhQUFBO0VBNUVGO0VBK0VBO0lBQ0UsMkRBQUE7SUFDQSxTQUFBO0VBN0VGO0VBZ0ZBO0lBQ0UsMkRBQUE7SUFDQSxTQUFBO0VBOUVGO0VBaUZBO0lBQ0UsYUFBQTtFQS9FRjtBQUNGO0FBa0ZBO0VBQ0U7SUFDRSxzQkFBQTtJQUNBLFNBQUE7SUFDQSx1QkFBQTtFQWhGRjtFQWtGRTtJQUNFLFdBQUE7SUFDQSw4QkFBQTtFQWhGSjtFQW9GQTtJQUNFLDBCQUFBO0VBbEZGO0VBcUZBO0lBQ0UsMEJBQUE7RUFuRkY7RUFzRkE7SUFDRSxhQUFBO0VBcEZGO0VBdUZBO0lBQ0UsMEJBQUE7RUFyRkY7RUF3RkE7SUFDRSwwQkFBQTtJQUNBLHNCQUFBO0lBQ0EsdUJBQUE7RUF0RkY7QUFDRjtBQTBGQTtFQUNFO0lBQ0UsVUFBQTtFQXhGRjtFQTBGQTtJQUNFLFlBQUE7RUF4RkY7QUFDRjtBQTJGQTtFQUNFLDRCQUFBO0FBekZGIiwic291cmNlc0NvbnRlbnQiOlsiLm1vbml0b3JpbmctZGFzaGJvYXJkIHtcclxuICBtYXgtd2lkdGg6IDE2MDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxuICBwYWRkaW5nOiAyNHB4O1xyXG4gIGJhY2tncm91bmQ6ICNGNUY3RkE7XHJcbiAgbWluLWhlaWdodDogMTAwdmg7XHJcbn1cclxuXHJcbi8vIEhlYWRlclxyXG4uZGFzaGJvYXJkLWhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAzMnB4O1xyXG4gIFxyXG4gIGgxIHtcclxuICAgIGZvbnQtc2l6ZTogMi4yNXJlbTtcclxuICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICBjb2xvcjogIzFCMUIxQjtcclxuICAgIG1hcmdpbjogMDtcclxuICB9XHJcbiAgXHJcbiAgLmhlYWRlci1hY3Rpb25zIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBnYXA6IDE2cHg7XHJcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xyXG4gIH1cclxuICBcclxuICAuc3RhdHVzLWhlYWx0aHkge1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI0Q0RUREQSAwJSwgIzI4QTc0NSAxMDAlKTtcclxuICAgIGNvbG9yOiAjMTU1NzI0O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIFxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICBjb2xvcjogIzI4QTc0NTtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLnN0YXR1cy11bmhlYWx0aHkge1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI0Y4RDdEQSAwJSwgI0RDMzU0NSAxMDAlKTtcclxuICAgIGNvbG9yOiAjNzIxQzI0O1xyXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgIFxyXG4gICAgbWF0LWljb24ge1xyXG4gICAgICBjb2xvcjogI0RDMzU0NTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIEtQSSBHcmlkXHJcbi5rcGktZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMwMHB4LCAxZnIpKTtcclxuICBnYXA6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcclxufVxyXG5cclxuLmtwaS1jYXJkIHtcclxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xyXG4gIGJvcmRlcjogbm9uZTtcclxuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC4xKTtcclxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlO1xyXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcclxuICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gIFxyXG4gICY6OmJlZm9yZSB7XHJcbiAgICBjb250ZW50OiAnJztcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogMDtcclxuICAgIGxlZnQ6IDA7XHJcbiAgICByaWdodDogMDtcclxuICAgIGhlaWdodDogNHB4O1xyXG4gICAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50LWNvbG9yLCAjRkZFQTAwKTtcclxuICB9XHJcbiAgXHJcbiAgJjpob3ZlciB7XHJcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTRweCk7XHJcbiAgICBib3gtc2hhZG93OiAwIDE2cHggNDBweCByZ2JhKDAsIDAsIDAsIDAuMTUpO1xyXG4gIH1cclxuICBcclxuICAua3BpLWNvbnRlbnQge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBwYWRkaW5nOiA4cHggMDtcclxuICB9XHJcbiAgXHJcbiAgLmtwaS1pbmZvIHtcclxuICAgIGZsZXg6IDE7XHJcbiAgfVxyXG4gIFxyXG4gIC5rcGktdmFsdWUge1xyXG4gICAgZm9udC1zaXplOiAyLjVyZW07XHJcbiAgICBmb250LXdlaWdodDogODAwO1xyXG4gICAgbWFyZ2luLWJvdHRvbTogNHB4O1xyXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY2N2VlYSAwJSwgIzc2NGJhMiAxMDAlKTtcclxuICAgIC13ZWJraXQtYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xyXG4gICAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHRyYW5zcGFyZW50O1xyXG4gICAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0O1xyXG4gIH1cclxuICBcclxuICAua3BpLWxhYmVsIHtcclxuICAgIGZvbnQtc2l6ZTogMS4xMjVyZW07XHJcbiAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgY29sb3I6ICMzNzQxNTE7XHJcbiAgICBtYXJnaW4tYm90dG9tOiA4cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5rcGktdHJlbmQsIC5rcGktc3VibGFiZWwge1xyXG4gICAgZm9udC1zaXplOiAwLjg3NXJlbTtcclxuICAgIGNvbG9yOiAjNkI3MjgwO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBnYXA6IDRweDtcclxuICAgIFxyXG4gICAgJi5wb3NpdGl2ZSB7XHJcbiAgICAgIGNvbG9yOiAjMDU5NjY5O1xyXG4gICAgICBcclxuICAgICAgbWF0LWljb24ge1xyXG4gICAgICAgIGNvbG9yOiAjMDU5NjY5O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgICYubmVnYXRpdmUge1xyXG4gICAgICBjb2xvcjogI0RDMjYyNjtcclxuICAgICAgXHJcbiAgICAgIG1hdC1pY29uIHtcclxuICAgICAgICBjb2xvcjogI0RDMjYyNjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBtYXQtaWNvbiB7XHJcbiAgICAgIGZvbnQtc2l6ZTogMTZweDtcclxuICAgICAgd2lkdGg6IDE2cHg7XHJcbiAgICAgIGhlaWdodDogMTZweDtcclxuICAgIH1cclxuICB9XHJcbiAgXHJcbiAgLmtwaS1pY29uIHtcclxuICAgIGZvbnQtc2l6ZTogNTZweDtcclxuICAgIHdpZHRoOiA1NnB4O1xyXG4gICAgaGVpZ2h0OiA1NnB4O1xyXG4gICAgb3BhY2l0eTogMC42O1xyXG4gICAgY29sb3I6ICM5Q0EzQUY7XHJcbiAgfVxyXG4gIFxyXG4gIC8vIFNwZWNpZmljIEtQSSBjb2xvcnNcclxuICAmLm9yZGVycyB7XHJcbiAgICAtLWFjY2VudC1jb2xvcjogIzNCODJGNjtcclxuICAgIC5rcGktaWNvbiB7IGNvbG9yOiAjM0I4MkY2OyB9XHJcbiAgfVxyXG4gIFxyXG4gICYucGF5bWVudHMge1xyXG4gICAgLS1hY2NlbnQtY29sb3I6ICMxMEI5ODE7XHJcbiAgICAua3BpLWljb24geyBjb2xvcjogIzEwQjk4MTsgfVxyXG4gIH1cclxuICBcclxuICAmLnVzZXJzIHtcclxuICAgIC0tYWNjZW50LWNvbG9yOiAjOEI1Q0Y2O1xyXG4gICAgLmtwaS1pY29uIHsgY29sb3I6ICM4QjVDRjY7IH1cclxuICB9XHJcbiAgXHJcbiAgJi5lcnJvcnMge1xyXG4gICAgLS1hY2NlbnQtY29sb3I6ICNFRjQ0NDQ7XHJcbiAgICAua3BpLWljb24geyBjb2xvcjogI0VGNDQ0NDsgfVxyXG4gICAgXHJcbiAgICAmLmFsZXJ0IHtcclxuICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI0ZFRTJFMiAwJSwgI0ZFQ0FDQSAxMDAlKTtcclxuICAgICAgYm9yZGVyOiAycHggc29saWQgI0VGNDQ0NDtcclxuICAgICAgXHJcbiAgICAgIC5rcGktdmFsdWUge1xyXG4gICAgICAgIGNvbG9yOiAjREMyNjI2O1xyXG4gICAgICAgIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiAjREMyNjI2O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBNYWluIFRhYnNcclxuLm1vbml0b3JpbmctdGFicyB7XHJcbiAgYmFja2dyb3VuZDogd2hpdGU7XHJcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcclxuICBib3gtc2hhZG93OiAwIDhweCAzMnB4IHJnYmEoMCwgMCwgMCwgMC4wOCk7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBcclxuICA6Om5nLWRlZXAgLm1hdC1tZGMtdGFiLWdyb3VwIHtcclxuICAgIC5tYXQtbWRjLXRhYi1oZWFkZXIge1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0U1RTdFQjtcclxuICAgICAgYmFja2dyb3VuZDogI0Y5RkFGQjtcclxuICAgICAgXHJcbiAgICAgIC5tYXQtbWRjLXRhYiB7XHJcbiAgICAgICAgbWluLXdpZHRoOiAyMDBweDtcclxuICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMXJlbTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLnRhYi1jb250ZW50IHtcclxuICBwYWRkaW5nOiAzMnB4O1xyXG59XHJcblxyXG4vLyBDb21wb25lbnRzIEdyaWRcclxuLmNvbXBvbmVudHMtZ3JpZCB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDM1MHB4LCAxZnIpKTtcclxuICBnYXA6IDI0cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMzJweDtcclxufVxyXG5cclxuLmNvbXBvbmVudC1jYXJkIHtcclxuICBib3JkZXItcmFkaXVzOiAxMnB4O1xyXG4gIGJvcmRlcjogMXB4IHNvbGlkICNFNUU3RUI7XHJcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcclxuICBcclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcclxuICAgIGJveC1zaGFkb3c6IDAgOHB4IDI1cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xyXG4gIH1cclxuICBcclxuICBtYXQtY2FyZC1oZWFkZXIge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICBcclxuICAgIG1hdC1jYXJkLXRpdGxlIHtcclxuICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgY29sb3I6ICMxRjI5Mzc7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC5jb21wb25lbnQtbWV0cmljcyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGdhcDogMTJweDtcclxuICAgIG1hcmdpbi10b3A6IDE2cHg7XHJcbiAgICBcclxuICAgIC5tZXRyaWMge1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgIHBhZGRpbmc6IDhweCAwO1xyXG4gICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0YzRjRGNjtcclxuICAgICAgXHJcbiAgICAgICY6bGFzdC1jaGlsZCB7XHJcbiAgICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLm1ldHJpYy1sYWJlbCB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDUwMDtcclxuICAgICAgICBjb2xvcjogIzZCNzI4MDtcclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgLm1ldHJpYy12YWx1ZSB7XHJcbiAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDtcclxuICAgICAgICBjb2xvcjogIzFGMjkzNztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gU3RhdHVzIGNoaXBzIGZvciBjb21wb25lbnRzXHJcbi5zdGF0dXMtdXAge1xyXG4gIGJhY2tncm91bmQ6ICNEMUZBRTU7XHJcbiAgY29sb3I6ICMwNjVGNDY7XHJcbiAgZm9udC13ZWlnaHQ6IDYwMDtcclxufVxyXG5cclxuLnN0YXR1cy1kb3duIHtcclxuICBiYWNrZ3JvdW5kOiAjRkVFMkUyO1xyXG4gIGNvbG9yOiAjOTkxQjFCO1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi8vIFJlc291cmNlcyBDYXJkXHJcbi5yZXNvdXJjZXMtY2FyZCB7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjRTVFN0VCO1xyXG4gIFxyXG4gIC5yZXNvdXJjZS1tZXRyaWNzIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAyNHB4O1xyXG4gICAgXHJcbiAgICAucmVzb3VyY2UtaXRlbSB7XHJcbiAgICAgIC5yZXNvdXJjZS1oZWFkZXIge1xyXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgICAgICAgbWFyZ2luLWJvdHRvbTogOHB4O1xyXG4gICAgICAgIFxyXG4gICAgICAgIC5yZXNvdXJjZS1sYWJlbCB7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgICAgY29sb3I6ICMxRjI5Mzc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC5yZXNvdXJjZS12YWx1ZSB7XHJcbiAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xyXG4gICAgICAgICAgY29sb3I6ICMzNzQxNTE7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICAucmVzb3VyY2UtZGV0YWlscyB7XHJcbiAgICAgICAgbWFyZ2luLXRvcDogOHB4O1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICAgICAgY29sb3I6ICM2QjcyODA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIFByb2dyZXNzIGJhcnNcclxuLm1hdC1tZGMtcHJvZ3Jlc3MtYmFyIHtcclxuICBoZWlnaHQ6IDhweDtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgXHJcbiAgJi5wcm9ncmVzcy1zdWNjZXNzIHtcclxuICAgIDo6bmctZGVlcCAubWRjLWxpbmVhci1wcm9ncmVzc19fYmFyLWlubmVyIHtcclxuICAgICAgYm9yZGVyLWNvbG9yOiAjMTBCOTgxO1xyXG4gICAgfVxyXG4gIH1cclxuICBcclxuICAmLnByb2dyZXNzLXdhcm5pbmcge1xyXG4gICAgOjpuZy1kZWVwIC5tZGMtbGluZWFyLXByb2dyZXNzX19iYXItaW5uZXIge1xyXG4gICAgICBib3JkZXItY29sb3I6ICNGNTlFMEI7XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gICYucHJvZ3Jlc3MtZGFuZ2VyIHtcclxuICAgIDo6bmctZGVlcCAubWRjLWxpbmVhci1wcm9ncmVzc19fYmFyLWlubmVyIHtcclxuICAgICAgYm9yZGVyLWNvbG9yOiAjRUY0NDQ0O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8gUGVyZm9ybWFuY2UgVGFibGVcclxuLnBlcmZvcm1hbmNlLWNhcmQge1xyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI0U1RTdFQjtcclxufVxyXG5cclxuLnBlcmZvcm1hbmNlLXRhYmxlIHtcclxuICBtYXJnaW46IC0xNnB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgb3ZlcmZsb3cteDogYXV0bztcclxufVxyXG5cclxuLnBlcmZvcm1hbmNlLW1ldHJpY3MtdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIFxyXG4gIC5tYXQtbWRjLWhlYWRlci1jZWxsIHtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzM3NDE1MTtcclxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAycHggc29saWQgI0U1RTdFQjtcclxuICB9XHJcbiAgXHJcbiAgLm1hdC1tZGMtY2VsbCB7XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI0YzRjRGNjtcclxuICAgIHBhZGRpbmc6IDE2cHggOHB4O1xyXG4gIH1cclxuICBcclxuICAubWF0LW1kYy1yb3c6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y5RkFGQjtcclxuICB9XHJcbn1cclxuXHJcbi8vIFBlcmZvcm1hbmNlIGluZGljYXRvcnNcclxuLnBlcmZvcm1hbmNlLWZhc3Qge1xyXG4gIGNvbG9yOiAjMDU5NjY5O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5wZXJmb3JtYW5jZS1tZWRpdW0ge1xyXG4gIGNvbG9yOiAjRDk3NzA2O1xyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbn1cclxuXHJcbi5wZXJmb3JtYW5jZS1zbG93IHtcclxuICBjb2xvcjogI0RDMjYyNjtcclxuICBmb250LXdlaWdodDogNjAwO1xyXG59XHJcblxyXG4uc3RhdHVzLWZhc3Qge1xyXG4gIGJhY2tncm91bmQ6ICNEMUZBRTU7XHJcbiAgY29sb3I6ICMwNjVGNDY7XHJcbn1cclxuXHJcbi5zdGF0dXMtbWVkaXVtIHtcclxuICBiYWNrZ3JvdW5kOiAjRkVGM0M3O1xyXG4gIGNvbG9yOiAjOTI0MDBFO1xyXG59XHJcblxyXG4uc3RhdHVzLXNsb3cge1xyXG4gIGJhY2tncm91bmQ6ICNGRUUyRTI7XHJcbiAgY29sb3I6ICM5OTFCMUI7XHJcbn1cclxuXHJcbi8vIExvZ3NcclxuLmxvZ3MtY2FyZCB7XHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDtcclxuICBib3JkZXI6IDFweCBzb2xpZCAjRTVFN0VCO1xyXG4gIFxyXG4gIG1hdC1jYXJkLWhlYWRlciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIFxyXG4gICAgLmNhcmQtYWN0aW9ucyB7XHJcbiAgICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICAgIGdhcDogOHB4O1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLmxvZ3MtY29udGFpbmVyIHtcclxuICBtYXgtaGVpZ2h0OiA1MDBweDtcclxuICBvdmVyZmxvdy15OiBhdXRvO1xyXG4gIGJhY2tncm91bmQ6ICMxRjI5Mzc7XHJcbiAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG4gIHBhZGRpbmc6IDE2cHg7XHJcbiAgZm9udC1mYW1pbHk6ICdKZXRCcmFpbnMgTW9ubycsICdDb3VyaWVyIE5ldycsIG1vbm9zcGFjZTtcclxuICBcclxuICAubG9nLWVudHJ5IHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBnYXA6IDEycHg7XHJcbiAgICBwYWRkaW5nOiA0cHggMDtcclxuICAgIGZvbnQtc2l6ZTogMC44NzVyZW07XHJcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzM3NDE1MTtcclxuICAgIFxyXG4gICAgJjpsYXN0LWNoaWxkIHtcclxuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgLmxvZy10aW1lc3RhbXAge1xyXG4gICAgICBjb2xvcjogIzlDQTNBRjtcclxuICAgICAgbWluLXdpZHRoOiA4MHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubG9nLWxldmVsIHtcclxuICAgICAgbWluLXdpZHRoOiA2MHB4O1xyXG4gICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubG9nLWNvbXBvbmVudCB7XHJcbiAgICAgIGNvbG9yOiAjNjBBNUZBO1xyXG4gICAgICBtaW4td2lkdGg6IDEyMHB4O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICAubG9nLW1lc3NhZ2Uge1xyXG4gICAgICBjb2xvcjogI0U1RTdFQjtcclxuICAgICAgZmxleDogMTtcclxuICAgIH1cclxuICAgIFxyXG4gICAgJi5sb2ctSU5GTyB7XHJcbiAgICAgIC5sb2ctbGV2ZWwge1xyXG4gICAgICAgIGNvbG9yOiAjMTBCOTgxO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgICYubG9nLVdBUk4ge1xyXG4gICAgICAubG9nLWxldmVsIHtcclxuICAgICAgICBjb2xvcjogI0Y1OUUwQjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAmLmxvZy1FUlJPUiB7XHJcbiAgICAgIC5sb2ctbGV2ZWwge1xyXG4gICAgICAgIGNvbG9yOiAjRUY0NDQ0O1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vLyBSZXNwb25zaXZlIERlc2lnblxyXG5AbWVkaWEgKG1heC13aWR0aDogMTIwMHB4KSB7XHJcbiAgLm1vbml0b3JpbmctZGFzaGJvYXJkIHtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5rcGktZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDI4MHB4LCAxZnIpKTtcclxuICAgIGdhcDogMTZweDtcclxuICB9XHJcbiAgXHJcbiAgLmNvbXBvbmVudHMtZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDMwMHB4LCAxZnIpKTtcclxuICAgIGdhcDogMTZweDtcclxuICB9XHJcbiAgXHJcbiAgLnRhYi1jb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDI0cHg7XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuZGFzaGJvYXJkLWhlYWRlciB7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gICAgZ2FwOiAxNnB4O1xyXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XHJcbiAgICBcclxuICAgIC5oZWFkZXItYWN0aW9ucyB7XHJcbiAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgICB9XHJcbiAgfVxyXG4gIFxyXG4gIC5rcGktZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcbiAgXHJcbiAgLmNvbXBvbmVudHMtZ3JpZCB7XHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjtcclxuICB9XHJcbiAgXHJcbiAgLnRhYi1jb250ZW50IHtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbiAgfVxyXG4gIFxyXG4gIC5rcGktdmFsdWUge1xyXG4gICAgZm9udC1zaXplOiAycmVtICFpbXBvcnRhbnQ7XHJcbiAgfVxyXG4gIFxyXG4gIC5rcGktaWNvbiB7XHJcbiAgICBmb250LXNpemU6IDQwcHggIWltcG9ydGFudDtcclxuICAgIHdpZHRoOiA0MHB4ICFpbXBvcnRhbnQ7XHJcbiAgICBoZWlnaHQ6IDQwcHggIWltcG9ydGFudDtcclxuICB9XHJcbn1cclxuXHJcbi8vIEFuaW1hdGlvblxyXG5Aa2V5ZnJhbWVzIHB1bHNlIHtcclxuICAwJSwgMTAwJSB7XHJcbiAgICBvcGFjaXR5OiAxO1xyXG4gIH1cclxuICA1MCUge1xyXG4gICAgb3BhY2l0eTogMC43O1xyXG4gIH1cclxufVxyXG5cclxuLmtwaS1jYXJkLmFsZXJ0IC5rcGktdmFsdWUge1xyXG4gIGFuaW1hdGlvbjogcHVsc2UgMnMgaW5maW5pdGU7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ== */"],
      changeDetection: 0
    });
  }
}

/***/ }),

/***/ 9240:
/*!********************************************************************!*\
  !*** ./node_modules/rxjs/dist/esm/internal/observable/interval.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interval: () => (/* binding */ interval)
/* harmony export */ });
/* harmony import */ var _scheduler_async__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scheduler/async */ 8473);
/* harmony import */ var _timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timer */ 4876);


function interval(period = 0, scheduler = _scheduler_async__WEBPACK_IMPORTED_MODULE_0__.asyncScheduler) {
  if (period < 0) {
    period = 0;
  }
  return (0,_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(period, period, scheduler);
}

/***/ }),

/***/ 6354:
/*!******************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/progress-bar.mjs ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_PROGRESS_BAR_DEFAULT_OPTIONS: () => (/* binding */ MAT_PROGRESS_BAR_DEFAULT_OPTIONS),
/* harmony export */   MAT_PROGRESS_BAR_LOCATION: () => (/* binding */ MAT_PROGRESS_BAR_LOCATION),
/* harmony export */   MAT_PROGRESS_BAR_LOCATION_FACTORY: () => (/* binding */ MAT_PROGRESS_BAR_LOCATION_FACTORY),
/* harmony export */   MatProgressBar: () => (/* binding */ MatProgressBar),
/* harmony export */   MatProgressBarModule: () => (/* binding */ MatProgressBarModule)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/core */ 4646);





/** Injection token to be used to override the default options for `mat-progress-bar`. */
function MatProgressBar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 2);
  }
}
const MAT_PROGRESS_BAR_DEFAULT_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('MAT_PROGRESS_BAR_DEFAULT_OPTIONS');
/**
 * Injection token used to provide the current location to `MatProgressBar`.
 * Used to handle server-side rendering and to stub out during unit tests.
 * @docs-private
 */
const MAT_PROGRESS_BAR_LOCATION = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('mat-progress-bar-location', {
  providedIn: 'root',
  factory: MAT_PROGRESS_BAR_LOCATION_FACTORY
});
/** @docs-private */
function MAT_PROGRESS_BAR_LOCATION_FACTORY() {
  const _document = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_1__.DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => _location ? _location.pathname + _location.search : ''
  };
}
class MatProgressBar {
  constructor(_elementRef, _ngZone, _changeDetectorRef, _animationMode, defaults) {
    this._elementRef = _elementRef;
    this._ngZone = _ngZone;
    this._changeDetectorRef = _changeDetectorRef;
    this._animationMode = _animationMode;
    /** Flag that indicates whether NoopAnimations mode is set to true. */
    this._isNoopAnimation = false;
    this._defaultColor = 'primary';
    this._value = 0;
    this._bufferValue = 0;
    /**
     * Event emitted when animation of the primary progress bar completes. This event will not
     * be emitted when animations are disabled, nor will it be emitted for modes with continuous
     * animations (indeterminate and query).
     */
    this.animationEnd = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._mode = 'determinate';
    /** Event handler for `transitionend` events. */
    this._transitionendHandler = event => {
      if (this.animationEnd.observers.length === 0 || !event.target || !event.target.classList.contains('mdc-linear-progress__primary-bar')) {
        return;
      }
      if (this.mode === 'determinate' || this.mode === 'buffer') {
        this._ngZone.run(() => this.animationEnd.next({
          value: this.value
        }));
      }
    };
    this._isNoopAnimation = _animationMode === 'NoopAnimations';
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      this.mode = defaults.mode || this.mode;
    }
  }
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /** Theme palette color of the progress bar. */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue() {
    return this._bufferValue || 0;
  }
  set bufferValue(v) {
    this._bufferValue = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  get mode() {
    return this._mode;
  }
  set mode(value) {
    // Note that we don't technically need a getter and a setter here,
    // but we use it to match the behavior of the existing mat-progress-bar.
    this._mode = value;
    this._changeDetectorRef.markForCheck();
  }
  ngAfterViewInit() {
    // Run outside angular so change detection didn't get triggered on every transition end
    // instead only on the animation that we care about (primary value bar's transitionend)
    this._ngZone.runOutsideAngular(() => {
      this._elementRef.nativeElement.addEventListener('transitionend', this._transitionendHandler);
    });
  }
  ngOnDestroy() {
    this._elementRef.nativeElement.removeEventListener('transitionend', this._transitionendHandler);
  }
  /** Gets the transform style that should be applied to the primary bar. */
  _getPrimaryBarTransform() {
    return `scaleX(${this._isIndeterminate() ? 1 : this.value / 100})`;
  }
  /** Gets the `flex-basis` value that should be applied to the buffer bar. */
  _getBufferBarFlexBasis() {
    return `${this.mode === 'buffer' ? this.bufferValue : 100}%`;
  }
  /** Returns whether the progress bar is indeterminate. */
  _isIndeterminate() {
    return this.mode === 'indeterminate' || this.mode === 'query';
  }
  static {
    this.ɵfac = function MatProgressBar_Factory(t) {
      return new (t || MatProgressBar)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MAT_PROGRESS_BAR_DEFAULT_OPTIONS, 8));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: MatProgressBar,
      selectors: [["mat-progress-bar"]],
      hostAttrs: ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", "tabindex", "-1", 1, "mat-mdc-progress-bar", "mdc-linear-progress"],
      hostVars: 10,
      hostBindings: function MatProgressBar_HostBindings(rf, ctx) {
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-valuenow", ctx._isIndeterminate() ? null : ctx.value)("mode", ctx.mode);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("mat-" + ctx.color);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("_mat-animation-noopable", ctx._isNoopAnimation)("mdc-linear-progress--animation-ready", !ctx._isNoopAnimation)("mdc-linear-progress--indeterminate", ctx._isIndeterminate());
        }
      },
      inputs: {
        color: "color",
        value: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "value", "value", _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute],
        bufferValue: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "bufferValue", "bufferValue", _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute],
        mode: "mode"
      },
      outputs: {
        animationEnd: "animationEnd"
      },
      exportAs: ["matProgressBar"],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputTransformsFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 7,
      vars: 5,
      consts: [["aria-hidden", "true", 1, "mdc-linear-progress__buffer"], [1, "mdc-linear-progress__buffer-bar"], [1, "mdc-linear-progress__buffer-dots"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"], [1, "mdc-linear-progress__bar-inner"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__secondary-bar"]],
      template: function MatProgressBar_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, MatProgressBar_Conditional_2_Template, 1, 0, "div", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "span", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("flex-basis", ctx._getBufferBarFlexBasis());
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](2, ctx.mode === "buffer" ? 2 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleProp"]("transform", ctx._getPrimaryBarTransform());
        }
      },
      styles: ["@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(var(--mdc-linear-progress-primary-half))}100%{transform:translateX(var(--mdc-linear-progress-primary-full))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(var(--mdc-linear-progress-secondary-quarter))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(var(--mdc-linear-progress-secondary-half))}100%{transform:translateX(var(--mdc-linear-progress-secondary-full))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(var(--mdc-linear-progress-primary-half-neg))}100%{transform:translateX(var(--mdc-linear-progress-primary-full-neg))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(var(--mdc-linear-progress-secondary-half-neg))}100%{transform:translateX(var(--mdc-linear-progress-secondary-full-neg))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}@media screen and (forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;flex:auto;transform:rotate(180deg);-webkit-mask-image:url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E\");animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height) * -2.5))}}.mdc-linear-progress__bar-inner{border-color:var(--mdc-linear-progress-active-indicator-color)}.mdc-linear-progress__buffer-dots{background-color:var(--mdc-linear-progress-track-color)}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.mdc-linear-progress__buffer-dots{background-color:rgba(0,0,0,0);background-image:url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(244, 67, 54, 0.25)'/%3E%3C/svg%3E\")}}.mdc-linear-progress__buffer-bar{background-color:var(--mdc-linear-progress-track-color)}.mdc-linear-progress{height:max(var(--mdc-linear-progress-track-height), var(--mdc-linear-progress-active-indicator-height))}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.mdc-linear-progress{height:4px}}.mdc-linear-progress__bar{height:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress__bar-inner{border-top-width:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress__buffer{height:var(--mdc-linear-progress-track-height)}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.mdc-linear-progress__buffer-dots{background-size:10px var(--mdc-linear-progress-track-height)}}.mdc-linear-progress__buffer{border-radius:var(--mdc-linear-progress-track-shape)}.mat-mdc-progress-bar{display:block;text-align:start;--mdc-linear-progress-primary-half: 83.67142%;--mdc-linear-progress-primary-full: 200.611057%;--mdc-linear-progress-secondary-quarter: 37.651913%;--mdc-linear-progress-secondary-half: 84.386165%;--mdc-linear-progress-secondary-full: 160.277782%;--mdc-linear-progress-primary-half-neg: -83.67142%;--mdc-linear-progress-primary-full-neg: -200.611057%;--mdc-linear-progress-secondary-quarter-neg: -37.651913%;--mdc-linear-progress-secondary-half-neg: -84.386165%;--mdc-linear-progress-secondary-full-neg: -160.277782%}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatProgressBar, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-progress-bar',
      exportAs: 'matProgressBar',
      host: {
        'role': 'progressbar',
        'aria-valuemin': '0',
        'aria-valuemax': '100',
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        'tabindex': '-1',
        '[attr.aria-valuenow]': '_isIndeterminate() ? null : value',
        '[attr.mode]': 'mode',
        'class': 'mat-mdc-progress-bar mdc-linear-progress',
        '[class]': '"mat-" + color',
        '[class._mat-animation-noopable]': '_isNoopAnimation',
        '[class.mdc-linear-progress--animation-ready]': '!_isNoopAnimation',
        '[class.mdc-linear-progress--indeterminate]': '_isIndeterminate()'
      },
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      standalone: true,
      template: "<!--\n  All children need to be hidden for screen readers in order to support ChromeVox.\n  More context in the issue: https://github.com/angular/components/issues/22165.\n-->\n<div class=\"mdc-linear-progress__buffer\" aria-hidden=\"true\">\n  <div\n    class=\"mdc-linear-progress__buffer-bar\"\n    [style.flex-basis]=\"_getBufferBarFlexBasis()\"></div>\n  <!-- Remove the dots outside of buffer mode since they can cause CSP issues (see #28938) -->\n  @if (mode === 'buffer') {\n    <div class=\"mdc-linear-progress__buffer-dots\"></div>\n  }\n</div>\n<div\n  class=\"mdc-linear-progress__bar mdc-linear-progress__primary-bar\"\n  aria-hidden=\"true\"\n  [style.transform]=\"_getPrimaryBarTransform()\">\n  <span class=\"mdc-linear-progress__bar-inner\"></span>\n</div>\n<div class=\"mdc-linear-progress__bar mdc-linear-progress__secondary-bar\" aria-hidden=\"true\">\n  <span class=\"mdc-linear-progress__bar-inner\"></span>\n</div>\n",
      styles: ["@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(var(--mdc-linear-progress-primary-half))}100%{transform:translateX(var(--mdc-linear-progress-primary-full))}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(var(--mdc-linear-progress-secondary-quarter))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(var(--mdc-linear-progress-secondary-half))}100%{transform:translateX(var(--mdc-linear-progress-secondary-full))}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(var(--mdc-linear-progress-primary-half-neg))}100%{transform:translateX(var(--mdc-linear-progress-primary-full-neg))}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(var(--mdc-linear-progress-secondary-quarter-neg))}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(var(--mdc-linear-progress-secondary-half-neg))}100%{transform:translateX(var(--mdc-linear-progress-secondary-full-neg))}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}@media screen and (forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden}.mdc-linear-progress__buffer-dots{background-repeat:repeat-x;flex:auto;transform:rotate(180deg);-webkit-mask-image:url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E\");mask-image:url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='xMinYMin slice'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/svg%3E\");animation:mdc-linear-progress-buffering 250ms infinite linear}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1)}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate 2s infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale 2s infinite linear}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__bar{right:0;-webkit-transform-origin:center right;transform-origin:center right}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress:not([dir=ltr]) .mdc-linear-progress__buffer-dots,.mdc-linear-progress[dir=rtl]:not([dir=ltr]) .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse 250ms infinite linear;transform:rotate(0)}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}[dir=rtl] .mdc-linear-progress:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar,.mdc-linear-progress[dir=rtl]:not([dir=ltr]).mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}.mdc-linear-progress--closed{opacity:0}.mdc-linear-progress--closed-animation-off .mdc-linear-progress__buffer-dots{animation:none}.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar,.mdc-linear-progress--closed-animation-off.mdc-linear-progress--indeterminate .mdc-linear-progress__bar .mdc-linear-progress__bar-inner{animation:none}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mdc-linear-progress-track-height) * -2.5))}}.mdc-linear-progress__bar-inner{border-color:var(--mdc-linear-progress-active-indicator-color)}.mdc-linear-progress__buffer-dots{background-color:var(--mdc-linear-progress-track-color)}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.mdc-linear-progress__buffer-dots{background-color:rgba(0,0,0,0);background-image:url(\"data:image/svg+xml,%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' enable-background='new 0 0 5 2' xml:space='preserve' viewBox='0 0 5 2' preserveAspectRatio='none slice'%3E%3Ccircle cx='1' cy='1' r='1' fill='rgba(244, 67, 54, 0.25)'/%3E%3C/svg%3E\")}}.mdc-linear-progress__buffer-bar{background-color:var(--mdc-linear-progress-track-color)}.mdc-linear-progress{height:max(var(--mdc-linear-progress-track-height), var(--mdc-linear-progress-active-indicator-height))}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.mdc-linear-progress{height:4px}}.mdc-linear-progress__bar{height:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress__bar-inner{border-top-width:var(--mdc-linear-progress-active-indicator-height)}.mdc-linear-progress__buffer{height:var(--mdc-linear-progress-track-height)}@media all and (-ms-high-contrast: none),(-ms-high-contrast: active){.mdc-linear-progress__buffer-dots{background-size:10px var(--mdc-linear-progress-track-height)}}.mdc-linear-progress__buffer{border-radius:var(--mdc-linear-progress-track-shape)}.mat-mdc-progress-bar{display:block;text-align:start;--mdc-linear-progress-primary-half: 83.67142%;--mdc-linear-progress-primary-full: 200.611057%;--mdc-linear-progress-secondary-quarter: 37.651913%;--mdc-linear-progress-secondary-half: 84.386165%;--mdc-linear-progress-secondary-full: 160.277782%;--mdc-linear-progress-primary-half-neg: -83.67142%;--mdc-linear-progress-primary-full-neg: -200.611057%;--mdc-linear-progress-secondary-quarter-neg: -37.651913%;--mdc-linear-progress-secondary-half-neg: -84.386165%;--mdc-linear-progress-secondary-full-neg: -160.277782%}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}"]
    }]
  }], () => [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE]
    }]
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [MAT_PROGRESS_BAR_DEFAULT_OPTIONS]
    }]
  }], {
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    value: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute
      }]
    }],
    bufferValue: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute
      }]
    }],
    animationEnd: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    mode: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/** Clamps a value to be between two numbers, by default 0 and 100. */
function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
class MatProgressBarModule {
  static {
    this.ɵfac = function MatProgressBarModule_Factory(t) {
      return new (t || MatProgressBarModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: MatProgressBarModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatProgressBarModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [MatProgressBar],
      exports: [MatProgressBar, _angular_material_core__WEBPACK_IMPORTED_MODULE_2__.MatCommonModule]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_features_admin_pages_system-monitoring_system-monitoring_component_ts.js.map