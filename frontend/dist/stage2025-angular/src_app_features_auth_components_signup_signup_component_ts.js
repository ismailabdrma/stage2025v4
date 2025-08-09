"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_auth_components_signup_signup_component_ts"],{

/***/ 5848:
/*!*********************************************************************!*\
  !*** ./src/app/features/auth/components/signup/signup.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SignupComponent: () => (/* binding */ SignupComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var _core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/store/auth/auth.actions */ 4134);
/* harmony import */ var _core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/store/auth/auth.selectors */ 2319);

























function SignupComponent_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Le nom d'utilisateur est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SignupComponent_mat_error_23_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " L'email est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SignupComponent_mat_error_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Veuillez entrer un email valide ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SignupComponent_mat_error_34_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Le mot de passe est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SignupComponent_mat_error_35_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Le mot de passe doit contenir au moins 6 caract\u00E8res ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SignupComponent_mat_error_45_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Veuillez confirmer votre mot de passe ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SignupComponent_mat_error_46_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Les mots de passe ne correspondent pas ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function SignupComponent_mat_spinner_49_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-spinner", 18);
  }
}
function SignupComponent_span_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Cr\u00E9er un compte");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class SignupComponent {
  constructor() {
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder);
    this.store = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBar);
    this.hidePassword = true;
    this.hideConfirmPassword = true;
    this.loading$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthLoading);
    this.message$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthMessage);
    this.error$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthError);
    this.signupForm = this.fb.group({
      username: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      email: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]],
      password: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.minLength(6)]],
      confirmPassword: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]]
    });
  }
  ngOnInit() {
    this.message$.subscribe(message => {
      if (message) {
        this.snackBar.open(message, "Close", {
          duration: 5000
        });
        // If signup successful, redirect to email verification with email
        if (message.includes("successful") || message.includes("created")) {
          setTimeout(() => {
            this.router.navigate(["/auth/verify-email"], {
              queryParams: {
                email: this.signupForm.get('email')?.value
              }
            });
          }, 2000);
        }
      }
    });
    this.error$.subscribe(error => {
      if (error) {
        this.snackBar.open(error, "Close", {
          duration: 5000
        });
      }
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      // Always set role to USER for security - only admins can create admin accounts
      const signupData = {
        ...this.signupForm.value,
        role: "USER"
      };
      this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.signup({
        request: signupData
      }));
    }
  }
  static {
    this.ɵfac = function SignupComponent_Factory(t) {
      return new (t || SignupComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: SignupComponent,
      selectors: [["app-signup"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 56,
      vars: 21,
      consts: [[1, "auth-container"], [1, "auth-content"], [1, "auth-header"], [1, "subtitle"], [1, "auth-card"], [1, "signup-form", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "username", "required", ""], ["matPrefix", ""], [4, "ngIf"], ["matInput", "", "type", "email", "formControlName", "email", "required", ""], ["matInput", "", "formControlName", "password", "required", "", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["matInput", "", "formControlName", "confirmPassword", "required", "", 3, "type"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "signup-btn", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [1, "auth-links"], ["mat-button", "", "routerLink", "/auth/login", 1, "link-btn"], ["diameter", "20"]],
      template: function SignupComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Inscription");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Cr\u00E9ez votre compte pour commencer");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-card", 4)(8, "mat-card-content")(9, "form", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function SignupComponent_Template_form_ngSubmit_9_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-form-field", 6)(11, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Nom d'utilisateur");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-icon", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "person");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, SignupComponent_mat_error_16_Template, 2, 0, "mat-error", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "mat-form-field", 6)(18, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "mat-icon", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "email");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](23, SignupComponent_mat_error_23_Template, 2, 0, "mat-error", 9)(24, SignupComponent_mat_error_24_Template, 2, 0, "mat-error", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](25, "mat-form-field", 6)(26, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](27, "Mot de passe");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](28, "input", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](29, "mat-icon", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](30, "lock");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](31, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SignupComponent_Template_button_click_31_listener() {
            return ctx.hidePassword = !ctx.hidePassword;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](32, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](33);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](34, SignupComponent_mat_error_34_Template, 2, 0, "mat-error", 9)(35, SignupComponent_mat_error_35_Template, 2, 0, "mat-error", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "mat-form-field", 6)(37, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](38, "Confirmer le mot de passe");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](39, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](40, "mat-icon", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](41, "lock_outline");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](42, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function SignupComponent_Template_button_click_42_listener() {
            return ctx.hideConfirmPassword = !ctx.hideConfirmPassword;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](43, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](44);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](45, SignupComponent_mat_error_45_Template, 2, 0, "mat-error", 9)(46, SignupComponent_mat_error_46_Template, 2, 0, "mat-error", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](47, "button", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](48, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](49, SignupComponent_mat_spinner_49_Template, 1, 0, "mat-spinner", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](50, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](51, SignupComponent_span_51_Template, 2, 0, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](52, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](53, "div", 16)(54, "a", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](55, " D\u00E9j\u00E0 un compte ? Se connecter ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
        }
        if (rf & 2) {
          let tmp_1_0;
          let tmp_2_0;
          let tmp_3_0;
          let tmp_6_0;
          let tmp_7_0;
          let tmp_10_0;
          let tmp_11_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.signupForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx.signupForm.get("username")) == null ? null : tmp_1_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx.signupForm.get("email")) == null ? null : tmp_2_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_3_0 = ctx.signupForm.get("email")) == null ? null : tmp_3_0.hasError("email"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx.hidePassword ? "password" : "text");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.hidePassword ? "visibility_off" : "visibility");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_6_0 = ctx.signupForm.get("password")) == null ? null : tmp_6_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_7_0 = ctx.signupForm.get("password")) == null ? null : tmp_7_0.hasError("minlength"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx.hideConfirmPassword ? "password" : "text");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.hideConfirmPassword ? "visibility_off" : "visibility");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_10_0 = ctx.signupForm.get("confirmPassword")) == null ? null : tmp_10_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_11_0 = ctx.signupForm.get("confirmPassword")) == null ? null : tmp_11_0.hasError("mismatch"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.signupForm.invalid || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](48, 15, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](50, 17, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](52, 19, ctx.loading$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBarModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinner, _angular_material_select__WEBPACK_IMPORTED_MODULE_14__.MatSelectModule],
      styles: [".auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 140px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  background: linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%);\n}\n\n.auth-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 450px;\n}\n\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1B1B1B;\n  margin: 0 0 8px;\n}\n\n.auth-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  margin: 0;\n  font-size: 1rem;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n\n.signup-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n  margin-bottom: 24px;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.signup-btn[_ngcontent-%COMP%] {\n  background: #FFEA00;\n  color: #1B1B1B;\n  font-weight: 700;\n  border-radius: 12px;\n  height: 48px;\n  font-size: 16px;\n}\n\n.signup-btn[_ngcontent-%COMP%]:disabled {\n  background: #E0E0E0;\n  color: #9E9E9E;\n}\n\n.auth-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding-top: 16px;\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n}\n\n.link-btn[_ngcontent-%COMP%] {\n  color: #1B1B1B;\n  font-weight: 500;\n  text-decoration: none;\n}\n\n.link-btn[_ngcontent-%COMP%]:hover {\n  color: #FFEA00;\n  background: transparent;\n}\n\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n  .auth-content[_ngcontent-%COMP%] {\n    max-width: 100%;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYXV0aC9jb21wb25lbnRzL3NpZ251cC9zaWdudXAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSwrQkFBQTtFQUNBLGFBQUE7RUFDQSxtQkFBQTtFQUNBLHVCQUFBO0VBQ0EsYUFBQTtFQUNBLDZEQUFBO0FBQ0Y7O0FBRUE7RUFDRSxXQUFBO0VBQ0EsZ0JBQUE7QUFDRjs7QUFFQTtFQUNFLGtCQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFDQTtFQUNFLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0FBRUY7O0FBQUE7RUFDRSxjQUFBO0VBQ0EsU0FBQTtFQUNBLGVBQUE7QUFHRjs7QUFBQTtFQUNFLG1CQUFBO0VBQ0EsMENBQUE7RUFDQSxnQkFBQTtBQUdGOztBQUFBO0VBQ0UsYUFBQTtFQUNBLHNCQUFBO0VBQ0EsU0FBQTtFQUNBLG1CQUFBO0FBR0Y7O0FBQUE7RUFDRSxXQUFBO0FBR0Y7O0FBQUE7RUFDRSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLGVBQUE7QUFHRjs7QUFEQTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBQUlGOztBQURBO0VBQ0UsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxpQkFBQTtFQUNBLHlDQUFBO0FBSUY7O0FBRkE7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQUtGOztBQUhBO0VBQ0UsY0FBQTtFQUNBLHVCQUFBO0FBTUY7O0FBSEE7RUFDRTtJQUNFLGFBQUE7RUFNRjtFQUpBO0lBQ0Usa0JBQUE7RUFNRjtFQUpBO0lBQ0UsZUFBQTtFQU1GO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIuYXV0aC1jb250YWluZXIgeyBcclxuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTQwcHgpOyBcclxuICBkaXNwbGF5OiBmbGV4OyBcclxuICBhbGlnbi1pdGVtczogY2VudGVyOyBcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgXHJcbiAgcGFkZGluZzogMjRweDsgXHJcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgI0Y5RjlGOSAwJSwgI0ZGRkZGRiAxMDAlKTsgXHJcbn1cclxuXHJcbi5hdXRoLWNvbnRlbnQgeyBcclxuICB3aWR0aDogMTAwJTsgXHJcbiAgbWF4LXdpZHRoOiA0NTBweDsgXHJcbn1cclxuXHJcbi5hdXRoLWhlYWRlciB7IFxyXG4gIHRleHQtYWxpZ246IGNlbnRlcjsgXHJcbiAgbWFyZ2luLWJvdHRvbTogMzJweDsgXHJcbn1cclxuLmF1dGgtaGVhZGVyIGgxIHsgXHJcbiAgZm9udC1zaXplOiAycmVtOyBcclxuICBmb250LXdlaWdodDogNzAwOyBcclxuICBjb2xvcjogIzFCMUIxQjsgXHJcbiAgbWFyZ2luOiAwIDAgOHB4OyBcclxufVxyXG4uYXV0aC1oZWFkZXIgLnN1YnRpdGxlIHsgXHJcbiAgY29sb3I6ICM2QTZBNkE7IFxyXG4gIG1hcmdpbjogMDsgXHJcbiAgZm9udC1zaXplOiAxcmVtOyBcclxufVxyXG5cclxuLmF1dGgtY2FyZCB7IFxyXG4gIGJvcmRlci1yYWRpdXM6IDEycHg7IFxyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDI0cHggcmdiYSgwLDAsMCwwLjA4KTsgXHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgXHJcbn1cclxuXHJcbi5zaWdudXAtZm9ybSB7IFxyXG4gIGRpc3BsYXk6IGZsZXg7IFxyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IFxyXG4gIGdhcDogMjBweDsgXHJcbiAgbWFyZ2luLWJvdHRvbTogMjRweDsgXHJcbn1cclxuXHJcbi5mdWxsLXdpZHRoIHsgXHJcbiAgd2lkdGg6IDEwMCU7IFxyXG59XHJcblxyXG4uc2lnbnVwLWJ0biB7IFxyXG4gIGJhY2tncm91bmQ6ICNGRkVBMDA7IFxyXG4gIGNvbG9yOiAjMUIxQjFCOyBcclxuICBmb250LXdlaWdodDogNzAwOyBcclxuICBib3JkZXItcmFkaXVzOiAxMnB4OyBcclxuICBoZWlnaHQ6IDQ4cHg7IFxyXG4gIGZvbnQtc2l6ZTogMTZweDsgXHJcbn1cclxuLnNpZ251cC1idG46ZGlzYWJsZWQgeyBcclxuICBiYWNrZ3JvdW5kOiAjRTBFMEUwOyBcclxuICBjb2xvcjogIzlFOUU5RTsgXHJcbn1cclxuXHJcbi5hdXRoLWxpbmtzIHsgXHJcbiAgZGlzcGxheTogZmxleDsgXHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgXHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IFxyXG4gIHBhZGRpbmctdG9wOiAxNnB4OyBcclxuICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjA4KTsgXHJcbn1cclxuLmxpbmstYnRuIHsgXHJcbiAgY29sb3I6ICMxQjFCMUI7IFxyXG4gIGZvbnQtd2VpZ2h0OiA1MDA7IFxyXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTsgXHJcbn1cclxuLmxpbmstYnRuOmhvdmVyIHsgXHJcbiAgY29sb3I6ICNGRkVBMDA7IFxyXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBcclxufVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XHJcbiAgLmF1dGgtY29udGFpbmVyIHsgXHJcbiAgICBwYWRkaW5nOiAxNnB4OyBcclxuICB9XHJcbiAgLmF1dGgtaGVhZGVyIGgxIHsgXHJcbiAgICBmb250LXNpemU6IDEuNzVyZW07IFxyXG4gIH1cclxuICAuYXV0aC1jb250ZW50IHsgXHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7IFxyXG4gIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_auth_components_signup_signup_component_ts.js.map