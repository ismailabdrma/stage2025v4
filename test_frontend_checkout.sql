-- Test Frontend Checkout - Simple Test
-- This script ensures the database is ready for frontend testing

-- Check if supplier "sma" is properly configured
SELECT 
    'SUPPLIER CONFIG' as test_type,
    name,
    supplier_type,
    payment_integration_type,
    auto_payment_enabled,
    payment_wsdl_url,
    payment_operation_name_config,
    soap_action
FROM supplier 
WHERE name = 'sma';

-- Check if there are products available for testing
SELECT 
    'PRODUCTS AVAILABLE' as test_type,
    COUNT(*) as product_count,
    COUNT(DISTINCT supplier_id) as supplier_count
FROM products 
WHERE active = true;

-- Check if there are addresses available for testing
SELECT 
    'ADDRESSES AVAILABLE' as test_type,
    COUNT(*) as address_count
FROM address;

-- Expected result for "sma" supplier:
-- - supplier_type: 'SOAP'
-- - payment_integration_type: 'SOAP' (or NULL, will be auto-detected)
-- - payment_wsdl_url: should have a value
-- - payment_operation_name_config: should have a value 