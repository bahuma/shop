angular.module('BahumaShopBackend').directive('imageupload', function(){
  return {
    restrict: 'E',
    templateUrl: 'templates/directives/imageupload.html',
    controller: 'ImageUploadCtrl'
  };
});
