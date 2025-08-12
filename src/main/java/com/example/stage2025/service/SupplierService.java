package com.example.stage2025.service;

import com.example.stage2025.dto.SupplierDto;

import java.util.List;

public interface SupplierService {
    List<SupplierDto> getAllSuppliers();
    SupplierDto getSupplierById(Long id);
    SupplierDto createSupplier(SupplierDto dto);
    SupplierDto createSupplierAutoSoap(SupplierDto dto);
    
    void importProductsFromSupplier(Long supplierId);
    
    boolean refreshSoapMetadata(Long supplierId);
    SupplierDto updateSupplier(Long id, SupplierDto dto);
    void deleteSupplier(Long id);
    void activateSupplier(Long id);
    void deactivateSupplier(Long id);
}
