package com.example.demo.service.commons;

import javax.validation.Validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public abstract class BaseServiceAb {

	@Autowired
	protected Validator validator;

}
