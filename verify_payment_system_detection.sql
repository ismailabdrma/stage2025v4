-- Script de vérification du système de paiement du fournisseur "sma"
-- Exécutez ce script APRÈS avoir appliqué le fix pour vérifier que tout fonctionne

-- 1. Vérifier la configuration finale
SELECT 
    'CONFIGURATION FINALE' as check_type,
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

-- 2. Vérifier que tous les champs requis sont présents
SELECT 
    'VERIFICATION DES CHAMPS REQUIS' as check_type,
    CASE 
        WHEN payment_integration_type = 'SOAP' THEN '✓ SOAP' 
        ELSE '✗ ' || COALESCE(payment_integration_type, 'NULL') 
    END as integration_type_check,
    CASE 
        WHEN payment_wsdl_url IS NOT NULL AND payment_wsdl_url != '' THEN '✓ Présent' 
        ELSE '✗ Manquant' 
    END as wsdl_check,
    CASE 
        WHEN payment_operation_name_config IS NOT NULL AND payment_operation_name_config != '' THEN '✓ Présent' 
        ELSE '✗ Manquant' 
    END as operation_check,
    CASE 
        WHEN auto_payment_enabled = 1 THEN '✓ Activé' 
        ELSE '✗ Désactivé' 
    END as auto_payment_check;

-- 3. Simulation de la logique Java (équivalent à isHasOwnPaymentSystem())
SELECT 
    'SIMULATION DE LA LOGIQUE JAVA' as check_type,
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
    END as final_result;

-- 4. Vérifier que le fournisseur peut maintenant être routé vers DIRECT_TO_SUPPLIER
SELECT 
    'ROUTAGE DE PAIEMENT' as check_type,
    CASE 
        WHEN has_own_payment_system = 1 
             AND auto_payment_enabled = 1
        THEN 'DIRECT_TO_SUPPLIER - Le client paiera directement le fournisseur'
        ELSE 'PLATFORM_PAYMENT - Le client paiera la plateforme'
    END as payment_routing_result; 