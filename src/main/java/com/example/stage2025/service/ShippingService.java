package com.example.stage2025.service;

import java.util.Map;

public interface ShippingService {
    Map<String, Object> getQuote(Long clientId, Long addressId);
    Map<String, Object> getTracking(String trackingNumber);
}


