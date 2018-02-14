(function(angular) {
  var ItemFactory = function($resource) {
    return $resource('/pessoa/:id', {
      id: '@id'
    }, {
      update: {
        method: "PUT"
      },
      remove: {
        method: "DELETE"
      }
    });
  };
  
  ItemFactory.$inject = ['$resource'];
  angular.module("myApp.services").factory("Item", ItemFactory);
}(angular));


/*
<div class="container" ng-controller="AppController">
      <div class="page-header">
        <h1>A checklist</h1>
      </div>
      <div class="alert alert-info" role="alert" ng-hide="items &amp;&amp; items.length > 0">
        There are no items yet.
      </div>
      <form class="form-horizontal" role="form" ng-submit="addItem(newItem)">
        <div class="form-group" ng-repeat="item in items">
          <div class="checkbox col-xs-9">
            <label>
              <input type="checkbox" ng-model="item.checked" ng-change="updateItem(item)"/> {{item.description}}
            </label>
          </div>
          <div class="col-xs-3">
            <button class="pull-right btn btn-danger" type="button" title="Delete"
              ng-click="deleteItem(item)">
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </div>
        </div>
        <hr />
      </form>
    </div>
*/