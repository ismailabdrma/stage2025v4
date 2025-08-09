"use strict";
(self["webpackChunkstage2025_angular"] = self["webpackChunkstage2025_angular"] || []).push([["main"],{

/***/ 92:
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppComponent: () => (/* binding */ AppComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/toolbar */ 9552);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/sidenav */ 7049);
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/list */ 943);
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/menu */ 1034);
/* harmony import */ var _angular_material_badge__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/badge */ 6256);
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/divider */ 4102);
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/form-field */ 4950);
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/input */ 5541);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/services/auth.service */ 8010);
/* harmony import */ var _core_services_cart_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/services/cart.service */ 3661);
/* harmony import */ var _core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core/store/auth/auth.selectors */ 2319);
/* harmony import */ var _core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core/store/auth/auth.actions */ 4134);




























function AppComponent_ng_container_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "button", 33)(2, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](3, "account_circle");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, " Mon compte ");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "mat-menu", null, 3)(7, "button", 34)(8, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](9, "person");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](10, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](11, "Profil");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](12, "button", 35)(13, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](14, "receipt");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](15, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](16, "Mes commandes");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](17, "mat-divider");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](18, "button", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_ng_container_22_Template_button_click_18_listener() {
      _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r4);
      const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx_r4.logout());
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](19, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](20, "logout");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](21, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](22, "Se d\u00E9connecter");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const userMenu_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("matMenuTriggerFor", userMenu_r6);
  }
}
function AppComponent_ng_template_24_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "button", 37)(1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "login");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Se connecter");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
function AppComponent_a_51_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "a", 38)(1, "mat-icon", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2, "admin_panel_settings");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "span", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "Administration");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
  }
}
class AppComponent {
  constructor() {
    this.store = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_ngrx_store__WEBPACK_IMPORTED_MODULE_5__.Store);
    this.authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_core_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
    this.cartService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_core_services_cart_service__WEBPACK_IMPORTED_MODULE_1__.CartService);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_6__.Router);
    this.user$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_2__.selectUser);
    this.isAuthenticated$ = this.store.select(_core_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_2__.selectIsAuthenticated);
    this.cartItemCount = 0;
    this.isAdmin = false;
  }
  ngOnInit() {
    const token = localStorage.getItem("token");
    if (token) {
      this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_3__.AuthActions.checkAuthStatus());
    }
    this.user$.subscribe(user => {
      this.isAdmin = user?.role === "ADMIN";
    });
    this.cartService.getCart().subscribe(cart => {
      this.cartItemCount = cart?.items?.length || 0;
    });
  }
  logout() {
    this.store.dispatch(_core_store_auth_auth_actions__WEBPACK_IMPORTED_MODULE_3__.AuthActions.logout());
  }
  onSearch(term) {
    this.router.navigate(["/products"], {
      queryParams: {
        search: term || null
      },
      queryParamsHandling: "merge"
    });
  }
  static {
    this.ɵfac = function AppComponent_Factory(t) {
      return new (t || AppComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({
      type: AppComponent,
      selectors: [["app-root"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵStandaloneFeature"]],
      decls: 73,
      vars: 6,
      consts: [["searchInput", ""], ["loginButton", ""], ["sidenav", ""], ["userMenu", "matMenu"], [1, "app-container"], ["color", "primary", 1, "app-toolbar"], ["mat-icon-button", "", "aria-label", "Toggle navigation", 3, "click"], ["routerLink", "/", "aria-label", "Aller \u00E0 l'accueil", 1, "brand"], ["src", "assets/logo.svg", "alt", "Brand", "height", "28"], ["role", "search", "aria-label", "Recherche de produits", 1, "search", 3, "submit"], [1, "search-box"], [1, "prefix"], ["type", "search", "placeholder", "Rechercher un produit\u2026", "aria-label", "Rechercher"], ["type", "button", "aria-label", "Effacer la recherche", 3, "click"], [1, "spacer"], ["routerLink", "/cart", "aria-label", "Ouvrir le panier", 1, "cart-link"], [4, "ngIf", "ngIfElse"], [1, "sidenav-container"], ["mode", "side", "opened", "false", 1, "sidenav"], ["mat-list-item", "", "routerLink", "/products", "routerLinkActive", "active"], ["matListItemIcon", ""], ["matListItemTitle", ""], ["mat-list-item", "", "routerLink", "/cart", "routerLinkActive", "active"], ["mat-list-item", "", "routerLink", "/orders", "routerLinkActive", "active"], ["mat-list-item", "", "routerLink", "/profile", "routerLinkActive", "active"], ["mat-list-item", "", "routerLink", "/admin", "routerLinkActive", "active", 4, "ngIf"], [1, "main-content"], [1, "footer"], [1, "footer-grid"], ["routerLink", "/products"], ["routerLink", "/profile"], ["routerLink", "/"], [1, "copy"], ["mat-button", "", 3, "matMenuTriggerFor"], ["mat-menu-item", "", "routerLink", "/profile"], ["mat-menu-item", "", "routerLink", "/orders"], ["mat-menu-item", "", 3, "click"], ["mat-button", "", "routerLink", "/auth/login"], ["mat-list-item", "", "routerLink", "/admin", "routerLinkActive", "active"]],
      template: function AppComponent_Template(rf, ctx) {
        if (rf & 1) {
          const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵgetCurrentView"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](0, "div", 4)(1, "mat-toolbar", 5)(2, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_Template_button_click_2_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
            const sidenav_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](28);
            return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](sidenav_r2.toggle());
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](3, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](4, "menu");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](5, "a", 7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](6, "img", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](7, "form", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("submit", function AppComponent_Template_form_submit_7_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
            const searchInput_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
            return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx.onSearch(searchInput_r3.value));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](8, "div", 10)(9, "mat-icon", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](10, "search");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](11, "input", 12, 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](13, "button", 13);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵlistener"]("click", function AppComponent_Template_button_click_13_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵrestoreView"](_r1);
            const searchInput_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](12);
            searchInput_r3.value = "";
            return _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵresetView"](ctx.onSearch(""));
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](14, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](15, "close");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](16, "span", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](17, "a", 15)(18, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](19, "shopping_cart");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](20, "span");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](22, AppComponent_ng_container_22_Template, 23, 1, "ng-container", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipe"](23, "async");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](24, AppComponent_ng_template_24_Template, 5, 0, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplateRefExtractor"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](26, "mat-sidenav-container", 17)(27, "mat-sidenav", 18, 2)(29, "mat-nav-list")(30, "a", 19)(31, "mat-icon", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](32, "inventory");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](33, "span", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](34, "Produits");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](35, "a", 22)(36, "mat-icon", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](37, "shopping_cart");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](38, "span", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](39, "Panier");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](40, "a", 23)(41, "mat-icon", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](42, "receipt");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](43, "span", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](44, "Commandes");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](45, "a", 24)(46, "mat-icon", 20);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](47, "person");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](48, "span", 21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](49, "Profil");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](50, "mat-divider");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](51, AppComponent_a_51_Template, 5, 0, "a", 25);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](52, "mat-sidenav-content", 26);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](53, "router-outlet");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](54, "footer", 27)(55, "div", 28)(56, "div")(57, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](58, "Catalogue");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](59, "a", 29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](60, "Tous les produits");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](61, "div")(62, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](63, "Support");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](64, "a", 30);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](65, "Mon compte");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](66, "div")(67, "h4");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](68, "Soci\u00E9t\u00E9");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](69, "a", 31);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](70, "\u00C0 propos");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](71, "div", 32);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](72, "\u00A9 Stage2025");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]()()()()();
        }
        if (rf & 2) {
          const loginButton_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵreference"](25);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](21);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"]("Panier (", ctx.cartItemCount, ")");
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpipeBind1"](23, 4, ctx.isAuthenticated$))("ngIfElse", loginButton_r7);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](29);
          _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngIf", ctx.isAdmin);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_7__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_7__.NgIf, _angular_common__WEBPACK_IMPORTED_MODULE_7__.AsyncPipe, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterOutlet, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLink, _angular_router__WEBPACK_IMPORTED_MODULE_6__.RouterLinkActive, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbarModule, _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_8__.MatToolbar, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButtonModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatButton, _angular_material_button__WEBPACK_IMPORTED_MODULE_9__.MatIconButton, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_10__.MatIcon, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenavModule, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenav, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenavContainer, _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_11__.MatSidenavContent, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatListModule, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatNavList, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatListItem, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatListItemIcon, _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__.MatDivider, _angular_material_list__WEBPACK_IMPORTED_MODULE_12__.MatListItemTitle, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuModule, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenu, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuItem, _angular_material_menu__WEBPACK_IMPORTED_MODULE_14__.MatMenuTrigger, _angular_material_badge__WEBPACK_IMPORTED_MODULE_15__.MatBadgeModule, _angular_material_divider__WEBPACK_IMPORTED_MODULE_13__.MatDividerModule, _angular_material_form_field__WEBPACK_IMPORTED_MODULE_16__.MatFormFieldModule, _angular_material_input__WEBPACK_IMPORTED_MODULE_17__.MatInputModule],
      styles: [".app-container[_ngcontent-%COMP%] {\n  height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.app-toolbar[_ngcontent-%COMP%] {\n  position: sticky;\n  top: 0;\n  z-index: 1000;\n}\n\n.brand[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  margin: 0 12px;\n  text-decoration: none;\n}\n\n.search[_ngcontent-%COMP%] {\n  flex: 1 1 520px;\n  max-width: 720px;\n  margin-right: 16px;\n}\n\n.search-box[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: 32px 1fr 40px;\n  align-items: center;\n  gap: 6px;\n  padding: 6px 8px;\n  background: #fff;\n  border-radius: 8px;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n}\n\n.search-box[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  border: none;\n  outline: none;\n  font: inherit;\n  padding: 8px 4px;\n}\n\n.search-box[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  border: none;\n  background: transparent;\n  cursor: pointer;\n}\n\n.search-box[_ngcontent-%COMP%]   .prefix[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.54);\n}\n\n.spacer[_ngcontent-%COMP%] {\n  flex: 1 1 auto;\n}\n\n.cart-link[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  text-decoration: none;\n  color: #1B1B1B;\n  padding: 6px 10px;\n  border: 1px solid var(--brand-primary);\n  border-radius: 12px;\n}\n\n.cart-link[_ngcontent-%COMP%]:hover {\n  background: var(--brand-primary);\n}\n\n.sidenav-container[_ngcontent-%COMP%] {\n  flex: 1;\n}\n\n.sidenav[_ngcontent-%COMP%] {\n  width: 250px;\n}\n\n.main-content[_ngcontent-%COMP%] {\n  padding: 20px;\n}\n\n.footer[_ngcontent-%COMP%] {\n  margin-top: 40px;\n  padding: 24px 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.08);\n  color: #555;\n}\n\n.footer-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));\n  gap: 16px;\n}\n\n.footer[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n  color: inherit;\n  text-decoration: none;\n  display: block;\n  margin: 6px 0;\n}\n\n.copy[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-size: 12px;\n  color: #777;\n}\n\n.active[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.04);\n}\n\n@media (max-width: 768px) {\n  .main-content[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDTTtFQUFpQixhQUFBO0VBQWUsYUFBQTtFQUFlLHNCQUFBO0FBR3JEOztBQUZNO0VBQWUsZ0JBQUE7RUFBa0IsTUFBQTtFQUFRLGFBQUE7QUFRL0M7O0FBTk07RUFBUyxhQUFBO0VBQWUsbUJBQUE7RUFBcUIsY0FBQTtFQUFnQixxQkFBQTtBQWFuRTs7QUFYTTtFQUFVLGVBQUE7RUFBaUIsZ0JBQUE7RUFBa0Isa0JBQUE7QUFpQm5EOztBQWhCTTtFQUFjLGFBQUE7RUFBZSxvQ0FBQTtFQUFzQyxtQkFBQTtFQUFxQixRQUFBO0VBQVUsZ0JBQUE7RUFBa0IsZ0JBQUE7RUFBa0Isa0JBQUE7RUFBb0IscUNBQUE7QUEyQmhLOztBQTFCTTtFQUFvQixZQUFBO0VBQWMsYUFBQTtFQUFlLGFBQUE7RUFBZSxnQkFBQTtBQWlDdEU7O0FBaENNO0VBQXFCLFlBQUE7RUFBYyx1QkFBQTtFQUF5QixlQUFBO0FBc0NsRTs7QUFyQ007RUFBc0IsMEJBQUE7QUF5QzVCOztBQXZDTTtFQUFVLGNBQUE7QUEyQ2hCOztBQTFDTTtFQUFhLGFBQUE7RUFBYyxtQkFBQTtFQUFvQixRQUFBO0VBQVMscUJBQUE7RUFBc0IsY0FBQTtFQUFlLGlCQUFBO0VBQWtCLHNDQUFBO0VBQXVDLG1CQUFBO0FBcUQ1Sjs7QUFwRE07RUFBbUIsZ0NBQUE7QUF3RHpCOztBQXRETTtFQUFxQixPQUFBO0FBMEQzQjs7QUF6RE07RUFBVyxZQUFBO0FBNkRqQjs7QUE1RE07RUFBZ0IsYUFBQTtBQWdFdEI7O0FBOURNO0VBQVUsZ0JBQUE7RUFBa0IsZUFBQTtFQUFpQix5Q0FBQTtFQUF3QyxXQUFBO0FBcUUzRjs7QUFwRU07RUFBZSxhQUFBO0VBQWUsMkRBQUE7RUFBNkQsU0FBQTtBQTBFakc7O0FBekVNO0VBQVksY0FBQTtFQUFnQixxQkFBQTtFQUF1QixjQUFBO0VBQWdCLGFBQUE7QUFnRnpFOztBQS9FTTtFQUFRLGdCQUFBO0VBQWtCLGVBQUE7RUFBaUIsV0FBQTtBQXFGakQ7O0FBbkZNO0VBQVUscUNBQUE7QUF1RmhCOztBQXJGTTtFQUE0QjtJQUFnQixhQUFBO0VBMEZoRDtBQUNGIiwic291cmNlc0NvbnRlbnQiOlsiXG4gICAgICAuYXBwLWNvbnRhaW5lciB7IGhlaWdodDogMTAwdmg7IGRpc3BsYXk6IGZsZXg7IGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47IH1cbiAgICAgIC5hcHAtdG9vbGJhciB7IHBvc2l0aW9uOiBzdGlja3k7IHRvcDogMDsgei1pbmRleDogMTAwMDsgfVxuXG4gICAgICAuYnJhbmQgeyBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW46IDAgMTJweDsgdGV4dC1kZWNvcmF0aW9uOiBub25lOyB9XG5cbiAgICAgIC5zZWFyY2ggeyBmbGV4OiAxIDEgNTIwcHg7IG1heC13aWR0aDogNzIwcHg7IG1hcmdpbi1yaWdodDogMTZweDsgfVxuICAgICAgLnNlYXJjaC1ib3ggeyBkaXNwbGF5OiBncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IDMycHggMWZyIDQwcHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogNnB4OyBwYWRkaW5nOiA2cHggOHB4OyBiYWNrZ3JvdW5kOiAjZmZmOyBib3JkZXItcmFkaXVzOiA4cHg7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4xMik7IH1cbiAgICAgIC5zZWFyY2gtYm94IGlucHV0IHsgYm9yZGVyOiBub25lOyBvdXRsaW5lOiBub25lOyBmb250OiBpbmhlcml0OyBwYWRkaW5nOiA4cHggNHB4OyB9XG4gICAgICAuc2VhcmNoLWJveCBidXR0b24geyBib3JkZXI6IG5vbmU7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBjdXJzb3I6IHBvaW50ZXI7IH1cbiAgICAgIC5zZWFyY2gtYm94IC5wcmVmaXggeyBjb2xvcjogcmdiYSgwLDAsMCwwLjU0KTsgfVxuXG4gICAgICAuc3BhY2VyIHsgZmxleDogMSAxIGF1dG87IH1cbiAgICAgIC5jYXJ0LWxpbmsgeyBkaXNwbGF5OmZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsgZ2FwOjhweDsgdGV4dC1kZWNvcmF0aW9uOm5vbmU7IGNvbG9yOiMxQjFCMUI7IHBhZGRpbmc6NnB4IDEwcHg7IGJvcmRlcjoxcHggc29saWQgdmFyKC0tYnJhbmQtcHJpbWFyeSk7IGJvcmRlci1yYWRpdXM6MTJweDsgfVxuICAgICAgLmNhcnQtbGluazpob3ZlciB7IGJhY2tncm91bmQ6IHZhcigtLWJyYW5kLXByaW1hcnkpOyB9XG5cbiAgICAgIC5zaWRlbmF2LWNvbnRhaW5lciB7IGZsZXg6IDE7IH1cbiAgICAgIC5zaWRlbmF2IHsgd2lkdGg6IDI1MHB4OyB9XG4gICAgICAubWFpbi1jb250ZW50IHsgcGFkZGluZzogMjBweDsgfVxuXG4gICAgICAuZm9vdGVyIHsgbWFyZ2luLXRvcDogNDBweDsgcGFkZGluZzogMjRweCAwOyBib3JkZXItdG9wOiAxcHggc29saWQgcmdiYSgwLDAsMCwwLjA4KTsgY29sb3I6ICM1NTU7IH1cbiAgICAgIC5mb290ZXItZ3JpZCB7IGRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZml0LCBtaW5tYXgoMTgwcHgsIDFmcikpOyBnYXA6IDE2cHg7IH1cbiAgICAgIC5mb290ZXIgYSB7IGNvbG9yOiBpbmhlcml0OyB0ZXh0LWRlY29yYXRpb246IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyBtYXJnaW46IDZweCAwOyB9XG4gICAgICAuY29weSB7IG1hcmdpbi10b3A6IDEycHg7IGZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM3Nzc7IH1cblxuICAgICAgLmFjdGl2ZSB7IGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4wNCk7IH1cblxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7IC5tYWluLWNvbnRlbnQgeyBwYWRkaW5nOiAxMHB4OyB9IH1cbiAgICAiXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 2181:
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   routes: () => (/* binding */ routes)
/* harmony export */ });
/* harmony import */ var _core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/guards/auth.guard */ 4978);
/* harmony import */ var _core_guards_admin_guard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/guards/admin.guard */ 7823);
/* harmony import */ var _features_home_home_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./features/home/home.component */ 3738);



const routes = [{
  path: "",
  component: _features_home_home_component__WEBPACK_IMPORTED_MODULE_2__.HomeComponent
}, {
  path: "auth",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_auth_auth_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/auth/auth.routes */ 9105)).then(m => m.authRoutes)
}, {
  path: "products",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_products_products_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/products/products.routes */ 3285)).then(m => m.productsRoutes)
}, {
  path: "cart",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_cart_cart_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/cart/cart.routes */ 9329)).then(m => m.cartRoutes),
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard]
}, {
  path: "orders",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_orders_orders_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/orders/orders.routes */ 9871)).then(m => m.ordersRoutes),
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard]
}, {
  path: "profile",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_profile_profile_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/profile/profile.routes */ 1915)).then(m => m.profileRoutes),
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard]
}, {
  path: "admin",
  loadChildren: () => __webpack_require__.e(/*! import() */ "src_app_features_admin_admin_routes_ts").then(__webpack_require__.bind(__webpack_require__, /*! ./features/admin/admin.routes */ 8247)).then(m => m.adminRoutes),
  canActivate: [_core_guards_auth_guard__WEBPACK_IMPORTED_MODULE_0__.authGuard, _core_guards_admin_guard__WEBPACK_IMPORTED_MODULE_1__.adminGuard]
}, {
  path: "**",
  redirectTo: "/products"
}];

/***/ }),

/***/ 7823:
/*!********************************************!*\
  !*** ./src/app/core/guards/admin.guard.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   adminGuard: () => (/* binding */ adminGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ 4334);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var _store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../store/auth/auth.selectors */ 2319);





const adminGuard = () => {
  const store = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_ngrx_store__WEBPACK_IMPORTED_MODULE_2__.Store);
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_3__.Router);
  return store.select(_store_auth_auth_selectors__WEBPACK_IMPORTED_MODULE_0__.selectUser).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_4__.take)(1), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.map)(user => {
    if (user?.role === "ADMIN") {
      return true;
    }
    router.navigate(["/products"]);
    return false;
  }));
};

/***/ }),

/***/ 4978:
/*!*******************************************!*\
  !*** ./src/app/core/guards/auth.guard.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authGuard: () => (/* binding */ authGuard)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 8010);



const authGuard = () => {
  const authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_2__.Router);
  if (authService.isAuthenticated()) {
    return true;
  }
  router.navigate(["/auth/login"]);
  return false;
};

/***/ }),

/***/ 3622:
/*!*******************************************************!*\
  !*** ./src/app/core/interceptors/auth.interceptor.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authInterceptor: () => (/* binding */ authInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/auth.service */ 8010);


const authInterceptor = (req, next) => {
  const authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
  const token = authService.getToken();
  // Endpoints that should NOT receive the token
  const noAuthEndpoints = ['/api/auth/login', '/api/auth/signup', '/api/auth/verify-email', '/api/auth/login/verify-otp', '/api/auth/resend-otp', '/api/auth/forgot-password', '/api/auth/reset-password'];
  // Check if the request URL ends with one of the above endpoints
  const shouldSkipAuth = noAuthEndpoints.some(endpoint => req.url.endsWith(endpoint));
  if (token && !shouldSkipAuth) {
    return next(req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }));
  }
  return next(req);
};

/***/ }),

/***/ 9446:
/*!********************************************************!*\
  !*** ./src/app/core/interceptors/error.interceptor.ts ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   errorInterceptor: () => (/* binding */ errorInterceptor)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ 1318);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ 7919);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
// src/app/core/interceptors/error.interceptor.ts




const errorInterceptor = (req, next) => {
  const router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_1__.Router);
  const snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_2__.MatSnackBar);
  return next(req).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.catchError)(error => {
    let errorMessage = "An error occurred";
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      switch (error.status) {
        case 401:
          errorMessage = "Unauthorized access";
          localStorage.removeItem("token");
          router.navigate(["/auth/login"]);
          break;
        case 403:
          errorMessage = "Access forbidden";
          break;
        case 404:
          errorMessage = "Resource not found";
          break;
        case 500:
          errorMessage = "Internal server error";
          break;
        default:
          errorMessage = error.error?.message || `Error: ${error.status}`;
      }
    }
    snackBar.open(errorMessage, "Close", {
      duration: 5000,
      horizontalPosition: "end",
      verticalPosition: "top"
    });
    return (0,rxjs__WEBPACK_IMPORTED_MODULE_4__.throwError)(() => error);
  }));
};

/***/ }),

/***/ 8010:
/*!***********************************************!*\
  !*** ./src/app/core/services/auth.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthService: () => (/* binding */ AuthService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @environments/environment */ 5312);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ 271);





class AuthService {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient);
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/auth`;
  }
  signup(request) {
    return this.http.post(`${this.apiUrl}/signup`, request);
  }
  verifyEmail(request) {
    return this.http.post(`${this.apiUrl}/verify-email`, request);
  }
  // Update login method to handle OTP response
  login(request) {
    return this.http.post(`${this.apiUrl}/login`, request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_3__.map)(response => {
      // Check if backend indicates OTP is required
      if (response === 'OTP_REQUIRED') {
        return 'OTP_REQUIRED';
      }
      return response;
    }));
  }
  loginVerifyOtp(request) {
    return this.http.post(`${this.apiUrl}/login/verify-otp`, request);
  }
  resendOtp(email, type) {
    return this.http.post(`${this.apiUrl}/resend-otp`, {
      email,
      type
    });
  }
  forgotPassword(email) {
    return this.http.post(`${this.apiUrl}/forgot-password`, {
      email
    });
  }
  resetPassword(email, otp, newPassword) {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      email,
      otp,
      newPassword
    });
  }
  updateUserProfile(user) {
    return this.http.put(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/users/me`, user);
  }
  changePassword(passwordChangeRequest) {
    return this.http.put(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/users/me/password`, passwordChangeRequest);
  }
  getCurrentUser() {
    return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/users/me`);
  }
  logout() {
    localStorage.removeItem("token");
  }
  getToken() {
    return localStorage.getItem("token");
  }
  setToken(token) {
    localStorage.setItem("token", token);
  }
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp > Date.now() / 1000;
    } catch {
      return false;
    }
  }
  // Admin User Management Methods
  getAllUsers() {
    return this.http.get(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/users`);
  }
  updateUserStatus(id, status) {
    return this.http.put(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/users/${id}/status`, {
      active: status
    });
  }
  deleteUser(id) {
    return this.http.delete(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/users/${id}`);
  }
  createUser(user) {
    return this.http.post(`${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/users`, user);
  }
  static {
    this.ɵfac = function AuthService_Factory(t) {
      return new (t || AuthService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: AuthService,
      factory: AuthService.ɵfac,
      providedIn: "root"
    });
  }
}

/***/ }),

/***/ 3661:
/*!***********************************************!*\
  !*** ./src/app/core/services/cart.service.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CartService: () => (/* binding */ CartService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @environments/environment */ 5312);




class CartService {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient);
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api/cart`;
  }
  getCart() {
    return this.http.get(this.apiUrl);
  }
  addItemToCart(item) {
    return this.http.post(`${this.apiUrl}/add`, item);
  }
  updateItemQuantity(cartItemId, quantity) {
    return this.http.put(`${this.apiUrl}/item/${cartItemId}`, null, {
      params: {
        quantity: quantity.toString()
      }
    });
  }
  removeItemFromCart(cartItemId) {
    return this.http.delete(`${this.apiUrl}/item/${cartItemId}`);
  }
  clearCart() {
    return this.http.delete(`${this.apiUrl}/clear`);
  }
  static {
    this.ɵfac = function CartService_Factory(t) {
      return new (t || CartService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: CartService,
      factory: CartService.ɵfac,
      providedIn: "root"
    });
  }
}

/***/ }),

/***/ 7359:
/*!**************************************************!*\
  !*** ./src/app/core/services/product.service.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductService: () => (/* binding */ ProductService)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @environments/environment */ 5312);




class ProductService {
  constructor() {
    this.http = (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.inject)(_angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient);
    this.apiUrl = `${_environments_environment__WEBPACK_IMPORTED_MODULE_0__.environment.apiUrl}/api`;
  }
  getAllProducts(params) {
    let httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        const value = params[key];
        if (value !== undefined && value !== null) {
          httpParams = httpParams.append(key, value.toString());
        }
      });
    }
    return this.http.get(`${this.apiUrl}/products`, {
      params: httpParams
    });
  }
  getProductById(id) {
    return this.http.get(`${this.apiUrl}/products/${id}`);
  }
  getProductsByCategory(categoryName) {
    return this.http.get(`${this.apiUrl}/products/category/${categoryName}`);
  }
  createProduct(product) {
    return this.http.post(`${this.apiUrl}/products`, product);
  }
  updateProduct(id, product) {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }
  deleteProduct(id) {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }
  // Match backend endpoints /activate and /deactivate
  updateProductStatus(id, isActive) {
    const path = isActive ? "activate" : "deactivate";
    return this.http.put(`${this.apiUrl}/products/${id}/${path}`, {});
  }
  getFeaturedProducts() {
    return this.http.get(`${this.apiUrl}/products/featured`);
  }
  getSuggestedProducts(id) {
    return this.http.get(`${this.apiUrl}/products/${id}/suggested`);
  }
  getAllCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }
  static {
    this.ɵfac = function ProductService_Factory(t) {
      return new (t || ProductService)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
      token: ProductService,
      factory: ProductService.ɵfac,
      providedIn: "root"
    });
  }
}

/***/ }),

/***/ 4134:
/*!*************************************************!*\
  !*** ./src/app/core/store/auth/auth.actions.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthActions: () => (/* binding */ AuthActions)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 1383);
// auth.actions.ts

const AuthActions = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createActionGroup)({
  source: "Auth",
  events: {
    Login: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Login Success": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Login Requires OTP": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Login Verify OTP": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Login Complete": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    Signup: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Signup Success": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Verify Email": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Verify Email Success": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Check Auth Status": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.emptyProps)(),
    "Load User Success": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    Logout: (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.emptyProps)(),
    "Auth Error": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Resend OTP": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Resend OTP Success": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Forgot Password": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Forgot Password Success": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Reset Password": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    "Reset Password Success": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.props)(),
    // New action to reset only UI state (loading, error, message, OTP flags)
    "Reset Auth UI": (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.emptyProps)()
  }
});

/***/ }),

/***/ 1427:
/*!*************************************************!*\
  !*** ./src/app/core/store/auth/auth.effects.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AuthEffects: () => (/* binding */ AuthEffects)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @ngrx/effects */ 347);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 9452);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ 7953);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs/operators */ 3255);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ 1318);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs/operators */ 271);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs/operators */ 8764);
/* harmony import */ var _services_auth_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../services/auth.service */ 8010);
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth.actions */ 4134);








class AuthEffects {
  constructor() {
    this.actions$ = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.Actions);
    this.authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_services_auth_service__WEBPACK_IMPORTED_MODULE_0__.AuthService);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router);
    // --- LOGIN ---
    this.login$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.login), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.exhaustMap)(({
      request
    }) => this.authService.login(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_6__.mergeMap)(response => {
      // TODO: Handle successful login with JWT token response and dispatch AuthActions.loginComplete
      if (response && response.status === "OTP_REQUIRED") {
        // Redirect to verify-otp page with email as query param
        this.router.navigate(["/auth/verify-otp"], {
          queryParams: {
            email: request.identifier
          }
        });
        return [_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.loginRequiresOTP({
          email: request.identifier
        }), _auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.loginSuccess({
          message: "OTP sent to your email. Please verify."
        })];
      } else {
        // If backend returns a JWT, handle that here (future)
        return [_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.authError({
          error: "Unexpected response from server."
        })];
      }
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.authError({
      error: error.message || "Login failed"
    })))))));
    // --- LOGIN OTP ---
    this.loginVerifyOtp$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.loginVerifyOTP), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.exhaustMap)(({
      request
    }) => this.authService.loginVerifyOtp(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.exhaustMap)(response => {
      this.authService.setToken(response.token);
      return this.authService.getCurrentUser().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(user => _auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.loginComplete({
        response,
        user
      })));
    }), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.authError({
      error: error.message || "OTP verification failed"
    })))))));
    // After login/OTP, go to home
    this.loginSuccess$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.loginComplete), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(() => this.router.navigate(["/"]))), {
      dispatch: false
    });
    // --- SIGNUP ---
    this.signup$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.signup), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.exhaustMap)(({
      request
    }) => this.authService.signup(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(message => _auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.signupSuccess({
      message
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.authError({
      error: error.message || "Signup failed"
    })))))));
    // After signup, go to email OTP verify
    this.signupSuccess$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.signupSuccess), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(action => {
      // Set this on the signup form submit
      const email = sessionStorage.getItem("signup_email");
      if (email) {
        this.router.navigate(["/auth/verify-email"], {
          queryParams: {
            email
          }
        });
      }
    })), {
      dispatch: false
    });
    // --- VERIFY EMAIL (signup) ---
    this.verifyEmail$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.verifyEmail), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.exhaustMap)(({
      request
    }) => this.authService.verifyEmail(request).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(message => _auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.verifyEmailSuccess({
      message
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.authError({
      error: error.message || "Email verification failed"
    })))))));
    this.verifyEmailSuccess$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.verifyEmailSuccess), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(() => this.router.navigate(["/auth/login"]))), {
      dispatch: false
    });
    // --- FORGOT PASSWORD ---
    this.forgotPassword$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.forgotPassword), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.exhaustMap)(({
      email
    }) => this.authService.forgotPassword(email).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(message => _auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.forgotPasswordSuccess({
      message
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.authError({
      error: error.message || "Failed to send reset OTP"
    })))))));
    // After forgot password, go to reset password page with email param
    this.forgotPasswordSuccess$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.forgotPasswordSuccess), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(action => {
      const email = sessionStorage.getItem("forgot_email");
      if (email) {
        this.router.navigate(["/auth/reset-password"], {
          queryParams: {
            email
          }
        });
      }
    })), {
      dispatch: false
    });
    // --- RESET PASSWORD (OTP + new pass) ---
    this.resetPassword$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.resetPassword), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_5__.exhaustMap)(({
      email,
      otp,
      newPassword
    }) => this.authService.resetPassword(email, otp, newPassword).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.map)(message => _auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.resetPasswordSuccess({
      message
    })), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_7__.catchError)(error => (0,rxjs__WEBPACK_IMPORTED_MODULE_8__.of)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.authError({
      error: error.message || "Failed to reset password"
    })))))));
    this.resetPasswordSuccess$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.resetPasswordSuccess), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(() => this.router.navigate(["/"]))), {
      dispatch: false
    });
    // --- LOGOUT ---
    this.logout$ = (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.createEffect)(() => this.actions$.pipe((0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_3__.ofType)(_auth_actions__WEBPACK_IMPORTED_MODULE_1__.AuthActions.logout), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_10__.tap)(() => {
      this.authService.logout();
      this.router.navigate(["/auth/login"]);
    })), {
      dispatch: false
    });
  }
  static {
    this.ɵfac = function AuthEffects_Factory(t) {
      return new (t || AuthEffects)();
    };
  }
  static {
    this.ɵprov = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjectable"]({
      token: AuthEffects,
      factory: AuthEffects.ɵfac
    });
  }
}

/***/ }),

/***/ 433:
/*!*************************************************!*\
  !*** ./src/app/core/store/auth/auth.reducer.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   authReducer: () => (/* binding */ authReducer)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var _auth_actions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./auth.actions */ 4134);
// auth.reducer.ts


const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
  requiresOtp: false,
  otpEmail: null
};
const authReducer = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.createReducer)(initialState, (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.login, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.signup, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.verifyEmail, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.loginVerifyOTP, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.checkAuthStatus, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.resendOTP, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.forgotPassword, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.resetPassword, state => ({
  ...state,
  loading: true,
  error: null,
  message: null
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.loginRequiresOTP, (state, {
  email
}) => ({
  ...state,
  requiresOtp: true,
  otpEmail: email,
  loading: false,
  error: null
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.loginComplete, (state, {
  response,
  user
}) => ({
  ...state,
  user,
  isAuthenticated: true,
  loading: false,
  requiresOtp: false,
  error: null
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.loadUserSuccess, (state, {
  user
}) => ({
  ...state,
  user,
  isAuthenticated: true,
  loading: false
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.loginSuccess, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.signupSuccess, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.verifyEmailSuccess, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.resendOTPSuccess, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.forgotPasswordSuccess, _auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.resetPasswordSuccess, (state, {
  message
}) => ({
  ...state,
  loading: false,
  message,
  error: null
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.logout, () => ({
  ...initialState
})), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.authError, (state, {
  error
}) => ({
  ...state,
  loading: false,
  error,
  message: null,
  requiresOtp: false
})),
// Handle reset UI state action without logging out the user
(0,_ngrx_store__WEBPACK_IMPORTED_MODULE_1__.on)(_auth_actions__WEBPACK_IMPORTED_MODULE_0__.AuthActions.resetAuthUI, state => ({
  ...state,
  loading: false,
  error: null,
  message: null,
  requiresOtp: false,
  otpEmail: null
})));

/***/ }),

/***/ 2319:
/*!***************************************************!*\
  !*** ./src/app/core/store/auth/auth.selectors.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectAuthError: () => (/* binding */ selectAuthError),
/* harmony export */   selectAuthLoading: () => (/* binding */ selectAuthLoading),
/* harmony export */   selectAuthMessage: () => (/* binding */ selectAuthMessage),
/* harmony export */   selectAuthState: () => (/* binding */ selectAuthState),
/* harmony export */   selectIsAuthenticated: () => (/* binding */ selectIsAuthenticated),
/* harmony export */   selectOtpEmail: () => (/* binding */ selectOtpEmail),
/* harmony export */   selectRequiresOtp: () => (/* binding */ selectRequiresOtp),
/* harmony export */   selectUser: () => (/* binding */ selectUser)
/* harmony export */ });
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ngrx/store */ 1383);

const selectAuthState = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createFeatureSelector)("auth");
const selectUser = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAuthState, state => state.user);
const selectIsAuthenticated = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAuthState, state => state.isAuthenticated);
const selectAuthLoading = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAuthState, state => state.loading);
const selectAuthError = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAuthState, state => state.error);
const selectAuthMessage = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAuthState, state => state.message);
const selectRequiresOtp = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAuthState, state => state.requiresOtp);
const selectOtpEmail = (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_0__.createSelector)(selectAuthState, state => state.otpEmail);

/***/ }),

/***/ 3738:
/*!*************************************************!*\
  !*** ./src/app/features/home/home.component.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HomeComponent: () => (/* binding */ HomeComponent)
/* harmony export */ });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7580);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ 4456);
/* harmony import */ var _core_services_product_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/services/product.service */ 7359);
/* harmony import */ var _core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/services/auth.service */ 8010);
/* harmony import */ var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/snack-bar */ 3347);
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/progress-spinner */ 1134);
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ 3840);
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/card */ 3777);
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ 4175);
/* harmony import */ var _app_shared_components_product_card_product_card_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/shared/components/product-card/product-card.component */ 6071);

















function HomeComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomeComponent_div_20_Template_div_click_0_listener() {
      const category_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r1).$implicit;
      const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
      return _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵresetView"](ctx_r2.navigateToCategory(category_r2.id));
    });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "\uD83C\uDFF7\uFE0F");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
  }
  if (rf & 2) {
    const category_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](category_r2.name);
  }
}
function HomeComponent_ng_container_26_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](1, "app-product-card", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
  if (rf & 2) {
    const product_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("product", product_r4);
  }
}
function HomeComponent_ng_container_33_Template(rf, ctx) {
  if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "a", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2, "Admin Access");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
  }
}
class HomeComponent {
  constructor() {
    this.categories = [];
    this.featuredProducts = [];
    this.searchKeyword = '';
    this.isAdmin = false;
    this.loadingCategories = true;
    this.loadingFeaturedProducts = true;
    this.productService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_services_product_service__WEBPACK_IMPORTED_MODULE_0__.ProductService);
    this.router = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_router__WEBPACK_IMPORTED_MODULE_4__.Router);
    this.authService = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_core_services_auth_service__WEBPACK_IMPORTED_MODULE_1__.AuthService);
    this.snackBar = (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.inject)(_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_5__.MatSnackBar);
  }
  ngOnInit() {
    this.loadCategories();
    this.loadFeaturedProducts();
  }
  search() {
    if (this.searchKeyword && this.searchKeyword.trim().length > 0) {
      this.router.navigate(['/products'], {
        queryParams: {
          q: this.searchKeyword
        }
      });
    }
  }
  loadCategories() {
    this.loadingCategories = true;
    this.productService.getAllCategories().subscribe({
      next: data => {
        this.categories = data;
        this.loadingCategories = false;
      },
      error: error => {
        console.error('Error fetching categories:', error);
        this.snackBar.open('Failed to load categories.', 'Close', {
          duration: 3000
        });
        this.loadingCategories = false;
      }
    });
  }
  loadFeaturedProducts() {
    this.loadingFeaturedProducts = true;
    this.productService.getFeaturedProducts().subscribe({
      next: data => {
        this.featuredProducts = data;
        this.loadingFeaturedProducts = false;
      },
      error: error => {
        console.error('Error fetching featured products:', error);
        this.snackBar.open('Failed to load featured products.', 'Close', {
          duration: 3000
        });
        this.loadingFeaturedProducts = false;
      }
    });
  }
  navigateToCategory(categoryId) {
    this.router.navigate(['/products'], {
      queryParams: {
        category: categoryId
      }
    });
  }
  navigateToProductDetail(productId) {
    this.router.navigate(['/products', productId]);
  }
  static {
    this.ɵfac = function HomeComponent_Factory(t) {
      return new (t || HomeComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({
      type: HomeComponent,
      selectors: [["app-home"]],
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵStandaloneFeature"]],
      decls: 38,
      vars: 4,
      consts: [[1, "hero-section"], [1, "container"], ["routerLink", "/products", 1, "cta"], [1, "search-section"], [1, "container", "search-bar"], ["type", "text", "placeholder", "Rechercher un produit\u2026", 3, "ngModelChange", "ngModel"], [3, "click"], [1, "categories-section"], [1, "category-list"], ["class", "category-item", "tabindex", "0", 3, "click", 4, "ngFor", "ngForOf"], [1, "featured-products-section"], [1, "product-list"], [4, "ngFor", "ngForOf"], [1, "quick-links"], ["routerLink", "/login"], ["routerLink", "/signup"], [4, "ngIf"], [1, "mini-cart-placeholder"], ["tabindex", "0", 1, "category-item", 3, "click"], [1, "icon"], [1, "name"], [3, "product"], ["routerLink", "/admin"]],
      template: function HomeComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "section", 0)(1, "div", 1)(2, "h1");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Bienvenue sur notre marketplace");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, "Des milliers de produits au meilleur prix, livr\u00E9s rapidement.");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "button", 2);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](7, "D\u00E9couvrir le catalogue");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "section", 3)(9, "div", 4)(10, "mat-icon");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, "search");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "input", 5);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayListener"]("ngModelChange", function HomeComponent_Template_input_ngModelChange_12_listener($event) {
            _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayBindingSet"](ctx.searchKeyword, $event) || (ctx.searchKeyword = $event);
            return $event;
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "button", 6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_13_listener() {
            return ctx.search();
          });
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](14, "Rechercher");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "section", 7)(16, "div", 1)(17, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](18, "Cat\u00E9gories populaires");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](19, "div", 8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](20, HomeComponent_div_20_Template, 5, 1, "div", 9);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](21, "section", 10)(22, "div", 1)(23, "h2");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](24, "Produits en vedette");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](25, "div", 11);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](26, HomeComponent_ng_container_26_Template, 2, 1, "ng-container", 12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](27, "section", 13)(28, "div", 1)(29, "a", 14);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](30, "Login");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](31, "a", 15);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](32, "Signup");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](33, HomeComponent_ng_container_33_Template, 3, 0, "ng-container", 16);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()();
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](34, "section", 17)(35, "div", 1)(36, "p");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](37, "Cart (X items)");
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](12);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtwoWayProperty"]("ngModel", ctx.searchKeyword);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](8);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.categories);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngForOf", ctx.featuredProducts);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](7);
          _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("ngIf", ctx.isAdmin);
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_6__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgForOf, _angular_common__WEBPACK_IMPORTED_MODULE_6__.NgIf, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterModule, _angular_router__WEBPACK_IMPORTED_MODULE_4__.RouterLink, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.FormsModule, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.DefaultValueAccessor, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgControlStatus, _angular_forms__WEBPACK_IMPORTED_MODULE_7__.NgModel, _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_8__.MatProgressSpinnerModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIconModule, _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__.MatIcon, _angular_material_card__WEBPACK_IMPORTED_MODULE_10__.MatCardModule, _angular_material_button__WEBPACK_IMPORTED_MODULE_11__.MatButtonModule, _app_shared_components_product_card_product_card_component__WEBPACK_IMPORTED_MODULE_2__.ProductCardComponent],
      styles: ["\n\n.container[_ngcontent-%COMP%] {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 16px;\n}\n\n.hero-section[_ngcontent-%COMP%] {\n  background: #F9F9F9;\n  text-align: center;\n  padding: 64px 0;\n}\n\n.hero-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 28px;\n  margin: 0 0 8px;\n  color: #1B1B1B;\n}\n\n.hero-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #6A6A6A;\n  margin: 0 0 16px;\n}\n\n.hero-section[_ngcontent-%COMP%]   .cta[_ngcontent-%COMP%] {\n  background: var(--brand-primary, #FFEA00);\n  color: #1B1B1B;\n  font-weight: 700;\n  border-radius: 12px;\n  padding: 10px 16px;\n  border: 1px solid var(--brand-primary);\n}\n\n.search-section[_ngcontent-%COMP%] {\n  padding: 16px 0;\n}\n\n.search-bar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  background: #fff;\n  border-radius: 12px;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  padding: 8px 12px;\n  max-width: 640px;\n  margin: 0 auto;\n}\n\n.search-bar[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  flex: 1;\n  border: none;\n  outline: none;\n  font-size: 16px;\n}\n\n.search-bar[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  background: var(--brand-primary, #FFEA00);\n  color: #1B1B1B;\n  font-weight: 700;\n  border-radius: 12px;\n  border: 1px solid var(--brand-primary);\n  padding: 8px 12px;\n}\n\n.categories-section[_ngcontent-%COMP%], .featured-products-section[_ngcontent-%COMP%] {\n  padding: 24px 0;\n}\n\n.categories-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%], .featured-products-section[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 0 0 16px;\n  color: #1B1B1B;\n}\n\n.category-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));\n  gap: 16px;\n}\n\n.category-item[_ngcontent-%COMP%] {\n  background: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.12);\n  border-radius: 12px;\n  padding: 16px;\n  display: flex;\n  gap: 8px;\n  align-items: center;\n  cursor: pointer;\n  transition: box-shadow 0.2s, transform 0.2s;\n}\n\n.category-item[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);\n  transform: translateY(-2px);\n}\n\n.category-item[_ngcontent-%COMP%]   .icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n}\n\n.category-item[_ngcontent-%COMP%]   .name[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n\n.product-list[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));\n  gap: 16px;\n}\n\n@media (max-width: 600px) {\n  .hero-section[_ngcontent-%COMP%] {\n    padding: 40px 0;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvZmVhdHVyZXMvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhCQUFBO0FBRUE7RUFBYSxpQkFBQTtFQUFtQixjQUFBO0VBQWdCLGVBQUE7QUFHaEQ7O0FBREE7RUFBZ0IsbUJBQUE7RUFBcUIsa0JBQUE7RUFBb0IsZUFBQTtBQU96RDs7QUFOQTtFQUFtQixlQUFBO0VBQWlCLGVBQUE7RUFBaUIsY0FBQTtBQVlyRDs7QUFYQTtFQUFrQixjQUFBO0VBQWdCLGdCQUFBO0FBZ0JsQzs7QUFmQTtFQUFxQix5Q0FBQTtFQUEwQyxjQUFBO0VBQWdCLGdCQUFBO0VBQWtCLG1CQUFBO0VBQXFCLGtCQUFBO0VBQW9CLHNDQUFBO0FBd0IxSTs7QUF0QkE7RUFBa0IsZUFBQTtBQTBCbEI7O0FBekJBO0VBQWMsYUFBQTtFQUFjLG1CQUFBO0VBQW9CLFFBQUE7RUFBVSxnQkFBQTtFQUFpQixtQkFBQTtFQUFvQixxQ0FBQTtFQUFtQyxpQkFBQTtFQUFtQixnQkFBQTtFQUFrQixjQUFBO0FBcUN2Szs7QUFwQ0E7RUFBb0IsT0FBQTtFQUFRLFlBQUE7RUFBYSxhQUFBO0VBQWMsZUFBQTtBQTJDdkQ7O0FBMUNBO0VBQXFCLHlDQUFBO0VBQTBDLGNBQUE7RUFBZSxnQkFBQTtFQUFpQixtQkFBQTtFQUFvQixzQ0FBQTtFQUF1QyxpQkFBQTtBQW1EMUo7O0FBakRBO0VBQWtELGVBQUE7QUFxRGxEOztBQXBEQTtFQUF3RCxrQkFBQTtFQUFtQixnQkFBQTtFQUFrQixjQUFBO0FBMEQ3Rjs7QUF4REE7RUFBaUIsYUFBQTtFQUFjLDREQUFBO0VBQTRELFNBQUE7QUE4RDNGOztBQTdEQTtFQUFpQixnQkFBQTtFQUFpQixxQ0FBQTtFQUFrQyxtQkFBQTtFQUFvQixhQUFBO0VBQWUsYUFBQTtFQUFjLFFBQUE7RUFBUyxtQkFBQTtFQUFvQixlQUFBO0VBQWdCLDJDQUFBO0FBeUVsSzs7QUF4RUE7RUFBdUIsMENBQUE7RUFBd0MsMkJBQUE7QUE2RS9EOztBQTVFQTtFQUF1QixlQUFBO0FBZ0Z2Qjs7QUEvRUE7RUFBdUIsZ0JBQUE7QUFtRnZCOztBQWpGQTtFQUFnQixhQUFBO0VBQWMsNERBQUE7RUFBNkQsU0FBQTtBQXVGM0Y7O0FBckZBO0VBQ0U7SUFBZ0IsZUFBQTtFQXlGaEI7QUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qIEFjY3VlaWwgLSBzdHlsZXMgbW9kZXJuZXMgKi9cclxuXHJcbi5jb250YWluZXIgeyBtYXgtd2lkdGg6IDEyMDBweDsgbWFyZ2luOiAwIGF1dG87IHBhZGRpbmc6IDAgMTZweDsgfVxyXG5cclxuLmhlcm8tc2VjdGlvbiB7IGJhY2tncm91bmQ6ICNGOUY5Rjk7IHRleHQtYWxpZ246IGNlbnRlcjsgcGFkZGluZzogNjRweCAwOyB9XHJcbi5oZXJvLXNlY3Rpb24gaDEgeyBmb250LXNpemU6IDI4cHg7IG1hcmdpbjogMCAwIDhweDsgY29sb3I6ICMxQjFCMUI7IH1cclxuLmhlcm8tc2VjdGlvbiBwIHsgY29sb3I6ICM2QTZBNkE7IG1hcmdpbjogMCAwIDE2cHg7IH1cclxuLmhlcm8tc2VjdGlvbiAuY3RhIHsgYmFja2dyb3VuZDogdmFyKC0tYnJhbmQtcHJpbWFyeSwjRkZFQTAwKTsgY29sb3I6ICMxQjFCMUI7IGZvbnQtd2VpZ2h0OiA3MDA7IGJvcmRlci1yYWRpdXM6IDEycHg7IHBhZGRpbmc6IDEwcHggMTZweDsgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tYnJhbmQtcHJpbWFyeSk7IH1cclxuXHJcbi5zZWFyY2gtc2VjdGlvbiB7IHBhZGRpbmc6IDE2cHggMDsgfVxyXG4uc2VhcmNoLWJhciB7IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6IDhweDsgYmFja2dyb3VuZDojZmZmOyBib3JkZXItcmFkaXVzOjEycHg7IGJvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwwLjEyKTsgcGFkZGluZzogOHB4IDEycHg7IG1heC13aWR0aDogNjQwcHg7IG1hcmdpbjogMCBhdXRvOyB9XHJcbi5zZWFyY2gtYmFyIGlucHV0IHsgZmxleDoxOyBib3JkZXI6bm9uZTsgb3V0bGluZTpub25lOyBmb250LXNpemU6MTZweDsgfVxyXG4uc2VhcmNoLWJhciBidXR0b24geyBiYWNrZ3JvdW5kOiB2YXIoLS1icmFuZC1wcmltYXJ5LCNGRkVBMDApOyBjb2xvcjojMUIxQjFCOyBmb250LXdlaWdodDo3MDA7IGJvcmRlci1yYWRpdXM6MTJweDsgYm9yZGVyOjFweCBzb2xpZCB2YXIoLS1icmFuZC1wcmltYXJ5KTsgcGFkZGluZzogOHB4IDEycHg7IH1cclxuXHJcbi5jYXRlZ29yaWVzLXNlY3Rpb24sIC5mZWF0dXJlZC1wcm9kdWN0cy1zZWN0aW9uIHsgcGFkZGluZzogMjRweCAwOyB9XHJcbi5jYXRlZ29yaWVzLXNlY3Rpb24gaDIsIC5mZWF0dXJlZC1wcm9kdWN0cy1zZWN0aW9uIGgyIHsgdGV4dC1hbGlnbjpjZW50ZXI7IG1hcmdpbjogMCAwIDE2cHg7IGNvbG9yOiMxQjFCMUI7IH1cclxuXHJcbi5jYXRlZ29yeS1saXN0IHsgZGlzcGxheTpncmlkOyBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdChhdXRvLWZpbGwsbWlubWF4KDE2MHB4LDFmcikpOyBnYXA6IDE2cHg7IH1cclxuLmNhdGVnb3J5LWl0ZW0geyBiYWNrZ3JvdW5kOiNmZmY7IGJvcmRlcjoxcHggc29saWQgcmdiYSgwLDAsMCwuMTIpOyBib3JkZXItcmFkaXVzOjEycHg7IHBhZGRpbmc6IDE2cHg7IGRpc3BsYXk6ZmxleDsgZ2FwOjhweDsgYWxpZ24taXRlbXM6Y2VudGVyOyBjdXJzb3I6cG9pbnRlcjsgdHJhbnNpdGlvbjogYm94LXNoYWRvdyAuMnMsIHRyYW5zZm9ybSAuMnM7IH1cclxuLmNhdGVnb3J5LWl0ZW06aG92ZXIgeyBib3gtc2hhZG93OiAwIDhweCAyMHB4IHJnYmEoMCwwLDAsLjA2KTsgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpOyB9XHJcbi5jYXRlZ29yeS1pdGVtIC5pY29uIHsgZm9udC1zaXplOiAxOHB4OyB9XHJcbi5jYXRlZ29yeS1pdGVtIC5uYW1lIHsgZm9udC13ZWlnaHQ6IDYwMDsgfVxyXG5cclxuLnByb2R1Y3QtbGlzdCB7IGRpc3BsYXk6Z3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoYXV0by1maWxsLCBtaW5tYXgoMjYwcHgsMWZyKSk7IGdhcDogMTZweDsgfVxyXG5cclxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XHJcbiAgLmhlcm8tc2VjdGlvbiB7IHBhZGRpbmc6IDQwcHggMDsgfVxyXG59Il0sInNvdXJjZVJvb3QiOiIifQ== */"]
    });
  }
}

/***/ }),

/***/ 6071:
/*!**************************************************************************!*\
  !*** ./src/app/shared/components/product-card/product-card.component.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ProductCardComponent: () => (/* binding */ ProductCardComponent)
/* harmony export */ });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ 316);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ 7580);



class ProductCardComponent {
  static {
    this.ɵfac = function ProductCardComponent_Factory(t) {
      return new (t || ProductCardComponent)();
    };
  }
  static {
    this.ɵcmp = /*@__PURE__*/_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: ProductCardComponent,
      selectors: [["app-product-card"]],
      inputs: {
        product: "product"
      },
      standalone: true,
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵStandaloneFeature"]],
      decls: 8,
      vars: 6,
      consts: [[1, "product-card"], [1, "product-image", 3, "src", "alt"], [1, "product-details"], [1, "product-price"]],
      template: function ProductCardComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2)(3, "h3");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p", 3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](7, "currency");
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()();
        }
        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"]();
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("alt", ctx.product.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx.product.imageUrl || "placeholder.jpg", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.product.name);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](7, 4, ctx.product.price));
        }
      },
      dependencies: [_angular_common__WEBPACK_IMPORTED_MODULE_1__.CommonModule, _angular_common__WEBPACK_IMPORTED_MODULE_1__.CurrencyPipe],
      styles: ["scss[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%] {\n  border: 1px solid #e0e0e0;\n  border-radius: 8px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n  background-color: #fff;\n  transition: transform 0.3s ease, box-shadow 0.3s ease;\n  cursor: pointer;\n}\nscss[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-5px);\n  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);\n}\nscss[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 180px; \n\n  object-fit: cover; \n\n  border-bottom: 1px solid #eee;\n}\nscss[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n  padding: 15px;\n  display: flex;\n  flex-direction: column;\n  flex-grow: 1;\n  justify-content: space-between;\n}\nscss[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.1em;\n  margin: 0 0 10px 0;\n  color: #333;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\nscss[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n  font-size: 1.2em;\n  color: #007bff; \n\n  font-weight: bold;\n  margin-top: auto; \n\n}\nscss[_ngcontent-%COMP%]   .product-card[_ngcontent-%COMP%]   .product-actions[_ngcontent-%COMP%] {\n  padding: 10px 15px;\n  border-top: 1px solid #eee;\n  background-color: #f9f9f9;\n  display: flex;\n  justify-content: center;\n}\n\n\n@media (max-width: 768px) {\n  .product-card[_ngcontent-%COMP%]   .product-image[_ngcontent-%COMP%] {\n    height: 150px;\n  }\n  .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n    font-size: 1em;\n  }\n  .product-card[_ngcontent-%COMP%]   .product-info[_ngcontent-%COMP%]   .price[_ngcontent-%COMP%] {\n    font-size: 1.1em;\n  }\n}\n/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8uL3NyYy9hcHAvc2hhcmVkL2NvbXBvbmVudHMvcHJvZHVjdC1jYXJkL3Byb2R1Y3QtY2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUlFLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGFBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxREFBQTtFQUNBLGVBQUE7QUFGRjtBQUlFO0VBQ0UsMkJBQUE7RUFDQSwwQ0FBQTtBQUZKO0FBS0U7RUFDRSxXQUFBO0VBQ0EsYUFBQSxFQUFBLGlDQUFBO0VBQ0EsaUJBQUEsRUFBQSxtREFBQTtFQUNBLDZCQUFBO0FBSEo7QUFNRTtFQUNFLGFBQUE7RUFDQSxhQUFBO0VBQ0Esc0JBQUE7RUFDQSxZQUFBO0VBQ0EsOEJBQUE7QUFKSjtBQU1JO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7QUFKTjtBQU9JO0VBQ0UsZ0JBQUE7RUFDQSxjQUFBLEVBQUEsNEJBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBLEVBQUEsNkJBQUE7QUFMTjtBQVNFO0VBQ0Usa0JBQUE7RUFDQSwwQkFBQTtFQUNBLHlCQUFBO0VBQ0EsYUFBQTtFQUNBLHVCQUFBO0FBUEo7QUEwQkEsaUVBQUE7QUFDQTtFQUVJO0lBQ0UsYUFBQTtFQXpCSjtFQTRCRTtJQUNFLGFBQUE7RUExQko7RUEyQkk7SUFDRSxjQUFBO0VBekJOO0VBMkJJO0lBQ0UsZ0JBQUE7RUF6Qk47QUFDRiIsInNvdXJjZXNDb250ZW50IjpbInNjc3NcclxuLyogUHJvZHVjdCBDYXJkIFN0eWxlcyAqL1xyXG5cclxuLnByb2R1Y3QtY2FyZCB7XHJcbiAgYm9yZGVyOiAxcHggc29saWQgI2UwZTBlMDtcclxuICBib3JkZXItcmFkaXVzOiA4cHg7XHJcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcclxuICBkaXNwbGF5OiBmbGV4O1xyXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XHJcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuM3MgZWFzZSwgYm94LXNoYWRvdyAwLjNzIGVhc2U7XHJcbiAgY3Vyc29yOiBwb2ludGVyO1xyXG5cclxuICAmOmhvdmVyIHtcclxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNXB4KTtcclxuICAgIGJveC1zaGFkb3c6IDAgNnB4IDEycHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcclxuICB9XHJcblxyXG4gIC5wcm9kdWN0LWltYWdlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxODBweDsgLyogRml4ZWQgaGVpZ2h0IGZvciBjb25zaXN0ZW5jeSAqL1xyXG4gICAgb2JqZWN0LWZpdDogY292ZXI7IC8qIENvdmVyIHRoZSBhcmVhIHdpdGhvdXQgZGlzdG9ydGluZyBhc3BlY3QgcmF0aW8gKi9cclxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZWVlO1xyXG4gIH1cclxuXHJcbiAgLnByb2R1Y3QtaW5mbyB7XHJcbiAgICBwYWRkaW5nOiAxNXB4O1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XHJcbiAgICBmbGV4LWdyb3c6IDE7XHJcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XHJcblxyXG4gICAgaDMge1xyXG4gICAgICBmb250LXNpemU6IDEuMWVtO1xyXG4gICAgICBtYXJnaW46IDAgMCAxMHB4IDA7XHJcbiAgICAgIGNvbG9yOiAjMzMzO1xyXG4gICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xyXG4gICAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcclxuICAgIH1cclxuXHJcbiAgICAucHJpY2Uge1xyXG4gICAgICBmb250LXNpemU6IDEuMmVtO1xyXG4gICAgICBjb2xvcjogIzAwN2JmZjsgLyogUHJpbWFyeSBjb2xvciBmb3IgcHJpY2UgKi9cclxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICAgIG1hcmdpbi10b3A6IGF1dG87IC8qIFB1c2ggcHJpY2UgdG8gdGhlIGJvdHRvbSAqL1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnByb2R1Y3QtYWN0aW9ucyB7XHJcbiAgICBwYWRkaW5nOiAxMHB4IDE1cHg7XHJcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2VlZTtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICNmOWY5Zjk7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XHJcblxyXG4gICAgYnV0dG9uIHtcclxuICAgICAgLy8gU3R5bGVzIGZvciBhZGQgdG8gY2FydCBidXR0b24gd2l0aGluIHRoZSBjYXJkXHJcbiAgICAgIC8vIEV4YW1wbGU6XHJcbiAgICAgIC8vIGJhY2tncm91bmQtY29sb3I6ICMyOGE3NDU7XHJcbiAgICAgIC8vIGNvbG9yOiB3aGl0ZTtcclxuICAgICAgLy8gYm9yZGVyOiBub25lO1xyXG4gICAgICAvLyBwYWRkaW5nOiA4cHggMTVweDtcclxuICAgICAgLy8gYm9yZGVyLXJhZGl1czogNHB4O1xyXG4gICAgICAvLyBjdXJzb3I6IHBvaW50ZXI7XHJcbiAgICAgIC8vIHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgMC4zcyBlYXNlO1xyXG4gICAgICAvLyAmOmhvdmVyIHtcclxuICAgICAgLy8gICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjE4ODM4O1xyXG4gICAgICAvLyB9XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG4vKiBSZXNwb25zaXZlIGFkanVzdG1lbnRzIGZvciBjYXJkIHdpdGhpbiBhIGdyaWQvZmxleCBjb250YWluZXIgKi9cclxuQG1lZGlhIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgLnByb2R1Y3QtY2FyZCB7XHJcbiAgICAucHJvZHVjdC1pbWFnZSB7XHJcbiAgICAgIGhlaWdodDogMTUwcHg7XHJcbiAgICB9XHJcblxyXG4gICAgLnByb2R1Y3QtaW5mbyB7XHJcbiAgICAgIHBhZGRpbmc6IDEwcHg7XHJcbiAgICAgIGgzIHtcclxuICAgICAgICBmb250LXNpemU6IDFlbTtcclxuICAgICAgfVxyXG4gICAgICAucHJpY2Uge1xyXG4gICAgICAgIGZvbnQtc2l6ZTogMS4xZW07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0iXSwic291cmNlUm9vdCI6IiJ9 */"]
    });
  }
}

/***/ }),

/***/ 5312:
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   environment: () => (/* binding */ environment)
/* harmony export */ });
const environment = {
  production: false,
  apiUrl: "http://localhost:8080"
};

/***/ }),

/***/ 4429:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/platform-browser */ 436);
/* harmony import */ var _app_app_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app/app.component */ 92);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/router */ 5072);
/* harmony import */ var _angular_platform_browser_animations_async__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/platform-browser/animations/async */ 6970);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common/http */ 6443);
/* harmony import */ var _ngrx_store__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngrx/store */ 1383);
/* harmony import */ var _ngrx_effects__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngrx/effects */ 347);
/* harmony import */ var _ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngrx/store-devtools */ 1925);
/* harmony import */ var _app_app_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app/app.routes */ 2181);
/* harmony import */ var _app_core_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/core/interceptors/auth.interceptor */ 3622);
/* harmony import */ var _app_core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/core/interceptors/error.interceptor */ 9446);
/* harmony import */ var _app_core_store_auth_auth_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app/core/store/auth/auth.reducer */ 433);
/* harmony import */ var _app_core_store_auth_auth_effects__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./app/core/store/auth/auth.effects */ 1427);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./environments/environment */ 5312);














(0,_angular_platform_browser__WEBPACK_IMPORTED_MODULE_7__.bootstrapApplication)(_app_app_component__WEBPACK_IMPORTED_MODULE_0__.AppComponent, {
  providers: [(0,_angular_router__WEBPACK_IMPORTED_MODULE_8__.provideRouter)(_app_app_routes__WEBPACK_IMPORTED_MODULE_1__.routes), (0,_angular_platform_browser_animations_async__WEBPACK_IMPORTED_MODULE_9__.provideAnimationsAsync)(), (0,_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.provideHttpClient)((0,_angular_common_http__WEBPACK_IMPORTED_MODULE_10__.withInterceptors)([_app_core_interceptors_auth_interceptor__WEBPACK_IMPORTED_MODULE_2__.authInterceptor, _app_core_interceptors_error_interceptor__WEBPACK_IMPORTED_MODULE_3__.errorInterceptor])), (0,_ngrx_store__WEBPACK_IMPORTED_MODULE_11__.provideStore)({
    auth: _app_core_store_auth_auth_reducer__WEBPACK_IMPORTED_MODULE_4__.authReducer
  }), (0,_ngrx_effects__WEBPACK_IMPORTED_MODULE_12__.provideEffects)([_app_core_store_auth_auth_effects__WEBPACK_IMPORTED_MODULE_5__.AuthEffects]), (0,_ngrx_store_devtools__WEBPACK_IMPORTED_MODULE_13__.provideStoreDevtools)({
    maxAge: 25,
    logOnly: _environments_environment__WEBPACK_IMPORTED_MODULE_6__.environment.production
  })]
}).catch(err => console.error(err));

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendor"], () => (__webpack_exec__(4429)));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=main.js.map