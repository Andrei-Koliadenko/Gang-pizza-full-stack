package com.gang.pizza.logging.repository;

import java.util.List;

import com.gang.pizza.logging.dto.ExceptionCount;

public interface MongoAdditionalOperations {

	List<ExceptionCount> findMostEncounteredExceptions(int nStudents);

	long getSecurityExceptionsCount();
}
