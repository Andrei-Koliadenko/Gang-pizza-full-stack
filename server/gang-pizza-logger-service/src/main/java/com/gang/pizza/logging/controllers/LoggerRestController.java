package com.gang.pizza.logging.controllers;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import com.gang.pizza.logging.api.LoggingManagement;
import com.gang.pizza.logging.dto.ExceptionCount;
import com.gang.pizza.logging.dto.ExceptionType;
import com.gang.pizza.logging.dto.LogDto;

import javax.annotation.PreDestroy;

import java.time.LocalDateTime;
import java.util.*;

import static com.gang.pizza.logging.api.ApiConstants.*;

@RestController
public class LoggerRestController {
	static Logger LOG = LoggerFactory.getLogger(LoggerRestController.class);
	@Autowired
	LoggingManagement service;

	@PostMapping(LOGGER_ADDLOG)
	LogDto addLog(@RequestBody LogDto log) {
		service.addLog(log);
		LOG.debug("log with className: {} and methodName: {} aded", log.className, log.methodName);
		return log;
	}

	@GetMapping(LOGGER_LOGSDATES)
	List<LogDto> getLogsDates(
			@RequestParam(name = FROM, defaultValue = FROM_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
			@RequestParam(name = TO, defaultValue = TO_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to) {
//   LOG.debug("from: {} to: {}",from, to);
		return service.getLogsDates(from, to);
	}

//    @GetMapping(LOGGER_ALLEXCEPTIONS)
//	List<LogDto> getAllExceptions(
//			@RequestParam(name = "FROM", defaultValue = "FROM_DEFAULT_VALUE") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
//			@RequestParam(name = "TO", defaultValue = "TO_DEFAULT_VALUE") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to){
//        return service.getAllExceptions(from,to);
//    }

	@GetMapping(LOGGER_EXCEPTIONS)
	List<LogDto> getExceptionsType(
			@RequestParam(name = FROM, defaultValue = FROM_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
			@RequestParam(name = TO, defaultValue = TO_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
			@RequestParam(name = EXCEPTION_TYPE, required = false) ExceptionType exceptionType) {
		return exceptionType == null ? service.getAllExceptions(from, to)
				: service.getExceptionsType(from, to, exceptionType);
	}

	@GetMapping(LOGGER_CLASSMETHOD)
	List<LogDto> getExceptionsType(
			@RequestParam(name = FROM, defaultValue = FROM_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
			@RequestParam(name = TO, defaultValue = TO_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
			@RequestParam(name = CLASS_NAME) String className, @RequestParam(name = METHOD_NAME) String methodName) {
		return service.getLogsClassMethod(from, to, className, methodName);
	}

	@GetMapping(LOGGER_CLASS)
	List<LogDto> getExceptionsType(
			@RequestParam(name = FROM, defaultValue = FROM_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime from,
			@RequestParam(name = TO, defaultValue = TO_DEFAULT_VALUE) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime to,
			@RequestParam(name = CLASS_NAME) String className) {
		return service.getExceptionsClass(from, to, className);
	}

	@GetMapping(LOGGER_POPULAREXCEPTIONCOUNT)
	List<ExceptionCount> getMostEncounteredExceptions(@RequestParam(name = N_EXCEPTIONS) int nExceptions) {
		return service.getMostEncounteredExceptions(nExceptions);
	}

	@GetMapping(LOGGER_SECEXCCOUNT)
	long getSecurityExceptionsCount() {
		return service.getSecurityExceptionsCount();
	}

	@PreDestroy
	void contextWillClosed() {
		LOG.info("Context closed, Logger says bye!");
	}
}
