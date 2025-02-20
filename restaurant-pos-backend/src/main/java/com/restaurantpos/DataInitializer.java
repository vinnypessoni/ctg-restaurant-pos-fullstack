package com.restaurantpos;

import com.restaurantpos.model.FoodItem;
import com.restaurantpos.model.Table;
import com.restaurantpos.model.TableStatus;
import com.restaurantpos.repository.FoodItemRepository;
import com.restaurantpos.repository.TableRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final FoodItemRepository foodItemRepository;
    private final TableRepository tableRepository;

    public DataInitializer(FoodItemRepository foodItemRepository, TableRepository tableRepository) {
        this.foodItemRepository = foodItemRepository;
        this.tableRepository = tableRepository;
    }

    @Override
    public void run(String... args) {
        // Initialize food items
        if (foodItemRepository.count() == 0) {
            foodItemRepository.save(new FoodItem("/food-images/salad.png", "Vegetable Salad", 17.99, 20, "Veg", 0, "Main Course"));
            foodItemRepository.save(new FoodItem("/food-images/burguer.png", "Cheese Burger", 23.99, null, "Non Veg", 0, "Burgers"));
            foodItemRepository.save(new FoodItem("/food-images/juice.png", "Orange Juice", 12.99, null, "Veg", 0, "Breakfast"));
            foodItemRepository.save(new FoodItem("/food-images/carbonara.png", "Spaghetti Carbonara", 15.99, null, "Non Veg", 0, "Pasta"));
            foodItemRepository.save(new FoodItem("/food-images/soup.png", "Soup", 9.99, null, "Veg", 0, "Soups"));
        }

        // Initialize tables
        if (tableRepository.count() == 0) {
            // Create 8 tables by default
            for (int i = 1; i <= 8; i++) {
                Table table = new Table();
                table.setTableNumber(i);
                table.setStatus(TableStatus.AVAILABLE);
                tableRepository.save(table);
            }
        }
    }
}