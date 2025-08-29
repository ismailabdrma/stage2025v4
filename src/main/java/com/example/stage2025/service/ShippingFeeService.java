package com.example.stage2025.service;

import com.example.stage2025.entity.ShippingFee;
import com.example.stage2025.repository.ShippingFeeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ShippingFeeService {
    
    private final ShippingFeeRepository shippingFeeRepository;
    
    /**
     * Calculate shipping fee for a specific location and order amount
     */
    @Transactional(readOnly = true)
    public BigDecimal calculateShippingFee(String countryCode, String city, String postalCode, BigDecimal orderAmount) {
        log.info("Calculating shipping fee for country: {}, city: {}, postalCode: {}, orderAmount: {}", 
                countryCode, city, postalCode, orderAmount);
        
        try {
            // Find best matching shipping fee
            List<ShippingFee> matchingFees = shippingFeeRepository.findBestMatchingShippingFee(countryCode, city, postalCode);
            
            if (matchingFees.isEmpty()) {
                log.warn("No shipping fee found for country: {}, city: {}, postalCode: {}", countryCode, city, postalCode);
                return BigDecimal.ZERO;
            }
            
            ShippingFee bestFee = matchingFees.get(0);
            log.info("Found shipping fee: {} {} (priority: {})", bestFee.getBaseFee(), bestFee.getCurrency(), bestFee.getPriority());
            
            // Check if free shipping applies
            if (bestFee.getFreeShippingThreshold() != null && 
                orderAmount.compareTo(bestFee.getFreeShippingThreshold()) >= 0) {
                log.info("Free shipping applies for order amount: {} >= {}", orderAmount, bestFee.getFreeShippingThreshold());
                return BigDecimal.ZERO;
            }
            
            // Check minimum order amount
            if (bestFee.getMinOrderAmount() != null && 
                orderAmount.compareTo(bestFee.getMinOrderAmount()) < 0) {
                log.warn("Order amount {} is below minimum {} for shipping", orderAmount, bestFee.getMinOrderAmount());
                throw new IllegalArgumentException("Order amount is below minimum required for shipping");
            }
            
            return bestFee.getBaseFee();
        } catch (Exception e) {
            log.error("Error calculating shipping fee for country: {}, city: {}, postalCode: {}. Error: {}", 
                     countryCode, city, postalCode, e.getMessage(), e);
            
            // Return default shipping fee based on country
            if ("MA".equals(countryCode)) {
                log.info("Using default shipping fee for Morocco: 25.00 MAD");
                return new BigDecimal("25.00");
            } else if ("FR".equals(countryCode)) {
                log.info("Using default shipping fee for France: 5.99 EUR");
                return new BigDecimal("5.99");
            } else {
                log.info("Using default shipping fee for other countries: 9.99 EUR");
                return new BigDecimal("9.99");
            }
        }
    }
    
    /**
     * Get shipping fee details for a location
     */
    @Transactional(readOnly = true)
    public Optional<ShippingFee> getShippingFeeDetails(String countryCode, String city, String postalCode) {
        List<ShippingFee> matchingFees = shippingFeeRepository.findBestMatchingShippingFee(countryCode, city, postalCode);
        return matchingFees.stream().findFirst();
    }
    
    /**
     * Get all shipping fees for a country
     */
    @Transactional(readOnly = true)
    public List<ShippingFee> getShippingFeesByCountry(String countryCode) {
        return shippingFeeRepository.findByCountryCodeAndIsActiveTrueOrderByPriorityAsc(countryCode);
    }
    
    /**
     * Get all active shipping fees
     */
    @Transactional(readOnly = true)
    public List<ShippingFee> getAllActiveShippingFees() {
        return shippingFeeRepository.findByIsActiveTrueOrderByCountryCodeAscPriorityAsc();
    }
    
    /**
     * Create new shipping fee
     */
    @Transactional
    public ShippingFee createShippingFee(ShippingFee shippingFee) {
        log.info("Creating shipping fee for country: {} {}, base fee: {} {}", 
                shippingFee.getCountryCode(), shippingFee.getCountryName(), 
                shippingFee.getBaseFee(), shippingFee.getCurrency());
        
        // Validate unique constraints
        validateShippingFeeConstraints(shippingFee);
        
        ShippingFee saved = shippingFeeRepository.save(shippingFee);
        log.info("Created shipping fee with ID: {}", saved.getId());
        return saved;
    }
    
    /**
     * Update existing shipping fee
     */
    @Transactional
    public ShippingFee updateShippingFee(Long id, ShippingFee shippingFee) {
        log.info("Updating shipping fee with ID: {}", id);
        
        ShippingFee existing = shippingFeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Shipping fee not found with ID: " + id));
        
        // Update fields
        existing.setCountryCode(shippingFee.getCountryCode());
        existing.setCountryName(shippingFee.getCountryName());
        existing.setRegion(shippingFee.getRegion());
        existing.setCity(shippingFee.getCity());
        existing.setPostalCodeFrom(shippingFee.getPostalCodeFrom());
        existing.setPostalCodeTo(shippingFee.getPostalCodeTo());
        existing.setBaseFee(shippingFee.getBaseFee());
        existing.setCurrency(shippingFee.getCurrency());
        existing.setMinOrderAmount(shippingFee.getMinOrderAmount());
        existing.setFreeShippingThreshold(shippingFee.getFreeShippingThreshold());
        existing.setDeliveryTimeDays(shippingFee.getDeliveryTimeDays());
        existing.setIsActive(shippingFee.getIsActive());
        existing.setPriority(shippingFee.getPriority());
        existing.setNotes(shippingFee.getNotes());
        
        // Validate constraints
        validateShippingFeeConstraints(existing);
        
        ShippingFee updated = shippingFeeRepository.save(existing);
        log.info("Updated shipping fee with ID: {}", updated.getId());
        return updated;
    }
    
    /**
     * Delete shipping fee
     */
    @Transactional
    public void deleteShippingFee(Long id) {
        log.info("Deleting shipping fee with ID: {}", id);
        
        if (!shippingFeeRepository.existsById(id)) {
            throw new IllegalArgumentException("Shipping fee not found with ID: " + id);
        }
        
        shippingFeeRepository.deleteById(id);
        log.info("Deleted shipping fee with ID: {}", id);
    }
    
    /**
     * Toggle shipping fee active status
     */
    @Transactional
    public ShippingFee toggleShippingFeeStatus(Long id) {
        log.info("Toggling shipping fee status for ID: {}", id);
        
        ShippingFee shippingFee = shippingFeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Shipping fee not found with ID: " + id));
        
        shippingFee.setIsActive(!shippingFee.getIsActive());
        ShippingFee updated = shippingFeeRepository.save(shippingFee);
        
        log.info("Shipping fee {} is now {}", updated.getId(), 
                updated.getIsActive() ? "active" : "inactive");
        
        return updated;
    }
    
    /**
     * Get shipping fee by ID
     */
    @Transactional(readOnly = true)
    public Optional<ShippingFee> getShippingFeeById(Long id) {
        return shippingFeeRepository.findById(id);
    }
    
    /**
     * Get shipping fees by currency
     */
    @Transactional(readOnly = true)
    public List<ShippingFee> getShippingFeesByCurrency(String currency) {
        return shippingFeeRepository.findByCurrencyAndIsActiveTrueOrderByCountryCodeAsc(currency);
    }
    
    /**
     * Get delivery time estimate
     */
    @Transactional(readOnly = true)
    public Integer getDeliveryTimeEstimate(String countryCode, String city, String postalCode) {
        Optional<ShippingFee> fee = getShippingFeeDetails(countryCode, city, postalCode);
        return fee.map(ShippingFee::getDeliveryTimeDays).orElse(null);
    }
    
    /**
     * Check if free shipping is available
     */
    @Transactional(readOnly = true)
    public boolean isFreeShippingAvailable(String countryCode, BigDecimal orderAmount) {
        List<ShippingFee> freeShippingOptions = shippingFeeRepository.findFreeShippingOptions(countryCode, orderAmount);
        return !freeShippingOptions.isEmpty();
    }
    
    /**
     * Validate shipping fee constraints
     */
    private void validateShippingFeeConstraints(ShippingFee shippingFee) {
        // Check for overlapping postal code ranges
        if (shippingFee.getPostalCodeFrom() != null && shippingFee.getPostalCodeTo() != null) {
            if (shippingFee.getPostalCodeFrom().compareTo(shippingFee.getPostalCodeTo()) > 0) {
                throw new IllegalArgumentException("Postal code from must be less than or equal to postal code to");
            }
        }
        
        // Check for negative amounts
        if (shippingFee.getBaseFee().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Base fee cannot be negative");
        }
        
        if (shippingFee.getMinOrderAmount() != null && 
            shippingFee.getMinOrderAmount().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Minimum order amount cannot be negative");
        }
        
        if (shippingFee.getFreeShippingThreshold() != null && 
            shippingFee.getFreeShippingThreshold().compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Free shipping threshold cannot be negative");
        }
    }
    
    /**
     * Initialize default shipping fees for common countries
     */
    @Transactional
    public void initializeDefaultShippingFees() {
        log.info("Initializing default shipping fees");
        
        if (shippingFeeRepository.count() > 0) {
            log.info("Shipping fees already exist, skipping initialization");
            return;
        }
        
        // Morocco
        createShippingFee(ShippingFee.builder()
                .countryCode("MA")
                .countryName("Maroc")
                .baseFee(new BigDecimal("25.00"))
                .currency("MAD")
                .deliveryTimeDays(3)
                .priority(1)
                .isActive(true)
                .notes("Livraison standard au Maroc")
                .build());
        
        // France
        createShippingFee(ShippingFee.builder()
                .countryCode("FR")
                .countryName("France")
                .baseFee(new BigDecimal("5.99"))
                .currency("EUR")
                .deliveryTimeDays(2)
                .priority(1)
                .isActive(true)
                .notes("Livraison standard en France")
                .build());
        
        // Belgium
        createShippingFee(ShippingFee.builder()
                .countryCode("BE")
                .countryName("Belgique")
                .baseFee(new BigDecimal("7.99"))
                .currency("EUR")
                .deliveryTimeDays(3)
                .priority(1)
                .isActive(true)
                .notes("Livraison standard en Belgique")
                .build());
        
        log.info("Default shipping fees initialized");
    }
}
