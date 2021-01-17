package com.gang.pizza.controllers;

import java.time.LocalDateTime;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import com.gang.pizza.dto.ProductDto;
import com.gang.pizza.services.api.ProductListService;

import static com.gang.pizza.services.api.GangPizzaApiConstants.*;

@RestController
@Validated
@Valid
public class ProductListRestController {
	static Logger LOG = LoggerFactory.getLogger(ProductListRestController.class);
	@Autowired
	ProductListService service;

	@PostMapping(ADD_PRODUCT)
	ProductDto addProduct(@RequestBody @Valid ProductDto productDto) {
		service.addProduct(productDto);
		return productDto;
	}

	@PreDestroy
	void contextWillClosed() {
		LOG.info("Context closed, bye!");
	}
}
