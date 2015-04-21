angular.module("BahumaShopBackend").controller("CategoriesCtrl", ["BahumaShopApi", (BahumaShopApi) ->
  $scope.categories

  BahumaShopApi.category.getAll().success((data) ->
    $scope.categories = data
  )
])
