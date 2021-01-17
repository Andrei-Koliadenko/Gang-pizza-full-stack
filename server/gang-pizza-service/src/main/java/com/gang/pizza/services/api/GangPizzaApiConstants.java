package com.gang.pizza.services.api;

public interface GangPizzaApiConstants {
	// Constants for adding
	String ADD_PRODUCT = "/gang-pizza/product";
	String ADD_ORDER = "/gang-pizza/order";
	/***************************************/
	// Constants for deleting
	String DELETE_PRODUCT = "/gang-pizza/product/delete";
	String DELETE_ORDER = "/gang-pizza/order/delete";
	/*********************************************************************/
	// Constants for updating
	String UPDATE_PRODUCT = "/gang-pizza/product/{id}";
	String UPDATE_ORDER = "/gang-pizza/order/{id}";
	/************************************************************************/
	// Constants for getting
	String GET_PRODUCTS = "/gang-pizza/product/";
	String GET_ORDERS = "/gang-pizza/product/";
	String GET_PRODUCT = "/gang-pizza/product/{id}";
	String GET_ORDER = "/gang-pizza/product/{id}";
	/************************************************************************/
	// Roles
	String ROLE_GUEST = "GUEST";
	String ROLE_USER = "USER";
	String ROLE_ADMIN = "ADMIN";
}
