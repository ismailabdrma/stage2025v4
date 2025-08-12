# 📊 **EXCEL FILE FORMAT SPECIFICATION - STAGE2025**

## 🎯 **ANSWER: YES, Excel Must Follow Specific Format!**

**The Excel file must follow a specific column structure for successful product import. Any Excel file won't work - it needs the exact format specified below.**

---

## 📋 **REQUIRED EXCEL FORMAT**

### **Column Structure (Must Match Exactly)**

| **Column** | **Header Name** | **Data Type** | **Required** | **Description** |
|------------|----------------|---------------|--------------|-----------------|
| **A (0)** | `Name` | Text | ✅ Yes | Product name |
| **B (1)** | `Description` | Text | 🟡 Optional | Product description |
| **C (2)** | `Price` | Number | ✅ Yes | Product price (decimal format) |
| **D (3)** | `Stock` | Integer | ✅ Yes | Available quantity |
| **E (4)** | `ExternalID` | Text | ✅ Yes | Unique supplier product ID |
| **F (5)** | `ImageURLs` | Text | 🟡 Optional | Image URLs OR "EMBEDDED" for pictures |

### **Excel File Requirements**

- ✅ **File Format**: `.xlsx` (Excel 2007+) or `.xls` (Excel 97-2003)
- ✅ **First Sheet**: Data must be in the first worksheet
- ✅ **Header Row**: Row 1 must contain column headers
- ✅ **Data Rows**: Starting from Row 2
- ✅ **File Size**: Maximum 30MB
- ✅ **File Encoding**: UTF-8 recommended

---

## 📝 **EXAMPLE EXCEL CONTENT**

### **Row 1 (Headers)**
```
Name | Description | Price | Stock | ExternalID | ImageURLs
```

### **Row 2+ (Data Examples)**
```
Samsung Galaxy S24 | Latest flagship smartphone | 899.99 | 50 | SAMS24-001 | https://images.example.com/s24-1.jpg,https://images.example.com/s24-2.jpg
iPhone 15 Pro | Apple flagship with titanium design | 1199.99 | 30 | APPL15-PRO | EMBEDDED
MacBook Air M3 | Lightweight laptop with M3 chip | 1299.00 | 15 | APPL-MBA-M3 | [leave empty for auto-detection]
```

**Note**: For embedded images, insert actual pictures in Excel rows and use "EMBEDDED" or leave empty for auto-detection.

---

## 🛠️ **BACKEND PROCESSING CODE**

```java
// ExcelProductParser.java - Column mapping
private SupplierProductDto parseRow(Row row) {
    SupplierProductDto product = new SupplierProductDto();
    
    // Column 0: Name (Required)
    product.setName(getCellValue(row.getCell(0)));
    
    // Column 1: Description (Optional)
    product.setDescription(getCellValue(row.getCell(1)));
    
    // Column 2: Price (Required - must be numeric)
    product.setPrice(new BigDecimal(getCellValue(row.getCell(2))).doubleValue());
    
    // Column 3: Stock (Required - must be integer)
    product.setStock(Integer.parseInt(getCellValue(row.getCell(3))));
    
    // Column 4: External ID (Required - unique identifier)
    product.setExternalProductId(getCellValue(row.getCell(4)));
    
    // Column 5: Image URLs (Optional - comma-separated)
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
}
```

---

## 📂 **CSV FORMAT ALTERNATIVE**

For CSV files, use this header format:
```csv
externalId,name,description,price,stock,images
SAMS24-001,"Samsung Galaxy S24","Latest flagship smartphone",899.99,50,"https://images.example.com/s24-1.jpg|https://images.example.com/s24-2.jpg"
```

**Note**: CSV uses `|` (pipe) separator for multiple image URLs, while Excel uses `,` (comma).

---

## ✅ **VALIDATION RULES**

### **Required Field Validation**
- **Name**: Must not be empty
- **Price**: Must be valid decimal number > 0
- **Stock**: Must be integer ≥ 0
- **ExternalID**: Must be unique per supplier

### **Optional Field Handling**
- **Description**: Can be empty, defaults to ""
- **ImageURLs**: Can be empty, no images added

### **Error Handling**
- Invalid rows are skipped with error logging
- Processing continues for valid rows
- Final report shows: `Total: X, Imported: Y, Errors: Z`

---

## 🎨 **FRONTEND UPLOAD INTERFACE**

The supplier dialog provides:
- ✅ **File Upload**: Drag-and-drop Excel file selection
- ✅ **File Validation**: Only `.xlsx`, `.xls`, `.csv` accepted
- ✅ **Progress Indicator**: Upload progress display
- ✅ **Template Download**: Link to download example template
- ✅ **Auto-Path Fill**: Uploaded file path auto-filled

```typescript
// File upload validation
accept=".xlsx,.xls,.csv"
onFileSelected(event: Event): void {
    const file = input.files?.[0];
    if (file) {
        this.supplierService.uploadSupplierFile(file).subscribe({
            next: (response) => {
                this.supplierForm.patchValue({
                    fileName: response.fileName,
                    filePath: response.filePath
                });
            }
        });
    }
}
```

---

## 📊 **SAMPLE EXCEL TEMPLATE**

A template file is available at: `frontend/src/assets/excel-template.xlsx`

### **To Download Template:**
1. Go to supplier creation dialog
2. Select "Excel File" type
3. Click "Download template" link
4. Use the downloaded file as starting point

---

## 🚨 **COMMON MISTAKES TO AVOID**

### **❌ Wrong Column Order**
```
Price | Name | Stock | Description  ← WRONG ORDER
```

### **❌ Missing Headers**
```
Samsung Galaxy | 899.99 | 50  ← NO HEADERS
```

### **❌ Wrong Data Types**
```
Name | Price | Stock
Phone | "nine hundred" | "fifty"  ← TEXT IN NUMERIC FIELDS
```

### **❌ Missing Required Fields**
```
Name | Description | Price | Stock | ExternalID
Phone | Great phone |  | 50 |   ← MISSING PRICE & ID
```

---

## ✅ **CORRECT EXCEL EXAMPLE**

| Name | Description | Price | Stock | ExternalID | ImageURLs |
|------|-------------|-------|-------|------------|-----------|
| Samsung Galaxy S24 | Latest flagship smartphone | 899.99 | 50 | SAMS24-001 | https://images.example.com/s24.jpg |
| iPhone 15 Pro | Apple flagship with titanium | 1199.99 | 30 | APPL15-PRO | https://images.example.com/iphone15.jpg |
| MacBook Air M3 | Lightweight laptop with M3 | 1299.00 | 15 | APPL-MBA-M3 | |

---

## 🎯 **SUMMARY**

**Excel files MUST follow the exact 6-column format:**
1. **Name** (Required)
2. **Description** (Optional) 
3. **Price** (Required - Number)
4. **Stock** (Required - Integer)
5. **ExternalID** (Required - Unique)
6. **ImageURLs** (Optional - Comma-separated)

**Any other format will cause import errors or data corruption!**

Use the provided template or follow this specification exactly for successful product imports. 📊✅

## 🎯 **ANSWER: YES, Excel Must Follow Specific Format!**

**The Excel file must follow a specific column structure for successful product import. Any Excel file won't work - it needs the exact format specified below.**

---

## 📋 **REQUIRED EXCEL FORMAT**

### **Column Structure (Must Match Exactly)**

| **Column** | **Header Name** | **Data Type** | **Required** | **Description** |
|------------|----------------|---------------|--------------|-----------------|
| **A (0)** | `Name` | Text | ✅ Yes | Product name |
| **B (1)** | `Description` | Text | 🟡 Optional | Product description |
| **C (2)** | `Price` | Number | ✅ Yes | Product price (decimal format) |
| **D (3)** | `Stock` | Integer | ✅ Yes | Available quantity |
| **E (4)** | `ExternalID` | Text | ✅ Yes | Unique supplier product ID |
| **F (5)** | `ImageURLs` | Text | 🟡 Optional | Image URLs OR "EMBEDDED" for pictures |

### **Excel File Requirements**

- ✅ **File Format**: `.xlsx` (Excel 2007+) or `.xls` (Excel 97-2003)
- ✅ **First Sheet**: Data must be in the first worksheet
- ✅ **Header Row**: Row 1 must contain column headers
- ✅ **Data Rows**: Starting from Row 2
- ✅ **File Size**: Maximum 30MB
- ✅ **File Encoding**: UTF-8 recommended

---

## 📝 **EXAMPLE EXCEL CONTENT**

### **Row 1 (Headers)**
```
Name | Description | Price | Stock | ExternalID | ImageURLs
```

### **Row 2+ (Data Examples)**
```
Samsung Galaxy S24 | Latest flagship smartphone | 899.99 | 50 | SAMS24-001 | https://images.example.com/s24-1.jpg,https://images.example.com/s24-2.jpg
iPhone 15 Pro | Apple flagship with titanium design | 1199.99 | 30 | APPL15-PRO | EMBEDDED
MacBook Air M3 | Lightweight laptop with M3 chip | 1299.00 | 15 | APPL-MBA-M3 | [leave empty for auto-detection]
```

**Note**: For embedded images, insert actual pictures in Excel rows and use "EMBEDDED" or leave empty for auto-detection.

---

## 🛠️ **BACKEND PROCESSING CODE**

```java
// ExcelProductParser.java - Column mapping
private SupplierProductDto parseRow(Row row) {
    SupplierProductDto product = new SupplierProductDto();
    
    // Column 0: Name (Required)
    product.setName(getCellValue(row.getCell(0)));
    
    // Column 1: Description (Optional)
    product.setDescription(getCellValue(row.getCell(1)));
    
    // Column 2: Price (Required - must be numeric)
    product.setPrice(new BigDecimal(getCellValue(row.getCell(2))).doubleValue());
    
    // Column 3: Stock (Required - must be integer)
    product.setStock(Integer.parseInt(getCellValue(row.getCell(3))));
    
    // Column 4: External ID (Required - unique identifier)
    product.setExternalProductId(getCellValue(row.getCell(4)));
    
    // Column 5: Image URLs (Optional - comma-separated)
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
}
```

---

## 📂 **CSV FORMAT ALTERNATIVE**

For CSV files, use this header format:
```csv
externalId,name,description,price,stock,images
SAMS24-001,"Samsung Galaxy S24","Latest flagship smartphone",899.99,50,"https://images.example.com/s24-1.jpg|https://images.example.com/s24-2.jpg"
```

**Note**: CSV uses `|` (pipe) separator for multiple image URLs, while Excel uses `,` (comma).

---

## ✅ **VALIDATION RULES**

### **Required Field Validation**
- **Name**: Must not be empty
- **Price**: Must be valid decimal number > 0
- **Stock**: Must be integer ≥ 0
- **ExternalID**: Must be unique per supplier

### **Optional Field Handling**
- **Description**: Can be empty, defaults to ""
- **ImageURLs**: Can be empty, no images added

### **Error Handling**
- Invalid rows are skipped with error logging
- Processing continues for valid rows
- Final report shows: `Total: X, Imported: Y, Errors: Z`

---

## 🎨 **FRONTEND UPLOAD INTERFACE**

The supplier dialog provides:
- ✅ **File Upload**: Drag-and-drop Excel file selection
- ✅ **File Validation**: Only `.xlsx`, `.xls`, `.csv` accepted
- ✅ **Progress Indicator**: Upload progress display
- ✅ **Template Download**: Link to download example template
- ✅ **Auto-Path Fill**: Uploaded file path auto-filled

```typescript
// File upload validation
accept=".xlsx,.xls,.csv"
onFileSelected(event: Event): void {
    const file = input.files?.[0];
    if (file) {
        this.supplierService.uploadSupplierFile(file).subscribe({
            next: (response) => {
                this.supplierForm.patchValue({
                    fileName: response.fileName,
                    filePath: response.filePath
                });
            }
        });
    }
}
```

---

## 📊 **SAMPLE EXCEL TEMPLATE**

A template file is available at: `frontend/src/assets/excel-template.xlsx`

### **To Download Template:**
1. Go to supplier creation dialog
2. Select "Excel File" type
3. Click "Download template" link
4. Use the downloaded file as starting point

---

## 🚨 **COMMON MISTAKES TO AVOID**

### **❌ Wrong Column Order**
```
Price | Name | Stock | Description  ← WRONG ORDER
```

### **❌ Missing Headers**
```
Samsung Galaxy | 899.99 | 50  ← NO HEADERS
```

### **❌ Wrong Data Types**
```
Name | Price | Stock
Phone | "nine hundred" | "fifty"  ← TEXT IN NUMERIC FIELDS
```

### **❌ Missing Required Fields**
```
Name | Description | Price | Stock | ExternalID
Phone | Great phone |  | 50 |   ← MISSING PRICE & ID
```

---

## ✅ **CORRECT EXCEL EXAMPLE**

| Name | Description | Price | Stock | ExternalID | ImageURLs |
|------|-------------|-------|-------|------------|-----------|
| Samsung Galaxy S24 | Latest flagship smartphone | 899.99 | 50 | SAMS24-001 | https://images.example.com/s24.jpg |
| iPhone 15 Pro | Apple flagship with titanium | 1199.99 | 30 | APPL15-PRO | https://images.example.com/iphone15.jpg |
| MacBook Air M3 | Lightweight laptop with M3 | 1299.00 | 15 | APPL-MBA-M3 | |

---

## 🎯 **SUMMARY**

**Excel files MUST follow the exact 6-column format:**
1. **Name** (Required)
2. **Description** (Optional) 
3. **Price** (Required - Number)
4. **Stock** (Required - Integer)
5. **ExternalID** (Required - Unique)
6. **ImageURLs** (Optional - Comma-separated)

**Any other format will cause import errors or data corruption!**

Use the provided template or follow this specification exactly for successful product imports. 📊✅
