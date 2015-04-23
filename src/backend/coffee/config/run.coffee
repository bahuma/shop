angular.module("BahumaShopBackend").run(["$rootScope", "$location", "BahumaShopApi", ($rootScope,  $location, BahumaShopApi) ->
    BahumaShopApi.user.getMe().success((data) ->
        $rootScope.rsUser = data
    ).error(() ->
        $location.path("/login")
    ).finally(() ->
        $rootScope.$on("$routeChangeStart", (event, next, current) ->
        
            if !$rootScope.rsUser
                if next.templateUrl == "templates/login.html"
                    # Already going to login
                else
                    $location.path("/login")
        )
        
    )
])