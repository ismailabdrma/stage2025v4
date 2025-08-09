"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_orders_components_order-list_order-list_component_ts"],{

/***/ 2356:
/*!*******************************************************************************!*\
  !*** ./src/app/features/orders/components/order-list/order-list.component.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderListComponent: () => (/* binding */ OrderListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/paginator */ 4624);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _core_services_order_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/order.service */ 8544);






















const _c0 = a0 => ["/orders", a0];
function OrderListComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Loading orders...");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
function OrderListComponent_div_7_th_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Order ID ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrderListComponent_div_7_td_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" #", order_r1.id, " ");
  }
}
function OrderListComponent_div_7_th_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Date ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrderListComponent_div_7_td_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, order_r2.orderDate, "medium"), " ");
  }
}
function OrderListComponent_div_7_th_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Status ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrderListComponent_div_7_td_10_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", order_r3.status, " ");
  }
}
function OrderListComponent_div_7_th_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Total ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrderListComponent_div_7_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "number");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const order_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" $", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](2, 1, order_r4.total, "1.2-2"), " ");
  }
}
function OrderListComponent_div_7_th_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Actions ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
function OrderListComponent_div_7_td_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 16)(1, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "View Details");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const order_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpureFunction1"](1, _c0, order_r5.id));
  }
}
function OrderListComponent_div_7_tr_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 18);
  }
}
function OrderListComponent_div_7_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 19);
  }
}
function OrderListComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div")(1, "table", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](2, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, OrderListComponent_div_7_th_3_Template, 2, 0, "th", 7)(4, OrderListComponent_div_7_td_4_Template, 2, 1, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](5, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, OrderListComponent_div_7_th_6_Template, 2, 0, "th", 7)(7, OrderListComponent_div_7_td_7_Template, 3, 4, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](8, 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, OrderListComponent_div_7_th_9_Template, 2, 0, "th", 7)(10, OrderListComponent_div_7_td_10_Template, 2, 1, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](11, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, OrderListComponent_div_7_th_12_Template, 2, 0, "th", 7)(13, OrderListComponent_div_7_td_13_Template, 3, 4, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](14, 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, OrderListComponent_div_7_th_15_Template, 2, 0, "th", 7)(16, OrderListComponent_div_7_td_16_Template, 3, 3, "td", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, OrderListComponent_div_7_tr_17_Template, 1, 0, "tr", 13)(18, OrderListComponent_div_7_tr_18_Template, 1, 0, "tr", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dataSource", ctx_r5.orders);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matHeaderRowDef", ctx_r5.displayedColumns);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRowDefColumns", ctx_r5.displayedColumns);
  }
}
function OrderListComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 20)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "No orders found.");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
  }
}
class OrderListComponent {
  constructor() {
    this.orderService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_core_services_order_service__WEBPACK_IMPORTED_MODULE_0__.OrderService);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBar);
    this.orders = [];
    this.loading = true;
    this.displayedColumns = ["id", "date", "total", "status", "actions"];
  }
  ngOnInit() {
    this.loadOrders();
  }
  loadOrders() {
    this.loading = true;
    this.orderService.getOrders().subscribe({
      next: orders => {
        this.orders = orders;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open("Failed to load orders", "Close", {
          duration: 3000
        });
        this.orders = [];
        this.loading = false;
      }
    });
  }
  static {
    this.ɵfac = function OrderListComponent_Factory(t) {
      return new (t || OrderListComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: OrderListComponent,
      selectors: [["app-order-list"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 9,
      vars: 3,
      consts: [[1, "order-list-container"], ["class", "loading-container", 4, "ngIf"], [4, "ngIf"], ["class", "no-orders", 4, "ngIf"], [1, "loading-container"], ["mat-table", "", 1, "orders-table", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "date"], ["matColumnDef", "status"], ["matColumnDef", "total"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], ["mat-button", "", 3, "routerLink"], ["mat-header-row", ""], ["mat-row", ""], [1, "no-orders"]],
      template: function OrderListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "My Orders");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-card-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, OrderListComponent_div_6_Template, 4, 0, "div", 1)(7, OrderListComponent_div_7_Template, 19, 3, "div", 2)(8, OrderListComponent_div_8_Template, 3, 0, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.orders.length > 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.orders.length === 0);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_3__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_3__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DecimalPipe, _angular_common__WEBPACK_IMPORTED_MODULE_3__.DatePipe, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatTableModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_5__.MatRow, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_6__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_7__.MatSortModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_8__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_9__.MatInputModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_11__.MatIconModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinner, _angular_material_chips__WEBPACK_IMPORTED_MODULE_13__.MatChipsModule, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBarModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_14__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_14__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_14__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_14__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_14__.MatCardTitle],
      styles: ["\n\n\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n  text-align: center;\n}\n\n.loading-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n\n.no-items[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n\n.no-items[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n\n.orders-table[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 20px;\n}\n\n.orders-table[_ngcontent-%COMP%]   th.mat-header-cell[_ngcontent-%COMP%] {\n  font-weight: bold;\n  color: rgba(0, 0, 0, 0.87);\n}\n\n.orders-table[_ngcontent-%COMP%]   mat-cell[_ngcontent-%COMP%] {\n  padding: 8px 16px;\n}\n\n@media (max-width: 768px) {\n  .order-list-container[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n  .orders-table[_ngcontent-%COMP%] {\n    \n\n    \n\n    \n\n    \n\n    \n\n  }\n  .orders-table[_ngcontent-%COMP%]   .mat-header-cell[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .orders-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%] {\n    display: block;\n    border-bottom: none;\n    padding: 8px 0; \n\n  }\n  .orders-table[_ngcontent-%COMP%]   .mat-cell[_ngcontent-%COMP%]::before {\n    content: attr(data-label); \n\n    font-weight: bold;\n    display: inline-block;\n    margin-right: 8px;\n  }\n  .orders-table[_ngcontent-%COMP%]   .mat-column-actions[_ngcontent-%COMP%] {\n    text-align: center; \n\n    padding: 16px 0; \n\n  }\n  .orders-table[_ngcontent-%COMP%]   .mat-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    padding: 16px;\n    border-bottom: 1px solid #ddd;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvb3JkZXJzL2NvbXBvbmVudHMvb3JkZXItbGlzdC9vcmRlci1saXN0LmNvbXBvbmVudC5zY3NzIiwid2VicGFjazovLy4vc3JjL2FwcC9zaGFyZWQvc3R5bGVzL3V0aWxpdGllcy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFBO0FDQUEsMEJBQUE7QUFFQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLG1CQUFBO0VBQ0EsYUFBQTtFQUNBLGtCQUFBO0FEQ0Y7O0FDRUE7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBRENGOztBQ0VBO0VBQ0Usa0JBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtBRENGOztBQ0VBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QURDRjs7QUF0QkE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7QUF5QkY7O0FBdEJBO0VBQ0ksaUJBQUE7RUFDQSwwQkFBQTtBQXlCSjs7QUF0QkE7RUFDSSxpQkFBQTtBQXlCSjs7QUF0QkE7RUFDSTtJQUNJLGFBQUE7RUF5Qk47RUF0QkU7SUFDSSxvQ0FBQTtJQUtBLDRCQUFBO0lBT0EsbUNBQUE7SUFRQyx5QkFBQTtJQU1BLDZCQUFBO0VBRVA7RUEzQk07SUFDSSxhQUFBO0VBNkJWO0VBekJNO0lBQ0ksY0FBQTtJQUNBLG1CQUFBO0lBQ0EsY0FBQSxFQUFBLG1CQUFBO0VBMkJWO0VBdkJNO0lBQ0kseUJBQUEsRUFBQSx1Q0FBQTtJQUNBLGlCQUFBO0lBQ0EscUJBQUE7SUFDQSxpQkFBQTtFQXlCVjtFQXJCTztJQUNHLGtCQUFBLEVBQUEsbUJBQUE7SUFDQSxlQUFBLEVBQUEsb0NBQUE7RUF1QlY7RUFuQk87SUFDSSxzQkFBQTtJQUNBLHVCQUFBO0lBQ0EsYUFBQTtJQUNBLDZCQUFBO0VBcUJYO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBPcmRlciBMaXN0IFN0eWxlcyAqL1xyXG5AaW1wb3J0ICcuLi8uLi8uLi8uLi9zaGFyZWQvc3R5bGVzL3V0aWxpdGllcy5zY3NzJztcclxuXHJcbi5vcmRlci1saXN0LWNvbnRhaW5lciB7XHJcbn1cclxuXHJcbi5vcmRlcnMtdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1hcmdpbi10b3A6IDIwcHg7XHJcbn1cclxuXHJcbi5vcmRlcnMtdGFibGUgdGgubWF0LWhlYWRlci1jZWxsIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44Nyk7XHJcbn1cclxuXHJcbi5vcmRlcnMtdGFibGUgbWF0LWNlbGwge1xyXG4gICAgcGFkZGluZzogOHB4IDE2cHg7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgLm9yZGVyLWxpc3QtY29udGFpbmVyIHtcclxuICAgICAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgfVxyXG5cclxuICAgIC5vcmRlcnMtdGFibGUge1xyXG4gICAgICAgIC8qIEhpZGUgaGVhZGVycyBvbiBzbWFsbGVyIHNjcmVlbnMgKi9cclxuICAgICAgICAubWF0LWhlYWRlci1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8qIERpc3BsYXkgY2VsbHMgYXMgYmxvY2tzICovXHJcbiAgICAgICAgLm1hdC1jZWxsIHtcclxuICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7XHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDhweCAwOyAvKiBBZGp1c3QgcGFkZGluZyAqL1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyogQWRkIGxhYmVscyBiZWZvcmUgY2VsbCBjb250ZW50ICovXHJcbiAgICAgICAgLm1hdC1jZWxsOjpiZWZvcmUge1xyXG4gICAgICAgICAgICBjb250ZW50OiBhdHRyKGRhdGEtbGFiZWwpOyAvKiBVc2UgYSBkYXRhLWxhYmVsIGF0dHJpYnV0ZSBpbiBIVE1MICovXHJcbiAgICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XHJcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogOHB4O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgIC8qIFN0eWxlIGFjdGlvbnMgY29sdW1uICovXHJcbiAgICAgICAgIC5tYXQtY29sdW1uLWFjdGlvbnMge1xyXG4gICAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IC8qIENlbnRlciBhY3Rpb25zICovXHJcbiAgICAgICAgICAgIHBhZGRpbmc6IDE2cHggMDsgLyogQWRkIHBhZGRpbmcgYWJvdmUvYmVsb3cgYWN0aW9ucyAqL1xyXG4gICAgICAgICB9XHJcblxyXG4gICAgICAgICAvKiBBZGQgYm9yZGVycyBiZXR3ZWVuIHJvd3MgKi9cclxuICAgICAgICAgLm1hdC1yb3cge1xyXG4gICAgICAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgICAgICAgICAgcGFkZGluZzogMTZweDtcclxuICAgICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZGRkO1xyXG4gICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCIvKiBTaGFyZWQgVXRpbGl0eSBTdHlsZXMgKi9cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogNDBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciBtYXQtaWNvbiB7XHJcbiAgZm9udC1zaXplOiA0OHB4O1xyXG4gIGhlaWdodDogNDhweDtcclxuICB3aWR0aDogNDhweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4ubm8taXRlbXMge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwYWRkaW5nOiA0MHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ubm8taXRlbXMgbWF0LWljb24ge1xyXG4gIGZvbnQtc2l6ZTogNDhweDtcclxuICBoZWlnaHQ6IDQ4cHg7XHJcbiAgd2lkdGg6IDQ4cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_orders_components_order-list_order-list_component_ts.js.map