-- Check if supplier 1 exists
SELECT 
    id, 
    name, 
    type, 
    active,
    created_at
FROM supplier 
WHERE id = 1;

-- Check all suppliers
SELECT 
    id, 
    name, 
    type, 
    active,
    created_at
FROM supplier 
ORDER BY id;

-- Check supplier count
SELECT COUNT(*) as total_suppliers FROM supplier;

-- Check if there are any SOAP suppliers
SELECT 
    id, 
    name, 
    type, 
    active
FROM supplier 
WHERE type = 'SOAP';




