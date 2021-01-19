package com.gang.pizza.logging.api;

import java.time.LocalDateTime;
import java.util.*;

import com.gang.pizza.logging.dto.ExceptionCount;
import com.gang.pizza.logging.dto.ExceptionType;
import com.gang.pizza.logging.dto.LogDto;

public interface LoggingManagement {

	void addLog(LogDto logDto);

	List<LogDto> getLogsDates(LocalDateTime from, LocalDateTime to);

	List<LogDto> getAllExceptions(LocalDateTime from, LocalDateTime to);

	List<LogDto> getExceptionsType(LocalDateTime from, LocalDateTime to, ExceptionType type);

	List<LogDto> getLogsClassMethod(LocalDateTime from, LocalDateTime to, String className, String methodName);

	List<LogDto> getExceptionsClass(LocalDateTime from, LocalDateTime to, String className);

	List<ExceptionCount> getMostEncounteredExceptions(int nExceptions);

	long getSecurityExceptionsCount(); // authorization and authentications exceptions
}
