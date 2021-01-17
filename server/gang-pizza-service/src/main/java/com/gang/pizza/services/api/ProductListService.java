package com.gang.pizza.services.api;

import java.util.List;

import com.gang.pizza.dto.*;

public interface ProductListService {
	void addProduct(ProductDto productDto);

	ProductDto deleteProduct(Long id);

	ProductDto updateProduct(Long id, ProductDto product);
	
	ProductDto getProduct(Long id);

	List<ProductDto> getProducts();
}
