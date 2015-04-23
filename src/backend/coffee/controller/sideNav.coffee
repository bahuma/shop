angular.module("BahumaShopBackend").controller("SideNavCtrl", ["$scope", "$mdSidenav", "$mdMedia", ($scope, $mdSidenav, $mdMedia) ->
  $scope.toggle = () ->
    $mdSidenav("left").toggle();
    
  $scope.buttonVisible = () ->
    !$mdMedia("gt-md")
])
