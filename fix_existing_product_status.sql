-- Fix existing products that have active=1 but status='PENDING'
-- This script will update products that are active but still have PENDING status

-- First, let's see what we have
SELECT 
    id, 
    name, 
    active, 
    status, 
    created_at,
    updated_at
FROM products 
WHERE active = 1 AND status = 'PENDING'
ORDER BY updated_at DESC;

-- Update products that are active but still have PENDING status to APPROVED
UPDATE products 
SET status = 'APPROVED', updated_at = NOW()
WHERE active = 1 AND status = 'PENDING';

-- Verify the update worked
SELECT 
    id, 
    name, 
    active, 
    status, 
    updated_at
FROM products 
WHERE active = 1 
ORDER BY updated_at DESC
LIMIT 10;

-- Show summary of all statuses
SELECT 
    status,
    COUNT(*) as count,
    SUM(CASE WHEN active = 1 THEN 1 ELSE 0 END) as active_count,
    SUM(CASE WHEN active = 0 THEN 1 ELSE 0 END) as inactive_count
FROM products 
GROUP BY status 
ORDER BY status;

