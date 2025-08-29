-- Insert Shipping Fees for Stage2025
-- This script will insert default shipping fees for various countries

USE stage-db;

-- First, ensure the shipping_fees table exists with proper structure
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

-- Clear existing data to avoid duplicates
DELETE FROM shipping_fees;

-- Insert default shipping fees
INSERT INTO shipping_fees (country_code, country_name, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES
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

-- Insert specific city-based shipping fees for Morocco
INSERT INTO shipping_fees (country_code, country_name, city, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES
('MA', 'Maroc', 'Casablanca', 20.00, 'MAD', 1, 1, TRUE, 'Livraison express à Casablanca'),
('MA', 'Maroc', 'Rabat', 22.00, 'MAD', 1, 1, TRUE, 'Livraison express à Rabat'),
('MA', 'Maroc', 'Marrakech', 23.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Marrakech'),
('MA', 'Maroc', 'Fès', 24.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Fès'),
('MA', 'Maroc', 'Tanger', 21.00, 'MAD', 2, 1, TRUE, 'Livraison standard à Tanger');

-- Insert postal code based shipping fees for major cities
INSERT INTO shipping_fees (country_code, country_name, city, postal_code_from, postal_code_to, base_fee, currency, delivery_time_days, priority, is_active, notes) VALUES
('MA', 'Maroc', 'Casablanca', '20000', '20999', 18.00, 'MAD', 1, 1, TRUE, 'Livraison express Casablanca centre'),
('MA', 'Maroc', 'Casablanca', '21000', '21999', 20.00, 'MAD', 1, 1, TRUE, 'Livraison express Casablanca périphérie'),
('FR', 'France', 'Paris', '75001', '75020', 3.99, 'EUR', 1, 1, TRUE, 'Livraison express Paris'),
('FR', 'France', 'Paris', '75021', '75020', 4.99, 'EUR', 2, 1, TRUE, 'Livraison standard Paris');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_shipping_fees_country_code ON shipping_fees(country_code);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_city ON shipping_fees(city);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_postal_code ON shipping_fees(postal_code_from, postal_code_to);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_active ON shipping_fees(is_active);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_priority ON shipping_fees(priority);
CREATE INDEX IF NOT EXISTS idx_shipping_fees_country_city ON shipping_fees(country_code, city);

-- Verify the data
SELECT 'Shipping fees inserted successfully!' as status;
SELECT COUNT(*) as total_shipping_fees FROM shipping_fees;
SELECT country_code, country_name, city, base_fee, currency, delivery_time_days FROM shipping_fees ORDER BY country_code, city;

