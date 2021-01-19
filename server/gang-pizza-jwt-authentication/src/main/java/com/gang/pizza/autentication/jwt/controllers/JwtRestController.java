package com.gang.pizza.autentication.jwt.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.gang.pizza.autentication.jwt.dto.LoginRequest;
import com.gang.pizza.autentication.jwt.dto.LoginResponse;
import com.gang.pizza.autentication.jwt.util.JwtUtil;
import com.gang.pizza.exceptions.InvalidInputException;

@RestController
@CrossOrigin
public class JwtRestController {
	@Autowired
	PasswordEncoder passwordEncoder;
	@Autowired
	JwtUtil jwtUtil;
	@Autowired
	UserDetailsService accountsProvider;

	@PostMapping("/login")
	LoginResponse login(@RequestBody LoginRequest request) {
		UserDetails details = accountsProvider.loadUserByUsername(request.username);
		String password = details.getPassword();
		String[] roles = details.getAuthorities().stream().map(a -> a.getAuthority()).toArray(String[]::new);
		String username = details.getUsername();
		if (passwordEncoder.matches(request.password, password)) {
			LoginResponse response = new LoginResponse();
			response.token = jwtUtil.generateJWT(username, roles);
			return response;
		}
		throw new InvalidInputException("Wrong Credentials");
	}
}
