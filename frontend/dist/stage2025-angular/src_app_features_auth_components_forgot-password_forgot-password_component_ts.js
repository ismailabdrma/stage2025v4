"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_auth_components_forgot-password_forgot-password_component_ts"],{

/***/ 9982:
/*!***************************************************************************************!*\
  !*** ./src/app/features/auth/components/forgot-password/forgot-password.component.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ForgotPasswordComponent: () => (/* binding */ ForgotPasswordComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var _core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/store/auth/auth.actions */ 4134);
/* harmony import */ var _core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @core/store/auth/auth.selectors */ 2319);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);






















function ForgotPasswordComponent_mat_error_13_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Email is required ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ForgotPasswordComponent_mat_error_14_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-error");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, " Please enter a valid email ");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
function ForgotPasswordComponent_mat_spinner_17_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-spinner", 11);
  }
}
function ForgotPasswordComponent_span_19_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "Send Reset Code");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
  }
}
class ForgotPasswordComponent {
  constructor() {
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder);
    this.store = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_ngrx_store__WEBPACK_IMPORTED_MODULE_4__.Store);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar);
    this.loading$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthLoading);
    this.forgotPasswordForm = this.fb.group({
      email: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.email]]
    });
  }
  ngOnInit() {
    this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthError).subscribe(error => {
      if (error) {
        this.snackBar.open(error, 'Close', {
          duration: 5000
        });
      }
    });
    this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_1__.selectAuthMessage).subscribe(message => {
      if (message) {
        this.snackBar.open(message, 'Close', {
          duration: 5000
        });
      }
    });
  }
  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.forgotPassword({
        email: this.forgotPasswordForm.value.email
      }));
    }
  }
  static {
    this.ɵfac = function ForgotPasswordComponent_Factory(t) {
      return new (t || ForgotPasswordComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: ForgotPasswordComponent,
      selectors: [["app-forgot-password"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵStandaloneFeature"]],
      decls: 26,
      vars: 12,
      consts: [[1, "auth-container"], [1, "auth-card"], [3, "ngSubmit", "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "type", "email", "formControlName", "email", "required", ""], [4, "ngIf"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "full-width", 3, "disabled"], ["diameter", "20", 4, "ngIf"], ["align", "end"], ["mat-button", "", "routerLink", "/auth/login"], ["mat-button", "", "routerLink", "/auth/reset-password"], ["diameter", "20"]],
      template: function ForgotPasswordComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "Forgot Password");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-card-subtitle");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, "Enter your email to reset your password");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "mat-card-content")(8, "form", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("ngSubmit", function ForgotPasswordComponent_Template_form_ngSubmit_8_listener() {
            return ctx.onSubmit();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "mat-form-field", 3)(10, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](12, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, ForgotPasswordComponent_mat_error_13_Template, 2, 0, "mat-error", 5)(14, ForgotPasswordComponent_mat_error_14_Template, 2, 0, "mat-error", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](16, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, ForgotPasswordComponent_mat_spinner_17_Template, 1, 0, "mat-spinner", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](18, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](19, ForgotPasswordComponent_span_19_Template, 2, 0, "span", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](20, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "mat-card-actions", 8)(22, "a", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](23, "Back to Login");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](24, "a", 10);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](25, "Already have a code?");
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]()()()();
        }
        if (rf & 2) {
          let tmp_1_0;
          let tmp_2_0;
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.forgotPasswordForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_1_0 = ctx.forgotPasswordForm.get("email")) == null ? null : tmp_1_0.hasError("required"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", (tmp_2_0 = ctx.forgotPasswordForm.get("email")) == null ? null : tmp_2_0.hasError("email"));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("disabled", ctx.forgotPasswordForm.invalid || _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](16, 6, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](18, 8, ctx.loading$));
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](20, 10, ctx.loading$));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.AsyncPipe, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormControlName, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterLink, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardActions, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardContent, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardHeader, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardSubtitle, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardTitle, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatLabel, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__.MatError, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_10__.MatInput, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatAnchor, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButton, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_12__.MatProgressSpinner, _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBarModule],
      styles: ["scss[_ngcontent-%COMP%]   .auth-container[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: calc(100vh - 64px); \n\n  background-color: #f4f4f4; \n\n  padding: 20px;\n}\n\n.auth-card[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 400px; \n\n  padding: 20px;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n\nmat-card-title[_ngcontent-%COMP%], mat-card-subtitle[_ngcontent-%COMP%] {\n  text-align: center;\n  margin-bottom: 20px;\n}\n\n.full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\nmat-form-field[_ngcontent-%COMP%] {\n  margin-bottom: 15px;\n}\n\nmat-card-actions[_ngcontent-%COMP%] {\n  justify-content: flex-end; \n\n  margin-top: 20px;\n}\n\n\n\n@media (max-width: 480px) {\n  .auth-card[_ngcontent-%COMP%] {\n    padding: 15px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL3N0eWxlcy9hdXRoLnNjc3MiLCJ3ZWJwYWNrOi8vLi9zcmMvYXBwL2ZlYXR1cmVzL2F1dGgvY29tcG9uZW50cy9mb3Jnb3QtcGFzc3dvcmQvZm9yZ290LXBhc3N3b3JkLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBSUUsYUFBQTtFQUNBLHVCQUFBO0VBQ0EsbUJBQUE7RUFDQSw4QkFBQSxFQUFBLGtDQUFBO0VBQ0EseUJBQUEsRUFBQSxxQkFBQTtFQUNBLGFBQUE7QUNGRjs7QURLQTtFQUNFLFdBQUE7RUFDQSxnQkFBQSxFQUFBLDJCQUFBO0VBQ0EsYUFBQTtFQUNBLHdDQUFBO0FDRkY7O0FES0E7O0VBRUUsa0JBQUE7RUFDQSxtQkFBQTtBQ0ZGOztBREtBO0VBQ0UsV0FBQTtBQ0ZGOztBREtBO0VBQ0UsbUJBQUE7QUNGRjs7QURLQTtFQUNFLHlCQUFBLEVBQUEsK0JBQUE7RUFDQSxnQkFBQTtBQ0ZGOztBREtBLDJCQUFBO0FBQ0E7RUFDRTtJQUNFLGFBQUE7RUNGRjtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsic2Nzc1xyXG4vKiBTaGFyZWQgQXV0aGVudGljYXRpb24gU3R5bGVzICovXHJcblxyXG4uYXV0aC1jb250YWluZXIge1xyXG4gIGRpc3BsYXk6IGZsZXg7XHJcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gNjRweCk7IC8qIEFkanVzdCBiYXNlZCBvbiBoZWFkZXIgaGVpZ2h0ICovXHJcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDsgLyogTGlnaHQgYmFja2dyb3VuZCAqL1xyXG4gIHBhZGRpbmc6IDIwcHg7XHJcbn1cclxuXHJcbi5hdXRoLWNhcmQge1xyXG4gIHdpZHRoOiAxMDAlO1xyXG4gIG1heC13aWR0aDogNDAwcHg7IC8qIE1heCB3aWR0aCBmb3IgdGhlIGNhcmQgKi9cclxuICBwYWRkaW5nOiAyMHB4O1xyXG4gIGJveC1zaGFkb3c6IDAgNHB4IDhweCByZ2JhKDAsIDAsIDAsIDAuMSk7XHJcbn1cclxuXHJcbm1hdC1jYXJkLXRpdGxlLFxyXG5tYXQtY2FyZC1zdWJ0aXRsZSB7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XHJcbn1cclxuXHJcbi5mdWxsLXdpZHRoIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxubWF0LWZvcm0tZmllbGQge1xyXG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XHJcbn1cclxuXHJcbm1hdC1jYXJkLWFjdGlvbnMge1xyXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7IC8qIEFsaWduIGJ1dHRvbnMgdG8gdGhlIHJpZ2h0ICovXHJcbiAgbWFyZ2luLXRvcDogMjBweDtcclxufVxyXG5cclxuLyogUmVzcG9uc2l2ZSBhZGp1c3RtZW50cyAqL1xyXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcclxuICAuYXV0aC1jYXJkIHtcclxuICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgfVxyXG59Iiwic2NzcyAuYXV0aC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDY0cHgpOyAvKiBBZGp1c3QgYmFzZWQgb24gaGVhZGVyIGhlaWdodCAqL1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjRmNGY0OyAvKiBMaWdodCBiYWNrZ3JvdW5kICovXG4gIHBhZGRpbmc6IDIwcHg7XG59XG5cbi5hdXRoLWNhcmQge1xuICB3aWR0aDogMTAwJTtcbiAgbWF4LXdpZHRoOiA0MDBweDsgLyogTWF4IHdpZHRoIGZvciB0aGUgY2FyZCAqL1xuICBwYWRkaW5nOiAyMHB4O1xuICBib3gtc2hhZG93OiAwIDRweCA4cHggcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG5tYXQtY2FyZC10aXRsZSxcbm1hdC1jYXJkLXN1YnRpdGxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAyMHB4O1xufVxuXG4uZnVsbC13aWR0aCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5tYXQtZm9ybS1maWVsZCB7XG4gIG1hcmdpbi1ib3R0b206IDE1cHg7XG59XG5cbm1hdC1jYXJkLWFjdGlvbnMge1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kOyAvKiBBbGlnbiBidXR0b25zIHRvIHRoZSByaWdodCAqL1xuICBtYXJnaW4tdG9wOiAyMHB4O1xufVxuXG4vKiBSZXNwb25zaXZlIGFkanVzdG1lbnRzICovXG5AbWVkaWEgKG1heC13aWR0aDogNDgwcHgpIHtcbiAgLmF1dGgtY2FyZCB7XG4gICAgcGFkZGluZzogMTVweDtcbiAgfVxufSJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_auth_components_forgot-password_forgot-password_component_ts.js.map