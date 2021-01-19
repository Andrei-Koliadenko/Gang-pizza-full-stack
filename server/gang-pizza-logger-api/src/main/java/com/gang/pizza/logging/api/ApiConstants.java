package com.gang.pizza.logging.api;

public interface ApiConstants {
	// URL end-points
	public String LOGGER_ADDLOG = "logger/addLog";
	public String LOGGER_LOGSDATES = "logger/dates";
	public String LOGGER_EXCEPTIONS = "logger/exceptions/";
	public String LOGGER_POPULAREXCEPTIONCOUNT = "logger/exceptions/popular/count";
	public String LOGGER_SECEXCCOUNT = "logger/exceptions/security/count";
	public String LOGGER_CLASSMETHOD = "logger/exceptions/classmethod";
	public String LOGGER_CLASS = "logger/exceptions/class";
	// Request parameters
	String FROM = "from";
	String TO = "to";
	String FROM_DEFAULT_VALUE = "1900-01-01T00:00";
	String TO_DEFAULT_VALUE = "2200-01-01T00:00";
	String EXCEPTION_TYPE = "exceptionType";
	String CLASS_NAME = "className";
	String N_EXCEPTIONS = "nExceptions";
	String METHOD_NAME = "methodName";
	// Authorization roles
	String ROLE_STATIST = "STATIST";
	String ROLE_USER = "USER";

}
