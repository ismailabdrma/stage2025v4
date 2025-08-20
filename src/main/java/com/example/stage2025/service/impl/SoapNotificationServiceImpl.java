package com.example.stage2025.service.impl;

import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.service.SoapNotificationService;
import com.example.stage2025.service.impl.SoapPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SoapNotificationServiceImpl implements SoapNotificationService {

    private final SoapPaymentService soapPaymentService;

    @Override
    public boolean notifyPaymentStatus(Supplier supplier, Long paymentId, String status) {
        try {
            if (!(supplier instanceof SoapSupplier soapSupplier)) {
                log.warn("Supplier {} is not a SOAP supplier, cannot send notification", supplier.getName());
                return false;
            }

            String operationName = soapSupplier.getSuccessOperationName();
            if (operationName == null || operationName.trim().isEmpty()) {
                log.warn("Supplier {} has no success operation configured", supplier.getName());
                return false;
            }

            // Validate that the operation exists in the supplier's WSDL
            if (!"notifyPaymentStatus".equals(operationName)) {
                log.warn("Supplier {} has invalid success operation: {}. Expected: notifyPaymentStatus", 
                        supplier.getName(), operationName);
                return false;
            }

            log.info("Sending payment status notification to supplier {}: paymentId={}, status={}, operation={}", 
                    supplier.getName(), paymentId, status, operationName);

            // Prepare notification data - MUST match WSDL exactly
            Map<String, Object> notificationData = new HashMap<>();
            notificationData.put("paymentId", paymentId);  // Must be long as per WSDL
            notificationData.put("status", status);        // Must be string as per WSDL

            // Send SOAP notification
            Map<String, Object> result = soapPaymentService.sendSoapNotification(
                    soapSupplier.getId(), operationName, notificationData);

            boolean success = Boolean.TRUE.equals(result.get("success"));
            if (success) {
                log.info("Payment status notification sent successfully to supplier {}", supplier.getName());
            } else {
                log.error("Failed to send payment status notification to supplier {}: {}", 
                        supplier.getName(), result.get("error"));
            }

            return success;

        } catch (Exception e) {
            log.error("Error sending payment status notification to supplier {}: {}", 
                    supplier.getName(), e.getMessage(), e);
            return false;
        }
    }
} 