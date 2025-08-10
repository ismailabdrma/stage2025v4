package com.example.stage2025.repository;

import com.example.stage2025.entity.Category;
import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

  // ---------- existing finders ----------
  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  List<Product> findByCategoryId(Long categoryId);

  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  List<Product> findBySupplierId(Long supplierId);

  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  List<Product> findByCategory(Category category);

  Optional<Product> findByExternalProductIdAndSupplier(String externalProductId, Supplier supplier);

  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  List<Product> findByActiveFalse();

  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  List<Product> findByCategoryAndSupplier(Category category, Supplier supplier);

  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  List<Product> findBySupplier(Supplier supplier);

  // ---------- paging helpers for controllers ----------
  // If your controller lists active products with pagination:
  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  Page<Product> findByActiveTrue(Pageable pageable);

  // If your controller uses Specification + Pageable:
  // (redeclare to attach @EntityGraph so Category is fetched)
  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  Page<Product> findAll(Specification<Product> spec, Pageable pageable);

  // If you also list "all products" with pagination somewhere:
  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  Page<Product> findAll(Pageable pageable);

  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  List<Product> findTop12ByActiveTrueOrderByIdDesc();

  // Override the default findById to include @EntityGraph
  @EntityGraph(attributePaths = {"category", "supplier", "imageUrls"})
  Optional<Product> findById(Long id);
  
  // Dashboard statistics methods
  long countByActiveTrue();
  long countByActiveFalse();
  long countBySupplier(Supplier supplier);
  List<Product> findBySyncedStockLessThanAndActiveTrue(int threshold);
  
}
