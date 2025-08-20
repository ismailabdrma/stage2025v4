-- Test Payment Routing - Simple Test
-- This script tests if the payment routing logic works correctly

-- Check current supplier configuration
SELECT 
    name,
    supplier_type,
    payment_integration_type,
    auto_payment_enabled,
    payment_wsdl_url,
    payment_operation_name_config,
    soap_action
FROM supplier 
WHERE name = 'sma';

-- Test payment system detection logic
SELECT 
    name,
    CASE 
        WHEN supplier_type = 'SOAP' 
             AND payment_wsdl_url IS NOT NULL 
             AND payment_wsdl_url != ''
             AND payment_operation_name_config IS NOT NULL 
             AND payment_operation_name_config != ''
             AND auto_payment_enabled = TRUE
        THEN 'DIRECT_TO_SUPPLIER'
        ELSE 'PLATFORM_PAYMENT'
    END as expected_payment_flow
FROM supplier 
WHERE name = 'sma'; 