package com.nanotechmoz.dsdelivery.controllers;

import java.net.URI;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.nanotechmoz.dsdelivery.dto.OrderDTO;
import com.nanotechmoz.dsdelivery.services.OrderService;

@RestController
@RequestMapping("/api/order")
public class OrderController {
	
	
	@Autowired
	OrderService service;
	
	@GetMapping("findall")
	public ResponseEntity<List<OrderDTO>> findAll(){

		return new ResponseEntity<List<OrderDTO>> (service.findAll(), HttpStatus.OK);

	}
	
	
	@PostMapping("/save")
	public ResponseEntity<OrderDTO> save(@RequestBody OrderDTO dto){
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/id")
				.buildAndExpand(dto.getId()).toUri();
		
		return ResponseEntity.created(uri).body(service.save(dto));
		
		//return new ResponseEntity<OrderDTO>(service.save(dto), HttpStatus.CREATED);
	}

}
