package com.example.stage2025.service;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.dto.SoapFieldDto;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.utils.SoapDynamicInvoker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SoapProductFetcher {

    public List<SupplierProductDto> fetchProducts(SoapSupplier supplier) {
        log.info("Fetching products from SOAP supplier: {}", supplier.getName());
        
        try {
            List<SupplierProductDto> products = new ArrayList<>();
            
            // Check if supplier has WSDL URL configured
            if (supplier.getWsdlUrl() == null || supplier.getWsdlUrl().isEmpty()) {
                log.warn("No WSDL URL configured for SOAP supplier: {}", supplier.getName());
                return products;
            }
            
            // Check if supplier has operations configured
            if (supplier.getOperations() == null || supplier.getOperations().isEmpty()) {
                log.warn("No SOAP operations configured for supplier: {}", supplier.getName());
                return products;
            }
            
            // Look for operations - prioritize batch operations first, then single operations
            var productOperation = supplier.getOperations().stream()
                    .filter(op -> {
                        String name = op.getOperationName().toLowerCase();
                        // First try to find batch operations
                        return name.contains("getallproducts") || 
                               name.contains("getproducts") || 
                               name.contains("listproducts") ||
                               name.contains("allproducts");
                    })
                    .findFirst();
            
            // If no batch operation found, look for single product operation
            if (productOperation.isEmpty()) {
                productOperation = supplier.getOperations().stream()
                        .filter(op -> {
                            String name = op.getOperationName().toLowerCase();
                            return name.contains("getproductbyid") || 
                                   name.contains("getproduct") ||
                                   name.contains("product");
                        })
                        .findFirst();
            }
            
            if (productOperation.isEmpty()) {
                log.warn("No product-related operation found for supplier: {}", supplier.getName());
                return products;
            }
            
            var operation = productOperation.get();
            log.info("Using SOAP operation '{}' to fetch products", operation.getOperationName());
            
            // Create operation metadata
            SoapOperationMeta opMeta = new SoapOperationMeta(
                    operation.getOperationName(),
                    operation.getSoapAction(),
                    operation.getInputElement(),
                    operation.getOutputElement(),
                    SoapFieldDto.fromJson(operation.getInputFieldsJson()),
                    SoapFieldDto.fromJson(operation.getOutputFieldsJson())
            );
            
            // Define product complex type (same as in DynamicSoapController)
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
            
            // Prepare input values based on operation type
            Map<String, Object> inputValues = new HashMap<>();
            
            // If it's a single product operation, we need to provide IDs
            String operationName = operation.getOperationName().toLowerCase();
            if (operationName.contains("getproductbyid") || operationName.contains("byid")) {
                log.info("Operation '{}' requires product ID - will fetch multiple products by ID", operation.getOperationName());
                
                // For getProductById operations, we'll try a few common product IDs
                // In a real scenario, you'd get these IDs from somewhere else
                List<Integer> productIds = List.of(1, 2, 3, 4, 5); // Try products 1-5
                
                for (Integer productId : productIds) {
                    try {
                        inputValues.clear();
                        inputValues.put("id", productId);
                        
                        Map<String, Object> singleResult = SoapDynamicInvoker.call(
                                supplier.getWsdlUrl(),
                                supplier.getNamespace(),
                                opMeta,
                                inputValues,
                                complexTypes
                        );
                        
                        log.debug("SOAP call for product ID {} response: {}", productId, singleResult);
                        
                        // Extract product from single result
                        List<SupplierProductDto> singleProducts = extractProductsFromSoapResponse(singleResult);
                        if (!singleProducts.isEmpty()) {
                            products.addAll(singleProducts);
                            log.debug("Added {} product(s) from ID {}", singleProducts.size(), productId);
                        }
                        
                    } catch (Exception e) {
                        log.debug("No product found for ID {}: {}", productId, e.getMessage());
                        // Continue to next ID
                    }
                }
                
                log.info("Successfully fetched {} products from SOAP supplier using individual calls", products.size());
                return products;
            }
            
            try {
                Map<String, Object> result = SoapDynamicInvoker.call(
                        supplier.getWsdlUrl(),
                        supplier.getNamespace(),
                        opMeta,
                        inputValues,
                        complexTypes
                );
                
                log.info("SOAP call successful. Response: {}", result);
                
                // Extract products from the response
                products = extractProductsFromSoapResponse(result);
                
                log.info("Successfully fetched {} products from SOAP supplier: {}", products.size(), supplier.getName());
                
            } catch (Exception e) {
                log.error("Failed to call SOAP operation for supplier {}: {}", supplier.getName(), e.getMessage(), e);
                throw new RuntimeException("Failed to call SOAP service", e);
            }
            
            return products;
        } catch (Exception e) {
            log.error("Failed to fetch products from SOAP supplier {}: {}", supplier.getName(), e.getMessage());
            throw new RuntimeException("Failed to fetch products from SOAP supplier", e);
        }
    }
    
    @SuppressWarnings("unchecked")
    private List<SupplierProductDto> extractProductsFromSoapResponse(Map<String, Object> result) {
        List<SupplierProductDto> products = new ArrayList<>();
        
        try {
            // Look for products in different possible response structures
            Object productsData = null;
            
            // Try different keys where products might be located
            for (String key : List.of("products", "return", "result", "response", "product")) {
                if (result.containsKey(key)) {
                    productsData = result.get(key);
                    break;
                }
            }
            
            // If no specific key found, check if the whole result contains product data
            if (productsData == null && !result.isEmpty()) {
                // For single product responses, the product data might be at the root level
                if (result.containsKey("id") || result.containsKey("name")) {
                    productsData = result;
                    log.debug("Using root response as product data");
                }
            }
            
            if (productsData == null) {
                log.warn("No products found in SOAP response. Available keys: {}", result.keySet());
                return products;
            }
            
            List<Map<String, Object>> productList;
            if (productsData instanceof List) {
                productList = (List<Map<String, Object>>) productsData;
            } else if (productsData instanceof Map) {
                // Single product wrapped in a map
                productList = List.of((Map<String, Object>) productsData);
            } else {
                log.warn("Unexpected products data format: {}", productsData.getClass());
                return products;
            }
            
            // Convert each product map to SupplierProductDto
            for (Map<String, Object> productMap : productList) {
                try {
                    SupplierProductDto product = new SupplierProductDto();
                    
                    // Map fields from SOAP response to SupplierProductDto
                    product.setExternalProductId(getStringValue(productMap, "id"));
                    product.setName(getStringValue(productMap, "name"));
                    product.setDescription(getStringValue(productMap, "description"));
                    product.setPrice(getDoubleValue(productMap, "supplierPrice", "displayedPrice", "price"));
                    product.setStock(getIntValue(productMap, "availableQuantity", "realTimeStock", "stock"));
                    
                    // Handle picture data - either URL or base64
                    String pictureUrl = getStringValue(productMap, "pictureUrl");
                    String pictureData = getStringValue(productMap, "pictureData");
                    String pictureFormat = getStringValue(productMap, "pictureFormat");
                    
                    if (pictureData != null && !pictureData.isEmpty()) {
                        // Store base64 image data as data URL
                        String format = pictureFormat != null ? pictureFormat : "jpeg";
                        String dataUrl = "data:image/" + format + ";base64," + pictureData;
                        product.setImageUrls(List.of(dataUrl));
                        log.debug("Product {} has base64 image data (format: {})", product.getName(), format);
                    } else if (pictureUrl != null && !pictureUrl.isEmpty()) {
                        product.setImageUrls(List.of(pictureUrl));
                        log.debug("Product {} has image URL: {}", product.getName(), pictureUrl);
                    }
                    
                    // Add the product if it has required fields
                    if (product.getName() != null && !product.getName().isEmpty()) {
                        products.add(product);
                        log.debug("Mapped SOAP product: {} - {} - ${} - {} in stock", 
                                product.getExternalProductId(), product.getName(), product.getPrice(), product.getStock());
                    }
                    
                } catch (Exception e) {
                    log.error("Failed to map product from SOAP response: {}", e.getMessage());
                }
            }
            
        } catch (Exception e) {
            log.error("Failed to extract products from SOAP response: {}", e.getMessage(), e);
        }
        
        return products;
    }
    
    private String getStringValue(Map<String, Object> map, String... keys) {
        for (String key : keys) {
            Object value = map.get(key);
            if (value != null) {
                return value.toString();
            }
        }
        return null;
    }
    
    private Double getDoubleValue(Map<String, Object> map, String... keys) {
        for (String key : keys) {
            Object value = map.get(key);
            if (value != null) {
                try {
                    return Double.parseDouble(value.toString());
                } catch (NumberFormatException e) {
                    log.debug("Could not parse double value for key {}: {}", key, value);
                }
            }
        }
        return 0.0;
    }
    
    private Integer getIntValue(Map<String, Object> map, String... keys) {
        for (String key : keys) {
            Object value = map.get(key);
            if (value != null) {
                try {
                    return Integer.parseInt(value.toString());
                } catch (NumberFormatException e) {
                    log.debug("Could not parse integer value for key {}: {}", key, value);
                }
            }
        }
        return 0;
    }
}