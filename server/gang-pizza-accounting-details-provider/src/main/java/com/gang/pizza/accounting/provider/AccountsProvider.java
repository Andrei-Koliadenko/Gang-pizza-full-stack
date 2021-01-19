package com.gang.pizza.accounting.provider;

import java.util.Arrays;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.gang.pizza.accounting.api.AccountingComponent;

@Component
public class AccountsProvider implements UserDetailsService {
	static Logger LOG = LoggerFactory.getLogger(AccountsProvider.class);
	@Autowired
	AccountingComponent accountingComponent;

	@Bean
	PasswordEncoder getPasswordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		String password;
		String[] rolesForAuthorities;
		try {
			LOG.debug("User {} is going to be authenticated", username);
			password = accountingComponent.getPassword(username);
			LOG.debug("The password hash {} has been gotten from accounting-service", password);
			String[] roles = accountingComponent.getRoles(username);
			LOG.debug("Roles {} have been gotten from accounting-service", Arrays.deepToString(roles));
			rolesForAuthorities = Arrays.stream(roles).map(r -> "ROLE_" + r).toArray(String[]::new);
			return new User(username, password, AuthorityUtils.createAuthorityList(rolesForAuthorities));
		} catch (Exception e) {
			LOG.error("getting password failed exception: {} message: {}", e.getClass().getName(), e.getMessage());
			throw new UsernameNotFoundException("No user");
		}

	}

}
