package com.example.stage2025.service.parser;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.enums.DataFormat;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Component
public class ExcelProductParser implements ProductParser {
    
    @Override
    public DataFormat supports() {
        return DataFormat.EXCEL;
    }

    @Override
    public List<SupplierProductDto> parse(byte[] payload) throws Exception {
        throw new UnsupportedOperationException("Use parseExcelFile method for Excel files");
    }

    public List<SupplierProductDto> parseExcelFile(MultipartFile file) throws IOException {
        List<SupplierProductDto> products = new ArrayList<>();
        
        try (Workbook workbook = new XSSFWorkbook(file.getInputStream())) {
            Sheet sheet = workbook.getSheetAt(0); // Get first sheet
            
            // Skip header row
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    SupplierProductDto product = parseRow(row);
                    if (product != null) {
                        products.add(product);
                    }
                }
            }
        }
        
        return products;
    }

    private SupplierProductDto parseRow(Row row) {
        try {
            SupplierProductDto product = new SupplierProductDto();
            
            // Assuming Excel columns: Name, Description, Price, Stock, ExternalID, ImageURLs
            product.setName(getCellValue(row.getCell(0)));
            product.setDescription(getCellValue(row.getCell(1)));
            product.setPrice(new BigDecimal(getCellValue(row.getCell(2))).doubleValue());
            product.setStock(Integer.parseInt(getCellValue(row.getCell(3))));
            product.setExternalProductId(getCellValue(row.getCell(4)));
            
            // Parse image URLs (comma-separated)
            String imageUrls = getCellValue(row.getCell(5));
            if (imageUrls != null && !imageUrls.trim().isEmpty()) {
                String[] urls = imageUrls.split(",");
                List<String> urlList = new ArrayList<>();
                for (String url : urls) {
                    urlList.add(url.trim());
                }
                product.setImageUrls(urlList);
            }
            
            return product;
        } catch (Exception e) {
            // Log error and skip this row
            System.err.println("Error parsing row " + row.getRowNum() + ": " + e.getMessage());
            return null;
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return "";
        }
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    return String.valueOf(cell.getNumericCellValue());
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                return cell.getCellFormula();
            default:
                return "";
        }
    }
}