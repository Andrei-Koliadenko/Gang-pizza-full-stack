package com.gang.pizza.logging.service;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.gang.pizza.logging.api.LoggingManagement;
import com.gang.pizza.logging.documents.Logger;
import com.gang.pizza.logging.dto.ExceptionCount;
import com.gang.pizza.logging.dto.ExceptionType;
import com.gang.pizza.logging.dto.LogDto;
import com.gang.pizza.logging.repository.LoggerRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class LoggingManagementMongoImpl implements LoggingManagement {
	@Autowired
	LoggerRepository loggerRepo;
	static org.slf4j.Logger LOG = LoggerFactory.getLogger(LoggingManagementMongoImpl.class);

	@Override
	@Transactional
	public void addLog(LogDto logDto) {
		Logger logger = toLogger(logDto);
		loggerRepo.save(logger);
	}

	private Logger toLogger(LogDto logDto) {
		return new Logger(logDto.dateTime, logDto.isException, logDto.exceptionType, logDto.methodName,
				logDto.className, logDto.responseTime, logDto.result);
	}

	private List<LogDto> toListLoggerDto(List<Logger> loggers) {
		return loggers.stream().map(this::toLogDto).collect(Collectors.toList());
	}

	private LogDto toLogDto(Logger logger) {
		LogDto res = new LogDto();
		res.dateTime = logger.dateTime;
		res.isException = logger.isException;
		res.exceptionType = logger.exceptionType;
		res.methodName = logger.methodName;
		res.className = logger.className;
		res.responseTime = logger.responseTime;
		res.result = logger.result;
		return res;
	}

	@Override
	public List<LogDto> getLogsDates(LocalDateTime from, LocalDateTime to) {
		return toListLoggerDto(loggerRepo.findByDateTimeBetween(from, to));
	}

	@Override
	public List<LogDto> getAllExceptions(LocalDateTime from, LocalDateTime to) {
		return toListLoggerDto(loggerRepo.findByDateTimeBetweenAndIsException(from, to, true));
	}

	@Override
	public List<LogDto> getExceptionsType(LocalDateTime from, LocalDateTime to, ExceptionType type) {
		return toListLoggerDto(loggerRepo.findByDateTimeBetweenAndExceptionType(from, to, type));
	}

	@Override
	public List<LogDto> getLogsClassMethod(LocalDateTime from, LocalDateTime to, String className, String methodName) {
		return toListLoggerDto(loggerRepo.findLogsClassMethod(from, to, className, methodName));
	}

	@Override
	public List<LogDto> getExceptionsClass(LocalDateTime from, LocalDateTime to, String className) {
		return toListLoggerDto(loggerRepo.findByDateTimeBetweenAndClassName(from, to, className));
	}

	@Override
	public List<ExceptionCount> getMostEncounteredExceptions(int nExceptions) {
		return loggerRepo.findMostEncounteredExceptions(nExceptions);
	}

	@Override
	public long getSecurityExceptionsCount() {
		return loggerRepo.getSecurityExceptionsCount();
	}
}
