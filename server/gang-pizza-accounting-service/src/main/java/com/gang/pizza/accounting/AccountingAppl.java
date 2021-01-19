package com.gang.pizza.accounting;

import java.util.Scanner;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({ "com.gang.pizza" })
public class AccountingAppl {

	public static void main(String[] args) {
		ConfigurableApplicationContext ctx = SpringApplication.run(AccountingAppl.class, args);
		Scanner scanner = new Scanner(System.in);
		while (true) {
			System.out.println("Enter EXIT for exit");
			String str = scanner.nextLine();
			if (str.equalsIgnoreCase("exit")) {
				break;
			}
			System.out.println("Wrong word. Please enter EXIT");
		}
		scanner.close();
		ctx.close();
	}

}
