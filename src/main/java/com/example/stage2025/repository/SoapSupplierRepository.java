package com.example.stage2025.repository;

import com.example.stage2025.entity.SoapSupplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SoapSupplierRepository extends JpaRepository<SoapSupplier, Long> {
}