(function() {
	'use strict';
	angular.module('app').controller('MyController', MyController);
	MyController.$inject = [ '$http', '$location' ];
	function MyController($http, $location) {
        var controller = this;
		this.items = [];
		this.newItem = {};
		this.alerta = {};

		this.addMsg = function(tipo, texto) {
			controller.alerta = {status:tipo, msg:texto};
		}

		this.init = function(){
		  $http({
                url: "pessoa",
                method: "GET"
            }).error(function (data, status, headers, config) {
                console.error(data);
            }).success(function (data, status, headers, config) {
               controller.items = data;
            });
		}

		this.callInsertItem = function(item) {
			$http({
                url: "pessoa",
                method: "POST",
                data:item
            }).error(function (data, status, headers, config) {
            	controller.addMsg('alert-danger', data.message);
                console.error(data);
            }).success(function (data, status, headers, config) {
            	controller.addMsg('alert-success', 'Registro cadastrado com sucesso!');
               controller.init();
            });
		};
		
		this.callDeleteItem = function(item) {
			$http({
                url: "pessoa/delete",
                method: "POST",
                data:item
            }).error(function (data, status, headers, config) {
            	controller.addMsg('alert-danger', data.message);
                console.error(data);
            }).success(function (data, status, headers, config) {
            	controller.addMsg('alert-success', 'Registro removido com sucesso!');
            	controller.init();
            });
		};

		this.callUpdateItem = function(item) {
			$http({
                url: "pessoa/update",
                method: "POST",
                data:item
            }).error(function (data, status, headers, config) {
            	controller.addMsg('alert-danger', data.message);
                console.error(data);
            }).success(function (data, status, headers, config) {
            	controller.addMsg('alert-success', 'Registro atualizado com sucesso!');
               controller.init();
            });
		};

		this.updateItem = function() {
			var found = false;
			for ( var i in controller.items) {
				var item = controller.items[i];
				if (item.codigo == controller.newItem.codigo) {
					found = true;
					item.nome = controller.newItem.nome;
					controller.newItem = {};
					controller.callUpdateItem(item);
					break;
				}
			}
			if (!found) {
				this.callInsertItem(controller.newItem);
			}
		};

		this.deleteItem = function(item) {
			for ( var i in controller.items) {
				var citem = controller.items[i];
				if (citem.codigo == item.codigo) {
					controller.callDeleteItem(citem);
					break;
				}
			}
		};

	}
})();