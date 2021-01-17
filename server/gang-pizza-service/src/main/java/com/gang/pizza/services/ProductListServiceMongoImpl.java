package com.gang.pizza.services;


import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gang.pizza.repo.*;
import com.gang.pizza.dto.*;
import com.gang.pizza.documents.*;

import com.gang.pizza.exceptions.InvalidInputException;
import com.gang.pizza.exceptions.NotFoundException;
import com.gang.pizza.services.api.ProductListService;

@Service
@Transactional(readOnly = true)
public class ProductListServiceMongoImpl implements ProductListService {
	@Autowired
	ProductListRepository productListRepo;

	@Override
	@Transactional
	public void addProduct(ProductDto productDto) {
//		if (productListRepo.existsById(productDto.id)) {
//			throw new InvalidInputException("Product already exists " + productDto.id);
//		}
		Product product = new Product(productDto);
		productListRepo.save(product);	
	}

	@Override
	@Transactional
	public ProductDto deleteProduct(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional
	public ProductDto updateProduct(Long id, ProductDto product) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ProductDto> getProducts() {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public ProductDto getProduct(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
