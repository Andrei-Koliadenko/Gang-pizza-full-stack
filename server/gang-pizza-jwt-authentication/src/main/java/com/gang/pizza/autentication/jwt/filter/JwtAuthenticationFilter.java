package com.gang.pizza.autentication.jwt.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gang.pizza.autentication.jwt.util.JwtUtil;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	static Logger LOG = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
	static final String BEARER = "Bearer ";
	@Autowired
	JwtUtil jwtUtil;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		String authHeader = request.getHeader("Authorization");
		if (authHeader != null) {
			if (authHeader.startsWith(BEARER)) {
				String token = authHeader.substring(BEARER.length());
				String[] roles;
				try {
					roles = jwtUtil.validateToken(token);
				} catch (Exception e) {
					LOG.error("Authentication error {}", e.getMessage());
					response.sendError(401, e.getMessage());
					return;
				}
				UsernamePasswordAuthenticationToken springToken = new UsernamePasswordAuthenticationToken(null, null,
						AuthorityUtils.createAuthorityList(roles));
				springToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));// create
																									// authentication
																									// object for Spring
				// At any place after successful authentication we can get authentication object
				// containing details
				// Authentication details exist in SecurityContextHolder
				// (SecurityContextHolder.getContext())
				SecurityContextHolder.getContext().setAuthentication(springToken);

			}
		}
		filterChain.doFilter(request, response); // continue filtering

	}

}
