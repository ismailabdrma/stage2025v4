-- IMMEDIATE PAYMENT COMPLETION TEST - ORDER 52
-- This script tests the payment completion endpoint immediately

-- 1. Check current state of order 52
SELECT 
    'CURRENT_STATE' as info,
    id,
    status,
    payment_id,
    total,
    created_at,
    updated_at
FROM orders 
WHERE id = 52;

-- 2. Check if there are any existing payments for order 52
SELECT 
    'EXISTING_PAYMENTS' as info,
    id,
    order_id,
    supplier_id,
    amount,
    payment_status,
    created_at
FROM payments 
WHERE order_id = 52;

-- 3. Check supplier information for order 52
SELECT 
    'SUPPLIER_INFO' as info,
    o.id as order_id,
    o.status,
    o.total,
    s.id as supplier_id,
    s.name as supplier_name,
    s.contact_email
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
LEFT JOIN supplier s ON p.supplier_id = s.id
WHERE o.id = 52;

-- 4. Check client information for order 52
SELECT 
    'CLIENT_INFO' as info,
    o.id as order_id,
    o.status,
    o.client_id,
    c.email as client_email,
    c.first_name,
    c.last_name
FROM orders o
LEFT JOIN client c ON o.client_id = c.id
WHERE o.id = 52;

-- 5. Test manual payment completion (if needed)
-- This will help verify if the backend is working
-- Run this only if the API test fails

-- 6. Check if there are any database constraints preventing payment_id from being set
SELECT 
    'CONSTRAINTS' as info,
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- 7. Summary - What we need for payment completion
SELECT 
    'SUMMARY' as info,
    o.id as order_id,
    o.status as current_status,
    o.total as order_total,
    o.payment_id,
    c.email as client_email,
    s.id as supplier_id,
    s.name as supplier_name,
    s.contact_email as supplier_email,
    CASE 
        WHEN o.status = 'PENDING' AND o.payment_id IS NULL THEN 'READY_FOR_PAYMENT_COMPLETION'
        WHEN o.status = 'PAID' AND o.payment_id IS NOT NULL THEN 'PAYMENT_ALREADY_COMPLETED'
        ELSE 'UNKNOWN_STATE'
    END as payment_state
FROM orders o
LEFT JOIN client c ON o.client_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
LEFT JOIN supplier s ON p.supplier_id = s.id
WHERE o.id = 52;
