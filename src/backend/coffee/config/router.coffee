angular.module("BahumaShopBackend").config(["$routeProvider", ($routeProvider) ->
  $routeProvider
  
  .when("/categories", {
    templateUrl: "templates/categories.html",
    controller: "CategoriesCtrl"
  })
  
  .when("/categories/add", {
    templateUrl: "templates/category-detail.html",
    controller: "CategoryDetailCtrl"
  })
  
  .when("/login", {
    templateUrl: "templates/login.html",
    controller: "LoginCtrl"
  })
  
  .when("/logout", {
    template: "",
    controller: "LogoutCtrl"
  })
  
  .when("/dashboard", {
    templateUrl: "templates/dashboard.html",
    controller: "DashboardCtrl"
  })
  
  .otherwise({
    redirectTo: "/dashboard"
  })
])
