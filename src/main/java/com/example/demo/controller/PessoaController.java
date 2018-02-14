package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.PessoaEntity;
import com.example.demo.service.PessoaService;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

	@Autowired
	private PessoaService pessoaService;

	@RequestMapping(method = RequestMethod.GET)
	public List<PessoaEntity> findItems() {
		return pessoaService.findAll();
	}

	@RequestMapping(method = RequestMethod.POST)
	public PessoaEntity addItem(@RequestBody PessoaEntity pessoa) throws Exception {
		pessoa.setCodigo(null);
		return (PessoaEntity) pessoaService.save(pessoa);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.PUT)
	public PessoaEntity updateItem(@RequestBody PessoaEntity pessoa, @PathVariable Long id) throws Exception {
		pessoa.setCodigo(id);
		return (PessoaEntity) pessoaService.save(pessoa);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteItem(@PathVariable Long id) throws Exception {
		pessoaService.delete(new PessoaEntity(id));
	}

}
