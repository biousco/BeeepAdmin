/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('AccountNormalCtrl', ['$scope','UserService','$uibModal',function ($scope, UserService, $uibModal) {


    /** 获取所有用户 **/
    $scope.getAccountList = function () {
      UserService.getUserList().success(function (data) {
        if(data.ret_code == 0) {
          $scope.accountList = data.data;
        }
      });
    };

    /** 查看详情 **/
    $scope.showDetail = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/common/modal-account-detail.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "确认封号吗"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});
    };

    /** 封号 **/
    $scope.banAccount = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/common/modal-simple.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "确认封号吗"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});
    };

  }]);
});
