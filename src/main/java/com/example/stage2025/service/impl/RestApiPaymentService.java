package com.example.stage2025.service.impl;

import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.entity.Order;
import com.example.stage2025.repository.SupplierRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class RestApiPaymentService {

    private final WebClient webClient;
    private final SupplierRepository supplierRepository;
    private final ObjectMapper objectMapper;

    public boolean processRestApiPayment(Long supplierId, Order order) {
        try {
            ApiSupplier supplier = supplierRepository.findApiSupplierById(supplierId)
                .orElseThrow(() -> new IllegalStateException("API Supplier not found: " + supplierId));

            String paymentEndpoint = supplier.getPaymentEndpoint();
            
            Map<String, Object> requestBody = createRequestBody(supplier, order);

            String response = webClient.post()
                .uri(paymentEndpoint)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

            boolean success = processResponse(supplier, response);
            log.info("REST API payment for order {} processed with result: {}", order.getId(), success ? "SUCCESS" : "FAILURE");
            return success;
        } catch (Exception e) {
            log.error("Error processing REST API payment for order: {}", order.getId(), e);
            return false;
        }
    }

    private Map<String, Object> createRequestBody(ApiSupplier supplier, Order order) {
        // Implement logic to create request body based on supplier's API requirements
        // This is a placeholder implementation
        return Map.of(
            "orderId", order.getId(),
            "amount", order.getTotal(),
            "currency", order.getCurrency()
        );
    }

    private boolean processResponse(ApiSupplier supplier, String response) {
        // Implement logic to process the response based on supplier's API format
        // This is a placeholder implementation
        return response.contains("success");
    }
}