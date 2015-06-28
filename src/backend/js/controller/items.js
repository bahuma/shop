angular.module("BahumaShopBackend").controller("ItemsCtrl", ["$scope", "BahumaShopApi", function($scope, BahumaShopApi) {
  $scope.items;
  $scope.testArray = ["hallo", "swag"];
  
  BahumaShopApi.item.getAll().success(function(data) {
    $scope.items = data;
  });
}]);