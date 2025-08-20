package com.example.stage2025.service.impl;

import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.OrderItem;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.SoapSupplierOperationMeta;
import com.example.stage2025.repository.SoapSupplierOperationMetaRepository;
import com.example.stage2025.repository.SoapSupplierRepository;
import com.example.stage2025.utils.SoapDynamicInvoker;
import com.example.stage2025.service.OrderSessionMappingService;
import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.dto.SoapFieldDto;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.soap.client.core.SoapActionCallback;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SoapPaymentService {

    private final WebServiceTemplate webServiceTemplate;
    private final SoapSupplierOperationMetaRepository operationMetaRepository;
    private final SoapSupplierRepository soapSupplierRepository;
    private final ObjectMapper objectMapper;
    private final OrderSessionMappingService orderSessionMappingService;
    // private final Jaxb2Marshaller jaxb2Marshaller;

    public boolean processSoapPayment(Long supplierId, Order order) {
        Map<String, Object> response = processSoapPaymentWithResponse(supplierId, order);
        return (Boolean) response.getOrDefault("success", false);
    }

    public Map<String, Object> processSoapPaymentWithResponse(Long supplierId, Order order) {
        Map<String, Object> result = new HashMap<>();
        try {
            SoapSupplier supplier = soapSupplierRepository.findById(supplierId)
                .orElseThrow(() -> new IllegalStateException("Supplier not found: " + supplierId));

            // Get the effective payment operation name
            String paymentOperationName = supplier.getEffectivePaymentOperationName();
            if (paymentOperationName == null) {
                throw new IllegalStateException("No payment operation configured for supplier: " + supplier.getName() + 
                    ". Please configure paymentOperationName or paymentOperationNameConfig in admin panel.");
            }

            log.info("Processing SOAP payment for supplier: {} using operation: {}", supplier.getName(), paymentOperationName);

            // Find the operation metadata
            SoapSupplierOperationMeta operationMeta =
                operationMetaRepository.findBySupplierAndOperationName(supplier, paymentOperationName)
                .orElseThrow(() -> new IllegalStateException("Operation metadata not found for: " + paymentOperationName));

            // Build request data with success URL for redirect
            Map<String, Object> requestData = new HashMap<>();
            
            // IMPORTANT: Send price per piece, not total amount
            // This prevents the supplier from incorrectly multiplying amount × quantity
            // Example: Order total = 600 EUR, quantity = 6 pieces
            // We send: amount = 100 EUR (price per piece), quantity = 6
            // Supplier calculates: 100 × 6 = 600 EUR (correct total)
            // Instead of: 600 × 6 = 3,600 EUR (wrong total)
            double pricePerPiece = order.getTotal() / order.getItems().get(0).getQuantity();
            
            requestData.put("amount", pricePerPiece); // Price per piece, not total
            requestData.put("quantity", order.getItems().get(0).getQuantity());
            requestData.put("productId", order.getItems().get(0).getProduct().getId());
            requestData.put("orderId", order.getId());
            requestData.put("currency", order.getCurrency());
            
            // Add total amount for verification
            requestData.put("totalAmount", order.getTotal());
            
            // Log the amount calculation for debugging
            log.info("Amount calculation for order {}: total={}, quantity={}, pricePerPiece={}", 
                order.getId(), order.getTotal(), order.getItems().get(0).getQuantity(), pricePerPiece);
            log.info("Sending to supplier: amount={} (price per piece), quantity={}, totalAmount={}", 
                pricePerPiece, order.getItems().get(0).getQuantity(), order.getTotal());
            
            // IMPORTANT: Force supplier to redirect to OUR success page, not theirs
            // This ensures customer always reaches our platform
            String sessionId = "SOAP_" + supplierId + "_" + order.getId() + "_" + System.currentTimeMillis();
            String successUrl = "http://localhost:4200/success?order_id=" + order.getId() + "&supplier_id=" + supplierId + "&session_id=" + sessionId;
            requestData.put("successUrl", successUrl);
            requestData.put("cancelUrl", "http://localhost:4200/payment-error?error=cancelled");
            
            log.info("SOAP requestData built from stored metadata: {}", requestData);
            log.info("Calling SOAP operation: {} with data: {}", paymentOperationName, requestData);

            // Call the SOAP service
            Map<String, Object> response = SoapDynamicInvoker.call(
                supplier.getEffectivePaymentWsdlUrl(),
                supplier.getNamespace(),
                createSoapOperationMeta(operationMeta),
                requestData,
                new HashMap<>() // No complex types for now
            );

            // Debug: log the raw response to see what fields are available
            log.info("Raw SOAP response: {}", response);
            log.info("Available response fields: {}", response.keySet());
            
            // Store session mapping for payment completion
            try {
                String stripeSessionId = (String) response.get("stripeSessionId");
                orderSessionMappingService.storeSessionMapping(sessionId, order.getId(), supplierId, "SOAP", stripeSessionId);
                log.info("✅ Stored session mapping: sessionId={}, orderId={}, supplierId={}, paymentType=SOAP, stripeSessionId={}", 
                    sessionId, order.getId(), supplierId, stripeSessionId);
            } catch (Exception e) {
                log.error("❌ Failed to store session mapping: {}", e.getMessage());
            }

            // Process response and extract payment data
            boolean success = processResponseFromMetadata(operationMeta, response);
            result.put("success", success);
            
            if (success) {
                // Extract all relevant fields from the SOAP response
                result.put("paymentId", response.get("paymentId"));
                result.put("status", response.get("status"));
                result.put("stripeSessionId", response.get("stripeSessionId"));
                result.put("url", response.get("url")); // Extract the payment URL
                result.put("message", response.get("message") != null ? response.get("message") : "Payment processed successfully");
                
                // Log the full response for debugging
                log.info("SOAP payment response for order {}: {}", order.getId(), response);
                
                // Note: For supplier payment systems, the actual payment URL will be constructed
                // by the DirectSupplierPaymentService based on the supplier's configuration
            } else {
                result.put("error", "Payment processing failed");
            }
            
            log.info("SOAP payment for order {} processed with result: {}", order.getId(), success ? "SUCCESS" : "FAILURE");
            return result;
        } catch (Exception e) {
            log.error("Error processing SOAP payment for order: {}", order.getId(), e);
            result.put("success", false);
            result.put("error", e.getMessage());
            return result;
        }
    }

    /**
     * Send SOAP notification to supplier
     * 
     * @param supplierId The supplier ID
     * @param operationName The operation name to call
     * @param notificationData The data to send
     * @return Result of the notification
     */
    public Map<String, Object> sendSoapNotification(Long supplierId, String operationName, Map<String, Object> notificationData) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            SoapSupplier supplier = soapSupplierRepository.findById(supplierId)
                .orElseThrow(() -> new IllegalStateException("Supplier not found: " + supplierId));

            log.info("Sending SOAP notification to supplier {}: operation={}, data={}", 
                    supplier.getName(), operationName, notificationData);

            // Find the operation metadata
            SoapSupplierOperationMeta operationMeta = operationMetaRepository
                .findBySupplierAndOperationName(supplier, operationName)
                .orElseThrow(() -> {
                    // Provide helpful error message with available operations
                    List<String> availableOps = supplier.getOperations().stream()
                        .map(SoapSupplierOperationMeta::getOperationName)
                        .toList();
                    return new IllegalStateException(
                        "Operation '" + operationName + "' not found for supplier: " + supplier.getName() + 
                        ". Available operations: " + availableOps + 
                        ". Please select a valid operation in admin panel.");
                });

            // Build SoapOperationMeta for dynamic invoker
            SoapOperationMeta opMeta = new SoapOperationMeta();
            opMeta.setOperationName(operationMeta.getOperationName());
            opMeta.setSoapAction(operationMeta.getSoapAction());
            opMeta.setInputElement(operationMeta.getInputElement());
            opMeta.setOutputElement(operationMeta.getOutputElement());
            opMeta.setInputFields(SoapFieldDto.fromJson(operationMeta.getInputFieldsJson()));
            opMeta.setOutputFields(SoapFieldDto.fromJson(operationMeta.getOutputFieldsJson()));

            log.info("Calling SOAP notification operation: {} with data: {}", operationMeta.getOperationName(), notificationData);

            // Call dynamic SOAP invoker
            Map<String, Object> response = SoapDynamicInvoker.call(
                supplier.getEffectivePaymentWsdlUrl(),
                supplier.getNamespace(),
                opMeta,
                notificationData,
                new HashMap<>() // No complex types for now
            );

            // Process response
            boolean success = response != null && response.containsKey("success") && 
                            Boolean.TRUE.equals(response.get("success"));
            
            result.put("success", success);
            if (success) {
                result.put("message", response.get("message"));
                log.info("SOAP notification sent successfully to supplier {}: {}", supplier.getName(), response.get("message"));
            } else {
                result.put("error", response.get("message") != null ? response.get("message") : "Notification failed");
                log.warn("SOAP notification failed for supplier {}: {}", supplier.getName(), result.get("error"));
            }
            
            return result;
            
        } catch (Exception e) {
            log.error("Error sending SOAP notification to supplier {}: {}", supplierId, e.getMessage(), e);
            result.put("success", false);
            result.put("error", e.getMessage());
            return result;
        }
    }

    private Object createRequestFromMetadata(SoapSupplierOperationMeta meta, Order order) throws Exception {
    log.info("SOAP order received: id={}, items={}", order != null ? order.getId() : null, order != null ? order.getItems() : null);
        
        // Parse the stored metadata to get the actual field structure
        JsonNode jsonNode = objectMapper.readTree(meta.getInputFieldsJson());
        Map<String, Object> requestData = new HashMap<>();

        // Get first order item for productId/quantity
        var firstItem = (order.getItems() != null && !order.getItems().isEmpty()) ? order.getItems().get(0) : null;
        
        // Helper to get the correct supplier product reference
        java.util.function.Function<com.example.stage2025.entity.OrderItem, String> getSupplierProductId = (item) -> {
            if (item != null && item.getProduct() != null) {
                if (item.getProduct().getSupplierRef() != null && !item.getProduct().getSupplierRef().isEmpty()) {
                    return item.getProduct().getSupplierRef();
                } else if (item.getProduct().getExternalProductId() != null && !item.getProduct().getExternalProductId().isEmpty()) {
                    return item.getProduct().getExternalProductId();
                }
            }
            return null;
        };

        if (jsonNode.isArray()) {
            // Dynamic: array of field definitions from stored metadata
            for (JsonNode node : jsonNode) {
                String fieldName = node.has("name") ? node.get("name").asText() : null;
                if (fieldName == null) {
                    log.warn("Field without name in input_fields_json (array): {}", node);
                    continue;
                }
                
                // Map field names to order data based on stored metadata
                switch (fieldName.toLowerCase()) {
                    case "orderid":
                    case "order_id":
                        requestData.put(fieldName, order.getId().toString());
                        break;
                    case "amount":
                        // IMPORTANT: Send full display price to supplier (€130)
                        // Supplier receives €130, then owes platform €30 commission
                        requestData.put(fieldName, order.getTotal());
                        break;
                    case "currency":
                        requestData.put(fieldName, order.getCurrency());
                        break;
                    case "productid":
                    case "product_id":
                        requestData.put(fieldName, getSupplierProductId.apply(firstItem));
                        break;
                    case "quantity":
                        if (firstItem != null) {
                            requestData.put(fieldName, firstItem.getQuantity());
                        } else {
                            requestData.put(fieldName, null);
                        }
                        break;
                    default:
                        // For any other fields in the metadata, try to map them intelligently
                        log.info("Mapping field '{}' from stored metadata", fieldName);
                        requestData.put(fieldName, mapFieldFromOrder(fieldName, order, firstItem));
                }
            }
        } else if (jsonNode.isObject()) {
            // Static: ready-to-send object from stored metadata
            Map<String, Object> inputFields = objectMapper.convertValue(jsonNode, new TypeReference<Map<String, Object>>() {});
            for (Map.Entry<String, Object> entry : inputFields.entrySet()) {
                String fieldName = entry.getKey();
                
                // Map field names to order data based on stored metadata
                switch (fieldName.toLowerCase()) {
                    case "orderid":
                    case "order_id":
                        requestData.put(fieldName, order.getId().toString());
                        break;
                    case "amount":
                        // IMPORTANT: Send full display price to supplier (€130)
                        // Supplier receives €130, then owes platform €30 commission
                        requestData.put(fieldName, order.getTotal());
                        break;
                    case "currency":
                        requestData.put(fieldName, order.getCurrency());
                        break;
                    case "productid":
                    case "product_id":
                        requestData.put(fieldName, getSupplierProductId.apply(firstItem));
                        break;
                    case "quantity":
                        if (firstItem != null) {
                            requestData.put(fieldName, firstItem.getQuantity());
                        } else {
                            requestData.put(fieldName, null);
                        }
                        break;
                    default:
                        // For any other fields in the metadata, try to map them intelligently
                        log.info("Mapping field '{}' from stored metadata", fieldName);
                        requestData.put(fieldName, mapFieldFromOrder(fieldName, order, firstItem));
                }
            }
        } else {
            log.error("Unexpected input_fields_json format (neither array nor object): {}", meta.getInputFieldsJson());
            throw new IllegalArgumentException("input_fields_json must be array or object, found: " + jsonNode.getNodeType());
        }

        // Debug: log the final requestData
        log.info("SOAP requestData built from stored metadata: {}", requestData);
        return requestData;
    }

    /**
     * Intelligently map field names from stored metadata to order data
     */
    private Object mapFieldFromOrder(String fieldName, Order order, OrderItem firstItem) {
        // Try to map common field variations
        switch (fieldName.toLowerCase()) {
            case "orderid":
            case "order_id":
            case "order":
                return order.getId().toString();
            case "amount":
            case "total":
            case "price":
                return order.getTotal();
            case "currency":
            case "curr":
                return order.getCurrency();
            case "productid":
            case "product_id":
            case "product":
                return firstItem != null ? getSupplierProductId(firstItem) : null;
            case "quantity":
            case "qty":
                return firstItem != null ? firstItem.getQuantity() : null;
            case "customerid":
            case "customer_id":
            case "clientid":
            case "client_id":
                return order.getClient() != null ? order.getClient().getId().toString() : null;
            case "date":
            case "orderdate":
            case "order_date":
                return order.getCreatedAt() != null ? order.getCreatedAt().toString() : null;
            default:
                log.warn("Unknown field '{}' in stored metadata, setting to null", fieldName);
                return null;
        }
    }

    private String getSupplierProductId(OrderItem item) {
        if (item != null && item.getProduct() != null) {
            if (item.getProduct().getSupplierRef() != null && !item.getProduct().getSupplierRef().isEmpty()) {
                return item.getProduct().getSupplierRef();
            } else if (item.getProduct().getExternalProductId() != null && !item.getProduct().getExternalProductId().isEmpty()) {
                return item.getProduct().getExternalProductId();
            }
        }
        return null;
    }

    private boolean processResponseFromMetadata(SoapSupplierOperationMeta meta, Object response) throws Exception {
        // Use stored metadata to determine which field contains the status
        JsonNode outputFieldsNode = objectMapper.readTree(meta.getOutputFieldsJson());
        Map<String, Object> outputFields = new HashMap<>();
        
        if (outputFieldsNode.isArray()) {
            for (JsonNode node : outputFieldsNode) {
                String name = node.has("name") ? node.get("name").asText() : null;
                if (name != null) outputFields.put(name, null);
            }
        } else if (outputFieldsNode.isObject()) {
            outputFields = objectMapper.convertValue(outputFieldsNode, new TypeReference<Map<String, Object>>() {});
        } else {
            throw new IllegalArgumentException("output_fields_json must be array or object, found: " + outputFieldsNode.getNodeType());
        }

        Map<String, Object> responseData = objectMapper.convertValue(response, Map.class);

        // Look for status field in stored metadata (case-insensitive)
        String statusField = outputFields.keySet().stream()
                .filter(k -> k.toLowerCase().contains("status"))
                .findFirst()
                .orElse("status"); // fallback to "status"

        String status = (String) responseData.get(statusField);
        
        // For payment intent creation, PENDING is also considered success (payment session created)
        boolean isSuccess = "SUCCESS".equalsIgnoreCase(status) || 
                           "PENDING".equalsIgnoreCase(status) || 
                           "OK".equalsIgnoreCase(status) ||
                           "COMPLETED".equalsIgnoreCase(status);
        
        log.info("SOAP response status: '{}' (field: '{}') - Success: {}", status, statusField, isSuccess);
        return isSuccess;
    }

    private SoapOperationMeta createSoapOperationMeta(SoapSupplierOperationMeta meta) {
        SoapOperationMeta opMeta = new SoapOperationMeta();
        opMeta.setOperationName(meta.getOperationName());
        opMeta.setSoapAction(meta.getSoapAction());
        opMeta.setInputElement(meta.getInputElement());
        opMeta.setOutputElement(meta.getOutputElement());
        opMeta.setInputFields(SoapFieldDto.fromJson(meta.getInputFieldsJson()));
        opMeta.setOutputFields(SoapFieldDto.fromJson(meta.getOutputFieldsJson()));
        return opMeta;
    }
}