(function() {
	'use strict';
	angular.module('app').controller('MyController', MyController);
	MyController.$inject = [ '$http', '$location' ];
	function MyController($http, $location) {
        var controller = this;
		this.items = [];
		this.newItem = {};
		
		this.init = function(){
			controller.items.push({ id: 0, checked: true, description: 'abc 1' });
			controller.items.push({ id: 1, checked: true, description: 'abc 2' });
			controller.items.push({ id: 2, checked: false, description: 'abc 3' });
		}

		this.addItem = function() {
			controller.items.push(controller.newItem);
			controller.newItem = {};
		};

		this.updateItem = function() {
			var found = false;
			for(var i in controller.items){
				var item = controller.items[i];
				if(item.id == controller.newItem.id){
					found = true;
					item.description = controller.newItem.description;
					item.checked = controller.newItem.checked;
					controller.newItem = {}
				}
			}
			
			if(!found)
			{
				this.addItem();
			}
		};

		this.deleteItem = function(item) {
			for(var i in controller.items){
				var citem = controller.items[i];
				if(citem.id == item.id){
					controller.items.splice(i, 1);;
				}
			}
		};

	}
})();