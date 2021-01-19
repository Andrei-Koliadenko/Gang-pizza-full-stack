package com.gang.pizza.accounting.api;

public interface ApiConstants {
	String ADD_ACCOUNT = "/accounts/account";

	String REVOKE_ACCOUNT = "/accounts/{user}/revoke";
	String ACTIVATE_ACCOUNT = "accounts/{user}/activate";

	String UPDATE_PASSWORD = "/accounts/{user}/password";
	String GET_PASSWORD = "/accounts/{user}/password";

	String ADD_ROLE = "/accounts/{user}/add"; // put
	String DELETE_ROLE = "/accounts/{user}/remove"; // put
	String GET_ROLES = "/accounts/{user}/roles";

	String USER_NAME = "user";
	String PASSWORD = "password";
	String USER_ROLE = "role";

	int MIN_LENGTH_PASSWORD = 6; // TODO remove to app properties
	String ADMIN_ROLE_PROPERTY = "${app.accounting.admin.role:ADMIN}";

}
