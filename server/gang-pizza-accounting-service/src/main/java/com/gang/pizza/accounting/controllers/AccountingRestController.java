package com.gang.pizza.accounting.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.gang.pizza.accounting.api.AccountingManagement;
import com.gang.pizza.accounting.dto.AccountDto;
import com.gang.pizza.accounting.validation.StrongPassword;

import static com.gang.pizza.accounting.api.ApiConstants.*;

import javax.annotation.PreDestroy;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@RestController
@Validated
@Valid
public class AccountingRestController {
	static Logger LOG = LoggerFactory.getLogger(AccountingRestController.class);

	@Autowired
	AccountingManagement accountService;

	@PostMapping(ADD_ACCOUNT)
	AccountDto addAccount(@RequestBody @Valid AccountDto accountDto) {
		accountService.addAccount(accountDto);
		LOG.debug("add account: {}", accountDto.toString());
		return accountDto;
	}

	@PutMapping(UPDATE_PASSWORD)
	void updatePassword(@PathVariable(name = USER_NAME, required = true) String username,
			@RequestBody @Valid @Size(min = MIN_LENGTH_PASSWORD) @StrongPassword String password) {
		LOG.debug("recive request to change for user {} password to {}", username, password);
		accountService.updatePassword(username, password);
	}

	@DeleteMapping(REVOKE_ACCOUNT)
	void revoke(@PathVariable(name = USER_NAME, required = true) String username) {
		LOG.debug("receive request to revoke user {}", username);
		accountService.revoke(username);
	}

	@PutMapping(ACTIVATE_ACCOUNT)
	void activate(@PathVariable(name = USER_NAME, required = true) String username) {
		LOG.debug("receive request to activate user {}", username);
		accountService.activate(username);
	}

	@PutMapping(ADD_ROLE)
	void addRole(@PathVariable(name = USER_NAME, required = true) String username,
			@RequestParam(name = USER_ROLE) @NotEmpty String newRole) {
		LOG.debug("receive request to add role {} to user {}", newRole, username);
		accountService.addRole(username, newRole);
	}

	@PutMapping(DELETE_ROLE)
	void deleteRole(@PathVariable(name = USER_NAME, required = true) String username,
			@RequestParam(name = USER_ROLE) @NotEmpty String role) {
		LOG.debug("receive request to delete role {} for user {}", role, username);
		accountService.deleteRole(username, role);
	}

	@GetMapping(GET_PASSWORD)
	String getPasswordCode(@PathVariable(name = USER_NAME, required = true) String username) {
		LOG.debug("receive request to get password for user {}", username);
		return accountService.getPasswordCode(username);
	}

	@GetMapping(GET_ROLES)
	String[] getRoles(@PathVariable(name = USER_NAME, required = true) String username) {
		LOG.debug("receive request to get roles for user {}", username);
		return accountService.getRoles(username);
	}
	
	@PreDestroy
	void contextWillClosed() {
		LOG.info("Context closed, Accounting says bye!");
	}

}
