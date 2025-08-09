"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_admin_components_admin-users_admin-users_component_ts"],{

/***/ 9902:
/*!********************************************************************************************************!*\
  !*** ./src/app/features/admin/components/admin-users/admin-user-create/admin-user-create.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminUserCreateComponent: () => (/* binding */ AdminUserCreateComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/select */ 5175);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/auth.service */ 8010);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_material_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/core */ 4646);





















function AdminUserCreateComponent_mat_spinner_41_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "mat-spinner", 19);
  }
}
function AdminUserCreateComponent_span_42_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Create User");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
  }
}
class AdminUserCreateComponent {
  constructor() {
    this.fb = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormBuilder);
    this.authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
    this.dialogRef = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogRef);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_4__.MatSnackBar);
    this.loading = false;
    this.userForm = this.fb.group({
      username: ["", _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      email: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.email]],
      firstName: [""],
      lastName: [""],
      phone: [""],
      role: ["CLIENT", _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required],
      password: ["", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.Validators.minLength(6)]]
    });
  }
  onSave() {
    if (this.userForm.valid) {
      this.loading = true;
      this.authService.createUser(this.userForm.value).subscribe({
        next: newUser => {
          this.loading = false;
          this.snackBar.open('User created successfully!', 'Close', {
            duration: 3000
          });
          this.dialogRef.close(newUser); // Close dialog and pass the new user data
        },
        error: error => {
          console.error('Error creating user:', error);
          this.loading = false;
          const errorMessage = error.error?.message || 'Failed to create user.';
          this.snackBar.open(errorMessage, 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
  onCancel() {
    this.dialogRef.close();
  }
  static {
    this.ɵfac = function AdminUserCreateComponent_Factory(t) {
      return new (t || AdminUserCreateComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: AdminUserCreateComponent,
      selectors: [["app-admin-user-create"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵStandaloneFeature"]],
      decls: 43,
      vars: 4,
      consts: [["mat-dialog-title", ""], [3, "formGroup"], ["appearance", "outline", 1, "full-width"], ["matInput", "", "formControlName", "username", "required", ""], ["matInput", "", "type", "email", "formControlName", "email", "required", ""], [1, "form-row"], ["appearance", "outline", 1, "half-width"], ["matInput", "", "formControlName", "firstName"], ["matInput", "", "formControlName", "lastName"], ["matInput", "", "formControlName", "phone"], ["formControlName", "role", "required", ""], ["value", "CLIENT"], ["value", "ADMIN"], ["matInput", "", "type", "password", "formControlName", "password", "required", ""], ["align", "end"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], ["diameter", "20"]],
      template: function AdminUserCreateComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "h2", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, "Create User");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-dialog-content")(3, "form", 1)(4, "mat-form-field", 2)(5, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](6, "Username");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "input", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-form-field", 2)(9, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Email");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "input", 4);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 5)(13, "mat-form-field", 6)(14, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "First Name");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](16, "input", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-form-field", 6)(18, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](19, "Last Name");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](20, "input", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "mat-form-field", 2)(22, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](23, "Phone");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](24, "input", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "mat-form-field", 2)(26, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](27, "Role");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "mat-select", 10)(29, "mat-option", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](30, "Client");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](31, "mat-option", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](32, "Admin");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](33, "mat-form-field", 2)(34, "mat-label");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](35, "Password");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](36, "input", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "mat-dialog-actions", 14)(38, "button", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AdminUserCreateComponent_Template_button_click_38_listener() {
            return ctx.onCancel();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](39, "Cancel");
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](40, "button", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AdminUserCreateComponent_Template_button_click_40_listener() {
            return ctx.onSave();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](41, AdminUserCreateComponent_mat_spinner_41_Template, 1, 0, "mat-spinner", 17)(42, AdminUserCreateComponent_span_42_Template, 2, 0, "span", 18);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formGroup", ctx.userForm);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](37);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", ctx.userForm.invalid || ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.loading);
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.loading);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_5__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_5__.NgIf, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.ReactiveFormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["ɵNgNoValidate"], _angular_forms__WEBPACK_IMPORTED_MODULE_2__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.NgControlStatusGroup, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.RequiredValidator, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormGroupDirective, _angular_forms__WEBPACK_IMPORTED_MODULE_2__.FormControlName, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogModule, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogTitle, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogActions, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_3__.MatDialogContent, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormFieldModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatFormField, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__.MatLabel, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInputModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_7__.MatInput, _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelectModule, _angular_material_select__WEBPACK_IMPORTED_MODULE_8__.MatSelect, _angular_material_core__WEBPACK_IMPORTED_MODULE_9__.MatOption, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_10__.MatButton, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__.MatProgressSpinnerModule, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_11__.MatProgressSpinner],
      styles: [".full-width[_ngcontent-%COMP%] {\n  width: 100%;\n  margin-bottom: 16px;\n}\n\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 16px;\n}\n\n.half-width[_ngcontent-%COMP%] {\n  flex: 1;\n  margin-bottom: 16px;\n}\n\nmat-dialog-content[_ngcontent-%COMP%] {\n  min-width: 400px;\n}\n\nmat-spinner[_ngcontent-%COMP%] {\n  margin-right: 8px;\n}\n\n@media (max-width: 768px) {\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  mat-dialog-content[_ngcontent-%COMP%] {\n    min-width: 300px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vY29tcG9uZW50cy9hZG1pbi11c2Vycy9hZG1pbi11c2VyLWNyZWF0ZS9hZG1pbi11c2VyLWNyZWF0ZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0k7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7QUFBTjs7QUFHSTtFQUNFLGFBQUE7RUFDQSxTQUFBO0FBQU47O0FBR0k7RUFDRSxPQUFBO0VBQ0EsbUJBQUE7QUFBTjs7QUFHSTtFQUNFLGdCQUFBO0FBQU47O0FBR0k7RUFDRSxpQkFBQTtBQUFOOztBQUdJO0VBQ0U7SUFDRSxzQkFBQTtFQUFOO0VBR0k7SUFDRSxnQkFBQTtFQUROO0FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgICAuZnVsbC13aWR0aCB7XG4gICAgICB3aWR0aDogMTAwJTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuXG4gICAgLmZvcm0tcm93IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBnYXA6IDE2cHg7XG4gICAgfVxuXG4gICAgLmhhbGYtd2lkdGgge1xuICAgICAgZmxleDogMTtcbiAgICAgIG1hcmdpbi1ib3R0b206IDE2cHg7XG4gICAgfVxuXG4gICAgbWF0LWRpYWxvZy1jb250ZW50IHtcbiAgICAgIG1pbi13aWR0aDogNDAwcHg7XG4gICAgfVxuXG4gICAgbWF0LXNwaW5uZXIge1xuICAgICAgbWFyZ2luLXJpZ2h0OiA4cHg7XG4gICAgfVxuXG4gICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XG4gICAgICAuZm9ybS1yb3cge1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgfVxuICAgICAgXG4gICAgICBtYXQtZGlhbG9nLWNvbnRlbnQge1xuICAgICAgICBtaW4td2lkdGg6IDMwMHB4O1xuICAgICAgfVxuICAgIH1cbiAgIl0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 7891:
/*!********************************************************************************!*\
  !*** ./src/app/features/admin/components/admin-users/admin-users.component.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AdminUsersComponent: () => (/* binding */ AdminUsersComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/table */ 7697);
/* harmony import */ var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/paginator */ 4624);
/* harmony import */ var _angular_material_sort__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sort */ 2047);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/dialog */ 2587);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @core/services/auth.service */ 8010);
/* harmony import */ var _admin_user_create_admin_user_create_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./admin-user-create/admin-user-create.component */ 9902);
/* harmony import */ var _shared_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @shared/components/confirm-dialog/confirm-dialog.component */ 8709);




















class AdminUsersComponent {
  constructor() {
    this.authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
    this.dialog = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialog);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar);
    this.users = [];
    this.loading = true;
    this.displayedColumns = ["username", "email", "role", "status", "actions"];
  }
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers() {
    this.loading = true;
    this.authService.getAllUsers().subscribe({
      next: users => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Error loading users.', 'Close', {
          duration: 3000
        });
        this.loading = false;
      }
    });
  }
  openCreateDialog() {
    const dialogRef = this.dialog.open(_admin_user_create_admin_user_create_component__WEBPACK_IMPORTED_MODULE_1__.AdminUserCreateComponent, {
      width: "500px"
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsers(); // Refresh users list after creation
      }
    });
  }
  toggleUserStatus(user) {
    const newStatus = !user.active;
    this.authService.updateUserStatus(user.id, newStatus).subscribe({
      next: () => {
        user.active = newStatus;
        this.snackBar.open(`User ${user.username} status updated.`, 'Close', {
          duration: 3000
        });
      },
      error: () => this.snackBar.open(`Error updating user ${user.username} status.`, 'Close', {
        duration: 3000
      })
    });
  }
  deleteUser(id) {
    const dialogRef = this.dialog.open(_shared_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_2__.ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this user?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteUser(id).subscribe({
          next: () => {
            this.snackBar.open('User deleted successfully.', 'Close', {
              duration: 3000
            });
            this.loadUsers();
          },
          error: () => this.snackBar.open('Error deleting user.', 'Close', {
            duration: 3000
          })
        });
      }
    });
  }
  static {
    this.ɵfac = function AdminUsersComponent_Factory(t) {
      return new (t || AdminUsersComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: AdminUsersComponent,
      selectors: [["app-admin-users"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 12,
      vars: 0,
      consts: [[1, "admin-users-container"], [1, "header"], ["mat-raised-button", "", "color", "primary", 3, "click"]],
      template: function AdminUsersComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 0)(1, "div", 1)(2, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Manage Users");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function AdminUsersComponent_Template_button_click_4_listener() {
            return ctx.openCreateDialog();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, "add");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, " Add User ");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "mat-card")(9, "mat-card-content")(10, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "User management functionality will be implemented here.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()()();
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_router__WEBPACK_IMPORTED_MODULE_7__.RouterModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardModule, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCard, _angular_material_card__WEBPACK_IMPORTED_MODULE_8__.MatCardContent, _angular_material_table__WEBPACK_IMPORTED_MODULE_9__.MatTableModule, _angular_material_paginator__WEBPACK_IMPORTED_MODULE_10__.MatPaginatorModule, _angular_material_sort__WEBPACK_IMPORTED_MODULE_11__.MatSortModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_12__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_13__.MatInputModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_14__.MatButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_15__.MatIcon, _angular_material_dialog__WEBPACK_IMPORTED_MODULE_4__.MatDialogModule],
      styles: [".admin-users-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1200px;\n  margin: 0 auto;\n}\n\n.header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n}\n\n@media (max-width: 768px) {\n  .header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 16px;\n    align-items: stretch;\n  }\n}\n.mat-mdc-card[_ngcontent-%COMP%] {\n  padding: 24px;\n}\n\n.mat-mdc-table[_ngcontent-%COMP%] {\n  width: 100%;\n}\n\n.mat-column-actions[_ngcontent-%COMP%] {\n  width: 120px;\n  text-align: center;\n  white-space: nowrap; \n\n}\n\n.mat-column-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0 4px;\n}\n\n.mat-column-status[_ngcontent-%COMP%] {\n  width: 100px;\n  text-align: center;\n}\n\n.loading-spinner[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 20px;\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvYWRtaW4vY29tcG9uZW50cy9hZG1pbi11c2Vycy9hZG1pbi11c2Vycy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSw4QkFBQTtFQUNBLG1CQUFBO0VBQ0EsbUJBQUE7QUFDRjs7QUFFQTtFQUNFO0lBQ0Usc0JBQUE7SUFDQSxTQUFBO0lBQ0Esb0JBQUE7RUFDRjtBQUNGO0FBRUE7RUFDRSxhQUFBO0FBQUY7O0FBR0E7RUFDRSxXQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQSxFQUFBLGtDQUFBO0FBQUY7O0FBR0E7RUFDRSxhQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7QUFBRjs7QUFHQTtFQUFtQixrQkFBQTtFQUFvQixhQUFBO0FBRXZDIiwic291cmNlc0NvbnRlbnQiOlsiLmFkbWluLXVzZXJzLWNvbnRhaW5lciB7XHJcbiAgcGFkZGluZzogMjBweDtcclxuICBtYXgtd2lkdGg6IDEyMDBweDtcclxuICBtYXJnaW46IDAgYXV0bztcclxufVxyXG5cclxuLmhlYWRlciB7XHJcbiAgZGlzcGxheTogZmxleDtcclxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xyXG59XHJcblxyXG5AbWVkaWEgKG1heC13aWR0aDogNzY4cHgpIHtcclxuICAuaGVhZGVyIHtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBnYXA6IDE2cHg7XHJcbiAgICBhbGlnbi1pdGVtczogc3RyZXRjaDtcclxuICB9XHJcbn1cclxuXHJcbi5tYXQtbWRjLWNhcmQge1xyXG4gIHBhZGRpbmc6IDI0cHg7XHJcbn1cclxuXHJcbi5tYXQtbWRjLXRhYmxlIHtcclxuICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm1hdC1jb2x1bW4tYWN0aW9ucyB7XHJcbiAgd2lkdGg6IDEyMHB4O1xyXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICB3aGl0ZS1zcGFjZTogbm93cmFwOyAvKiBQcmV2ZW50IGJ1dHRvbnMgZnJvbSB3cmFwcGluZyAqL1xyXG59XHJcblxyXG4ubWF0LWNvbHVtbi1hY3Rpb25zIGJ1dHRvbiB7XHJcbiAgbWFyZ2luOiAwIDRweDtcclxufVxyXG5cclxuLm1hdC1jb2x1bW4tc3RhdHVzIHtcclxuICB3aWR0aDogMTAwcHg7XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ubG9hZGluZy1zcGlubmVyIHsgdGV4dC1hbGlnbjogY2VudGVyOyBwYWRkaW5nOiAyMHB4OyB9XHJcbiJdLCJzb3VyY2VSb290IjoiIn0= */"]
    });
  }
}

/***/ })

}]);
//# sourceMappingURL=src_app_features_admin_components_admin-users_admin-users_component_ts.js.map