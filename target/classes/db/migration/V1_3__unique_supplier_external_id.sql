-- Ensure no duplicate products per supplier for the same external ID
-- Guard: only add if table and columns exist
ALTER TABLE `products`
ADD CONSTRAINT `uq_products_supplier_external`
UNIQUE (`supplier_id`, `external_product_id`);

