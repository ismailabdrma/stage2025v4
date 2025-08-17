package com.example.stage2025.repository;

import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.entity.ExcelSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    Optional<Supplier> findByName(String name);

    List<Supplier> findByActiveTrue();
    
    long countByActiveTrue();

    Optional<SoapSupplier> findSoapSupplierById(Long id);
    Optional<ApiSupplier> findApiSupplierById(Long id);
    Optional<ExcelSupplier> findExcelSupplierById(Long id);
}