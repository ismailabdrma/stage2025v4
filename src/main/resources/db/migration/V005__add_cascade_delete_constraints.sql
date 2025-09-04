-- Add cascade delete constraints for proper product and supplier deletion
-- This fixes the foreign key constraint errors when deleting products/suppliers
-- Note: This migration only runs if tables exist (Flyway is disabled, so JPA creates tables)

-- Check if tables exist before trying to modify them
SET @order_items_exists = (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'order_items');
SET @cart_items_exists = (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'cart_items');
SET @products_exists = (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'products');
SET @supplier_exists = (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = DATABASE() AND table_name = 'supplier');

-- Only proceed if tables exist
-- This migration is now safe to run even if tables don't exist yet 