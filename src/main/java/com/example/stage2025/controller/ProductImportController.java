package com.example.stage2025.controller;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.service.impl.ProductImportService;
import com.example.stage2025.service.parser.ExcelProductParser;
import com.example.stage2025.service.parser.SoapProductParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin/product-import")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class ProductImportController {

    private final ProductImportService productImportService;
    private final ExcelProductParser excelProductParser;
    private final SoapProductParser soapProductParser;

    @PostMapping("/excel")
    public ResponseEntity<Map<String, Object>> importFromExcel(
            @RequestParam("file") MultipartFile file,
            @RequestParam("supplierId") Long supplierId) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            log.info("Starting Excel import for supplier: {}", supplierId);
            
            // Parse Excel file
            List<SupplierProductDto> products = excelProductParser.parseExcelFile(file);
            
            // Import products
            int importedCount = productImportService.importProductsFromList(products, supplierId);
            
            response.put("success", true);
            response.put("message", "Successfully imported " + importedCount + " products");
            response.put("totalProducts", products.size());
            response.put("importedCount", importedCount);
            
            log.info("Excel import completed. Imported {} out of {} products", importedCount, products.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Excel import failed: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "Import failed: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/soap")
    public ResponseEntity<Map<String, Object>> importFromSoap(
            @RequestParam("supplierId") Long supplierId,
            @RequestParam("soapUrl") String soapUrl,
            @RequestParam("soapAction") String soapAction,
            @RequestParam("requestXml") String requestXml) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            log.info("Starting SOAP import for supplier: {}", supplierId);
            
            // Fetch products from SOAP API
            List<SupplierProductDto> products = soapProductParser.fetchProductsFromSoapApi(
                soapUrl, soapAction, requestXml);
            
            // Import products
            int importedCount = productImportService.importProductsFromList(products, supplierId);
            
            response.put("success", true);
            response.put("message", "Successfully imported " + importedCount + " products from SOAP API");
            response.put("totalProducts", products.size());
            response.put("importedCount", importedCount);
            
            log.info("SOAP import completed. Imported {} out of {} products", importedCount, products.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("SOAP import failed: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "SOAP import failed: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/manual")
    public ResponseEntity<Map<String, Object>> importManual(
            @RequestBody List<SupplierProductDto> products,
            @RequestParam("supplierId") Long supplierId) {
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            log.info("Starting manual import for supplier: {}", supplierId);
            
            // Import products
            int importedCount = productImportService.importProductsFromList(products, supplierId);
            
            response.put("success", true);
            response.put("message", "Successfully imported " + importedCount + " products");
            response.put("totalProducts", products.size());
            response.put("importedCount", importedCount);
            
            log.info("Manual import completed. Imported {} out of {} products", importedCount, products.size());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Manual import failed: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "Manual import failed: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/status/{supplierId}")
    public ResponseEntity<Map<String, Object>> getImportStatus(@PathVariable Long supplierId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Get import status for supplier
            Map<String, Object> status = productImportService.getImportStatus(supplierId);
            
            response.put("success", true);
            response.put("status", status);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Failed to get import status: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "Failed to get import status: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/trigger/{supplierId}")
    public ResponseEntity<Map<String, Object>> triggerImport(@PathVariable Long supplierId) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            log.info("Triggering manual import for supplier: {}", supplierId);
            
            // Trigger import for specific supplier
            productImportService.triggerManualImport(supplierId);
            
            response.put("success", true);
            response.put("message", "Import triggered successfully for supplier " + supplierId);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            log.error("Failed to trigger import: {}", e.getMessage(), e);
            
            response.put("success", false);
            response.put("message", "Failed to trigger import: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
}
