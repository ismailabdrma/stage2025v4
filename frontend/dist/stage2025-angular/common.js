"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["common"],{

/***/ 8544:
/*!************************************************!*\
  !*** ./src/app/core/services/order.service.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OrderService: () => (/* binding */ OrderService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @environments/environment */ 5312);




class OrderService {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient);
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/orders`;
  }
  getOrders() {
    return this.http.get(this.apiUrl);
  }
  getOrderById(id) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
  createOrder(request) {
    return this.http.post(this.apiUrl, request);
  }
  updateOrderStatus(id, status) {
    return this.http.put(`${this.apiUrl}/${id}/status`, {
      status
    });
  }
  cancelOrder(id) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  // Admin methods
  getAllOrders() {
    return this.http.get(`${this.apiUrl}/admin/all`);
  }
  getOrdersByStatus(status) {
    return this.http.get(`${this.apiUrl}/admin/status/${status}`);
  }
  static {
    this.ɵfac = function OrderService_Factory(t) {
      return new (t || OrderService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: OrderService,
      factory: OrderService.ɵfac,
      providedIn: "root"
    });
  }
}

/***/ }),

/***/ 634:
/*!**************************************************!*\
  !*** ./src/app/core/services/payment.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PaymentService: () => (/* binding */ PaymentService)
/* harmony export */ });
/* harmony import */ var C_Users_asus_Desktop_stage2025v2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js */ 9204);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @environments/environment */ 5312);
/* harmony import */ var _stripe_stripe_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @stripe/stripe-js */ 6567);






class PaymentService {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__.HttpClient);
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_1__.environment.apiUrl}/api`;
    this.stripe = null;
    this.initializeStripe();
  }
  initializeStripe() {
    var _this = this;
    return (0,C_Users_asus_Desktop_stage2025v2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      // You'll need to replace this with your actual Stripe publishable key
      const stripeKey = 'pk_test_your_stripe_publishable_key_here';
      _this.stripe = yield (0,_stripe_stripe_js__WEBPACK_IMPORTED_MODULE_2__.loadStripe)(stripeKey);
    })();
  }
  createPaymentIntent(paymentRequest) {
    return this.http.post(`${this.apiUrl}/payments/create-payment-intent`, paymentRequest);
  }
  confirmPayment(paymentIntentId, paymentMethodId) {
    return this.http.post(`${this.apiUrl}/payments/confirm`, {
      paymentIntentId,
      paymentMethodId
    });
  }
  getStripe() {
    return this.stripe;
  }
  createPaymentMethod(cardElement) {
    var _this2 = this;
    return (0,C_Users_asus_Desktop_stage2025v2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this2.stripe) {
        throw new Error('Stripe not initialized');
      }
      const {
        paymentMethod,
        error
      } = yield _this2.stripe.createPaymentMethod({
        type: 'card',
        card: cardElement
      });
      if (error) {
        throw error;
      }
      return paymentMethod;
    })();
  }
  confirmCardPayment(clientSecret, paymentMethodId) {
    var _this3 = this;
    return (0,C_Users_asus_Desktop_stage2025v2_frontend_node_modules_babel_runtime_helpers_esm_asyncToGenerator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(function* () {
      if (!_this3.stripe) {
        throw new Error('Stripe not initialized');
      }
      const {
        paymentIntent,
        error
      } = yield _this3.stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethodId
      });
      if (error) {
        throw error;
      }
      return paymentIntent;
    })();
  }
  static {
    this.ɵfac = function PaymentService_Factory(t) {
      return new (t || PaymentService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({
      token: PaymentService,
      factory: PaymentService.ɵfac,
      providedIn: 'root'
    });
  }
}

/***/ }),

/***/ 7784:
/*!***************************************************!*\
  !*** ./src/app/core/services/supplier.service.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SupplierService: () => (/* binding */ SupplierService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ 6443);


class SupplierService {
  constructor(http) {
    this.http = http;
    this.api = "/api/suppliers";
  }
  getAllSuppliers() {
    return this.http.get(this.api);
  }
  createSupplier(supplier) {
    return this.http.post(this.api, supplier);
  }
  updateSupplier(id, supplier) {
    return this.http.put(`${this.api}/${id}`, supplier);
  }
  deleteSupplier(id) {
    return this.http.delete(`${this.api}/${id}`);
  }
  activateSupplier(id) {
    return this.http.put(`${this.api}/${id}/activate`, {});
  }
  deactivateSupplier(id) {
    return this.http.put(`${this.api}/${id}/deactivate`, {});
  }
  importProducts(id) {
    return this.http.post(`${this.api}/${id}/import-products`, {});
  }
  static {
    this.ɵfac = function SupplierService_Factory(t) {
      return new (t || SupplierService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__.HttpClient));
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: SupplierService,
      factory: SupplierService.ɵfac,
      providedIn: "root"
    });
  }
}

/***/ }),

/***/ 8709:
/*!******************************************************************************!*\
  !*** ./src/app/shared/components/confirm-dialog/confirm-dialog.component.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ConfirmDialogComponent: () => (/* binding */ ConfirmDialogComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);

 // Import MatButtonModule
 // Import MatDialogModule, MatDialogRef, and MAT_DIALOG_DATA



class ConfirmDialogComponent {
  constructor(dialogRef, data // Inject MAT_DIALOG_DATA and make it public
  ) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  onConfirm() {
    this.dialogRef.close(true); // Close dialog with true
  }
  onCancel() {
    this.dialogRef.close(false); // Close dialog with false
  }
  static {
    this.ɵfac = function ConfirmDialogComponent_Factory(t) {
      return new (t || ConfirmDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogRef), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MAT_DIALOG_DATA));
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ConfirmDialogComponent,
      selectors: [["app-confirm-dialog"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 10,
      vars: 2,
      consts: () => {
        let i18n_0;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_3292937362759137616$$SRC_APP_SHARED_COMPONENTS_CONFIRM_DIALOG_CONFIRM_DIALOG_COMPONENT_TS_0 = goog.getMsg("{$interpolation}", {
            "interpolation": "\uFFFD0\uFFFD"
          }, {
            original_code: {
              "interpolation": "{{ data.title }}"
            }
          });
          i18n_0 = MSG_EXTERNAL_3292937362759137616$$SRC_APP_SHARED_COMPONENTS_CONFIRM_DIALOG_CONFIRM_DIALOG_COMPONENT_TS_0;
        } else {
          i18n_0 = $localize`${"\uFFFD0\uFFFD"}:INTERPOLATION:`;
        }
        let i18n_1;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_2159130950882492111$$SRC_APP_SHARED_COMPONENTS_CONFIRM_DIALOG_CONFIRM_DIALOG_COMPONENT_TS_1 = goog.getMsg("Cancel");
          i18n_1 = MSG_EXTERNAL_2159130950882492111$$SRC_APP_SHARED_COMPONENTS_CONFIRM_DIALOG_CONFIRM_DIALOG_COMPONENT_TS_1;
        } else {
          i18n_1 = $localize`Cancel`;
        }
        let i18n_2;
        if (typeof ngI18nClosureMode !== "undefined" && ngI18nClosureMode) {
          /**
           * @suppress {msgDescriptions}
           */
          const MSG_EXTERNAL_9178182467454450952$$SRC_APP_SHARED_COMPONENTS_CONFIRM_DIALOG_CONFIRM_DIALOG_COMPONENT_TS_2 = goog.getMsg("Confirm");
          i18n_2 = MSG_EXTERNAL_9178182467454450952$$SRC_APP_SHARED_COMPONENTS_CONFIRM_DIALOG_CONFIRM_DIALOG_COMPONENT_TS_2;
        } else {
          i18n_2 = $localize`Confirm`;
        }
        return [i18n_0, i18n_1, i18n_2, ["mat-dialog-title", ""], ["mat-dialog-content", "", "role", "document", "aria-live", "polite"], ["mat-dialog-actions", "", "align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", "cdkFocusInitial", "", 3, "click"]];
      },
      template: function ConfirmDialogComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](1, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 4)(3, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 5)(6, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_Template_button_click_6_listener() {
            return ctx.onCancel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](7, 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConfirmDialogComponent_Template_button_click_8_listener() {
            return ctx.onConfirm();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18n"](9, 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18nExp"](ctx.data.title);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵi18nApply"](1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.data.message);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_2__.CommonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_3__.MatButton,
      // Add MatButtonModule to imports
      _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_1__.MatDialogContent],
      styles: ["scss[_ngcontent-%COMP%]   mat-dialog-content[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n}\n\nmat-dialog-actions[_ngcontent-%COMP%] {\n  justify-content: center;\n  gap: 16px;\n  padding-top: 0;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvY29uZmlybS1kaWFsb2cvY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFHRSxrQkFBQTtFQUNBLGFBQUE7QUFERjs7QUFJQTtFQUNFLHVCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7QUFERiIsInNvdXJjZXNDb250ZW50IjpbInNjc3NcclxuLyogY29uZmlybS1kaWFsb2cuY29tcG9uZW50LnNjc3MgKi9cclxubWF0LWRpYWxvZy1jb250ZW50IHtcclxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgcGFkZGluZzogMjBweDtcclxufVxyXG5cclxubWF0LWRpYWxvZy1hY3Rpb25zIHtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcclxuICBnYXA6IDE2cHg7XHJcbiAgcGFkZGluZy10b3A6IDA7XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 6567:
/*!***********************************************************!*\
  !*** ./node_modules/@stripe/stripe-js/dist/stripe.esm.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   loadStripe: () => (/* binding */ loadStripe)
/* harmony export */ });
var V3_URL = 'https://js.stripe.com/v3';
var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
var EXISTING_SCRIPT_MESSAGE = 'loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used';
var findScript = function findScript() {
  var scripts = document.querySelectorAll("script[src^=\"".concat(V3_URL, "\"]"));
  for (var i = 0; i < scripts.length; i++) {
    var script = scripts[i];
    if (!V3_URL_REGEX.test(script.src)) {
      continue;
    }
    return script;
  }
  return null;
};
var injectScript = function injectScript(params) {
  var queryString = params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  var script = document.createElement('script');
  script.src = "".concat(V3_URL).concat(queryString);
  var headOrBody = document.head || document.body;
  if (!headOrBody) {
    throw new Error('Expected document.body not to be null. Stripe.js requires a <body> element.');
  }
  headOrBody.appendChild(script);
  return script;
};
var registerWrapper = function registerWrapper(stripe, startTime) {
  if (!stripe || !stripe._registerWrapper) {
    return;
  }
  stripe._registerWrapper({
    name: 'stripe-js',
    version: "2.4.0",
    startTime: startTime
  });
};
var stripePromise = null;
var onErrorListener = null;
var onLoadListener = null;
var onError = function onError(reject) {
  return function () {
    reject(new Error('Failed to load Stripe.js'));
  };
};
var onLoad = function onLoad(resolve, reject) {
  return function () {
    if (window.Stripe) {
      resolve(window.Stripe);
    } else {
      reject(new Error('Stripe.js not available'));
    }
  };
};
var loadScript = function loadScript(params) {
  // Ensure that we only attempt to load Stripe.js at most once
  if (stripePromise !== null) {
    return stripePromise;
  }
  stripePromise = new Promise(function (resolve, reject) {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }
    if (window.Stripe && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }
    if (window.Stripe) {
      resolve(window.Stripe);
      return;
    }
    try {
      var script = findScript();
      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      } else if (script && onLoadListener !== null && onErrorListener !== null) {
        var _script$parentNode;

        // remove event listeners
        script.removeEventListener('load', onLoadListener);
        script.removeEventListener('error', onErrorListener); // if script exists, but we are reloading due to an error,
        // reload script to trigger 'load' event

        (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
        script = injectScript(params);
      }
      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener('load', onLoadListener);
      script.addEventListener('error', onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  }); // Resets stripePromise on error

  return stripePromise["catch"](function (error) {
    stripePromise = null;
    return Promise.reject(error);
  });
};
var initStripe = function initStripe(maybeStripe, args, startTime) {
  if (maybeStripe === null) {
    return null;
  }
  var stripe = maybeStripe.apply(undefined, args);
  registerWrapper(stripe, startTime);
  return stripe;
}; // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types

var stripePromise$1;
var loadCalled = false;
var getStripePromise = function getStripePromise() {
  if (stripePromise$1) {
    return stripePromise$1;
  }
  stripePromise$1 = loadScript(null)["catch"](function (error) {
    // clear cache on error
    stripePromise$1 = null;
    return Promise.reject(error);
  });
  return stripePromise$1;
}; // Execute our own script injection after a tick to give users time to do their
// own script injection.

Promise.resolve().then(function () {
  return getStripePromise();
})["catch"](function (error) {
  if (!loadCalled) {
    console.warn(error);
  }
});
var loadStripe = function loadStripe() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  loadCalled = true;
  var startTime = Date.now(); // if previous attempts are unsuccessful, will re-load script

  return getStripePromise().then(function (maybeStripe) {
    return initStripe(maybeStripe, args, startTime);
  });
};


/***/ })

}]);
//# sourceMappingURL=common.js.map