-- PRODUCTION PAYMENT COMPLETION TEST - ORDER 52
-- This script verifies that the payment completion fix works correctly

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

-- 5. Verify database constraints are properly set
SELECT 
    'CONSTRAINTS_VERIFICATION' as info,
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- 6. Test manual payment creation (if needed for testing)
-- This will help verify if the database constraints are working
SELECT 
    'MANUAL_TEST_READY' as info,
    'If you need to test manually, run this command:' as instruction,
    'INSERT INTO payments (order_id, supplier_id, amount, currency, payment_status, payment_method, created_at, updated_at) VALUES (52, 1, 600.00, "EUR", "COMPLETED", "MANUAL_TEST", NOW(), NOW());' as test_command;

-- 7. Check if there are any database-level issues
SELECT 
    'DATABASE_HEALTH_CHECK' as info,
    COUNT(*) as total_orders,
    SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as pending_orders,
    SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) as paid_orders,
    SUM(CASE WHEN payment_id IS NULL THEN 1 ELSE 0 END) as orders_without_payment,
    SUM(CASE WHEN payment_id IS NOT NULL THEN 1 ELSE 0 END) as orders_with_payment
FROM orders;

-- 8. Summary - What should happen after payment completion
SELECT 
    'EXPECTED_RESULT' as info,
    'After successful payment completion:' as description,
    '1. Order 52 status should change from PENDING to PAID' as step1,
    '2. Order 52 payment_id should be set to the payment ID' as step2,
    '3. A new payment record should exist in payments table' as step3,
    '4. The payment should be linked to order 52' as step4;
