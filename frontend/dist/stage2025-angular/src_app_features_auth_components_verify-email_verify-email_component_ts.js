"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_auth_components_verify-email_verify-email_component_ts"],{

/***/ 5652:
/*!*********************************************************************************!*\
  !*** ./src/app/features/auth/components/verify-email/verify-email.component.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   VerifyEmailComponent: () => (/* binding */ VerifyEmailComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 8764);
/* harmony import */ var _core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/store/auth/auth.actions */ 4134);
/* harmony import */ var _core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/store/auth/auth.selectors */ 2319);






















function VerifyEmailComponent_p_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "p", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx_r0.userEmail);
  }
}
function VerifyEmailComponent_mat_form_field_11_mat_error_6_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " L'email est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VerifyEmailComponent_mat_form_field_11_mat_error_7_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Veuillez entrer un email valide ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VerifyEmailComponent_mat_form_field_11_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-form-field", 8)(1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, "Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](3, "input", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "mat-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "email");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, VerifyEmailComponent_mat_form_field_11_mat_error_6_Template, 2, 0, "mat-error", 11)(7, VerifyEmailComponent_mat_form_field_11_mat_error_7_Template, 2, 0, "mat-error", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
  if (rf & 2) {
    let tmp_1_0;
    let tmp_2_0;
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx_r0.verifyForm.get("email")) == null ? null : tmp_1_0.hasError("required"));
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx_r0.verifyForm.get("email")) == null ? null : tmp_2_0.hasError("email"));
  }
}
function VerifyEmailComponent_mat_error_18_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Le code de v\u00E9rification est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VerifyEmailComponent_mat_error_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Le code doit contenir 6 chiffres ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function VerifyEmailComponent_mat_spinner_22_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-spinner", 19);
  }
}
function VerifyEmailComponent_span_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "V\u00E9rifier Email");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class VerifyEmailComponent {
  constructor() {
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder);
    this.store = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router);
    this.route = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBar);
    this.loading$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthLoading);
    this.message$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthMessage);
    this.error$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthError);
    this.userEmail = '';
    this.emailReadonly = false;
    this.verifyForm = this.fb.group({
      email: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]],
      otp: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.pattern(/^\d{6}$/)]]
    });
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params["email"]) {
        this.userEmail = params["email"];
        this.emailReadonly = true;
        this.verifyForm.patchValue({
          email: params["email"]
        });
        this.verifyForm.get('email')?.disable(); // Disable email field if passed from signup
      }
    });
    this.message$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.tap)(message => {
      if (message) {
        this.snackBar.open(message, "Close", {
          duration: 5000
        });
        if (message.includes("successful")) {
          // Navigate to login with email prefilled
          setTimeout(() => {
            this.router.navigate(["/auth/login"], {
              queryParams: {
                email: this.verifyForm.value.email
              }
            });
          }, 2000);
        }
      }
    })).subscribe();
    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(error, "Close", {
          duration: 5000
        });
      }
    });
  }
  onSubmit() {
    if (this.verifyForm.valid) {
      // Include email even if disabled
      const verifyData = {
        email: this.userEmail || this.verifyForm.get('email')?.value,
        otp: this.verifyForm.get('otp')?.value
      };
      this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.verifyEmail({
        request: verifyData
      }));
    }
  }
  resendCode() {
    const email = this.userEmail || this.verifyForm.get("email")?.value;
    if (email) {
      this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.resendOTP({
        email,
        otpType: "EMAIL_VERIFICATION"
      }));
    }
  }
  static {
    this.ɵfac = function VerifyEmailComponent_Factory(t) {
      return new (t || VerifyEmailComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: VerifyEmailComponent,
      selectors: [["app-verify-email"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 32,
      vars: 17,
      consts: [[1, "auth-container"], [1, "auth-content"], [1, "auth-header"], [1, "subtitle"], ["class", "email-display", 4, "ngIf"], [1, "auth-card"], [1, "verify-form", 3, "ngSubmit", "formGroup"], ["appearance", "outline", "class", "full-width", 4, "ngIf"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "otp", "maxlength", "6", "placeholder", "123456", "required", ""], ["matPrefix", ""], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "verify-btn", 3, "disabled"], ["diameter", "20", 4, "ngIf"], ["mat-stroked-button", "", "type", "button", 1, "resend-btn", 3, "click", "disabled"], [1, "auth-links"], ["mat-button", "", "routerLink", "/auth/login", 1, "link-btn"], [1, "email-display"], ["matInput", "", "type", "email", "formControlName", "email", "required", ""], ["diameter", "20"]],
      template: function VerifyEmailComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "V\u00E9rification Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Entrez le code de v\u00E9rification envoy\u00E9 \u00E0 votre email");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, VerifyEmailComponent_p_7_Template, 2, 1, "p", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "mat-card", 5)(9, "mat-card-content")(10, "form", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function VerifyEmailComponent_Template_form_ngSubmit_10_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](11, VerifyEmailComponent_mat_form_field_11_Template, 8, 2, "mat-form-field", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "mat-form-field", 8)(13, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "Code de v\u00E9rification (6 chiffres)");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](15, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "mat-icon", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](17, "security");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, VerifyEmailComponent_mat_error_18_Template, 2, 0, "mat-error", 11)(19, VerifyEmailComponent_mat_error_19_Template, 2, 0, "mat-error", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](20, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](21, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](22, VerifyEmailComponent_mat_spinner_22_Template, 1, 0, "mat-spinner", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](23, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](24, VerifyEmailComponent_span_24_Template, 2, 0, "span", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](25, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](26, "button", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](27, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function VerifyEmailComponent_Template_button_click_26_listener() {
            return ctx.resendCode();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](28, " Renvoyer le code ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "div", 15)(30, "a", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](31, " Retour \u00E0 la connexion ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
        }
        if (rf & 2) {
          let tmp_3_0;
          let tmp_4_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx.emailReadonly);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.verifyForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.emailReadonly);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_3_0 = ctx.verifyForm.get("otp")) == null ? null : tmp_3_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_4_0 = ctx.verifyForm.get("otp")) == null ? null : tmp_4_0.hasError("pattern"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.verifyForm.invalid || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](21, 9, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](23, 11, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](25, 13, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](27, 15, ctx.loading$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_8__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_8__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_8__.AsyncPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.MaxLengthValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_9__.MatCardContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__.MatPrefix, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_11__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_12__.MatButton, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinner],
      styles: [".auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 140px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  background: linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%);\n}\n\n.auth-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n}\n\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1B1B1B;\n  margin: 0 0 8px;\n}\n\n.auth-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  margin: 0 0 16px;\n  font-size: 1rem;\n}\n\n.email-display[_ngcontent-%COMP%] {\n  background: #F9F9F9;\n  padding: 12px 16px;\n  border-radius: 8px;\n  font-weight: 600;\n  color: #1B1B1B;\n  border: 2px solid #FFEA00;\n  margin: 0;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n\n.verify-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  margin-bottom: 24px;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.verify-btn[_ngcontent-%COMP%] {\n  background: #FFEA00;\n  color: #1B1B1B;\n  font-weight: 700;\n  border-radius: 12px;\n  height: 48px;\n  font-size: 16px;\n}\n\n.verify-btn[_ngcontent-%COMP%]:disabled {\n  background: #E0E0E0;\n  color: #9E9E9E;\n}\n\n.resend-btn[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  height: 44px;\n  border-color: #FFEA00;\n  color: #1B1B1B;\n}\n\n.resend-btn[_ngcontent-%COMP%]:hover {\n  background: #FFEA00;\n  color: #1B1B1B;\n}\n\n.auth-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-top: 16px;\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n}\n\n.link-btn[_ngcontent-%COMP%] {\n  color: #1B1B1B;\n  font-weight: 500;\n  text-decoration: none;\n}\n\n.link-btn[_ngcontent-%COMP%]:hover {\n  color: #FFEA00;\n  background: transparent;\n}\n\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYXV0aC9jb21wb25lbnRzL3ZlcmlmeS1lbWFpbC92ZXJpZnktZW1haWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLDZEQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFDQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBRUY7O0FBQUE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0FBR0Y7O0FBREE7RUFDRSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLFNBQUE7QUFJRjs7QUFEQTtFQUNFLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtBQUlGOztBQURBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBSUY7O0FBREE7RUFDRSxXQUFBO0FBSUY7O0FBREE7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFJRjs7QUFGQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQUtGOztBQUZBO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7RUFDQSxjQUFBO0FBS0Y7O0FBSEE7RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUFNRjs7QUFIQTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsaUJBQUE7RUFDQSx5Q0FBQTtBQU1GOztBQUpBO0VBQ0UsY0FBQTtFQUNBLGdCQUFBO0VBQ0EscUJBQUE7QUFPRjs7QUFMQTtFQUNFLGNBQUE7RUFDQSx1QkFBQTtBQVFGOztBQUxBO0VBQ0U7SUFDRSxhQUFBO0VBUUY7RUFOQTtJQUNFLGtCQUFBO0VBUUY7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi5hdXRoLWNvbnRhaW5lciB7IFxyXG4gIG1pbi1oZWlnaHQ6IGNhbGMoMTAwdmggLSAxNDBweCk7IFxyXG4gIGRpc3BsYXk6IGZsZXg7IFxyXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IFxyXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyOyBcclxuICBwYWRkaW5nOiAyNHB4OyBcclxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjRjlGOUY5IDAlLCAjRkZGRkZGIDEwMCUpOyBcclxufVxyXG5cclxuLmF1dGgtY29udGVudCB7IFxyXG4gIHdpZHRoOiAxMDAlOyBcclxuICBtYXgtd2lkdGg6IDQwMHB4OyBcclxufVxyXG5cclxuLmF1dGgtaGVhZGVyIHsgXHJcbiAgdGV4dC1hbGlnbjogY2VudGVyOyBcclxuICBtYXJnaW4tYm90dG9tOiAzMnB4OyBcclxufVxyXG4uYXV0aC1oZWFkZXIgaDEgeyBcclxuICBmb250LXNpemU6IDJyZW07IFxyXG4gIGZvbnQtd2VpZ2h0OiA3MDA7IFxyXG4gIGNvbG9yOiAjMUIxQjFCOyBcclxuICBtYXJnaW46IDAgMCA4cHg7IFxyXG59XHJcbi5hdXRoLWhlYWRlciAuc3VidGl0bGUgeyBcclxuICBjb2xvcjogIzZBNkE2QTsgXHJcbiAgbWFyZ2luOiAwIDAgMTZweDsgXHJcbiAgZm9udC1zaXplOiAxcmVtOyBcclxufVxyXG4uZW1haWwtZGlzcGxheSB7IFxyXG4gIGJhY2tncm91bmQ6ICNGOUY5Rjk7IFxyXG4gIHBhZGRpbmc6IDEycHggMTZweDsgXHJcbiAgYm9yZGVyLXJhZGl1czogOHB4OyBcclxuICBmb250LXdlaWdodDogNjAwOyBcclxuICBjb2xvcjogIzFCMUIxQjsgXHJcbiAgYm9yZGVyOiAycHggc29saWQgI0ZGRUEwMDsgXHJcbiAgbWFyZ2luOiAwOyBcclxufVxyXG5cclxuLmF1dGgtY2FyZCB7IFxyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7IFxyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDI0cHggcmdiYSgwLDAsMCwwLjA4KTsgXHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgXHJcbn1cclxuXHJcbi52ZXJpZnktZm9ybSB7IFxyXG4gIGRpc3BsYXk6IGZsZXg7IFxyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IFxyXG4gIGdhcDogMjRweDsgXHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDsgXHJcbn1cclxuXHJcbi5mdWxsLXdpZHRoIHsgXHJcbiAgd2lkdGg6IDEwMCU7IFxyXG59XHJcblxyXG4udmVyaWZ5LWJ0biB7IFxyXG4gIGJhY2tncm91bmQ6ICNGRkVBMDA7IFxyXG4gIGNvbG9yOiAjMUIxQjFCOyBcclxuICBmb250LXdlaWdodDogNzAwOyBcclxuICBib3JkZXItcmFkaXVzOiAxMnB4OyBcclxuICBoZWlnaHQ6IDQ4cHg7IFxyXG4gIGZvbnQtc2l6ZTogMTZweDsgXHJcbn1cclxuLnZlcmlmeS1idG46ZGlzYWJsZWQgeyBcclxuICBiYWNrZ3JvdW5kOiAjRTBFMEUwOyBcclxuICBjb2xvcjogIzlFOUU5RTsgXHJcbn1cclxuXHJcbi5yZXNlbmQtYnRuIHsgXHJcbiAgYm9yZGVyLXJhZGl1czogMTJweDsgXHJcbiAgaGVpZ2h0OiA0NHB4OyBcclxuICBib3JkZXItY29sb3I6ICNGRkVBMDA7IFxyXG4gIGNvbG9yOiAjMUIxQjFCOyBcclxufVxyXG4ucmVzZW5kLWJ0bjpob3ZlciB7IFxyXG4gIGJhY2tncm91bmQ6ICNGRkVBMDA7IFxyXG4gIGNvbG9yOiAjMUIxQjFCOyBcclxufVxyXG5cclxuLmF1dGgtbGlua3MgeyBcclxuICBkaXNwbGF5OiBmbGV4OyBcclxuICBhbGlnbi1pdGVtczogY2VudGVyOyBcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgXHJcbiAgcGFkZGluZy10b3A6IDE2cHg7IFxyXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMDgpOyBcclxufVxyXG4ubGluay1idG4geyBcclxuICBjb2xvcjogIzFCMUIxQjsgXHJcbiAgZm9udC13ZWlnaHQ6IDUwMDsgXHJcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lOyBcclxufVxyXG4ubGluay1idG46aG92ZXIgeyBcclxuICBjb2xvcjogI0ZGRUEwMDsgXHJcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IFxyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAuYXV0aC1jb250YWluZXIgeyBcclxuICAgIHBhZGRpbmc6IDE2cHg7IFxyXG4gIH1cclxuICAuYXV0aC1oZWFkZXIgaDEgeyBcclxuICAgIGZvbnQtc2l6ZTogMS43NXJlbTsgXHJcbiAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_auth_components_verify-email_verify-email_component_ts.js.map