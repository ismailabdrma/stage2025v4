-- Comprehensive supplier-product relationship diagnosis
-- This will help identify the exact issue with product fetching

-- 1. List all suppliers with their basic info
SELECT 
    'SUPPLIERS OVERVIEW' as section,
    s.id,
    s.name,
    s.supplier_type,
    s.active,
    COUNT(p.id) as total_products,
    COUNT(CASE WHEN p.active = 1 THEN 1 END) as active_products,
    COUNT(CASE WHEN p.active = 0 THEN 1 END) as inactive_products
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id
GROUP BY s.id, s.name, s.supplier_type, s.active
ORDER BY s.name;

-- 2. Specifically check for 'ismail' supplier (case insensitive)
SELECT 
    'ISMAIL SUPPLIER DETAILS' as section,
    s.id,
    s.name,
    s.supplier_type,
    s.active,
    s.created,
    s.last_import
FROM supplier s
WHERE LOWER(s.name) LIKE '%ismail%'
ORDER BY s.id;

-- 3. Check all products for ismail supplier(s)
SELECT 
    'ISMAIL PRODUCTS' as section,
    p.id as product_id,
    p.name as product_name,
    p.external_product_id,
    p.active as product_active,
    p.synced_stock,
    p.last_fetched,
    p.supplier_id,
    s.name as supplier_name,
    s.supplier_type
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE LOWER(s.name) LIKE '%ismail%'
ORDER BY p.id;

-- 4. Check for 'Supplier SOAP v2' products
SELECT 
    'SOAP V2 PRODUCTS' as section,
    p.id as product_id,
    p.name as product_name,
    p.external_product_id,
    p.active as product_active,
    p.synced_stock,
    p.last_fetched,
    p.supplier_id,
    s.name as supplier_name,
    s.supplier_type
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE s.name = 'Supplier SOAP v2'
ORDER BY p.id;

-- 5. Check for potential name conflicts or similar names
SELECT 
    'POTENTIAL NAME CONFLICTS' as section,
    s.id,
    s.name,
    s.supplier_type,
    s.active,
    LENGTH(s.name) as name_length,
    COUNT(p.id) as product_count
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id
WHERE s.name LIKE '%ismail%' 
   OR s.name LIKE '%SOAP%'
   OR s.name LIKE '%v2%'
GROUP BY s.id, s.name, s.supplier_type, s.active
ORDER BY s.name;

-- 6. Check external_product_id patterns to identify which supplier they belong to
SELECT 
    'EXTERNAL ID PATTERNS' as section,
    s.name as supplier_name,
    s.id as supplier_id,
    p.external_product_id,
    CASE 
        WHEN p.external_product_id LIKE CONCAT(s.id, '_%') THEN 'CORRECT_FORMAT'
        WHEN p.external_product_id IS NULL THEN 'NULL_EXTERNAL_ID'
        ELSE 'UNEXPECTED_FORMAT'
    END as id_format_check
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE s.name LIKE '%ismail%' OR s.name LIKE '%SOAP%'
ORDER BY s.name, p.external_product_id;

-- 7. Check if there are any orphaned products (should be none after our fixes)
SELECT 
    'ORPHANED PRODUCTS' as section,
    p.id,
    p.name,
    p.external_product_id,
    p.supplier_id,
    'NULL supplier_id - ORPHANED' as issue
FROM products p
WHERE p.supplier_id IS NULL;

-- 8. Test the exact query that StockSyncService.findBySupplierId() uses
SELECT 
    'STOCK SYNC TEST QUERY' as section,
    p.id,
    p.name,
    p.external_product_id,
    p.active,
    p.synced_stock,
    s.name as supplier_name,
    s.id as supplier_id
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE p.supplier_id IN (
    SELECT id FROM supplier WHERE LOWER(name) LIKE '%ismail%'
);

-- 9. Check import logs for recent activity
SELECT 
    'RECENT IMPORT ACTIVITY' as section,
    il.id as import_id,
    s.name as supplier_name,
    il.import_type,
    il.status,
    il.total_fetched,
    il.total_saved,
    il.created_at,
    il.error_message
FROM import_log il
JOIN supplier s ON il.supplier_id = s.id
WHERE s.name LIKE '%ismail%' OR s.name LIKE '%SOAP%'
ORDER BY il.created_at DESC
LIMIT 10;

-- 10. Final summary with recommendations
SELECT 
    'SUMMARY & RECOMMENDATIONS' as section,
    CONCAT('Total suppliers: ', COUNT(DISTINCT s.id)) as stat1,
    CONCAT('Total products: ', COUNT(p.id)) as stat2,
    CONCAT('Active suppliers: ', COUNT(DISTINCT CASE WHEN s.active = 1 THEN s.id END)) as stat3,
    CONCAT('Active products: ', COUNT(CASE WHEN p.active = 1 THEN 1 END)) as stat4
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id;

-- This will help identify the exact issue with product fetching

-- 1. List all suppliers with their basic info
SELECT 
    'SUPPLIERS OVERVIEW' as section,
    s.id,
    s.name,
    s.supplier_type,
    s.active,
    COUNT(p.id) as total_products,
    COUNT(CASE WHEN p.active = 1 THEN 1 END) as active_products,
    COUNT(CASE WHEN p.active = 0 THEN 1 END) as inactive_products
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id
GROUP BY s.id, s.name, s.supplier_type, s.active
ORDER BY s.name;

-- 2. Specifically check for 'ismail' supplier (case insensitive)
SELECT 
    'ISMAIL SUPPLIER DETAILS' as section,
    s.id,
    s.name,
    s.supplier_type,
    s.active,
    s.created,
    s.last_import
FROM supplier s
WHERE LOWER(s.name) LIKE '%ismail%'
ORDER BY s.id;

-- 3. Check all products for ismail supplier(s)
SELECT 
    'ISMAIL PRODUCTS' as section,
    p.id as product_id,
    p.name as product_name,
    p.external_product_id,
    p.active as product_active,
    p.synced_stock,
    p.last_fetched,
    p.supplier_id,
    s.name as supplier_name,
    s.supplier_type
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE LOWER(s.name) LIKE '%ismail%'
ORDER BY p.id;

-- 4. Check for 'Supplier SOAP v2' products
SELECT 
    'SOAP V2 PRODUCTS' as section,
    p.id as product_id,
    p.name as product_name,
    p.external_product_id,
    p.active as product_active,
    p.synced_stock,
    p.last_fetched,
    p.supplier_id,
    s.name as supplier_name,
    s.supplier_type
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE s.name = 'Supplier SOAP v2'
ORDER BY p.id;

-- 5. Check for potential name conflicts or similar names
SELECT 
    'POTENTIAL NAME CONFLICTS' as section,
    s.id,
    s.name,
    s.supplier_type,
    s.active,
    LENGTH(s.name) as name_length,
    COUNT(p.id) as product_count
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id
WHERE s.name LIKE '%ismail%' 
   OR s.name LIKE '%SOAP%'
   OR s.name LIKE '%v2%'
GROUP BY s.id, s.name, s.supplier_type, s.active
ORDER BY s.name;

-- 6. Check external_product_id patterns to identify which supplier they belong to
SELECT 
    'EXTERNAL ID PATTERNS' as section,
    s.name as supplier_name,
    s.id as supplier_id,
    p.external_product_id,
    CASE 
        WHEN p.external_product_id LIKE CONCAT(s.id, '_%') THEN 'CORRECT_FORMAT'
        WHEN p.external_product_id IS NULL THEN 'NULL_EXTERNAL_ID'
        ELSE 'UNEXPECTED_FORMAT'
    END as id_format_check
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE s.name LIKE '%ismail%' OR s.name LIKE '%SOAP%'
ORDER BY s.name, p.external_product_id;

-- 7. Check if there are any orphaned products (should be none after our fixes)
SELECT 
    'ORPHANED PRODUCTS' as section,
    p.id,
    p.name,
    p.external_product_id,
    p.supplier_id,
    'NULL supplier_id - ORPHANED' as issue
FROM products p
WHERE p.supplier_id IS NULL;

-- 8. Test the exact query that StockSyncService.findBySupplierId() uses
SELECT 
    'STOCK SYNC TEST QUERY' as section,
    p.id,
    p.name,
    p.external_product_id,
    p.active,
    p.synced_stock,
    s.name as supplier_name,
    s.id as supplier_id
FROM products p
JOIN supplier s ON p.supplier_id = s.id
WHERE p.supplier_id IN (
    SELECT id FROM supplier WHERE LOWER(name) LIKE '%ismail%'
);

-- 9. Check import logs for recent activity
SELECT 
    'RECENT IMPORT ACTIVITY' as section,
    il.id as import_id,
    s.name as supplier_name,
    il.import_type,
    il.status,
    il.total_fetched,
    il.total_saved,
    il.created_at,
    il.error_message
FROM import_log il
JOIN supplier s ON il.supplier_id = s.id
WHERE s.name LIKE '%ismail%' OR s.name LIKE '%SOAP%'
ORDER BY il.created_at DESC
LIMIT 10;

-- 10. Final summary with recommendations
SELECT 
    'SUMMARY & RECOMMENDATIONS' as section,
    CONCAT('Total suppliers: ', COUNT(DISTINCT s.id)) as stat1,
    CONCAT('Total products: ', COUNT(p.id)) as stat2,
    CONCAT('Active suppliers: ', COUNT(DISTINCT CASE WHEN s.active = 1 THEN s.id END)) as stat3,
    CONCAT('Active products: ', COUNT(CASE WHEN p.active = 1 THEN 1 END)) as stat4
FROM supplier s
LEFT JOIN products p ON s.id = p.supplier_id;









