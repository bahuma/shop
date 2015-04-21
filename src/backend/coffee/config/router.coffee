angular.module("BahumaShopBackend").config(["$routeProvider", ($routeProvider) ->
  $routeProvider.when("/categories", {
    templateUrl: "templates/categories.html",
    controller: "CategoriesCtrl"
  })
])
