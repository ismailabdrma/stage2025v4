package com.example.stage2025.service.impl;

import com.example.stage2025.dto.OrderDto;
import com.example.stage2025.entity.*;
import com.example.stage2025.enums.DeliveryStatus;
import com.example.stage2025.enums.OrderStatus;
import com.example.stage2025.exception.ResourceNotFoundException;
import com.example.stage2025.mapper.OrderMapper;
import com.example.stage2025.repository.*;
import com.example.stage2025.service.OrderService;
import com.example.stage2025.service.EmailService;
import com.example.stage2025.service.SupplierPaymentService;
import com.example.stage2025.service.ShippingFeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.Map;
import java.util.stream.Collectors;
import java.math.BigDecimal;

@Service
@Primary
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    private final OrderRepository orderRepository;
    private final CartRepository cartRepository;
    private final ClientRepository clientRepository;
    private final AddressRepository addressRepository;
    private final ProductRepository productRepository;
    private final EmailService emailService;
    private final SupplierPaymentService supplierPaymentService;
    private final ShippingFeeService shippingFeeService;

    @Override
    @Transactional
    public OrderDto createOrderFromCart(Long clientId, Long addressId, double shippingFee) {
        try {
            log.info("Creating order from cart for client: {}, addressId: {}, shippingFee: {}", clientId, addressId, shippingFee);
            
            Client client = clientRepository.findById(clientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
            log.info("Found client: {}", client.getEmail());
            
            Address address = addressRepository.findById(addressId)
                    .orElseThrow(() -> new ResourceNotFoundException("Address not found"));
            log.info("Found address: {} {}, {}, {}", address.getStreet(), address.getCity(), address.getZipCode(), address.getCountry());
            
            // Use the cart attached to the client; if missing, try to create or load
            Cart cart = client.getCart();
            if (cart == null) {
                log.info("Client has no cart, creating new one");
                cart = cartRepository.findByClientId(clientId).orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setClient(client);
                    return cartRepository.save(newCart);
                });
            }
            
            log.info("Cart found/created with {} items", cart.getItems().size());

            if (cart.getItems().isEmpty()) {
                throw new IllegalStateException("Cart is empty");
            }

            double subtotal = cart.getItems().stream()
                    .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                    .sum();
            log.info("Cart subtotal calculated: {}", subtotal);

            // Calculate shipping fee using the shipping fee service
            BigDecimal calculatedShippingFee;
            try {
                calculatedShippingFee = shippingFeeService.calculateShippingFee(
                    address.getCountry(),
                    address.getCity(),
                    address.getZipCode(),
                    BigDecimal.valueOf(subtotal)
                );
                log.info("Shipping fee calculated: {} {}", calculatedShippingFee, calculatedShippingFee != null ? "MAD" : "null");
            } catch (Exception e) {
                log.warn("Error calculating shipping fee, using provided fee: {}", e.getMessage());
                calculatedShippingFee = BigDecimal.valueOf(shippingFee);
            }
            
            // Use calculated shipping fee if not provided, otherwise use provided one
            double finalShippingFee = shippingFee > 0 ? shippingFee : calculatedShippingFee.doubleValue();
            double total = subtotal + finalShippingFee;
            
            log.info("Final shipping fee: {}, total: {}", finalShippingFee, total);

            // Compute supplier counts for multi-supplier fields
            long supplierCount = cart.getItems().stream()
                    .map(item -> item.getProduct().getSupplier())
                    .distinct()
                    .count();
            log.info("Order contains products from {} suppliers", supplierCount);

            Order order = Order.builder()
                    .orderNumber(UUID.randomUUID().toString())
                    .orderDate(LocalDateTime.now())
                    .status(OrderStatus.PENDING)
                    .shippingStatus(DeliveryStatus.NOT_SHIPPED)
                    .subtotal(subtotal)
                    .shippingFee(finalShippingFee)
                    .total(total)
                    .client(client)
                    .deliveryAddress(address)
                    .comments("")
                    .totalSuppliers((int) supplierCount)
                    .completedSuppliers(0)
                    .currency("EUR") // Explicitly set currency
                    .build();

            List<OrderItem> orderItems = cart.getItems().stream()
                    .map(item -> OrderItem.builder()
                            .order(order)
                            .product(item.getProduct())
                            .quantity(item.getQuantity())
                            .unitPrice(item.getUnitPrice())
                            .subtotal(item.getQuantity() * item.getUnitPrice())
                            .build())
                    .collect(Collectors.toList());

            order.setItems(orderItems);

            // Do NOT adjust stock or clear cart yet; finalize after payment
            Order saved = orderRepository.save(order);
            log.info("Order saved successfully with ID: {}", saved.getId());

            return OrderMapper.toDto(saved);
            
        } catch (Exception e) {
            log.error("Error creating order from cart for client: {}, addressId: {}. Error: {}", 
                     clientId, addressId, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @Transactional
    public OrderDto createOrderFromJson(Long clientId, Map<String, Object> newAddress, double shippingFee) {
        try {
            log.info("Creating order from JSON for client: {}, newAddress: {}, shippingFee: {}", clientId, newAddress, shippingFee);
            
            Client client = clientRepository.findById(clientId)
                    .orElseThrow(() -> new ResourceNotFoundException("Client not found"));
            log.info("Found client: {}", client.getEmail());
            
            // Check if this is the first address for this client
            List<Address> existingAddresses = addressRepository.findByClientId(clientId);
            boolean isFirstAddress = existingAddresses.isEmpty();
            
            // Create new address
            Address address = Address.builder()
                    .firstName((String) newAddress.get("fullName"))
                    .lastName("") // We'll use fullName as firstName for now
                    .street((String) newAddress.get("address"))
                    .city((String) newAddress.get("city"))
                    .state((String) newAddress.get("state"))
                    .zipCode((String) newAddress.get("postalCode"))
                    .country((String) newAddress.get("country"))
                    .phone((String) newAddress.get("phone"))
                    .defaultAddress(isFirstAddress) // Set as default if it's the first address
                    .client(client)
                    .build();
            
            Address savedAddress = addressRepository.save(address);
            log.info("Created new address with ID: {} for client: {}", savedAddress.getId(), clientId);
            
            // Use the cart attached to the client; if missing, try to create or load
            Cart cart = client.getCart();
            if (cart == null) {
                log.info("Client has no cart, creating new one");
                cart = cartRepository.findByClientId(clientId).orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setClient(client);
                    return cartRepository.save(newCart);
                });
            }
            
            log.info("Cart found/created with {} items", cart.getItems().size());

            if (cart.getItems().isEmpty()) {
                throw new IllegalStateException("Cart is empty");
            }

            double subtotal = cart.getItems().stream()
                    .mapToDouble(item -> item.getQuantity() * item.getUnitPrice())
                    .sum();
            log.info("Cart subtotal calculated: {}", subtotal);

            // Use provided shipping fee
            double finalShippingFee = shippingFee;
            double total = subtotal + finalShippingFee;
            
            log.info("Final shipping fee: {}, total: {}", finalShippingFee, total);

            // Compute supplier counts for multi-supplier fields
            long supplierCount = cart.getItems().stream()
                    .map(item -> item.getProduct().getSupplier())
                    .distinct()
                    .count();
            log.info("Order contains products from {} suppliers", supplierCount);

            Order order = Order.builder()
                    .orderNumber(UUID.randomUUID().toString())
                    .orderDate(LocalDateTime.now())
                    .status(OrderStatus.PENDING)
                    .shippingStatus(DeliveryStatus.NOT_SHIPPED)
                    .subtotal(subtotal)
                    .shippingFee(finalShippingFee)
                    .total(total)
                    .client(client)
                    .deliveryAddress(savedAddress)
                    .comments("")
                    .totalSuppliers((int) supplierCount)
                    .completedSuppliers(0)
                    .currency("EUR") // Explicitly set currency
                    .build();

            List<OrderItem> orderItems = cart.getItems().stream()
                    .map(item -> OrderItem.builder()
                            .order(order)
                            .product(item.getProduct())
                            .quantity(item.getQuantity())
                            .unitPrice(item.getUnitPrice())
                            .subtotal(item.getQuantity() * item.getUnitPrice())
                            .build())
                    .collect(Collectors.toList());

            order.setItems(orderItems);

            // Do NOT adjust stock or clear cart yet; finalize after payment
            Order saved = orderRepository.save(order);
            log.info("Order saved successfully with ID: {}", saved.getId());

            return OrderMapper.toDto(saved);
            
        } catch (Exception e) {
            log.error("Error creating order from JSON for client: {}, newAddress: {}. Error: {}", 
                     clientId, newAddress, e.getMessage(), e);
            throw e;
        }
    }

    @Override
    @Transactional
    public void finalizePaidOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        Client client = order.getClient();
        if (client == null) return;
        Cart cart = client.getCart();
        if (cart != null && cart.getItems() != null) {
            for (CartItem cartItem : cart.getItems()) {
                Product product = cartItem.getProduct();
                int orderedQty = cartItem.getQuantity();
                int syncedStock = product.getSyncedStock() != null ? product.getSyncedStock() : 0;
                int reservedStock = product.getReservedStock() != null ? product.getReservedStock() : 0;
                product.setSyncedStock(Math.max(0, syncedStock - orderedQty));
                product.setReservedStock(Math.max(0, reservedStock - orderedQty));
                productRepository.save(product);
            }
            cart.getItems().clear();
            cartRepository.save(cart);
        }

        try {
            supplierPaymentService.createPaymentForOrder(order);
            log.info("Supplier payments created for order {}", order.getId());
        } catch (Exception e) {
            log.error("Failed to create supplier payments for order {}: {}", order.getId(), e.getMessage());
        }

        // Send confirmation email to the client
        try {
            emailService.sendOrderConfirmationEmail(client.getEmail(), order);
            log.info("Order confirmation email sent for order {}", order.getId());
        } catch (Exception e) {
            log.error("Failed to send order confirmation email for order {}: {}", order.getId(), e.getMessage());
        }

        // Send order summary to each supplier
        try {
            Map<Supplier, List<OrderItem>> supplierItems = order.getItems().stream()
                    .collect(Collectors.groupingBy(item -> item.getProduct().getSupplier()));

            for (Map.Entry<Supplier, List<OrderItem>> entry : supplierItems.entrySet()) {
                Supplier supplier = entry.getKey();
                List<OrderItem> items = entry.getValue();
                try {
                    emailService.sendSupplierOrderSummary(supplier.getContactEmail(), order, items);
                    log.info("Order summary email sent to supplier {} for order {}", supplier.getId(), order.getId());
                } catch (Exception e) {
                    log.error("Failed to send order summary email to supplier {} for order {}: {}", supplier.getId(), order.getId(), e.getMessage());
                }
            }
        } catch (Exception e) {
            log.error("Error processing supplier order summaries for order {}: {}", order.getId(), e.getMessage());
        }
    }

    @Override
    @Transactional(readOnly = true)
    public List<OrderDto> getOrdersByClient(Long clientId) {
        return orderRepository.findByClientId(clientId)
                .stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public OrderDto getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        return OrderMapper.toDto(order);
    }

    @Override
    @Transactional
    public void updateOrderStatus(Long orderId, OrderStatus status) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        order.setStatus(status);
        orderRepository.save(order);
        log.info("Order {} status updated to {}", orderId, status);
    }

    @Override
    public void updateShippingStatus(Long orderId, DeliveryStatus shippingStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
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