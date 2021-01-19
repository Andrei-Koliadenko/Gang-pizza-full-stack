package com.gang.pizza.accounting.services;

import java.time.LocalDateTime;
import java.time.Period;

import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gang.pizza.accounting.api.AccountingManagement;
import com.gang.pizza.accounting.models.AccountStatus;
import com.gang.pizza.accounting.dto.AccountDto;
import com.gang.pizza.accounting.documents.Account;
import com.gang.pizza.accounting.repository.AccountRepo;
import com.gang.pizza.exceptions.InvalidInputException;
import com.gang.pizza.exceptions.NotFoundException;

@Service
public class AccountingManagementImpl implements AccountingManagement {

	@Value("${telran.accounting.numOfPrevPasswords:3}")
	int NUM_PREV_PASSWORDS;

	@Value("${telran.accounting.expirationPeriodDays:0}")
	int EXP_PERIOD_DAYS;

	@Value("${telran.accounting.expirationPeriodMonths:1}")
	int EXP_PERIOD_MONTHS;

	@Value("${telran.accounting.expirationPeriodYears:0}")
	int EXP_PERIOD_YEARS;
	@Autowired
	PasswordEncoder passwordEncoder;

	static Logger LOG = LoggerFactory.getLogger(AccountingManagementImpl.class);

	@Autowired
	AccountRepo accountRepo;

	private LocalDateTime calcExpirationDate(LocalDateTime fromTime) {
		Period periodFromUnits = Period.of(EXP_PERIOD_YEARS, EXP_PERIOD_MONTHS, EXP_PERIOD_DAYS);
		LocalDateTime res = fromTime.plus(periodFromUnits);
		LOG.debug("new expiration date is {}, activation date was {}", res, fromTime);
		return res;
	}

	private Account createAccount(AccountDto accountDto) {
		Account res = new Account(accountDto.username, encode(accountDto.password), accountDto.roles,
				AccountStatus.ACTIVE, LocalDateTime.now(), calcExpirationDate(LocalDateTime.now()));
		LOG.debug("convert to new accounEntity {}", res.toString());
		return res;
	}

	private String encode(String password) {

		return passwordEncoder.encode(password);
	}

	@Override
	@Transactional
	public void addAccount(AccountDto accountDto) {
		if (accountRepo.existsById(accountDto.username)) {
			LOG.debug("such account exists: {}", accountDto.username);
			throw new InvalidInputException(
					String.format("such user exists: %s, could not create it", accountDto.username));
		}
		accountRepo.save(createAccount(accountDto));
		LOG.debug("save account in service class");
	}

	@Override
	@Transactional
	public void updatePassword(String username, String password) {
		Account account = accountRepo.findById(username).orElse(null);
		if (account == null) {
			throw new NotFoundException(String.format("such user does not exist: %s", username));
		}
		if (account.getStatus() != AccountStatus.ACTIVE) {
			throw new InvalidInputException(String.format("such user  %s is not activated", username));
		}

		LinkedList<String> prevPasswords = account.getPreviousPasswords();
		if (isPasswordRepeated(prevPasswords, password)) {
			throw new InvalidInputException(String.format("such password was used, please suggest new one"));
		}
		String hashPassword = encode(password);
		prevPasswords.add(hashPassword);
		if (prevPasswords.size() > NUM_PREV_PASSWORDS) {
			prevPasswords.remove();
		}
		account.setPassword(hashPassword);
		account.setActivationDate(LocalDateTime.now());
		account.setExpirationDate(calcExpirationDate(LocalDateTime.now()));
		accountRepo.save(account);
		LOG.debug("Save updated account: {}", account.toString());
	}

	private boolean isPasswordRepeated(LinkedList<String> prevPasswords, String password) {
		return prevPasswords.stream().anyMatch(p -> passwordEncoder.matches(password, p));
	}

	@Override
	@Transactional
	public void revoke(String username) {
		Account account = accountRepo.findById(username).orElse(null);
		if (account == null) {
			throw new NotFoundException(String.format("such user does not exist: %s", username));
		}
		if (account.getStatus() == AccountStatus.REVOKED) {
			throw new InvalidInputException(String.format("status of user %s was revoked", username));
		}
		account.setStatus(AccountStatus.REVOKED);
		accountRepo.save(account);
		LOG.debug("Revoke account: {}", account.toString());
	}

	@Override
	@Transactional
	public void activate(String username) {
		Account account = accountRepo.findById(username).orElse(null);
		if (account == null) {
			throw new NotFoundException(String.format("such user does not exist: %s", username));
		}
		if (account.getStatus() == AccountStatus.ACTIVE) {
			throw new InvalidInputException(String.format("status of user %s was active", username));
		}
		account.setStatus(AccountStatus.ACTIVE);
		accountRepo.save(account);
		LOG.debug("Activate account: {}", account.toString());
	}

	@Override
	@Transactional
	public void addRole(String username, String newRole) {
		Account account = accountRepo.findById(username).orElse(null);
		isUserExistAndActual(account);
		String[] roles = account.getRoles();
		if (Arrays.asList(roles).indexOf(newRole) >= 0) {
			throw new InvalidInputException(String.format("There is such role %s for user %s", newRole, username));
		}
		String[] updRoles = Arrays.copyOf(roles, roles.length + 1);
		updRoles[roles.length] = newRole;
		account.setRoles(updRoles);
		accountRepo.save(account);
		LOG.debug("Add role {}, updated account is {}", newRole, account.toString());
	}

	@Override
	@Transactional
	public void deleteRole(String username, String role) {
		Account account = accountRepo.findById(username).orElse(null);
		isUserExistAndActual(account);
		String[] roles = account.getRoles();
		int index = Arrays.asList(roles).indexOf(role);
		if (index < 0) {
			throw new InvalidInputException(
					String.format("There is no such role %s for user %s, could not delete it", role, username));
		}

		accountRepo.save(account);
		LOG.debug("Delete role {}, updated account is {}", role, account.toString());
	}

	@Override
	public String getPasswordCode(String username) {
		Account account = accountRepo.findById(username).orElse(null);
		isUserExistAndActual(account);
		return account.getPassword();
	}

	@Override
	public String[] getRoles(String username) {
		Account account = accountRepo.findById(username).orElse(null);
		isUserExistAndActual(account);
		return account.getRoles();
	}

//	username doesn't exist
//	 * 2. password expired
//	 * 3. account revoked
	private void isUserExistAndActual(Account account) {
		if (account == null) {
			throw new NotFoundException(String.format("User  does not found"));
		}
		LOG.debug("Perform checking for user {}", account.toString());
		if (account.getStatus() != AccountStatus.ACTIVE) {
			LOG.debug("User {} is not active and could not be changed", account.getUsername());
			throw new InvalidInputException(String.format("User %s is revoked", account.getUsername()));
		}
		if (account.getExpirationDate().isBefore(LocalDateTime.now())) {
			LOG.debug("The date of exp {} is before than current date for user {}",
					account.getExpirationDate().toString(), account.getUsername());
			throw new InvalidInputException(String.format("Password for user %s is expired", account.getUsername()));
		}
	}

}
