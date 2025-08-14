package com.example.stage2025.controller;

import com.example.stage2025.dto.CartDto;
import com.example.stage2025.dto.CartItemDto;
import com.example.stage2025.service.CartService;
import com.example.stage2025.service.ShippingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final ShippingService shippingService;

    private Long resolveClientId(Authentication auth, Long userIdAttr) {
        if (userIdAttr != null) return userIdAttr;
        try {
            return Long.valueOf(auth.getName());
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid authenticated user id");
        }
    }

    /** 1. Get current cart */
    @GetMapping
    public ResponseEntity<CartDto> getCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr) {
        Long clientId = resolveClientId(auth, userIdAttr);
        return ResponseEntity.ok(cartService.getCartByClientId(clientId));
    }

    /** 2. Add item to cart */
    @PostMapping("/add")
    public ResponseEntity<CartDto> addItem(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody CartItemDto itemDto) {
        Long clientId = resolveClientId(auth, userIdAttr);
        return ResponseEntity.ok(cartService.addItemToCart(clientId, itemDto));
    }

    /** 3. Update item quantity */
    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartDto> updateItem(Authentication auth, @PathVariable Long cartItemId, @RequestParam int quantity) {
        return ResponseEntity.ok(cartService.updateItemQuantity(cartItemId, quantity));
    }

    /** 4. Remove item from cart */
    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<?> removeItem(Authentication auth, @PathVariable Long cartItemId) {
        cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.noContent().build();
    }

    /** 5. Clear all items from cart */
    @DeleteMapping("/clear")
    public ResponseEntity<?> clearCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr) {
        Long clientId = resolveClientId(auth, userIdAttr);
        cartService.clearCart(clientId);
        return ResponseEntity.noContent().build();
    }

    /** 6. Add item to cart (new format with variant support) */
    @PostMapping("/items")
    public ResponseEntity<CartDto> addItemWithVariant(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody CartItemDto itemDto) {
        Long clientId = resolveClientId(auth, userIdAttr);
        return ResponseEntity.ok(cartService.addItemToCart(clientId, itemDto));
    }

    /** 7. Update item quantity (new format) */
    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<CartDto> updateItemQuantity(Authentication auth, @PathVariable Long cartItemId, @RequestBody Map<String, Object> payload) {
        int quantity = (Integer) payload.get("quantity");
        return ResponseEntity.ok(cartService.updateItemQuantity(cartItemId, quantity));
    }

    /** 8. Remove item from cart (new format returning updated cart) */
    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<CartDto> removeItemReturnCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @PathVariable Long cartItemId) {
        Long clientId = resolveClientId(auth, userIdAttr);
        cartService.removeItemFromCart(cartItemId);
        return ResponseEntity.ok(cartService.getCartByClientId(clientId));
    }

    /** 9. Merge guest cart with user cart after login */
    @PostMapping("/merge")
    public ResponseEntity<CartDto> mergeGuestCart(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> payload) {
        Long clientId = resolveClientId(auth, userIdAttr);
        
        @SuppressWarnings("unchecked")
        List<Map<String, Object>> guestCartItems = (List<Map<String, Object>>) payload.get("guestCartItems");
        
        // Convert guest cart items to CartItemDto
        for (Map<String, Object> guestItem : guestCartItems) {
            CartItemDto itemDto = new CartItemDto();
            itemDto.setProductId(((Number) guestItem.get("productId")).longValue());
            itemDto.setQuantity(((Number) guestItem.get("quantity")).intValue());
            itemDto.setUnitPrice(((Number) guestItem.get("price")).doubleValue());
            
            // Add to cart (will merge if item already exists)
            cartService.addItemToCart(clientId, itemDto);
        }
        
        return ResponseEntity.ok(cartService.getCartByClientId(clientId));
    }

    /** 10. Get cart item count for badge */
    @GetMapping("/count")
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
    public ResponseEntity<CartDto> applyCoupon(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, String> payload) {
        Long clientId = resolveClientId(auth, userIdAttr);
        // String couponCode = payload.get("code"); // reserved for future use
        // TODO: Implement coupon logic
        return ResponseEntity.ok(cartService.getCartByClientId(clientId));
    }

    /** 12. Get shipping quote for cart */
    @PostMapping("/shipping-quote")
    public ResponseEntity<Map<String, Object>> getShippingQuote(Authentication auth, @RequestAttribute(name = "userId", required = false) Long userIdAttr, @RequestBody Map<String, Object> payload) {
        Long clientId = resolveClientId(auth, userIdAttr);
        Long addressId = ((Number) payload.get("addressId")).longValue();
        return ResponseEntity.ok(shippingService.getQuote(clientId, addressId));
    }
}