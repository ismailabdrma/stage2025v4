package com.example.stage2025.service;

import com.example.stage2025.entity.Cart;
import com.example.stage2025.entity.CartItem;
import com.example.stage2025.entity.Product;
import com.example.stage2025.repository.CartRepository;
import com.example.stage2025.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class ReservationCleanupService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    // Runs every 2 hours: releases reserved stock for carts not updated in last 24h
    @Scheduled(fixedDelay = 7_200_000)
    public void releaseStaleReservations() {
        try {
            LocalDateTime threshold = LocalDateTime.now().minusHours(24);
            for (Cart cart : cartRepository.findAll()) {
                if (cart.getLastUpdated() != null && cart.getLastUpdated().isBefore(threshold)) {
                    if (cart.getItems() == null) continue;
                    for (CartItem item : cart.getItems()) {
                        Product p = item.getProduct();
                        Integer reserved = p.getReservedStock() != null ? p.getReservedStock() : 0;
                        p.setReservedStock(Math.max(0, reserved - item.getQuantity()));
                        productRepository.save(p);
                    }
                    // Optionally clear the cart items
                    // cart.getItems().clear();
                    cart.setLastUpdated(LocalDateTime.now());
                    cartRepository.save(cart);
                }
            }
        } catch (Exception e) {
            log.error("Failed reservation cleanup: {}", e.getMessage());
        }
    }
}


