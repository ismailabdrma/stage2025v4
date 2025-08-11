// src/main/java/com/example/stage2025/service/impl/ApiProductFetcher.java
package com.example.stage2025.service.impl;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.service.ProductFetcher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
@Slf4j
public class ApiProductFetcher implements ProductFetcher {

    private final WebClient webClient;

    @Override
    public List<SupplierProductDto> fetchProducts(Supplier supplier) throws Exception {
        if (!(supplier instanceof ApiSupplier api)) {
            throw new IllegalArgumentException("Supplier is not API based");
        }

        log.info("Fetching products from API supplier: {}", supplier.getName());
        
        try {
            // Non-blocking with timeout and retry mechanism
            return webClient.get()
                    .uri(api.getApiUrl() + (api.getProductsEndpoint() != null ? api.getProductsEndpoint() : "/products"))
                    .header(HttpHeaders.AUTHORIZATION, authHeader(api))
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToFlux(SupplierProductDto.class)
                    .timeout(Duration.ofSeconds(30))
                    .retryWhen(Retry.backoff(3, Duration.ofSeconds(2))
                        .filter(throwable -> throwable instanceof WebClientException))
                    .collectList()
                    .doOnSuccess(products -> log.info("Successfully fetched {} products from {}", products.size(), supplier.getName()))
                    .doOnError(error -> log.error("Failed to fetch products from {}: {}", supplier.getName(), error.getMessage()))
                    .block(Duration.ofSeconds(45)); // Controlled blocking with timeout
                    
        } catch (Exception e) {
            log.error("Error fetching products from API supplier {}: {}", supplier.getName(), e.getMessage());
            throw new RuntimeException("Failed to fetch products from API supplier: " + e.getMessage(), e);
        }
    }

    /**
     * Async version for future use
     */
    public CompletableFuture<List<SupplierProductDto>> fetchProductsAsync(ApiSupplier api) {
        log.info("Async fetching products from API supplier: {}", api.getName());
        
        return webClient.get()
                .uri(api.getApiUrl() + (api.getProductsEndpoint() != null ? api.getProductsEndpoint() : "/products"))
                .header(HttpHeaders.AUTHORIZATION, authHeader(api))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToFlux(SupplierProductDto.class)
                .timeout(Duration.ofSeconds(30))
                .retryWhen(Retry.backoff(3, Duration.ofSeconds(2)))
                .collectList()
                .toFuture();
    }

    /* ------------------------------------------------------------------ */

    private String authHeader(ApiSupplier api) {
        return switch (api.getAuthMethod().toUpperCase()) {
            case "BEARER" -> "Bearer " + api.getApiKey();
            case "BASIC"  -> "Basic " + java.util.Base64.getEncoder()
                    .encodeToString(api.getApiKey().getBytes());
            default       -> api.getApiKey();
        };
    }
}
