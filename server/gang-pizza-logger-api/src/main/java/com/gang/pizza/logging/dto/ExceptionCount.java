package com.gang.pizza.logging.dto;

public class ExceptionCount {
	public ExceptionType _id;
	public int count;

	public ExceptionCount(ExceptionType exceptionType, int count) {
		this._id = exceptionType;
		this.count = count;
	}

	public ExceptionCount() {
	}

	@Override
	public String toString() {
		return "ExceptionCount{" + "exceptionType=" + _id + ", count=" + count + '}';
	}
}
