"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_products_components_product-list_product-list_component_ts"],{

/***/ 1682:
/*!*************************************************************************************!*\
  !*** ./src/app/features/products/components/product-list/product-list.component.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductListComponent: () => (/* binding */ ProductListComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/chips */ 2772);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _core_services_product_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/product.service */ 7359);
/* harmony import */ var _core_services_cart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/cart.service */ 3661);
/* harmony import */ var _core_services_supplier_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @core/services/supplier.service */ 7784);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/animations */ 7172);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/core */ 4646);






























const _c0 = () => [0, 1, 2, 3, 4, 5, 6, 7];
const _c1 = a0 => [a0, "EUR", "symbol", "1.2-2", "fr-FR"];
const _c2 = a0 => ["/products", a0];
function ProductListComponent_button_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProductListComponent_button_17_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.clearFilter("search"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function ProductListComponent_mat_option_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const category_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", category_r3.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](category_r3.name);
  }
}
function ProductListComponent_mat_option_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sup_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", sup_r4.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](sup_r4.name);
  }
}
function ProductListComponent_button_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "button", 63);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProductListComponent_button_64_Template_button_click_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r5);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.clearFilter("search"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "close");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function ProductListComponent_mat_option_71_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const category_r6 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", category_r6.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](category_r6.name);
  }
}
function ProductListComponent_mat_option_78_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-option", 64);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const sup_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", sup_r7.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](sup_r7.name);
  }
}
function ProductListComponent_div_99_mat_chip_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("removed", function ProductListComponent_div_99_mat_chip_2_Template_mat_chip_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r8);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.clearFilter("search"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](2, 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 69)(5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](": ", ctx_r1.searchTerm, " ");
  }
}
function ProductListComponent_div_99_mat_chip_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("removed", function ProductListComponent_div_99_mat_chip_3_Template_mat_chip_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r9);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.clearFilter("category"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](2, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 70)(5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](": ", ctx_r1.selectedCategory, " ");
  }
}
function ProductListComponent_div_99_mat_chip_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("removed", function ProductListComponent_div_99_mat_chip_4_Template_mat_chip_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.clearFilter("supplier"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](2, 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 71)(5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](": ", ctx_r1.selectedSupplier, " ");
  }
}
function ProductListComponent_div_99_mat_chip_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("removed", function ProductListComponent_div_99_mat_chip_5_Template_mat_chip_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r11);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.clearFilter("minPrice"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](2, 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 72)(5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](": ", ctx_r1.minPrice, " ");
  }
}
function ProductListComponent_div_99_mat_chip_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-chip", 68);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("removed", function ProductListComponent_div_99_mat_chip_6_Template_mat_chip_removed_0_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r12);
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.clearFilter("maxPrice"));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](2, 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 73)(5, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "cancel");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](": ", ctx_r1.maxPrice, " ");
  }
}
function ProductListComponent_div_99_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 65)(1, "mat-chip-set", 66);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](2, ProductListComponent_div_99_mat_chip_2_Template, 7, 1, "mat-chip", 67)(3, ProductListComponent_div_99_mat_chip_3_Template, 7, 1, "mat-chip", 67)(4, ProductListComponent_div_99_mat_chip_4_Template, 7, 1, "mat-chip", 67)(5, ProductListComponent_div_99_mat_chip_5_Template, 7, 1, "mat-chip", 67)(6, ProductListComponent_div_99_mat_chip_6_Template, 7, 1, "mat-chip", 67);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.searchTerm);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.selectedCategory);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.selectedSupplier);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.minPrice != null);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx_r1.maxPrice != null);
  }
}
function ProductListComponent_div_100_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "div", 76);
  }
}
function ProductListComponent_div_100_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 74);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ProductListComponent_div_100_div_1_Template, 1, 0, "div", 75);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](1, _c0));
  }
}
function ProductListComponent_div_101_mat_card_1_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 95)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "En stock");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function ProductListComponent_div_101_mat_card_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 96)(1, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Rupture");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
}
function ProductListComponent_div_101_mat_card_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-card", 79)(1, "div", 80);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](2, "img", 81);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](3, ProductListComponent_div_101_mat_card_1_div_3_Template, 3, 0, "div", 82)(4, ProductListComponent_div_101_mat_card_1_div_4_Template, 3, 0, "div", 83);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-card-content", 84)(6, "div", 85);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "h3", 86);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "p", 87);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](12, "slice");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 88)(14, "div", 89)(15, "span", 90);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipe"](17, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "span", 91);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](20, "div", 92)(21, "button", 93)(22, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](23, "visibility");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](24, "button", 94);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProductListComponent_div_101_mat_card_1_Template_button_click_24_listener() {
      const product_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r13).$implicit;
      const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r1.addToCart(product_r14));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](26, "shopping_cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](27, " Ajouter ");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()()();
  }
  if (rf & 2) {
    const product_r14 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", product_r14.imageUrls[0] || "/placeholder.svg?height=240&width=320", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"])("alt", product_r14.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", product_r14.syncedStock !== undefined && product_r14.syncedStock > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", product_r14.syncedStock !== undefined && product_r14.syncedStock === 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r14.categoryName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r14.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"]("", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBind3"](12, 11, product_r14.description, 0, 100), "...");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpipeBindV"](17, 15, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](21, _c1, product_r14.displayedPrice)));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](product_r14.supplierName);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction1"](23, _c2, product_r14.id));
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("disabled", product_r14.syncedStock !== undefined && product_r14.syncedStock === 0);
  }
}
function ProductListComponent_div_101_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 77);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ProductListComponent_div_101_mat_card_1_Template, 28, 25, "mat-card", 78);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("@fadeIn", undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx_r1.filteredProducts);
  }
}
function ProductListComponent_div_102_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 97)(1, "mat-card", 98)(2, "mat-card-content")(3, "mat-icon", 99);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "error_outline");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Erreur de chargement");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](ctx_r1.error);
  }
}
function ProductListComponent_div_103_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 100)(1, "mat-card", 101)(2, "mat-card-content")(3, "mat-icon", 102);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4, "inventory");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "Aucun produit trouv\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Essayez de modifier vos crit\u00E8res de recherche ou de filtrage.");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
  }
}
class ProductListComponent {
  constructor() {
    this.productService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_services_product_service__WEBPACK_IMPORTED_MODULE_0__.ProductService);
    this.cartService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_services_cart_service__WEBPACK_IMPORTED_MODULE_1__.CartService);
    this.supplierService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_services_supplier_service__WEBPACK_IMPORTED_MODULE_2__.SupplierService);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__.MatSnackBar);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router);
    this.route = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute);
    this.products = [];
    this.categories = [];
    this.suppliers = [];
    this.filteredProducts = [];
    this.loading = true;
    this.error = null;
    this.loadingSuppliers = false;
    // Filters
    this.searchTerm = "";
    this.selectedCategory = "";
    this.selectedSupplier = "";
    this.minPrice = null;
    this.maxPrice = null;
    this.sortBy = "relevance";
  }
  ngOnInit() {
    // Read from query params to pre-populate filters
    const qp = this.route.snapshot.queryParamMap;
    this.searchTerm = qp.get("search") || this.searchTerm;
    this.selectedCategory = qp.get("category") || this.selectedCategory;
    this.selectedSupplier = qp.get("supplier") || this.selectedSupplier;
    const min = qp.get("minPrice");
    const max = qp.get("maxPrice");
    this.minPrice = min !== null ? Number(min) : this.minPrice;
    this.maxPrice = max !== null ? Number(max) : this.maxPrice;
    this.loadProducts();
    this.loadCategories();
    this.loadSuppliers();
  }
  updateUrl() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm || null,
        category: this.selectedCategory || null,
        supplier: this.selectedSupplier || null,
        minPrice: this.minPrice ?? null,
        maxPrice: this.maxPrice ?? null
      },
      queryParamsHandling: "merge"
    });
  }
  loadProducts() {
    this.loading = true;
    const params = {};
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.selectedSupplier) params.supplier = this.selectedSupplier;
    if (this.searchTerm) params.search = this.searchTerm;
    if (this.minPrice != null) params.minPrice = this.minPrice;
    if (this.maxPrice != null) params.maxPrice = this.maxPrice;
    this.productService.getAllProducts(params).subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.applyLocalSort(products);
        this.loading = false;
        this.error = null;
      },
      error: error => {
        console.error("Error loading products:", error);
        this.loading = false;
        this.error = "Failed to load products";
        this.snackBar.open("Failed to load products", "Close", {
          duration: 3000
        });
      }
    });
  }
  loadCategories() {
    this.productService.getAllCategories().subscribe({
      next: categories => this.categories = categories,
      error: () => void 0
    });
  }
  loadSuppliers() {
    this.loadingSuppliers = true;
    this.supplierService.getAllSuppliers().subscribe({
      next: suppliers => {
        this.suppliers = suppliers;
        this.loadingSuppliers = false;
      },
      error: () => {
        this.loadingSuppliers = false;
        this.snackBar.open("Failed to load suppliers for filtering.", "Close", {
          duration: 3000
        });
      }
    });
  }
  onSearch() {
    this.updateUrl();
    this.loadProducts();
  }
  onCategoryChange() {
    this.updateUrl();
    this.loadProducts();
  }
  onSupplierChange() {
    this.updateUrl();
    this.loadProducts();
  }
  onPriceChange() {
    this.updateUrl();
    this.loadProducts();
  }
  onSortChange() {
    this.filteredProducts = this.applyLocalSort(this.filteredProducts.slice());
  }
  clearFilter(kind) {
    if (kind === "search") this.searchTerm = "";
    if (kind === "category") this.selectedCategory = "";
    if (kind === "supplier") this.selectedSupplier = "";
    if (kind === "minPrice") this.minPrice = null;
    if (kind === "maxPrice") this.maxPrice = null;
    this.updateUrl();
    this.loadProducts();
  }
  applyLocalSort(list) {
    switch (this.sortBy) {
      case "priceAsc":
        return list.sort((a, b) => a.displayedPrice - b.displayedPrice);
      case "priceDesc":
        return list.sort((a, b) => b.displayedPrice - a.displayedPrice);
      case "newest":
        return list.slice().reverse();
      default:
        return list;
    }
  }
  addToCart(product) {
    this.cartService.addItemToCart({
      productId: product.id,
      productName: product.name,
      quantity: 1,
      unitPrice: product.displayedPrice
    }).subscribe({
      next: () => this.snackBar.open(`${product.name} added to cart!`, "Close", {
        duration: 3000
      }),
      error: () => this.snackBar.open("Error adding product to cart", "Close", {
        duration: 3000
      })
    });
  }
  static {
    this.ɵfac = function ProductListComponent_Factory(t) {
      return new (t || ProductListComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: ProductListComponent,
      selectors: [["app-product-list"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 104,
      vars: 23,
      consts: () => {
        let i18n_0;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_7743479397215344247$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_0 = goog.getMsg("Search products");
          i18n_0 = MSG_EXTERNAL_7743479397215344247$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_0;
        } else {
          i18n_0 = $localize`Search products`;
        }
        let i18n_1;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_1806667489382256324$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_1 = goog.getMsg("Category");
          i18n_1 = MSG_EXTERNAL_1806667489382256324$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_1;
        } else {
          i18n_1 = $localize`Category`;
        }
        let i18n_2;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_221922226324249098$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_2 = goog.getMsg("All Categories");
          i18n_2 = MSG_EXTERNAL_221922226324249098$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_2;
        } else {
          i18n_2 = $localize`All Categories`;
        }
        let i18n_3;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_4348920359154187664$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_3 = goog.getMsg("Supplier");
          i18n_3 = MSG_EXTERNAL_4348920359154187664$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_3;
        } else {
          i18n_3 = $localize`Supplier`;
        }
        let i18n_4;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_675292501633919642$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_4 = goog.getMsg("All Suppliers");
          i18n_4 = MSG_EXTERNAL_675292501633919642$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_4;
        } else {
          i18n_4 = $localize`All Suppliers`;
        }
        let i18n_5;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_5180929788417132963$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_5 = goog.getMsg("Min Price");
          i18n_5 = MSG_EXTERNAL_5180929788417132963$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_5;
        } else {
          i18n_5 = $localize`Min Price`;
        }
        let i18n_6;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_9034794484778404742$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_6 = goog.getMsg("Max Price");
          i18n_6 = MSG_EXTERNAL_9034794484778404742$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_6;
        } else {
          i18n_6 = $localize`Max Price`;
        }
        let i18n_7;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_345807521262019596$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_7 = goog.getMsg("Sort By");
          i18n_7 = MSG_EXTERNAL_345807521262019596$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_7;
        } else {
          i18n_7 = $localize`Sort By`;
        }
        let i18n_8;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_1787083504545967$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_8 = goog.getMsg("Relevance");
          i18n_8 = MSG_EXTERNAL_1787083504545967$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_8;
        } else {
          i18n_8 = $localize`Relevance`;
        }
        let i18n_9;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_5423991647761194551$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_9 = goog.getMsg("Newest");
          i18n_9 = MSG_EXTERNAL_5423991647761194551$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_9;
        } else {
          i18n_9 = $localize`Newest`;
        }
        let i18n_10;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_9055123807173455553$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_10 = goog.getMsg("Price: Low to High");
          i18n_10 = MSG_EXTERNAL_9055123807173455553$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_10;
        } else {
          i18n_10 = $localize`Price: Low to High`;
        }
        let i18n_11;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_8366555776855245700$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_11 = goog.getMsg("Price: High to Low");
          i18n_11 = MSG_EXTERNAL_8366555776855245700$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_11;
        } else {
          i18n_11 = $localize`Price: High to Low`;
        }
        let i18n_12;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_6707361102856436710$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_12 = goog.getMsg("Products");
          i18n_12 = MSG_EXTERNAL_6707361102856436710$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_12;
        } else {
          i18n_12 = $localize`Products`;
        }
        let i18n_13;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_7743479397215344247$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_13 = goog.getMsg("Search products");
          i18n_13 = MSG_EXTERNAL_7743479397215344247$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_13;
        } else {
          i18n_13 = $localize`Search products`;
        }
        let i18n_14;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_1806667489382256324$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_14 = goog.getMsg("Category");
          i18n_14 = MSG_EXTERNAL_1806667489382256324$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_14;
        } else {
          i18n_14 = $localize`Category`;
        }
        let i18n_15;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_221922226324249098$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_15 = goog.getMsg("All Categories");
          i18n_15 = MSG_EXTERNAL_221922226324249098$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_15;
        } else {
          i18n_15 = $localize`All Categories`;
        }
        let i18n_16;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_4348920359154187664$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_16 = goog.getMsg("Supplier");
          i18n_16 = MSG_EXTERNAL_4348920359154187664$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_16;
        } else {
          i18n_16 = $localize`Supplier`;
        }
        let i18n_17;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_675292501633919642$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_17 = goog.getMsg("All Suppliers");
          i18n_17 = MSG_EXTERNAL_675292501633919642$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_17;
        } else {
          i18n_17 = $localize`All Suppliers`;
        }
        let i18n_18;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_5180929788417132963$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_18 = goog.getMsg("Min Price");
          i18n_18 = MSG_EXTERNAL_5180929788417132963$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_18;
        } else {
          i18n_18 = $localize`Min Price`;
        }
        let i18n_19;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_9034794484778404742$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_19 = goog.getMsg("Max Price");
          i18n_19 = MSG_EXTERNAL_9034794484778404742$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_19;
        } else {
          i18n_19 = $localize`Max Price`;
        }
        let i18n_20;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_345807521262019596$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_20 = goog.getMsg("Sort By");
          i18n_20 = MSG_EXTERNAL_345807521262019596$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_20;
        } else {
          i18n_20 = $localize`Sort By`;
        }
        let i18n_21;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_1787083504545967$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_21 = goog.getMsg("Relevance");
          i18n_21 = MSG_EXTERNAL_1787083504545967$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_21;
        } else {
          i18n_21 = $localize`Relevance`;
        }
        let i18n_22;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_5423991647761194551$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_22 = goog.getMsg("Newest");
          i18n_22 = MSG_EXTERNAL_5423991647761194551$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_22;
        } else {
          i18n_22 = $localize`Newest`;
        }
        let i18n_23;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_9055123807173455553$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_23 = goog.getMsg("Price: Low to High");
          i18n_23 = MSG_EXTERNAL_9055123807173455553$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_23;
        } else {
          i18n_23 = $localize`Price: Low to High`;
        }
        let i18n_24;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_8366555776855245700$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_24 = goog.getMsg("Price: High to Low");
          i18n_24 = MSG_EXTERNAL_8366555776855245700$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_24;
        } else {
          i18n_24 = $localize`Price: High to Low`;
        }
        let i18n_25;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_4580988005648117665$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_25 = goog.getMsg("Search");
          i18n_25 = MSG_EXTERNAL_4580988005648117665$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_25;
        } else {
          i18n_25 = $localize`Search`;
        }
        let i18n_26;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_1806667489382256324$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_26 = goog.getMsg("Category");
          i18n_26 = MSG_EXTERNAL_1806667489382256324$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_26;
        } else {
          i18n_26 = $localize`Category`;
        }
        let i18n_27;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_4348920359154187664$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_27 = goog.getMsg("Supplier");
          i18n_27 = MSG_EXTERNAL_4348920359154187664$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_27;
        } else {
          i18n_27 = $localize`Supplier`;
        }
        let i18n_28;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_4912803901980915876$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_28 = goog.getMsg("Min");
          i18n_28 = MSG_EXTERNAL_4912803901980915876$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_28;
        } else {
          i18n_28 = $localize`Min`;
        }
        let i18n_29;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_3667949571823271511$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_29 = goog.getMsg("Max");
          i18n_29 = MSG_EXTERNAL_3667949571823271511$$SRC_APP_FEATURES_PRODUCTS_COMPONENTS_PRODUCT_LIST_PRODUCT_LIST_COMPONENT_TS_29;
        } else {
          i18n_29 = $localize`Max`;
        }
        return [i18n_0, i18n_1, i18n_2, i18n_3, i18n_4, i18n_5, i18n_6, i18n_7, i18n_8, i18n_9, i18n_10, i18n_11, i18n_12, i18n_13, i18n_14, i18n_15, i18n_16, i18n_17, i18n_18, i18n_19, i18n_20, i18n_21, i18n_22, i18n_23, i18n_24, i18n_25, i18n_26, i18n_27, i18n_28, i18n_29, [1, "product-list-container"], [1, "page-header"], [1, "subtitle"], [1, "layout"], [1, "filters-sidebar", "hide-mobile"], [1, "filters-card"], ["appearance", "outline"], ["matInput", "", "aria-label", "Search products", 3, "ngModelChange", "input", "ngModel"], ["mat-icon-button", "", "matSuffix", "", "aria-label", "Clear search", 3, "click", 4, "ngIf"], ["aria-label", "Filter by category", 3, "ngModelChange", "selectionChange", "ngModel"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["aria-label", "Filter by supplier", 3, "ngModelChange", "selectionChange", "ngModel"], [1, "price-group"], ["appearance", "outline", 1, "price-field"], ["matInput", "", "type", "number", "aria-label", "Minimum price", 3, "ngModelChange", "change", "ngModel"], ["matInput", "", "type", "number", "aria-label", "Maximum price", 3, "ngModelChange", "change", "ngModel"], ["appearance", "outline", 1, "sort-field"], ["aria-label", "Sort products", 3, "ngModelChange", "selectionChange", "ngModel"], ["value", "relevance"], ["value", "newest"], ["value", "priceAsc"], ["value", "priceDesc"], ["mat-stroked-button", "", 1, "reset-btn", 3, "click"], [1, "content"], [1, "header", "hide-desktop"], ["aria-level", "1", 1, "title"], ["role", "region", "aria-label", "Filters", 1, "filters"], ["class", "active-filters", 4, "ngIf"], ["class", "skeleton-grid", "aria-busy", "true", 4, "ngIf"], ["class", "products-grid", 4, "ngIf"], ["class", "error-state", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], ["mat-icon-button", "", "matSuffix", "", "aria-label", "Clear search", 3, "click"], [3, "value"], [1, "active-filters"], ["aria-label", "Active filters"], [3, "removed", 4, "ngIf"], [3, "removed"], ["matChipRemove", "", "aria-label", "Remove search filter"], ["matChipRemove", "", "aria-label", "Remove category filter"], ["matChipRemove", "", "aria-label", "Remove supplier filter"], ["matChipRemove", "", "aria-label", "Remove min price filter"], ["matChipRemove", "", "aria-label", "Remove max price filter"], ["aria-busy", "true", 1, "skeleton-grid"], ["class", "skeleton-card", 4, "ngFor", "ngForOf"], [1, "skeleton-card"], [1, "products-grid"], ["class", "product-card", 4, "ngFor", "ngForOf"], [1, "product-card"], [1, "product-image-container"], [1, "product-image", 3, "src", "alt"], ["class", "product-badge", 4, "ngIf"], ["class", "product-badge out-of-stock", 4, "ngIf"], [1, "product-info"], [1, "product-category"], [1, "product-title"], [1, "product-description"], [1, "product-footer"], [1, "product-price"], [1, "price"], [1, "supplier"], [1, "product-actions"], ["mat-icon-button", "", 1, "view-btn", 3, "routerLink"], ["mat-raised-button", "", "color", "primary", 1, "add-to-cart-btn", 3, "click", "disabled"], [1, "product-badge"], [1, "product-badge", "out-of-stock"], [1, "error-state"], [1, "error-card"], [1, "error-icon"], [1, "empty-state"], [1, "empty-card"], [1, "empty-icon"]];
      },
      template: function ProductListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 30)(1, "div", 31)(2, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Catalogue des Produits");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "D\u00E9couvrez notre s\u00E9lection de produits de qualit\u00E9");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "div", 33)(7, "aside", 34)(8, "mat-card", 35)(9, "mat-card-header")(10, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "Filtrer les produits");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "mat-card-content")(13, "mat-form-field", 36)(14, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](15, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](16, "input", 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_input_ngModelChange_16_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchTerm, $event) || (ctx.searchTerm = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function ProductListComponent_Template_input_input_16_listener() {
            return ctx.onSearch();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](17, ProductListComponent_button_17_Template, 3, 0, "button", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](18, "mat-form-field", 36)(19, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](20, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "mat-select", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_mat_select_ngModelChange_21_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.selectedCategory, $event) || (ctx.selectedCategory = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function ProductListComponent_Template_mat_select_selectionChange_21_listener() {
            return ctx.onCategoryChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](22, "mat-option", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](23, 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](24, ProductListComponent_mat_option_24_Template, 2, 2, "mat-option", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "mat-form-field", 36)(26, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](27, 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](28, "mat-select", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_mat_select_ngModelChange_28_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.selectedSupplier, $event) || (ctx.selectedSupplier = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function ProductListComponent_Template_mat_select_selectionChange_28_listener() {
            return ctx.onSupplierChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](29, "mat-option", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](30, 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](31, ProductListComponent_mat_option_31_Template, 2, 2, "mat-option", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](32, "div", 43)(33, "mat-form-field", 44)(34, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](35, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](36, "input", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_input_ngModelChange_36_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.minPrice, $event) || (ctx.minPrice = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function ProductListComponent_Template_input_change_36_listener() {
            return ctx.onPriceChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](37, "mat-form-field", 44)(38, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](39, 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](40, "input", 46);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_input_ngModelChange_40_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.maxPrice, $event) || (ctx.maxPrice = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function ProductListComponent_Template_input_change_40_listener() {
            return ctx.onPriceChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](41, "mat-form-field", 47)(42, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](43, 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](44, "mat-select", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_mat_select_ngModelChange_44_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.sortBy, $event) || (ctx.sortBy = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function ProductListComponent_Template_mat_select_selectionChange_44_listener() {
            return ctx.onSortChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](45, "mat-option", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](46, 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](47, "mat-option", 50);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](48, 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](49, "mat-option", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](50, 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](51, "mat-option", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](52, 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](53, "button", 53);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProductListComponent_Template_button_click_53_listener() {
            ctx.clearFilter("search");
            ctx.clearFilter("category");
            ctx.clearFilter("supplier");
            ctx.clearFilter("minPrice");
            return ctx.clearFilter("maxPrice");
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](54, " R\u00E9initialiser les filtres ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](55, "section", 54)(56, "div", 55)(57, "h2", 56);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](58, 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](59, "div", 57)(60, "mat-form-field", 36)(61, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](62, 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](63, "input", 37);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_input_ngModelChange_63_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchTerm, $event) || (ctx.searchTerm = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function ProductListComponent_Template_input_input_63_listener() {
            return ctx.onSearch();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](64, ProductListComponent_button_64_Template, 3, 0, "button", 38);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](65, "mat-form-field", 36)(66, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](67, 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](68, "mat-select", 39);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_mat_select_ngModelChange_68_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.selectedCategory, $event) || (ctx.selectedCategory = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function ProductListComponent_Template_mat_select_selectionChange_68_listener() {
            return ctx.onCategoryChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](69, "mat-option", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](70, 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](71, ProductListComponent_mat_option_71_Template, 2, 2, "mat-option", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](72, "mat-form-field", 36)(73, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](74, 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](75, "mat-select", 42);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_mat_select_ngModelChange_75_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.selectedSupplier, $event) || (ctx.selectedSupplier = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function ProductListComponent_Template_mat_select_selectionChange_75_listener() {
            return ctx.onSupplierChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](76, "mat-option", 40);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](77, 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](78, ProductListComponent_mat_option_78_Template, 2, 2, "mat-option", 41);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](79, "mat-form-field", 44)(80, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](81, 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](82, "input", 45);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_input_ngModelChange_82_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.minPrice, $event) || (ctx.minPrice = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function ProductListComponent_Template_input_change_82_listener() {
            return ctx.onPriceChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](83, "mat-form-field", 44)(84, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](85, 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](86, "input", 46);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_input_ngModelChange_86_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.maxPrice, $event) || (ctx.maxPrice = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function ProductListComponent_Template_input_change_86_listener() {
            return ctx.onPriceChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](87, "mat-form-field", 47)(88, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](89, 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](90, "mat-select", 48);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function ProductListComponent_Template_mat_select_ngModelChange_90_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.sortBy, $event) || (ctx.sortBy = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("selectionChange", function ProductListComponent_Template_mat_select_selectionChange_90_listener() {
            return ctx.onSortChange();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](91, "mat-option", 49);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](92, 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](93, "mat-option", 50);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](94, 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](95, "mat-option", 51);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](96, 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](97, "mat-option", 52);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵi18n"](98, 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](99, ProductListComponent_div_99_Template, 7, 5, "div", 58);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](100, ProductListComponent_div_100_Template, 2, 2, "div", 59)(101, ProductListComponent_div_101_Template, 2, 2, "div", 60)(102, ProductListComponent_div_102_Template, 9, 1, "div", 61)(103, ProductListComponent_div_103_Template, 9, 0, "div", 62);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](16);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchTerm);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.searchTerm);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedCategory);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.categories);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedSupplier);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.suppliers);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.minPrice);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.maxPrice);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.sortBy);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](19);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchTerm);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.searchTerm);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedCategory);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.categories);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedSupplier);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.suppliers);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.minPrice);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.maxPrice);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.sortBy);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.searchTerm || ctx.selectedCategory || ctx.selectedSupplier || ctx.minPrice != null || ctx.maxPrice != null);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.error);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && ctx.error);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", !ctx.loading && !ctx.error && ctx.filteredProducts.length === 0);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.SlicePipe, _angular_common__WEBPACK_IMPORTED_MODULE_6__.CurrencyPipe, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_12__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelectModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_13__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_14__.MatOption, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipsModule, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChip, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipRemove, _angular_material_chips__WEBPACK_IMPORTED_MODULE_15__.MatChipSet, _angular_material_divider__WEBPACK_IMPORTED_MODULE_16__.MatDividerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_17__.MatProgressSpinnerModule],
      styles: ["\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n  text-align: center;\n}\n\n.loading-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n\n.no-items[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n\n.no-items[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n\n.product-list-container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 24px;\n}\n\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n  text-align: center;\n}\n\n.page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #1B1B1B;\n  margin: 0 0 8px;\n}\n\n.page-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  margin: 0;\n  font-size: 1.125rem;\n}\n\n.layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 24px;\n}\n\n.filters-sidebar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 24px;\n  align-self: start;\n}\n\n.filters-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n}\n\n.filters-card[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 12px;\n}\n\n.price-group[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n\n.price-field[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.reset-btn[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-top: 16px;\n  border-radius: 12px;\n}\n\n.content[_ngcontent-%COMP%] {\n  min-height: 400px;\n}\n\n.header[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n\n.title[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: #1B1B1B;\n  margin-bottom: 16px;\n}\n\n.products-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n.product-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  overflow: hidden;\n  transition: transform 0.2s ease, box-shadow 0.2s ease;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n}\n\n.product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);\n}\n\n.product-image-container[_ngcontent-%COMP%] {\n  position: relative;\n  height: 200px;\n  overflow: hidden;\n}\n\n.product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform 0.3s ease;\n}\n\n.product-card[_ngcontent-%COMP%]:hover   .product-image[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n\n.product-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 12px;\n  right: 12px;\n  background: #4CAF50;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 12px;\n  font-weight: 600;\n}\n\n.product-badge.out-of-stock[_ngcontent-%COMP%] {\n  background: #FF5252;\n}\n\n.product-info[_ngcontent-%COMP%] {\n  padding: 16px;\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n}\n\n.product-category[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  font-size: 12px;\n  font-weight: 600;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  margin-bottom: 8px;\n}\n\n.product-title[_ngcontent-%COMP%] {\n  font-size: 1.125rem;\n  font-weight: 600;\n  color: #1B1B1B;\n  margin: 0 0 8px;\n  line-height: 1.4;\n}\n\n.product-description[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  font-size: 14px;\n  line-height: 1.5;\n  margin-bottom: 16px;\n  flex: 1;\n}\n\n.product-footer[_ngcontent-%COMP%] {\n  margin-top: auto;\n}\n\n.product-price[_ngcontent-%COMP%] {\n  margin-bottom: 16px;\n}\n\n.product-price[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  font-size: 1.25rem;\n  font-weight: 700;\n  color: #1B1B1B;\n  display: block;\n}\n\n.product-price[_ngcontent-%COMP%]   .supplier[_ngcontent-%COMP%] {\n  font-size: 12px;\n  color: #6A6A6A;\n  margin-top: 2px;\n}\n\n.product-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  align-items: center;\n}\n\n.view-btn[_ngcontent-%COMP%] {\n  width: 40px;\n  height: 40px;\n  border-radius: 50%;\n  background: #F9F9F9;\n}\n\n.add-to-cart-btn[_ngcontent-%COMP%] {\n  flex: 1;\n  background: #FFEA00;\n  color: #1B1B1B;\n  font-weight: 700;\n  border-radius: 12px;\n  gap: 8px;\n}\n\n.add-to-cart-btn[_ngcontent-%COMP%]:disabled {\n  background: #E0E0E0;\n  color: #9E9E9E;\n}\n\n.skeleton-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 20px;\n}\n\n.skeleton-card[_ngcontent-%COMP%] {\n  height: 380px;\n  border-radius: 12px;\n  background: linear-gradient(90deg, #F5F5F5 25%, #FFFFFF 37%, #F5F5F5 63%);\n  background-size: 400% 100%;\n  animation: _ngcontent-%COMP%_shimmer 1.5s ease-in-out infinite;\n}\n\n@keyframes _ngcontent-%COMP%_shimmer {\n  0% {\n    background-position: 100% 0;\n  }\n  100% {\n    background-position: -100% 0;\n  }\n}\n.error-state[_ngcontent-%COMP%], .empty-state[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  margin-top: 40px;\n}\n\n.error-card[_ngcontent-%COMP%], .empty-card[_ngcontent-%COMP%] {\n  max-width: 400px;\n  border-radius: 12px;\n}\n\n.error-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%], .empty-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px 20px;\n}\n\n.error-icon[_ngcontent-%COMP%], .empty-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  color: #6A6A6A;\n  margin-bottom: 16px;\n}\n\n.error-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .empty-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n  color: #1B1B1B;\n}\n\n.error-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .empty-card[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  margin: 0;\n}\n\n@media (max-width: 1024px) {\n  .layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n  .hide-mobile[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hide-desktop[_ngcontent-%COMP%] {\n    display: block;\n  }\n  .filters[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n    gap: 12px;\n    margin-bottom: 16px;\n  }\n}\n@media (max-width: 768px) {\n  .product-list-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .page-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));\n    gap: 16px;\n  }\n  .filters[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n@media (max-width: 480px) {\n  .products-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .product-actions[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .view-btn[_ngcontent-%COMP%] {\n    align-self: center;\n  }\n}\n.hide-mobile[_ngcontent-%COMP%] {\n  display: block;\n}\n\n.hide-desktop[_ngcontent-%COMP%] {\n  display: none;\n}\n\n@media (max-width: 1024px) {\n  .hide-mobile[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .hide-desktop[_ngcontent-%COMP%] {\n    display: block;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL3N0eWxlcy91dGlsaXRpZXMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcHJvZHVjdHMvY29tcG9uZW50cy9wcm9kdWN0LWxpc3QvcHJvZHVjdC1saXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBCQUFBO0FBRUE7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxtQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQ0FGOztBREdBO0VBQ0UsZUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7QUNBRjs7QURHQTtFQUNFLGtCQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUNBRjs7QURHQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FDQUY7O0FBekJBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsYUFBQTtBQTRCRjs7QUF6QkE7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0FBNEJGOztBQTFCQTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsZUFBQTtBQTZCRjs7QUEzQkE7RUFDRSxjQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBOEJGOztBQTNCQTtFQUNFLGFBQUE7RUFDQSxnQ0FBQTtFQUNBLFNBQUE7QUE4QkY7O0FBM0JBO0VBQ0UsZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsaUJBQUE7QUE4QkY7O0FBNUJBO0VBQ0UsbUJBQUE7QUErQkY7O0FBN0JBO0VBQ0UsV0FBQTtFQUNBLG1CQUFBO0FBZ0NGOztBQTlCQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBaUNGOztBQS9CQTtFQUNFLE9BQUE7QUFrQ0Y7O0FBaENBO0VBQ0UsV0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUFtQ0Y7O0FBaENBO0VBQ0UsaUJBQUE7QUFtQ0Y7O0FBaENBO0VBQ0UsbUJBQUE7QUFtQ0Y7O0FBakNBO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBQW9DRjs7QUFqQ0E7RUFDRSxhQUFBO0VBQ0EsNERBQUE7RUFDQSxTQUFBO0FBb0NGOztBQWpDQTtFQUNFLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxREFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUFvQ0Y7O0FBbENBO0VBQ0UsMkJBQUE7RUFDQSwwQ0FBQTtBQXFDRjs7QUFsQ0E7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxnQkFBQTtBQXFDRjs7QUFuQ0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGlCQUFBO0VBQ0EsK0JBQUE7QUFzQ0Y7O0FBcENBO0VBQ0Usc0JBQUE7QUF1Q0Y7O0FBcENBO0VBQ0Usa0JBQUE7RUFDQSxTQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUF1Q0Y7O0FBckNBO0VBQ0UsbUJBQUE7QUF3Q0Y7O0FBckNBO0VBQ0UsYUFBQTtFQUNBLE9BQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7QUF3Q0Y7O0FBckNBO0VBQ0UsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtBQXdDRjs7QUFyQ0E7RUFDRSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSxnQkFBQTtBQXdDRjs7QUFyQ0E7RUFDRSxjQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxPQUFBO0FBd0NGOztBQXJDQTtFQUNFLGdCQUFBO0FBd0NGOztBQXJDQTtFQUNFLG1CQUFBO0FBd0NGOztBQXRDQTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0EsY0FBQTtBQXlDRjs7QUF2Q0E7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUEwQ0Y7O0FBdkNBO0VBQ0UsYUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtBQTBDRjs7QUF4Q0E7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7QUEyQ0Y7O0FBekNBO0VBQ0UsT0FBQTtFQUNBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxRQUFBO0FBNENGOztBQTFDQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQTZDRjs7QUExQ0E7RUFDRSxhQUFBO0VBQ0EsNERBQUE7RUFDQSxTQUFBO0FBNkNGOztBQTNDQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHlFQUFBO0VBQ0EsMEJBQUE7RUFDQSw0Q0FBQTtBQThDRjs7QUEzQ0E7RUFDRTtJQUFLLDJCQUFBO0VBK0NMO0VBOUNBO0lBQU8sNEJBQUE7RUFpRFA7QUFDRjtBQS9DQTtFQUNFLGFBQUE7RUFDQSx1QkFBQTtFQUNBLGdCQUFBO0FBaURGOztBQS9DQTtFQUNFLGdCQUFBO0VBQ0EsbUJBQUE7QUFrREY7O0FBaERBO0VBQ0Usa0JBQUE7RUFDQSxrQkFBQTtBQW1ERjs7QUFqREE7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FBb0RGOztBQWxEQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0FBcURGOztBQW5EQTtFQUNFLGNBQUE7RUFDQSxTQUFBO0FBc0RGOztBQWxEQTtFQUNFO0lBQ0UsMEJBQUE7SUFDQSxTQUFBO0VBcURGO0VBbkRBO0lBQ0UsYUFBQTtFQXFERjtFQW5EQTtJQUNFLGNBQUE7RUFxREY7RUFuREE7SUFDRSxhQUFBO0lBQ0EsMkRBQUE7SUFDQSxTQUFBO0lBQ0EsbUJBQUE7RUFxREY7QUFDRjtBQWxEQTtFQUNFO0lBQ0UsYUFBQTtFQW9ERjtFQWxEQTtJQUNFLGVBQUE7RUFvREY7RUFsREE7SUFDRSw0REFBQTtJQUNBLFNBQUE7RUFvREY7RUFsREE7SUFDRSwwQkFBQTtFQW9ERjtBQUNGO0FBakRBO0VBQ0U7SUFDRSwwQkFBQTtFQW1ERjtFQWpEQTtJQUNFLHNCQUFBO0VBbURGO0VBakRBO0lBQ0Usa0JBQUE7RUFtREY7QUFDRjtBQS9DQTtFQUNFLGNBQUE7QUFpREY7O0FBL0NBO0VBQ0UsYUFBQTtBQWtERjs7QUEvQ0E7RUFDRTtJQUNFLGFBQUE7RUFrREY7RUFoREE7SUFDRSxjQUFBO0VBa0RGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBTaGFyZWQgVXRpbGl0eSBTdHlsZXMgKi9cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogNDBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciBtYXQtaWNvbiB7XHJcbiAgZm9udC1zaXplOiA0OHB4O1xyXG4gIGhlaWdodDogNDhweDtcclxuICB3aWR0aDogNDhweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4ubm8taXRlbXMge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwYWRkaW5nOiA0MHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ubm8taXRlbXMgbWF0LWljb24ge1xyXG4gIGZvbnQtc2l6ZTogNDhweDtcclxuICBoZWlnaHQ6IDQ4cHg7XHJcbiAgd2lkdGg6IDQ4cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxufSIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL3NoYXJlZC9zdHlsZXMvdXRpbGl0aWVzLnNjc3MnO1xyXG5cclxuLnByb2R1Y3QtbGlzdC1jb250YWluZXIgeyBcclxuICBtYXgtd2lkdGg6IDEyMDBweDsgXHJcbiAgbWFyZ2luOiAwIGF1dG87IFxyXG4gIHBhZGRpbmc6IDI0cHg7IFxyXG59XHJcblxyXG4ucGFnZS1oZWFkZXIgeyBcclxuICBtYXJnaW4tYm90dG9tOiAzMnB4OyBcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7IFxyXG59XHJcbi5wYWdlLWhlYWRlciBoMSB7IFxyXG4gIGZvbnQtc2l6ZTogMi41cmVtOyBcclxuICBmb250LXdlaWdodDogNzAwOyBcclxuICBjb2xvcjogIzFCMUIxQjsgXHJcbiAgbWFyZ2luOiAwIDAgOHB4OyBcclxufVxyXG4ucGFnZS1oZWFkZXIgLnN1YnRpdGxlIHsgXHJcbiAgY29sb3I6ICM2QTZBNkE7IFxyXG4gIG1hcmdpbjogMDsgXHJcbiAgZm9udC1zaXplOiAxLjEyNXJlbTsgXHJcbn1cclxuXHJcbi5sYXlvdXQgeyBcclxuICBkaXNwbGF5OiBncmlkOyBcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDI4MHB4IDFmcjsgXHJcbiAgZ2FwOiAyNHB4OyBcclxufVxyXG5cclxuLmZpbHRlcnMtc2lkZWJhciB7IFxyXG4gIHBvc2l0aW9uOiBzdGlja3k7IFxyXG4gIHRvcDogMjRweDsgXHJcbiAgYWxpZ24tc2VsZjogc3RhcnQ7IFxyXG59XHJcbi5maWx0ZXJzLWNhcmQgeyBcclxuICBib3JkZXItcmFkaXVzOiAxMnB4OyBcclxufVxyXG4uZmlsdGVycy1jYXJkIG1hdC1mb3JtLWZpZWxkIHsgXHJcbiAgd2lkdGg6IDEwMCU7IFxyXG4gIG1hcmdpbi1ib3R0b206IDEycHg7IFxyXG59XHJcbi5wcmljZS1ncm91cCB7IFxyXG4gIGRpc3BsYXk6IGZsZXg7IFxyXG4gIGdhcDogMTJweDsgXHJcbn1cclxuLnByaWNlLWZpZWxkIHsgXHJcbiAgZmxleDogMTsgXHJcbn1cclxuLnJlc2V0LWJ0biB7IFxyXG4gIHdpZHRoOiAxMDAlOyBcclxuICBtYXJnaW4tdG9wOiAxNnB4OyBcclxuICBib3JkZXItcmFkaXVzOiAxMnB4OyBcclxufVxyXG5cclxuLmNvbnRlbnQgeyBcclxuICBtaW4taGVpZ2h0OiA0MDBweDsgXHJcbn1cclxuXHJcbi5oZWFkZXIgeyBcclxuICBtYXJnaW4tYm90dG9tOiAyMHB4OyBcclxufVxyXG4udGl0bGUgeyBcclxuICBmb250LXNpemU6IDEuNzVyZW07IFxyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7IFxyXG4gIGNvbG9yOiAjMUIxQjFCOyBcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4OyBcclxufVxyXG5cclxuLnByb2R1Y3RzLWdyaWQgeyBcclxuICBkaXNwbGF5OiBncmlkOyBcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsIG1pbm1heCgyODBweCwgMWZyKSk7IFxyXG4gIGdhcDogMjBweDsgXHJcbn1cclxuXHJcbi5wcm9kdWN0LWNhcmQgeyBcclxuICBib3JkZXItcmFkaXVzOiAxMnB4OyBcclxuICBvdmVyZmxvdzogaGlkZGVuOyBcclxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4ycyBlYXNlLCBib3gtc2hhZG93IDAuMnMgZWFzZTsgXHJcbiAgaGVpZ2h0OiAxMDAlOyBcclxuICBkaXNwbGF5OiBmbGV4OyBcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBcclxufVxyXG4ucHJvZHVjdC1jYXJkOmhvdmVyIHsgXHJcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpOyBcclxuICBib3gtc2hhZG93OiAwIDhweCAyNHB4IHJnYmEoMCwwLDAsMC4xMik7IFxyXG59XHJcblxyXG4ucHJvZHVjdC1pbWFnZS1jb250YWluZXIgeyBcclxuICBwb3NpdGlvbjogcmVsYXRpdmU7IFxyXG4gIGhlaWdodDogMjAwcHg7IFxyXG4gIG92ZXJmbG93OiBoaWRkZW47IFxyXG59XHJcbi5wcm9kdWN0LWltYWdlIHsgXHJcbiAgd2lkdGg6IDEwMCU7IFxyXG4gIGhlaWdodDogMTAwJTsgXHJcbiAgb2JqZWN0LWZpdDogY292ZXI7IFxyXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7IFxyXG59XHJcbi5wcm9kdWN0LWNhcmQ6aG92ZXIgLnByb2R1Y3QtaW1hZ2UgeyBcclxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDUpOyBcclxufVxyXG5cclxuLnByb2R1Y3QtYmFkZ2UgeyBcclxuICBwb3NpdGlvbjogYWJzb2x1dGU7IFxyXG4gIHRvcDogMTJweDsgXHJcbiAgcmlnaHQ6IDEycHg7IFxyXG4gIGJhY2tncm91bmQ6ICM0Q0FGNTA7IFxyXG4gIGNvbG9yOiB3aGl0ZTsgXHJcbiAgcGFkZGluZzogNHB4IDhweDsgXHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDsgXHJcbiAgZm9udC1zaXplOiAxMnB4OyBcclxuICBmb250LXdlaWdodDogNjAwOyBcclxufVxyXG4ucHJvZHVjdC1iYWRnZS5vdXQtb2Ytc3RvY2sgeyBcclxuICBiYWNrZ3JvdW5kOiAjRkY1MjUyOyBcclxufVxyXG5cclxuLnByb2R1Y3QtaW5mbyB7IFxyXG4gIHBhZGRpbmc6IDE2cHg7IFxyXG4gIGZsZXg6IDE7IFxyXG4gIGRpc3BsYXk6IGZsZXg7IFxyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IFxyXG59XHJcblxyXG4ucHJvZHVjdC1jYXRlZ29yeSB7IFxyXG4gIGNvbG9yOiAjNkE2QTZBOyBcclxuICBmb250LXNpemU6IDEycHg7IFxyXG4gIGZvbnQtd2VpZ2h0OiA2MDA7IFxyXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IFxyXG4gIGxldHRlci1zcGFjaW5nOiAwLjVweDsgXHJcbiAgbWFyZ2luLWJvdHRvbTogOHB4OyBcclxufVxyXG5cclxuLnByb2R1Y3QtdGl0bGUgeyBcclxuICBmb250LXNpemU6IDEuMTI1cmVtOyBcclxuICBmb250LXdlaWdodDogNjAwOyBcclxuICBjb2xvcjogIzFCMUIxQjsgXHJcbiAgbWFyZ2luOiAwIDAgOHB4OyBcclxuICBsaW5lLWhlaWdodDogMS40OyBcclxufVxyXG5cclxuLnByb2R1Y3QtZGVzY3JpcHRpb24geyBcclxuICBjb2xvcjogIzZBNkE2QTsgXHJcbiAgZm9udC1zaXplOiAxNHB4OyBcclxuICBsaW5lLWhlaWdodDogMS41OyBcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4OyBcclxuICBmbGV4OiAxOyBcclxufVxyXG5cclxuLnByb2R1Y3QtZm9vdGVyIHsgXHJcbiAgbWFyZ2luLXRvcDogYXV0bzsgXHJcbn1cclxuXHJcbi5wcm9kdWN0LXByaWNlIHsgXHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDsgXHJcbn1cclxuLnByb2R1Y3QtcHJpY2UgLnByaWNlIHsgXHJcbiAgZm9udC1zaXplOiAxLjI1cmVtOyBcclxuICBmb250LXdlaWdodDogNzAwOyBcclxuICBjb2xvcjogIzFCMUIxQjsgXHJcbiAgZGlzcGxheTogYmxvY2s7IFxyXG59XHJcbi5wcm9kdWN0LXByaWNlIC5zdXBwbGllciB7IFxyXG4gIGZvbnQtc2l6ZTogMTJweDsgXHJcbiAgY29sb3I6ICM2QTZBNkE7IFxyXG4gIG1hcmdpbi10b3A6IDJweDsgXHJcbn1cclxuXHJcbi5wcm9kdWN0LWFjdGlvbnMgeyBcclxuICBkaXNwbGF5OiBmbGV4OyBcclxuICBnYXA6IDhweDsgXHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgXHJcbn1cclxuLnZpZXctYnRuIHsgXHJcbiAgd2lkdGg6IDQwcHg7IFxyXG4gIGhlaWdodDogNDBweDsgXHJcbiAgYm9yZGVyLXJhZGl1czogNTAlOyBcclxuICBiYWNrZ3JvdW5kOiAjRjlGOUY5OyBcclxufVxyXG4uYWRkLXRvLWNhcnQtYnRuIHsgXHJcbiAgZmxleDogMTsgXHJcbiAgYmFja2dyb3VuZDogI0ZGRUEwMDsgXHJcbiAgY29sb3I6ICMxQjFCMUI7IFxyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7IFxyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7IFxyXG4gIGdhcDogOHB4OyBcclxufVxyXG4uYWRkLXRvLWNhcnQtYnRuOmRpc2FibGVkIHsgXHJcbiAgYmFja2dyb3VuZDogI0UwRTBFMDsgXHJcbiAgY29sb3I6ICM5RTlFOUU7IFxyXG59XHJcblxyXG4uc2tlbGV0b24tZ3JpZCB7IFxyXG4gIGRpc3BsYXk6IGdyaWQ7IFxyXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDI4MHB4LCAxZnIpKTsgXHJcbiAgZ2FwOiAyMHB4OyBcclxufVxyXG4uc2tlbGV0b24tY2FyZCB7IFxyXG4gIGhlaWdodDogMzgwcHg7IFxyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7IFxyXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgI0Y1RjVGNSAyNSUsICNGRkZGRkYgMzclLCAjRjVGNUY1IDYzJSk7IFxyXG4gIGJhY2tncm91bmQtc2l6ZTogNDAwJSAxMDAlOyBcclxuICBhbmltYXRpb246IHNoaW1tZXIgMS41cyBlYXNlLWluLW91dCBpbmZpbml0ZTsgXHJcbn1cclxuXHJcbkBrZXlmcmFtZXMgc2hpbW1lciB7IFxyXG4gIDAlIHsgYmFja2dyb3VuZC1wb3NpdGlvbjogMTAwJSAwOyB9IFxyXG4gIDEwMCUgeyBiYWNrZ3JvdW5kLXBvc2l0aW9uOiAtMTAwJSAwOyB9IFxyXG59XHJcblxyXG4uZXJyb3Itc3RhdGUsIC5lbXB0eS1zdGF0ZSB7IFxyXG4gIGRpc3BsYXk6IGZsZXg7IFxyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyBcclxuICBtYXJnaW4tdG9wOiA0MHB4OyBcclxufVxyXG4uZXJyb3ItY2FyZCwgLmVtcHR5LWNhcmQgeyBcclxuICBtYXgtd2lkdGg6IDQwMHB4OyBcclxuICBib3JkZXItcmFkaXVzOiAxMnB4OyBcclxufVxyXG4uZXJyb3ItY2FyZCBtYXQtY2FyZC1jb250ZW50LCAuZW1wdHktY2FyZCBtYXQtY2FyZC1jb250ZW50IHsgXHJcbiAgdGV4dC1hbGlnbjogY2VudGVyOyBcclxuICBwYWRkaW5nOiA0MHB4IDIwcHg7IFxyXG59XHJcbi5lcnJvci1pY29uLCAuZW1wdHktaWNvbiB7IFxyXG4gIGZvbnQtc2l6ZTogNjRweDsgXHJcbiAgY29sb3I6ICM2QTZBNkE7IFxyXG4gIG1hcmdpbi1ib3R0b206IDE2cHg7IFxyXG59XHJcbi5lcnJvci1jYXJkIGgyLCAuZW1wdHktY2FyZCBoMiB7IFxyXG4gIG1hcmdpbjogMCAwIDhweDsgXHJcbiAgY29sb3I6ICMxQjFCMUI7IFxyXG59XHJcbi5lcnJvci1jYXJkIHAsIC5lbXB0eS1jYXJkIHAgeyBcclxuICBjb2xvcjogIzZBNkE2QTsgXHJcbiAgbWFyZ2luOiAwOyBcclxufVxyXG5cclxuLy8gUmVzcG9uc2l2ZSBicmVha3BvaW50c1xyXG5AbWVkaWEgKG1heC13aWR0aDogMTAyNHB4KSB7XHJcbiAgLmxheW91dCB7IFxyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IFxyXG4gICAgZ2FwOiAxNnB4OyBcclxuICB9XHJcbiAgLmhpZGUtbW9iaWxlIHsgXHJcbiAgICBkaXNwbGF5OiBub25lOyBcclxuICB9XHJcbiAgLmhpZGUtZGVza3RvcCB7IFxyXG4gICAgZGlzcGxheTogYmxvY2s7IFxyXG4gIH1cclxuICAuZmlsdGVycyB7IFxyXG4gICAgZGlzcGxheTogZ3JpZDsgXHJcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpdCwgbWlubWF4KDIwMHB4LCAxZnIpKTsgXHJcbiAgICBnYXA6IDEycHg7IFxyXG4gICAgbWFyZ2luLWJvdHRvbTogMTZweDsgXHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAucHJvZHVjdC1saXN0LWNvbnRhaW5lciB7IFxyXG4gICAgcGFkZGluZzogMTZweDsgXHJcbiAgfVxyXG4gIC5wYWdlLWhlYWRlciBoMSB7IFxyXG4gICAgZm9udC1zaXplOiAycmVtOyBcclxuICB9XHJcbiAgLnByb2R1Y3RzLWdyaWQgeyBcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDI1MHB4LCAxZnIpKTsgXHJcbiAgICBnYXA6IDE2cHg7IFxyXG4gIH1cclxuICAuZmlsdGVycyB7IFxyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7IFxyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgLnByb2R1Y3RzLWdyaWQgeyBcclxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyOyBcclxuICB9XHJcbiAgLnByb2R1Y3QtYWN0aW9ucyB7IFxyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgXHJcbiAgfVxyXG4gIC52aWV3LWJ0biB7IFxyXG4gICAgYWxpZ24tc2VsZjogY2VudGVyOyBcclxuICB9XHJcbn1cclxuXHJcbi8vIFNob3cvaGlkZSB1dGlsaXRpZXNcclxuLmhpZGUtbW9iaWxlIHsgXHJcbiAgZGlzcGxheTogYmxvY2s7IFxyXG59XHJcbi5oaWRlLWRlc2t0b3AgeyBcclxuICBkaXNwbGF5OiBub25lOyBcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDEwMjRweCkge1xyXG4gIC5oaWRlLW1vYmlsZSB7IFxyXG4gICAgZGlzcGxheTogbm9uZTsgXHJcbiAgfVxyXG4gIC5oaWRlLWRlc2t0b3AgeyBcclxuICAgIGRpc3BsYXk6IGJsb2NrOyBcclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"],
      data: {
        animation: [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_18__.trigger)("fadeIn", [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_18__.transition)(":enter", [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_18__.style)({
          opacity: 0,
          transform: "translateY(6px)"
        }), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_18__.animate)("200ms ease-out", (0,_angular_animations__WEBPACK_IMPORTED_MODULE_18__.style)({
          opacity: 1,
          transform: "none"
        }))])])]
      },
      changeDetection: 0
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_products_components_product-list_product-list_component_ts.js.map