/**
 * Created by Biousco on 3/24.
 */
define(['../module'], function (controllers) {
  'use strict';
  controllers.controller('LogoutCtrl', ['$scope','AdminService', function ($scope, AdminService) {



    $scope.logout = function () {
      AdminService.userLogout().success(function (data) {
        if(data.ret_code == 0) {
          alert('成功退出！');
        }
      });
    }

  }]);
});
