angular.module("BahumaShopBackend").config(["$routeProvider", ($routeProvider) ->
  $routeProvider
  
  .when("/categories", {
    templateUrl: "templates/categories.html",
    controller: "CategoriesCtrl"
  })
  
  .when("/login", {
    templateUrl: "templates/login.html",
    controller: "LoginCtrl"
  })
])
