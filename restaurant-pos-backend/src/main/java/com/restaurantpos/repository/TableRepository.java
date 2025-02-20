package com.restaurantpos.repository;

import com.restaurantpos.model.Table;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TableRepository extends JpaRepository<Table, Long> {
    Optional<Table> findByTableNumber(int tableNumber);
}

