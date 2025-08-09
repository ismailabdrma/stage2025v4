"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_admin_components_admin-suppliers_admin-suppliers_component_ts"],{

/***/ 1071:
/*!****************************************************************************************!*\
  !*** ./src/app/features/admin/components/admin-suppliers/admin-suppliers.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminSuppliersComponent: () => (/* binding */ AdminSuppliersComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _core_services_supplier_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/supplier.service */ 7784);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _create_supplier_dialog_supplier_dialog_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./create-supplier-dialog/supplier-dialog.component */ 3174);

















function AdminSuppliersComponent_th_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "ID");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AdminSuppliersComponent_td_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const supplier_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](supplier_r1.id);
  }
}
function AdminSuppliersComponent_th_15_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Name");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AdminSuppliersComponent_td_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const supplier_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](supplier_r2.name);
  }
}
function AdminSuppliersComponent_th_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Type");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AdminSuppliersComponent_td_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const supplier_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](supplier_r3.type);
  }
}
function AdminSuppliersComponent_th_21_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Status");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AdminSuppliersComponent_td_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 14)(1, "mat-chip", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const supplier_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", supplier_r4.active ? "primary" : "warn");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", supplier_r4.active ? "Active" : "Inactive", " ");
  }
}
function AdminSuppliersComponent_th_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "th", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Actions");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function AdminSuppliersComponent_td_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "td", 14)(1, "button", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminSuppliersComponent_td_25_Template_button_click_1_listener() {
      const supplier_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r6.openEditSupplierDialog(supplier_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "edit");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminSuppliersComponent_td_25_Template_button_click_4_listener() {
      const supplier_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r6.toggleActive(supplier_r6));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminSuppliersComponent_td_25_Template_button_click_7_listener() {
      const supplier_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r6.deleteSupplier(supplier_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "delete");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminSuppliersComponent_td_25_Template_button_click_10_listener() {
      const supplier_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5).$implicit;
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r6.importProducts(supplier_r6.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "cloud_upload");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const supplier_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](supplier_r6.active ? "block" : "check_circle");
  }
}
function AdminSuppliersComponent_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 20);
  }
}
function AdminSuppliersComponent_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "tr", 21);
  }
}
class AdminSuppliersComponent {
  constructor() {
    this.supplierService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_core_services_supplier_service__WEBPACK_IMPORTED_MODULE_0__.SupplierService);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBar);
    this.dialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialog);
    this.suppliers = [];
    this.displayedColumns = ["id", "name", "type", "active", "actions"];
    this.loading = false;
  }
  ngOnInit() {
    this.loadSuppliers();
  }
  loadSuppliers() {
    this.loading = true;
    this.supplierService.getAllSuppliers().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
        this.loading = false;
      },
      error: () => {
        this.suppliers = [];
        this.snackBar.open('Failed to load suppliers.', 'Close', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }
  openCreateSupplierDialog() {
    const dialogRef = this.dialog.open(_create_supplier_dialog_supplier_dialog_component__WEBPACK_IMPORTED_MODULE_1__.CreateSupplierDialogComponent, {
      width: "500px",
      data: null
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadSuppliers();
    });
  }
  openEditSupplierDialog(supplier) {
    const dialogRef = this.dialog.open(_create_supplier_dialog_supplier_dialog_component__WEBPACK_IMPORTED_MODULE_1__.CreateSupplierDialogComponent, {
      width: "500px",
      data: supplier
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadSuppliers();
    });
  }
  toggleActive(supplier) {
    const operation = supplier.active ? this.supplierService.deactivateSupplier(supplier.id) : this.supplierService.activateSupplier(supplier.id);
    const successMessage = supplier.active ? 'Supplier deactivated successfully.' : 'Supplier activated successfully.';
    operation.subscribe({
      next: () => {
        this.snackBar.open(successMessage, 'Close', {
          duration: 3000
        });
        this.loadSuppliers();
      },
      error: err => {
        console.error('Failed to toggle supplier status', err);
        this.snackBar.open('Failed to update supplier status.', 'Close', {
          duration: 3000
        });
      }
    });
  }
  deleteSupplier(id) {
    if (confirm("Are you sure you want to delete this supplier?")) {
      this.supplierService.deleteSupplier(id).subscribe({
        next: () => {
          this.snackBar.open('Supplier deleted successfully.', 'Close', {
            duration: 3000
          });
          this.loadSuppliers();
        },
        error: err => {
          console.error('Failed to delete supplier', err);
          this.snackBar.open('Failed to delete supplier.', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
  importProducts(supplierId) {
    this.supplierService.importProducts(supplierId).subscribe({
      next: () => {
        this.snackBar.open('Product import initiated successfully.', 'Close', {
          duration: 3000
        });
      },
      error: err => {
        console.error('Failed to initiate product import', err);
        this.snackBar.open('Failed to initiate product import.', 'Close', {
          duration: 3000
        });
      }
    });
  }
  static {
    this.ɵfac = function AdminSuppliersComponent_Factory(t) {
      return new (t || AdminSuppliersComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: AdminSuppliersComponent,
      selectors: [["app-admin-suppliers"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 28,
      vars: 3,
      consts: [[1, "admin-suppliers-container"], [1, "header"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-table", "", 1, "suppliers-table", 3, "dataSource"], ["matColumnDef", "id"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "name"], ["matColumnDef", "type"], ["matColumnDef", "active"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-header-cell", ""], ["mat-cell", ""], [3, "color"], ["mat-icon-button", "", 3, "click"], ["mat-icon-button", "", "color", "accent", 3, "click"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]],
      template: function AdminSuppliersComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Manage Suppliers");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function AdminSuppliersComponent_Template_button_click_4_listener() {
            return ctx.openCreateSupplierDialog();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "add");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, " Add Supplier ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-card")(9, "mat-card-content")(10, "table", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](11, 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](12, AdminSuppliersComponent_th_12_Template, 2, 0, "th", 5)(13, AdminSuppliersComponent_td_13_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](14, 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, AdminSuppliersComponent_th_15_Template, 2, 0, "th", 5)(16, AdminSuppliersComponent_td_16_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](17, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, AdminSuppliersComponent_th_18_Template, 2, 0, "th", 5)(19, AdminSuppliersComponent_td_19_Template, 2, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](20, 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](21, AdminSuppliersComponent_th_21_Template, 2, 0, "th", 5)(22, AdminSuppliersComponent_td_22_Template, 3, 2, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](23, 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](24, AdminSuppliersComponent_th_24_Template, 2, 0, "th", 5)(25, AdminSuppliersComponent_td_25_Template, 13, 1, "td", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](26, AdminSuppliersComponent_tr_26_Template, 1, 0, "tr", 11)(27, AdminSuppliersComponent_tr_27_Template, 1, 0, "tr", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.suppliers);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_6__.MatCardContent, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_7__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__.MatIcon, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatTableModule, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatTable, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatHeaderCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatHeaderRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatColumnDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatCellDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatRowDef, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatHeaderCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatCell, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatHeaderRow, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatRow, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__.MatChipsModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_10__.MatChip, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_3__.MatSnackBarModule],
      styles: ["\n\n.admin-suppliers-container[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.supplier-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  margin-top: 20px;\n}\n.table-container[_ngcontent-%COMP%]   mat-card[_ngcontent-%COMP%] {\n  padding: 0;\n}\n\n.full-width-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.action-column[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\n.action-column[_ngcontent-%COMP%]   .mat-icon-button[_ngcontent-%COMP%] {\n  padding: 0 8px;\n}\n\n.header-controls[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 20px;\n}\n\nmat-card-title[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.mat-chip[_ngcontent-%COMP%] {\n  margin: 0 2px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vY29tcG9uZW50cy9hZG1pbi1zdXBwbGllcnMvYWRtaW4tc3VwcGxpZXJzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFBO0FBQ0E7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0FBQ0Y7O0FBRUE7RUFDRSxnQkFBQTtFQUNBLGdCQUFBO0FBQ0Y7QUFBRTtFQUNFLFVBQUE7QUFFSjs7QUFFQTtFQUNFLFdBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7QUFBRTtFQUNFLGNBQUE7QUFFSjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFLG1CQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBhZG1pbi1zdXBwbGllcnMuY29tcG9uZW50LnNjc3MgKi9cclxuLmFkbWluLXN1cHBsaWVycy1jb250YWluZXIge1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbn1cclxuXHJcbi5zdXBwbGllci10YWJsZSB7XHJcbiAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi50YWJsZS1jb250YWluZXIge1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxuICBtYXQtY2FyZCB7XHJcbiAgICBwYWRkaW5nOiAwO1xyXG4gIH1cclxufVxyXG5cclxuLmZ1bGwtd2lkdGgtdGFibGUge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uYWN0aW9uLWNvbHVtbiB7XHJcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcclxuICAubWF0LWljb24tYnV0dG9uIHtcclxuICAgIHBhZGRpbmc6IDAgOHB4O1xyXG4gIH1cclxufVxyXG5cclxuLmhlYWRlci1jb250cm9scyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xyXG59XHJcblxyXG5tYXQtY2FyZC10aXRsZSB7XHJcbiAgbWFyZ2luLWJvdHRvbTogMjBweDtcclxufVxyXG5cclxuLm1hdC1jaGlwIHtcclxuICBtYXJnaW46IDAgMnB4O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 3174:
/*!***************************************************************************************************************!*\
  !*** ./src/app/features/admin/components/admin-suppliers/create-supplier-dialog/supplier-dialog.component.ts ***!
  \***************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CreateSupplierDialogComponent: () => (/* binding */ CreateSupplierDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _core_services_supplier_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/supplier.service */ 7784);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/core */ 4646);






















function CreateSupplierDialogComponent_ng_container_24_mat_option_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "mat-option", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const op_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", op_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", op_r3, " ");
  }
}
function CreateSupplierDialogComponent_ng_container_24_mat_progress_spinner_12_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-progress-spinner", 19);
  }
}
function CreateSupplierDialogComponent_ng_container_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field", 2)(2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "WSDL URL");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "input", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("blur", function CreateSupplierDialogComponent_ng_container_24_Template_input_blur_4_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresetView"](ctx_r1.loadSoapOperations());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-hint");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Enter WSDL, then select operation below");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-form-field", 2)(8, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "SOAP Operation");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "mat-select", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, CreateSupplierDialogComponent_ng_container_24_mat_option_11_Template, 2, 2, "mat-option", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, CreateSupplierDialogComponent_ng_container_24_mat_progress_spinner_12_Template, 1, 0, "mat-progress-spinner", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx_r1.soapOperations.length === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1.soapOperations);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1.loadingOps);
  }
}
class CreateSupplierDialogComponent {
  constructor(data) {
    this.data = data;
    this.loadingOps = false;
    this.soapOperations = [];
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder);
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef);
    this.supplierService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_core_services_supplier_service__WEBPACK_IMPORTED_MODULE_0__.SupplierService);
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar);
    this.supplierForm = this.fb.group({
      name: [data?.name || '', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      type: [data?.type || 'API', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      url: [data?.url || '', _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      wsdlUrl: [data?.wsdlUrl || '', data?.type === 'SOAP' ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required : []],
      operation: [data?.operation || '', data?.type === 'SOAP' ? _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required : []]
    });
  }
  onTypeChange() {
    // Clear SOAP-specific fields if not SOAP
    if (this.supplierForm.get('type')?.value !== 'SOAP') {
      this.supplierForm.patchValue({
        wsdlUrl: '',
        operation: ''
      });
      this.soapOperations = [];
    }
  }
  loadSoapOperations() {
    const wsdlUrl = this.supplierForm.get('wsdlUrl')?.value;
    if (!wsdlUrl) return;
    this.loadingOps = true;
    // Fetch the WSDL and parse for operation names
    this.http.get(wsdlUrl, {
      responseType: 'text'
    }).subscribe({
      next: wsdl => {
        // Extract <wsdl:operation name="...">
        const matches = Array.from(wsdl.matchAll(/<wsdl:operation[^>]*name="([^"]+)"/g));
        this.soapOperations = matches.map(m => m[1]);
        this.loadingOps = false;
      },
      error: () => {
        this.soapOperations = [];
        this.loadingOps = false;
      }
    });
  }
  onSave() {
    if (this.supplierForm.invalid) return;
    const supplier = this.supplierForm.value;
    if (this.data) {
      this.supplierService.updateSupplier(this.data.id, supplier).subscribe(() => {
        this.snackBar.open('Supplier updated successfully!', 'Close', {
          duration: 3000
        });
        this.dialogRef.close(true);
      }, error => {
        console.error('Error updating supplier:', error);
        this.snackBar.open('Failed to update supplier.', 'Close', {
          duration: 3000
        });
      });
    } else {
      this.supplierService.createSupplier(supplier).subscribe(() => {
        this.snackBar.open('Supplier created successfully!', 'Close', {
          duration: 3000
        });
        this.dialogRef.close(true);
      }, error => {
        console.error('Error creating supplier:', error);
        this.snackBar.open('Failed to create supplier.', 'Close', {
          duration: 3000
        });
      });
    }
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  static {
    this.ɵfac = function CreateSupplierDialogComponent_Factory(t) {
      return new (t || CreateSupplierDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MAT_DIALOG_DATA));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: CreateSupplierDialogComponent,
      selectors: [["app-create-supplier-dialog"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 30,
      vars: 5,
      consts: [["mat-dialog-title", ""], [3, "formGroup"], [1, "full-width"], ["matInput", "", "formControlName", "name", "required", ""], ["formControlName", "type", "required", "", 3, "selectionChange"], ["value", "API"], ["value", "CSV"], ["value", "EXCEL"], ["value", "SOAP"], ["matInput", "", "formControlName", "url", "required", "", "placeholder", "API endpoint or file path"], [4, "ngIf"], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["matInput", "", "formControlName", "wsdlUrl", "required", "", 3, "blur"], ["formControlName", "operation", "required", "", 3, "disabled"], [3, "value", 4, "ngFor", "ngForOf"], ["diameter", "24", "mode", "indeterminate", 4, "ngIf"], [3, "value"], ["diameter", "24", "mode", "indeterminate"]],
      template: function CreateSupplierDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-dialog-content")(3, "form", 1)(4, "mat-form-field", 2)(5, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Name");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-form-field", 2)(9, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Type");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-select", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("selectionChange", function CreateSupplierDialogComponent_Template_mat_select_selectionChange_11_listener() {
            return ctx.onTypeChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "mat-option", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "API");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "mat-option", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "CSV");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](16, "mat-option", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](17, "Excel");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](18, "mat-option", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "SOAP");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](20, "mat-form-field", 2)(21, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Endpoint / File URL");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](23, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](24, CreateSupplierDialogComponent_ng_container_24_Template, 13, 3, "ng-container", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "mat-dialog-actions", 11)(26, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CreateSupplierDialogComponent_Template_button_click_26_listener() {
            return ctx.onCancel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function CreateSupplierDialogComponent_Template_button_click_28_listener() {
            return ctx.onSave();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          let tmp_2_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx.data ? "Edit Supplier" : "Add Supplier");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.supplierForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](21);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ((tmp_2_0 = ctx.supplierForm.get("type")) == null ? null : tmp_2_0.value) === "SOAP");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.supplierForm.invalid || ctx.loadingOps);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", ctx.data ? "Update" : "Create", " ");
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__.MatHint, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_8__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_9__.MatSelectModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_9__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_10__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinner, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClientModule],
      styles: [".full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 16px;\n}\n\nmat-progress-spinner[_ngcontent-%COMP%] {\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 12px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vY29tcG9uZW50cy9hZG1pbi1zdXBwbGllcnMvY3JlYXRlLXN1cHBsaWVyLWRpYWxvZy9zdXBwbGllci1kaWFsb2cuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNNO0VBQWMsV0FBQTtFQUFhLG1CQUFBO0FBRWpDOztBQURNO0VBQXVCLHFCQUFBO0VBQXVCLHNCQUFBO0VBQXdCLGlCQUFBO0FBTzVFIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgICAuZnVsbC13aWR0aCB7IHdpZHRoOiAxMDAlOyBtYXJnaW4tYm90dG9tOiAxNnB4OyB9XG4gICAgICBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lciB7IGRpc3BsYXk6IGlubGluZS1ibG9jazsgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgbWFyZ2luLWxlZnQ6IDEycHg7IH1cbiAgICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_admin_components_admin-suppliers_admin-suppliers_component_ts.js.map