/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('AccountMediaCtrl', ['$scope', 'UserService', '$uibModal', 'modAlert', '$state',
    function ($scope, UserService, $uibModal, modAlert, $state) {

      var STATUS = [
        {
          code: 0,
          text: '未认证',
          operator: [0, 1, 2]
        },
        {
          code: 1,
          text: '认证通过',
          operator: [0, 3, 2]
        },
        {
          code: 2,
          text: '认证不通过',
          operator: [0, 3, 1]
        }
      ];

      var OPERATE = [
        {
          text: '查看详情',
          func: 'showDetail'
        },
        {
          text: '验证成功',
          func: 'validateSuccess'
        },
        {
          text: '验证失败',
          func: 'validateFail'
        },
        {
          text: '封号',
          func: 'banAccount'
        }
      ];

      function accountFilter (data) {
        return data.data.map(function (ele) {
          var _temp = STATUS[ele.is_auth_media];
          ele.status_text = _temp.text;
          ele.operate = _temp.operator.map(function (eles) {
            return OPERATE[eles];
          });
          return ele;
        });
      }

      /** 媒体用户 **/
      $scope.getAccountList = function () {
        var param = {type: 1};
        UserService.getUserList(param).success(function (data) {
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
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
        }, function () {
        });
      };


      /** 验证成功 **/
      $scope.validateSuccess = function (id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "确认验证成功吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: id, is_auth_media: 1, trial_hc: 1};
          UserService.updateUser(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('账号验证成功！');
              $state.reload();
            } else {
              modAlert.fail('账号验证失败...' + data.ret_msg);
            }
          })
        }, function () {
        });
      };


      /** 验证失败 **/
      $scope.validateFail = function (id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "确认验证失败吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: id, is_auth_media: 2};
          UserService.updateUser(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('账号操作成功！');
              $state.reload();
            } else {
              modAlert.fail('账号操作失败...' + data.ret_msg);
            }
          })
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
          var data = {id: id, is_delete: 1};
          UserService.updateUser(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('封号成功！');
              $state.reload();
            } else {
              modAlert.fail('封号失败...' + data.ret_msg);
            }
          })
        }, function () {
        });
      };

      /** 更新排序因子 **/
      $scope.updateRank = function (id, trial_hc) {
        var data = {id: id, trial_hc: parseInt(trial_hc, 10)};
        UserService.updateUser(data).success(function (data) {
          if (data.ret_code == 0) {
            modAlert.success('试用额度更新成功!');
          } else {
            modAlert.success('试用额度排序更新失败! ' + data.ret_msg);
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
