angular.module("BahumaShopBackend").controller("CategoryDetailCtrl", ["$scope", "$location", "$mdToast", "BahumaShopApi", ($scope, $location, $mdToast, BahumaShopApi) ->
    $scope.action = "Add"
    $scope.category = {
        name: "",
        description: "",
    }

    $scope.save = () ->
        BahumaShopApi.category.add($scope.category).success((data) ->
            $mdToast.show($mdToast.simple().content("Category Saved").position("top right"))
            $location.path("/categories")
        ).error((data) ->
            $mdToast.show($mdToast.simple().content("Error: " + data.message).position("top right"))
        )
])
