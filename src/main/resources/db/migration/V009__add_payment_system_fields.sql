-- Add payment system fields to supplier table
-- These fields are required for the SmartPaymentRoutingService to detect suppliers with own payment systems

-- Add payment_integration_type field (SOAP, REST_API, or MANUAL)
ALTER TABLE supplier ADD COLUMN payment_integration_type VARCHAR(50) DEFAULT 'MANUAL';

-- Add auto_payment_enabled field (boolean, defaults to true)
ALTER TABLE supplier ADD COLUMN auto_payment_enabled BOOLEAN DEFAULT TRUE;

-- Add payment_wsdl_url field for SOAP suppliers (separate from data import wsdlUrl)
ALTER TABLE supplier ADD COLUMN payment_wsdl_url VARCHAR(500);

-- Add payment_operation_name_config field for SOAP suppliers (separate from data import operation)
ALTER TABLE supplier ADD COLUMN payment_operation_name_config VARCHAR(255);

-- Add soap_action field for SOAP suppliers
ALTER TABLE supplier ADD COLUMN soap_action VARCHAR(255);

-- Add payment_api_url field for API suppliers (separate from data import apiUrl)
ALTER TABLE supplier ADD COLUMN payment_api_url VARCHAR(500);

-- Add payment_api_key field for API suppliers (separate from data import apiKey)
ALTER TABLE supplier ADD COLUMN payment_api_key VARCHAR(255);

-- Add api_secret field for API suppliers
ALTER TABLE supplier ADD COLUMN api_secret VARCHAR(255);

-- Update existing SOAP suppliers to have SOAP payment integration type
UPDATE supplier SET payment_integration_type = 'SOAP' WHERE supplier_type = 'SOAP';

-- Update existing API suppliers to have REST_API payment integration type if they have payment endpoints
UPDATE supplier SET payment_integration_type = 'REST_API' 
WHERE supplier_type = 'API' AND payment_api_endpoint IS NOT NULL AND payment_api_endpoint != '';

-- Set default values for existing suppliers
UPDATE supplier SET auto_payment_enabled = TRUE WHERE auto_payment_enabled IS NULL; 