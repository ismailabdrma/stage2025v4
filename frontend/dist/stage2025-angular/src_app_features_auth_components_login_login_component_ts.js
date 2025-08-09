"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_auth_components_login_login_component_ts"],{

/***/ 7146:
/*!*******************************************************************!*\
  !*** ./src/app/features/auth/components/login/login.component.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   LoginComponent: () => (/* binding */ LoginComponent)
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
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var _core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/store/auth/auth.actions */ 4134);
/* harmony import */ var _core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/store/auth/auth.selectors */ 2319);























function LoginComponent_mat_error_16_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Le nom d'utilisateur ou l'email est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function LoginComponent_mat_error_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Le mot de passe est requis ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function LoginComponent_mat_spinner_29_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-spinner", 18);
  }
}
function LoginComponent_span_31_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Se connecter");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class LoginComponent {
  constructor() {
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder);
    this.store = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.Router);
    this.route = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_5__.ActivatedRoute);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBar);
    this.hidePassword = true;
    this.loading$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthLoading);
    this.error$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthError);
    this.message$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthMessage);
    this.loginForm = this.fb.group({
      identifier: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]],
      password: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]]
    });
  }
  ngOnInit() {
    this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.resetAuthUI());
    this.route.queryParams.subscribe(params => {
      if (params["email"]) {
        this.loginForm.patchValue({
          identifier: params["email"]
        });
      }
    });
    this.message$.subscribe(message => {
      if (message) {
        this.snackBar.open(message, "Close", {
          duration: 5000
        });
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
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.login({
        request: formValue
      }));
      // TODO: Intelligent redirection after successful login or requiring OTP is handled in NgRx effects
    }
  }
  static {
    this.ɵfac = function LoginComponent_Factory(t) {
      return new (t || LoginComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: LoginComponent,
      selectors: [["app-login"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 40,
      vars: 14,
      consts: [[1, "auth-container"], [1, "auth-content"], [1, "auth-header"], [1, "subtitle"], [1, "auth-card"], [1, "login-form", 3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "identifier", "required", ""], ["matPrefix", ""], [4, "ngIf"], ["matInput", "", "formControlName", "password", "required", "", 3, "type"], ["mat-icon-button", "", "matSuffix", "", "type", "button", 3, "click"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "login-btn", 3, "disabled"], ["diameter", "20", 4, "ngIf"], [1, "auth-links"], ["mat-button", "", "routerLink", "/auth/forgot-password", 1, "link-btn"], [1, "divider"], ["mat-button", "", "routerLink", "/auth/signup", 1, "link-btn"], ["diameter", "20"]],
      template: function LoginComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Connexion");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Connectez-vous \u00E0 votre compte");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-card", 4)(8, "mat-card-content")(9, "form", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function LoginComponent_Template_form_ngSubmit_9_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "mat-form-field", 6)(11, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Nom d'utilisateur ou Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-icon", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, "person");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, LoginComponent_mat_error_16_Template, 2, 0, "mat-error", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](17, "mat-form-field", 6)(18, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](19, "Mot de passe");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](20, "input", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "mat-icon", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22, "lock");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](23, "button", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function LoginComponent_Template_button_click_23_listener() {
            return ctx.hidePassword = !ctx.hidePassword;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](26, LoginComponent_mat_error_26_Template, 2, 0, "mat-error", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](27, "button", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](28, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](29, LoginComponent_mat_spinner_29_Template, 1, 0, "mat-spinner", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](30, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](31, LoginComponent_span_31_Template, 2, 0, "span", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](32, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](33, "div", 14)(34, "a", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](35, " Mot de passe oubli\u00E9 ? ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](36, "span", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](37, "\u2022");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](38, "a", 17);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](39, " Cr\u00E9er un compte ");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()()()();
        }
        if (rf & 2) {
          let tmp_1_0;
          let tmp_4_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.loginForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx.loginForm.get("identifier")) == null ? null : tmp_1_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx.hidePassword ? "password" : "text");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](ctx.hidePassword ? "visibility_off" : "visibility");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_4_0 = ctx.loginForm.get("password")) == null ? null : tmp_4_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.loginForm.invalid || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](28, 8, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](30, 10, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](32, 12, ctx.loading$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatError, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatPrefix, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatSuffix, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__.MatIcon, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_13__.MatProgressSpinner, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_6__.MatSnackBarModule, _angular_router__WEBPACK_IMPORTED_MODULE_5__.RouterLink],
      styles: [".auth-container[_ngcontent-%COMP%] {\n  min-height: calc(100vh - 140px);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n  background: linear-gradient(135deg, #F9F9F9 0%, #FFFFFF 100%);\n}\n\n.auth-content[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px;\n}\n\n.auth-header[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 32px;\n}\n\n.auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  font-weight: 700;\n  color: #1B1B1B;\n  margin: 0 0 8px;\n}\n\n.auth-header[_ngcontent-%COMP%]   .subtitle[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  margin: 0;\n  font-size: 1rem;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);\n  overflow: hidden;\n}\n\n.login-form[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 24px;\n  margin-bottom: 24px;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.login-btn[_ngcontent-%COMP%] {\n  background: #FFEA00;\n  color: #1B1B1B;\n  font-weight: 700;\n  border-radius: 12px;\n  height: 48px;\n  font-size: 16px;\n}\n\n.login-btn[_ngcontent-%COMP%]:disabled {\n  background: #E0E0E0;\n  color: #9E9E9E;\n}\n\n.auth-links[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n  padding-top: 16px;\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n}\n\n.link-btn[_ngcontent-%COMP%] {\n  color: #1B1B1B;\n  font-weight: 500;\n  text-decoration: none;\n}\n\n.link-btn[_ngcontent-%COMP%]:hover {\n  color: #FFEA00;\n  background: transparent;\n}\n\n.divider[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  font-size: 12px;\n}\n\n@media (max-width: 480px) {\n  .auth-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n  .auth-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n  .auth-links[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 8px;\n  }\n  .divider[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYXV0aC9jb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDSTtFQUNFLCtCQUFBO0VBQ0EsYUFBQTtFQUNBLG1CQUFBO0VBQ0EsdUJBQUE7RUFDQSxhQUFBO0VBQ0EsNkRBQUE7QUFBTjs7QUFHSTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtBQUFOOztBQUdJO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtBQUFOOztBQUVJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7QUFDTjs7QUFDSTtFQUNFLGNBQUE7RUFDQSxTQUFBO0VBQ0EsZUFBQTtBQUVOOztBQUNJO0VBQ0UsbUJBQUE7RUFDQSwwQ0FBQTtFQUNBLGdCQUFBO0FBRU47O0FBQ0k7RUFDRSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxTQUFBO0VBQ0EsbUJBQUE7QUFFTjs7QUFDSTtFQUNFLFdBQUE7QUFFTjs7QUFDSTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxZQUFBO0VBQ0EsZUFBQTtBQUVOOztBQUFJO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0FBR047O0FBQUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLFNBQUE7RUFDQSxpQkFBQTtFQUNBLHlDQUFBO0FBR047O0FBREk7RUFDRSxjQUFBO0VBQ0EsZ0JBQUE7RUFDQSxxQkFBQTtBQUlOOztBQUZJO0VBQ0UsY0FBQTtFQUNBLHVCQUFBO0FBS047O0FBSEk7RUFDRSxjQUFBO0VBQ0EsZUFBQTtBQU1OOztBQUhJO0VBQ0U7SUFDRSxhQUFBO0VBTU47RUFKSTtJQUNFLGtCQUFBO0VBTU47RUFKSTtJQUNFLHNCQUFBO0lBQ0EsUUFBQTtFQU1OO0VBSkk7SUFDRSxhQUFBO0VBTU47QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIC5hdXRoLWNvbnRhaW5lciB7IFxuICAgICAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDE0MHB4KTsgXG4gICAgICBkaXNwbGF5OiBmbGV4OyBcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7IFxuICAgICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IFxuICAgICAgcGFkZGluZzogMjRweDsgXG4gICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjRjlGOUY5IDAlLCAjRkZGRkZGIDEwMCUpOyBcbiAgICB9XG5cbiAgICAuYXV0aC1jb250ZW50IHsgXG4gICAgICB3aWR0aDogMTAwJTsgXG4gICAgICBtYXgtd2lkdGg6IDQwMHB4OyBcbiAgICB9XG5cbiAgICAuYXV0aC1oZWFkZXIgeyBcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgXG4gICAgICBtYXJnaW4tYm90dG9tOiAzMnB4OyBcbiAgICB9XG4gICAgLmF1dGgtaGVhZGVyIGgxIHsgXG4gICAgICBmb250LXNpemU6IDJyZW07IFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDsgXG4gICAgICBjb2xvcjogIzFCMUIxQjsgXG4gICAgICBtYXJnaW46IDAgMCA4cHg7IFxuICAgIH1cbiAgICAuYXV0aC1oZWFkZXIgLnN1YnRpdGxlIHsgXG4gICAgICBjb2xvcjogIzZBNkE2QTsgXG4gICAgICBtYXJnaW46IDA7IFxuICAgICAgZm9udC1zaXplOiAxcmVtOyBcbiAgICB9XG5cbiAgICAuYXV0aC1jYXJkIHsgXG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4OyBcbiAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDI0cHggcmdiYSgwLDAsMCwwLjA4KTsgXG4gICAgICBvdmVyZmxvdzogaGlkZGVuOyBcbiAgICB9XG5cbiAgICAubG9naW4tZm9ybSB7IFxuICAgICAgZGlzcGxheTogZmxleDsgXG4gICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uOyBcbiAgICAgIGdhcDogMjRweDsgXG4gICAgICBtYXJnaW4tYm90dG9tOiAyNHB4OyBcbiAgICB9XG5cbiAgICAuZnVsbC13aWR0aCB7IFxuICAgICAgd2lkdGg6IDEwMCU7IFxuICAgIH1cblxuICAgIC5sb2dpbi1idG4geyBcbiAgICAgIGJhY2tncm91bmQ6ICNGRkVBMDA7IFxuICAgICAgY29sb3I6ICMxQjFCMUI7IFxuICAgICAgZm9udC13ZWlnaHQ6IDcwMDsgXG4gICAgICBib3JkZXItcmFkaXVzOiAxMnB4OyBcbiAgICAgIGhlaWdodDogNDhweDsgXG4gICAgICBmb250LXNpemU6IDE2cHg7IFxuICAgIH1cbiAgICAubG9naW4tYnRuOmRpc2FibGVkIHsgXG4gICAgICBiYWNrZ3JvdW5kOiAjRTBFMEUwOyBcbiAgICAgIGNvbG9yOiAjOUU5RTlFOyBcbiAgICB9XG5cbiAgICAuYXV0aC1saW5rcyB7IFxuICAgICAgZGlzcGxheTogZmxleDsgXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyOyBcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyOyBcbiAgICAgIGdhcDogMTZweDsgXG4gICAgICBwYWRkaW5nLXRvcDogMTZweDsgXG4gICAgICBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjA4KTsgXG4gICAgfVxuICAgIC5saW5rLWJ0biB7IFxuICAgICAgY29sb3I6ICMxQjFCMUI7IFxuICAgICAgZm9udC13ZWlnaHQ6IDUwMDsgXG4gICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7IFxuICAgIH1cbiAgICAubGluay1idG46aG92ZXIgeyBcbiAgICAgIGNvbG9yOiAjRkZFQTAwOyBcbiAgICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBcbiAgICB9XG4gICAgLmRpdmlkZXIgeyBcbiAgICAgIGNvbG9yOiAjNkE2QTZBOyBcbiAgICAgIGZvbnQtc2l6ZTogMTJweDsgXG4gICAgfVxuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDQ4MHB4KSB7XG4gICAgICAuYXV0aC1jb250YWluZXIgeyBcbiAgICAgICAgcGFkZGluZzogMTZweDsgXG4gICAgICB9XG4gICAgICAuYXV0aC1oZWFkZXIgaDEgeyBcbiAgICAgICAgZm9udC1zaXplOiAxLjc1cmVtOyBcbiAgICAgIH1cbiAgICAgIC5hdXRoLWxpbmtzIHsgXG4gICAgICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IFxuICAgICAgICBnYXA6IDhweDsgXG4gICAgICB9XG4gICAgICAuZGl2aWRlciB7IFxuICAgICAgICBkaXNwbGF5OiBub25lOyBcbiAgICAgIH1cbiAgICB9XG4gICJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_auth_components_login_login_component_ts.js.map