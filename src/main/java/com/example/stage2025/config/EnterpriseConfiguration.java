package com.example.stage2025.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.concurrent.ConcurrentMapCacheManager;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.boot.actuate.autoconfigure.metrics.MeterRegistryCustomizer;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.config.MeterFilter;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
@EnableScheduling
@EnableCaching
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "com.example.stage2025.repository")
public class EnterpriseConfiguration {

    /**
     * Thread pool for async order processing
     */
    @Bean("orderProcessingExecutor")
    public Executor orderProcessingExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);           // Base threads for handling orders
        executor.setMaxPoolSize(50);            // Max threads during peak load
        executor.setQueueCapacity(1000);        // Queue size for pending orders
        executor.setThreadNamePrefix("OrderProcessor-");
        executor.setKeepAliveSeconds(60);
        executor.setRejectedExecutionHandler(new java.util.concurrent.ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    /**
     * Thread pool for async payment processing
     */
    @Bean("paymentProcessingExecutor")
    public Executor paymentProcessingExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);            // Smaller pool for payment operations
        executor.setMaxPoolSize(20);            // Max threads for payment processing
        executor.setQueueCapacity(500);         // Queue for pending payments
        executor.setThreadNamePrefix("PaymentProcessor-");
        executor.setKeepAliveSeconds(60);
        executor.setRejectedExecutionHandler(new java.util.concurrent.ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    /**
     * Thread pool for async email operations
     */
    @Bean("emailExecutor")
    public Executor emailExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(3);            // Small pool for emails
        executor.setMaxPoolSize(10);            // Max threads for email sending
        executor.setQueueCapacity(200);         // Queue for pending emails
        executor.setThreadNamePrefix("EmailSender-");
        executor.setKeepAliveSeconds(60);
        executor.setRejectedExecutionHandler(new java.util.concurrent.ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }

    /**
     * Cache manager for enterprise caching
     */
    @Bean
    public CacheManager cacheManager() {
        ConcurrentMapCacheManager cacheManager = new ConcurrentMapCacheManager();
        cacheManager.setCacheNames(java.util.Arrays.asList(
            "products",              // Product data cache
            "suppliers",             // Supplier data cache
            "orders",                // Order data cache
            "payments",              // Payment data cache
            "users",                 // User data cache
            "system-health",         // System health cache
            "performance-metrics"    // Performance metrics cache
        ));
        return cacheManager;
    }

    /**
     * WebClient for external API calls
     */
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
            .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(10 * 1024 * 1024)) // 10MB
            .build();
    }

    /**
     * Metrics customization for enterprise monitoring
     */
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
        return registry -> {
            registry.config()
                .commonTags(
                    "application", "stage2025-marketplace",
                    "environment", getActiveProfile()
                )
                .meterFilter(MeterFilter.deny(id -> {
                    String uri = id.getTag("uri");
                    return uri != null && (
                        uri.startsWith("/actuator") ||
                        uri.startsWith("/swagger") ||
                        uri.startsWith("/api-docs")
                    );
                }));
        };
    }

    private String getActiveProfile() {
        return System.getProperty("spring.profiles.active", "default");
    }

    /**
     * Production-specific configuration
     */
    @Configuration
    @Profile("production")
    static class ProductionConfiguration {
        
        @Bean("productionOrderExecutor")
        public Executor productionOrderExecutor() {
            ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
            executor.setCorePoolSize(20);           // Higher capacity for production
            executor.setMaxPoolSize(100);           // Scale up to 100 threads
            executor.setQueueCapacity(5000);        // Large queue for high load
            executor.setThreadNamePrefix("ProdOrderProcessor-");
            executor.setKeepAliveSeconds(300);      // Keep threads alive longer
            executor.initialize();
            return executor;
        }
    }

    /**
     * Development-specific configuration
     */
    @Configuration
    @Profile("development")
    static class DevelopmentConfiguration {
        
        @Bean("devOrderExecutor")
        public Executor devOrderExecutor() {
            ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
            executor.setCorePoolSize(2);            // Minimal for development
            executor.setMaxPoolSize(5);             // Small max pool
            executor.setQueueCapacity(50);          // Small queue
            executor.setThreadNamePrefix("DevOrderProcessor-");
            executor.initialize();
            return executor;
        }
    }
}
