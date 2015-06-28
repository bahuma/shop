angular.module("BahumaShopBackend").run(["$rootScope", "$location", "BahumaShopApi", function($rootScope, $location, BahumaShopApi) {
  return BahumaShopApi.user.getMe().success(function(data) {
    return $rootScope.rsUser = data;
  }).error(function() {
    return $location.path("/login");
  })["finally"](function() {
    return $rootScope.$on("$routeChangeStart", function(event, next, current) {
      if (!$rootScope.rsUser) {
        if (next.templateUrl === "templates/login.html") {

        } else {
          return $location.path("/login");
        }
      }
    });
  });
}]);