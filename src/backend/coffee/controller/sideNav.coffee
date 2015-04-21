angular.module("BahumaShopBackend").controller("SideNavCtrl", ["$scope", "$mdSidenav", ($scope, $mdSidenav) ->
  $scope.toggle = () ->
    $mdSidenav("left").toggle();
])
