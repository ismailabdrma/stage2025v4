-- Debug Session Mapping Table
-- Run this to see what session mappings exist

-- Check if the table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%session%';

-- Check the structure of the session mapping table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns 
WHERE table_name = 'order_session_mapping'
ORDER BY ordinal_position;

-- Check all active session mappings
SELECT * FROM order_session_mapping 
WHERE status = 'PENDING' 
ORDER BY created_at DESC 
LIMIT 10;

-- Check for any session mappings with the Stripe session ID
SELECT * FROM order_session_mapping 
WHERE session_id LIKE '%cs_test%' 
OR stripe_session_id LIKE '%cs_test%'
ORDER BY created_at DESC;

-- Check recent orders to see if any have been created
SELECT id, order_number, status, total, created_at 
FROM orders 
ORDER BY created_at DESC 
LIMIT 10;

-- Check if there are any SOAP suppliers
SELECT id, name, supplier_type, has_own_payment_system 
FROM suppliers 
WHERE supplier_type = 'SOAP' 
OR has_own_payment_system = true;
