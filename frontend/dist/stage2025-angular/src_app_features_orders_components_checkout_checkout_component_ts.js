"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_orders_components_checkout_checkout_component_ts"],{

/***/ 3685:
/*!***************************************************************************!*\
  !*** ./src/app/features/orders/components/checkout/checkout.component.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CheckoutComponent: () => (/* binding */ CheckoutComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/stepper */ 6622);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _core_services_cart_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/cart.service */ 3661);
/* harmony import */ var _core_services_address_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/services/address.service */ 1208);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _app_features_profile_components_address_dialog_address_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/features/profile/components/address-dialog/address-dialog.component */ 7193);
/* harmony import */ var _core_services_order_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @core/services/order.service */ 8544);
/* harmony import */ var _core_services_payment_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @core/services/payment.service */ 634);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/core */ 4646);






























const _c0 = () => ({
  standalone: true
});
const _c1 = a0 => [a0, "EUR", "symbol", "1.2-2", "fr-FR"];
function CheckoutComponent_mat_option_37_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-option", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const address_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", address_r2.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate3"](" ", address_r2.label, " - ", address_r2.address, ", ", address_r2.city, " ");
  }
}
function CheckoutComponent_mat_spinner_77_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-spinner", 35);
  }
}
function CheckoutComponent_span_78_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1, "Passer la commande");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
  }
}
function CheckoutComponent_div_85_div_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 42)(1, "div", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 44)(4, "span", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "span", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](item_r3.productName);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("\u00D7 ", item_r3.quantity, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBindV"](8, 3, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](9, _c1, item_r3.unitPrice * item_r3.quantity)));
  }
}
function CheckoutComponent_div_85_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 36)(1, "div", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](2, CheckoutComponent_div_85_div_2_Template, 9, 11, "div", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "div", 39)(4, "div", 40)(5, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](6, "Sous-total");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](7, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](9, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 40)(11, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](12, "Frais de livraison");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](13, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "Gratuit");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](15, "div", 41)(16, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](17, "Total");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](18, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](20, "currency");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx_r3.cart.items);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBindV"](9, 3, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](15, _c1, ctx_r3.getCartTotal())));
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBindV"](20, 9, _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction1"](17, _c1, ctx_r3.getCartTotal())));
  }
}
class CheckoutComponent {
  constructor() {
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormBuilder);
    this.cartService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_core_services_cart_service__WEBPACK_IMPORTED_MODULE_0__.CartService);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_7__.Router);
    this.orderService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_core_services_order_service__WEBPACK_IMPORTED_MODULE_3__.OrderService);
    this.paymentService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_core_services_payment_service__WEBPACK_IMPORTED_MODULE_4__.PaymentService);
    this.addressService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_core_services_address_service__WEBPACK_IMPORTED_MODULE_1__.AddressService);
    this.dialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_8__.MatDialog);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_9__.MatSnackBar);
    this.cart = null;
    this.loadingCart = true;
    this.loadingAddresses = true;
    this.placingOrder = false;
    this.addresses = [];
    this.selectedAddressId = null;
    this.shippingForm = this.fb.group({
      firstName: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      lastName: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      address: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      city: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      postalCode: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      country: [""],
      phone: [""]
    });
    this.paymentForm = this.fb.group({
      cardNumber: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      expiryDate: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      cvv: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required],
      cardholderName: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_6__.Validators.required]
    });
  }
  ngOnInit() {
    this.loadCart();
    this.loadAddresses();
  }
  loadAddresses() {
    this.addressService.getAddresses().subscribe({
      next: addresses => {
        this.addresses = addresses;
      },
      error: error => console.error("Error loading addresses:", error)
    });
  }
  loadCart() {
    this.cartService.getCart().subscribe({
      next: cart => {
        this.cart = cart;
      },
      error: error => {
        console.error("Error loading cart:", error);
      }
    });
  }
  getCartTotal() {
    if (!this.cart || !this.cart.items) return 0;
    return this.cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  }
  onAddressSelect() {
    const selectedAddress = this.addresses.find(addr => addr.id === this.selectedAddressId);
    if (selectedAddress) {
      this.shippingForm.patchValue(selectedAddress);
    }
  }
  openAddressDialog() {
    const dialogRef = this.dialog.open(_app_features_profile_components_address_dialog_address_dialog_component__WEBPACK_IMPORTED_MODULE_2__.AddressDialogComponent, {
      width: '400px',
      data: null // No data for adding a new address
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addressService.addAddress(result).subscribe({
          next: () => this.loadAddresses(),
          // Refresh list after adding
          error: error => console.error("Error adding address:", error)
        });
      }
    });
  }
  placeOrder() {
    if (this.shippingForm.valid && this.paymentForm.valid && this.cart && this.cart.items.length > 0) {
      const orderRequest = {
        shippingAddress: this.shippingForm.value,
        items: this.cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        }))
      };
      this.orderService.createOrder(orderRequest).subscribe({
        next: order => {
          // Navigate to payment page for this order
          this.router.navigate(['/orders', order.id, 'payment']);
        },
        error: error => console.error("Order creation failed:", error) // Handle order creation error
      });
    }
  }
  static {
    this.ɵfac = function CheckoutComponent_Factory(t) {
      return new (t || CheckoutComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({
      type: CheckoutComponent,
      selectors: [["app-checkout"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵStandaloneFeature"]],
      decls: 86,
      vars: 13,
      consts: [["stepper", ""], [1, "checkout-layout"], [1, "checkout-main"], [1, "checkout-card"], ["orientation", "vertical", 3, "linear"], ["label", "Adresse de livraison", 3, "stepControl"], [3, "formGroup"], [1, "form-row"], ["appearance", "outline", 1, "half-width"], ["matInput", "", "formControlName", "firstName", "required", ""], ["matInput", "", "formControlName", "lastName", "required", ""], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "address", "required", ""], ["matInput", "", "formControlName", "city", "required", ""], ["matInput", "", "formControlName", "postalCode", "required", ""], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-button", "", 3, "click"], [1, "step-actions"], ["mat-raised-button", "", "color", "primary", "matStepperNext", ""], ["label", "Paiement", 3, "stepControl"], ["matInput", "", "formControlName", "cardNumber", "placeholder", "1234 5678 9012 3456", "required", ""], ["matInput", "", "formControlName", "expiryDate", "placeholder", "MM/YY", "required", ""], ["matInput", "", "formControlName", "cvv", "placeholder", "123", "required", ""], ["matInput", "", "formControlName", "cardholderName", "required", ""], ["mat-button", "", "matStepperPrevious", ""], ["label", "Confirmation"], [1, "confirmation-content"], ["mat-raised-button", "", "color", "primary", 1, "cta", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], [1, "summary-sidebar"], [1, "summary-card"], ["class", "summary-content", 4, "ngIf"], [3, "value"], ["diameter", "20"], [1, "summary-content"], [1, "items-list"], ["class", "summary-item", 4, "ngFor", "ngForOf"], [1, "summary-totals"], [1, "total-row"], [1, "total-row", "final"], [1, "summary-item"], [1, "item-name"], [1, "item-details"], [1, "quantity"], [1, "price"]],
      template: function CheckoutComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "div", 1)(1, "div", 2)(2, "mat-card", 3)(3, "mat-card-header")(4, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](5, "Paiement");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "mat-card-content")(7, "mat-stepper", 4, 0)(9, "mat-step", 5)(10, "form", 6)(11, "div", 7)(12, "mat-form-field", 8)(13, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](14, "Pr\u00E9nom");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](15, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "mat-form-field", 8)(17, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](18, "Nom");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](19, "input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](20, "mat-form-field", 11)(21, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](22, "Adresse");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](23, "input", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](24, "div", 7)(25, "mat-form-field", 8)(26, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](27, "Ville");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](28, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](29, "mat-form-field", 8)(30, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](31, "Code postal");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](32, "input", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](33, "mat-form-field", 11)(34, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](35, "Adresse enregistr\u00E9e");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](36, "mat-select", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayListener"]("ngModelChange", function CheckoutComponent_Template_mat_select_ngModelChange_36_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayBindingSet"](ctx.selectedAddressId, $event) || (ctx.selectedAddressId = $event);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"]($event);
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("selectionChange", function CheckoutComponent_Template_mat_select_selectionChange_36_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.onAddressSelect());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](37, CheckoutComponent_mat_option_37_Template, 2, 4, "mat-option", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](38, "button", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CheckoutComponent_Template_button_click_38_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.openAddressDialog());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](39, "Ajouter une adresse");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](40, "div", 18)(41, "button", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](42, "Suivant");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](43, "mat-step", 20)(44, "form", 6)(45, "mat-form-field", 11)(46, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](47, "Num\u00E9ro de carte");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](48, "input", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](49, "div", 7)(50, "mat-form-field", 8)(51, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](52, "Date d'expiration");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](53, "input", 22);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](54, "mat-form-field", 8)(55, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](56, "CVV");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](57, "input", 23);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](58, "mat-form-field", 11)(59, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](60, "Nom sur la carte");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](61, "input", 24);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](62, "div", 18)(63, "button", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](64, "Retour");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](65, "button", 19);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](66, "Suivant");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](67, "mat-step", 26)(68, "div", 27)(69, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](70, "Votre commande est pr\u00EAte");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](71, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](72, "V\u00E9rifiez les informations ci-dessous avant de finaliser.");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](73, "div", 18)(74, "button", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](75, "Retour");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](76, "button", 28);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function CheckoutComponent_Template_button_click_76_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r1);
            return _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵresetView"](ctx.placeOrder());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](77, CheckoutComponent_mat_spinner_77_Template, 1, 0, "mat-spinner", 29)(78, CheckoutComponent_span_78_Template, 2, 0, "span", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()()()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](79, "div", 31)(80, "mat-card", 32)(81, "mat-card-header")(82, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](83, "R\u00E9capitulatif");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](84, "mat-card-content");
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](85, CheckoutComponent_div_85_Template, 21, 19, "div", 33);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("linear", true);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("stepControl", ctx.shippingForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.shippingForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](26);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtwoWayProperty"]("ngModel", ctx.selectedAddressId);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngModelOptions", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpureFunction0"](12, _c0));
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngForOf", ctx.addresses);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("stepControl", ctx.paymentForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("formGroup", ctx.paymentForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](32);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("disabled", ctx.placingOrder);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.placingOrder);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", !ctx.placingOrder);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", ctx.cart && ctx.cart.items.length > 0);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_10__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_10__.CurrencyPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormControlName, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_6__.NgModel, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_11__.MatCardTitle, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_13__.MatIconModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_15__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelectModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_16__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_17__.MatOption, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__.MatStepperModule, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__.MatStep, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__.MatStepper, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__.MatStepperNext, _angular_material_stepper__WEBPACK_IMPORTED_MODULE_18__.MatStepperPrevious, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_19__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_19__.MatProgressSpinner],
      styles: [".checkout-layout[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 1fr 360px;\n  gap: 24px;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 24px;\n}\n\n.checkout-main[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n\n.checkout-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 16px;\n}\n\n.half-width[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-bottom: 16px;\n}\n\n.step-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n  justify-content: flex-end;\n  margin-top: 24px;\n}\n\n.step-actions[_ngcontent-%COMP%]   .cta[_ngcontent-%COMP%] {\n  background: var(--brand-primary, #FFEA00);\n  color: #1B1B1B;\n  font-weight: 700;\n  border-radius: 12px;\n}\n\n.summary-sidebar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 24px;\n  align-self: start;\n}\n\n.summary-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n}\n\n.summary-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 16px;\n}\n\n.items-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.summary-item[_ngcontent-%COMP%] {\n  padding: 12px 0;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.08);\n}\n\n.item-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  margin-bottom: 4px;\n}\n\n.item-details[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  color: var(--text-secondary, #6A6A6A);\n}\n\n.summary-totals[_ngcontent-%COMP%] {\n  border-top: 1px solid rgba(0, 0, 0, 0.12);\n  padding-top: 16px;\n}\n\n.total-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  margin-bottom: 8px;\n}\n\n.total-row.final[_ngcontent-%COMP%] {\n  font-weight: 700;\n  font-size: 18px;\n  color: #1B1B1B;\n}\n\n.confirmation-content[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0 0 8px;\n}\n\n.confirmation-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--text-secondary, #6A6A6A);\n  margin: 0 0 16px;\n}\n\n@media (max-width: 1024px) {\n  .checkout-layout[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n    padding: 16px;\n  }\n  .summary-sidebar[_ngcontent-%COMP%] {\n    position: static;\n    order: -1;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvb3JkZXJzL2NvbXBvbmVudHMvY2hlY2tvdXQvY2hlY2tvdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNJO0VBQ0UsYUFBQTtFQUNBLGdDQUFBO0VBQ0EsU0FBQTtFQUNBLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLGFBQUE7QUFBTjs7QUFHSTtFQUFpQixhQUFBO0VBQWUsc0JBQUE7QUFFcEM7O0FBREk7RUFBaUIsbUJBQUE7QUFLckI7O0FBSEk7RUFBWSxhQUFBO0VBQWUsU0FBQTtBQVEvQjs7QUFQSTtFQUFjLFdBQUE7RUFBYSxtQkFBQTtBQVkvQjs7QUFYSTtFQUFjLE9BQUE7RUFBUyxtQkFBQTtBQWdCM0I7O0FBZEk7RUFDRSxhQUFBO0VBQ0EsU0FBQTtFQUNBLHlCQUFBO0VBQ0EsZ0JBQUE7QUFpQk47O0FBZkk7RUFDRSx5Q0FBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FBa0JOOztBQWZJO0VBQW1CLGdCQUFBO0VBQWtCLFNBQUE7RUFBVyxpQkFBQTtBQXFCcEQ7O0FBcEJJO0VBQWdCLG1CQUFBO0FBd0JwQjs7QUF0Qkk7RUFBbUIsYUFBQTtFQUFlLHNCQUFBO0VBQXdCLFNBQUE7QUE0QjlEOztBQTNCSTtFQUFjLGFBQUE7RUFBZSxzQkFBQTtFQUF3QixTQUFBO0FBaUN6RDs7QUFoQ0k7RUFBZ0IsZUFBQTtFQUFpQiw0Q0FBQTtBQXFDckM7O0FBcENJO0VBQWEsZ0JBQUE7RUFBa0Isa0JBQUE7QUF5Q25DOztBQXhDSTtFQUFnQixhQUFBO0VBQWUsOEJBQUE7RUFBZ0MscUNBQUE7QUE4Q25FOztBQTVDSTtFQUFrQix5Q0FBQTtFQUF3QyxpQkFBQTtBQWlEOUQ7O0FBaERJO0VBQWEsYUFBQTtFQUFlLDhCQUFBO0VBQWdDLGtCQUFBO0FBc0RoRTs7QUFyREk7RUFBbUIsZ0JBQUE7RUFBa0IsZUFBQTtFQUFpQixjQUFBO0FBMkQxRDs7QUF6REk7RUFBMkIsZUFBQTtBQTZEL0I7O0FBNURJO0VBQTBCLHFDQUFBO0VBQXNDLGdCQUFBO0FBaUVwRTs7QUEvREk7RUFDRTtJQUNFLDBCQUFBO0lBQ0EsU0FBQTtJQUNBLGFBQUE7RUFrRU47RUFoRUk7SUFDRSxnQkFBQTtJQUNBLFNBQUE7RUFrRU47RUFoRUk7SUFBWSxzQkFBQTtFQW1FaEI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5jaGVja291dC1sYXlvdXQgeyBcbiAgICAgIGRpc3BsYXk6IGdyaWQ7IFxuICAgICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMzYwcHg7IFxuICAgICAgZ2FwOiAyNHB4OyBcbiAgICAgIG1heC13aWR0aDogMTIwMHB4OyBcbiAgICAgIG1hcmdpbjogMCBhdXRvOyBcbiAgICAgIHBhZGRpbmc6IDI0cHg7IFxuICAgIH1cblxuICAgIC5jaGVja291dC1tYWluIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgfVxuICAgIC5jaGVja291dC1jYXJkIHsgYm9yZGVyLXJhZGl1czogMTJweDsgfVxuXG4gICAgLmZvcm0tcm93IHsgZGlzcGxheTogZmxleDsgZ2FwOiAxNnB4OyB9XG4gICAgLmZ1bGwtd2lkdGggeyB3aWR0aDogMTAwJTsgbWFyZ2luLWJvdHRvbTogMTZweDsgfVxuICAgIC5oYWxmLXdpZHRoIHsgZmxleDogMTsgbWFyZ2luLWJvdHRvbTogMTZweDsgfVxuXG4gICAgLnN0ZXAtYWN0aW9ucyB7IFxuICAgICAgZGlzcGxheTogZmxleDsgXG4gICAgICBnYXA6IDE2cHg7IFxuICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDsgXG4gICAgICBtYXJnaW4tdG9wOiAyNHB4OyBcbiAgICB9XG4gICAgLnN0ZXAtYWN0aW9ucyAuY3RhIHsgXG4gICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1icmFuZC1wcmltYXJ5LCNGRkVBMDApOyBcbiAgICAgIGNvbG9yOiAjMUIxQjFCOyBcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7IFxuICAgICAgYm9yZGVyLXJhZGl1czogMTJweDsgXG4gICAgfVxuXG4gICAgLnN1bW1hcnktc2lkZWJhciB7IHBvc2l0aW9uOiBzdGlja3k7IHRvcDogMjRweDsgYWxpZ24tc2VsZjogc3RhcnQ7IH1cbiAgICAuc3VtbWFyeS1jYXJkIHsgYm9yZGVyLXJhZGl1czogMTJweDsgfVxuICAgIFxuICAgIC5zdW1tYXJ5LWNvbnRlbnQgeyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBnYXA6IDE2cHg7IH1cbiAgICAuaXRlbXMtbGlzdCB7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IGdhcDogMTJweDsgfVxuICAgIC5zdW1tYXJ5LWl0ZW0geyBwYWRkaW5nOiAxMnB4IDA7IGJvcmRlci1ib3R0b206IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMDgpOyB9XG4gICAgLml0ZW0tbmFtZSB7IGZvbnQtd2VpZ2h0OiA2MDA7IG1hcmdpbi1ib3R0b206IDRweDsgfVxuICAgIC5pdGVtLWRldGFpbHMgeyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSwjNkE2QTZBKTsgfVxuICAgIFxuICAgIC5zdW1tYXJ5LXRvdGFscyB7IGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMTIpOyBwYWRkaW5nLXRvcDogMTZweDsgfVxuICAgIC50b3RhbC1yb3cgeyBkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IG1hcmdpbi1ib3R0b206IDhweDsgfVxuICAgIC50b3RhbC1yb3cuZmluYWwgeyBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDE4cHg7IGNvbG9yOiAjMUIxQjFCOyB9XG5cbiAgICAuY29uZmlybWF0aW9uLWNvbnRlbnQgaDMgeyBtYXJnaW46IDAgMCA4cHg7IH1cbiAgICAuY29uZmlybWF0aW9uLWNvbnRlbnQgcCB7IGNvbG9yOiB2YXIoLS10ZXh0LXNlY29uZGFyeSwjNkE2QTZBKTsgbWFyZ2luOiAwIDAgMTZweDsgfVxuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDEwMjRweCkge1xuICAgICAgLmNoZWNrb3V0LWxheW91dCB7IFxuICAgICAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDFmcjsgXG4gICAgICAgIGdhcDogMTZweDsgXG4gICAgICAgIHBhZGRpbmc6IDE2cHg7IFxuICAgICAgfVxuICAgICAgLnN1bW1hcnktc2lkZWJhciB7IFxuICAgICAgICBwb3NpdGlvbjogc3RhdGljOyBcbiAgICAgICAgb3JkZXI6IC0xOyBcbiAgICAgIH1cbiAgICAgIC5mb3JtLXJvdyB7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ }),

/***/ 3985:
/*!********************************************************!*\
  !*** ./node_modules/@angular/cdk/fesm2022/stepper.mjs ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CdkStep: () => (/* binding */ CdkStep),
/* harmony export */   CdkStepHeader: () => (/* binding */ CdkStepHeader),
/* harmony export */   CdkStepLabel: () => (/* binding */ CdkStepLabel),
/* harmony export */   CdkStepper: () => (/* binding */ CdkStepper),
/* harmony export */   CdkStepperModule: () => (/* binding */ CdkStepperModule),
/* harmony export */   CdkStepperNext: () => (/* binding */ CdkStepperNext),
/* harmony export */   CdkStepperPrevious: () => (/* binding */ CdkStepperPrevious),
/* harmony export */   STEPPER_GLOBAL_OPTIONS: () => (/* binding */ STEPPER_GLOBAL_OPTIONS),
/* harmony export */   STEP_STATE: () => (/* binding */ STEP_STATE),
/* harmony export */   StepperSelectionEvent: () => (/* binding */ StepperSelectionEvent)
/* harmony export */ });
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/a11y */ 2102);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/cdk/bidi */ 3680);
/* harmony import */ var _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/cdk/keycodes */ 4879);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/cdk/platform */ 7699);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 3037);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 3900);









const _c0 = ["*"];
function CdkStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
  }
}
class CdkStepHeader {
  constructor(_elementRef) {
    this._elementRef = _elementRef;
  }
  /** Focuses the step header. */
  focus() {
    this._elementRef.nativeElement.focus();
  }
  static {
    this.ɵfac = function CdkStepHeader_Factory(t) {
      return new (t || CdkStepHeader)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: CdkStepHeader,
      selectors: [["", "cdkStepHeader", ""]],
      hostAttrs: ["role", "tab"],
      standalone: true
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkStepHeader, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[cdkStepHeader]',
      host: {
        'role': 'tab'
      },
      standalone: true
    }]
  }], () => [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
  }], null);
})();
class CdkStepLabel {
  constructor(/** @docs-private */template) {
    this.template = template;
  }
  static {
    this.ɵfac = function CdkStepLabel_Factory(t) {
      return new (t || CdkStepLabel)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: CdkStepLabel,
      selectors: [["", "cdkStepLabel", ""]],
      standalone: true
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkStepLabel, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[cdkStepLabel]',
      standalone: true
    }]
  }], () => [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef
  }], null);
})();

/** Used to generate unique ID for each stepper component. */
let nextId = 0;
/** Change event emitted on selection changes. */
class StepperSelectionEvent {}
/** Enum to represent the different states of the steps. */
const STEP_STATE = {
  NUMBER: 'number',
  EDIT: 'edit',
  DONE: 'done',
  ERROR: 'error'
};
/** InjectionToken that can be used to specify the global stepper options. */
const STEPPER_GLOBAL_OPTIONS = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken('STEPPER_GLOBAL_OPTIONS');
class CdkStep {
  /** Whether step is marked as completed. */
  get completed() {
    return this._completedOverride == null ? this._getDefaultCompleted() : this._completedOverride;
  }
  set completed(value) {
    this._completedOverride = value;
  }
  _getDefaultCompleted() {
    return this.stepControl ? this.stepControl.valid && this.interacted : this.interacted;
  }
  /** Whether step has an error. */
  get hasError() {
    return this._customError == null ? this._getDefaultError() : this._customError;
  }
  set hasError(value) {
    this._customError = value;
  }
  _getDefaultError() {
    return this.stepControl && this.stepControl.invalid && this.interacted;
  }
  constructor(_stepper, stepperOptions) {
    this._stepper = _stepper;
    /** Whether user has attempted to move away from the step. */
    this.interacted = false;
    /** Emits when the user has attempted to move away from the step. */
    this.interactedStream = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Whether the user can return to this step once it has been marked as completed. */
    this.editable = true;
    /** Whether the completion of step is optional. */
    this.optional = false;
    this._completedOverride = null;
    this._customError = null;
    this._stepperOptions = stepperOptions ? stepperOptions : {};
    this._displayDefaultIndicatorType = this._stepperOptions.displayDefaultIndicatorType !== false;
  }
  /** Selects this step component. */
  select() {
    this._stepper.selected = this;
  }
  /** Resets the step to its initial state. Note that this includes resetting form data. */
  reset() {
    this.interacted = false;
    if (this._completedOverride != null) {
      this._completedOverride = false;
    }
    if (this._customError != null) {
      this._customError = false;
    }
    if (this.stepControl) {
      this.stepControl.reset();
    }
  }
  ngOnChanges() {
    // Since basically all inputs of the MatStep get proxied through the view down to the
    // underlying MatStepHeader, we have to make sure that change detection runs correctly.
    this._stepper._stateChanged();
  }
  _markAsInteracted() {
    if (!this.interacted) {
      this.interacted = true;
      this.interactedStream.emit(this);
    }
  }
  /** Determines whether the error state can be shown. */
  _showError() {
    // We want to show the error state either if the user opted into/out of it using the
    // global options, or if they've explicitly set it through the `hasError` input.
    return this._stepperOptions.showError ?? this._customError != null;
  }
  static {
    this.ɵfac = function CdkStep_Factory(t) {
      return new (t || CdkStep)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"]((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CdkStepper)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](STEPPER_GLOBAL_OPTIONS, 8));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: CdkStep,
      selectors: [["cdk-step"]],
      contentQueries: function CdkStep_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, CdkStepLabel, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.stepLabel = _t.first);
        }
      },
      viewQuery: function CdkStep_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef, 7);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.content = _t.first);
        }
      },
      inputs: {
        stepControl: "stepControl",
        label: "label",
        errorMessage: "errorMessage",
        ariaLabel: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None, "aria-label", "ariaLabel"],
        ariaLabelledby: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None, "aria-labelledby", "ariaLabelledby"],
        state: "state",
        editable: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "editable", "editable", _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute],
        optional: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "optional", "optional", _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute],
        completed: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "completed", "completed", _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute],
        hasError: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "hasError", "hasError", _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute]
      },
      outputs: {
        interactedStream: "interacted"
      },
      exportAs: ["cdkStep"],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputTransformsFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵNgOnChangesFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      template: function CdkStep_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, CdkStep_ng_template_0_Template, 1, 0, "ng-template");
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkStep, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'cdk-step',
      exportAs: 'cdkStep',
      template: '<ng-template><ng-content></ng-content></ng-template>',
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], () => [{
    type: CdkStepper,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => CdkStepper)]
    }]
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [STEPPER_GLOBAL_OPTIONS]
    }]
  }], {
    stepLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [CdkStepLabel]
    }],
    content: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,
      args: [_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef, {
        static: true
      }]
    }],
    stepControl: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    interactedStream: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output,
      args: ['interacted']
    }],
    label: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    errorMessage: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    ariaLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['aria-label']
    }],
    ariaLabelledby: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['aria-labelledby']
    }],
    state: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    editable: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute
      }]
    }],
    optional: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute
      }]
    }],
    completed: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute
      }]
    }],
    hasError: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute
      }]
    }]
  });
})();
class CdkStepper {
  /** The index of the selected step. */
  get selectedIndex() {
    return this._selectedIndex;
  }
  set selectedIndex(index) {
    if (this.steps && this._steps) {
      // Ensure that the index can't be out of bounds.
      if (!this._isValidIndex(index) && (typeof ngDevMode === 'undefined' || ngDevMode)) {
        throw Error('cdkStepper: Cannot assign out-of-bounds value to `selectedIndex`.');
      }
      this.selected?._markAsInteracted();
      if (this._selectedIndex !== index && !this._anyControlsInvalidOrPending(index) && (index >= this._selectedIndex || this.steps.toArray()[index].editable)) {
        this._updateSelectedItemIndex(index);
      }
    } else {
      this._selectedIndex = index;
    }
  }
  /** The step that is selected. */
  get selected() {
    return this.steps ? this.steps.toArray()[this.selectedIndex] : undefined;
  }
  set selected(step) {
    this.selectedIndex = step && this.steps ? this.steps.toArray().indexOf(step) : -1;
  }
  /** Orientation of the stepper. */
  get orientation() {
    return this._orientation;
  }
  set orientation(value) {
    // This is a protected method so that `MatStepper` can hook into it.
    this._orientation = value;
    if (this._keyManager) {
      this._keyManager.withVerticalOrientation(value === 'vertical');
    }
  }
  constructor(_dir, _changeDetectorRef, _elementRef) {
    this._dir = _dir;
    this._changeDetectorRef = _changeDetectorRef;
    this._elementRef = _elementRef;
    /** Emits when the component is destroyed. */
    this._destroyed = new rxjs__WEBPACK_IMPORTED_MODULE_1__.Subject();
    /** Steps that belong to the current stepper, excluding ones from nested steppers. */
    this.steps = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.QueryList();
    /** List of step headers sorted based on their DOM order. */
    this._sortedHeaders = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.QueryList();
    /** Whether the validity of previous steps should be checked or not. */
    this.linear = false;
    this._selectedIndex = 0;
    /** Event emitted when the selected step has changed. */
    this.selectionChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /** Output to support two-way binding on `[(selectedIndex)]` */
    this.selectedIndexChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    this._orientation = 'horizontal';
    this._groupId = nextId++;
  }
  ngAfterContentInit() {
    this._steps.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.startWith)(this._steps), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._destroyed)).subscribe(steps => {
      this.steps.reset(steps.filter(step => step._stepper === this));
      this.steps.notifyOnChanges();
    });
  }
  ngAfterViewInit() {
    // If the step headers are defined outside of the `ngFor` that renders the steps, like in the
    // Material stepper, they won't appear in the `QueryList` in the same order as they're
    // rendered in the DOM which will lead to incorrect keyboard navigation. We need to sort
    // them manually to ensure that they're correct. Alternatively, we can change the Material
    // template to inline the headers in the `ngFor`, but that'll result in a lot of
    // code duplication. See #23539.
    this._stepHeader.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.startWith)(this._stepHeader), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._destroyed)).subscribe(headers => {
      this._sortedHeaders.reset(headers.toArray().sort((a, b) => {
        const documentPosition = a._elementRef.nativeElement.compareDocumentPosition(b._elementRef.nativeElement);
        // `compareDocumentPosition` returns a bitmask so we have to use a bitwise operator.
        // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
        // tslint:disable-next-line:no-bitwise
        return documentPosition & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      }));
      this._sortedHeaders.notifyOnChanges();
    });
    // Note that while the step headers are content children by default, any components that
    // extend this one might have them as view children. We initialize the keyboard handling in
    // AfterViewInit so we're guaranteed for both view and content children to be defined.
    this._keyManager = new _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.FocusKeyManager(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation === 'vertical');
    (this._dir ? this._dir.change : (0,rxjs__WEBPACK_IMPORTED_MODULE_5__.of)()).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.startWith)(this._layoutDirection()), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.takeUntil)(this._destroyed)).subscribe(direction => this._keyManager.withHorizontalOrientation(direction));
    this._keyManager.updateActiveItem(this._selectedIndex);
    // No need to `takeUntil` here, because we're the ones destroying `steps`.
    this.steps.changes.subscribe(() => {
      if (!this.selected) {
        this._selectedIndex = Math.max(this._selectedIndex - 1, 0);
      }
    });
    // The logic which asserts that the selected index is within bounds doesn't run before the
    // steps are initialized, because we don't how many steps there are yet so we may have an
    // invalid index on init. If that's the case, auto-correct to the default so we don't throw.
    if (!this._isValidIndex(this._selectedIndex)) {
      this._selectedIndex = 0;
    }
  }
  ngOnDestroy() {
    this._keyManager?.destroy();
    this.steps.destroy();
    this._sortedHeaders.destroy();
    this._destroyed.next();
    this._destroyed.complete();
  }
  /** Selects and focuses the next step in list. */
  next() {
    this.selectedIndex = Math.min(this._selectedIndex + 1, this.steps.length - 1);
  }
  /** Selects and focuses the previous step in list. */
  previous() {
    this.selectedIndex = Math.max(this._selectedIndex - 1, 0);
  }
  /** Resets the stepper to its initial state. Note that this includes clearing form data. */
  reset() {
    this._updateSelectedItemIndex(0);
    this.steps.forEach(step => step.reset());
    this._stateChanged();
  }
  /** Returns a unique id for each step label element. */
  _getStepLabelId(i) {
    return `cdk-step-label-${this._groupId}-${i}`;
  }
  /** Returns unique id for each step content element. */
  _getStepContentId(i) {
    return `cdk-step-content-${this._groupId}-${i}`;
  }
  /** Marks the component to be change detected. */
  _stateChanged() {
    this._changeDetectorRef.markForCheck();
  }
  /** Returns position state of the step with the given index. */
  _getAnimationDirection(index) {
    const position = index - this._selectedIndex;
    if (position < 0) {
      return this._layoutDirection() === 'rtl' ? 'next' : 'previous';
    } else if (position > 0) {
      return this._layoutDirection() === 'rtl' ? 'previous' : 'next';
    }
    return 'current';
  }
  /** Returns the type of icon to be displayed. */
  _getIndicatorType(index, state = STEP_STATE.NUMBER) {
    const step = this.steps.toArray()[index];
    const isCurrentStep = this._isCurrentStep(index);
    return step._displayDefaultIndicatorType ? this._getDefaultIndicatorLogic(step, isCurrentStep) : this._getGuidelineLogic(step, isCurrentStep, state);
  }
  _getDefaultIndicatorLogic(step, isCurrentStep) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (!step.completed || isCurrentStep) {
      return STEP_STATE.NUMBER;
    } else {
      return step.editable ? STEP_STATE.EDIT : STEP_STATE.DONE;
    }
  }
  _getGuidelineLogic(step, isCurrentStep, state = STEP_STATE.NUMBER) {
    if (step._showError() && step.hasError && !isCurrentStep) {
      return STEP_STATE.ERROR;
    } else if (step.completed && !isCurrentStep) {
      return STEP_STATE.DONE;
    } else if (step.completed && isCurrentStep) {
      return state;
    } else if (step.editable && isCurrentStep) {
      return STEP_STATE.EDIT;
    } else {
      return state;
    }
  }
  _isCurrentStep(index) {
    return this._selectedIndex === index;
  }
  /** Returns the index of the currently-focused step header. */
  _getFocusIndex() {
    return this._keyManager ? this._keyManager.activeItemIndex : this._selectedIndex;
  }
  _updateSelectedItemIndex(newIndex) {
    const stepsArray = this.steps.toArray();
    this.selectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this._selectedIndex,
      selectedStep: stepsArray[newIndex],
      previouslySelectedStep: stepsArray[this._selectedIndex]
    });
    // If focus is inside the stepper, move it to the next header, otherwise it may become
    // lost when the active step content is hidden. We can't be more granular with the check
    // (e.g. checking whether focus is inside the active step), because we don't have a
    // reference to the elements that are rendering out the content.
    this._containsFocus() ? this._keyManager.setActiveItem(newIndex) : this._keyManager.updateActiveItem(newIndex);
    this._selectedIndex = newIndex;
    this.selectedIndexChange.emit(this._selectedIndex);
    this._stateChanged();
  }
  _onKeydown(event) {
    const hasModifier = (0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__.hasModifierKey)(event);
    const keyCode = event.keyCode;
    const manager = this._keyManager;
    if (manager.activeItemIndex != null && !hasModifier && (keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__.SPACE || keyCode === _angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_6__.ENTER)) {
      this.selectedIndex = manager.activeItemIndex;
      event.preventDefault();
    } else {
      manager.setFocusOrigin('keyboard').onKeydown(event);
    }
  }
  _anyControlsInvalidOrPending(index) {
    if (this.linear && index >= 0) {
      return this.steps.toArray().slice(0, index).some(step => {
        const control = step.stepControl;
        const isIncomplete = control ? control.invalid || control.pending || !step.interacted : !step.completed;
        return isIncomplete && !step.optional && !step._completedOverride;
      });
    }
    return false;
  }
  _layoutDirection() {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }
  /** Checks whether the stepper contains the focused element. */
  _containsFocus() {
    const stepperElement = this._elementRef.nativeElement;
    const focusedElement = (0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_7__._getFocusedElementPierceShadowDom)();
    return stepperElement === focusedElement || stepperElement.contains(focusedElement);
  }
  /** Checks whether the passed-in index is a valid step index. */
  _isValidIndex(index) {
    return index > -1 && (!this.steps || index < this.steps.length);
  }
  static {
    this.ɵfac = function CdkStepper_Factory(t) {
      return new (t || CdkStepper)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: CdkStepper,
      selectors: [["", "cdkStepper", ""]],
      contentQueries: function CdkStepper_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, CdkStep, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, CdkStepHeader, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._steps = _t);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._stepHeader = _t);
        }
      },
      inputs: {
        linear: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "linear", "linear", _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute],
        selectedIndex: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].HasDecoratorInputTransform, "selectedIndex", "selectedIndex", _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute],
        selected: "selected",
        orientation: "orientation"
      },
      outputs: {
        selectionChange: "selectionChange",
        selectedIndexChange: "selectedIndexChange"
      },
      exportAs: ["cdkStepper"],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputTransformsFeature"]]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkStepper, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[cdkStepper]',
      exportAs: 'cdkStepper',
      standalone: true
    }]
  }], () => [{
    type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.Directionality,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
    }]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
  }], {
    _steps: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [CdkStep, {
        descendants: true
      }]
    }],
    _stepHeader: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [CdkStepHeader, {
        descendants: true
      }]
    }],
    linear: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.booleanAttribute
      }]
    }],
    selectedIndex: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: [{
        transform: _angular_core__WEBPACK_IMPORTED_MODULE_0__.numberAttribute
      }]
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selectionChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    selectedIndexChange: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    orientation: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/** Button that moves to the next step in a stepper workflow. */
class CdkStepperNext {
  constructor(_stepper) {
    this._stepper = _stepper;
    /** Type of the next button. Defaults to "submit" if not specified. */
    this.type = 'submit';
  }
  static {
    this.ɵfac = function CdkStepperNext_Factory(t) {
      return new (t || CdkStepperNext)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CdkStepper));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: CdkStepperNext,
      selectors: [["button", "cdkStepperNext", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperNext_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CdkStepperNext_click_HostBindingHandler() {
            return ctx._stepper.next();
          });
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkStepperNext, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'button[cdkStepperNext]',
      host: {
        '[type]': 'type',
        '(click)': '_stepper.next()'
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
/** Button that moves to the previous step in a stepper workflow. */
class CdkStepperPrevious {
  constructor(_stepper) {
    this._stepper = _stepper;
    /** Type of the previous button. Defaults to "button" if not specified. */
    this.type = 'button';
  }
  static {
    this.ɵfac = function CdkStepperPrevious_Factory(t) {
      return new (t || CdkStepperPrevious)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](CdkStepper));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: CdkStepperPrevious,
      selectors: [["button", "cdkStepperPrevious", ""]],
      hostVars: 1,
      hostBindings: function CdkStepperPrevious_HostBindings(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CdkStepperPrevious_click_HostBindingHandler() {
            return ctx._stepper.previous();
          });
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("type", ctx.type);
        }
      },
      inputs: {
        type: "type"
      },
      standalone: true
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkStepperPrevious, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'button[cdkStepperPrevious]',
      host: {
        '[type]': 'type',
        '(click)': '_stepper.previous()'
      },
      standalone: true
    }]
  }], () => [{
    type: CdkStepper
  }], {
    type: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
class CdkStepperModule {
  static {
    this.ɵfac = function CdkStepperModule_Factory(t) {
      return new (t || CdkStepperModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: CdkStepperModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.BidiModule]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CdkStepperModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_8__.BidiModule, CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious],
      exports: [CdkStep, CdkStepper, CdkStepHeader, CdkStepLabel, CdkStepperNext, CdkStepperPrevious]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ }),

/***/ 6622:
/*!*************************************************************!*\
  !*** ./node_modules/@angular/material/fesm2022/stepper.mjs ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MAT_STEPPER_INTL_PROVIDER: () => (/* binding */ MAT_STEPPER_INTL_PROVIDER),
/* harmony export */   MAT_STEPPER_INTL_PROVIDER_FACTORY: () => (/* binding */ MAT_STEPPER_INTL_PROVIDER_FACTORY),
/* harmony export */   MatStep: () => (/* binding */ MatStep),
/* harmony export */   MatStepContent: () => (/* binding */ MatStepContent),
/* harmony export */   MatStepHeader: () => (/* binding */ MatStepHeader),
/* harmony export */   MatStepLabel: () => (/* binding */ MatStepLabel),
/* harmony export */   MatStepper: () => (/* binding */ MatStepper),
/* harmony export */   MatStepperIcon: () => (/* binding */ MatStepperIcon),
/* harmony export */   MatStepperIntl: () => (/* binding */ MatStepperIntl),
/* harmony export */   MatStepperModule: () => (/* binding */ MatStepperModule),
/* harmony export */   MatStepperNext: () => (/* binding */ MatStepperNext),
/* harmony export */   MatStepperPrevious: () => (/* binding */ MatStepperPrevious),
/* harmony export */   matStepperAnimations: () => (/* binding */ matStepperAnimations)
/* harmony export */ });
/* harmony import */ var _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/cdk/portal */ 9168);
/* harmony import */ var _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/cdk/stepper */ 3985);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/core */ 4646);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/cdk/a11y */ 2102);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ 819);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 2510);
/* harmony import */ var _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/cdk/bidi */ 3680);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 6647);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! rxjs/operators */ 3037);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 3900);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 1817);
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/animations */ 7172);
/* harmony import */ var _angular_cdk_platform__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/cdk/platform */ 7699);














function MatStepHeader_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 2);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx_r0.iconOverrides[ctx_r0.state])("ngTemplateOutletContext", ctx_r0._getIconContext());
  }
}
function MatStepHeader_Conditional_4_Case_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._intl.completedLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._intl.editableLabel);
  }
}
function MatStepHeader_Conditional_4_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatStepHeader_Conditional_4_Case_1_Conditional_0_Template, 2, 1, "span", 8)(1, MatStepHeader_Conditional_4_Case_1_Conditional_1_Template, 2, 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](0, ctx_r0.state === "done" ? 0 : ctx_r0.state === "edit" ? 1 : -1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._getDefaultTextForState(ctx_r0.state));
  }
}
function MatStepHeader_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatStepHeader_Conditional_4_Case_0_Template, 2, 1)(1, MatStepHeader_Conditional_4_Case_1_Template, 4, 2);
  }
  if (rf & 2) {
    let tmp_1_0;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](0, (tmp_1_0 = ctx_r0.state) === "number" ? 0 : 1);
  }
}
function MatStepHeader_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", ctx.template);
  }
}
function MatStepHeader_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.label);
  }
}
function MatStepHeader_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0._intl.optionalLabel);
  }
}
function MatStepHeader_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r0.errorMessage);
  }
}
const _c0 = ["*"];
function MatStep_ng_template_0_ng_template_1_Template(rf, ctx) {}
function MatStep_ng_template_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatStep_ng_template_0_ng_template_1_Template, 0, 0, "ng-template", 0);
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("cdkPortalOutlet", ctx_r0._portal);
  }
}
const _c1 = (a0, a1) => ({
  step: a0,
  i: a1
});
const _c2 = a0 => ({
  "animationDuration": a0
});
const _c3 = (a0, a1) => ({
  "value": a0,
  "params": a1
});
function MatStepper_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](0);
  }
}
function MatStepper_Case_1_For_3_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 6);
  }
}
function MatStepper_Case_1_For_3_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, MatStepper_Case_1_For_3_Conditional_1_Template, 1, 0, "div", 6);
  }
  if (rf & 2) {
    const step_r1 = ctx.$implicit;
    const i_r2 = ctx.$index;
    const ɵi_8_r3 = ctx.$index;
    const ɵ$count_8_r4 = ctx.$count;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const stepTemplate_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", stepTemplate_r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](3, _c1, step_r1, i_r2));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](1, !(ɵi_8_r3 === ɵ$count_8_r4 - 1) ? 1 : -1);
  }
}
function MatStepper_Case_1_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("@horizontalStepTransition.done", function MatStepper_Case_1_For_6_Template_div_animation_horizontalStepTransition_done_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r6);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6._animationDone.next($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const step_r8 = ctx.$implicit;
    const i_r9 = ctx.$index;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-horizontal-stepper-content-inactive", ctx_r6.selectedIndex !== i_r9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@horizontalStepTransition", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](8, _c3, ctx_r6._getAnimationDirection(i_r9), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](6, _c2, ctx_r6._getAnimationDuration())))("id", ctx_r6._getStepContentId(i_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-labelledby", ctx_r6._getStepLabelId(i_r9));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", step_r8.content);
  }
}
function MatStepper_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1)(1, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeaterCreate"](2, MatStepper_Case_1_For_3_Template, 2, 6, null, null, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeaterCreate"](5, MatStepper_Case_1_For_6_Template, 2, 11, "div", 4, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeaterTrackByIdentity"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeater"](ctx_r6.steps);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeater"](ctx_r6.steps);
  }
}
function MatStepper_Case_2_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 10)(3, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("@verticalStepTransition.done", function MatStepper_Case_2_For_1_Template_div_animation_verticalStepTransition_done_3_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r10);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6._animationDone.next($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](5, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()()();
  }
  if (rf & 2) {
    const step_r11 = ctx.$implicit;
    const i_r12 = ctx.$index;
    const ɵi_22_r13 = ctx.$index;
    const ɵ$count_22_r14 = ctx.$count;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    const stepTemplate_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", stepTemplate_r5)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](10, _c1, step_r11, i_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-stepper-vertical-line", !(ɵi_22_r13 === ɵ$count_22_r14 - 1));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-vertical-stepper-content-inactive", ctx_r6.selectedIndex !== i_r12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@verticalStepTransition", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](15, _c3, ctx_r6._getAnimationDirection(i_r12), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](13, _c2, ctx_r6._getAnimationDuration())))("id", ctx_r6._getStepContentId(i_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-labelledby", ctx_r6._getStepLabelId(i_r12));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", step_r11.content);
  }
}
function MatStepper_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeaterCreate"](0, MatStepper_Case_2_For_1_Template, 6, 18, "div", 9, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeaterTrackByIdentity"]);
  }
  if (rf & 2) {
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrepeater"](ctx_r6.steps);
  }
}
function MatStepper_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-step-header", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function MatStepper_ng_template_3_Template_mat_step_header_click_0_listener() {
      const step_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15).step;
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](step_r16.select());
    })("keydown", function MatStepper_ng_template_3_Template_mat_step_header_keydown_0_listener($event) {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15);
      const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx_r6._onKeydown($event));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const step_r16 = ctx.step;
    const i_r17 = ctx.i;
    const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-horizontal-stepper-header", ctx_r6.orientation === "horizontal")("mat-vertical-stepper-header", ctx_r6.orientation === "vertical");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("tabIndex", ctx_r6._getFocusIndex() === i_r17 ? 0 : -1)("id", ctx_r6._getStepLabelId(i_r17))("index", i_r17)("state", ctx_r6._getIndicatorType(i_r17, step_r16.state))("label", step_r16.stepLabel || step_r16.label)("selected", ctx_r6.selectedIndex === i_r17)("active", ctx_r6._stepIsNavigable(i_r17, step_r16))("optional", step_r16.optional)("errorMessage", step_r16.errorMessage)("iconOverrides", ctx_r6._iconOverrides)("disableRipple", ctx_r6.disableRipple || !ctx_r6._stepIsNavigable(i_r17, step_r16))("color", step_r16.color || ctx_r6.color);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-posinset", i_r17 + 1)("aria-setsize", ctx_r6.steps.length)("aria-controls", ctx_r6._getStepContentId(i_r17))("aria-selected", ctx_r6.selectedIndex == i_r17)("aria-label", step_r16.ariaLabel || null)("aria-labelledby", !step_r16.ariaLabel && step_r16.ariaLabelledby ? step_r16.ariaLabelledby : null)("aria-disabled", ctx_r6._stepIsNavigable(i_r17, step_r16) ? null : true);
  }
}
class MatStepLabel extends _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepLabel {
  static {
    this.ɵfac = /* @__PURE__ */(() => {
      let ɵMatStepLabel_BaseFactory;
      return function MatStepLabel_Factory(t) {
        return (ɵMatStepLabel_BaseFactory || (ɵMatStepLabel_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatStepLabel)))(t || MatStepLabel);
      };
    })();
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: MatStepLabel,
      selectors: [["", "matStepLabel", ""]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepLabel, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: '[matStepLabel]',
      standalone: true
    }]
  }], null, null);
})();

/** Stepper data that is required for internationalization. */
class MatStepperIntl {
  constructor() {
    /**
     * Stream that emits whenever the labels here are changed. Use this to notify
     * components if the labels have changed after initialization.
     */
    this.changes = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    /** Label that is rendered below optional steps. */
    this.optionalLabel = 'Optional';
    /** Label that is used to indicate step as completed to screen readers. */
    this.completedLabel = 'Completed';
    /** Label that is used to indicate step as editable to screen readers. */
    this.editableLabel = 'Editable';
  }
  static {
    this.ɵfac = function MatStepperIntl_Factory(t) {
      return new (t || MatStepperIntl)();
    };
  }
  static {
    this.ɵprov = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: MatStepperIntl,
      factory: MatStepperIntl.ɵfac,
      providedIn: 'root'
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepperIntl, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }], null, null);
})();
/** @docs-private */
function MAT_STEPPER_INTL_PROVIDER_FACTORY(parentIntl) {
  return parentIntl || new MatStepperIntl();
}
/** @docs-private */
const MAT_STEPPER_INTL_PROVIDER = {
  provide: MatStepperIntl,
  deps: [[new _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional(), new _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf(), MatStepperIntl]],
  useFactory: MAT_STEPPER_INTL_PROVIDER_FACTORY
};
class MatStepHeader extends _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepHeader {
  constructor(_intl, _focusMonitor, _elementRef, changeDetectorRef) {
    super(_elementRef);
    this._intl = _intl;
    this._focusMonitor = _focusMonitor;
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }
  ngAfterViewInit() {
    this._focusMonitor.monitor(this._elementRef, true);
  }
  ngOnDestroy() {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }
  /** Focuses the step header. */
  focus(origin, options) {
    if (origin) {
      this._focusMonitor.focusVia(this._elementRef, origin, options);
    } else {
      this._elementRef.nativeElement.focus(options);
    }
  }
  /** Returns string label of given step if it is a text label. */
  _stringLabel() {
    return this.label instanceof MatStepLabel ? null : this.label;
  }
  /** Returns MatStepLabel if the label of given step is a template label. */
  _templateLabel() {
    return this.label instanceof MatStepLabel ? this.label : null;
  }
  /** Returns the host HTML element. */
  _getHostElement() {
    return this._elementRef.nativeElement;
  }
  /** Template context variables that are exposed to the `matStepperIcon` instances. */
  _getIconContext() {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional
    };
  }
  _getDefaultTextForState(state) {
    if (state == 'number') {
      return `${this.index + 1}`;
    }
    if (state == 'edit') {
      return 'create';
    }
    if (state == 'error') {
      return 'warning';
    }
    return state;
  }
  static {
    this.ɵfac = function MatStepHeader_Factory(t) {
      return new (t || MatStepHeader)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](MatStepperIntl), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusMonitor), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: MatStepHeader,
      selectors: [["mat-step-header"]],
      hostAttrs: ["role", "tab", 1, "mat-step-header"],
      hostVars: 2,
      hostBindings: function MatStepHeader_HostBindings(rf, ctx) {
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMap"]("mat-" + (ctx.color || "primary"));
        }
      },
      inputs: {
        state: "state",
        label: "label",
        errorMessage: "errorMessage",
        iconOverrides: "iconOverrides",
        index: "index",
        selected: "selected",
        active: "active",
        optional: "optional",
        disableRipple: "disableRipple",
        color: "color"
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 10,
      vars: 17,
      consts: [["matRipple", "", 1, "mat-step-header-ripple", "mat-focus-indicator", 3, "matRippleTrigger", "matRippleDisabled"], [1, "mat-step-icon-content"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-step-label"], [1, "mat-step-text-label"], [1, "mat-step-optional"], [1, "mat-step-sub-label-error"], ["aria-hidden", "true"], [1, "cdk-visually-hidden"], [3, "ngTemplateOutlet"]],
      template: function MatStepHeader_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div")(2, "div", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, MatStepHeader_Conditional_3_Template, 1, 2, "ng-container", 2)(4, MatStepHeader_Conditional_4_Template, 2, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, MatStepHeader_Conditional_6_Template, 2, 1, "div", 4)(7, MatStepHeader_Conditional_7_Template, 2, 1)(8, MatStepHeader_Conditional_8_Template, 2, 1, "div", 5)(9, MatStepHeader_Conditional_9_Template, 2, 1, "div", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
        if (rf & 2) {
          let tmp_8_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRippleTrigger", ctx._getHostElement())("matRippleDisabled", ctx.disableRipple);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassMapInterpolate1"]("mat-step-icon-state-", ctx.state, " mat-step-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-step-icon-selected", ctx.selected);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](3, ctx.iconOverrides && ctx.iconOverrides[ctx.state] ? 3 : 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-step-label-active", ctx.active)("mat-step-label-selected", ctx.selected)("mat-step-label-error", ctx.state == "error");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](6, (tmp_8_0 = ctx._templateLabel()) ? 6 : ctx._stringLabel() ? 7 : -1, tmp_8_0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](8, ctx.optional && ctx.state != "error" ? 8 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](9, ctx.state === "error" ? 9 : -1);
        }
      },
      dependencies: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatRipple, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon],
      styles: [".mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:\"\"}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color);border-radius:var(--mat-stepper-header-hover-state-layer-shape)}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color);border-radius:var(--mat-stepper-header-focus-state-layer-shape)}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color)}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color);background-color:var(--mat-stepper-header-icon-background-color)}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color)}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font);font-size:var(--mat-stepper-header-label-text-size);font-weight:var(--mat-stepper-header-label-text-weight);color:var(--mat-stepper-header-label-text-color)}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color)}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color);font-size:var(--mat-stepper-header-error-state-label-text-size)}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size);font-weight:var(--mat-stepper-header-selected-state-label-text-weight)}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color);color:var(--mat-stepper-header-selected-state-icon-foreground-color)}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color);color:var(--mat-stepper-header-edit-state-icon-foreground-color)}"],
      encapsulation: 2,
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepHeader, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-step-header',
      host: {
        'class': 'mat-step-header',
        '[class]': '"mat-" + (color || "primary")',
        'role': 'tab'
      },
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatRipple, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIcon],
      template: "<div class=\"mat-step-header-ripple mat-focus-indicator\" matRipple\n     [matRippleTrigger]=\"_getHostElement()\"\n     [matRippleDisabled]=\"disableRipple\"></div>\n\n<div class=\"mat-step-icon-state-{{state}} mat-step-icon\" [class.mat-step-icon-selected]=\"selected\">\n  <div class=\"mat-step-icon-content\">\n    @if (iconOverrides && iconOverrides[state]) {\n      <ng-container\n        [ngTemplateOutlet]=\"iconOverrides[state]\"\n        [ngTemplateOutletContext]=\"_getIconContext()\"></ng-container>\n    } @else {\n      @switch (state) {\n        @case ('number') {\n          <span aria-hidden=\"true\">{{_getDefaultTextForState(state)}}</span>\n        }\n\n        @default {\n          @if (state === 'done') {\n            <span class=\"cdk-visually-hidden\">{{_intl.completedLabel}}</span>\n          } @else if (state === 'edit') {\n            <span class=\"cdk-visually-hidden\">{{_intl.editableLabel}}</span>\n          }\n\n          <mat-icon aria-hidden=\"true\">{{_getDefaultTextForState(state)}}</mat-icon>\n        }\n      }\n    }\n  </div>\n</div>\n<div class=\"mat-step-label\"\n     [class.mat-step-label-active]=\"active\"\n     [class.mat-step-label-selected]=\"selected\"\n     [class.mat-step-label-error]=\"state == 'error'\">\n  @if (_templateLabel(); as templateLabel) {\n    <!-- If there is a label template, use it. -->\n    <div class=\"mat-step-text-label\">\n      <ng-container [ngTemplateOutlet]=\"templateLabel.template\"></ng-container>\n    </div>\n  } @else if (_stringLabel()) {\n    <!-- If there is no label template, fall back to the text label. -->\n    <div class=\"mat-step-text-label\">{{label}}</div>\n  }\n\n  @if (optional && state != 'error') {\n    <div class=\"mat-step-optional\">{{_intl.optionalLabel}}</div>\n  }\n\n  @if (state === 'error') {\n    <div class=\"mat-step-sub-label-error\">{{errorMessage}}</div>\n  }\n</div>\n\n",
      styles: [".mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:\"\"}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color);border-radius:var(--mat-stepper-header-hover-state-layer-shape)}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color);border-radius:var(--mat-stepper-header-focus-state-layer-shape)}@media(hover: none){.mat-step-header:hover{background:none}}.cdk-high-contrast-active .mat-step-header{outline:solid 1px}.cdk-high-contrast-active .mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.cdk-high-contrast-active .mat-step-header[aria-disabled=true]{outline-color:GrayText}.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-label,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-icon,.cdk-high-contrast-active .mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color)}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color);background-color:var(--mat-stepper-header-icon-background-color)}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color);color:var(--mat-stepper-header-error-state-icon-foreground-color)}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font);font-size:var(--mat-stepper-header-label-text-size);font-weight:var(--mat-stepper-header-label-text-weight);color:var(--mat-stepper-header-label-text-color)}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color)}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color);font-size:var(--mat-stepper-header-error-state-label-text-size)}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size);font-weight:var(--mat-stepper-header-selected-state-label-text-weight)}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color);color:var(--mat-stepper-header-selected-state-icon-foreground-color)}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color);color:var(--mat-stepper-header-edit-state-icon-foreground-color)}"]
    }]
  }], () => [{
    type: MatStepperIntl
  }, {
    type: _angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_3__.FocusMonitor
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
  }], {
    state: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    label: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    errorMessage: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    iconOverrides: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    index: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    selected: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    active: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    optional: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();
const DEFAULT_HORIZONTAL_ANIMATION_DURATION = '500ms';
const DEFAULT_VERTICAL_ANIMATION_DURATION = '225ms';
/**
 * Animations used by the Material steppers.
 * @docs-private
 */
const matStepperAnimations = {
  /** Animation that transitions the step along the X axis in a horizontal stepper. */
  horizontalStepTransition: (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.trigger)('horizontalStepTransition', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.state)('previous', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.style)({
    transform: 'translate3d(-100%, 0, 0)',
    visibility: 'hidden'
  })),
  // Transition to `inherit`, rather than `visible`,
  // because visibility on a child element the one from the parent,
  // making this element focusable inside of a `hidden` element.
  (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.state)('current', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.style)({
    transform: 'none',
    visibility: 'inherit'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.state)('next', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.style)({
    transform: 'translate3d(100%, 0, 0)',
    visibility: 'hidden'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.transition)('* => *', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.group)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.animate)('{{animationDuration}} cubic-bezier(0.35, 0, 0.25, 1)'), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.query)('@*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.animateChild)(), {
    optional: true
  })]), {
    params: {
      'animationDuration': DEFAULT_HORIZONTAL_ANIMATION_DURATION
    }
  })]),
  /** Animation that transitions the step along the Y axis in a vertical stepper. */
  verticalStepTransition: (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.trigger)('verticalStepTransition', [(0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.state)('previous', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.style)({
    height: '0px',
    visibility: 'hidden'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.state)('next', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.style)({
    height: '0px',
    visibility: 'hidden'
  })),
  // Transition to `inherit`, rather than `visible`,
  // because visibility on a child element the one from the parent,
  // making this element focusable inside of a `hidden` element.
  (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.state)('current', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.style)({
    height: '*',
    visibility: 'inherit'
  })), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.transition)('* <=> current', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.group)([(0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.animate)('{{animationDuration}} cubic-bezier(0.4, 0.0, 0.2, 1)'), (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.query)('@*', (0,_angular_animations__WEBPACK_IMPORTED_MODULE_7__.animateChild)(), {
    optional: true
  })]), {
    params: {
      'animationDuration': DEFAULT_VERTICAL_ANIMATION_DURATION
    }
  })])
};

/**
 * Template to be used to override the icons inside the step header.
 */
class MatStepperIcon {
  constructor(templateRef) {
    this.templateRef = templateRef;
  }
  static {
    this.ɵfac = function MatStepperIcon_Factory(t) {
      return new (t || MatStepperIcon)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: MatStepperIcon,
      selectors: [["ng-template", "matStepperIcon", ""]],
      inputs: {
        name: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInputFlags"].None, "matStepperIcon", "name"]
      },
      standalone: true
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepperIcon, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'ng-template[matStepperIcon]',
      standalone: true
    }]
  }], () => [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef
  }], {
    name: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,
      args: ['matStepperIcon']
    }]
  });
})();

/**
 * Content for a `mat-step` that will be rendered lazily.
 */
class MatStepContent {
  constructor(_template) {
    this._template = _template;
  }
  static {
    this.ɵfac = function MatStepContent_Factory(t) {
      return new (t || MatStepContent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef));
    };
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: MatStepContent,
      selectors: [["ng-template", "matStepContent", ""]],
      standalone: true
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepContent, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'ng-template[matStepContent]',
      standalone: true
    }]
  }], () => [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.TemplateRef
  }], null);
})();
class MatStep extends _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStep {
  constructor(stepper, _errorStateMatcher, _viewContainerRef, stepperOptions) {
    super(stepper, stepperOptions);
    this._errorStateMatcher = _errorStateMatcher;
    this._viewContainerRef = _viewContainerRef;
    this._isSelected = rxjs__WEBPACK_IMPORTED_MODULE_8__.Subscription.EMPTY;
    /** Content for step label given by `<ng-template matStepLabel>`. */
    // We need an initializer here to avoid a TS error.
    this.stepLabel = undefined;
  }
  ngAfterContentInit() {
    this._isSelected = this._stepper.steps.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.switchMap)(() => {
      return this._stepper.selectionChange.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.map)(event => event.selectedStep === this), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_11__.startWith)(this._stepper.selected === this));
    })).subscribe(isSelected => {
      if (isSelected && this._lazyContent && !this._portal) {
        this._portal = new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__.TemplatePortal(this._lazyContent._template, this._viewContainerRef);
      }
    });
  }
  ngOnDestroy() {
    this._isSelected.unsubscribe();
  }
  /** Custom error state matcher that additionally checks for validity of interacted form. */
  isErrorState(control, form) {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);
    // Custom error state checks for the validity of form that is not submitted or touched
    // since user can trigger a form change by calling for another step without directly
    // interacting with the current form.
    const customErrorState = !!(control && control.invalid && this.interacted);
    return originalErrorState || customErrorState;
  }
  static {
    this.ɵfac = function MatStep_Factory(t) {
      return new (t || MatStep)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"]((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatStepper)), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_core__WEBPACK_IMPORTED_MODULE_4__.ErrorStateMatcher, 4), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.STEPPER_GLOBAL_OPTIONS, 8));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: MatStep,
      selectors: [["mat-step"]],
      contentQueries: function MatStep_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatStepLabel, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatStepContent, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.stepLabel = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._lazyContent = _t.first);
        }
      },
      hostAttrs: ["hidden", ""],
      inputs: {
        color: "color"
      },
      exportAs: ["matStep"],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
        provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.ErrorStateMatcher,
        useExisting: MatStep
      }, {
        provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStep,
        useExisting: MatStep
      }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      ngContentSelectors: _c0,
      decls: 1,
      vars: 0,
      consts: [[3, "cdkPortalOutlet"]],
      template: function MatStep_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatStep_ng_template_0_Template, 2, 1, "ng-template");
        }
      },
      dependencies: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__.CdkPortalOutlet],
      encapsulation: 2,
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStep, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-step',
      providers: [{
        provide: _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.ErrorStateMatcher,
        useExisting: MatStep
      }, {
        provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStep,
        useExisting: MatStep
      }],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      exportAs: 'matStep',
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__.CdkPortalOutlet],
      host: {
        'hidden': '' // Hide the steps so they don't affect the layout.
      },
      template: "<ng-template>\n  <ng-content></ng-content>\n  <ng-template [cdkPortalOutlet]=\"_portal\"></ng-template>\n</ng-template>\n"
    }]
  }], () => [{
    type: MatStepper,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(() => MatStepper)]
    }]
  }, {
    type: _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.ErrorStateMatcher,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.SkipSelf
    }]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef
  }, {
    type: undefined,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
    }, {
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Inject,
      args: [_angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.STEPPER_GLOBAL_OPTIONS]
    }]
  }], {
    stepLabel: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MatStepLabel]
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    _lazyContent: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChild,
      args: [MatStepContent, {
        static: false
      }]
    }]
  });
})();
class MatStepper extends _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepper {
  /** Duration for the animation. Will be normalized to milliseconds if no units are set. */
  get animationDuration() {
    return this._animationDuration;
  }
  set animationDuration(value) {
    this._animationDuration = /^\d+$/.test(value) ? value + 'ms' : value;
  }
  constructor(dir, changeDetectorRef, elementRef) {
    super(dir, changeDetectorRef, elementRef);
    /** The list of step headers of the steps in the stepper. */
    // We need an initializer here to avoid a TS error.
    this._stepHeader = undefined;
    /** Full list of steps inside the stepper, including inside nested steppers. */
    // We need an initializer here to avoid a TS error.
    this._steps = undefined;
    /** Steps that belong to the current stepper, excluding ones from nested steppers. */
    this.steps = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.QueryList();
    /** Event emitted when the current step is done transitioning in. */
    this.animationDone = new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter();
    /**
     * Whether the label should display in bottom or end position.
     * Only applies in the `horizontal` orientation.
     */
    this.labelPosition = 'end';
    /**
     * Position of the stepper's header.
     * Only applies in the `horizontal` orientation.
     */
    this.headerPosition = 'top';
    /** Consumer-specified template-refs to be used to override the header icons. */
    this._iconOverrides = {};
    /** Stream of animation `done` events when the body expands/collapses. */
    this._animationDone = new rxjs__WEBPACK_IMPORTED_MODULE_2__.Subject();
    this._animationDuration = '';
    /** Whether the stepper is rendering on the server. */
    this._isServer = !(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_13__.Platform).isBrowser;
    const nodeName = elementRef.nativeElement.nodeName.toLowerCase();
    this.orientation = nodeName === 'mat-vertical-stepper' ? 'vertical' : 'horizontal';
  }
  ngAfterContentInit() {
    super.ngAfterContentInit();
    this._icons.forEach(({
      name,
      templateRef
    }) => this._iconOverrides[name] = templateRef);
    // Mark the component for change detection whenever the content children query changes
    this.steps.changes.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this._destroyed)).subscribe(() => {
      this._stateChanged();
    });
    this._animationDone.pipe(
    // This needs a `distinctUntilChanged` in order to avoid emitting the same event twice due
    // to a bug in animations where the `.done` callback gets invoked twice on some browsers.
    // See https://github.com/angular/angular/issues/24084
    (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.distinctUntilChanged)((x, y) => x.fromState === y.fromState && x.toState === y.toState), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.takeUntil)(this._destroyed)).subscribe(event => {
      if (event.toState === 'current') {
        this.animationDone.emit();
      }
    });
  }
  _stepIsNavigable(index, step) {
    return step.completed || this.selectedIndex === index || !this.linear;
  }
  _getAnimationDuration() {
    if (this.animationDuration) {
      return this.animationDuration;
    }
    return this.orientation === 'horizontal' ? DEFAULT_HORIZONTAL_ANIMATION_DURATION : DEFAULT_VERTICAL_ANIMATION_DURATION;
  }
  static {
    this.ɵfac = function MatStepper_Factory(t) {
      return new (t || MatStepper)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__.Directionality, 8), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef));
    };
  }
  static {
    this.ɵcmp = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: MatStepper,
      selectors: [["mat-stepper"], ["mat-vertical-stepper"], ["mat-horizontal-stepper"], ["", "matStepper", ""]],
      contentQueries: function MatStepper_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatStep, 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, MatStepperIcon, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._steps = _t);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._icons = _t);
        }
      },
      viewQuery: function MatStepper_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](MatStepHeader, 5);
        }
        if (rf & 2) {
          let _t;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx._stepHeader = _t);
        }
      },
      hostAttrs: ["role", "tablist"],
      hostVars: 11,
      hostBindings: function MatStepper_HostBindings(rf, ctx) {
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("aria-orientation", ctx.orientation);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-stepper-horizontal", ctx.orientation === "horizontal")("mat-stepper-vertical", ctx.orientation === "vertical")("mat-stepper-label-position-end", ctx.orientation === "horizontal" && ctx.labelPosition == "end")("mat-stepper-label-position-bottom", ctx.orientation === "horizontal" && ctx.labelPosition == "bottom")("mat-stepper-header-position-bottom", ctx.headerPosition === "bottom");
        }
      },
      inputs: {
        disableRipple: "disableRipple",
        color: "color",
        labelPosition: "labelPosition",
        headerPosition: "headerPosition",
        animationDuration: "animationDuration"
      },
      outputs: {
        animationDone: "animationDone"
      },
      exportAs: ["matStepper", "matVerticalStepper", "matHorizontalStepper"],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([{
        provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepper,
        useExisting: MatStepper
      }]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"], _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      ngContentSelectors: _c0,
      decls: 5,
      vars: 2,
      consts: [["stepTemplate", ""], [1, "mat-horizontal-stepper-wrapper"], [1, "mat-horizontal-stepper-header-container"], [1, "mat-horizontal-content-container"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id", "mat-horizontal-stepper-content-inactive"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "mat-stepper-horizontal-line"], ["role", "tabpanel", 1, "mat-horizontal-stepper-content", 3, "id"], [3, "ngTemplateOutlet"], [1, "mat-step"], [1, "mat-vertical-content-container"], ["role", "tabpanel", 1, "mat-vertical-stepper-content", 3, "id"], [1, "mat-vertical-content"], [3, "click", "keydown", "tabIndex", "id", "index", "state", "label", "selected", "active", "optional", "errorMessage", "iconOverrides", "disableRipple", "color"]],
      template: function MatStepper_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, MatStepper_Conditional_0_Template, 1, 0)(1, MatStepper_Case_1_Template, 7, 0)(2, MatStepper_Case_2_Template, 2, 0)(3, MatStepper_ng_template_3_Template, 1, 23, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        }
        if (rf & 2) {
          let tmp_2_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](0, ctx._isServer ? 0 : -1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵconditional"](1, (tmp_2_0 = ctx.orientation) === "horizontal" ? 1 : tmp_2_0 === "vertical" ? 2 : -1);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet, MatStepHeader],
      styles: [".mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font);background:var(--mat-stepper-container-color)}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:\"\";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:\"\";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color);top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}"],
      encapsulation: 2,
      data: {
        animation: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition]
      },
      changeDetection: 0
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepper, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,
    args: [{
      selector: 'mat-stepper, mat-vertical-stepper, mat-horizontal-stepper, [matStepper]',
      exportAs: 'matStepper, matVerticalStepper, matHorizontalStepper',
      host: {
        '[class.mat-stepper-horizontal]': 'orientation === "horizontal"',
        '[class.mat-stepper-vertical]': 'orientation === "vertical"',
        '[class.mat-stepper-label-position-end]': 'orientation === "horizontal" && labelPosition == "end"',
        '[class.mat-stepper-label-position-bottom]': 'orientation === "horizontal" && labelPosition == "bottom"',
        '[class.mat-stepper-header-position-bottom]': 'headerPosition === "bottom"',
        '[attr.aria-orientation]': 'orientation',
        'role': 'tablist'
      },
      animations: [matStepperAnimations.horizontalStepTransition, matStepperAnimations.verticalStepTransition],
      providers: [{
        provide: _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepper,
        useExisting: MatStepper
      }],
      encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,
      changeDetection: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,
      standalone: true,
      imports: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.NgTemplateOutlet, MatStepHeader],
      template: "<!--\n  We need to project the content somewhere to avoid hydration errors. Some observations:\n  1. This is only necessary on the server.\n  2. We get a hydration error if there aren't any nodes after the `ng-content`.\n  3. We get a hydration error if `ng-content` is wrapped in another element.\n-->\n@if (_isServer) {\n  <ng-content/>\n}\n\n@switch (orientation) {\n  @case ('horizontal') {\n    <div class=\"mat-horizontal-stepper-wrapper\">\n      <div class=\"mat-horizontal-stepper-header-container\">\n        @for (step of steps; track step; let i = $index, isLast = $last) {\n          <ng-container\n            [ngTemplateOutlet]=\"stepTemplate\"\n            [ngTemplateOutletContext]=\"{step: step, i: i}\"></ng-container>\n          @if (!isLast) {\n            <div class=\"mat-stepper-horizontal-line\"></div>\n          }\n        }\n      </div>\n\n      <div class=\"mat-horizontal-content-container\">\n        @for (step of steps; track step; let i = $index) {\n          <div class=\"mat-horizontal-stepper-content\" role=\"tabpanel\"\n               [@horizontalStepTransition]=\"{\n                  'value': _getAnimationDirection(i),\n                  'params': {'animationDuration': _getAnimationDuration()}\n                }\"\n               (@horizontalStepTransition.done)=\"_animationDone.next($event)\"\n               [id]=\"_getStepContentId(i)\"\n               [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n               [class.mat-horizontal-stepper-content-inactive]=\"selectedIndex !== i\">\n            <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n          </div>\n        }\n      </div>\n    </div>\n  }\n\n  @case ('vertical') {\n    @for (step of steps; track step; let i = $index, isLast = $last) {\n      <div class=\"mat-step\">\n        <ng-container\n          [ngTemplateOutlet]=\"stepTemplate\"\n          [ngTemplateOutletContext]=\"{step: step, i: i}\"></ng-container>\n        <div class=\"mat-vertical-content-container\" [class.mat-stepper-vertical-line]=\"!isLast\">\n          <div class=\"mat-vertical-stepper-content\" role=\"tabpanel\"\n               [@verticalStepTransition]=\"{\n                  'value': _getAnimationDirection(i),\n                  'params': {'animationDuration': _getAnimationDuration()}\n                }\"\n               (@verticalStepTransition.done)=\"_animationDone.next($event)\"\n               [id]=\"_getStepContentId(i)\"\n               [attr.aria-labelledby]=\"_getStepLabelId(i)\"\n               [class.mat-vertical-stepper-content-inactive]=\"selectedIndex !== i\">\n            <div class=\"mat-vertical-content\">\n              <ng-container [ngTemplateOutlet]=\"step.content\"></ng-container>\n            </div>\n          </div>\n        </div>\n      </div>\n    }\n  }\n}\n\n<!-- Common step templating -->\n<ng-template let-step=\"step\" let-i=\"i\" #stepTemplate>\n  <mat-step-header\n    [class.mat-horizontal-stepper-header]=\"orientation === 'horizontal'\"\n    [class.mat-vertical-stepper-header]=\"orientation === 'vertical'\"\n    (click)=\"step.select()\"\n    (keydown)=\"_onKeydown($event)\"\n    [tabIndex]=\"_getFocusIndex() === i ? 0 : -1\"\n    [id]=\"_getStepLabelId(i)\"\n    [attr.aria-posinset]=\"i + 1\"\n    [attr.aria-setsize]=\"steps.length\"\n    [attr.aria-controls]=\"_getStepContentId(i)\"\n    [attr.aria-selected]=\"selectedIndex == i\"\n    [attr.aria-label]=\"step.ariaLabel || null\"\n    [attr.aria-labelledby]=\"(!step.ariaLabel && step.ariaLabelledby) ? step.ariaLabelledby : null\"\n    [attr.aria-disabled]=\"_stepIsNavigable(i, step) ? null : true\"\n    [index]=\"i\"\n    [state]=\"_getIndicatorType(i, step.state)\"\n    [label]=\"step.stepLabel || step.label\"\n    [selected]=\"selectedIndex === i\"\n    [active]=\"_stepIsNavigable(i, step)\"\n    [optional]=\"step.optional\"\n    [errorMessage]=\"step.errorMessage\"\n    [iconOverrides]=\"_iconOverrides\"\n    [disableRipple]=\"disableRipple || !_stepIsNavigable(i, step)\"\n    [color]=\"step.color || color\"></mat-step-header>\n</ng-template>\n",
      styles: [".mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font);background:var(--mat-stepper-container-color)}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:\"\";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{outline:0}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-inactive{height:0;overflow:hidden}.mat-horizontal-stepper-content:not(.mat-horizontal-stepper-content-inactive){visibility:inherit !important}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}.cdk-high-contrast-active .mat-horizontal-content-container{outline:solid 1px}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{margin-left:36px;border:0;position:relative}.cdk-high-contrast-active .mat-vertical-content-container{outline:solid 1px}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}.mat-stepper-vertical-line::before{content:\"\";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color);top:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0}.mat-vertical-stepper-content:not(.mat-vertical-stepper-content-inactive){visibility:inherit !important}.mat-vertical-content{padding:0 24px 24px 24px}.mat-step:last-child .mat-vertical-content-container{border:none}"]
    }]
  }], () => [{
    type: _angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_16__.Directionality,
    decorators: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Optional
    }]
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef
  }, {
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef
  }], {
    _stepHeader: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChildren,
      args: [MatStepHeader]
    }],
    _steps: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatStep, {
        descendants: true
      }]
    }],
    _icons: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.ContentChildren,
      args: [MatStepperIcon, {
        descendants: true
      }]
    }],
    animationDone: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Output
    }],
    disableRipple: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    color: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    labelPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    headerPosition: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }],
    animationDuration: [{
      type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Input
    }]
  });
})();

/** Button that moves to the next step in a stepper workflow. */
class MatStepperNext extends _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepperNext {
  static {
    this.ɵfac = /* @__PURE__ */(() => {
      let ɵMatStepperNext_BaseFactory;
      return function MatStepperNext_Factory(t) {
        return (ɵMatStepperNext_BaseFactory || (ɵMatStepperNext_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatStepperNext)))(t || MatStepperNext);
      };
    })();
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: MatStepperNext,
      selectors: [["button", "matStepperNext", ""]],
      hostAttrs: [1, "mat-stepper-next"],
      hostVars: 1,
      hostBindings: function MatStepperNext_HostBindings(rf, ctx) {
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("type", ctx.type);
        }
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepperNext, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'button[matStepperNext]',
      host: {
        'class': 'mat-stepper-next',
        '[type]': 'type'
      },
      standalone: true
    }]
  }], null, null);
})();
/** Button that moves to the previous step in a stepper workflow. */
class MatStepperPrevious extends _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepperPrevious {
  static {
    this.ɵfac = /* @__PURE__ */(() => {
      let ɵMatStepperPrevious_BaseFactory;
      return function MatStepperPrevious_Factory(t) {
        return (ɵMatStepperPrevious_BaseFactory || (ɵMatStepperPrevious_BaseFactory = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetInheritedFactory"](MatStepperPrevious)))(t || MatStepperPrevious);
      };
    })();
  }
  static {
    this.ɵdir = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({
      type: MatStepperPrevious,
      selectors: [["button", "matStepperPrevious", ""]],
      hostAttrs: [1, "mat-stepper-previous"],
      hostVars: 1,
      hostBindings: function MatStepperPrevious_HostBindings(rf, ctx) {
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵhostProperty"]("type", ctx.type);
        }
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepperPrevious, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,
    args: [{
      selector: 'button[matStepperPrevious]',
      host: {
        'class': 'mat-stepper-previous',
        '[type]': 'type'
      },
      standalone: true
    }]
  }], null, null);
})();
class MatStepperModule {
  static {
    this.ɵfac = function MatStepperModule_Factory(t) {
      return new (t || MatStepperModule)();
    };
  }
  static {
    this.ɵmod = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: MatStepperModule
    });
  }
  static {
    this.ɵinj = /* @__PURE__ */_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      providers: [MAT_STEPPER_INTL_PROVIDER, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.ErrorStateMatcher],
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__.PortalModule, _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepperModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatRippleModule, MatStepper, MatStepHeader, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatCommonModule]
    });
  }
}
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatStepperModule, [{
    type: _angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,
    args: [{
      imports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatCommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_12__.PortalModule, _angular_cdk_stepper__WEBPACK_IMPORTED_MODULE_1__.CdkStepperModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__.MatIconModule, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatRippleModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      exports: [_angular_material_core__WEBPACK_IMPORTED_MODULE_4__.MatCommonModule, MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious, MatStepHeader, MatStepperIcon, MatStepContent],
      providers: [MAT_STEPPER_INTL_PROVIDER, _angular_material_core__WEBPACK_IMPORTED_MODULE_4__.ErrorStateMatcher]
    }]
  }], null, null);
})();

/**
 * Generated bundle index. Do not edit.
 */



/***/ })

}]);
//# sourceMappingURL=src_app_features_orders_components_checkout_checkout_component_ts.js.map