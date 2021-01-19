package com.gang.pizza.accounting.dto;

import java.util.Arrays;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

import com.gang.pizza.accounting.validation.StrongPassword;

public class AccountDto {
	@NotEmpty
	@Size(min = 5)
	public String username;

	@NotEmpty
	@Size(min = 6)
	@StrongPassword
	public String password;

	@NotEmpty
	public String[] roles;

	public AccountDto(@NotEmpty String username, @NotEmpty String password, @NotEmpty String[] roles) {
		super();
		this.username = username;
		this.password = password;
		this.roles = roles;
	}

	public AccountDto() {
		super();
	}

	@Override
	public String toString() {
		return "AccountDto [username=" + username + ", password=" + password + ", roles=" + Arrays.toString(roles)
				+ "]";
	}

}
