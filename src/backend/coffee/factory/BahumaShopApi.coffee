angular.module("BahumaShopBackend").factory("BahumaShopApi", ["$http", ($http) ->
  basePath = "../api"

  api = {
    category: {}
  }

  api.category.getAll = () ->
    $http.get(basePath + "/category")

  api
])
