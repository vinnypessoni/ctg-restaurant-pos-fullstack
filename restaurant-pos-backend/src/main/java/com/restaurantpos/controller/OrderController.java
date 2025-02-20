package com.restaurantpos.controller;

import com.restaurantpos.model.Order;
import com.restaurantpos.repository.OrderRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
@Tag(name = "Order", description = "Order APIs")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        logger.info("Fetching all orders");
        List<Order> orders = orderRepository.findAll();
        logger.info("Found {} orders", orders.size());
        return orders;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(@RequestBody Order order) {
        logger.info("Creating new order: {}", order);
        order.setTimestamp(LocalDateTime.now());
        Order savedOrder = orderRepository.save(order);
        logger.info("Created order with ID: {}", savedOrder.getId());
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        logger.info("Fetching order with id: {}", id);
        return orderRepository.findById(id)
                .map(order -> {
                    logger.info("Found order: {}", order);
                    return ResponseEntity.ok(order);
                })
                .orElseGet(() -> {
                    logger.warn("Order not found with id: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        logger.info("Updating order with id: {}", id);
        return orderRepository.findById(id)
                .map(order -> {
                    order.setCustomerName(orderDetails.getCustomerName());
                    order.setStatus(orderDetails.getStatus());
                    order.setDiningMode(orderDetails.getDiningMode());
                    order.setDeliveryAddress(orderDetails.getDeliveryAddress());
                    Order updatedOrder = orderRepository.save(order);
                    logger.info("Updated order: {}", updatedOrder);
                    return ResponseEntity.ok(updatedOrder);
                })
                .orElseGet(() -> {
                    logger.warn("Order not found with id: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        logger.info("Deleting order with id: {}", id);
        return orderRepository.findById(id)
                .map(order -> {
                    orderRepository.delete(order);
                    logger.info("Deleted order with id: {}", id);
                    return ResponseEntity.ok().build();
                })
                .orElseGet(() -> {
                    logger.warn("Order not found with id: {}", id);
                    return ResponseEntity.notFound().build();
                });
    }
}

