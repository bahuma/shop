angular.module("BahumaShopBackend").controller("SideNavCtrl", ["$scope", "$mdSidenav", "$mdMedia", function($scope, $mdSidenav, $mdMedia) {
  $scope.toggle = function() {
    return $mdSidenav("left").toggle();
  };
  
  $scope.buttonVisible = function() {
    return !$mdMedia("gt-md");
  };
}]);