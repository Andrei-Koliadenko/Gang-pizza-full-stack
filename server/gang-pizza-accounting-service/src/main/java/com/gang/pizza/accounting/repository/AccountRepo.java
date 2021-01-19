package com.gang.pizza.accounting.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.gang.pizza.accounting.documents.Account;

public interface AccountRepo extends MongoRepository<Account, String> {

}
