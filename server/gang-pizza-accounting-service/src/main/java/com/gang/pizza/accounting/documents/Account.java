package com.gang.pizza.accounting.documents;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.LinkedList;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Past;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.gang.pizza.accounting.models.AccountStatus;

@Document(collection = "accounts")
public class Account {

	@Id
	String username;

	@NotNull
	String password;

	String[] roles;

	LocalDateTime expirationDate;

	LinkedList<String> previousPasswords;

	@Past
	LocalDateTime activationDate;

	@NotNull
	AccountStatus status;

	public Account(String username, @NotNull String password, String[] roles, @NotNull AccountStatus status,
			@Past LocalDateTime activationDate, LocalDateTime expirationDate) {
		super();
		this.username = username;
		this.password = password;
		this.roles = roles;
		this.expirationDate = expirationDate;
		this.activationDate = activationDate;
		this.status = status;
		this.previousPasswords = new LinkedList<String>();
		this.previousPasswords.add(password);
	}

	@Override
	public String toString() {
		return "Account [username=" + username + ", password=" + password + ", roles=" + Arrays.toString(roles)
				+ ", expirationDate=" + expirationDate + ", previousPasswords=" + previousPasswords
				+ ", activationDate=" + activationDate + ", status=" + status + "]";
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setExpirationDate(LocalDateTime expirationDate) {
		this.expirationDate = expirationDate;
	}

	public void setActivationDate(LocalDateTime activationDate) {
		this.activationDate = activationDate;
	}

	public void setStatus(AccountStatus status) {
		this.status = status;
	}

	public String getUsername() {
		return username;
	}

	public String getPassword() {
		return password;
	}

	public String[] getRoles() {
		return roles;
	}

	public LocalDateTime getExpirationDate() {
		return expirationDate;
	}

	public LocalDateTime getActivationDate() {
		return activationDate;
	}

	public AccountStatus getStatus() {
		return status;
	}

	public void setRoles(String[] roles) {
		this.roles = roles;
	}

	public LinkedList<String> getPreviousPasswords() {
		return previousPasswords;
	}

	public void setPreviousPasswords(LinkedList<String> previousPasswords) {
		this.previousPasswords = previousPasswords;
	}

}
