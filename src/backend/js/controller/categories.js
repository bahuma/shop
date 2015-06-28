angular.module("BahumaShopBackend").controller("CategoriesCtrl", ["$scope", "BahumaShopApi", function($scope, BahumaShopApi) {
  $scope.categories;
  $scope.search;
  return BahumaShopApi.category.getAll().success(function(data) {
    return $scope.categories = data;
  });
}]);