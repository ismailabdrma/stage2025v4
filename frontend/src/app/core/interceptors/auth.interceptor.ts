// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '@environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authService = inject(AuthService);
    const token = authService.getToken();

    console.log('🔐 Interceptor - URL:', req.url, 'Token:', token ? 'Present' : 'Missing');

    // Endpoints that should NOT receive the token (public endpoints)
    const noAuthEndpoints = [
        '/api/auth/login',
        '/api/auth/signup',
        '/api/auth/verify-email',
        '/api/auth/login/verify-otp',
        '/api/auth/resend-otp',
        '/api/auth/forgot-password',
        '/api/auth/reset-password',
        // Public product endpoints
        '/api/products',
        '/api/products/featured',
        '/api/products/suggested',
        '/api/categories',
        '/api/images',
        '/api/brands',
        '/api/reviews',
        // Guest endpoints (only for unauthenticated users)
        '/api/cart/guest',
        '/api/orders/guest',
        // Health and info
        '/api/health',
        '/api/info'
    ];

    // Check if the request URL should skip authentication (public endpoints)
    const shouldSkipAuth = noAuthEndpoints.some((endpoint) => {
        // Exact match for specific endpoints
        if (req.url.endsWith(endpoint)) return true;
        // Pattern matching for dynamic endpoints
        if (endpoint.includes('*')) {
            const pattern = endpoint.replace('*', '.*');
            return new RegExp(pattern).test(req.url);
        }
        // Check if URL starts with the endpoint
        return req.url.startsWith(endpoint);
    });

    // Only attach token for same-origin or API base URL
    const isRelative = req.url.startsWith('/');
    const isApiBase = req.url.startsWith(environment.apiUrl);
    const isSameOrigin = isRelative || isApiBase;

    console.log('🔐 Interceptor - Skip auth:', shouldSkipAuth, 'Same origin:', isSameOrigin);

    // IMPORTANT: Always add token for authenticated endpoints, even if no token exists
    // This allows the backend to handle authentication properly
    if (isSameOrigin && !shouldSkipAuth) {
        if (token) {
            console.log('🔐 Interceptor - Adding Authorization header for:', req.url);
            return next(
                req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                })
            );
        } else {
            console.log('🔐 Interceptor - No token available for authenticated endpoint:', req.url);
            // Still proceed with the request, let the backend handle 401/403
            return next(req);
        }
    }

    console.log('🔐 Interceptor - No token added for public endpoint:', req.url);
    return next(req);
};
