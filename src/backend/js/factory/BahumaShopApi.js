angular.module("BahumaShopBackend").factory("BahumaShopApi", ["$http", function($http) {
  var api, basePath;
  basePath = "../api";
  api = {
    category: {},
    item: {},
    auth: {},
    user: {}
  };
  api.category.getAll = function() {
    return $http.get(basePath + "/category");
  };
  api.category.get = function(categoryID) {
    return $http.get(basePath + "/category/" + categoryID);
  };
  api.category.add = function(category) {
    return $http.post(basePath + "/category", category);
  };
  api.category.edit = function(category) {
    return $http.put(basePath + "/category/" + category._id, category);
  };
  api.category.delete = function(categoryID) {
    return $http.delete(basePath + "/category/" + categoryID);
  };
  api.item.getAll = function() {
    return $http.get(basePath + "/item");
  };
  api.auth.login = function(username, password) {
    return $http.post(basePath + "/auth/login", {
      username: username,
      password: password
    });
  };
  api.auth.logout = function() {
    return $http.get(basePath + "/auth/logout");
  };
  api.user.getMe = function() {
    return $http.get(basePath + "/user/me");
  };
  return api;
}]);