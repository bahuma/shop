angular.module("BahumaShopBackend").controller("CategoryDetailCtrl", ["$scope", "$location", "$mdToast", "BahumaShopApi", ($scope, $location, BahumaShopApi) ->
    $scope.action = "Add"
    $scope.category = {
        name: "",
        description: "",
    }
    
    $scope.save = () ->
        BahumaShopApi.categories.add($scope.category.name, $scope.category.description).success((data) ->
            $mdToast.show($mdToast.simple().content("Category Saved").position("top right"))
            $location.path("/categories")
        ).error((data) ->
            $mdToast.show($mdToast.simple().content("Error: " + data.message).position("top right"))
        )
])