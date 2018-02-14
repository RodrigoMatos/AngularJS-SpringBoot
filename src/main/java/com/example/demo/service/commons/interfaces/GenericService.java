package com.example.demo.service.commons.interfaces;

import java.io.Serializable;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GenericService<Entity extends Object, ID extends Serializable> extends BusinessRules<Entity> {

	JpaRepository<Entity, ID> getRepository();

	Long count();

	Object save(Entity e) throws Exception;

	List<Entity> saveInBatch(List<Entity> e) throws Exception;

	void delete(Entity e) throws Exception;

	void deleteInBatch(List<Entity> e) throws Exception;

	Optional<Object> findByPrimaryKey(ID id);

	List<Entity> findAll();

	List<Entity> findByFilter(Entity e);

}
