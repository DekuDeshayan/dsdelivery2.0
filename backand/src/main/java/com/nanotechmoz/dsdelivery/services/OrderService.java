package com.nanotechmoz.dsdelivery.services;

import java.util.List;

import com.nanotechmoz.dsdelivery.dto.OrderDTO;

public interface OrderService {
	
	List<OrderDTO> findAll();
	
	OrderDTO save(OrderDTO dto);
	
	OrderDTO setDelivered(Long orderId);
	
	

}
