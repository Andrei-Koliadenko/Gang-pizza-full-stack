package com.gang.pizza.logging.documents;

import org.springframework.data.mongodb.core.mapping.Document;

import com.gang.pizza.logging.dto.ExceptionType;

import java.time.LocalDateTime;

@Document(collection = "loggers")
public class Logger {
	public LocalDateTime dateTime;
	public boolean isException;
	public ExceptionType exceptionType;
	public String methodName;
	public String className;
	public int responseTime;
	public String result;

	public LocalDateTime getDateTime() {
		return dateTime;
	}

	public boolean isException() {
		return isException;
	}

	public ExceptionType getExceptionType() {
		return exceptionType;
	}

	public String getMethodName() {
		return methodName;
	}

	public String getClassName() {
		return className;
	}

	public int getResponseTime() {
		return responseTime;
	}

	public String getResult() {
		return result;
	}

	@Override
	public String toString() {
		return "Logger{" + "dateTime='" + dateTime + '\'' + ", isException=" + isException + ", exceptionType="
				+ exceptionType + ", methodName='" + methodName + '\'' + ", className='" + className + '\''
				+ ", responseTime=" + responseTime + ", result='" + result + '\'' + '}';
	}

	public Logger(LocalDateTime dateTime, boolean isException, ExceptionType exceptionType, String methodName,
			String className, int responseTime, String result) {
		this.dateTime = dateTime;
		this.isException = isException;
		this.exceptionType = exceptionType;
		this.methodName = methodName;
		this.className = className;
		this.responseTime = responseTime;
		this.result = result;
	}

	public Logger() {
	}
}
