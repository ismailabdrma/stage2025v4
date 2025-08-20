-- Script pour corriger TOUS les fournisseurs SOAP existants
-- Ce script doit être exécuté APRÈS la migration V009 et les corrections du code Java

-- 1. Mettre à jour tous les fournisseurs SOAP existants
UPDATE supplier 
SET 
    payment_integration_type = 'SOAP',
    auto_payment_enabled = TRUE
WHERE supplier_type = 'SOAP';

-- 2. Utiliser le wsdl_url existant pour payment_wsdl_url (pour tous les fournisseurs SOAP)
UPDATE supplier 
SET payment_wsdl_url = wsdl_url 
WHERE supplier_type = 'SOAP' 
  AND wsdl_url IS NOT NULL 
  AND wsdl_url != '';

-- 3. Utiliser l'opération de paiement existante pour payment_operation_name_config
UPDATE supplier 
SET payment_operation_name_config = payment_operation_name 
WHERE supplier_type = 'SOAP' 
  AND payment_operation_name IS NOT NULL 
  AND payment_operation_name != '';

-- 4. Définir une action SOAP par défaut pour tous les fournisseurs SOAP
UPDATE supplier 
SET soap_action = 'http://tempuri.org/ProcessPayment' 
WHERE supplier_type = 'SOAP' 
  AND (soap_action IS NULL OR soap_action = '');

-- 5. Vérifier la configuration de tous les fournisseurs SOAP
SELECT 
    'CONFIGURATION TOUS FOURNISSEURS SOAP' as check_type,
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
WHERE supplier_type = 'SOAP'
ORDER BY name;

-- 6. Compter combien de fournisseurs SOAP ont maintenant un système de paiement complet
SELECT 
    'STATISTIQUES SYSTEME PAIEMENT' as check_type,
    COUNT(*) as total_soap_suppliers,
    SUM(CASE 
        WHEN payment_integration_type = 'SOAP' 
             AND payment_wsdl_url IS NOT NULL 
             AND payment_wsdl_url != ''
             AND payment_operation_name_config IS NOT NULL 
             AND payment_operation_name_config != ''
        THEN 1 
        ELSE 0 
    END) as suppliers_with_complete_payment_system,
    SUM(CASE 
        WHEN payment_integration_type = 'SOAP' 
             AND payment_wsdl_url IS NOT NULL 
             AND payment_wsdl_url != ''
             AND payment_operation_name_config IS NOT NULL 
             AND payment_operation_name_config != ''
        THEN 0 
        ELSE 1 
    END) as suppliers_missing_payment_config
FROM supplier 
WHERE supplier_type = 'SOAP'; 