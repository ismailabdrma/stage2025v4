// Test script for supplier import functionality
const BASE_URL = 'http://localhost:8080';

async function testSupplierImport() {
    console.log('🧪 Testing Supplier Import Functionality');
    console.log('==========================================');
    
    try {
        // 1. Check all suppliers
        console.log('\n1. 📋 Checking all suppliers...');
        const suppliersResponse = await fetch(`${BASE_URL}/api/debug/suppliers`);
        const suppliersData = await suppliersResponse.json();
        
        console.log(`Total suppliers: ${suppliersData.totalSuppliers}`);
        Object.entries(suppliersData.suppliers).forEach(([name, data]) => {
            console.log(`  - ${name} (ID: ${data.id}, Type: ${data.type}, Active: ${data.active})`);
            console.log(`    Products: ${data.totalProducts} total, ${data.activeProducts} active, ${data.inactiveProducts} inactive`);
        });
        
        // 2. Check ismail supplier specifically
        console.log('\n2. 🔍 Checking ismail supplier...');
        const ismailResponse = await fetch(`${BASE_URL}/api/debug/supplier/ismail`);
        const ismailData = await ismailResponse.json();
        
        if (ismailData.error) {
            console.log(`❌ ${ismailData.error}`);
        } else {
            Object.entries(ismailData).forEach(([name, data]) => {
                console.log(`Supplier: ${name}`);
                console.log(`  ID: ${data.id}`);
                console.log(`  Type: ${data.type}`);
                console.log(`  Active: ${data.active}`);
                console.log(`  Products found: ${data.productsFound}`);
                console.log(`  Last import: ${data.lastImport}`);
                
                if (data.products && data.products.length > 0) {
                    console.log(`  Sample products:`);
                    data.products.slice(0, 3).forEach(p => {
                        console.log(`    - ${p.name} (External ID: ${p.externalId}, Active: ${p.active})`);
                    });
                }
            });
        }
        
        // 3. Test product fetch (without saving)
        console.log('\n3. 🔬 Testing product fetch for ismail supplier...');
        // Find ismail supplier ID
        const ismailSupplier = Object.values(suppliersData.suppliers).find(s => s.name.toLowerCase().includes('ismail'));
        if (ismailSupplier) {
            const fetchResponse = await fetch(`${BASE_URL}/api/suppliers/${ismailSupplier.id}/debug-fetch`);
            const fetchData = await fetchResponse.json();
            
            if (fetchData.error) {
                console.log(`❌ Fetch error: ${fetchData.error || fetchData}`);
            } else {
                console.log(`✅ Fetch successful:`);
                console.log(`  Supplier: ${fetchData.supplier}`);
                console.log(`  Type: ${fetchData.type}`);
                console.log(`  Products fetched: ${fetchData.productCount}`);
                
                if (fetchData.products && fetchData.products.length > 0) {
                    console.log(`  Sample products:`);
                    fetchData.products.forEach(p => {
                        console.log(`    - ${p.name} (Price: ${p.price}, Stock: ${p.stock})`);
                        if (p.imageUrls && p.imageUrls.length > 0) {
                            console.log(`      Images: ${p.imageUrls.length} URLs (first: ${p.imageUrls[0].substring(0, 100)}...)`);
                        }
                    });
                }
            }
            
            // 4. Test actual import (with saving)
            console.log('\n4. 💾 Testing actual product import...');
            const importResponse = await fetch(`${BASE_URL}/api/suppliers/${ismailSupplier.id}/import-products`, {
                method: 'POST'
            });
            const importData = await importResponse.text();
            console.log(`Import response: ${importData}`);
            
            // Wait a moment for import to complete
            await new Promise(resolve => setTimeout(resolve, 3000));
            
            // 5. Check if products were saved
            console.log('\n5. ✅ Checking if products were saved...');
            const finalCheckResponse = await fetch(`${BASE_URL}/api/debug/supplier/ismail`);
            const finalCheckData = await finalCheckResponse.json();
            
            Object.entries(finalCheckData).forEach(([name, data]) => {
                console.log(`Final check for ${name}:`);
                console.log(`  Products found: ${data.productsFound}`);
                console.log(`  Last import: ${data.lastImport}`);
            });
            
        } else {
            console.log('❌ Could not find ismail supplier');
        }
        
    } catch (error) {
        console.error('❌ Test failed:', error.message);
    }
}

// Run the test
testSupplierImport();
