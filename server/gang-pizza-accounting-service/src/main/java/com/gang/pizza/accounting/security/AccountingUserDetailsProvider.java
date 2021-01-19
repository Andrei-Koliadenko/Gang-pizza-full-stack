package com.gang.pizza.accounting.security;

import org.slf4j.*;
import static com.gang.pizza.accounting.api.ApiConstants.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class AccountingUserDetailsProvider implements UserDetailsService {
	static Logger LOG = LoggerFactory.getLogger(AccountingUserDetailsProvider.class);
	@Value("${app.accounting.user.name:user}")
	private String username;
	@Value("${app.accounting.admin.name:admin}")
	private String adminName;
	@Value("${app.accounting.user.password}")
	private String userPassword;
	@Value("${app.accounting.admin.password}")
	String adminPassword;
	@Value(ADMIN_ROLE_PROPERTY)
	private String adminRole;
	@Value("${app.accounting.user.role:USER}")
	private String userRole;

	@Override
	public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
		LOG.debug("authentication request of the accounting management for user {} ", username);
		if (!name.equals(username) && !name.equals(adminName)) {
			throw new UsernameNotFoundException("");
		}

		return name.equals(adminName)
				? new User(name, "{noop}" + adminPassword, AuthorityUtils.createAuthorityList("ROLE_" + adminRole))
				: new User(name, "{noop}" + userPassword, AuthorityUtils.createAuthorityList("ROLE_" + userRole));
	}

}
