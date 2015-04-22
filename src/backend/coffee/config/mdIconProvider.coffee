angular.module("BahumaShopBackend").config(["$mdIconProvider", ($mdIconProvider) ->
    $mdIconProvider.icon("menu", "./img/icons/menu.svg")
    $mdIconProvider.icon("settings", "./img/icons/settings.svg")
    $mdIconProvider.icon("person", "./img/icons/person.svg")
    $mdIconProvider.icon("lock", "./img/icons/lock.svg")
])