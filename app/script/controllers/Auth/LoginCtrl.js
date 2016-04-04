/**
 * Created by Biousco on 3/21.
 */
define(['../module'], function (controllers) {
  'use strict';
  controllers.controller('LoginCtrl', ['$scope','AdminService', '$state', 'modAlert', function ($scope, AdminService, $state, modAlert) {

    $scope.isLogin = true;
    $scope.adminLogin = function () {
      if(!$scope.name || !$scope.pwd)  return false;
      AdminService.userLogin($scope.name, $scope.pwd).success(function (data) {
        if(data.ret_code == 0) {
          $scope.isLogin = true;
          $state.go('goods');
        } else {
          modAlert.fail('账户名或密码错误');
        }
      })
    };

    $scope.logout = function () {
      AdminService.userLogout().success(function (data) {
        if(data.ret_code == 0) {
          $state.go('login');
        }
      })
    }

  }]);
});
