angular.module("BahumaShopBackend").controller("CategoryDetailCtrl", ["$scope", "$location", "$mdToast", "BahumaShopApi", function($scope, $location, $mdToast, BahumaShopApi) {
  $scope.action = "Add";
  $scope.category = {
    name: "",
    description: ""
  };
  return $scope.save = function() {
    return BahumaShopApi.category.add($scope.category).success(function(data) {
      $mdToast.show($mdToast.simple().content("Category Saved").position("top right"));
      return $location.path("/categories");
    }).error(function(data) {
      return $mdToast.show($mdToast.simple().content("Error: " + data.message).position("top right"));
    });
  };
}]);