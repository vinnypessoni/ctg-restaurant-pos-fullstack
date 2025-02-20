package com.restaurantpos.model;

import jakarta.persistence.*;

@Entity
@jakarta.persistence.Table(name = "restaurant_tables")
public class Table {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int tableNumber;

    @Enumerated(EnumType.STRING)
    private TableStatus status;

    private String customerName;

    // Constructors
    public Table() {}

    public Table(int tableNumber, TableStatus status) {
        this.tableNumber = tableNumber;
        this.status = status;
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

    public TableStatus getStatus() {
        return status;
    }

    public void setStatus(TableStatus status) {
        this.status = status;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String toString(){
        return  "Customer ----- " + customerName +
                "Table number - " + tableNumber +
                "Status ------- " + status +
                "id ----------- " + id;

    }

}

