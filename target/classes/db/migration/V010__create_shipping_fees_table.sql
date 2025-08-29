-- Create shipping_fees table for shipping fee management
-- This migration preserves existing data and adds missing columns

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS shipping_fees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    country_code VARCHAR(3) NOT NULL,
    country_name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    city VARCHAR(100),
    postal_code_from VARCHAR(20),
    postal_code_to VARCHAR(20),
    base_fee DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'EUR',
    min_order_amount DECIMAL(10,2),
    free_shipping_threshold DECIMAL(10,2),
    delivery_time_days INT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    priority INT NOT NULL DEFAULT 100,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add missing columns if they don't exist (preserve existing data)
-- Check if base_fee column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'base_fee') > 0,
    'SELECT "base_fee column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN base_fee DECIMAL(10,2) NOT NULL DEFAULT 0.00'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if currency column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'currency') > 0,
    'SELECT "currency column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN currency VARCHAR(3) NOT NULL DEFAULT "EUR"'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if min_order_amount column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'min_order_amount') > 0,
    'SELECT "min_order_amount column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN min_order_amount DECIMAL(10,2)'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if free_shipping_threshold column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'free_shipping_threshold') > 0,
    'SELECT "free_shipping_threshold column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN free_shipping_threshold DECIMAL(10,2)'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if delivery_time_days column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'delivery_time_days') > 0,
    'SELECT "delivery_time_days column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN delivery_time_days INT'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if is_active column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'is_active') > 0,
    'SELECT "is_active column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN is_active BOOLEAN NOT NULL DEFAULT TRUE'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if priority column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'priority') > 0,
    'SELECT "priority column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN priority INT NOT NULL DEFAULT 100'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if notes column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'notes') > 0,
    'SELECT "notes column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN notes TEXT'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if created_at column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'created_at') > 0,
    'SELECT "created_at column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Check if updated_at column exists, if not add it
SET @sql = (SELECT IF(
    (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
     WHERE TABLE_SCHEMA = DATABASE() 
     AND TABLE_NAME = 'shipping_fees' 
     AND COLUMN_NAME = 'updated_at') > 0,
    'SELECT "updated_at column already exists" as message',
    'ALTER TABLE shipping_fees ADD COLUMN updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
));
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_shipping_fees_country_code ON shipping_fees(country_code);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_city ON shipping_fees(city);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_postal_code ON shipping_fees(postal_code_from, postal_code_to);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_active ON shipping_fees(is_active);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_priority ON shipping_fees(priority);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_country_city ON shipping_fees(country_code, city);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_country_postal ON shipping_fees(country_code, postal_code_from, postal_code_to);

-- Insert default shipping fees only if the table is empty
INSERT IGNORE INTO shipping_fees (country_code, country_name, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES
('MA', 'Maroc', 25.00, 'MAD', 3, 1, TRUE, 'Livraison standard au Maroc'),
('FR', 'France', 5.99, 'EUR', 2, 1, TRUE, 'Livraison standard en France'),
('BE', 'Belgique', 7.99, 'EUR', 3, 1, TRUE, 'Livraison standard en Belgique'),
('DE', 'Allemagne', 8.99, 'EUR', 3, 1, TRUE, 'Livraison standard en Allemagne'),
('IT', 'Italie', 9.99, 'EUR', 4, 1, TRUE, 'Livraison standard en Italie'),
('ES', 'Espagne', 6.99, 'EUR', 3, 1, TRUE, 'Livraison standard en Espagne'),
('NL', 'Pays-Bas', 7.99, 'EUR', 2, 1, TRUE, 'Livraison standard aux Pays-Bas'),
('CH', 'Suisse', 12.99, 'CHF', 4, 1, TRUE, 'Livraison standard en Suisse'),
('CA', 'Canada', 15.99, 'CAD', 7, 1, TRUE, 'Livraison standard au Canada'),
('US', 'États-Unis', 19.99, 'USD', 8, 1, TRUE, 'Livraison standard aux États-Unis');
