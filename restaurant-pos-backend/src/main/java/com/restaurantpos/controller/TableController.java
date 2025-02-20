package com.restaurantpos.controller;

import com.restaurantpos.model.Table;
import com.restaurantpos.repository.TableRepository;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/tables")
@CrossOrigin(origins = "*")
@Tag(name = "Table", description = "Table Item management APIs")
public class TableController {

    private static final Logger logger = LoggerFactory.getLogger(TableController.class);

    @Autowired
    private TableRepository tableRepository;

    @GetMapping
    public ResponseEntity<List<Table>> getAllTables() {
        logger.info("Fetching all tables");
        try {
            List<Table> tables = tableRepository.findAll();
            logger.info("Found {} tables", tables.size());
            return ResponseEntity.ok(tables);
        } catch (Exception e) {
            logger.error("Error fetching tables", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{tableNumber}")
    public ResponseEntity<Table> getTableByNumber(@PathVariable int tableNumber) {
        logger.info("Fetching table with number: {}", tableNumber);
        try {
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
            logger.error("Error fetching table {}", tableNumber, e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{tableNumber}")
    public ResponseEntity<Table> updateTable(@PathVariable int tableNumber, @RequestBody Table tableDetails) {
        logger.info("Updating table with number: {}", tableNumber);
        try {
            return tableRepository.findByTableNumber(tableNumber)
                    .map(table -> {
                        table.setStatus(tableDetails.getStatus());
                        table.setCustomerName(tableDetails.getCustomerName());
                        Table updatedTable = tableRepository.save(table);
                        logger.info("Updated table: " + table.toString());
                        return ResponseEntity.ok(updatedTable);
                    })
                    .orElseGet(() -> {
                        logger.warn("Table not found with number: {}", tableNumber);
                        return ResponseEntity.notFound().build();
                    });
        } catch (Exception e) {
            logger.error("Error updating table {}", tableNumber, e);
            return ResponseEntity.internalServerError().build();
        }
    }
}

