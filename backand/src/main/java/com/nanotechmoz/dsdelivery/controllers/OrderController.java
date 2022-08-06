package com.nanotechmoz.dsdelivery.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanotechmoz.dsdelivery.dto.OrderDTO;
import com.nanotechmoz.dsdelivery.services.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
	
	
	@Autowired
	OrderService service;
	
	@GetMapping("findall")
	public ResponseEntity<List<OrderDTO>> findAll(){
		
		List<OrderDTO> list = service.findAll();

		return new ResponseEntity<List<OrderDTO>>(list, HttpStatus.OK);

	}

}
