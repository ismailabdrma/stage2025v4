package com.example.stage2025.config;

import com.stripe.Stripe;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class StripeConfig {

    // Make Stripe optional in dev: default to empty so app doesn't fail on startup
    @Value("${stripe.secret.key:}")
    private String stripeSecretKey;

    @PostConstruct
    public void initStripe() {
        if (stripeSecretKey == null || stripeSecretKey.isBlank()) {
            log.warn("Stripe secret key not configured. Payment features will be disabled in this environment.");
            return;
        }
        Stripe.apiKey = stripeSecretKey;
        log.info("Stripe initialized successfully with key: {}...", stripeSecretKey.substring(0, Math.min(10, stripeSecretKey.length())));
    }
}
