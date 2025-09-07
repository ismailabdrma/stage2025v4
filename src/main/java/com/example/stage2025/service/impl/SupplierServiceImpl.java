package com.example.stage2025.service.impl;

import com.example.stage2025.dto.SoapOperationMeta;
import com.example.stage2025.dto.SupplierDto;
import com.example.stage2025.entity.ApiSupplier;
import com.example.stage2025.entity.ExcelSupplier;
import com.example.stage2025.entity.Payment;
import com.example.stage2025.entity.Product;
import com.example.stage2025.entity.SoapSupplier;
import com.example.stage2025.entity.SoapSupplierOperationMeta;
import com.example.stage2025.entity.Supplier;
import com.example.stage2025.entity.SupplierPayment;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.mapper.SupplierMapper;
import com.example.stage2025.repository.ProductRepository;
import com.example.stage2025.repository.SoapSupplierOperationMetaRepository;
import com.example.stage2025.repository.SupplierRepository;
import com.example.stage2025.repository.OrderItemRepository;
import com.example.stage2025.repository.SupplierPaymentRepository;
import com.example.stage2025.repository.PaymentRepository;
import com.example.stage2025.service.SupplierService;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.service.ProductFetcherFactory;
import com.example.stage2025.service.SoapMetadataRefreshService;
import com.example.stage2025.dto.SupplierProductDto;
import com.example.stage2025.repository.CategoryRepository;
import com.example.stage2025.entity.Category;
import com.example.stage2025.utils.JsonUtils;
import com.example.stage2025.utils.WsdlFullMetadataUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SupplierServiceImpl implements SupplierService {

    private final SupplierRepository supplierRepository;
    private final ProductRepository productRepository;
    private final SoapSupplierOperationMetaRepository operationMetaRepository;
    private final EmailService emailService;
    private final ProductFetcherFactory productFetcherFactory;
    private final CategoryRepository categoryRepository;
    private final SoapMetadataRefreshService soapMetadataRefreshService;
    private final OrderItemRepository orderItemRepository;
    private final SupplierPaymentRepository supplierPaymentRepository;
    private final PaymentRepository paymentRepository;

    @Override
    public List<SupplierDto> getAllSuppliers() {
        return supplierRepository.findAll()
                .stream()
                .map(SupplierMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public SupplierDto getSupplierById(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
        return SupplierMapper.toDto(supplier);
    }

    @Override
    public SupplierDto createSupplier(SupplierDto dto) {
        Supplier supplier;

        if ("API".equalsIgnoreCase(dto.getType())) {
            ApiSupplier apiSupplier = new ApiSupplier();
            apiSupplier.setName(dto.getName());
            apiSupplier.setContactEmail(dto.getContactEmail());
            apiSupplier.setActive(dto.isActive());
            apiSupplier.setCreated(LocalDateTime.now());
            apiSupplier.setApiUrl(dto.getApiUrl());
            apiSupplier.setApiKey(dto.getApiKey());
            apiSupplier.setAuthMethod(dto.getAuthMethod());
            if (dto.getProductsEndpoint() != null) apiSupplier.setProductsEndpoint(dto.getProductsEndpoint());
            if (dto.getSingleEndpoint() != null) apiSupplier.setSingleEndpoint(dto.getSingleEndpoint());
            if (dto.getDataFormat() != null) {
                try {
                    apiSupplier.setDataFormat(com.example.stage2025.enums.DataFormat.valueOf(dto.getDataFormat()));
                } catch (IllegalArgumentException ignored) {}
            }
            supplier = apiSupplier;

        } else if ("EXCEL".equalsIgnoreCase(dto.getType())) {
            ExcelSupplier excelSupplier = new ExcelSupplier();
            excelSupplier.setName(dto.getName());
            excelSupplier.setContactEmail(dto.getContactEmail());
            excelSupplier.setActive(dto.isActive());
            excelSupplier.setCreated(LocalDateTime.now());
            excelSupplier.setFileName(dto.getFileName());
            excelSupplier.setFilePath(dto.getFilePath());
            supplier = excelSupplier;

        } else if ("SOAP".equalsIgnoreCase(dto.getType())) {
            SoapSupplier soapSupplier = new SoapSupplier();
            soapSupplier.setName(dto.getName());
            soapSupplier.setContactEmail(dto.getContactEmail());
            soapSupplier.setActive(dto.isActive());
            soapSupplier.setCreated(LocalDateTime.now());
            soapSupplier.setWsdlUrl(dto.getWsdlUrl());
            soapSupplier.setNamespace(dto.getNamespace());
            soapSupplier.setUsername(dto.getUsername());
            soapSupplier.setPassword(dto.getPassword());
            soapSupplier.setPaymentOperationName(dto.getPaymentOperationName());
            soapSupplier.setRefundOperationName(dto.getRefundOperationName());
            soapSupplier.setSuccessOperationName(dto.getSuccessOperationName());
            
            // Set payment system fields from DTO (admin can choose)
            soapSupplier.setHasOwnPaymentSystem(dto.isHasOwnPaymentSystem());
            
            // Explicitly set payment integration type for SOAP suppliers
            soapSupplier.setPaymentIntegrationType("SOAP");
            
            // Set autoPaymentEnabled from DTO if present, else default to TRUE
            if (dto.getAutoPaymentEnabled() != null) {
                soapSupplier.setAutoPaymentEnabled(dto.getAutoPaymentEnabled());
            } else {
                soapSupplier.setAutoPaymentEnabled(Boolean.TRUE);
            }
            
            // Set payment-specific configuration fields
            // Use existing wsdlUrl and operation names for payment if not specified separately
            if (dto.getWsdlUrl() != null && !dto.getWsdlUrl().trim().isEmpty()) {
                soapSupplier.setPaymentWsdlUrl(dto.getWsdlUrl()); // Use main wsdlUrl for payment
            }
            
            if (dto.getPaymentOperationName() != null && !dto.getPaymentOperationName().trim().isEmpty()) {
                soapSupplier.setPaymentOperationNameConfig(dto.getPaymentOperationName()); // Use main operation for payment
            }
            
            // Set default SOAP action if not provided
            soapSupplier.setSoapAction("http://tempuri.org/ProcessPayment");
            
            soapSupplier.setOperations(new ArrayList<>());
            supplier = soapSupplier;

        } else {
            throw new IllegalArgumentException("Unknown supplier type: " + dto.getType());
        }

        // Common fields for all supplier types (but don't override SOAP-specific settings)
        if (!(supplier instanceof SoapSupplier)) {
            supplier.setHasOwnPaymentSystem(dto.isHasOwnPaymentSystem());
        }
        supplier.setPaymentApiEndpoint(dto.getPaymentApiEndpoint());
        supplier.setCommissionApiEndpoint(dto.getCommissionApiEndpoint());
        supplier.setPayoutFrequency(dto.getPayoutFrequency());
        supplier.setCustomPaymentSchedule(dto.getCustomPaymentSchedule());
        supplier.setCustomPaymentDays(dto.getCustomPaymentDays());
        supplier.setCustomPaymentHour(dto.getCustomPaymentHour());
        supplier.setMinimumPaymentAmount(dto.getMinimumPaymentAmount());
        supplier.setMaximumPaymentDelay(dto.getMaximumPaymentDelay());

        Supplier saved = supplierRepository.save(supplier);

        // ---- Only for SOAP suppliers: Add operation metadata if provided ----
        if (saved instanceof SoapSupplier && dto.getOperationsMeta() != null) {
            SoapSupplier soap = (SoapSupplier) saved;
            List<SoapSupplierOperationMeta> ops = dto.getOperationsMeta().stream()
                    .map(metaDto -> {
                        SoapSupplierOperationMeta op = new SoapSupplierOperationMeta();
                        op.setOperationName(metaDto.getOperationName());
                        op.setInputElement(metaDto.getInputElement());
                        op.setOutputElement(metaDto.getOutputElement());
                        op.setSoapAction(metaDto.getSoapAction());
                        op.setInputFieldsJson(JsonUtils.toJson(metaDto.getInputFields()));
                        op.setOutputFieldsJson(JsonUtils.toJson(metaDto.getOutputFields()));

                        op.setSupplier(soap);
                        return op;
                    })
                    .collect(Collectors.toList());
            operationMetaRepository.saveAll(ops);
            soap.setOperations(ops);
            supplierRepository.save(soap); // Update supplier with ops
        }

        // Send admin notification about new supplier configuration
        try {
            emailService.sendAdminNewSupplierNotification(saved);
        } catch (Exception e) {
            // Log but don't fail supplier creation due to email issues
            System.err.println("Failed to send admin notification email: " + e.getMessage());
        }

        return SupplierMapper.toDto(saved);
    }

    @Override
    public SupplierDto updateSupplier(Long id, SupplierDto dto) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));

        supplier.setName(dto.getName());
        supplier.setActive(dto.isActive());
        // Update payment configuration
        supplier.setHasOwnPaymentSystem(dto.isHasOwnPaymentSystem());
        supplier.setPaymentApiEndpoint(dto.getPaymentApiEndpoint());
        supplier.setCommissionApiEndpoint(dto.getCommissionApiEndpoint());
        supplier.setPayoutFrequency(dto.getPayoutFrequency());
        supplier.setCustomPaymentSchedule(dto.getCustomPaymentSchedule());
        supplier.setCustomPaymentDays(dto.getCustomPaymentDays());
        supplier.setCustomPaymentHour(dto.getCustomPaymentHour());
        supplier.setMinimumPaymentAmount(dto.getMinimumPaymentAmount());
        supplier.setMaximumPaymentDelay(dto.getMaximumPaymentDelay());

        if (supplier instanceof ApiSupplier && "API".equalsIgnoreCase(dto.getType())) {
            ApiSupplier api = (ApiSupplier) supplier;
            api.setApiUrl(dto.getApiUrl());
            api.setApiKey(dto.getApiKey());
            api.setAuthMethod(dto.getAuthMethod());
            if (dto.getProductsEndpoint() != null) api.setProductsEndpoint(dto.getProductsEndpoint());
            if (dto.getSingleEndpoint() != null) api.setSingleEndpoint(dto.getSingleEndpoint());
            if (dto.getDataFormat() != null) {
                try {
                    api.setDataFormat(com.example.stage2025.enums.DataFormat.valueOf(dto.getDataFormat()));
                } catch (IllegalArgumentException ignored) {}
            }

        } else if (supplier instanceof ExcelSupplier && "EXCEL".equalsIgnoreCase(dto.getType())) {
            ExcelSupplier excel = (ExcelSupplier) supplier;
            excel.setFileName(dto.getFileName());
            excel.setFilePath(dto.getFilePath());

        } else if (supplier instanceof SoapSupplier && "SOAP".equalsIgnoreCase(dto.getType())) {
            SoapSupplier soap = (SoapSupplier) supplier;
            soap.setWsdlUrl(dto.getWsdlUrl());
            soap.setNamespace(dto.getNamespace());
            soap.setUsername(dto.getUsername());
            soap.setPassword(dto.getPassword());
            soap.setPaymentOperationName(dto.getPaymentOperationName());
            soap.setRefundOperationName(dto.getRefundOperationName());
            soap.setSuccessOperationName(dto.getSuccessOperationName());
            
            // Update payment system configuration
            soap.setHasOwnPaymentSystem(dto.isHasOwnPaymentSystem());
            soap.setPaymentIntegrationType("SOAP"); // Always SOAP for SOAP suppliers
            soap.setAutoPaymentEnabled(dto.getAutoPaymentEnabled() != null ? dto.getAutoPaymentEnabled() : Boolean.TRUE);
            
            // Update payment-specific configuration fields
            // Use existing wsdlUrl and operation names for payment if not specified separately
            if (dto.getWsdlUrl() != null && !dto.getWsdlUrl().trim().isEmpty()) {
                soap.setPaymentWsdlUrl(dto.getWsdlUrl()); // Use main wsdlUrl for payment
            }
            
            if (dto.getPaymentOperationName() != null && !dto.getPaymentOperationName().trim().isEmpty()) {
                soap.setPaymentOperationNameConfig(dto.getPaymentOperationName()); // Use main operation for payment
            }
            
            // Set default SOAP action if not provided
            if (soap.getSoapAction() == null || soap.getSoapAction().trim().isEmpty()) {
                soap.setSoapAction("http://tempuri.org/ProcessPayment");
            }

            // (Optional) Update operations meta as well
            if (dto.getOperationsMeta() != null) {
                // Remove old
                operationMetaRepository.deleteAll(soap.getOperations());
                // Add new
                List<SoapSupplierOperationMeta> ops = dto.getOperationsMeta().stream()
                    .map(metaDto -> {
                        SoapSupplierOperationMeta op = new SoapSupplierOperationMeta();
                        op.setOperationName(metaDto.getOperationName());
                        op.setInputElement(metaDto.getInputElement());
                        op.setOutputElement(metaDto.getOutputElement());
                        op.setSoapAction(metaDto.getSoapAction());
                        op.setInputFieldsJson(JsonUtils.toJson(metaDto.getInputFields()));
                        op.setOutputFieldsJson(JsonUtils.toJson(metaDto.getOutputFields()));

                        op.setSupplier(soap);
                        return op;
                    })
                    .collect(Collectors.toList());
                operationMetaRepository.saveAll(ops);
                soap.setOperations(ops);
            }
        }

        return SupplierMapper.toDto(supplierRepository.save(supplier));
    }

    @Override
    @Transactional
    public void deleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
        
        try {
            // Check for existing orders with this supplier's products
            List<Product> products = productRepository.findBySupplierId(id);
            if (!products.isEmpty()) {
                // Check if any products are in active orders
                boolean hasActiveOrders = products.stream()
                    .anyMatch(product -> {
                        // Check if product is in any order items
                        return orderItemRepository.existsByProductId(product.getId());
                    });
                
                if (hasActiveOrders) {
                    throw new IllegalStateException(
                        "Cannot delete supplier '" + supplier.getName() + 
                        "'. Supplier has products that are part of existing orders. " +
                        "Please deactivate the supplier instead of deleting it."
                    );
                }
                
                log.warn("Supplier '{}' has {} associated products. Proceeding with cascade deletion.", 
                         supplier.getName(), products.size());
                
                // Delete all products associated with this supplier
                for (Product product : products) {
                    log.debug("Deleting product: {} (ID: {})", product.getName(), product.getId());
                    productRepository.delete(product);
                }
                log.info("Deleted {} products associated with supplier '{}'", products.size(), supplier.getName());
            }
            
            // Delete supplier (this will also cascade delete import logs and operation metadata)
            supplierRepository.deleteById(id);
            log.info("Supplier '{}' deleted successfully", supplier.getName());
            
        } catch (IllegalStateException e) {
            // Re-throw IllegalStateException as-is to preserve the 409 status
            log.warn("Cannot delete supplier '{}': {}", supplier.getName(), e.getMessage());
            throw e;
        } catch (Exception e) {
            log.error("Failed to delete supplier '{}': {}", supplier.getName(), e.getMessage());
            throw new RuntimeException("Failed to delete supplier: " + e.getMessage(), e);
        }
        
    }

    @Override
    @Transactional
    public void forceDeleteSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
        
        try {
            log.warn("Force deleting supplier '{}' - this will delete all associated data", supplier.getName());
            
            // 1. Delete all payments associated with this supplier
            List<Payment> payments = paymentRepository.findBySupplierId(id);
            if (!payments.isEmpty()) {
                log.warn("Force deleting {} payments associated with supplier '{}'", payments.size(), supplier.getName());
                paymentRepository.deleteAll(payments);
            }
            
            // 2. Delete all supplier payments associated with this supplier
            List<SupplierPayment> supplierPayments = supplierPaymentRepository.findBySupplierId(id);
            if (!supplierPayments.isEmpty()) {
                log.warn("Force deleting {} supplier payments associated with supplier '{}'", supplierPayments.size(), supplier.getName());
                supplierPaymentRepository.deleteAll(supplierPayments);
            }
            
            // 3. Delete all products associated with this supplier
            List<Product> products = productRepository.findBySupplierId(id);
            if (!products.isEmpty()) {
                log.warn("Force deleting {} products associated with supplier '{}'", products.size(), supplier.getName());
                for (Product product : products) {
                    productRepository.delete(product);
                }
            }
            
            // 4. Delete supplier (this will also cascade delete import logs and operation metadata)
            supplierRepository.deleteById(id);
            log.info("Supplier '{}' force deleted successfully", supplier.getName());
            
        } catch (Exception e) {
            log.error("Failed to force delete supplier '{}': {}", supplier.getName(), e.getMessage());
            throw new RuntimeException("Failed to force delete supplier: " + e.getMessage(), e);
        }
    }
    
    @Override
    @Transactional
    public void activateSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
        supplier.setActive(true);
        supplierRepository.save(supplier);
        
        // Activate all products associated with this supplier
        List<Product> products = productRepository.findBySupplierId(id);
        if (!products.isEmpty()) {
            log.info("Activating {} products for supplier '{}'", products.size(), supplier.getName());
            for (Product product : products) {
                product.setActive(true);
                productRepository.save(product);
            }
        }
        
        log.info("Supplier '{}' and all its products activated successfully", supplier.getName());
    }

    @Override
    @Transactional
    public void deactivateSupplier(Long id) {
        Supplier supplier = supplierRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
        supplier.setActive(false);
        supplierRepository.save(supplier);
        
        // Deactivate all products associated with this supplier
        List<Product> products = productRepository.findBySupplierId(id);
        if (!products.isEmpty()) {
            log.info("Deactivating {} products for supplier '{}'", products.size(), supplier.getName());
            for (Product product : products) {
                product.setActive(false);
                productRepository.save(product);
            }
        }
        
        log.info("Supplier '{}' and all its products deactivated successfully", supplier.getName());
    }

    @Override
    public SupplierDto createSupplierAutoSoap(SupplierDto dto) {
        // Validate that this is a SOAP supplier
        if (!"SOAP".equalsIgnoreCase(dto.getType())) {
            throw new IllegalArgumentException("Auto-SOAP creation is only for SOAP suppliers");
        }

        // Create the SOAP supplier without operations first
        SoapSupplier soapSupplier = new SoapSupplier();
        soapSupplier.setName(dto.getName());
        soapSupplier.setContactEmail(dto.getContactEmail());
        soapSupplier.setActive(dto.isActive());
        soapSupplier.setCreated(LocalDateTime.now());
        soapSupplier.setWsdlUrl(dto.getWsdlUrl());
        soapSupplier.setNamespace(dto.getNamespace());
        soapSupplier.setUsername(dto.getUsername());
        soapSupplier.setPassword(dto.getPassword());
        // Optional payment-related selections
        soapSupplier.setPaymentOperationName(dto.getPaymentOperationName());
        soapSupplier.setRefundOperationName(dto.getRefundOperationName());
        soapSupplier.setSuccessOperationName(dto.getSuccessOperationName());
        
        // Common payment configuration
        soapSupplier.setHasOwnPaymentSystem(dto.isHasOwnPaymentSystem());
        
        // Explicitly set payment integration type for SOAP suppliers
        soapSupplier.setPaymentIntegrationType("SOAP");
        
        // Set autoPaymentEnabled from DTO if present, else default to TRUE
        if (dto.getAutoPaymentEnabled() != null) {
            soapSupplier.setAutoPaymentEnabled(dto.getAutoPaymentEnabled());
        } else {
            soapSupplier.setAutoPaymentEnabled(Boolean.TRUE);
        }
        
        // Set payment-specific configuration fields
        // Use existing wsdlUrl and operation names for payment if not specified separately
        if (dto.getWsdlUrl() != null && !dto.getWsdlUrl().trim().isEmpty()) {
            soapSupplier.setPaymentWsdlUrl(dto.getWsdlUrl()); // Use main wsdlUrl for payment
        }
        
        if (dto.getPaymentOperationName() != null && !dto.getPaymentOperationName().trim().isEmpty()) {
            soapSupplier.setPaymentOperationNameConfig(dto.getPaymentOperationName()); // Use main operation for payment
        }
        
        // Set default SOAP action if not provided
        soapSupplier.setSoapAction("http://tempuri.org/ProcessPayment");
        
        soapSupplier.setPaymentApiEndpoint(dto.getPaymentApiEndpoint());
        soapSupplier.setCommissionApiEndpoint(dto.getCommissionApiEndpoint());
        soapSupplier.setPayoutFrequency(dto.getPayoutFrequency());
        soapSupplier.setCustomPaymentSchedule(dto.getCustomPaymentSchedule());
        soapSupplier.setCustomPaymentDays(dto.getCustomPaymentDays());
        soapSupplier.setCustomPaymentHour(dto.getCustomPaymentHour());
        soapSupplier.setMinimumPaymentAmount(dto.getMinimumPaymentAmount());
        soapSupplier.setMaximumPaymentDelay(dto.getMaximumPaymentDelay());
        soapSupplier.setOperations(new ArrayList<>());

        // Save the supplier first
        SoapSupplier saved = (SoapSupplier) supplierRepository.save(soapSupplier);

        // Auto-fetch SOAP operations from WSDL
        try {
            autoFetchSoapOperations(saved);
        } catch (Exception e) {
            log.warn("Failed to auto-fetch SOAP operations for supplier {}: {}", saved.getName(), e.getMessage());
            // Don't fail the creation, just log the warning
        }

        return SupplierMapper.toDto(saved);
    }

    private void autoFetchSoapOperations(SoapSupplier soapSupplier) {
        try {
            log.info("Auto-fetching SOAP operations for supplier: {}", soapSupplier.getName());
            
            // Use WsdlFullMetadataUtils to parse WSDL and extract operations
            if (soapSupplier.getWsdlUrl() != null && !soapSupplier.getWsdlUrl().isEmpty()) {
                List<SoapOperationMeta> operations = WsdlFullMetadataUtils.getAllOperationMetadata(soapSupplier.getWsdlUrl());
                
                if (operations != null && !operations.isEmpty()) {
                    List<SoapSupplierOperationMeta> operationMetas = new ArrayList<>();
                    
                    for (SoapOperationMeta opMeta : operations) {
                        SoapSupplierOperationMeta supplierOpMeta = new SoapSupplierOperationMeta();
                        supplierOpMeta.setOperationName(opMeta.getOperationName());
                        supplierOpMeta.setInputElement(opMeta.getInputElement());
                        supplierOpMeta.setOutputElement(opMeta.getOutputElement());
                        supplierOpMeta.setSoapAction(opMeta.getSoapAction());
                        
                        // Convert input/output fields to JSON
                        if (opMeta.getInputFields() != null) {
                            supplierOpMeta.setInputFieldsJson(JsonUtils.toJson(opMeta.getInputFields()));
                        }
                        if (opMeta.getOutputFields() != null) {
                            supplierOpMeta.setOutputFieldsJson(JsonUtils.toJson(opMeta.getOutputFields()));
                        }
                        
                        supplierOpMeta.setSupplier(soapSupplier);
                        operationMetas.add(supplierOpMeta);
                    }
                    
                    // Save all operations
                    operationMetaRepository.saveAll(operationMetas);
                    soapSupplier.setOperations(operationMetas);
                    
                    // Update last metadata refresh timestamp
                    soapSupplier.setLastMetadataRefresh(LocalDateTime.now());
                    supplierRepository.save(soapSupplier);
                    
                    log.info("Successfully auto-fetched {} operations for SOAP supplier: {}", 
                            operationMetas.size(), soapSupplier.getName());
                } else {
                    log.warn("No operations found in WSDL for supplier: {}", soapSupplier.getName());
                }
            }
        } catch (Exception e) {
            log.error("Failed to auto-fetch SOAP operations for supplier {}: {}", 
                    soapSupplier.getName(), e.getMessage(), e);
            throw new RuntimeException("Failed to auto-fetch SOAP operations", e);
        }
    }

    @Override
    @Transactional
    public void importProductsFromSupplier(Long supplierId) {
        log.info("Starting product import for supplier ID: {}", supplierId);
        
        try {
            Supplier supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
            
            // Fetch products using the ProductFetcherFactory
            List<SupplierProductDto> supplierProducts = productFetcherFactory.fetch(supplier);
            
            if (supplierProducts.isEmpty()) {
                log.warn("No products found for supplier: {}", supplier.getName());
                return;
            }
            
            // Get or create default category
            Category defaultCategory = categoryRepository.findByName("Default")
                    .orElseGet(() -> {
                        Category newCategory = new Category();
                        newCategory.setName("Default");
                        newCategory.setDescription("Auto-created from import");
                        newCategory.setActive(true);
                        return categoryRepository.save(newCategory);
                    });
            
            int successCount = 0;
            int errorCount = 0;
            
            for (SupplierProductDto supplierProduct : supplierProducts) {
                try {
                    // Check if product already exists based on external ID
                    boolean productExists = productRepository.findByExternalProductIdAndSupplier(
                            supplierProduct.getExternalProductId(), supplier).isPresent();
                    
                    if (productExists) {
                        log.debug("Product already exists, skipping: {}", supplierProduct.getExternalProductId());
                        continue;
                    }
                    
                    Product product = new Product();
                    product.setName(supplierProduct.getName());
                    product.setDescription(supplierProduct.getDescription());
                    product.setSupplierPrice(supplierProduct.getPrice());
                    // Keep admin-defined displayed price; default to supplier price if new
                    product.setDisplayedPrice(supplierProduct.getPrice());
                    product.setSyncedStock(supplierProduct.getStock());
                    product.setExternalProductId(supplierProduct.getExternalProductId());
                    // Set supplierRef to the same value as externalProductId for consistency
                    product.setSupplierRef(supplierProduct.getExternalProductId());
                    product.setSupplier(supplier);
                    product.setCategory(defaultCategory);
                    product.setActive(false); // Set to inactive so they need admin approval
                    
                    // Handle image data (base64 or URL)
                    if (supplierProduct.getImageUrls() != null && !supplierProduct.getImageUrls().isEmpty()) {
                        // Use the image URLs from supplier product
                        product.setImageUrls(supplierProduct.getImageUrls());
                        log.debug("Added {} image(s) to product {}: {}", 
                                supplierProduct.getImageUrls().size(), product.getName(),
                                supplierProduct.getImageUrls().get(0).startsWith("data:") ? "base64 data" : "URL");
                    }
                    
                    productRepository.save(product);
                    successCount++;
                    
                    log.debug("Successfully imported product: {}", product.getName());
                    
                } catch (Exception e) {
                    log.error("Failed to import product '{}': {}", 
                            supplierProduct.getName(), e.getMessage());
                    errorCount++;
                }
            }
            
            log.info("Product import completed for supplier '{}': {} successful, {} errors", 
                    supplier.getName(), successCount, errorCount);
                    
        } catch (Exception e) {
            log.error("Failed to import products for supplier ID {}: {}", supplierId, e.getMessage(), e);
            throw new RuntimeException("Product import failed", e);
        }
    }

    @Override
    public boolean refreshSoapMetadata(Long supplierId) {
        log.info("Refreshing SOAP metadata for supplier ID: {}", supplierId);
        
        try {
            Supplier supplier = supplierRepository.findById(supplierId)
                    .orElseThrow(() -> new ResourceNotFoundException("Supplier not found"));
            
            if (!(supplier instanceof SoapSupplier)) {
                throw new IllegalArgumentException("Supplier is not a SOAP supplier");
            }
            
            SoapSupplier soapSupplier = (SoapSupplier) supplier;
            return soapMetadataRefreshService.refreshSupplierMetadata(soapSupplier);
            
        } catch (Exception e) {
            log.error("Failed to refresh SOAP metadata for supplier ID {}: {}", supplierId, e.getMessage(), e);
            return false;
        }
    }
}