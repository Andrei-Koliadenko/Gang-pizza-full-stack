package com.gang.pizza.accounting.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = StrongPasswordConstraintValidator.class)
@Retention(RUNTIME)
@Target({ ElementType.PARAMETER, FIELD, METHOD })
public @interface StrongPassword {
	public String message() default "Your password is not strong enough. It should contain at least: 2 capital letters, 3 small letters, 2 digits and 1 special character";

	public Class<?>[] groups() default {};

	public Class<? extends Payload>[] payload() default {};
}
