/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('OrderAllListCtrl', ['$scope', 'TrialService', '$uibModal', 'modAlert', '$state',
    function ($scope, TrialService, $uibModal, modAlert, $state) {

      var STATUS = [
        {
          status: 0,
          title: '试用申请审核中',
          operate: [0, 1, 2]
        },
        {
          status: 1,
          title: '试用申请审核失败',
          operate: [0]
        },
        {
          status: 2,
          title: '试用申请审核成功-待发货',
          operate: [0, 3]
        },
        {
          status: 3,
          title: '试用申请审核成功-已发货',
          operate: [0]
        },
        {
          status: 4,
          title: '试用文章审核中',
          operate: [0, 4, 5]
        },
        {
          status: 5,
          title: '文章审核失败',
          operate: [0]
        },
        {
          status: 6,
          title: '文章已发布',
          operate: [0]
        }

      ];

      var OPERATE = [
        {
          title: '查看详情',
          func: 'getOrderDetail'
        },
        {
          title: '审核成功',
          func: 'checkSuccess',
          target: 2
        },
        {
          title: '审核失败',
          func: 'checkFail',
          target: 1
        },
        {
          title: '发货',
          func: 'sentGoods',
          target: 2
        },
        {
          title: '文章已发布',
          func: 'sentArticleSuccess',
          target: 5
        },
        {
          title: '文章审核失败',
          func: 'sentArticleFail',
          target: 4
        }
      ];

      function trialListFilter(data) {
        angular.forEach(data, function (value, key) {
          var _s = STATUS[value.status];
          value.status_title = _s.title;
          value.operation = [];
          angular.forEach(_s.operate, function (values, key) {
            value.operation.push(OPERATE[values]);
          })
        });
      }


      /** 获取所有申请记录 **/
      $scope.getAllTrial = function () {
        TrialService.getTrialList().success(function (data) {
          if (data.ret_code == 0) {
            $scope.trial_list = data.data;
            trialListFilter($scope.trial_list);
          }
        })
      };

      $scope.updateStatus = function (trial_id, func, trial) {
        $scope[func](trial_id, trial);
      };


      /** 审核成功 **/
      $scope.checkSuccess = function (trial_id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "您确认将该申请状态改为审核成功吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: trial_id, status: 2};
          TrialService.updateTrial(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('审核成功');
              $state.reload();
            }
          });
        }, function () {
        });

      };

      /** 审核失败 **/
      $scope.checkFail = function (trial_id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "您确认将该申请状态改为审核失败吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: trial_id, status: 1};
          TrialService.updateTrial(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('状态更新成功');
              $state.reload();
            }
          });
        }, function () {
        });

      };

      /** 发货 **/
      $scope.sentGoods = function (trial_id, trial) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-alllist-sentGoods.html',
          controller: 'SentGoodsInstanceCtrl',
          resolve: {
            modal: {
              trial: trial
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          $state.reload();
        }, function () {
        });

      };

      /** 文章已发布 **/
      $scope.sentArticleSuccess = function (trial_id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "您确认通过该文章的审核吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: trial_id, status: 6};
          TrialService.updateTrial(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('状态更新成功');
              $state.reload();
            }
          });
        }, function () {
        });

      };

      /** 文章审核失败 **/
      $scope.sentArticleFail = function (trial_id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "您确认不通过该文章的审核吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: trial_id, status: 4};
          TrialService.updateTrial(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('状态更新成功');
              $state.reload();
            }
          });
        }, function () {
        });

      };

      /** 查看详情 **/
      $scope.getOrderDetail = function (trial_id, trial) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-orderdetail.html',
          controller: 'OrderDetailInstanceCtrl',
          windowTopClass: 'mod-orderdetail-pop',
          resolve: {
            modal: trial
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: trial_id, status: 4};
          TrialService.updateTrial(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('状态更新成功');
              $state.reload();
            }
          });
        }, function () {
        });
      }

      /** 搜索 **/
      $scope.searchList = function (trial_id) {
        TrialService.getTrialList({trial_id: trial_id}).success(function (data) {
          if (data.ret_code == 0) {
            if (data.data) {
              $scope.trial_list = data.data;
              trialListFilter($scope.trial_list);
            } else {
              modAlert.fail('没有查询到该订单');
            }
          } else {
            modAlert.fail('查询失败，请重试：' + data.ret_msg);
          }
        })
      }


    }]);

  controllers.controller('OrderDetailInstanceCtrl', function ($scope, $uibModalInstance, modal) {
    $scope.trial_list = modal;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  });

  controllers.controller('SentGoodsInstanceCtrl', function ($scope, $uibModalInstance, modal, modAlert, TrialService) {
    $scope.trial = modal.trial;

    $scope.sentGoods = function () {
      var data = {
        id: $scope.trial.id,
        express: $scope.trial.express,
        express_number: $scope.trial.express_number,
        status: 3,
        email_content: $scope.trial.email_content
      };
      TrialService.updateTrial(data).success(function (data) {
        if (data.ret_code == 0) {
          modAlert.success('发货成功！');
          $uibModalInstance.close(true);
        } else {
          modAlert.fail('发货失败...' + data.ret_msg);
        }
      })
    };

    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  });

});
