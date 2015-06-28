angular.module("BahumaShopBackend").config(["$routeProvider", function($routeProvider) {
  $routeProvider.when("/categories", {
    templateUrl: "templates/categories.html",
    controller: "CategoriesCtrl"
  })
  
  .when("/items", {
    templateUrl: "templates/items.html",
    controller: "ItemsCtrl"
  })
  
  .when("/categories/add", {
    templateUrl: "templates/category-detail.html",
    controller: "CategoryDetailCtrl",
    resolve: {
      FormType: function() { return "ADD" }
    }
  })
  
  .when("/categories/edit/:category_id", {
    templateUrl: "templates/category-detail.html",
    controller: "CategoryDetailCtrl",
    resolve: {
      FormType: function() { return "EDIT" }
    }
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
  });
}]);