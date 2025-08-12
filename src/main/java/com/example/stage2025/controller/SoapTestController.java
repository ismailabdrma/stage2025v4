

package com.example.stage2025.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/soap-test")
@RequiredArgsConstructor
@Slf4j
@PreAuthorize("hasRole('ADMIN')")
public class SoapTestController {

    @GetMapping("/test-wsdl")
    public ResponseEntity<Map<String, Object>> testWsdlConnection(@RequestParam String wsdlUrl) {
        Map<String, Object> result = new HashMap<>();
        
        try {
            log.info("Testing WSDL connection to: {}", wsdlUrl);
            
            URL url = new URL(wsdlUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setConnectTimeout(5000);
            connection.setReadTimeout(5000);
            
            int responseCode = connection.getResponseCode();
            String contentType = connection.getContentType();
            
            result.put("success", responseCode == 200);
            result.put("responseCode", responseCode);
            result.put("contentType", contentType);
            result.put("message", responseCode == 200 ? "WSDL accessible" : "WSDL not accessible");
            
            if (responseCode == 200) {
                result.put("wsdlSize", connection.getContentLength());
                log.info("WSDL test successful - Response: {}, Content-Type: {}", responseCode, contentType);
            } else {
                log.warn("WSDL test failed - Response: {}", responseCode);
            }
            
        } catch (Exception e) {
            log.error("WSDL test error: {}", e.getMessage());
            result.put("success", false);
            result.put("error", e.getMessage());
            result.put("message", "Connection failed: " + e.getMessage());
        }
        
        return ResponseEntity.ok(result);
    }
    
    @PostMapping("/validate-soap-config")
    public ResponseEntity<Map<String, Object>> validateSoapConfig(@RequestBody Map<String, String> config) {
        Map<String, Object> result = new HashMap<>();
        
        String wsdlUrl = config.get("wsdlUrl");
        String namespace = config.get("namespace");
        
        // Validate required fields
        if (wsdlUrl == null || wsdlUrl.isBlank()) {
            result.put("valid", false);
            result.put("error", "WSDL URL is required");
            return ResponseEntity.ok(result);
        }
        
        if (namespace == null || namespace.isBlank()) {
            result.put("valid", false);
            result.put("error", "Namespace is required");
            return ResponseEntity.ok(result);
        }
        
        // Validate URL format
        if (!wsdlUrl.matches("^https?://.*")) {
            result.put("valid", false);
            result.put("error", "WSDL URL must be a valid HTTP/HTTPS URL");
            return ResponseEntity.ok(result);
        }
        
        // Validate namespace format (should be URI format)
        if (!namespace.startsWith("http://") && !namespace.startsWith("https://")) {
            result.put("valid", false);
            result.put("error", "Namespace should be a valid URI (e.g., http://supplier.com/ws)");
            return ResponseEntity.ok(result);
        }
        
        result.put("valid", true);
        result.put("message", "SOAP configuration is valid");
        result.put("wsdlUrl", wsdlUrl);
        result.put("namespace", namespace);
        
        log.info("SOAP config validation passed - WSDL: {}, Namespace: {}", wsdlUrl, namespace);
        
        return ResponseEntity.ok(result);
    }
}









