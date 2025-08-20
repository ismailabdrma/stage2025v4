-- Fix immédiat pour le fournisseur "sma" - Configuration du système de paiement
-- Basé sur l'état actuel de la base de données

-- 1. Mettre à jour payment_integration_type pour SOAP
UPDATE supplier 
SET payment_integration_type = 'SOAP' 
WHERE name = 'sma' AND supplier_type = 'SOAP';

-- 2. Utiliser le wsdl_url existant pour payment_wsdl_url
UPDATE supplier 
SET payment_wsdl_url = wsdl_url 
WHERE name = 'sma' AND wsdl_url IS NOT NULL;

-- 3. Utiliser l'opération de paiement existante pour payment_operation_name_config
UPDATE supplier 
SET payment_operation_name_config = payment_operation_name 
WHERE name = 'sma' AND payment_operation_name IS NOT NULL;

-- 4. Définir une action SOAP par défaut si elle n'existe pas
UPDATE supplier 
SET soap_action = 'http://tempuri.org/ProcessPayment' 
WHERE name = 'sma' AND (soap_action IS NULL OR soap_action = '');

-- 5. Vérifier la configuration finale
SELECT 
    id, 
    name, 
    supplier_type,
    has_own_payment_system,
    payment_integration_type,
    auto_payment_enabled,
    wsdl_url,
    payment_wsdl_url,
    payment_operation_name,
    payment_operation_name_config,
    soap_action
FROM supplier 
WHERE name = 'sma';

-- 6. Tester la logique de détection (simulation)
-- Le fournisseur devrait maintenant être détecté comme ayant son propre système de paiement
-- car :
-- - payment_integration_type = 'SOAP' ✓
-- - payment_wsdl_url = wsdl_url existant ✓  
-- - payment_operation_name_config = payment_operation_name existant ✓ 