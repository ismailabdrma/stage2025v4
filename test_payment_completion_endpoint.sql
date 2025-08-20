-- Test Payment Completion Endpoint - Quick Verification
-- This script helps test if the payment completion endpoint is working

-- 1. Check current state of order 52
SELECT 
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
    o.id as order_id,
    o.status,
    o.client_id,
    c.email as client_email,
    c.first_name,
    c.last_name
FROM orders o
LEFT JOIN client c ON o.client_id = c.id
WHERE o.id = 52;

-- 5. Summary - What we need for payment completion
SELECT 
    'ORDER_52_SUMMARY' as info,
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
