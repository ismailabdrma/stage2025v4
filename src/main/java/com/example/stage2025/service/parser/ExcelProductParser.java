package com.example.stage2025.service.parser;

import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.enums.DataFormat;
import com.example.stage2025.service.ImageProcessingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.*;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.*;
import java.util.Base64;

@Component
@RequiredArgsConstructor
@Slf4j
public class ExcelProductParser implements ProductParser {
    
    private final ImageProcessingService imageProcessingService;
    
    @Override
    public DataFormat supports() {
        return DataFormat.EXCEL;
    }

    @Override
    public List<SupplierProductDto> parse(byte[] payload) throws Exception {
        try (Workbook workbook = createWorkbook(payload)) {
            Sheet sheet = workbook.getSheetAt(0); // Get first sheet
            
            // Extract embedded images with their cell positions
            Map<String, List<String>> embeddedImages = extractEmbeddedImages(sheet);
            
            List<SupplierProductDto> products = new ArrayList<>();
            
            // Skip header row and process data rows
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    SupplierProductDto product = parseRow(row, embeddedImages, i);
                    if (product != null) {
                        products.add(product);
                        log.debug("Parsed product from Excel row {}: {} - ${}", i, product.getName(), product.getPrice());
                    }
                }
            }
            
            log.info("Successfully parsed {} products from Excel file", products.size());
            return products;
        }
    }

    public List<SupplierProductDto> parseExcelFile(MultipartFile file) throws IOException {
        List<SupplierProductDto> products = new ArrayList<>();
        
        try (Workbook workbook = createWorkbook(file)) {
            Sheet sheet = workbook.getSheetAt(0); // Get first sheet
            
            // Extract embedded images with their cell positions
            Map<String, List<String>> embeddedImages = extractEmbeddedImages(sheet);
            
            // Skip header row and process data rows
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row != null) {
                    SupplierProductDto product = parseRow(row, embeddedImages, i);
                    if (product != null) {
                        products.add(product);
                        log.debug("Parsed product: {} from row {}", product.getName(), i);
                    }
                }
            }
        }
        
        log.info("Successfully parsed {} products from Excel file", products.size());
        return products;
    }

    /**
     * Create appropriate workbook based on file type
     */
    private Workbook createWorkbook(MultipartFile file) throws IOException {
        String filename = file.getOriginalFilename();
        if (filename != null && filename.toLowerCase().endsWith(".xlsx")) {
            return new XSSFWorkbook(file.getInputStream());
        } else {
            return new HSSFWorkbook(file.getInputStream());
        }
    }
    
    /**
     * Create workbook from byte array (try .xlsx first, fallback to .xls)
     */
    private Workbook createWorkbook(byte[] payload) throws IOException {
        try {
            // Try .xlsx first
            return new XSSFWorkbook(new java.io.ByteArrayInputStream(payload));
        } catch (Exception e) {
            try {
                // Fallback to .xls
                return new HSSFWorkbook(new java.io.ByteArrayInputStream(payload));
            } catch (Exception e2) {
                throw new IOException("Unable to parse Excel file: not a valid .xlsx or .xls format", e2);
            }
        }
    }

    /**
     * Extract embedded images from Excel sheet
     */
    private Map<String, List<String>> extractEmbeddedImages(Sheet sheet) {
        Map<String, List<String>> imagesByRow = new HashMap<>();
        
        if (!(sheet instanceof XSSFSheet)) {
            log.warn("Embedded images only supported for .xlsx files, not .xls");
            return imagesByRow;
        }
        
        try {
            XSSFSheet xssfSheet = (XSSFSheet) sheet;
            XSSFDrawing drawing = xssfSheet.getDrawingPatriarch();
            
            if (drawing != null) {
                for (XSSFShape shape : drawing.getShapes()) {
                    if (shape instanceof XSSFPicture) {
                        XSSFPicture picture = (XSSFPicture) shape;
                        
                        // Get the cell anchor to determine which row this image belongs to
                        int row1 = picture.getClientAnchor().getRow1();
                        
                        // Use the starting row as the key
                        String rowKey = String.valueOf(row1);
                        
                        // Extract image data
                        XSSFPictureData pictureData = picture.getPictureData();
                        byte[] imageBytes = pictureData.getData();
                        String mimeType = pictureData.getMimeType();
                        
                        // Convert to base64 data URL
                        String base64 = Base64.getEncoder().encodeToString(imageBytes);
                        String dataUrl = "data:" + mimeType + ";base64," + base64;
                        
                        // Add to the row's image list
                        imagesByRow.computeIfAbsent(rowKey, k -> new ArrayList<>()).add(dataUrl);
                        
                        log.debug("Extracted embedded image for row {}: {} bytes, MIME: {}", 
                                 row1, imageBytes.length, mimeType);
                    }
                }
            }
        } catch (Exception e) {
            log.error("Error extracting embedded images: {}", e.getMessage(), e);
        }
        
        return imagesByRow;
    }

    private SupplierProductDto parseRow(Row row, Map<String, List<String>> embeddedImages, int rowIndex) {
        try {
            SupplierProductDto product = new SupplierProductDto();
            
            // Column A: Name (Required)
            String name = getCellValue(row.getCell(0));
            if (name == null || name.trim().isEmpty()) {
                log.warn("Row {}: Missing product name, skipping", rowIndex);
                return null;
            }
            product.setName(name.trim());
            
            // Column B: Description (Optional)
            product.setDescription(getCellValue(row.getCell(1)));
            
            // Column C: Price (Required)
            String priceStr = getCellValue(row.getCell(2));
            if (priceStr == null || priceStr.trim().isEmpty()) {
                log.warn("Row {}: Missing price for product '{}', skipping", rowIndex, name);
                return null;
            }
            try {
                product.setPrice(new BigDecimal(priceStr.trim()).doubleValue());
            } catch (NumberFormatException e) {
                log.warn("Row {}: Invalid price '{}' for product '{}', skipping", rowIndex, priceStr, name);
                return null;
            }
            
            // Column D: Stock (Required)
            String stockStr = getCellValue(row.getCell(3));
            if (stockStr == null || stockStr.trim().isEmpty()) {
                log.warn("Row {}: Missing stock for product '{}', skipping", rowIndex, name);
                return null;
            }
            try {
                product.setStock(Integer.parseInt(stockStr.trim()));
            } catch (NumberFormatException e) {
                log.warn("Row {}: Invalid stock '{}' for product '{}', skipping", rowIndex, stockStr, name);
                return null;
            }
            
            // Column E: ExternalID (Required)
            String externalId = getCellValue(row.getCell(4));
            if (externalId == null || externalId.trim().isEmpty()) {
                log.warn("Row {}: Missing external ID for product '{}', skipping", rowIndex, name);
                return null;
            }
            product.setExternalProductId(externalId.trim());
            
            // Column F: Images (Optional - URLs or "EMBEDDED")
            List<String> imageUrls = new ArrayList<>();
            String imageUrlsCell = getCellValue(row.getCell(5));
            
            if (imageUrlsCell != null && !imageUrlsCell.trim().isEmpty()) {
                String imageUrlsValue = imageUrlsCell.trim();
                
                if ("EMBEDDED".equalsIgnoreCase(imageUrlsValue)) {
                    // Use embedded images for this row
                    List<String> embeddedForRow = embeddedImages.get(String.valueOf(rowIndex));
                    if (embeddedForRow != null && !embeddedForRow.isEmpty()) {
                        imageUrls.addAll(embeddedForRow);
                        log.debug("Row {}: Using {} embedded images", rowIndex, embeddedForRow.size());
                    } else {
                        log.warn("Row {}: 'EMBEDDED' specified but no embedded images found", rowIndex);
                    }
                } else {
                    // Parse as comma-separated URLs
                    String[] urls = imageUrlsValue.split(",");
                    for (String url : urls) {
                        String trimmedUrl = url.trim();
                        if (!trimmedUrl.isEmpty()) {
                            imageUrls.add(trimmedUrl);
                        }
                    }
                }
            }
            
            // Auto-detect embedded images if no URLs specified
            if (imageUrls.isEmpty()) {
                List<String> embeddedForRow = embeddedImages.get(String.valueOf(rowIndex));
                if (embeddedForRow != null && !embeddedForRow.isEmpty()) {
                    imageUrls.addAll(embeddedForRow);
                    log.debug("Row {}: Auto-detected {} embedded images", rowIndex, embeddedForRow.size());
                }
            }
            
            product.setImageUrls(imageUrls);
            
            return product;
            
        } catch (Exception e) {
            log.error("Error parsing row {}: {}", rowIndex, e.getMessage(), e);
            return null;
        }
    }

    private String getCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }
        
        switch (cell.getCellType()) {
            case STRING:
                return cell.getStringCellValue();
            case NUMERIC:
                if (DateUtil.isCellDateFormatted(cell)) {
                    return cell.getDateCellValue().toString();
                } else {
                    // Format numeric values to avoid scientific notation
                    double numValue = cell.getNumericCellValue();
                    if (numValue == (long) numValue) {
                        return String.valueOf((long) numValue);
                    } else {
                        return String.valueOf(numValue);
                    }
                }
            case BOOLEAN:
                return String.valueOf(cell.getBooleanCellValue());
            case FORMULA:
                try {
                    // Try to evaluate the formula
                    return cell.getCellFormula();
                } catch (Exception e) {
                    return null;
                }
            case BLANK:
            case _NONE:
            case ERROR:
            default:
                return null;
        }
    }
}
