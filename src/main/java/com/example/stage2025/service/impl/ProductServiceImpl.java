package com.example.stage2025.service.impl;

import com.example.stage2025.dto.ProductDto;
import com.example.stage2025.entity.Category;
import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.mapper.ProductMapper;
import com.example.stage2025.repository.CategoryRepository;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final SupplierRepository supplierRepository;

    @Override
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
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
                .active(true)
                .externalProductId(dto.getExternalProductId())
                .build();

        Product saved = productRepository.save(product);
        return ProductMapper.toDto(saved);
    }

    @Override
    public ProductDto updateProduct(Long id, ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé avec ID " + id));

        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setDisplayedPrice(dto.getDisplayedPrice());
        product.setExternalProductId(dto.getExternalProductId());
        product.setImageUrls(dto.getImageUrls());

        Category category = categoryRepository.findByName(dto.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée : " + dto.getCategoryName()));
        Supplier supplier = supplierRepository.findByName(dto.getSupplierName())
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé : " + dto.getSupplierName()));

        product.setCategory(category);
        product.setSupplier(supplier);

        return ProductMapper.toDto(productRepository.save(product));
    }

    @Override
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Produit non trouvé avec ID " + id);
        }
        productRepository.deleteById(id);
    }

    @Override
    public List<ProductDto> getProductsByCategoryName(String categoryName) {
        Category category = categoryRepository.findByName(categoryName)
                .orElseThrow(() -> new ResourceNotFoundException("Catégorie non trouvée : " + categoryName));
        return productRepository.findByCategory(category)
                .stream()
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getProductsBySupplierName(String supplierName) {
        Supplier supplier = supplierRepository.findByName(supplierName)
                .orElseThrow(() -> new ResourceNotFoundException("Fournisseur non trouvé : " + supplierName));
        return productRepository.findBySupplier(supplier)
                .stream()
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
                .stream().map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public Page<Product> getAllProducts(String category,
                                        String supplier,
                                        String search,
                                        boolean includeInactive,
                                        Double minPrice,
                                        Double maxPrice,
                                        Pageable pageable) {
        Specification<Product> spec = Specification.where(null);

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
            spec = spec.and((root, q, cb) -> cb.isTrue(root.get("active")));
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
    public List<ProductDto> getFeaturedProducts() {
        // Simple heuristic: latest active products
        return productRepository.findAll().stream()
                .filter(p -> Boolean.TRUE.equals(p.getActive()))
                .sorted((a, b) -> Long.compare(b.getId(), a.getId()))
                .limit(12)
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDto> getSuggestedProducts(Long productId) {
        // Simple heuristic: same category as product
        Product base = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return productRepository.findByCategory(base.getCategory()).stream()
                .filter(p -> !p.getId().equals(productId) && Boolean.TRUE.equals(p.getActive()))
                .limit(8)
                .map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }
}
