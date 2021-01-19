package com.gang.pizza.logging;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({ "com.gang.pizza" })
public class LoggerAppl {
	public static void main(String[] args) {
		SpringApplication.run(LoggerAppl.class, args);
	}
}
