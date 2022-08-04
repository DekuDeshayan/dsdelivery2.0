package com.nanotechmoz.dsdelivery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nanotechmoz.dsdelivery.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
