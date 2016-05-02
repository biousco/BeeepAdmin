/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('AccountNormalCtrl', ['$scope', 'UserService', '$uibModal', 'modAlert', '$state',
    function ($scope, UserService, $uibModal, modAlert, $state) {

      var STATUS = [
        {
          code: 0,
          text: '正常',
          operator: [0, 1]
        },
        {
          code: 1,
          text: '封号中',
          operator: [0, 2]
        }
      ];

      var OPERATE = [
        {
          text: '查看详情',
          func: 'showDetail'
        },
        {
          text: '封号',
          func: 'banAccount'
        },
        {
          text: '恢复',
          func: 'recoveryAccount'
        }
      ];

      function accountFilter (data) {
        return data.data.map(function (ele) {
          var _temp = STATUS[ele.is_delete];
          ele.status_text = _temp.text;
          ele.operate = _temp.operator.map(function (eles) {
            return OPERATE[eles];
          });
          return ele;
        });
      }

      /** 获取所有用户 **/
      $scope.getAccountList = function () {
        UserService.getUserList({type: 0}).success(function (data) {
          if (data.ret_code == 0) {
            accountFilter(data);
            $scope.accountList = data.data;
          }
        });
      };

      $scope.funcHandler = function (id, func, t) {
        $scope[func](id, t);
      };

      /** 查看详情 **/
      $scope.showDetail = function (id, t) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-account-detail.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: t
          },
          windowTopClass: 'mod-account-wrapper'
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
        }, function () {
        });
      };

      /** 封号 **/
      $scope.banAccount = function (id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "确认封号吗"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          UserService.updateUser({id: id, is_delete: 1}).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('封号成功！');
              $state.reload();
            }
          });
        }, function () {
        });
      };

      /** 恢复 **/
      $scope.recoveryAccount = function (id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "确认恢复吗"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          UserService.updateUser({id: id, is_delete: 0}).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('恢复成功！');
              $state.reload();
            }
          });
        }, function () {
        });
      };


      /** 更新试用额度 **/
      $scope.updateRank = function (uid, trial_hc) {
        var data = {id: uid, trial_hc: trial_hc};
        UserService.updateUser(data).success(function (data) {
          if (data.ret_code == 0) {
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


      /** 搜索 **/
      $scope.searchType = {search_id: 'id', search_title: 'name'};
      $scope.search_select = 'id';
      $scope.searchList = function (key) {
        var param;
        if($scope.search_select == 'id') {
          param = {search_id: key};
        } else {
          param = {search_keyword: key};
        }
        UserService.getUserList(param).success(function (data) {
          if(data.ret_code == 0) {
            accountFilter(data);
            $scope.accountList = data.data;
            if(data.data.length == 0) {
              modAlert.fail('没有该用户');
            }
          }
        })
      }


    }]);
});
