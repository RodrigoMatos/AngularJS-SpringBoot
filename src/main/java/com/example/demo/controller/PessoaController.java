package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
		return this.pessoaService.findAll();
	}

	@RequestMapping(method = RequestMethod.POST)
	public PessoaEntity addItem(@RequestBody PessoaEntity pessoa) throws Exception {
		pessoa.setCodigo(null);
		return (PessoaEntity) this.pessoaService.save(pessoa);
	}

	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public PessoaEntity updateItem(@RequestBody PessoaEntity pessoa) throws Exception {
		return (PessoaEntity) this.pessoaService.save(pessoa);
	}

	@RequestMapping(value = "/delete", method = RequestMethod.POST)
	public void deleteItem(PessoaEntity pessoa) throws Exception {
		this.pessoaService.delete(pessoa);
	}

}
