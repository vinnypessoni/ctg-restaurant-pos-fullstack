package com.restaurantpos.controller;

import com.restaurantpos.model.FoodItem;
import com.restaurantpos.repository.FoodItemRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/api/food-items")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodItemController {

    private static final Logger logger = LoggerFactory.getLogger(FoodItemController.class);

    @Autowired
    private FoodItemRepository foodItemRepository;
    private FoodItem foodItem;
    private BindingResult result;


    @GetMapping
    public ResponseEntity<List<FoodItem>> getAllFoodItems() {
        try {
            logger.info("Fetching all food items");
            List<FoodItem> items = foodItemRepository.findAll();
            logger.info("Found {} food items", items.size());
            return ResponseEntity.ok(items);
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch food items", e);
        }
    }

    @PostMapping
    public ResponseEntity<?> createFoodItem(@Valid @RequestBody FoodItem foodItem, BindingResult result) {
        if (result.hasErrors()) {
            String errorMsg = result.getFieldErrors()
                    .stream()
                    .map(error -> error.getField() + ": " + error.getDefaultMessage())
                    .collect(Collectors.joining(", "));
            return ResponseEntity.badRequest().body(errorMsg);
        }

        logger.info("Creating new food item: {}", foodItem);
        FoodItem savedItem = foodItemRepository.save(foodItem);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }


    @GetMapping("/{id}")
    public ResponseEntity<FoodItem> getFoodItemById(@PathVariable Long id) {
        logger.info("Fetching food item with id: {}", id);
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found with id: " + id));
        return ResponseEntity.ok(foodItem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FoodItem> updateFoodItem(@PathVariable Long id, @RequestBody FoodItem foodItemDetails) {
        logger.info("Updating food item with id: {}", id);
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found with id: " + id));

        foodItem.setImage(foodItemDetails.getImage());
        foodItem.setTitle(foodItemDetails.getTitle());
        foodItem.setPrice(foodItemDetails.getPrice());
        foodItem.setDiscount(foodItemDetails.getDiscount());
        foodItem.setType(foodItemDetails.getType());
        foodItem.setQuantity(foodItemDetails.getQuantity());

        FoodItem updatedFoodItem = foodItemRepository.save(foodItem);
        logger.info("Updated food item: {}", updatedFoodItem);
        return ResponseEntity.ok(updatedFoodItem);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteFoodItem(@PathVariable Long id) {
        logger.info("Deleting food item with id: {}", id);
        FoodItem foodItem = foodItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Food item not found with id: " + id));

        foodItemRepository.delete(foodItem);
        return ResponseEntity.ok().build();
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<FoodItem> handleException(Exception ex) {
        logger.error("Error occurred: ", ex);
        // Return null or an error-indicating FoodItem object
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(null); // or create an error FoodItem object
    }

}

