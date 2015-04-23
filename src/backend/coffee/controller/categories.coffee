angular.module("BahumaShopBackend").controller("CategoriesCtrl", ["$scope", "BahumaShopApi", ($scope, BahumaShopApi) ->
  $scope.categories
  $scope.search

  BahumaShopApi.category.getAll().success((data) ->
    $scope.categories = data
  )
])
