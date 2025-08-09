"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["src_app_features_auth_auth_routes_ts"],{

/***/ 9105:
/*!**********************************************!*\
  !*** ./src/app/features/auth/auth.routes.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authRoutes: () => (/* binding */ authRoutes)
/* harmony export */ });
const authRoutes = [{
  path: "login",
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_auth_components_login_login_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./components/login/login.component */ 7146)).then(m => m.LoginComponent)
}, {
  path: "verify-otp",
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_auth_components_verify-otp_verify-otp_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./components/verify-otp/verify-otp.component */ 7438)).then(m => m.VerifyOtpComponent)
}, {
  path: "signup",
  loadComponent: () => Promise.all(/*! import() */[__webpack_require__.e("default-node_modules_angular_material_fesm2022_select_mjs"), __webpack_require__.e("src_app_features_auth_components_signup_signup_component_ts")]).then(__webpack_require__.bind(__webpack_require__, /*! ./components/signup/signup.component */ 5848)).then(m => m.SignupComponent)
}, {
  path: "verify-email",
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_auth_components_verify-email_verify-email_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./components/verify-email/verify-email.component */ 5652)).then(m => m.VerifyEmailComponent)
}, {
  path: "forgot-password",
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_auth_components_forgot-password_forgot-password_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./components/forgot-password/forgot-password.component */ 9982)).then(m => m.ForgotPasswordComponent)
}, {
  path: "reset-password",
  loadComponent: () => __webpack_require__.e(/*! import() */ "src_app_features_auth_components_reset-password_reset-password_component_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./components/reset-password/reset-password.component */ 326)).then(m => m.ResetPasswordComponent)
}, {
  path: "",
  redirectTo: "login",
  pathMatch: "full"
}];

/***/ })

}]);
//# sourceMappingURL=src_app_features_auth_auth_routes_ts.js.map