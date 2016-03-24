/**
 * Created by Biousco on 3/21.
 */
define(['./module'], function (controllers) {
  'use strict';
  controllers.controller('LoginCtrl', ['$scope','AdminService', function ($scope, AdminService) {

    $scope.isLogin = false;
    $scope.adminLogin = function () {
      if(!$scope.name || !$scope.pwd)  return false;
      AdminService.userLogin($scope.name, $scope.pwd).success(function (data) {
        if(data.ret_code == 0) {
          $scope.isLogin = true;
        }
      })
    }

  }]);
});
