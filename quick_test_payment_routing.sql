-- Quick Test Payment Routing
-- Execute this to verify the payment routing is working correctly

-- 1. Check current SMA supplier configuration
SELECT 
    'SMA SUPPLIER CONFIG' as test_name,
    name,
    supplier_type,
    payment_integration_type,
    auto_payment_enabled,
    payment_wsdl_url,
    payment_operation_name_config,
    soap_action
FROM supplier 
WHERE name = 'sma';

-- 2. Test payment system detection logic
SELECT 
    'PAYMENT SYSTEM DETECTION' as test_name,
    name,
    CASE 
        WHEN payment_integration_type = 'SOAP' 
             AND payment_wsdl_url IS NOT NULL 
             AND payment_wsdl_url != ''
             AND payment_operation_name_config IS NOT NULL 
             AND payment_operation_name_config != ''
             AND auto_payment_enabled = TRUE
        THEN 'HAS_OWN_PAYMENT_SYSTEM'
        ELSE 'NO_OWN_PAYMENT_SYSTEM'
    END as payment_system_status
FROM supplier 
WHERE name = 'sma';

-- 3. Check all SOAP suppliers
SELECT 
    'ALL SOAP SUPPLIERS' as test_name,
    name,
    payment_integration_type,
    auto_payment_enabled,
    CASE 
        WHEN payment_integration_type = 'SOAP' 
             AND payment_wsdl_url IS NOT NULL 
             AND payment_wsdl_url != ''
             AND payment_operation_name_config IS NOT NULL 
             AND payment_operation_name_config != ''
             AND auto_payment_enabled = TRUE
        THEN 'DIRECT_PAYMENT'
        ELSE 'PLATFORM_PAYMENT'
    END as expected_payment_flow
FROM supplier 
WHERE supplier_type = 'SOAP';

-- 4. Summary
SELECT 
    'SUMMARY' as test_name,
    COUNT(*) as total_suppliers,
    COUNT(CASE WHEN supplier_type = 'SOAP' THEN 1 END) as soap_suppliers,
    COUNT(CASE WHEN supplier_type = 'API' THEN 1 END) as api_suppliers,
 