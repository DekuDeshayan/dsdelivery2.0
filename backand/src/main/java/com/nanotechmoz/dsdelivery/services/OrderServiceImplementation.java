package com.nanotechmoz.dsdelivery.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanotechmoz.dsdelivery.dto.OrderDTO;
import com.nanotechmoz.dsdelivery.dto.ProductDTO;
import com.nanotechmoz.dsdelivery.entities.Order;
import com.nanotechmoz.dsdelivery.entities.Product;
import com.nanotechmoz.dsdelivery.entities.enums.OrderStatus;
import com.nanotechmoz.dsdelivery.repositories.OrderRepository;
import com.nanotechmoz.dsdelivery.repositories.ProductRepository;

@Service
public class OrderServiceImplementation implements OrderService {

	
	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Override
	@Transactional(readOnly = true)
	public List<OrderDTO> findAll() {
		
		List<Order> list = repository.findOrdersWithProducts();
		
	   /*
	    * Steps to transform order to orderDTO using lambda expression
	    * first, we need to transform  order list into stream of orderDTO
		* after that, then we finally need to transform  the stream into list of orderDTO
		*/
		//Means loop the productList and transform each of them to a dto of products
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	
	}

	@Override
	@Transactional
	public OrderDTO save(OrderDTO dto) {
		
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(),
				Instant.now(), OrderStatus.PENDING);
		
		for (ProductDTO products : dto.getProducts()) {
			
			Product product = productRepository.findById(products.getId()).get();
			
			order.getProducts().add(product);
		}
		 
		return new OrderDTO(repository.save(order));
	}

	
	@Override
	@Transactional
	public OrderDTO setDelivered(Long orderId) {
		
		Order order = repository.findById(orderId).get();
		
		order.setStatus(OrderStatus.DELIVERED);
		
		
		return  new OrderDTO(repository.save(order));  
		
	}

	

}
