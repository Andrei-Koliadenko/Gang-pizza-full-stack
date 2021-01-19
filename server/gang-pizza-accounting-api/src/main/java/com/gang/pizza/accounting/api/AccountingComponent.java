package com.gang.pizza.accounting.api;

import javax.annotation.PostConstruct;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import java.util.Base64;

@Component
public class AccountingComponent {
	static Logger LOG = LoggerFactory.getLogger(AccountingComponent.class);
	@Value("${app.accounting.host:no-host}")
	String host;
	@Value("${app.accounting.user.name:user}")
	String username;
	@Value("${app.accounting.user.password}")
	String userPassword;
	HttpHeaders httpHeaders;
	HttpEntity<String> requestEntity;
	RestTemplate restTemplate = new RestTemplate();

	public String getPassword(String user) {
		String url = String.format("%s/accounts/%s/password", host, user);
		LOG.debug("Request: to getting password for user: {}", url, user);
		return restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class).getBody();
	}

	public String[] getRoles(String user) {
		String url = String.format("%s/accounts/%s/roles", host, user);
		LOG.debug("Request: to getting roles for user: {}", url, user);
		return restTemplate.exchange(url, HttpMethod.GET, requestEntity, String[].class).getBody();
	}

	@PostConstruct
	void fillRequestEntity() {
		LOG.info("Accountin Component has been loaded");
		LOG.debug("username: {}, password: {}", username, userPassword);
		httpHeaders = new HttpHeaders();
		httpHeaders.add("Authorization",
				"Basic " + Base64.getEncoder().encodeToString((username + ":" + userPassword).getBytes()));
		requestEntity = new HttpEntity<String>(httpHeaders);
	}
}
