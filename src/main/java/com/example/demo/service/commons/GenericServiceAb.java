package com.example.demo.service.commons;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import javax.validation.ConstraintViolation;

import org.springframework.data.domain.Example;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.service.commons.interfaces.GenericService;

@Component
public abstract class GenericServiceAb<Entity extends Object, ID extends Serializable> extends BaseServiceAb
		implements GenericService<Entity, ID> {

	protected void validate(Entity e) throws Exception {
		Set<ConstraintViolation<Entity>> constraintViolations = validator.validate(e);
		if (!constraintViolations.isEmpty()) {
			throw new Exception(getValidationMessage(constraintViolations));
		}
	}

	private String getValidationMessage(Set<ConstraintViolation<Entity>> constraintViolations) {
		StringBuilder buffer = new StringBuilder();
		for (ConstraintViolation<Entity> constraintViolation : constraintViolations) {
			if (constraintViolation.getPropertyPath() != null) {
				buffer.append(constraintViolation.getPropertyPath()).append(": ");
			}
			buffer.append(constraintViolation.getMessage()).append("\n");
		}
		return buffer.toString();
	}

	@Override
	public void validationSave(Entity e) throws Exception {
		validate(e);
	}

	@Override
	public void validationSaveInBatch(List<Entity> e) throws Exception {
		validate(e);
	}

	protected void validate(List<Entity> e) throws Exception {

		for (Entity entity : e) {
			validate(entity);
		}
	}

	@Override
	public void validationDeleteInBatch(List<Entity> e) throws Exception {
		for (Entity entity : e) {
			validationDelete(entity);
		}
	}

	@Override
	public void validationDelete(Entity e) throws Exception {
	}

	@Override
	@Transactional
	public Object save(Entity e) throws Exception {
		validationSave(e);
		e = getRepository().save(e);
		getRepository().flush();
		return e;
	}

	@Override
	@Transactional
	public List<Entity> saveInBatch(List<Entity> e) throws Exception {
		validationSaveInBatch(e);
		List<Entity> lista = getRepository().save(e);
		getRepository().flush();
		return lista;
	}

	@Override
	@Transactional
	public void delete(Entity e) throws Exception {
		validationDelete(e);
		getRepository().delete(e);
		getRepository().flush();
	}

	@Override
	@Transactional
	public void deleteInBatch(List<Entity> e) throws Exception {
		validationDeleteInBatch(e);
		getRepository().deleteInBatch(e);
		getRepository().flush();
	}

	@Override
	@Transactional(readOnly = true)
	public Optional<Object> findByPrimaryKey(ID id) {
		return Optional.ofNullable(getRepository().findOne(id));
	}

	@Override
	@Transactional(readOnly = true)
	public List<Entity> findAll() {
		return getRepository().findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public List<Entity> findByFilter(Entity e) {
		Example<Entity> example = Example.of(e);
		return getRepository().findAll(example);
	}

	@Transactional(readOnly = true)
	@Override
	public Long count() {
		return getRepository().count();
	}

}
