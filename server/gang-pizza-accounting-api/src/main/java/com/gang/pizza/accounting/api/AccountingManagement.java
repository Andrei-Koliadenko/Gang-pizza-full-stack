package com.gang.pizza.accounting.api;

import com.gang.pizza.accounting.dto.AccountDto;

public interface AccountingManagement {
	//Administrator actions
/** 
 * Adding new account-document
 * validation:
 * 1. Account should have unique username
 * content of account-document should be the following
 * 1.username
 * 2.encoded password hash
 * 3. Activation date time
 * 4. Expiration date time (Service implementation should have configurable property of active durability 
 * 5. state ("ACTIVE", "REVOKED")
 * 6. Array of three last password codes
 * 
 * @param accountDto
 */
	void addAccount(AccountDto accountDto); //POST
	
	/**
	 * Updates password and sets the current activation date with proper update the expiration date
	 * validation:
	 * 1. Account with username exists
	 * 2. New password differs from three last ones
	 * 3. Updating may be only if the account is activated
	 * @param username
	 * @param password
	 */
	void updatePassword(String username, String password); //PUT
	
	/**
	 * revokes account (moves account in the state revoked)
	 * 1. Account with username exists
	 * 2. Account should be in the state "activated"
	 * @param username
	 */
	void revoke(String username); //DELETE
	
	/**
	 * activates account (moves from the state "revoked" to state "activated"
	 * validation: 
	 * 1. Account with username exists
	 * 2. Should be in the state "revoked"
	 * @param username
	 */
	void activate(String username); //PUT
	/**
	 * adding new role
	 * validation:
	 * 1. Account with username exists
	 * 2. Should be in the state "active"
	 * 3. Not expired
	 * 4. A role doesn't exist
	 * @param username
	 * @param newRole
	 */
	void addRole(String username, String newRole); //PUT
	/**
	 * deletes a role
	 * validation:
	 * 1. Account with username exists
	 * 2. Should be in the state "active"
	 * 3. Not expired
	 * 4. The role  exists
	 * @param username
	 * @param role
	 */
	void deleteRole(String username, String role); //PUT
	
	//User Actions
	/**
	 * 
	 * @param username
	 * @return password code 
	 * throws exceptions with the following messages
	 * 1. username doesn't exist
	 * 2. password expired
	 * 3. account revoked
	 */
	String getPasswordCode(String username) ;
	/**
	 * 
	 * @param username
	 * @return roles 
	 * throws exceptions with the following messages
	 * 1. username doesn't exist
	 * 2. password expired
	 * 3. account revoked
	 */
	String[] getRoles(String username);
	
}