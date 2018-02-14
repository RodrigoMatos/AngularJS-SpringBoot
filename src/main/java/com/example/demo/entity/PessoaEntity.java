package com.example.demo.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.NotBlank;

@Entity
@Table(name = "PESSOA")
public class PessoaEntity implements Serializable {

	private static final long serialVersionUID = -640013788052072436L;

	public PessoaEntity() {
	}

	public PessoaEntity(Long codigo) {
		this.codigo = codigo;
	}

	@Id
	@GeneratedValue
	@Column(name = "codigo")
	private Long codigo;

	@NotBlank
	@Size(max = 100)
	@Column(name = "nome")
	private String nome;

	public Long getCodigo() {
		return codigo;
	}

	public void setCodigo(Long codigo) {
		this.codigo = codigo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

}
