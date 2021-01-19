package com.gang.pizza.autentication.jwt.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gang.pizza.autentication.jwt.exceptions.JwtAuthenticationEntryPoint;
import com.gang.pizza.autentication.jwt.filter.JwtAuthenticationFilter;

public abstract class JwtSecurityConfigurer extends WebSecurityConfigurerAdapter {
	@Autowired
	JwtAuthenticationFilter jwtFilter;
	@Autowired
	private JwtAuthenticationEntryPoint authenticationEntryPoint;

	protected void configure(HttpSecurity httpSecurity) throws Exception {
		httpSecurity.csrf().disable();
		httpSecurity.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		httpSecurity.authorizeRequests().antMatchers("/login").permitAll();
		httpSecurity.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)
				.accessDeniedHandler(authenticationEntryPoint);

	}

}
