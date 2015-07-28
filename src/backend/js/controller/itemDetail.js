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
  
  BahumaShopApi.category.getAll().success(function(data) {
    console.log(data);
    $scope.categories = data;
  });
  
  // BahumaShopApi.category.getAll().success(function(data) {
  //   $scope.availableCategories = ['Bücher', 'Yolo'];
    
  //   $scope.availableCategories.map(function(category) {
  //     category._lowername = angular.lowercase(category.name);
      
  //     return category;
  //   })
  // });
  
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