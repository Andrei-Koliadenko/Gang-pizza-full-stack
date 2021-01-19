package com.gang.pizza.autentication.jwt.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

import java.util.*;

@Component
public class JwtUtil {
	private static final String ROLES = "roles";
	@Value("${app.jwt.secret}")
	String secret;
	@Value("${app.expiration.hours:1}")
	int expirationHours;

	public String generateJWT(String username, String[] roles) {
		Map<String, Object> claims = new HashMap<>();
		claims.put(ROLES, roles);
		return Jwts.builder().setClaims(claims)
				.setExpiration(new Date(System.currentTimeMillis() + 3600 * 1000 * expirationHours))
				.setSubject(username).setIssuedAt(new Date()).signWith(SignatureAlgorithm.HS512, secret).compact();
	}

	public String[] validateToken(String token) {

		Claims claims = Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
		return ((List<String>) claims.get(ROLES)).toArray(new String[0]);

	}
}
