package com.gang.pizza.aop.logging;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import javax.servlet.http.HttpServletRequest;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.gang.pizza.logging.api.LoggingComponent;
import com.gang.pizza.logging.dto.ExceptionType;
import com.gang.pizza.logging.dto.LogDto;

@Component // for Application Context
@Aspect // as Logging aspect
public class LoggerAspect {
	@Autowired
	LoggingComponent logging;

	@Pointcut("@within(org.springframework.web.bind.annotation.RestController)")
	void pointcutRestController() {

	}

	@Pointcut("@within(org.springframework.web.bind.annotation.RestControllerAdvice)")
	void pointcutRestControllerAdvice() {

	}

	@Around("pointcutRestController()")
	public Object loggingRestController(ProceedingJoinPoint joinPoint) throws Throwable {
		String methodName = joinPoint.getSignature().getName(); // name of join method
		String className = joinPoint.getTarget().getClass().getName(); // class name for joint method
		try {
			Instant start = Instant.now();
			Object result = joinPoint.proceed();
			logging.sendLog(new LogDto(LocalDateTime.now(), false, ExceptionType.NO_EXCEPTION, methodName, className,
					(int) ChronoUnit.MILLIS.between(start, Instant.now()), result == null ? "" : result.toString()));
			return result;
		} catch (Throwable e) {
			logging.sendLog(new LogDto(LocalDateTime.now(), true, ExceptionType.INVALID_INPUT, methodName, className, 0,
					e.getMessage()));
			throw e;
		}

	}

	@Around("pointcutRestControllerAdvice()")
	public Object loggingRestControllerAdvice(ProceedingJoinPoint joinPoint) throws Throwable {
		Object[] args = joinPoint.getArgs();
		Object result = joinPoint.proceed();
		String path = loggingPath(args);
		if (loggingPath(args) != null) {
			logging.sendLog(new LogDto(LocalDateTime.now(), true, ExceptionType.INVALID_INPUT, path, "", 0,
					result == null ? "" : result.toString()));
		}
		return result;
	}

	private String loggingPath(Object[] args) {

		for (Object arg : args) {
			if (arg == null)
				continue;
			if (arg instanceof Throwable) {
				if (arg.getClass().getName().contains("telran")) {
					return null;
				}
			}
		}
		for (Object arg : args) {
			if (arg == null)
				continue;
			if (arg instanceof HttpServletRequest) {

				return ((HttpServletRequest) arg).getRequestURL().toString();
			}
		}
		return "";
	}

}
