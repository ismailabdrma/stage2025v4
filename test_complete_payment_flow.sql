-- Test Complete Payment Flow - Comprehensive Verification
-- This script verifies that the complete payment flow is working correctly

-- 1. Check current orders and their payment status
SELECT 
    o.id,
    o.status,
    o.total,
    o.payment_id,
    o.created_at,
    o.updated_at,
    p.id as payment_id_from_payments,
    p.payment_status,
    p.amount as payment_amount,
    p.commission_amount,
    p.supplier_amount
FROM orders o
LEFT JOIN payments p ON o.payment_id = p.id
ORDER BY o.id DESC
LIMIT 10;

-- 2. Check if there are any pending orders that should be completed
SELECT 
    o.id,
    o.status,
    o.total,
    o.payment_id,
    o.created_at,
    CASE 
        WHEN o.status = 'PENDING' AND o.payment_id IS NULL THEN 'NEEDS_PAYMENT_COMPLETION'
        WHEN o.status = 'PAID' AND o.payment_id IS NOT NULL THEN 'PAYMENT_COMPLETED'
        WHEN o.status = 'PENDING' AND o.payment_id IS NOT NULL THEN 'PAYMENT_LINKED_BUT_STATUS_WRONG'
        ELSE 'UNKNOWN_STATE'
    END as payment_state
FROM orders o
WHERE o.status IN ('PENDING', 'PAID')
ORDER BY o.id DESC;

-- 3. Check payments table for any orphaned payments
SELECT 
    p.id,
    p.order_id,
    p.supplier_id,
    p.amount,
    p.payment_status,
    p.created_at,
    o.id as order_id_exists,
    o.status as order_status
FROM payments p
LEFT JOIN orders o ON p.order_id = o.id
WHERE o.id IS NULL OR o.payment_id != p.id;

-- 4. Check if there are any orders with payment_id but no corresponding payment
SELECT 
    o.id,
    o.status,
    o.payment_id,
    p.id as payment_exists,
    p.payment_status,
    p.amount
FROM orders o
LEFT JOIN payments p ON o.payment_id = p.id
WHERE o.payment_id IS NOT NULL AND p.id IS NULL;

-- 5. Check supplier information for orders
SELECT 
    o.id,
    o.status,
    o.total,
    p.supplier_id,
    s.name as supplier_name,
    s.contact_email as supplier_email
FROM orders o
LEFT JOIN payments p ON o.payment_id = p.id
LEFT JOIN supplier s ON p.supplier_id = s.id
WHERE o.status IN ('PENDING', 'PAID')
ORDER BY o.id DESC;

-- 6. Check client information for orders
SELECT 
    o.id,
    o.status,
    o.client_id,
    c.email as client_email,
    c.first_name,
    c.last_name
FROM orders o
LEFT JOIN client c ON o.client_id = c.id
WHERE o.status IN ('PENDING', 'PAID')
ORDER BY o.id DESC;

-- 7. Test data for payment completion (use existing order)
-- Replace '1' with an actual order ID that exists in your system
SELECT 
    'TEST_ORDER' as test_type,
    o.id as order_id,
    o.status as current_status,
    o.total as order_total,
    o.client_id,
    c.email as client_email,
    s.id as supplier_id,
    s.name as supplier_name,
    s.contact_email as supplier_email
FROM orders o
LEFT JOIN client c ON o.client_id = c.id
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
LEFT JOIN supplier s ON p.supplier_id = s.id
WHERE o.id = 1  -- Change this to an existing order ID
LIMIT 1;

-- 8. Check database constraints on payment_id
SELECT 
    TABLE_NAME,
    COLUMN_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE 
WHERE TABLE_NAME = 'orders' AND COLUMN_NAME = 'payment_id';

-- 9. Check if there are any foreign key constraints preventing payment_id from being set
SELECT 
    CONSTRAINT_NAME,
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM information_schema.REFERENTIAL_CONSTRAINTS rc
JOIN information_schema.KEY_COLUMN_USAGE kcu ON rc.CONSTRAINT_NAME = kcu.CONSTRAINT_NAME
WHERE kcu.TABLE_NAME = 'orders' AND kcu.COLUMN_NAME = 'payment_id';

-- 10. Summary of payment completion status
SELECT 
    COUNT(*) as total_orders,
    SUM(CASE WHEN status = 'PENDING' THEN 1 ELSE 0 END) as pending_orders,
    SUM(CASE WHEN status = 'PAID' THEN 1 ELSE 0 END) as paid_orders,
    SUM(CASE WHEN payment_id IS NULL THEN 1 ELSE 0 END) as orders_without_payment,
    SUM(CASE WHEN payment_id IS NOT NULL THEN 1 ELSE 0 END) as orders_with_payment
FROM orders;
