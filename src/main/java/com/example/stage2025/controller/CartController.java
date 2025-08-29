package com.example.stage2025.controller;

import com.example.stage2025.dto.CartDto;
import com.example.stage2025.dto.CartItemDto;
import com.example.stage2025.service.CartService;
import com.example.stage2025.service.ShippingService;
import com.example.stage2025.entity.User;
import com.example.stage2025.enums.Role;
import com.example.stage2025.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private static final Logger log = LoggerFactory.getLogger(CartController.class);

    private final CartService cartService;
    private final ShippingService shippingService;
    private final UserRepository userRepository;

    private Long resolveClientId(Authentication auth, Long userIdAttr) {
        Long userId = userIdAttr;
        if (userId == null) {
            try {
                userId = Long.valueOf(auth.getName());
            } catch (Exception e) {
                throw new IllegalArgumentException("Invalid authenticated user id");
            }
        }
        
        // Check if user exists and is a CLIENT
        final Long finalUserId = userId; // Make it effectively final for lambda
        User user = userRepository.findById(finalUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + finalUserId));
        
        if (user.getRole() != Role.CLIENT) {
            throw new IllegalArgumentException("Cart access is only available for client users. User with ID " + finalUserId + " has role: " + user.getRole());
        }
        
        return finalUserId;
    }

    /** 1. Get current cart - accessible to both authenticated clients and guests */
    @GetMapping
    @PreAuthorize("hasRole('CLIENT') or isAnonymous()")
    public ResponseEntity<CartDto> getCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr) {
        // If user is authenticated and has CLIENT role, return their cart
        if (auth != null && auth.isAuthenticated() && userIdAttr != null) {
            try {
                Long clientId = resolveClientId(auth, userIdAttr);
                log.info("Getting cart for authenticated client: {}", clientId);
                return ResponseEntity.ok(cartService.getCartByClientId(clientId));
            } catch (Exception e) {
                log.warn("Failed to get authenticated user cart: {}", e.getMessage());
                // Return empty cart for guests
                return ResponseEntity.ok(new CartDto());
            }
        }
        
        // Return empty cart for guests or unauthenticated users
        log.info("Returning empty cart for guest/unauthenticated user");
        return ResponseEntity.ok(new CartDto());
    }

    /** 2. Add item to cart */
    @PostMapping("/add")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<CartDto> addItem(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody CartItemDto itemDto) {
        Long clientId = resolveClientId(auth, userIdAttr);
        return ResponseEntity.ok(cartService.addItemToCart(clientId, itemDto));
    }

    /** 3. Update item quantity */
    @PutMapping("/item/{cartItemId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<CartDto> updateItem(Authentication auth, @PathVariable Long cartItemId, @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(cartItemId, quantity));
    }

    /** 4. Remove item from cart */
    @DeleteMapping("/item/{cartItemId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<?> removeItem(Authentication auth, @PathVariable Long cartItemId) {
        cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

    /** 5. Clear all items from cart */
    @DeleteMapping("/clear")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<?> clearCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr) {
        Long clientId = resolveClientId(auth, userIdAttr);
        cartService.clearCart(clientId);
        return ResponseEntity.noContent().build();
    }

    /** 6. Add item to cart (new format with variant support) */
    @PostMapping("/items")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<CartDto> addItemWithVariant(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody CartItemDto itemDto) {
        Long clientId = resolveClientId(auth, userIdAttr);
        return ResponseEntity.ok(cartService.addItemToCart(clientId, itemDto));
    }

    /** 7. Update item quantity (new format) */
    @PutMapping("/items/{cartItemId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<CartDto> updateItemQuantity(Authentication auth, @PathVariable Long cartItemId, @RequestBody Map<String, Object> payload) {
        int quantity = (Integer) payload.get("quantity");
        return ResponseEntity.ok(cartService.updateItemQuantity(cartItemId, quantity));
    }

    /** 8. Remove item from cart (new format returning updated cart) */
    @DeleteMapping("/items/{cartItemId}")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<CartDto> removeItemReturnCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @PathVariable Long cartItemId) {
        Long clientId = resolveClientId(auth, userIdAttr);
        cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.ok(cartService.getCartByClientId(clientId));
    }

    /** 9. Guest cart operations (no authentication required) */
    
    /** Get guest cart from session */
    @GetMapping("/guest")
    public ResponseEntity<Map<String, Object>> getGuestCart(HttpSession session) {
        @SuppressWarnings("unchecked")
        Map<String, Object> guestCart = (Map<String, Object>) session.getAttribute("guestCart");
        if (guestCart == null) {
            guestCart = Map.of("items", new ArrayList<>(), "total", 0.0);
        }
        return ResponseEntity.ok(guestCart);
    }
    
    /** Add item to guest cart */
    @PostMapping("/guest/add")
    public ResponseEntity<Map<String, Object>> addToGuestCart(HttpSession session, @RequestBody Map<String, Object> item) {
        @SuppressWarnings("unchecked")
        Map<String, Object> guestCart = (Map<String, Object>) session.getAttribute("guestCart");
        if (guestCart == null) {
            guestCart = new HashMap<>();
            guestCart.put("items", new ArrayList<>());
            guestCart.put("total", 0.0);
        }
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> items = (List<Map<String, Object>>) guestCart.get("items");
        items.add(item);
        
        // Recalculate total
        double total = items.stream()
            .mapToDouble(itemMap -> {
                Object price = itemMap.get("price");
                Object quantity = itemMap.get("quantity");
                if (price instanceof Number && quantity instanceof Number) {
                    return ((Number) price).doubleValue() * ((Number) quantity).intValue();
                }
                return 0.0;
            })
            .sum();
        
        guestCart.put("total", total);
        session.setAttribute("guestCart", guestCart);
        
        return ResponseEntity.ok(guestCart);
    }
    
    /** Clear guest cart */
    @DeleteMapping("/guest/clear")
    public ResponseEntity<Map<String, Object>> clearGuestCart(HttpSession session) {
        session.removeAttribute("guestCart");
        return ResponseEntity.ok(Map.of("items", new ArrayList<>(), "total", 0.0));
    }

    /** 10. Merge guest cart with user cart after login */
    @PostMapping("/merge")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<CartDto> mergeGuestCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> payload) {
        Long clientId = resolveClientId(auth, userIdAttr);
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> guestCartItems = (List<Map<String, Object>>) payload.get("guestCartItems");
        
        // Convert guest cart items to CartItemDto
        for (Map<String, Object> guestItem : guestCartItems) {
            CartItemDto itemDto = new CartItemDto();
            
            // Fix: Add null checks for all fields
            Object productIdObj = guestItem.get("productId");
            Object quantityObj = guestItem.get("quantity");
            Object priceObj = guestItem.get("price");
            
            if (productIdObj == null || quantityObj == null || priceObj == null) {
                log.warn("Skipping invalid guest cart item: {}", guestItem);
                continue; // Skip invalid items
            }
            
            itemDto.setProductId(((Number) productIdObj).longValue());
            itemDto.setQuantity(((Number) quantityObj).intValue());
            itemDto.setUnitPrice(((Number) priceObj).doubleValue());
            
            // Add to cart (will merge if item already exists)
            cartService.addItemToCart(clientId, itemDto);
        }
        
        return ResponseEntity.ok(cartService.getCartByClientId(clientId));
    }

    /** 10. Get cart item count for badge */
    @GetMapping("/count")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Integer>> getCartItemCount(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr) {
        Long clientId = resolveClientId(auth, userIdAttr);
        CartDto cart = cartService.getCartByClientId(clientId);
        int itemCount = cart.getItems().stream()
                .mapToInt(CartItemDto::getQuantity)
                .sum();
        return ResponseEntity.ok(Map.of("count", itemCount));
    }

    /** 11. Apply coupon code */
    @PostMapping("/apply-coupon")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<CartDto> applyCoupon(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, String> payload) {
        Long clientId = resolveClientId(auth, userIdAttr);
        // String couponCode = payload.get("code"); // reserved for future use
        // TODO: Implement coupon logic
        return ResponseEntity.ok(cartService.getCartByClientId(clientId));
    }

    /** 12. Get shipping quote for cart */
    @PostMapping("/shipping-quote")
    @PreAuthorize("hasRole('CLIENT')")
    public ResponseEntity<Map<String, Object>> getShippingQuote(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> payload) {
        Long clientId = resolveClientId(auth, userIdAttr);
        
        // Fix: Add null check for addressId
        Object addressIdObj = payload.get("addressId");
        if (addressIdObj == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "addressId is required"));
        }
        
        Long addressId = ((Number) addressIdObj).longValue();
        return ResponseEntity.ok(shippingService.getQuote(clientId, addressId));
    }
}