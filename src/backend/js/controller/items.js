angular.module("BahumaShopBackend").controller("ItemsCtrl", ["$scope", "$mdToast", "$mdDialog", "BahumaShopApi", function($scope, $mdToast, $mdDialog, BahumaShopApi) {
  $scope.items = [];
  $scope.search;
  $scope.loading = true;
  
  BahumaShopApi.item.getAll().success(function(data) {
    $scope.items = data;
    $scope.loading = false;
    console.log(data);
  });
  
  $scope.delete = function(itemID, ev) {
    console.log("test");
    
    var confirm = $mdDialog.confirm()
      .parent(angular.element(document.body))
      .title('Would you like to delete this item?')
      // .content('Description')
      .ariaLabel('Delete item')
      .ok('Delete')
      .cancel('Cancel')
      .targetEvent(ev);
      
    $mdDialog.show(confirm).then(function() {
      BahumaShopApi.item.delete(itemID).success(function(data) {
        $mdToast.show($mdToast.simple().content("Item deleted").position("top right"));
        
        angular.forEach($scope.items, function(item, key) {
          if (item._id == itemID) {
            delete $scope.items[key];
          }
        })
      }).error(function(data) {
        console.error(data);
      });
    });
  };
  
  $scope.noItems = function() {
    if ($scope.items.length == 0)
      return true;
      
    return false;
  }
}]);