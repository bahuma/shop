angular.module("BahumaShopBackend").controller("LoginCtrl", ["$rootScope", "$scope", "$location", "$mdToast", "BahumaShopApi", ($rootScope, $scope, $location, $mdToast, BahumaShopApi) ->
    if $rootScope.rsUser
        $location.path("/dashboard")
    
    $scope.user = {
        name: "",
        password: ""
    }
    
    $scope.loading = false
    
    $scope.login = () ->
        $scope.loading = true
        
        BahumaShopApi.auth.login($scope.user.name, $scope.user.password).success((data)->
            $rootScope.rsUser = data.object
            $location.path("/dashboard")
            $mdToast.show($mdToast.simple().content("Logged in as " + data.object.username).position("top right"))
        ).error((data, status)->
            $mdToast.show($mdToast.simple().content("User / Password not correct").position("top right"))
        ).finally(() ->
            $scope.loading = false
        )
])