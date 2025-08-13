package com.example.stage2025.service.impl;

import com.example.stage2025.dto.CartDto;
import com.example.stage2025.dto.CartItemDto;
import com.example.stage2025.entity.*;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.exception.InsufficientStockException;
import com.example.stage2025.mapper.CartMapper;
import com.example.stage2025.repository.*;
import com.example.stage2025.service.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;

import java.time.LocalDateTime;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;
import java.util.Optional;
import java.util.Set;
import java.util.Map;

@Service("enterpriseCartService")
@RequiredArgsConstructor
@Slf4j
public class EnterpriseCartService implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;
    private final ClientRepository clientRepository;

    // In-memory locks for cart operations (in production, use Redis distributed locks)
    private final Map<Long, ReentrantLock> cartLocks = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> sessionActivity = new ConcurrentHashMap<>();

    // Enterprise-specific helper method
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public CartDto addToCart(Long clientId, Long productId, int quantity) {
        ReentrantLock cartLock = cartLocks.computeIfAbsent(clientId, k -> new ReentrantLock());
        
        try {
            cartLock.lock();
            log.info("Adding {} units of product {} to cart for client {}", quantity, productId, clientId);
            
            // Track session activity for concurrent user monitoring
            trackSessionActivity(clientId);
            
            // Validate client exists
            Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client non trouvé"));
            
            // Validate product exists and check stock
            Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé"));
            
            validateProductAvailability(product, quantity);
            
            // Get or create cart
            Cart cart = cartRepository.findByClientId(clientId)
                .orElseGet(() -> createNewCart(client));
            
            // Check if product already in cart
            Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst();
            
            if (existingItem.isPresent()) {
                // Update existing item
                CartItem item = existingItem.get();
                int newQuantity = item.getQuantity() + quantity;
                
                // Re-validate stock with new total quantity
                validateProductAvailability(product, newQuantity);
                
                // Reserve the additional quantity
                int deltaReserve = newQuantity - item.getQuantity();
                if (deltaReserve > 0) {
                    int currentReserved = product.getReservedStock() != null ? product.getReservedStock() : 0;
                    product.setReservedStock(currentReserved + deltaReserve);
                    productRepository.save(product);
                }

                item.setQuantity(newQuantity);
                item.setLastUpdated(LocalDateTime.now());
                cartItemRepository.save(item);
                
                log.info("Updated cart item quantity to {} for product {}", newQuantity, product.getName());
            } else {
                // Add new item
                // Reserve quantity for new item
                int currentReserved = product.getReservedStock() != null ? product.getReservedStock() : 0;
                product.setReservedStock(currentReserved + quantity);
                productRepository.save(product);

                CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .productName(product.getName())
                    .quantity(quantity)
                    .unitPrice(product.getDisplayedPrice())
                    .lastUpdated(LocalDateTime.now())
                    .build();
                
                cart.getItems().add(newItem);
                cartItemRepository.save(newItem);
                
                log.info("Added new cart item: {} x{} for client {}", product.getName(), quantity, clientId);
            }
            
            // Update cart totals
            updateCartTotals(cart);
            cart.setLastUpdated(LocalDateTime.now());
            Cart savedCart = cartRepository.save(cart);
            
            return CartMapper.toDto(savedCart);
            
        } catch (Exception e) {
            log.error("Failed to add product {} to cart for client {}: {}", productId, clientId, e.getMessage());
            throw e;
        } finally {
            cartLock.unlock();
        }
    }

    // Enterprise-specific helper method
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public CartDto updateCartItem(Long clientId, Long productId, int quantity) {
        ReentrantLock cartLock = cartLocks.computeIfAbsent(clientId, k -> new ReentrantLock());
        
        try {
            cartLock.lock();
            log.info("Updating cart item for client {}, product {}, new quantity {}", clientId, productId, quantity);
            
            trackSessionActivity(clientId);
            
            Cart cart = cartRepository.findByClientId(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Panier non trouvé"));
            
            CartItem item = cart.getItems().stream()
                .filter(cartItem -> cartItem.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé dans le panier"));
            
            if (quantity <= 0) {
                // Remove item if quantity is 0 or negative
                // Release reserved stock
                int currentReserved = item.getProduct().getReservedStock() != null ? item.getProduct().getReservedStock() : 0;
                item.getProduct().setReservedStock(Math.max(0, currentReserved - item.getQuantity()));
                productRepository.save(item.getProduct());

                cart.getItems().remove(item);
                cartItemRepository.delete(item);
                log.info("Removed product {} from cart", item.getProductName());
            } else {
                // Validate new quantity against stock
                validateProductAvailability(item.getProduct(), quantity);
                
                // Adjust reservation to match new quantity
                int currentReserved = item.getProduct().getReservedStock() != null ? item.getProduct().getReservedStock() : 0;
                int delta = quantity - item.getQuantity();
                if (delta != 0) {
                    item.getProduct().setReservedStock(Math.max(0, currentReserved + delta));
                    productRepository.save(item.getProduct());
                }

                item.setQuantity(quantity);
                item.setLastUpdated(LocalDateTime.now());
                cartItemRepository.save(item);
                log.info("Updated cart item quantity to {}", quantity);
            }
            
            updateCartTotals(cart);
            cart.setLastUpdated(LocalDateTime.now());
            Cart savedCart = cartRepository.save(cart);
            
            return CartMapper.toDto(savedCart);
            
        } finally {
            cartLock.unlock();
        }
    }

    // Enterprise-specific helper method
    @Transactional(readOnly = true)
    public CartDto getCartByClient(Long clientId) {
        trackSessionActivity(clientId);
        
        Optional<Cart> cartOpt = cartRepository.findByClientId(clientId);
        if (cartOpt.isEmpty()) {
            // Return empty cart
            return CartDto.builder()
                .clientId(clientId)
                .items(java.util.List.of())
                .totalItems(0)
                .totalAmount(0.0)
                .lastUpdated(LocalDateTime.now())
                .build();
        }
        
        Cart cart = cartOpt.get();
        
        // Validate cart items against current stock and prices
        validateCartIntegrity(cart);
        
        return CartMapper.toDto(cart);
    }

    @Override
    @Transactional
    public void clearCart(Long clientId) {
        ReentrantLock cartLock = cartLocks.computeIfAbsent(clientId, k -> new ReentrantLock());
        
        try {
            cartLock.lock();
            log.info("Clearing cart for client {}", clientId);
            
            Optional<Cart> cartOpt = cartRepository.findByClientId(clientId);
            if (cartOpt.isPresent()) {
                Cart cart = cartOpt.get();
                cart.getItems().clear();
                cart.setLastUpdated(LocalDateTime.now());
                cartRepository.save(cart);
                log.info("Cart cleared for client {}", clientId);
            }
            
        } finally {
            cartLock.unlock();
            cartLocks.remove(clientId);
        }
    }

    // Enterprise-specific helper method
    @Transactional
    public CartDto removeFromCart(Long clientId, Long productId) {
        ReentrantLock cartLock = cartLocks.computeIfAbsent(clientId, k -> new ReentrantLock());
        
        try {
            cartLock.lock();
            log.info("Removing product {} from cart for client {}", productId, clientId);
            
            Cart cart = cartRepository.findByClientId(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Panier non trouvé"));
            
            CartItem itemToRemove = cart.getItems().stream()
                .filter(item -> item.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé dans le panier"));
            
            cart.getItems().remove(itemToRemove);
            cartItemRepository.delete(itemToRemove);
            
            updateCartTotals(cart);
            cart.setLastUpdated(LocalDateTime.now());
            Cart savedCart = cartRepository.save(cart);
            
            log.info("Removed product {} from cart", itemToRemove.getProductName());
            return CartMapper.toDto(savedCart);
            
        } finally {
            cartLock.unlock();
        }
    }

    // CartService interface methods

    @Override
    @Transactional(readOnly = true)
    public CartDto getCartByClientId(Long clientId) {
        return getCartByClient(clientId);
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public CartDto addItemToCart(Long clientId, CartItemDto itemDto) {
        if (itemDto == null || itemDto.getProductId() == null || itemDto.getQuantity() <= 0) {
            throw new IllegalArgumentException("Invalid cart item payload");
        }
        return addToCart(clientId, itemDto.getProductId(), itemDto.getQuantity());
    }

    @Override
    @Transactional(isolation = Isolation.READ_COMMITTED)
    public CartDto updateItemQuantity(Long cartItemId, int quantity) {
        CartItem item = cartItemRepository.findById(cartItemId)
            .orElseThrow(() -> new ResourceNotFoundException("Item de panier introuvable"));

        Long clientId = item.getCart().getClient().getId();
        ReentrantLock cartLock = cartLocks.computeIfAbsent(clientId, k -> new ReentrantLock());

        try {
            cartLock.lock();

            if (quantity <= 0) {
                Cart cart = item.getCart();
                cart.getItems().remove(item);
                cartItemRepository.delete(item);
                updateCartTotals(cart);
                cart.setLastUpdated(LocalDateTime.now());
                Cart savedCart = cartRepository.save(cart);
                return CartMapper.toDto(savedCart);
            }

            // Validate stock and update quantity
            Product product = item.getProduct();
            validateProductAvailability(product, quantity);

            item.setQuantity(quantity);
            item.setLastUpdated(LocalDateTime.now());
            cartItemRepository.save(item);

            Cart cart = item.getCart();
            updateCartTotals(cart);
            cart.setLastUpdated(LocalDateTime.now());
            Cart savedCart = cartRepository.save(cart);
            return CartMapper.toDto(savedCart);
        } finally {
            cartLock.unlock();
        }
    }

    @Override
    @Transactional
    public void removeItemFromCart(Long cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
            .orElseThrow(() -> new ResourceNotFoundException("Item introuvable"));

        Long clientId = item.getCart().getClient().getId();
        ReentrantLock cartLock = cartLocks.computeIfAbsent(clientId, k -> new ReentrantLock());

        try {
            cartLock.lock();

            Cart cart = item.getCart();
            cart.getItems().remove(item);
            cartItemRepository.delete(item);
            // Release reserved stock
            int currentReserved = item.getProduct().getReservedStock() != null ? item.getProduct().getReservedStock() : 0;
            item.getProduct().setReservedStock(Math.max(0, currentReserved - item.getQuantity()));
            productRepository.save(item.getProduct());

            updateCartTotals(cart);
            cart.setLastUpdated(LocalDateTime.now());
            cartRepository.save(cart);
        } finally {
            cartLock.unlock();
        }
    }

    /**
     * Validate that product is available and has sufficient stock
     */
    private void validateProductAvailability(Product product, int requestedQuantity) {
        if (!Boolean.TRUE.equals(product.getActive())) {
            throw new IllegalStateException("Le produit " + product.getName() + " n'est plus disponible");
        }
        
        Integer availableStock = product.getSyncedStock();
        Integer reservedStock = product.getReservedStock() != null ? product.getReservedStock() : 0;
        Integer actualAvailable = availableStock != null ? availableStock - reservedStock : 0;
        
        if (actualAvailable < requestedQuantity) {
            throw new InsufficientStockException(String.format(
                "Stock insuffisant pour %s. Demandé: %d, Disponible: %d",
                product.getName(), requestedQuantity, actualAvailable
            ));
        }
    }

    /**
     * Validate cart integrity - check if products still exist, are active, and have correct prices
     */
    private void validateCartIntegrity(Cart cart) {
        boolean cartModified = false;
        
        for (CartItem item : cart.getItems()) {
            Product currentProduct = productRepository.findById(item.getProduct().getId())
                .orElse(null);
            
            if (currentProduct == null || !Boolean.TRUE.equals(currentProduct.getActive())) {
                // Product no longer exists or is inactive
                log.warn("Removing inactive/deleted product {} from cart", item.getProductName());
                cart.getItems().remove(item);
                cartItemRepository.delete(item);
                cartModified = true;
                continue;
            }
            
            // Check if price has changed
            if (Double.compare(item.getUnitPrice(), currentProduct.getDisplayedPrice()) != 0) {
                log.info("Updating price for product {} from {} to {}", 
                    item.getProductName(), item.getUnitPrice(), currentProduct.getDisplayedPrice());
                item.setUnitPrice(currentProduct.getDisplayedPrice());
                cartItemRepository.save(item);
                cartModified = true;
            }
            
            // Check stock availability
            Integer availableStock = currentProduct.getSyncedStock();
            if (availableStock != null && availableStock < item.getQuantity()) {
                log.warn("Reducing quantity for product {} from {} to {} due to stock limitation", 
                    item.getProductName(), item.getQuantity(), availableStock);
                item.setQuantity(availableStock);
                cartItemRepository.save(item);
                cartModified = true;
            }
        }
        
        if (cartModified) {
            updateCartTotals(cart);
            cartRepository.save(cart);
        }
    }

    /**
     * Create a new cart for client
     */
    private Cart createNewCart(Client client) {
        Cart cart = Cart.builder()
            .client(client)
            .items(new java.util.ArrayList<>())
            .totalItems(0)
            .totalAmount(0.0)
            .lastUpdated(LocalDateTime.now())
            .build();
        
        return cartRepository.save(cart);
    }

    /**
     * Update cart totals based on current items
     */
    private void updateCartTotals(Cart cart) {
        int totalItems = cart.getItems().stream()
            .mapToInt(CartItem::getQuantity)
            .sum();
        
        double totalAmount = cart.getItems().stream()
            .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
            .sum();
        
        cart.setTotalItems(totalItems);
        cart.setTotalAmount(totalAmount);
    }

    /**
     * Track user session activity for monitoring concurrent users
     */
    private void trackSessionActivity(Long clientId) {
        sessionActivity.put("client_" + clientId, LocalDateTime.now());
        
        // Clean up old sessions (older than 1 hour)
        LocalDateTime cutoff = LocalDateTime.now().minusHours(1);
        sessionActivity.entrySet().removeIf(entry -> entry.getValue().isBefore(cutoff));
    }

    /**
     * Get count of active concurrent users
     */
    public int getActiveConcurrentUsers() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);
        return (int) sessionActivity.values().stream()
            .filter(lastActivity -> lastActivity.isAfter(cutoff))
            .count();
    }

    /**
     * Get all active user sessions
     */
    public Set<String> getActiveUserSessions() {
        LocalDateTime cutoff = LocalDateTime.now().minusMinutes(30);
        return sessionActivity.entrySet().stream()
            .filter(entry -> entry.getValue().isAfter(cutoff))
            .map(Map.Entry::getKey)
            .collect(java.util.stream.Collectors.toSet());
    }
}
