package com.restaurantpos.controller;

import com.restaurantpos.model.Order;
import com.restaurantpos.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        try {
            logger.info("Fetching all orders");
            List<Order> orders = orderRepository.findAll();
            logger.info("Found {} orders", orders.size());
            return ResponseEntity.ok(orders);
        } catch (Exception e) {
            logger.error("Error fetching orders", e);
            return ResponseEntity.internalServerError().body("An error occurred while fetching orders: " + e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody Order order) {
        try {
            logger.info("Creating new order: {}", order);
            order.setTimestamp(LocalDateTime.now());
            Order savedOrder = orderRepository.save(order);
            logger.info("Created order with ID: {}", savedOrder.getId());
            return ResponseEntity.ok(savedOrder);
        } catch (Exception e) {
            logger.error("Error creating order", e);
            return ResponseEntity.internalServerError().body("An error occurred while creating the order: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        try {
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
        } catch (Exception e) {
            logger.error("Error fetching order with id: {}", id, e);
            return ResponseEntity.internalServerError().body("An error occurred while fetching the order: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateOrder(@PathVariable Long id, @RequestBody Order orderDetails) {
        try {
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
        } catch (Exception e) {
            logger.error("Error updating order with id: {}", id, e);
            return ResponseEntity.internalServerError().body("An error occurred while updating the order: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Long id) {
        try {
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
        } catch (Exception e) {
            logger.error("Error deleting order with id: {}", id, e);
            return ResponseEntity.internalServerError().body("An error occurred while deleting the order: " + e.getMessage());
        }
    }
}

