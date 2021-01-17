package com.gang.pizza.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

import com.gang.pizza.autentication.jwt.configuration.JwtSecurityConfigurer;

import static com.gang.pizza.services.api.GangPizzaApiConstants.*;

@Configuration
public class GangPizzaSecurityConfig extends JwtSecurityConfigurer {
	@Value("${app.authorization.enable:true}")
	boolean authorization;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		super.configure(httpSecurity);// not to repeat basic configuration for Basic
		if (!authorization) {
			httpSecurity.authorizeRequests().anyRequest().permitAll();
			return;
		}

		// Adding rules
		httpSecurity.authorizeRequests().antMatchers(HttpMethod.POST, ADD_PRODUCT).hasRole(ROLE_ADMIN);
		// Deleting rules
		httpSecurity.authorizeRequests().antMatchers(HttpMethod.DELETE).hasRole(ROLE_ADMIN);
		// Updating rules
		httpSecurity.authorizeRequests().antMatchers(HttpMethod.PUT).hasRole(ROLE_ADMIN);
		// Getting rules
		httpSecurity.authorizeRequests().antMatchers(GET_PRODUCTS, GET_PRODUCT).hasAnyRole(ROLE_GUEST, ROLE_USER, ROLE_ADMIN);
	}
}
