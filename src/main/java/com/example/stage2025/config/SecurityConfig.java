package com.example.stage2025.config;

import com.example.stage2025.security.JwtAuthFilter;
import com.example.stage2025.security.JwtUtils;
import com.example.stage2025.service.impl.UserDetailsServiceImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;


import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
public class SecurityConfig {


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtUtils jwtUtils, UserDetailsServiceImpl userDetailsService) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        
                        // 🔒 HYBRID SECURITY: Allow payment completion but secure other operations
                        .requestMatchers("/api/payment-success/success/**").permitAll()  // Allow payment completion
                        .requestMatchers("/api/payment-success/test").permitAll()       // Allow health checks
                        .requestMatchers("/api/payment-success/**").authenticated()     // Secure other payment operations
                        
                        // 🔒 Secure core payment operations
                        .requestMatchers("/api/payments/**").authenticated()
                        
                        // ✅ Public endpoints (no authentication required)
                        .requestMatchers("/api/auth/**", "/api/products/**", "/api/categories/**", "/api/images/**").permitAll()
                        .requestMatchers("/api/order-session-mapping/**").permitAll()  // Allow session mapping access
                        .requestMatchers("/images/**", "/assets/**", "/uploads/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/suppliers/**").permitAll()
                        
                        // 🔒 Admin-only endpoints
                        .requestMatchers("/api/admin/**", "/api/suppliers/**").hasRole("ADMIN")
                        
                        // 🔒 All other endpoints require authentication
                        .anyRequest().authenticated()
                )
                .addFilterBefore(new JwtAuthFilter(jwtUtils, userDetailsService), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("*"));
        configuration.setAllowedMethods(Arrays.asList(
                "GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"
        ));
        configuration.setAllowedHeaders(Arrays.asList(
                "Authorization", "Cache-Control", "Content-Type", "X-Requested-With"
        ));
        configuration.setExposedHeaders(List.of("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }


}
