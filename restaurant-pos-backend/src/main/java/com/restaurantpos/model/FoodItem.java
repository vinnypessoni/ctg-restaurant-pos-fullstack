package com.restaurantpos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;

@Entity
public class FoodItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String image;

    @NotBlank(message = "Title is required")
    private String title;
    private double price;
    private Integer discount;
    private String type;
    private Integer quantity;
    private String category;

    // Constructors
    public FoodItem() {}

    public FoodItem(String image, String title, double price, Integer discount, String type, Integer quantity, String category) {
        this.image = image;
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.type = type;
        this.quantity = quantity;
        this.category = category;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("FoodItem {\n");
        sb.append("  id: ").append(id).append(",\n");
        sb.append("  title: \"").append(title).append("\",\n");
        sb.append("  price: $").append(String.format("%.2f", price)).append(",\n");

        if (discount != null && discount > 0) {
            sb.append("  discount: ").append(discount).append("%,\n");
        } else {
            sb.append("  discount: none,\n");
        }

        sb.append("  type: \"").append(type).append("\",\n");
        sb.append("  category: \"").append(category).append("\",\n");
        sb.append("  quantity: ").append(quantity).append(",\n");

        // Truncate image URL if it's too long
        if (image != null) {
            if (image.length() > 50) {
                sb.append("  image: \"").append(image.substring(0, 47)).append("...\"\n");
            } else {
                sb.append("  image: \"").append(image).append("\"\n");
            }
        } else {
            sb.append("  image: null\n");
        }

        sb.append("}");
        return sb.toString();
    }
}

