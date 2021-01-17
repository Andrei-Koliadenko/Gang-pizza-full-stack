package com.gang.pizza.repo;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.Param;
//import org.springframework.transaction.annotation.Transactional;

import com.gang.pizza.documents.Product;

public interface ProductListRepository extends MongoRepository<Product, String> {

}
