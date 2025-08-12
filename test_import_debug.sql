-- Quick test to see current state and create test supplier if needed
USE stage-db;

-- Check current suppliers
SELECT 'CURRENT SUPPLIERS:' as info;
SELECT id, name, supplier_type, active, file_path FROM supplier;

-- Check current products
SELECT 'CURRENT PRODUCTS:' as info;
SELECT COUNT(*) as total_products FROM products;

-- Check import logs
SELECT 'RECENT IMPORT LOGS:' as info;
SELECT s.name, il.status, il.imported_count, il.error_count, il.error_message, il.import_date 
FROM import_log il 
JOIN supplier s ON il.supplier_id = s.id 
ORDER BY il.import_date DESC 
LIMIT 5;

-- Create a test Excel supplier if none exists
INSERT IGNORE INTO supplier (name, supplier_type, active, file_path, file_name, created) 
VALUES ('TestExcel', 'EXCEL', 1, './test-products.csv', 'test-products.csv', NOW());

-- Show the test supplier
SELECT 'TEST SUPPLIER:' as info;
SELECT id, name, supplier_type, active, file_path FROM supplier WHERE name = 'TestExcel';

USE stage-db;

-- Check current suppliers
SELECT 'CURRENT SUPPLIERS:' as info;
SELECT id, name, supplier_type, active, file_path FROM supplier;

-- Check current products
SELECT 'CURRENT PRODUCTS:' as info;
SELECT COUNT(*) as total_products FROM products;

-- Check import logs
SELECT 'RECENT IMPORT LOGS:' as info;
SELECT s.name, il.status, il.imported_count, il.error_count, il.error_message, il.import_date 
FROM import_log il 
JOIN supplier s ON il.supplier_id = s.id 
ORDER BY il.import_date DESC 
LIMIT 5;

-- Create a test Excel supplier if none exists
INSERT IGNORE INTO supplier (name, supplier_type, active, file_path, file_name, created) 
VALUES ('TestExcel', 'EXCEL', 1, './test-products.csv', 'test-products.csv', NOW());

-- Show the test supplier
SELECT 'TEST SUPPLIER:' as info;
SELECT id, name, supplier_type, active, file_path FROM supplier WHERE name = 'TestExcel';









