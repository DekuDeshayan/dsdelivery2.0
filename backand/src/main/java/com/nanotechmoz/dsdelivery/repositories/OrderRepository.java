package com.nanotechmoz.dsdelivery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nanotechmoz.dsdelivery.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
	
	/*
	 * JPQL to bring all orders alongside its products(using a join statement because the 	
	 * order and products have a relationship of manytomany, hence they riquire a join statement
	 * to be brought together, and we have to specify the joinColumn that is products)
	 */

	@Query("SELECT DISTINCT orders from Order orders JOIN FETCH orders.products"
			+ " WHERE orders.status = 0 ORDER BY orders.moment ASC ")
	List<Order> findOrdersWithProducts();
}
