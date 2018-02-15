(function() {
	'use strict';
	angular.module('app').controller('MyController', MyController);
	MyController.$inject = [ '$http', '$location' ];

	function MyController($http, $location) {

		var controller = this;
		this.items = [];
		this.newItem = {};
		this.alerta = null;
		this.alertaCadastro = null;

		this.addMsg = function(tipo, texto) {
			controller.alerta = {
				status : tipo,
				msg : texto
			};
		}

		this.addMsgCadastro = function(tipo, texto) {
			controller.alertaCadastro = {
				status : tipo,
				msg : texto
			};
		}

		this.init = function() {
			this.newItem = {};
			$http({
				url : "pessoa",
				method : "GET"
			}).error(function(data, status, headers, config) {
				console.error(data);
			}).success(function(data, status, headers, config) {
				controller.items = data;
			});
		}

		this.callInsertItem = function(item) {
			$http({
				url : "pessoa",
				method : "POST",
				data : item
			}).error(function(data, status, headers, config) {
				controller.addMsgCadastro('alert-danger', data.message);
				console.error(data);
			}).success(
					function(data, status, headers, config) {
						controller.addMsg('alert-success', 'Registro cadastrado com sucesso!');
						controller.closeModalCadastro();
						controller.init();
					});
		};

		this.callDeleteItem = function(item) {
			$http({
				url : "pessoa/delete",
				method : "POST",
				data : item
			}).error(function(data, status, headers, config) {
				controller.addMsg('alert-danger', data.message);
				console.error(data);
			}).success(
					function(data, status, headers, config) {
						controller.addMsg('alert-success', 'Registro removido com sucesso!');
						controller.init();
					});
		};

		this.callUpdateItem = function(item) {
			$http({
				url : "pessoa/update",
				method : "POST",
				data : item
			}).error(function(data, status, headers, config) {
				controller.addMsgCadastro('alert-danger', data.message);
				console.error(data);
			}).success(
					function(data, status, headers, config) {
						controller.addMsg('alert-success', 'Registro atualizado com sucesso!');
						controller.closeModalCadastro();
						controller.init();
					});
		};

		this.updateItem = function() {
			var found = this.findById(controller.newItem.codigo);
			if (found != null && found.length > 0) {
				var item = found[0];
				controller.newItem.codigo = item.codigo;
				controller.callUpdateItem(controller.newItem);
			} else {
				this.callInsertItem(controller.newItem);
			}
		};

		this.deleteItem = function() {
			controller.callDeleteItem(controller.newItem);
		};

		this.carregarItem = function(item) {
			controller.newItem = {
				codigo : item.codigo,
				nome : item.nome
			};
		};

		this.findById = function(id) {
			return controller.items.filter(function(item) {
				return item.codigo == id;
			});
		}

		this.limparCampos = function() {
			controller.newItem = {};
		}
		
		this.closeModalCadastro = function() {
			this.alertaCadastro = null;
			$("#modalCadastro").removeClass("in");
		    $(".modal-backdrop").remove();
		    $("#modalCadastro").hide();
		};

		this.setNewItem = function(item) {
			controller.newItem = item;
		} 

	}
})();