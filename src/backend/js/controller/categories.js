angular.module("BahumaShopBackend").controller("CategoriesCtrl", ["$scope", "$mdToast", "$mdDialog", "BahumaShopApi", function($scope, $mdToast, $mdDialog, BahumaShopApi) {
  $scope.categories = [];
  $scope.search;
  $scope.loading = true;
  
  BahumaShopApi.category.getAll().success(function(data) {
    $scope.categories = data;
    $scope.loading = false;
  });
  
  $scope.delete = function(categoryID, ev) {
    console.log("test");
    
    var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Would you like to delete this category?')
      // .content('Description')
      .ariaLabel('Delete category')
      .ok('Delete')
      .cancel('Cancel')
      .targetEvent(ev);
      
    $mdDialog.show(confirm).then(function() {
      BahumaShopApi.category.delete(categoryID).success(function(data) {
        $mdToast.show($mdToast.simple().content("Category deleted").position("top right"));
        
        angular.forEach($scope.categories, function(category, key) {
          if (category._id == categoryID) {
            delete $scope.categories[key];
          }
        })
      }).error(function(data) {
        console.error(data);
      });
    });
  };
  
  $scope.noCategories = function() {
    if ($scope.categories.length == 0)
      return true;
      
    return false;
  }
}]);