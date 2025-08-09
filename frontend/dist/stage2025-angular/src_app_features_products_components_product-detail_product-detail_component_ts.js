"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_products_components_product-detail_product-detail_component_ts"],{

/***/ 4244:
/*!*****************************************************************************************!*\
  !*** ./src/app/features/products/components/product-detail/product-detail.component.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductDetailComponent: () => (/* binding */ ProductDetailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _core_services_product_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/product.service */ 7359);
/* harmony import */ var _core_services_cart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/cart.service */ 3661);






















const _c0 = a0 => [a0, "EUR", "symbol", "1.2-2", "fr-FR"];
function ProductDetailComponent_div_0_div_4_img_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "img", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProductDetailComponent_div_0_div_4_img_1_Template_img_click_0_listener() {
      const image_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r2).$implicit;
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.selectImage(image_r3));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const image_r3 = ctx.$implicit;
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵclassProp"]("active", ctx_r3.selectedImage === image_r3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", image_r3, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", ctx_r3.product.name);
  }
}
function ProductDetailComponent_div_0_div_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, ProductDetailComponent_div_0_div_4_img_1_Template, 1, 4, "img", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx_r3.product.imageUrls);
  }
}
function ProductDetailComponent_div_0_span_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](2, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBindV"](2, 1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](7, _c0, ctx_r3.product.dynamicPrice)), " ");
  }
}
function ProductDetailComponent_div_0_div_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 30)(1, "mat-icon", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("color", ctx_r3.product.syncedStock > 0 ? "primary" : "warn");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r3.product.syncedStock > 0 ? "check_circle" : "error", " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.product.syncedStock > 0 ? "En stock (" + ctx_r3.product.syncedStock + ")" : "Rupture de stock");
  }
}
function ProductDetailComponent_div_0_div_40_div_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 34)(1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "R\u00E9f\u00E9rence:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", ctx_r3.product.externalProductId, " ");
  }
}
function ProductDetailComponent_div_0_div_40_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 32)(1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "D\u00E9tails");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, ProductDetailComponent_div_0_div_40_div_3_Template, 4, 1, "div", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 34)(5, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Derni\u00E8re mise \u00E0 jour:");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](8, "date");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.product.externalProductId);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](8, 2, ctx_r3.product.lastFetched, "medium"), " ");
  }
}
function ProductDetailComponent_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 3)(1, "div", 4)(2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "img", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, ProductDetailComponent_div_0_div_4_Template, 2, 1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 8)(6, "div", 9)(7, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 10)(10, "span", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 13)(15, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](17, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, ProductDetailComponent_div_0_span_18_Template, 3, 9, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, ProductDetailComponent_div_0_div_19_Template, 5, 3, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "div", 17)(21, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](24);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "div", 18)(26, "div", 19)(27, "mat-form-field", 20)(28, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](29, "Quantit\u00E9");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](30, "input", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayListener"]("ngModelChange", function ProductDetailComponent_div_0_Template_input_ngModelChange_30_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayBindingSet"](ctx_r3.quantity, $event) || (ctx_r3.quantity = $event);
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"]($event);
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "div", 22)(32, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ProductDetailComponent_div_0_Template_button_click_32_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r1);
      const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵresetView"](ctx_r3.addToCart());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](34, "shopping_cart");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, " Ajouter au panier ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "button", 24)(37, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "favorite_border");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, " Ajouter aux favoris ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](40, ProductDetailComponent_div_0_div_40_Template, 9, 5, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("src", ctx_r3.selectedImage || "/placeholder.svg?height=400&width=400", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsanitizeUrl"])("alt", ctx_r3.product.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.product.imageUrls.length > 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.product.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.product.categoryName);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("par ", ctx_r3.product.supplierName, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBindV"](17, 14, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](20, _c0, ctx_r3.product.displayedPrice)));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.product.dynamicPrice && ctx_r3.product.dynamicPrice !== ctx_r3.product.displayedPrice);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.product.syncedStock !== undefined);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r3.product.description);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtwoWayProperty"]("ngModel", ctx_r3.quantity);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("max", ctx_r3.product.syncedStock || 999);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx_r3.product.syncedStock === 0 || ctx_r3.quantity <= 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r3.product.lastFetched);
  }
}
function ProductDetailComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 35)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Produit introuvable");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Le produit recherch\u00E9 n'existe pas.");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " Retour aux produits ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
function ProductDetailComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "mat-spinner");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Chargement du produit\u2026");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
  }
}
class ProductDetailComponent {
  constructor() {
    this.route = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_3__.ActivatedRoute);
    this.productService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_core_services_product_service__WEBPACK_IMPORTED_MODULE_0__.ProductService);
    this.cartService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_core_services_cart_service__WEBPACK_IMPORTED_MODULE_1__.CartService);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__.MatSnackBar);
    this.product = null;
    this.loading = true;
    this.quantity = 1;
    this.selectedImage = "";
  }
  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.loadProduct(+id);
    }
  }
  loadProduct(id) {
    this.productService.getProductById(id).subscribe({
      next: product => {
        this.product = product;
        this.selectedImage = product.imageUrls[0] || "";
        this.loading = false;
      },
      error: error => {
        console.error("Error loading product:", error);
        this.loading = false;
      }
    });
  }
  selectImage(image) {
    this.selectedImage = image;
  }
  addToCart() {
    if (!this.product) return;
    this.cartService.addItemToCart({
      productId: this.product.id,
      productName: this.product.name,
      quantity: this.quantity,
      unitPrice: this.product.displayedPrice
    }).subscribe({
      next: () => {
        this.snackBar.open(`${this.product.name} added to cart!`, "Close", {
          duration: 3000
        });
      },
      error: error => {
        console.error("Error adding to cart:", error);
        this.snackBar.open("Error adding product to cart", "Close", {
          duration: 3000
        });
      }
    });
  }
  addToWishlist() {
    // TODO: Implement wishlist functionality
    this.snackBar.open("Wishlist feature coming soon!", "Close", {
      duration: 3000
    });
  }
  static {
    this.ɵfac = function ProductDetailComponent_Factory(t) {
      return new (t || ProductDetailComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ProductDetailComponent,
      selectors: [["app-product-detail"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 3,
      vars: 3,
      consts: [["class", "product-detail-container", 4, "ngIf"], ["class", "not-found", 4, "ngIf"], ["class", "loading-container", 4, "ngIf"], [1, "product-detail-container"], [1, "product-images"], [1, "main-image"], [1, "main-product-image", 3, "src", "alt"], ["class", "thumbnail-images", 4, "ngIf"], [1, "product-info"], [1, "product-header"], [1, "product-meta"], [1, "category"], [1, "supplier"], [1, "product-price"], [1, "current-price"], ["class", "dynamic-price", 4, "ngIf"], ["class", "product-stock", 4, "ngIf"], [1, "product-description"], [1, "product-actions"], [1, "quantity-selector"], ["appearance", "outline"], ["matInput", "", "type", "number", "min", "1", 3, "ngModelChange", "ngModel", "max"], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 1, "cta", 3, "click", "disabled"], ["mat-stroked-button", ""], ["class", "product-details", 4, "ngIf"], [1, "thumbnail-images"], ["class", "thumbnail", 3, "src", "alt", "active", "click", 4, "ngFor", "ngForOf"], [1, "thumbnail", 3, "click", "src", "alt"], [1, "dynamic-price"], [1, "product-stock"], [3, "color"], [1, "product-details"], ["class", "detail-item", 4, "ngIf"], [1, "detail-item"], [1, "not-found"], ["mat-raised-button", "", "color", "primary", "routerLink", "/products"], [1, "loading-container"]],
      template: function ProductDetailComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](0, ProductDetailComponent_div_0_Template, 41, 22, "div", 0)(1, ProductDetailComponent_div_1_Template, 9, 0, "div", 1)(2, ProductDetailComponent_div_2_Template, 4, 0, "div", 2);
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.product);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.product && !ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.loading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CurrencyPipe, _angular_common__WEBPACK_IMPORTED_MODULE_5__.DatePipe, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NumberValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.MinValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.MaxValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_material_card__WEBPACK_IMPORTED_MODULE_7__.MatCardModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_8__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinner],
      styles: ["\n\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 40px;\n  text-align: center;\n}\n\n.loading-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n\n.no-items[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 40px;\n  color: #666;\n}\n\n.no-items[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  height: 48px;\n  width: 48px;\n  margin-bottom: 16px;\n}\n\n.product-detail-container[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 40px;\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.product-images[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.main-image[_ngcontent-%COMP%] {\n  width: 100%;\n  aspect-ratio: 1;\n  border-radius: 8px;\n  overflow: hidden;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n\n.main-product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n\n.thumbnail-images[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  overflow-x: auto;\n}\n\n.thumbnail[_ngcontent-%COMP%] {\n  width: 80px;\n  height: 80px;\n  object-fit: cover;\n  border-radius: 4px;\n  cursor: pointer;\n  opacity: 0.7;\n  transition: opacity 0.2s;\n  border: 2px solid transparent;\n}\n\n.thumbnail[_ngcontent-%COMP%]:hover, .thumbnail.active[_ngcontent-%COMP%] {\n  opacity: 1;\n  border-color: #2196f3;\n}\n\n.product-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n}\n\n.product-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 2rem;\n  font-weight: 500;\n}\n\n.product-meta[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  color: #666;\n}\n\n.category[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1976d2;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-size: 0.9rem;\n}\n\n.supplier[_ngcontent-%COMP%] {\n  font-style: italic;\n}\n\n.product-price[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n}\n\n.current-price[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 500;\n  color: #2196f3;\n}\n\n.dynamic-price[_ngcontent-%COMP%] {\n  font-size: 1.2rem;\n  color: #ff9800;\n  text-decoration: line-through;\n}\n\n.product-stock[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-weight: 500;\n}\n\n.product-description[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%], .product-details[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  color: #333;\n}\n\n.product-description[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  line-height: 1.6;\n  color: #666;\n}\n\n.product-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n  padding: 20px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n\n.quantity-selector[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  width: 120px;\n}\n\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 12px;\n}\n\n.action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.detail-item[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n\n.detail-item[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #333;\n}\n\n@media (max-width: 768px) {\n  .product-detail-container[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 20px;\n    padding: 16px;\n  }\n  .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .product-price[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 8px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL3N0eWxlcy91dGlsaXRpZXMuc2NzcyIsIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvcHJvZHVjdHMvY29tcG9uZW50cy9wcm9kdWN0LWRldGFpbC9wcm9kdWN0LWRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBQTtBQUVBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0VBQ0Esa0JBQUE7QUNBRjs7QURHQTtFQUNFLGVBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0FDQUY7O0FER0E7RUFDRSxrQkFBQTtFQUNBLGFBQUE7RUFDQSxXQUFBO0FDQUY7O0FER0E7RUFDRSxlQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtBQ0FGOztBQXpCQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FBNEJGOztBQXpCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUE0QkY7O0FBekJBO0VBQ0UsV0FBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0Esd0NBQUE7QUE0QkY7O0FBekJBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtBQTRCRjs7QUF6QkE7RUFDRSxhQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBNEJGOztBQXpCQTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0VBQ0Esd0JBQUE7RUFDQSw2QkFBQTtBQTRCRjs7QUF6QkE7O0VBRUUsVUFBQTtFQUNBLHFCQUFBO0FBNEJGOztBQXpCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7QUE0QkY7O0FBekJBO0VBQ0UsaUJBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUE0QkY7O0FBekJBO0VBQ0UsYUFBQTtFQUNBLFNBQUE7RUFDQSxXQUFBO0FBNEJGOztBQXpCQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQTRCRjs7QUF6QkE7RUFDRSxrQkFBQTtBQTRCRjs7QUF6QkE7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FBNEJGOztBQXpCQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7QUE0QkY7O0FBekJBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsNkJBQUE7QUE0QkY7O0FBekJBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsUUFBQTtFQUNBLGdCQUFBO0FBNEJGOztBQXpCQTs7RUFFRSxrQkFBQTtFQUNBLFdBQUE7QUE0QkY7O0FBekJBO0VBQ0UsZ0JBQUE7RUFDQSxXQUFBO0FBNEJGOztBQXpCQTtFQUNFLGFBQUE7RUFDQSxzQkFBQTtFQUNBLFNBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBQTRCRjs7QUF6QkE7RUFDRSxZQUFBO0FBNEJGOztBQXpCQTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBNEJGOztBQXpCQTtFQUNFLE9BQUE7QUE0QkY7O0FBekJBO0VBQ0Usa0JBQUE7QUE0QkY7O0FBekJBO0VBQ0UsV0FBQTtBQTRCRjs7QUF6QkE7RUFDRTtJQUNFLDBCQUFBO0lBQ0EsU0FBQTtJQUNBLGFBQUE7RUE0QkY7RUF6QkE7SUFDRSxzQkFBQTtFQTJCRjtFQXhCQTtJQUNFLHNCQUFBO0lBQ0EsdUJBQUE7SUFDQSxRQUFBO0VBMEJGO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBTaGFyZWQgVXRpbGl0eSBTdHlsZXMgKi9cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogNDBweDtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5sb2FkaW5nLWNvbnRhaW5lciBtYXQtaWNvbiB7XHJcbiAgZm9udC1zaXplOiA0OHB4O1xyXG4gIGhlaWdodDogNDhweDtcclxuICB3aWR0aDogNDhweDtcclxuICBtYXJnaW4tYm90dG9tOiAxNnB4O1xyXG59XHJcblxyXG4ubm8taXRlbXMge1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICBwYWRkaW5nOiA0MHB4O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ubm8taXRlbXMgbWF0LWljb24ge1xyXG4gIGZvbnQtc2l6ZTogNDhweDtcclxuICBoZWlnaHQ6IDQ4cHg7XHJcbiAgd2lkdGg6IDQ4cHg7XHJcbiAgbWFyZ2luLWJvdHRvbTogMTZweDtcclxufSIsIkBpbXBvcnQgJy4uLy4uLy4uLy4uL3NoYXJlZC9zdHlsZXMvdXRpbGl0aWVzLnNjc3MnO1xyXG5cclxuLnByb2R1Y3QtZGV0YWlsLWNvbnRhaW5lciB7XHJcbiAgZGlzcGxheTogZ3JpZDtcclxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmciAxZnI7XHJcbiAgZ2FwOiA0MHB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgbWF4LXdpZHRoOiAxMjAwcHg7XHJcbiAgbWFyZ2luOiAwIGF1dG87XHJcbn1cclxuXHJcbi5wcm9kdWN0LWltYWdlcyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMTZweDtcclxufVxyXG5cclxuLm1haW4taW1hZ2Uge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIGFzcGVjdC1yYXRpbzogMTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLDAsMCwwLjEpO1xyXG59XHJcblxyXG4ubWFpbi1wcm9kdWN0LWltYWdlIHtcclxuICB3aWR0aDogMTAwJTtcclxuICBoZWlnaHQ6IDEwMCU7XHJcbiAgb2JqZWN0LWZpdDogY292ZXI7XHJcbn1cclxuXHJcbi50aHVtYm5haWwtaW1hZ2VzIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGdhcDogOHB4O1xyXG4gIG92ZXJmbG93LXg6IGF1dG87XHJcbn1cclxuXHJcbi50aHVtYm5haWwge1xyXG4gIHdpZHRoOiA4MHB4O1xyXG4gIGhlaWdodDogODBweDtcclxuICBvYmplY3QtZml0OiBjb3ZlcjtcclxuICBib3JkZXItcmFkaXVzOiA0cHg7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG4gIG9wYWNpdHk6IDAuNztcclxuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnM7XHJcbiAgYm9yZGVyOiAycHggc29saWQgdHJhbnNwYXJlbnQ7XHJcbn1cclxuXHJcbi50aHVtYm5haWw6aG92ZXIsXHJcbi50aHVtYm5haWwuYWN0aXZlIHtcclxuICBvcGFjaXR5OiAxO1xyXG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMztcclxufVxyXG5cclxuLnByb2R1Y3QtaW5mbyB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG4gIGdhcDogMjRweDtcclxufVxyXG5cclxuLnByb2R1Y3QtaGVhZGVyIGgxIHtcclxuICBtYXJnaW46IDAgMCA4cHggMDtcclxuICBmb250LXNpemU6IDJyZW07XHJcbiAgZm9udC13ZWlnaHQ6IDUwMDtcclxufVxyXG5cclxuLnByb2R1Y3QtbWV0YSB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBnYXA6IDE2cHg7XHJcbiAgY29sb3I6ICM2NjY7XHJcbn1cclxuXHJcbi5jYXRlZ29yeSB7XHJcbiAgYmFja2dyb3VuZDogI2UzZjJmZDtcclxuICBjb2xvcjogIzE5NzZkMjtcclxuICBwYWRkaW5nOiA0cHggOHB4O1xyXG4gIGJvcmRlci1yYWRpdXM6IDRweDtcclxuICBmb250LXNpemU6IDAuOXJlbTtcclxufVxyXG5cclxuLnN1cHBsaWVyIHtcclxuICBmb250LXN0eWxlOiBpdGFsaWM7XHJcbn1cclxuXHJcbi5wcm9kdWN0LXByaWNlIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XHJcbiAgZ2FwOiAxNnB4O1xyXG59XHJcblxyXG4uY3VycmVudC1wcmljZSB7XHJcbiAgZm9udC1zaXplOiAycmVtO1xyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7XHJcbiAgY29sb3I6ICMyMTk2ZjM7XHJcbn1cclxuXHJcbi5keW5hbWljLXByaWNlIHtcclxuICBmb250LXNpemU6IDEuMnJlbTtcclxuICBjb2xvcjogI2ZmOTgwMDtcclxuICB0ZXh0LWRlY29yYXRpb246IGxpbmUtdGhyb3VnaDtcclxufVxyXG5cclxuLnByb2R1Y3Qtc3RvY2sge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBnYXA6IDhweDtcclxuICBmb250LXdlaWdodDogNTAwO1xyXG59XHJcblxyXG4ucHJvZHVjdC1kZXNjcmlwdGlvbiBoMyxcclxuLnByb2R1Y3QtZGV0YWlscyBoMyB7XHJcbiAgbWFyZ2luOiAwIDAgMTJweCAwO1xyXG4gIGNvbG9yOiAjMzMzO1xyXG59XHJcblxyXG4ucHJvZHVjdC1kZXNjcmlwdGlvbiBwIHtcclxuICBsaW5lLWhlaWdodDogMS42O1xyXG4gIGNvbG9yOiAjNjY2O1xyXG59XHJcblxyXG4ucHJvZHVjdC1hY3Rpb25zIHtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgZ2FwOiAxNnB4O1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbiAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbn1cclxuXHJcbi5xdWFudGl0eS1zZWxlY3RvciBtYXQtZm9ybS1maWVsZCB7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG59XHJcblxyXG4uYWN0aW9uLWJ1dHRvbnMge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAgZ2FwOiAxMnB4O1xyXG59XHJcblxyXG4uYWN0aW9uLWJ1dHRvbnMgYnV0dG9uIHtcclxuICBmbGV4OiAxO1xyXG59XHJcblxyXG4uZGV0YWlsLWl0ZW0ge1xyXG4gIG1hcmdpbi1ib3R0b206IDhweDtcclxufVxyXG5cclxuLmRldGFpbC1pdGVtIHN0cm9uZyB7XHJcbiAgY29sb3I6ICMzMzM7XHJcbn1cclxuXHJcbkBtZWRpYSAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gIC5wcm9kdWN0LWRldGFpbC1jb250YWluZXIge1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnI7XHJcbiAgICBnYXA6IDIwcHg7XHJcbiAgICBwYWRkaW5nOiAxNnB4O1xyXG4gIH1cclxuICBcclxuICAuYWN0aW9uLWJ1dHRvbnMge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICB9XHJcbiAgXHJcbiAgLnByb2R1Y3QtcHJpY2Uge1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxuICAgIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xyXG4gICAgZ2FwOiA4cHg7XHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_products_components_product-detail_product-detail_component_ts.js.map