angular.module("BahumaShopBackend").controller("LogoutCtrl", ["$rootScope", "$location", "BahumaShopApi", ($rootScope, $location, BahumaShopApi) ->
    BahumaShopApi.auth.logout().success((data) ->
        console.log("Logged out")
        $rootScope.rsUser = false
        $location.path("/login")
    )
])