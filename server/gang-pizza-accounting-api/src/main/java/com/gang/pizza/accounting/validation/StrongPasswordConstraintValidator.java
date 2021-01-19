package com.gang.pizza.accounting.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class StrongPasswordConstraintValidator implements ConstraintValidator<StrongPassword, String> {

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		return value.matches("(.*[A-Z].*[A-Z].*)") && value.matches("(.*[!@#$&*].*)")
				&& value.matches("(.*[0-9].*[0-9].*)") && value.matches("(.*[a-z].*[a-z].*[a-z].*)");
	}

}
