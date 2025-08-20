# Test Guide: Admin Interface - Supplier Creation with Payment System Configuration

## 🎯 Objectif
Vérifier que l'interface d'administration pour la création/modification des fournisseurs inclut maintenant tous les champs de configuration du système de paiement.

## 📋 Étapes de Test

### **1. Test de Création d'un Nouveau Fournisseur SOAP**

#### **Étape 1 : Accéder à l'Interface d'Administration**
1. Aller à `/admin/suppliers`
2. Cliquer sur "Add New Supplier"
3. Vérifier que le dialogue s'ouvre avec les onglets suivants :
   - Basic Information
   - Configuration
   - Payment
   - File Upload (si applicable)

#### **Étape 2 : Remplir les Informations de Base**
1. **Name** : `Test SOAP Supplier`
2. **Email** : `test@supplier.com`
3. **Type** : `SOAP`

#### **Étape 3 : Configuration SOAP**
1. **WSDL URL** : `https://test-supplier.com/service.wsdl`
2. **Namespace** : `http://test-supplier.com/ws`
3. **Username** : `testuser`
4. **Password** : `testpass`
5. **Payment Operation** : `processPayment`
6. **Refund Operation** : `processRefund`
7. **Success Operation** : `notifyPaymentStatus`

#### **Étape 4 : Configuration du Système de Paiement**
1. **Supplier handles customer payment directly** : ✅ Coché
2. **Enable automatic payment processing** : ✅ Coché
3. **Payment WSDL URL** : `https://test-supplier.com/payment.wsdl`
4. **Payment Operation Name** : `processPayment`
5. **SOAP Action for Payment** : `http://tempuri.org/ProcessPayment`

#### **Étape 5 : Configuration des Paiements**
1. **Payout Frequency** : `WEEKLY`
2. **Custom Payment Days** : `1,15`
3. **Payment Hour** : `18`
4. **Minimum Payment Amount** : `50`
5. **Maximum Payment Delay** : `30`

#### **Étape 6 : Sauvegarder**
1. Cliquer sur "Create Supplier"
2. Vérifier que le fournisseur est créé sans erreur

### **2. Test de Modification d'un Fournisseur Existant**

#### **Étape 1 : Modifier le Fournisseur "sma"**
1. Aller à `/admin/suppliers`
2. Trouver le fournisseur "sma"
3. Cliquer sur "Edit"

#### **Étape 2 : Vérifier les Champs de Configuration du Système de Paiement**
1. Aller à l'onglet "Configuration"
2. Vérifier que les champs suivants sont présents et remplis :
   - ✅ Payment WSDL URL
   - ✅ Payment Operation Name
   - ✅ SOAP Action for Payment
   - ✅ Supplier handles customer payment directly
   - ✅ Enable automatic payment processing

#### **Étape 3 : Modifier et Sauvegarder**
1. Modifier quelques valeurs
2. Sauvegarder les modifications
3. Vérifier que les changements sont persistés

### **3. Test de Validation des Champs**

#### **Test 1 : Champs Requis**
1. Essayer de créer un fournisseur sans nom
2. Vérifier que l'erreur "Name is required" s'affiche

#### **Test 2 : Validation Email**
1. Entrer un email invalide
2. Vérifier que l'erreur "Please enter a valid email address" s'affiche

#### **Test 3 : Validation WSDL URL**
1. Créer un fournisseur SOAP sans WSDL URL
2. Vérifier que l'erreur "WSDL URL is required for SOAP suppliers" s'affiche

## 🔍 Vérifications à Effectuer

### **Interface Utilisateur**
- [ ] Tous les onglets sont présents et fonctionnels
- [ ] Les champs de configuration du système de paiement sont visibles
- [ ] Les placeholders et hints sont informatifs
- [ ] Les icônes sont appropriées pour chaque champ

### **Validation des Données**
- [ ] Les champs requis sont correctement validés
- [ ] Les erreurs s'affichent de manière claire
- [ ] Le formulaire ne peut pas être soumis avec des données invalides

### **Sauvegarde des Données**
- [ ] Tous les champs sont correctement sauvegardés
- [ ] Les valeurs par défaut sont appliquées correctement
- [ ] Les modifications sont persistées en base de données

### **Intégration Backend**
- [ ] L'API reçoit tous les champs de configuration
- [ ] Le fournisseur est créé avec la bonne configuration
- [ ] Le système de paiement est correctement détecté

## 🐛 Problèmes Potentiels à Surveiller

1. **Champs manquants** : Vérifier que tous les nouveaux champs sont présents
2. **Validation incorrecte** : S'assurer que les règles de validation sont appropriées
3. **Sauvegarde partielle** : Vérifier que tous les champs sont sauvegardés
4. **Interface cassée** : S'assurer que l'interface reste responsive et utilisable

## ✅ Critères de Succès

Le test est réussi si :
- [ ] Tous les champs de configuration du système de paiement sont présents
- [ ] La création de fournisseurs fonctionne sans erreur
- [ ] Les modifications sont correctement sauvegardées
- [ ] L'interface reste intuitive et responsive
- [ ] Le backend reçoit et traite correctement tous les champs

## 📝 Notes de Test

- Tester avec différents navigateurs si possible
- Vérifier la responsivité sur mobile
- Tester les cas limites (champs vides, valeurs extrêmes)
- Documenter tout comportement inattendu 