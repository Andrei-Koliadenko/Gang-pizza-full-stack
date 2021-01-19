package com.gang.pizza.autentication.jwt.exceptions;

import java.io.IOException;
import java.time.LocalDateTime;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import com.gang.pizza.logging.api.LoggingComponent;
import com.gang.pizza.logging.dto.ExceptionType;
import com.gang.pizza.logging.dto.LogDto;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint, AccessDeniedHandler {
	@Autowired
	LoggingComponent loggingComponent;
	static Logger LOG = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

	@Override
	/**
	 * method for handling authentication errors
	 */
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		loggingComponent.sendLog(new LogDto(LocalDateTime.now(), true, ExceptionType.AUTHENTICATION_EXCEPTION, "", "",
				0, "Authenticatiion error"));
		response.sendError(401, authException.getMessage());

	}

	@Override
	/**
	 * Method for handling authorization error
	 * 
	 * @param request
	 * @param response
	 * @param accessDeniedException
	 * @throws IOException
	 * @throws ServletException
	 */
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		loggingComponent.sendLog(new LogDto(LocalDateTime.now(), true, ExceptionType.AUTHORIZATION_EXCEPTION, "", "", 0,
				"Authorization error"));
		response.sendError(403);
	}

}
