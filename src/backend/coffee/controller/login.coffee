angular.module("BahumaShopBackend").controller("LoginCtrl", ["$rootScope", "$scope", "$location", "$mdToast", "BahumaShopApi", ($rootScope, $scope, $location, $mdToast, BahumaShopApi) ->
    if $rootScope.user
        $location.path("/dashboard")
    
    $scope.user = {
        name: "",
        password: ""
    }
    
    $scope.loading = false
    
    $scope.login = () ->
        $scope.loading = true
        
        BahumaShopApi.auth.login($scope.user.name, $scope.user.password).success((data)->
            $scope.loading = false
            $rootScope.user = data.object
            $location.path("/dashboard")
            $mdToast.show($mdToast.simple().content("Logged in as " + data.object.username).position("top right"))
        ).error((data, status)->
            $scope.loading = false
            
            $mdToast.show($mdToast.simple().content("User / Password not correct").position("top right"))
        )
])