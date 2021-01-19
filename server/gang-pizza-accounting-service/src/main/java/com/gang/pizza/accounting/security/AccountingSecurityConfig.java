package com.gang.pizza.accounting.security;

import static com.gang.pizza.accounting.api.ApiConstants.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration

public class AccountingSecurityConfig extends WebSecurityConfigurerAdapter {
	@Value(ADMIN_ROLE_PROPERTY)
	String adminRole;

	@Bean
	PasswordEncoder getPasswordEncoder() { // putting all encoders into AC
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.httpBasic();
		httpSecurity.csrf().disable();
		httpSecurity.authorizeRequests().antMatchers(HttpMethod.GET).authenticated();
		httpSecurity.authorizeRequests().anyRequest().hasRole(adminRole);
		httpSecurity.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	}

}
