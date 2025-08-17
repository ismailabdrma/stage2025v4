package com.example.stage2025.service.impl;

import com.example.stage2025.entity.Order;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.SoapSupplierOperationMeta;
import com.example.stage2025.repository.SoapSupplierOperationMetaRepository;
import com.example.stage2025.repository.SoapSupplierRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.ws.client.core.WebServiceTemplate;
import org.springframework.ws.soap.client.core.SoapActionCallback;

import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.dto.SoapFieldDto;
import com.example.stage2025.utils.SoapDynamicInvoker;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SoapPaymentService {

    private final WebServiceTemplate webServiceTemplate;
    private final SoapSupplierOperationMetaRepository operationMetaRepository;
    private final SoapSupplierRepository soapSupplierRepository;
    private final ObjectMapper objectMapper;
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

            SoapSupplierOperationMeta operationMeta = operationMetaRepository
                .findBySupplierAndOperationName(supplier, supplier.getPaymentOperationName())
                .orElseThrow(() -> new IllegalStateException("Payment operation metadata not found for supplier: " + supplier.getName()));

            Map<String, Object> requestData = (Map<String, Object>) createRequestFromMetadata(operationMeta, order);

            // Build SoapOperationMeta for dynamic invoker
            SoapOperationMeta opMeta = new SoapOperationMeta();
            opMeta.setOperationName(operationMeta.getOperationName());
            opMeta.setSoapAction(operationMeta.getSoapAction());
            opMeta.setInputElement(operationMeta.getInputElement());
            opMeta.setOutputElement(operationMeta.getOutputElement());
            opMeta.setInputFields(SoapFieldDto.fromJson(operationMeta.getInputFieldsJson()));
            opMeta.setOutputFields(SoapFieldDto.fromJson(operationMeta.getOutputFieldsJson()));

            // Call dynamic SOAP invoker
            Map<String, Object> response = SoapDynamicInvoker.call(
                supplier.getWsdlUrl(),
                supplier.getNamespace(),
                opMeta,
                requestData,
                new HashMap<>() // No complex types for now
            );

            // Process response and extract payment data
            boolean success = processResponseFromMetadata(operationMeta, response);
            result.put("success", success);
            
            if (success) {
                // Extract payment data from response
                result.put("paymentId", response.get("paymentId"));
                result.put("stripeSessionId", response.get("stripeSessionId"));
                result.put("url", response.get("url"));
                result.put("message", response.get("message"));
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

    private Object createRequestFromMetadata(SoapSupplierOperationMeta meta, Order order) throws Exception {
    log.info("SOAP order received: id={}, items={}", order != null ? order.getId() : null, order != null ? order.getItems() : null);
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
            // Dynamic: array of field definitions
            for (JsonNode node : jsonNode) {
                String fieldName = node.has("name") ? node.get("name").asText() : null;
                if (fieldName == null) {
                    log.warn("Champ sans nom dans input_fields_json (array): {}", node);
                    continue;
                }
                String fieldType = node.has("type") ? node.get("type").asText() : "string";
                switch (fieldName) {
                    case "orderId":
                        requestData.put(fieldName, order.getId().toString());
                        break;
                    case "amount":
                        requestData.put(fieldName, order.getTotal());
                        break;
                    case "currency":
                        requestData.put(fieldName, order.getCurrency());
                        break;
                    case "productId":
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
                        log.warn("Unhandled field in SOAP request: {}", fieldName);
                }
            }
        } else if (jsonNode.isObject()) {
            // Static: ready-to-send object
            Map<String, Object> inputFields = objectMapper.convertValue(jsonNode, new TypeReference<Map<String, Object>>() {});
            for (Map.Entry<String, Object> entry : inputFields.entrySet()) {
                String fieldName = entry.getKey();
                switch (fieldName) {
                    case "orderId":
                        requestData.put(fieldName, order.getId().toString());
                        break;
                    case "amount":
                        requestData.put(fieldName, order.getTotal());
                        break;
                    case "currency":
                        requestData.put(fieldName, order.getCurrency());
                        break;
                    case "productId":
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
                        log.warn("Unhandled field in SOAP request: {}", fieldName);
                }
            }
        } else {
            log.error("input_fields_json format inattendu (ni array ni object): {}", meta.getInputFieldsJson());
            throw new IllegalArgumentException("input_fields_json must be array or object, found: " + jsonNode.getNodeType());
        }

        // Debug: log the final requestData
        log.info("SOAP requestData built: {}", requestData);
        return requestData;
    }

    private boolean processResponseFromMetadata(SoapSupplierOperationMeta meta, Object response) throws Exception {
        // Support both array and object for outputFieldsJson
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

        String statusField = outputFields.keySet().stream()
                .filter(k -> "status".equalsIgnoreCase(k))
                .findFirst()
                .orElseThrow(() -> new IllegalStateException("Status field not found in response metadata"));

        String status = (String) responseData.get(statusField);
        // For payment intent creation, PENDING is also considered success (payment session created)
        return "SUCCESS".equalsIgnoreCase(status) || "PENDING".equalsIgnoreCase(status);
    }
}