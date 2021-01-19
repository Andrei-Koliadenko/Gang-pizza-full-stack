package com.gang.pizza.logging.dto;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import javax.validation.constraints.*;
import java.time.LocalDateTime;

public class LogDto {
	@DateTimeFormat(iso = ISO.DATE_TIME)
	@NotNull
	@Past
	public LocalDateTime dateTime; // LocalDateTime ISO String presentation
	public boolean isException;
	public ExceptionType exceptionType;

	public String methodName;

	public String className;

	public int responseTime;
	public String result;

	public LogDto() {

	}

	public LogDto(LocalDateTime dateTime, boolean isException, ExceptionType exceptionType, String methodName,
			String className, int responseTime, String result) {
		super();
		this.dateTime = dateTime;
		this.isException = isException;
		this.exceptionType = exceptionType;
		this.methodName = methodName;
		this.className = className;
		this.responseTime = responseTime;
		this.result = result;
	}

	@Override
	public String toString() {
		return "LogDto [dateTime=" + dateTime + ", isException=" + isException + ", exceptionType=" + exceptionType
				+ ", methodName=" + methodName + ", className=" + className + ", responseTime=" + responseTime
				+ ", result=" + result + "]";
	}

}
