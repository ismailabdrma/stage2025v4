package com.example.stage2025.security;

import com.example.stage2025.service.impl.UserDetailsServiceImpl;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtUtils jwtUtils;
    private final UserDetailsServiceImpl userDetailsService;

    // Skip auth filter only for truly public, read-only endpoints
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        String method = request.getMethod();

        // Always public
        if (path.startsWith("/api/auth")) {
            return true;
        }

        // Allow unauthenticated GET access to public product/category listings
        boolean isPublicRead = "GET".equalsIgnoreCase(method)
                && (path.equals("/api/products")
                    || path.matches("/api/products/\\d+")
                    || path.startsWith("/api/products/featured")
                    || path.startsWith("/api/products/search")
                    || path.startsWith("/api/products/category")
                    || path.startsWith("/api/products/brand")
                    || path.startsWith("/api/products/") && path.endsWith("/suggested")
                    || path.startsWith("/api/categories")
                    || path.startsWith("/api/images")
                    || path.startsWith("/api/order-session-mapping")
                    || path.startsWith("/api/brands")
                    || path.startsWith("/api/reviews")
                    || path.startsWith("/api/cart/guest")
                    || path.startsWith("/api/orders/guest"));
                    // Removed /api/cart from public access - now has proper PreAuthorize annotation
                    // Removed /api/suppliers from public access - requires ADMIN authentication

        // Note: admin-only product endpoints like /pending, /approve, /reject, /activate, etc. must NOT be skipped
        if (isPublicRead) {
            // Exclude admin-only reads under products
            if (path.contains("/pending") || path.contains("/approve") || path.contains("/reject")
                    || path.contains("/activate") || path.contains("/deactivate") || path.contains("/suspend")
                    || path.contains("/approve-multiple") || path.contains("/bulk-update")
                    || path.contains("/admin") || path.contains("/dashboard")) {
                return false;
            }
            return true;
        }

        // Additional public endpoints for client functionality
        if ("GET".equalsIgnoreCase(method) && (
            path.startsWith("/api/home") ||
            path.startsWith("/api/public") ||
            path.startsWith("/api/guest") ||
            path.equals("/api/health") ||
            path.equals("/api/info")
        )) {
            return true;
        }

        return false;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");
        String token = null;
        String username = null;

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                username = jwtUtils.getUsername(token);
            } catch (JwtException e) {
                // Token is expired or invalid. Do NOT authenticate.
                // Optionally log: e.getMessage()
                // Just continue filter chain
            }
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            if (jwtUtils.validate(token)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);

                // Expose userId claim for downstream controllers
                try {
                    Long userId = jwtUtils.getUserId(token);
                    if (userId != null) {
                        request.setAttribute("userId", userId);
                    }
                } catch (Exception ignored) {
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
