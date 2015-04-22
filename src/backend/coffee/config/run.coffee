angular.module("BahumaShopBackend").run(["$rootScope", "$location", ($rootScope,  $location) ->
    $rootScope.$on("$routeChangeStart", (event, next, current) ->
        
        if !$rootScope.user
            if next.templateUrl == "templates/login.html"
                # Already going to login
            else
                $location.path("/login")
    )
])