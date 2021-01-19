package com.gang.pizza.logging.api;

import javax.annotation.PostConstruct;

import org.slf4j.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.gang.pizza.logging.dto.LogDto;

import java.util.Base64;

@Component // for getting an object of this class into an application context
/**
 * Component for implementing SOA for communicating with Logger application It
 * contains method sendLog allowing sending log data from any application
 * 
 * @author User
 *
 */
public class LoggingComponent {
	static Logger LOG = LoggerFactory.getLogger(LoggingComponent.class);
	@Value("${app.logger.host:no-host}")
	String host;
	String url;
	HttpHeaders headers;
	@Value("${app.logger.user.name:logger-user}")
	String username;
	@Value("${app.logger.user.password: password-got-from-accounting}")
	String password;

	@PostConstruct
	void fillUrl() {
		url = host + "/" + ApiConstants.LOGGER_ADDLOG;
		LOG.info("LoggingComponent is loaded into Acpplication Context with host: {}", host);
		headers = new HttpHeaders();
		headers.add("Authorization",
				"Basic " + Base64.getEncoder().encodeToString(String.format("%s:%s", username, password).getBytes()));
	}

	public void sendLog(LogDto logDto) {
		if (host.equals("no-host")) {
			LOG.error("Host is not defined");
		}
		RestTemplate restTemplate = new RestTemplate();
		HttpEntity<LogDto> httpEntity = new HttpEntity<LogDto>(logDto, headers);
		ResponseEntity<LogDto> response = restTemplate.exchange(url, HttpMethod.POST, httpEntity, LogDto.class);
		LOG.debug("log exception type {} was sent", response.getBody().exceptionType);
	}
}
