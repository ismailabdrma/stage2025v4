package com.example.stage2025.repository;

import com.example.stage2025.entity.ShippingFee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface ShippingFeeRepository extends JpaRepository<ShippingFee, Long> {
    
    // Find by country code
    List<ShippingFee> findByCountryCodeAndIsActiveTrueOrderByPriorityAsc(String countryCode);
    
    // Find by country and city
    List<ShippingFee> findByCountryCodeAndCityAndIsActiveTrueOrderByPriorityAsc(String countryCode, String city);
    
    // Find by country and region
    List<ShippingFee> findByCountryCodeAndRegionAndIsActiveTrueOrderByPriorityAsc(String countryCode, String region);
    
    // Find by postal code range
    @Query("SELECT sf FROM ShippingFee sf WHERE sf.countryCode = :countryCode " +
           "AND sf.isActive = true " +
           "AND sf.postalCodeFrom <= :postalCode " +
           "AND sf.postalCodeTo >= :postalCode " +
           "ORDER BY sf.priority ASC")
    List<ShippingFee> findByCountryAndPostalCodeRange(
        @Param("countryCode") String countryCode, 
        @Param("postalCode") String postalCode
    );
    
    // Find best matching shipping fee for a location
    @Query("SELECT sf FROM ShippingFee sf WHERE sf.countryCode = :countryCode " +
           "AND sf.isActive = true " +
           "AND (:city IS NULL OR sf.city = :city) " +
           "AND (:postalCode IS NULL OR (sf.postalCodeFrom <= :postalCode AND sf.postalCodeTo >= :postalCode)) " +
           "ORDER BY sf.priority ASC, sf.baseFee ASC")
    List<ShippingFee> findBestMatchingShippingFee(
        @Param("countryCode") String countryCode,
        @Param("city") String city,
        @Param("postalCode") String postalCode
    );
    
    // Find by minimum order amount
    List<ShippingFee> findByCountryCodeAndMinOrderAmountLessThanEqualAndIsActiveTrueOrderByPriorityAsc(
        String countryCode, BigDecimal orderAmount);
    
    // Find all active shipping fees
    List<ShippingFee> findByIsActiveTrueOrderByCountryCodeAscPriorityAsc();
    
    // Find by country code (all, including inactive)
    List<ShippingFee> findByCountryCodeOrderByPriorityAsc(String countryCode);
    
    // Check if free shipping applies
    @Query("SELECT sf FROM ShippingFee sf WHERE sf.countryCode = :countryCode " +
           "AND sf.isActive = true " +
           "AND sf.freeShippingThreshold IS NOT NULL " +
           "AND sf.freeShippingThreshold <= :orderAmount " +
           "ORDER BY sf.priority ASC")
    List<ShippingFee> findFreeShippingOptions(
        @Param("countryCode") String countryCode, 
        @Param("orderAmount") BigDecimal orderAmount
    );
    
    // Find by currency
    List<ShippingFee> findByCurrencyAndIsActiveTrueOrderByCountryCodeAsc(String currency);
    
    // Count by country
    long countByCountryCode(String countryCode);
    
    // Find by delivery time
    List<ShippingFee> findByDeliveryTimeDaysLessThanEqualAndIsActiveTrueOrderByPriorityAsc(Integer maxDays);
}

