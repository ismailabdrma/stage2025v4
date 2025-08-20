-- Fix order.payment_id linking for existing paid orders
UPDATE orders o 
JOIN (
    SELECT p.order_id, MAX(p.id) as payment_id 
    FROM payments p 
    WHERE p.payment_status = 'PAID' 
    GROUP BY p.order_id
) latest_payment ON latest_payment.order_id = o.id 
SET o.payment_id = latest_payment.payment_id 
WHERE o.payment_id IS NULL AND o.status = 'PAID';

-- Also fix for order 41 specifically if needed
UPDATE orders o 
JOIN payments p ON p.order_id = o.id 
SET o.payment_id = p.id 
WHERE o.id = 41 AND o.payment_id IS NULL AND p.payment_status = 'PAID';

-- Verify the payment connections
SELECT 
    o.id as order_id, 
    o.status as order_status, 
    o.payment_id, 
    p.id as payment_id_actual, 
    p.payment_status, 
    p.external_payment_id 
FROM orders o 
LEFT JOIN payments p ON p.order_id = o.id 
WHERE o.id >= 35 
ORDER BY o.id DESC 
LIMIT 10;
