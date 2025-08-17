// src/main/java/com/example/stage2025/repository/SoapSupplierOperationMetaRepository.java
package com.example.stage2025.repository;

import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.SoapSupplierOperationMeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SoapSupplierOperationMetaRepository extends JpaRepository<SoapSupplierOperationMeta, Long> {
    List<SoapSupplierOperationMeta> findBySupplier(SoapSupplier supplier);
    void deleteBySupplier(SoapSupplier supplier);
    Optional<SoapSupplierOperationMeta> findBySupplierAndOperationName(SoapSupplier supplier, String operationName);
}
