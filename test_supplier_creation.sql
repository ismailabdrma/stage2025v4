-- Script de test pour vérifier que la création de fournisseurs fonctionne correctement
-- Exécutez ce script APRÈS avoir appliqué les corrections du code Java

-- 1. Créer un nouveau fournisseur SOAP de test via l'API
-- (Ceci devrait maintenant sauvegarder tous les champs de configuration du système de paiement)

-- 2. Vérifier que tous les champs sont correctement sauvegardés
SELECT 
    'VERIFICATION CREATION FOURNISSEUR' as check_type,
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
WHERE name LIKE '%test%' OR name LIKE '%TEST%'
ORDER BY created DESC
LIMIT 5;

-- 3. Vérifier que le fournisseur "sma" a maintenant tous les champs requis
SELECT 
    'VERIFICATION FOURNISSEUR SMA' as check_type,
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

-- 4. Tester la logique de détection du système de paiement
SELECT 
    'TEST DETECTION SYSTEME PAIEMENT' as check_type,
    name,
    CASE 
        WHEN payment_integration_type = 'SOAP' THEN 'VRAI' 
        ELSE 'FAUX' 
    END as condition1_integration_type,
    CASE 
        WHEN payment_wsdl_url IS NOT NULL AND payment_wsdl_url != '' THEN 'VRAI' 
        ELSE 'FAUX' 
    END as condition2_wsdl_present,
    CASE 
        WHEN payment_operation_name_config IS NOT NULL AND payment_operation_name_config != '' THEN 'VRAI' 
        ELSE 'FAUX' 
    END as condition3_operation_present,
    CASE 
        WHEN payment_integration_type = 'SOAP' 
             AND payment_wsdl_url IS NOT NULL AND payment_wsdl_url != ''
             AND payment_operation_name_config IS NOT NULL AND payment_operation_name_config != ''
        THEN 'VRAI - Système de paiement détecté!'
        ELSE 'FAUX - Système de paiement non détecté'
    END as final_result
FROM supplier 
WHERE supplier_type = 'SOAP'
ORDER BY name; 