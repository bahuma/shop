angular.module("BahumaShopBackend").factory("BahumaShopApi", ["$http", ($http) ->
  basePath = "../api"

  api = {
    category: {},
    auth: {},
    user: {}
  }

  api.category.getAll = () ->
    $http.get(basePath + "/category")

  api.category.add = (category) ->
    $http.post(basePath + "/category", category)

  api.auth.login = (username, password) ->
    $http.post(basePath + "/auth/login", {
      username: username,
      password: password
    })

  api.auth.logout = () ->
    $http.get(basePath + "/auth/logout")

  api.user.getMe = () ->
    $http.get(basePath + "/user/me")

  api
])
