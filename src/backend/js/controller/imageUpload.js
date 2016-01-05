angular.module('BahumaShopBackend').controller('ImageUploadCtrl', ['$scope', 'Upload', '$timeout', function($scope, Upload, $timeout){
  $scope.uploadFiles = function(file, errFiles) {
    $scope.f = file;
    $scope.errFile = errFiles && errFiles[0];
    if (file) {
      file.upload = Upload.upload({
        url: '../file-upload',
        data: {file: file}
      });

      file.upload.then(function (response) {
        console.log(response);
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        file.progress = Math.min(100, parseInt(100.0 *
          evt.loaded / evt.total));
      });
    }
  }
}]);
