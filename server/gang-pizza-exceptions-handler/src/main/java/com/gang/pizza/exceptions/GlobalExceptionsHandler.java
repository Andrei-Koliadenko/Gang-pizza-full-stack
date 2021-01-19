package com.gang.pizza.exceptions;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;

import org.slf4j.*;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionsHandler {

	private static Logger LOG = LoggerFactory.getLogger(GlobalExceptionsHandler.class);

	@ExceptionHandler(ConstraintViolationException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	String processingConstraintExceptions(ConstraintViolationException e, HttpServletRequest request) {
		return processingException(e);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	String processingMethodArgumentExceptions(MethodArgumentNotValidException e, HttpServletRequest request) {
		return processingException(e);
	}

	@ExceptionHandler(InvalidInputException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	String processingInvalidInputExceptions(InvalidInputException e) {
		return processingException(e);
	}

	private String processingException(Exception e) {
		LOG.error(e.getMessage());

		return e.getMessage();
	}

	@ExceptionHandler(NotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String processingNotFoundExceptions(NotFoundException e) {
		return processingException(e);
	}

	@ExceptionHandler(RuntimeException.class)
	@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
	String processingOtherExceptions(RuntimeException e) {
		return processingException(e);
	}

}
