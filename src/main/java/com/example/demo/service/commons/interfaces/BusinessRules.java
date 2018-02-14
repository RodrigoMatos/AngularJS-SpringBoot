package com.example.demo.service.commons.interfaces;

import java.util.List;

public interface BusinessRules<Entity extends Object> {

	void validationSave(Entity e) throws Exception;

	void validationSaveInBatch(List<Entity> list) throws Exception;

	void validationDelete(Entity e) throws Exception;

	void validationDeleteInBatch(List<Entity> e) throws Exception;

}
