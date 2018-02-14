(function() {
	'use strict';
	angular.module('app').controller('MyController', MyController);
	MyController.$inject = [ '$http', '$location' ];
	function MyController($http, $location) {
        var controller = this;
		this.items = [];
		this.newItem = {};
		
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

		this.insertItem = function() {
			$http({
                url: "pessoa",
                method: "POST",
                data:controller.newItem
            }).error(function (data, status, headers, config) {
                console.error(data);
            }).success(function (data, status, headers, config) {
               controller.init();
            });
		};

		this.updateItem = function() {
			var found = false;
			for(var i in controller.items){
				var item = controller.items[i];
				if(item.codigo == controller.newItem.codigo){
					found = true;
					item.nome = controller.newItem.nome;
					controller.newItem = {};
				}
			}
			
			if(!found)
			{
				this.insertItem();
			}
		};

		this.deleteItem = function(item) {
			for(var i in controller.items){
				var citem = controller.items[i];
				if(citem.codigo == item.codigo){
					controller.items.splice(i, 1);;
				}
			}
		};

	}
})();