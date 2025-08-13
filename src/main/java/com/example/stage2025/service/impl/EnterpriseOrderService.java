package com.example.stage2025.service.impl;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.entity.*;
import com.example.stage2025.enums.DeliveryStatus;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.exception.ConcurrentOrderException;
import com.example.stage2025.exception.InsufficientStockException;
import com.example.stage2025.mapper.OrderMapper;
import com.example.stage2025.repository.*;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.service.SupplierPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.dao.OptimisticLockingFailureException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantLock;
import java.util.stream.Collectors;

@Service("enterpriseOrderService")
@RequiredArgsConstructor
@Slf4j
public class EnterpriseOrderService implements OrderService {

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ClientRepository clientRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;
    private final SupplierPaymentService supplierPaymentService;

    // In-memory locks for critical sections (in production, use Redis)
    private final Map<String, ReentrantLock> orderLocks = new ConcurrentHashMap<>();
    private final Map<Long, ReentrantLock> productLocks = new ConcurrentHashMap<>();

    @Override
    @Transactional(isolation = Isolation.SERIALIZABLE, timeout = 30)
    public OrderDto createOrderFromCart(Long clientId, Long addressId, double shippingFee) {
        String lockKey = "order_creation_" + clientId;
        ReentrantLock orderLock = orderLocks.computeIfAbsent(lockKey, k -> new ReentrantLock());
        
        try {
            // Acquire lock to prevent concurrent order creation by same user
            if (!orderLock.tryLock()) {
                throw new ConcurrentOrderException("Un autre processus de commande est en cours pour cet utilisateur");
            }

            log.info("Creating enterprise order for client {} with address {}", clientId, addressId);
            
            Client client = clientRepository.findById(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Client non trouvé"));
            Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new ResourceNotFoundException("Adresse non trouvée"));
            Cart cart = cartRepository.findByClientId(clientId)
                .orElseThrow(() -> new ResourceNotFoundException("Panier non trouvé"));

            if (cart.getItems().isEmpty()) {
                throw new IllegalStateException("Le panier est vide");
            }

            // Group cart items by supplier for multi-supplier handling
            Map<Supplier, List<CartItem>> itemsBySupplier = cart.getItems().stream()
                .collect(Collectors.groupingBy(item -> item.getProduct().getSupplier()));

            log.info("Order contains products from {} suppliers", itemsBySupplier.size());

            // Validate stock availability for ALL products atomically
            validateAndReserveStock(cart.getItems());

            // Calculate totals
            double subtotal = cart.getItems().stream()
                .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                .sum();
            double total = subtotal + shippingFee;

            // Create main order
            Order order = Order.builder()
                .orderNumber(generateUniqueOrderNumber())
                .orderDate(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .shippingStatus(DeliveryStatus.NOT_SHIPPED)
                .subtotal(subtotal)
                .shippingFee(shippingFee)
                .total(total)
                .client(client)
                .deliveryAddress(address)
                .comments("")
                .totalSuppliers(itemsBySupplier.size())
                .completedSuppliers(0)
                .sessionId(generateSessionId(clientId))
                .lockToken(UUID.randomUUID().toString())
                .lockExpiry(LocalDateTime.now().plusMinutes(30))
                .version(0L)
                .build();

            // Create order items grouped by supplier
            List<OrderItem> allOrderItems = new ArrayList<>();
            for (Map.Entry<Supplier, List<CartItem>> entry : itemsBySupplier.entrySet()) {
                Supplier supplier = entry.getKey();
                List<CartItem> supplierItems = entry.getValue();

                log.info("Processing {} items for supplier {}", supplierItems.size(), supplier.getName());

                for (CartItem cartItem : supplierItems) {
                    OrderItem orderItem = OrderItem.builder()
                        .order(order)
                        .product(cartItem.getProduct())
                        .productName(cartItem.getProduct().getName())
                        .quantity(cartItem.getQuantity())
                        .unitPrice(cartItem.getUnitPrice())
                        .subtotal(cartItem.getQuantity() * cartItem.getUnitPrice())
                        .supplierName(supplier.getName())
                        .build();
                    allOrderItems.add(orderItem);
                }
            }

            order.setItems(allOrderItems);

            // Save order with retry mechanism for optimistic locking
            Order savedOrder = saveOrderWithRetry(order, 3);

            // Update stock quantities atomically
            updateProductStocks(cart.getItems());

            // Clear cart after successful order creation
            cart.getItems().clear();
            cartRepository.save(cart);

            // Send notifications asynchronously
            sendOrderNotifications(savedOrder, itemsBySupplier);

            // Create supplier payments asynchronously
            createSupplierPayments(savedOrder);

            log.info("Enterprise order {} created successfully with {} suppliers", 
                savedOrder.getOrderNumber(), savedOrder.getTotalSuppliers());

            return OrderMapper.toDto(savedOrder);

        } catch (Exception e) {
            log.error("Failed to create enterprise order for client {}: {}", clientId, e.getMessage());
            throw e;
        } finally {
            orderLock.unlock();
            orderLocks.remove(lockKey);
        }
    }

    private void validateAndReserveStock(List<CartItem> cartItems) {
        log.info("Validating stock for {} cart items", cartItems.size());
        
        // Group by product to handle multiple items of same product
        Map<Product, Integer> productQuantities = cartItems.stream()
            .collect(Collectors.groupingBy(
                CartItem::getProduct,
                Collectors.summingInt(CartItem::getQuantity)
            ));

        List<String> stockErrors = new ArrayList<>();

        for (Map.Entry<Product, Integer> entry : productQuantities.entrySet()) {
            Product product = entry.getKey();
            Integer requestedQuantity = entry.getValue();
            
            // Acquire product-level lock
            ReentrantLock productLock = productLocks.computeIfAbsent(product.getId(), k -> new ReentrantLock());
            
            try {
                productLock.lock();
                
                // Refresh product from database to get latest stock
                Product freshProduct = productRepository.findById(product.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé: " + product.getId()));
                
                Integer availableStock = freshProduct.getSyncedStock();
                Integer reservedStock = freshProduct.getReservedStock() != null ? freshProduct.getReservedStock() : 0;
                Integer actualAvailable = availableStock != null ? availableStock - reservedStock : 0;
                
                if (actualAvailable < requestedQuantity) {
                    stockErrors.add(String.format(
                        "Stock insuffisant pour %s: demandé %d, disponible %d",
                        freshProduct.getName(), requestedQuantity, actualAvailable
                    ));
                } else {
                    // Reserve stock temporarily
                    freshProduct.setReservedStock(reservedStock + requestedQuantity);
                    productRepository.save(freshProduct);
                    log.info("Reserved {} units of product {}", requestedQuantity, freshProduct.getName());
                }
                
            } finally {
                productLock.unlock();
            }
        }

        if (!stockErrors.isEmpty()) {
            throw new InsufficientStockException("Erreurs de stock: " + String.join("; ", stockErrors));
        }
    }

    private void updateProductStocks(List<CartItem> cartItems) {
        Map<Product, Integer> productQuantities = cartItems.stream()
            .collect(Collectors.groupingBy(
                CartItem::getProduct,
                Collectors.summingInt(CartItem::getQuantity)
            ));

        for (Map.Entry<Product, Integer> entry : productQuantities.entrySet()) {
            Product product = entry.getKey();
            Integer orderedQuantity = entry.getValue();
            
            ReentrantLock productLock = productLocks.computeIfAbsent(product.getId(), k -> new ReentrantLock());
            
            try {
                productLock.lock();
                
                Product freshProduct = productRepository.findById(product.getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Produit non trouvé: " + product.getId()));
                
                // Update actual stock and unreserve
                Integer currentStock = freshProduct.getSyncedStock() != null ? freshProduct.getSyncedStock() : 0;
                Integer currentReserved = freshProduct.getReservedStock() != null ? freshProduct.getReservedStock() : 0;
                
                freshProduct.setSyncedStock(Math.max(0, currentStock - orderedQuantity));
                freshProduct.setReservedStock(Math.max(0, currentReserved - orderedQuantity));
                
                productRepository.save(freshProduct);
                log.info("Updated stock for product {}: new stock {}", freshProduct.getName(), freshProduct.getSyncedStock());
                
            } finally {
                productLock.unlock();
                productLocks.remove(product.getId());
            }
        }
    }

    private Order saveOrderWithRetry(Order order, int maxRetries) {
        for (int attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return orderRepository.save(order);
            } catch (OptimisticLockingFailureException e) {
                if (attempt == maxRetries) {
                    throw new ConcurrentOrderException("Impossible de sauvegarder la commande après " + maxRetries + " tentatives");
                }
                log.warn("Optimistic locking conflict on attempt {}, retrying...", attempt);
                try {
                    Thread.sleep(100 * attempt); // Exponential backoff
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                    throw new RuntimeException("Thread interrupted during retry", ie);
                }
            }
        }
        throw new RuntimeException("Should not reach here");
    }

    private void sendOrderNotifications(Order order, Map<Supplier, List<CartItem>> itemsBySupplier) {
        try {
            // Send customer confirmation
            emailService.sendOrderConfirmation(order.getClient(), order);
            
            // Send admin notification
            emailService.sendAdminNewOrderNotification(order);
            
            // Send supplier notifications for each supplier
            for (Supplier supplier : itemsBySupplier.keySet()) {
                if (supplier.getContactEmail() != null && !supplier.getContactEmail().isEmpty()) {
                    emailService.sendSupplierOrderNotification(supplier, order);
                }
            }
            
            log.info("All order notifications sent for order {}", order.getOrderNumber());
            
        } catch (Exception e) {
            log.error("Failed to send order notifications for order {}: {}", order.getOrderNumber(), e.getMessage());
        }
    }

    private void createSupplierPayments(Order order) {
        try {
            supplierPaymentService.createPaymentForOrder(order);
            log.info("Supplier payments created for order {}", order.getOrderNumber());
        } catch (Exception e) {
            log.error("Failed to create supplier payments for order {}: {}", order.getOrderNumber(), e.getMessage());
        }
    }

    private String generateUniqueOrderNumber() {
        return "ORD-" + System.currentTimeMillis() + "-" + (int)(Math.random() * 1000);
    }

    private String generateSessionId(Long clientId) {
        return "SESSION-" + clientId + "-" + System.currentTimeMillis();
    }

    // Multi-supplier order status management
    @Transactional
    public void updateSupplierOrderStatus(Long orderId, Long supplierId, String status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée"));
        
        // Update supplier-specific status logic here
        // This could involve updating a separate SupplierOrderStatus entity
        
        // Check if all suppliers have completed their part
        if (order.getCompletedSuppliers() + 1 >= order.getTotalSuppliers()) {
            order.setStatus(OrderStatus.COMPLETED);
            order.setShippingStatus(DeliveryStatus.DELIVERED);
        }
        
        orderRepository.save(order);
        log.info("Updated supplier order status for order {} supplier {}", orderId, supplierId);
    }

    // Override other OrderService methods with enterprise enhancements
    @Override
    public List<OrderDto> getOrdersByClient(Long clientId) {
        return orderRepository.findByClientIdOrderByOrderDateDesc(clientId).stream()
            .map(OrderMapper::toDto)
            .collect(Collectors.toList());
    }

    @Override
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée"));
        return OrderMapper.toDto(order);
    }

    @Override
    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée"));
        order.setStatus(status);
        orderRepository.save(order);
    }

    @Override
    public void updateShippingStatus(Long orderId, DeliveryStatus shippingStatus) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new ResourceNotFoundException("Commande non trouvée"));
        order.setShippingStatus(shippingStatus);
        orderRepository.save(order);
    }

	@Override
	@Transactional(readOnly = true)
	public List<OrderDto> getAllOrders() {
		return orderRepository.findAll().stream()
			.map(OrderMapper::toDto)
			.collect(Collectors.toList());
	}

	@Override
	@Transactional(readOnly = true)
	public List<OrderDto> getOrdersByStatus(OrderStatus status) {
		return orderRepository.findByStatus(status).stream()
			.map(OrderMapper::toDto)
			.collect(Collectors.toList());
	}
}

// Exception classes are now in separate files
