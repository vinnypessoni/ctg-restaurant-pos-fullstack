package com.restaurantpos.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int tableNumber;
    private String customerName;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    private double total;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private LocalDateTime timestamp;
    private String paymentMethod;

    @Enumerated(EnumType.STRING)
    private DiningMode diningMode;

    private String deliveryAddress;

    // Constructors
    public Order() {}

    public Order(int tableNumber, String customerName, List<OrderItem> items, double total, OrderStatus status, String paymentMethod, DiningMode diningMode, String deliveryAddress) {
        this.tableNumber = tableNumber;
        this.customerName = customerName;
        this.items = items;
        this.total = total;
        this.status = status;
        this.timestamp = LocalDateTime.now();
        this.paymentMethod = paymentMethod;
        this.diningMode = diningMode;
        this.deliveryAddress = deliveryAddress;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getTableNumber() {
        return tableNumber;
    }

    public void setTableNumber(int tableNumber) {
        this.tableNumber = tableNumber;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public DiningMode getDiningMode() {
        return diningMode;
    }

    public void setDiningMode(DiningMode diningMode) {
        this.diningMode = diningMode;
    }

    public String getDeliveryAddress() {
        return deliveryAddress;
    }

    public void setDeliveryAddress(String deliveryAddress) {
        this.deliveryAddress = deliveryAddress;
    }
}

