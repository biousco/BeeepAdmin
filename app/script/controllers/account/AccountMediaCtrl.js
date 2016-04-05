/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('AccountMediaCtrl', ['$scope','UserService','$uibModal','modAlert',
    function ($scope, UserService, $uibModal, modAlert) {

    /** 媒体用户 **/
    $scope.getAccountList = function () {
      var param = {type: 1};
      UserService.getUserList(param).success(function (data) {
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

    /** 更新排序因子 **/
    $scope.updateRank = function (id, trial_hc) {
      var data = {id: id, trial_hc: parseInt(trial_hc, 10)};
      UserService.updateUser(data).success(function (data) {
        if(data.ret_code == 0) {
          modAlert.success('试用额度更新成功!');
        } else {
          modAlert.success('试用额度排序更新失败! ' + data.ret_msg);
        }
      })
    };

    $scope.tipsRank = function () {
      modAlert.success('更新中..');
    }

  }]);
});
