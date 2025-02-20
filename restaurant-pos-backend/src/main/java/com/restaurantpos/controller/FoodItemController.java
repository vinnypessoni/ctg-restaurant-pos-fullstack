package com.restaurantpos.controller;

import com.restaurantpos.model.FoodItem;
import com.restaurantpos.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/food-items")
@CrossOrigin(origins = "http://localhost:3000")
public class FoodItemController {

    private static final Logger logger = LoggerFactory.getLogger(FoodItemController.class);

    @Autowired
    private FoodItemRepository foodItemRepository;

    @GetMapping
    public List<FoodItem> getAllFoodItems() {
        logger.info("Fetching all food items");
        List<FoodItem> items = foodItemRepository.findAll();
        logger.info("Found {} food items", items.size());
        return items;
    }

    @PostMapping
    public FoodItem createFoodItem(@RequestBody FoodItem foodItem) {
        logger.info("Creating new food item: {}", foodItem);
        return foodItemRepository.save(foodItem);
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
}

