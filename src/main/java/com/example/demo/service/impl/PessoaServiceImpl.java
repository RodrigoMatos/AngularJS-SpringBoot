package com.example.demo.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PessoaEntity;
import com.example.demo.repository.PessoaRepository;
import com.example.demo.service.PessoaService;
import com.example.demo.service.commons.GenericServiceAb;

@Service
public class PessoaServiceImpl extends GenericServiceAb<PessoaEntity, Long> implements PessoaService {

	@Autowired
	private PessoaRepository repository;

	@Override
	public JpaRepository<PessoaEntity, Long> getRepository() {
		return this.repository;
	}

}
