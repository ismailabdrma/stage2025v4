-- Check all orders and their status
SELECT 
    id, 
    status, 
    total, 
    created_at,
    payment_id,
    session_id
FROM orders 
ORDER BY id DESC 
LIMIT 10;

-- Check the last few orders
SELECT 
    id, 
    status, 
    total, 
    created_at,
    payment_id,
    session_id
FROM orders 
WHERE id >= 20
ORDER BY id DESC;

-- Check all orders with status
SELECT 
    status, 
    COUNT(*) as count
FROM orders 
GROUP BY status;

-- Check if there are any PENDING orders
SELECT 
    id, 
    status, 
    total, 
    created_at
FROM orders 
WHERE status = 'PENDING'
ORDER BY id DESC;
