package com.nanotechmoz.dsdelivery.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanotechmoz.dsdelivery.dto.ProductDTO;
import com.nanotechmoz.dsdelivery.entities.Product;
import com.nanotechmoz.dsdelivery.repositories.ProductRepository;

@Service
public class ProductServiceImplementation implements ProductService {
	
	@Autowired
	private ProductRepository repository;
	
	@Override
	@Transactional(readOnly = true)
	public List<ProductDTO> findAll() {
		
		List<Product> list = repository.findAllByOrderByNameAsc();
		
	   /*
	    * Steps to transform product to productDTO using lambda expression
	    * first, we need to transform  product list into stream of productDTO
		* after that, then we finally need to transform  the stream into list of productDTO
		*/
		return list.stream().map(x -> new ProductDTO(x)).collect(Collectors.toList());
	
	}

}
