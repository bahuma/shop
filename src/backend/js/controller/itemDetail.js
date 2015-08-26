angular.module("BahumaShopBackend").controller("ItemDetailCtrl", ["$scope", "$location", "$mdToast", "$routeParams", "BahumaShopApi", "FormType", function($scope, $location, $mdToast, $routeParams, BahumaShopApi, FormType) {
  $scope.action = FormType;
  $scope.loading = true;
  
  $scope.item = {
    name: "",
    description: "",
    price: "",
    category: []
  };
  
  $scope.categories = [];
  
  $scope.categoriesAc = {
    searchText: null,
    querySearch: function(query) {
      
      var results = [];
      
      angular.forEach($scope.categories, function(value, key){
        if (angular.lowercase(value.name).indexOf(angular.lowercase(query)) > -1) {
          results.push(value);
        }
      })
        
      return results;
    },
    selectedItem: null
  }
  
  BahumaShopApi.category.getAll().success(function(data) {
    $scope.categories = data;
  });
  
  switch ($scope.action) {
    case 'ADD':
      $scope.loading = false;
      break;
    
    case 'EDIT':
      BahumaShopApi.item.get($routeParams.item_id).success(function(data) {
        $scope.item = data;
        console.log(data);
        $scope.loading = false;
      }).error(function(data){
        console.log(data);
      });
      break;
  }
  
  $scope.save = function() {
    switch ($scope.action) {
      case 'ADD':
        BahumaShopApi.item.add($scope.item).success(function(data) {
          successAndRedirect(data);
        }).error(function(data) {
          error(data);
        });
        break;
      
      case 'EDIT':
        BahumaShopApi.item.edit($scope.item).success(function(data) {
          successAndRedirect(data);
        }).error(function(data) {
          error(data);
        });
    }
    
  };
  
  var successAndRedirect = function (data) {
    $mdToast.show($mdToast.simple().content("Item Saved").position("top right"));
    $location.path("/items");
  }
  
  var error = function(data) {
    $mdToast.show($mdToast.simple().content("Error: " + data.message).position("top right"));
  }
}]);