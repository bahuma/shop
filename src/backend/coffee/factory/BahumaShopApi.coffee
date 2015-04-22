angular.module("BahumaShopBackend").factory("BahumaShopApi", ["$http", ($http) ->
  basePath = "../api"

  api = {
    category: {},
    auth: {}
  }

  api.category.getAll = () ->
    $http.get(basePath + "/category")
  
  api.auth.login = (username, password) ->
    $http.post(basePath + "/auth/login", {
      username: username,
      password: password
    })
  
  api
])
