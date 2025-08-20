-- Fix the "sma" supplier to have its own payment system
-- This script should be run after the V009 migration

-- First, let's see the current state of the sma supplier
SELECT 
    id, 
    name, 
    supplier_type,
    has_own_payment_system,
    payment_integration_type,
    auto_payment_enabled,
    wsdl_url,
    payment_wsdl_url,
    payment_operation_name,
    payment_operation_name_config,
    soap_action
FROM supplier 
WHERE name = 'sma';

-- Update the sma supplier to have SOAP payment integration
UPDATE supplier 
SET 
    payment_integration_type = 'SOAP',
    auto_payment_enabled = TRUE,
    payment_wsdl_url = wsdl_url,  -- Use existing wsdl_url for payment
    payment_operation_name_config = payment_operation_name,  -- Use existing operation for payment
    soap_action = 'http://tempuri.org/ProcessPayment'  -- Set a default SOAP action
WHERE name = 'sma';

-- Verify the update
SELECT 
    id, 
    name, 
    supplier_type,
    has_own_payment_system,
    payment_integration_type,
    auto_payment_enabled,
    wsdl_url,
    payment_wsdl_url,
    payment_operation_name,
    payment_operation_name_config,
    soap_action
FROM supplier 
WHERE name = 'sma';

-- If you want to manually set has_own_payment_system to true (though this should be calculated)
-- UPDATE supplier SET has_own_payment_system = TRUE WHERE name = 'sma'; 