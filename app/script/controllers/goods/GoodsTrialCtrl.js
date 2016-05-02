/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsTrialCtrl', ['$scope', '$state', '$uibModal', '$stateParams', 'ProductService', 'modAlert', 'BatchService',
    function ($scope, $state, $uibModal, $stateParams, ProductService, modAlert, BatchService) {

      $scope.product_id = $stateParams.product_id;

      $scope.Init = function () {
        ProductService.getProductDetail({id: $scope.product_id}).success(function (data) {
          if (data.ret_code == 0) {
            $scope.goodsDetail = data.data;
          }
        });
        var param = {product_id: $scope.product_id};
        BatchService.getBatchList(param).success(function (data) {
          if (data.ret_code == 0) {
            $scope.goodsBatchList = data.data;
          }
        })
      };

      $scope.showBatchOrder = function (batch_id) {
        $state.go('order.alllist', {
          batch_id: batch_id
        })
      };

      $scope.updateAva = function () {
        console.log($scope.goodsDetail.is_trial_available)
        var param = {id: $scope.product_id, is_trial_available: $scope.goodsDetail.is_trial_available};
        ProductService.updateProduct(param).success(function (data) {
          if(data.ret_code == 0) {
            modAlert.success('商品试用状态更新成功！');
          } else {
            modAlert.fail('商品试用状态更新失败...');
          }
        })
      };

      $scope.createTrial = function () {
        if($scope.goodsDetail.is_trial_available == 0) {
          modAlert.fail('请先打开试用开关');
          return false;
        }
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-newtrial.html',
          controller: 'NewTrialModalCtrl',
          windowClass: 'mod-newtrial-wrapper',
          resolve: {
            goods: $scope.goodsDetail,
            batch: null
          }
        });

        modalInstance.result.then(function (isBan) {
          $state.reload();
        }, function () {
        });
      };

      $scope.updateBatch = function (batch_info) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-newtrial.html',
          controller: 'NewTrialModalCtrl',
          windowClass: 'mod-newtrial-wrapper',
          resolve: {
            goods: $scope.goodsDetail,
            batch: batch_info
          }
        });

        modalInstance.result.then(function (isBan) {
          $state.reload();
        }, function () {
        });
      };

      $scope.deleteBatch = function (batch_id) {
        var modalInstance = $uibModal.open({
          templateUrl: 'views/common/modal-simple.html',
          controller: 'SimpleDialogInstanceCtrl',
          resolve: {
            modal: {
              title: "确认删除该批次吗？"
            }
          }
        });

        modalInstance.result.then(function (isBan) {
          if (!isBan) return false;
          var data = {id: batch_id};
          BatchService.deleteBatch(data).success(function (data) {
            if (data.ret_code == 0) {
              modAlert.success('批次删除成功！');
              $state.reload();
            }
          })
        }, function () {
        });
      }


    }]);


  controllers.controller('NewTrialModalCtrl', function ($scope, $uibModalInstance, goods, BatchService, modAlert, batch) {
    $scope.modal = goods;

    if(batch) {
      $scope.batch = batch;
      $scope.trial_starttime = $scope.trial_startdate = new Date(batch.trial_start_datetime);
      $scope.trial_endtime = $scope.trial_enddate = new Date(batch.trial_end_datetime);
    }


    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.openStart = function () {
      $scope.popup1.opened = true;
    };
    $scope.openEnd = function () {
      $scope.popup2.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };
    $scope.popup2 = {
      opened: false
    };

    $scope.dateOptionsStart = {};

    $scope.dateOptionsEnd = {};

    function ReformateDateTime(date, time) {
      if (!date || !time) return false;
      date = new Date(date.valueOf());
      var s_h = time.getHours() + 8,
        s_min = time.getMinutes();
      date.setHours(s_h);
      date.setMinutes(s_min);
      return date;
    }

    function compareDate(d1, d2) {
      return d1 < d2;
    }

    $scope.submitTrial = function () {

      var trial_start_datetime = ReformateDateTime($scope.trial_startdate, $scope.trial_starttime),
        trial_end_datetime = ReformateDateTime($scope.trial_enddate, $scope.trial_endtime);

      if(trial_start_datetime > trial_end_datetime) {
        modAlert.fail('结束时间不能早于开始时间');
        return false;
      }

      var method = 'addBatch';

      // console.log(trial_end_datetime, trial_start_datetime, $scope.trial_starttime)
      if (goods.id && goods.id !== "") {
        var dataSet = {
          product_id: goods.id,
          trial_start_datetime: trial_start_datetime,
          trial_end_datetime: trial_end_datetime
        };

        if(batch) {
          dataSet.product_id = batch.product_id;
          dataSet.id = batch.id;
          method = 'updateBatch';
        }

        BatchService[method](dataSet).success(function (data) {
          if (data.ret_code == 0) {
            modAlert.success('新增试用成功！');
            $uibModalInstance.close(true);
          } else {
            modAlert.fail('新增失败：' + data.ret_msg);
          }
        })
      }

    }
  })
});
