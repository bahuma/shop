angular.module("BahumaShopBackend").controller("CategoryDetailCtrl", ["$scope", "$location", "$mdToast", "$routeParams", "BahumaShopApi", "FormType", function($scope, $location, $mdToast, $routeParams, BahumaShopApi, FormType) {
  $scope.action = FormType;
  $scope.loading = true;
  
  switch ($scope.action) {
    case 'ADD':
      $scope.category = {
        name: "",
        description: ""
      };
      $scope.loading = false;
      break;
    
    case 'EDIT':
      BahumaShopApi.category.get($routeParams.category_id).success(function(data) {
        $scope.category = data;
        $scope.loading = false;
      }).error(function(data){
        console.log(data);
      });
      break;
  }
  
  $scope.save = function() {
    switch ($scope.action) {
      case 'ADD':
        BahumaShopApi.category.add($scope.category).success(function(data) {
          successAndRedirect(data);
        }).error(function(data) {
          error(data);
        });
        break;
      
      case 'EDIT':
        BahumaShopApi.category.edit($scope.category).success(function(data) {
          successAndRedirect(data);
        }).error(function(data) {
          error(data);
        });
    }
    
  };
  
  var successAndRedirect = function (data) {
    $mdToast.show($mdToast.simple().content("Category Saved").position("top right"));
    $location.path("/categories");
  }
  
  var error = function(data) {
    $mdToast.show($mdToast.simple().content("Error: " + data.message).position("top right"));
  }
}]);