# Frontend Test Guide - Guide de Test Frontend

## 🎯 **Objectif**
Tester que le frontend fonctionne correctement avec le système de routage de paiement simplifié.

## 🔧 **Étapes de Test**

### **Étape 1 : Vérifier la Base de Données**
```sql
-- Exécuter le script de test
source test_frontend_checkout.sql;
```

### **Étape 2 : Tester le Dialogue d'Ajout de Fournisseur**
1. **Aller à** : Admin → Suppliers → Add Supplier
2. **Sélectionner** : Type = SOAP
3. **Vérifier** : Seuls les champs essentiels sont affichés
4. **Remplir** :
   - Name: test-soap
   - WSDL URL: http://localhost:8082/ws/test.wsdl
   - SOAP Operation: testOperation
5. **Sauvegarder** et vérifier que c'est créé

### **Étape 3 : Tester le Panier**
1. **Ajouter des produits** au panier
2. **Vérifier** que le total est calculé correctement
3. **Modifier les quantités** et vérifier les mises à jour
4. **Supprimer des articles** et vérifier la suppression

### **Étape 4 : Tester le Checkout**
1. **Aller au checkout** avec des produits du fournisseur "sma"
2. **Sélectionner une adresse** de livraison
3. **Vérifier** que l'étape de paiement s'affiche
4. **Vérifier** que le conteneur Stripe `#payment-element` est visible

### **Étape 5 : Vérifier le Routage de Paiement**
1. **Créer une commande** et vérifier les logs backend
2. **Attendu** : Routage vers `DIRECT_TO_SUPPLIER` pour "sma"
3. **Attendu** : Routage vers `PLATFORM_PAYMENT` pour les autres

## ✅ **Critères de Succès**

### **Dialogue Fournisseur**
- ✅ Champs SOAP simplifiés (WSDL + Operation)
- ✅ Pas de champs de configuration de paiement complexes
- ✅ Sauvegarde fonctionnelle

### **Panier**
- ✅ Affichage correct des produits
- ✅ Calcul correct des totaux
- ✅ Mise à jour des quantités
- ✅ Suppression des articles

### **Checkout**
- ✅ Conteneur Stripe visible (`#payment-element`)
- ✅ Formulaire d'adresse fonctionnel
- ✅ Navigation entre les étapes
- ✅ Gestion des erreurs

### **Routage de Paiement**
- ✅ Fournisseur "sma" → `DIRECT_TO_SUPPLIER`
- ✅ Autres fournisseurs → `PLATFORM_PAYMENT`
- ✅ Logs clairs dans la console

## 🚨 **Problèmes Possibles et Solutions**

### **Problème 1 : Conteneur Stripe Manquant**
**Symptôme** : Erreur "Payment element container not found"
**Solution** : Vérifier que `#payment-element` existe dans le HTML

### **Problème 2 : Erreur HTTPS Stripe**
**Symptôme** : Avertissement "live Stripe.js integrations must use HTTPS"
**Solution** : Ignorer en développement local, utiliser HTTPS en production

### **Problème 3 : Routage Incorrect**
**Symptôme** : Toujours `PLATFORM_PAYMENT` pour "sma"
**Solution** : Vérifier la configuration de la base de données

## 🔄 **Après les Tests**

Si tout fonctionne :
1. ✅ **Frontend** : Interface propre et fonctionnelle
2. ✅ **Backend** : Routage de paiement correct
3. ✅ **Base de données** : Configuration des fournisseurs correcte

Si des problèmes persistent :
1. **Vérifier les logs** console et backend
2. **Tester la base de données** avec les scripts SQL
3. **Vérifier la configuration** des fournisseurs

## 📋 **Résumé des Tests**

- **Dialogue Fournisseur** : Simple et fonctionnel
- **Panier** : Gestion correcte des articles
- **Checkout** : Interface Stripe intégrée
- **Routage** : Logique de paiement simplifiée

Le système est maintenant **simple, propre et fonctionnel** ! 🎉 