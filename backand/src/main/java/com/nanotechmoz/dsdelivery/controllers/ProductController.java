package com.nanotechmoz.dsdelivery.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nanotechmoz.dsdelivery.dto.ProductDTO;
import com.nanotechmoz.dsdelivery.services.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {
	
	@Autowired
	ProductService service;
	
	@GetMapping("findall")
	public ResponseEntity<List<ProductDTO>> findAll(){
		
		List<ProductDTO> list = service.findAll();

		return new ResponseEntity<List<ProductDTO>>(list, HttpStatus.OK);
		//return ResponseEntity.ok(list);
	}

}
