import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { map, exhaustMap, catchError, tap, mergeMap } from "rxjs/operators";
import { AuthService } from "../../services/auth.service";
import { AuthActions } from "./auth.actions";

@Injectable()
export class AuthEffects {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    // --- LOGIN ---
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap(({ request }) =>
                this.authService.login(request).pipe(
                    mergeMap((response : any) => {
                        if (response && (response.status === "OTP_REQUIRED" || response?.status?.toUpperCase?.() === 'OTP_REQUIRED')) {
                            // Regular users need OTP verification
                            this.router.navigate(["/auth/verify-otp"], {
                                queryParams: { email: request.identifier }
                            });
                            return [
                                AuthActions.loginRequiresOTP({ email: request.identifier }),
                                AuthActions.loginSuccess({ message: "OTP sent to your email. Please verify." })
                            ];
                        } else if (response && response.token) {
                            // Admin users get JWT token directly - handle it
                            this.authService.setToken(response.token);
                            return this.authService.getCurrentUser().pipe(
                                map((user) => AuthActions.loginComplete({ response, user })),
                                catchError((error) => of(AuthActions.authError({ error: error.message })))
                            );
                        } else {
                            return [AuthActions.authError({ error: "Unexpected response from server." })];
                        }
                    }),
                    catchError((error) =>
                        of(AuthActions.authError({ error: error.message || "Login failed" }))
                    )
                )
            )
        )
    );

    // --- LOGIN OTP ---
    loginVerifyOtp$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginVerifyOTP),
            exhaustMap(({ request }) =>
                this.authService.loginVerifyOtp(request).pipe(
                    exhaustMap((response) => {
                        this.authService.setToken(response.token);
                        return this.authService.getCurrentUser().pipe(
                            map((user) => AuthActions.loginComplete({ response, user }))
                        );
                    }),
                    catchError((error) =>
                        of(AuthActions.authError({ error: error.message || "OTP verification failed" }))
                    )
                )
            )
        )
    );

    // After login/OTP, route by role
    loginSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.loginComplete),
                tap(({ user }: any) => {
                    const redirect = sessionStorage.getItem('redirectUrl')
                    sessionStorage.removeItem('redirectUrl')
                    if (redirect) {
                        this.router.navigate([redirect])
                        return
                    }
                    if (user?.role === 'ADMIN') {
                        this.router.navigate(["/admin"]);
                    } else {
                        this.router.navigate(["/"]);
                    }
                })
            ),
        { dispatch: false }
    );

    // --- SIGNUP ---
    signup$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signup),
            exhaustMap(({ request }) =>
                this.authService.signup(request).pipe(
                    map((message) => AuthActions.signupSuccess({ message })),
                    catchError((error) =>
                        of(AuthActions.authError({ error: error.message || "Signup failed" }))
                    )
                )
            )
        )
    );

    // After signup, go to email OTP verify
    signupSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.signupSuccess),
                tap((action: any) => {
                    // Set this on the signup form submit
                    const email = sessionStorage.getItem("signup_email");
                    if (email) {
                        this.router.navigate(["/auth/verify-email"], { queryParams: { email } });
                    }
                })
            ),
        { dispatch: false }
    );

    // --- CHECK AUTH STATUS ---
    checkAuthStatus$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.checkAuthStatus),
            exhaustMap(() => {
                const token = this.authService.getToken();
                if (!token || !this.authService.isAuthenticated()) {
                    // Token is invalid or expired, clear auth state
                    this.authService.logout();
                    return [AuthActions.authError({ error: "Session expired" })];
                }
                
                // Token exists and is valid, get current user
                return this.authService.getCurrentUser().pipe(
                    map((user) => AuthActions.loadUserSuccess({ user })),
                    catchError((error) => {
                        // If getCurrentUser fails, the token might be invalid
                        this.authService.logout();
                        return of(AuthActions.authError({ error: "Invalid session" }));
                    })
                );
            })
        )
    );

    // --- VERIFY EMAIL (signup) ---
    verifyEmail$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.verifyEmail),
            exhaustMap(({ request }) =>
                this.authService.verifyEmail(request).pipe(
                    map((message) => AuthActions.verifyEmailSuccess({ message })),
                    catchError((error) =>
                        of(AuthActions.authError({ error: error.message || "Email verification failed" }))
                    )
                )
            )
        )
    );

    verifyEmailSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.verifyEmailSuccess),
                tap(() => this.router.navigate(["/auth/login"]))
            ),
        { dispatch: false }
    );

    // --- FORGOT PASSWORD ---
    forgotPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.forgotPassword),
            exhaustMap(({ email }) =>
                this.authService.forgotPassword(email).pipe(
                    map((message) => AuthActions.forgotPasswordSuccess({ message })),
                    catchError((error) =>
                        of(AuthActions.authError({ error: error.message || "Failed to send reset OTP" }))
                    )
                )
            )
        )
    );

    // After forgot password, go to reset password page with email param
    forgotPasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.forgotPasswordSuccess),
                tap((action: any) => {
                    const email = sessionStorage.getItem("forgot_email");
                    if (email) {
                        this.router.navigate(["/auth/reset-password"], { queryParams: { email } });
                    }
                })
            ),
        { dispatch: false }
    );

    // --- RESET PASSWORD (OTP + new pass) ---
    resetPassword$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.resetPassword),
            exhaustMap(({ email, otp, newPassword }) =>
                this.authService.resetPassword(email, otp, newPassword).pipe(
                    map((message) => AuthActions.resetPasswordSuccess({ message })),
                    catchError((error) =>
                        of(AuthActions.authError({ error: error.message || "Failed to reset password" }))
                    )
                )
            )
        )
    );

    resetPasswordSuccess$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.resetPasswordSuccess),
                tap(() => this.router.navigate(["/"]))
            ),
        { dispatch: false }
    );

    // --- LOGOUT ---
    logout$ = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.logout),
                tap(() => {
                    this.authService.logout();
                    this.router.navigate(["/auth/login"]);
                })
            ),
        { dispatch: false }
    );
}
