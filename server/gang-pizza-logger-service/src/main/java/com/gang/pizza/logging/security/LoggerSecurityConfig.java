package com.gang.pizza.logging.security;

import org.springframework.beans.factory.annotation.Value;
import static com.gang.pizza.logging.api.ApiConstants.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import com.gang.pizza.accounting.configuration.UsernamePassowordBasicConfig;

@Configuration
public class LoggerSecurityConfig extends UsernamePassowordBasicConfig {

	@Value("${app.authorization.enable:true}")
	boolean authorization;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		super.configure(httpSecurity);
		if (!authorization) {
			httpSecurity.authorizeRequests().anyRequest().permitAll();
			return;
		}
		httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST).hasRole(ROLE_USER);
		httpSecurity.authorizeRequests().anyRequest().hasRole(ROLE_STATIST);
	}

}
