package com.restaurantpos.controller;

import com.restaurantpos.model.Table;
import com.restaurantpos.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "http://localhost:3000")
public class TableController {

    private static final Logger logger = LoggerFactory.getLogger(TableController.class);

    @Autowired
    private TableRepository tableRepository;

    @GetMapping
    public ResponseEntity<?> getAllTables() {
        try {
            logger.info("Fetching all tables");
            List<Table> tables = tableRepository.findAll();
            logger.info("Found {} tables", tables.size());
            return ResponseEntity.ok(tables);
        } catch (Exception e) {
            logger.error("Error fetching tables", e);
            return ResponseEntity.internalServerError().body("An error occurred while fetching tables: " + e.getMessage());
        }
    }

    @GetMapping("/{tableNumber}")
    public ResponseEntity<?> getTableByNumber(@PathVariable int tableNumber) {
        try {
            logger.info("Fetching table with number: {}", tableNumber);
            return tableRepository.findByTableNumber(tableNumber)
                    .map(table -> {
                        logger.info("Found table: {}", table);
                        return ResponseEntity.ok(table);
                    })
                    .orElseGet(() -> {
                        logger.warn("Table not found with number: {}", tableNumber);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("Error fetching table with number: {}", tableNumber, e);
            return ResponseEntity.internalServerError().body("An error occurred while fetching the table: " + e.getMessage());
        }
    }

    @PutMapping("/{tableNumber}")
    public ResponseEntity<?> updateTable(@PathVariable int tableNumber, @RequestBody Table tableDetails) {
        try {
            logger.info("Updating table with number: {}", tableNumber);
            return tableRepository.findByTableNumber(tableNumber)
                    .map(table -> {
                        table.setStatus(tableDetails.getStatus());
                        table.setCustomerName(tableDetails.getCustomerName());
                        Table updatedTable = tableRepository.save(table);
                        logger.info("Updated table: {}", updatedTable);
                        return ResponseEntity.ok(updatedTable);
                    })
                    .orElseGet(() -> {
                        logger.warn("Table not found with number: {}", tableNumber);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("Error updating table with number: {}", tableNumber, e);
            return ResponseEntity.internalServerError().body("An error occurred while updating the table: " + e.getMessage());
        }
    }
}

