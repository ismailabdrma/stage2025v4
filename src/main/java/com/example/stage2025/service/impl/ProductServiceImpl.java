package com.example.stage2025.service.impl;

import com.example.stage2025.dto.ProductDto;
import com.example.stage2025.entity.Category;
import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.enums.ProductStatus;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.mapper.ProductMapper;
import com.example.stage2025.repository.CategoryRepository;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.ProductService;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    @Override
    public List<ProductDto> getAllProducts() {
        // Only return active products from active suppliers for public display
        return productRepository.findActiveProductsFromActiveSuppliers()
                .stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ProductDto getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec ID " + id));
        return ProductMapper.toDto(product);
    }

    @Override
    public ProductDto createProduct(ProductDto dto) {
        Category category = categoryRepository.findByName(dto.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée : " + dto.getCategoryName()));

        Supplier supplier = supplierRepository.findByName(dto.getSupplierName())
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé : " + dto.getSupplierName()));

        Product product = Product.builder()
                .name(dto.getName())
                .description(dto.getDescription())
                .displayedPrice(dto.getDisplayedPrice())
                .imageUrls(dto.getImageUrls())
                .category(category)
                .supplier(supplier)
                .active(false) // Set to inactive so they need admin approval
                .externalProductId(dto.getExternalProductId())
                .supplierRef(dto.getExternalProductId()) // Set supplierRef to the same value as externalProductId
                .build();

        Product saved = productRepository.save(product);
        return ProductMapper.toDto(saved);
    }

    @Override
    @Transactional
    public ProductDto updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec ID " + id));

        // Store original ID to ensure it doesn't change
        Long originalId = product.getId();

        // Update fields with validation
        if (dto.getName() != null && !dto.getName().trim().isEmpty()) {
            product.setName(dto.getName().trim());
        }
        if (dto.getDescription() != null) {
            product.setDescription(dto.getDescription().trim());
        }
        if (dto.getDisplayedPrice() != null && dto.getDisplayedPrice() >= 0) {
            product.setDisplayedPrice(dto.getDisplayedPrice());
        }
        if (dto.getExternalProductId() != null) {
            product.setExternalProductId(dto.getExternalProductId());
            // Keep supplierRef in sync with externalProductId
            product.setSupplierRef(dto.getExternalProductId());
        }
        if (dto.getImageUrls() != null) {
            product.setImageUrls(dto.getImageUrls());
        }
        if (dto.getSyncedStock() != null && dto.getSyncedStock() >= 0) {
            product.setSyncedStock(dto.getSyncedStock());
        }
        if (dto.getActive() != null) {
            product.setActive(dto.getActive());
        }

        // Category: accept name preferred; fallback to keep existing if none provided
        if (dto.getCategoryName() != null && !dto.getCategoryName().isBlank()) {
            Category category = categoryRepository.findByName(dto.getCategoryName())
                    .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée : " + dto.getCategoryName()));
            product.setCategory(category);
        }
        // Supplier: same approach
        if (dto.getSupplierName() != null && !dto.getSupplierName().isBlank()) {
            Supplier supplier = supplierRepository.findByName(dto.getSupplierName())
                    .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé : " + dto.getSupplierName()));
            product.setSupplier(supplier);
        }

        // Optional: accept categoryId if provided through a different UI field
        try {
            java.lang.reflect.Field f = dto.getClass().getDeclaredField("categoryId");
            f.setAccessible(true);
            Object val = f.get(dto);
            if (val instanceof Long) {
                Long categoryId = (Long) val;
                if (categoryId != null) {
                    Category cat = categoryRepository.findById(categoryId)
                            .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée (ID): " + categoryId));
                    product.setCategory(cat);
                }
            }
        } catch (NoSuchFieldException ignored) {
        } catch (Exception e) {
            // ignore reflection errors silently to keep method resilient
        }

        // Ensure ID remains the same before saving
        product.setId(originalId);

        Product saved = productRepository.save(product);

        // Verify ID hasn't changed
        if (!saved.getId().equals(originalId)) {
            log.warn("Product ID changed during update: {} -> {}", originalId, saved.getId());
        }

        return ProductMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec ID " + id));
        
        log.info("Deleting product {} with {} order items and {} cart items", 
                id, 
                product.getOrderItems() != null ? product.getOrderItems().size() : 0,
                product.getCartItems() != null ? product.getCartItems().size() : 0);
        
        // Clear imageUrls manually since ElementCollection doesn't support cascade delete
        if (product.getImageUrls() != null) {
            product.getImageUrls().clear();
        }
        
        // Clear the relationships to avoid lazy loading issues
        if (product.getOrderItems() != null) {
            product.getOrderItems().clear();
        }
        if (product.getCartItems() != null) {
            product.getCartItems().clear();
        }
        
        // The cascade settings will handle deleting related OrderItems and CartItems
        productRepository.delete(product);
        log.info("Product {} and all related items deleted successfully", id);
    }

    @Override
    public List<ProductDto> getProductsByCategoryName(String categoryName) {
        Category category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée : " + categoryName));
        return productRepository.findByCategory(category)
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getActive()) && 
                           p.getSupplier() != null && 
                           p.getSupplier().isActive())
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsBySupplierName(String supplierName) {
        Supplier supplier = supplierRepository.findByName(supplierName)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé : " + supplierName));
        return productRepository.findBySupplier(supplier)
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getActive()) && 
                           supplier.isActive())
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsByCategoryAndSupplier(String categoryName, String supplierName) {
        Category category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée : " + categoryName));
        Supplier supplier = supplierRepository.findByName(supplierName)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé : " + supplierName));
        return productRepository.findByCategoryAndSupplier(category, supplier)
                .stream()
                .filter(p -> Boolean.TRUE.equals(p.getActive()) && 
                           supplier.isActive())
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public Page<Product> getAllProducts(String category,
                                        String supplier,
                                        String search,
                                        boolean includeInactive,
                                        Double minPrice,
                                        Double maxPrice,
                                        Pageable pageable) {
        Specification<Product> spec = Specification.where((root, query, criteriaBuilder) -> criteriaBuilder.conjunction());

        if (category != null && !category.isBlank()) {
            spec = spec.and((root, q, cb) -> cb.equal(cb.lower(root.get("category").get("name")), category.toLowerCase()));
        }
        if (supplier != null && !supplier.isBlank()) {
            spec = spec.and((root, q, cb) -> cb.equal(cb.lower(root.get("supplier").get("name")), supplier.toLowerCase()));
        }
        if (search != null && !search.isBlank()) {
            String like = "%" + search.toLowerCase() + "%";
            spec = spec.and((root, q, cb) -> cb.or(
                    cb.like(cb.lower(root.get("name")), like),
                    cb.like(cb.lower(root.get("description")), like)
            ));
        }
        if (!includeInactive) {
            spec = spec.and((root, q, cb) -> cb.and(
                cb.isTrue(root.get("active")),
                cb.equal(root.get("status"), ProductStatus.APPROVED),
                cb.isTrue(root.get("supplier").get("active"))
            ));
        }
        if (minPrice != null) {
            spec = spec.and((root, q, cb) -> cb.greaterThanOrEqualTo(root.get("displayedPrice"), minPrice));
        }
        if (maxPrice != null) {
            spec = spec.and((root, q, cb) -> cb.lessThanOrEqualTo(root.get("displayedPrice"), maxPrice));
        }

        return productRepository.findAll(spec, pageable);
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(readOnly = true)
    public List<ProductDto> getFeaturedProducts() {
        return productRepository.findTop12ByActiveTrueAndStatusOrderByIdDesc(ProductStatus.APPROVED)
                .stream()
                .filter(p -> p.getSupplier() != null && p.getSupplier().isActive())
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getSuggestedProducts(Long productId) {
        // Simple heuristic: same category as product
        Product base = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return productRepository.findByCategory(base.getCategory()).stream()
                .filter(p -> !p.getId().equals(productId) && 
                           Boolean.TRUE.equals(p.getActive()) && 
                           p.getSupplier() != null && 
                           p.getSupplier().isActive())
                .limit(8)
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    // Admin Product Management Implementation
    @Override
    @Transactional(readOnly = true)
    public List<ProductDto> getPendingProducts() {
        return productRepository.findByActiveStatus(false).stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductDto approveProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        
        log.info("Before approval - Product {}: active={}, status={}", id, product.getActive(), product.getStatus());
        
        product.setActive(true);
        product.setStatus(ProductStatus.APPROVED);
        
        log.info("After setting values - Product {}: active={}, status={}", id, product.getActive(), product.getStatus());
        
        Product saved = productRepository.save(product);
        
        log.info("After save - Product {}: active={}, status={}", id, saved.getActive(), saved.getStatus());
        
        // Log admin action
        log.info("Product {} approved by admin", id);
        
        return ProductMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void rejectProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        
        // Instead of deleting, we mark as rejected (soft delete)
        product.setActive(false);
        product.setStatus(ProductStatus.REJECTED);
        productRepository.save(product);
        
        // Log admin action
        log.info("Product {} rejected and deactivated by admin", id);
    }

    @Override
    @Transactional
    public List<ProductDto> approveMultipleProducts(List<Long> productIds) {
        List<Product> products = productRepository.findAllById(productIds);
        
        for (Product product : products) {
            product.setActive(true);
            product.setStatus(ProductStatus.APPROVED);
        }
        
        List<Product> savedProducts = productRepository.saveAll(products);
        
        // Log admin action
        log.info("Bulk approved {} products by admin", productIds.size());
        
        return savedProducts.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ProductDto suspendProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        
        product.setActive(false);
        product.setStatus(ProductStatus.SUSPENDED);
        Product saved = productRepository.save(product);
        
        // Log admin action
        log.info("Product {} suspended by admin", id);
        
        return ProductMapper.toDto(saved);
    }

    @Override
    @Transactional
    public ProductDto activateProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        
        product.setActive(true);
        product.setStatus(ProductStatus.APPROVED);
        Product saved = productRepository.save(product);
        
        // Log admin action
        log.info("Product {} activated by admin", id);
        
        return ProductMapper.toDto(saved);
    }

    @Override
    @Transactional
    public void permanentDeleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with ID: " + id));
        
        productRepository.delete(product);
        
        // Log admin action
        log.info("Product {} permanently deleted by admin", id);
    }

    @Override
    @Transactional
    public List<ProductDto> bulkUpdateProducts(List<Long> productIds, ProductDto updateData) {
        List<Product> products = productRepository.findAllById(productIds);
        
        for (Product product : products) {
            // Update fields that are provided
            if (updateData.getName() != null) {
                product.setName(updateData.getName());
            }
            if (updateData.getDescription() != null) {
                product.setDescription(updateData.getDescription());
            }
            if (updateData.getDisplayedPrice() != null) {
                product.setDisplayedPrice(updateData.getDisplayedPrice());
            }
            if (updateData.getCategoryName() != null) {
                Category category = categoryRepository.findByName(updateData.getCategoryName())
                        .orElseThrow(() -> new ResourceNotFoundException("Category not found: " + updateData.getCategoryName()));
                product.setCategory(category);
            }
            // Add more fields as needed
        }
        
        List<Product> savedProducts = productRepository.saveAll(products);
        
        // Log admin action
        log.info("Bulk updated {} products by admin", productIds.size());
        
        return savedProducts.stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductDto> getAllProductsForAdmin(boolean includeInactive) {
        if (includeInactive) {
            List<Product> allProducts = productRepository.findAllWithDetails();
            return allProducts.stream().map(ProductMapper::toDto).collect(Collectors.toList());
        } else {
            List<Product> activeProducts = productRepository.findByActiveStatus(false);
            return activeProducts.stream().map(ProductMapper::toDto).collect(Collectors.toList());
        }
    }
}
