package com.nanotechmoz.dsdelivery.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanotechmoz.dsdelivery.dto.OrderDTO;
import com.nanotechmoz.dsdelivery.entities.Order;
import com.nanotechmoz.dsdelivery.repositories.OrderRepository;

@Service
public class OrderServiceImplementation implements OrderService {

	
	@Autowired
	private OrderRepository repository;
	
	@Override
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		
		List<Order> list = repository.findOrdersWithProducts();
		
	   /*
	    * Steps to transform order to orderDTO using lambda expression
	    * first, we need to transform  order list into stream of orderDTO
		* after that, then we finally need to transform  the stream into list of orderDTO
		*/
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	
	}

	

}
