angular.module("BahumaShopBackend").controller("CategoriesCtrl", ["$scope", "BahumaShopApi", ($scope, BahumaShopApi) ->
  $scope.categories

  BahumaShopApi.category.getAll().success((data) ->
    $scope.categories = data
  )
])
