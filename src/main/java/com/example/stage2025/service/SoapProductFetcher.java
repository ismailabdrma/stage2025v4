// src/main/java/com/example/stage2025/service/SoapProductFetcher.java
package com.example.stage2025.service;

import com.example.stage2025.dto.SoapFieldDto;
import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SoapSupplierOperationMeta; // adjust package if different
import com.example.stage2025.service.ImageProcessingService;
import com.example.stage2025.utils.SoapDynamicInvoker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SoapProductFetcher implements ProductFetcher {

    private final ImageProcessingService imageProcessingService;

    @Override
    public List<SupplierProductDto> fetchProducts(Supplier supplier) throws Exception {
        if (!(supplier instanceof SoapSupplier soap)) {
            throw new IllegalArgumentException("Supplier is not SOAP based");
        }

        System.out.println("SoapProductFetcher: Starting fetch for supplier: " + soap.getName());
        System.out.println("SoapProductFetcher: Available operations: " + 
                          soap.getOperations().stream().map(SoapSupplierOperationMeta::getOperationName).toList());

        // 1) Pick listing operation from the saved entity list, then MAP to DTO
        SoapSupplierOperationMeta opEntity = soap.getOperations().stream()
                .filter(o -> eq(o.getOperationName(), "getAllProducts") || eq(o.getOperationName(), "FETCH_PRODUCTS"))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("No suitable SOAP operation for fetching products. Available: " + 
                            soap.getOperations().stream().map(SoapSupplierOperationMeta::getOperationName).toList()));

        SoapOperationMeta opMeta = new SoapOperationMeta(
                opEntity.getOperationName(),
                opEntity.getSoapAction(),
                opEntity.getInputElement(),
                opEntity.getOutputElement(),
                SoapFieldDto.fromJson(opEntity.getInputFieldsJson()),
                SoapFieldDto.fromJson(opEntity.getOutputFieldsJson())
        );

        // 2) Provide complex type map for 'product' (same as DynamicSoapController)
        Map<String, List<SoapFieldDto>> complexTypes = new HashMap<>();
        complexTypes.put("product", List.of(
                new SoapFieldDto("id", "xs:long"),
                new SoapFieldDto("name", "xs:string"),
                new SoapFieldDto("description", "xs:string"),
                new SoapFieldDto("supplierPrice", "xs:double"),
                new SoapFieldDto("displayedPrice", "xs:double"),
                new SoapFieldDto("availableQuantity", "xs:int"),
                new SoapFieldDto("pictureUrl", "xs:string"),
                new SoapFieldDto("pictureData", "xs:base64Binary"),
                new SoapFieldDto("pictureFormat", "xs:string"),
                new SoapFieldDto("realTimeStock", "xs:int"),
                new SoapFieldDto("lastStockUpdate", "xs:string")
        ));

        // 3) Resolve service endpoint from WSDL URL (drop ?wsdl or /supplier.wsdl)
        String endpoint = resolveEndpoint(soap.getWsdlUrl());

        // 4) Call dynamically (no inputs for getAllProducts)
        Map<String, Object> res = SoapDynamicInvoker.call(
                endpoint,
                soap.getNamespace(),
                opMeta,
                Map.of(),
                complexTypes
        );

        // 5) Map the generic response to DTOs
        System.out.println("SoapProductFetcher: SOAP response received: " + res);
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) res.getOrDefault("products", List.of());
        System.out.println("SoapProductFetcher: Found " + items.size() + " products in response");
        List<SupplierProductDto> out = new ArrayList<>();
        for (Map<String, Object> p : items) {
            String id    = s(p.get("id"));
            String name  = s(p.get("name"));
            String desc  = s(p.get("description"));
            double price = d(p.get("displayedPrice"), d(p.get("supplierPrice"), 0.0));
            int stock    = i(p.get("availableQuantity"), 0);
            
            // Handle image data - prioritize base64 data over URL
            List<String> imageUrls = new ArrayList<>();
            String pictureData = s(p.get("pictureData"));
            String pictureFormat = s(p.get("pictureFormat"));
            String pictureUrl = s(p.get("pictureUrl"));
            
            if (pictureData != null && !pictureData.isBlank()) {
                // Convert base64 to data URL for direct frontend use
                String dataUrl = imageProcessingService.convertBase64ToDataUrl(pictureData, pictureFormat);
                if (dataUrl != null) {
                    imageUrls.add(dataUrl);
                }
            } else if (pictureUrl != null && !pictureUrl.isBlank()) {
                // normalize relative image URL (base = endpoint)
                String img = pictureUrl;
                if (!img.startsWith("http")) {
                    String base = endpoint.replaceAll("/+$", "");
                    img = base + (img.startsWith("/") ? "" : "/") + img;
                }
                imageUrls.add(img);
            }

            out.add(new SupplierProductDto(
                    id, name, desc, price, stock, imageUrls
            ));
        }
        System.out.println("SoapProductFetcher: Converted " + out.size() + " products to DTOs");
        return out;
    }

    private static boolean eq(String a, String b) { return a != null && a.equalsIgnoreCase(b); }

    private static String resolveEndpoint(String wsdlUrl) {
        if (wsdlUrl == null) return null;
        String u = wsdlUrl.trim();
        if (u.endsWith("?wsdl")) u = u.substring(0, u.length() - 5);
        if (u.endsWith("/supplier.wsdl")) u = u.substring(0, u.length() - "/supplier.wsdl".length());
        return u; // e.g., http://localhost:8082/ws
    }

    private static String s(Object o) { return o == null ? null : String.valueOf(o); }
    private static double d(Object o, double def) {
        try { return o == null ? def : Double.parseDouble(String.valueOf(o)); } catch (Exception e) { return def; }
    }
    private static int i(Object o, int def) {
        try { return o == null ? def : Integer.parseInt(String.valueOf(o)); } catch (Exception e) { return def; }
    }
}
