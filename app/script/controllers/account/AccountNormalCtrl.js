/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('AccountNormalCtrl', ['$scope','UserService','$uibModal','modAlert',function ($scope, UserService, $uibModal, modAlert) {


    /** 获取所有用户 **/
    $scope.getAccountList = function () {
      UserService.getUserList({type: 0}).success(function (data) {
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


    /** 更新试用额度 **/
    $scope.updateRank = function (uid, trial_hc) {
      var data = {id: uid, trial_hc: trial_hc};
      UserService.updateUser(data).success(function (data) {
        if(data.ret_code == 0) {
          modAlert.success('试用额度更新成功!');
          //$state.go('goods.outdate');
        } else {
          modAlert.success('试用额度更新失败： ' + data.ret_msg);
        }
      })
    };

    $scope.tipsRank = function () {
      modAlert.success('更新中..');
    }
  }]);
});
