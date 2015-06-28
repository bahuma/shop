angular.module("BahumaShopBackend").controller("LogoutCtrl", ["$rootScope", "$location", "BahumaShopApi", function($rootScope, $location, BahumaShopApi) {
  return BahumaShopApi.auth.logout().success(function(data) {
    console.log("Logged out");
    $rootScope.rsUser = false;
    return $location.path("/login");
  });
}]);