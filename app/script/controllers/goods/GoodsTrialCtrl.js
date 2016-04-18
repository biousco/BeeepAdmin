/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsTrialCtrl', ['$scope','$state','$uibModal','$stateParams', 'ProductService', 'modAlert', 'BatchService',
    function ($scope, $state, $uibModal, $stateParams, ProductService, modAlert, BatchService) {

    $scope.product_id = $stateParams.product_id;

    $scope.Init = function () {
      ProductService.getProductDetail({id: $scope.product_id}).success(function (data) {
        if(data.ret_code == 0) {
          $scope.goodsDetail = data.data;
        }
      });
      var param = {product_id: $scope.product_id};
      BatchService.getBatchList(param).success(function (data) {
        if(data.ret_code == 0) {
          $scope.goodsBatchList = data.data;
        }
      })
    };

    $scope.createTrial = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/common/modal-newtrial.html',
        controller: 'NewTrialModalCtrl',
        windowClass: 'mod-newtrial-wrapper',
        resolve: {
            goods: $scope.goodsDetail
        }
      });

      modalInstance.result.then(function (isBan) {
        $state.reload();
      }, function () {});
    }


  }]);


  controllers.controller('NewTrialModalCtrl', function ($scope, $uibModalInstance, goods, BatchService, modAlert) {
    $scope.modal = goods;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };

    $scope.openStart = function() {
      $scope.popup1.opened = true;
    };
    $scope.openEnd = function() {
      $scope.popup2.opened = true;
    };

    $scope.popup1 = {
      opened: false
    };
    $scope.popup2 = {
      opened: false
    };

    $scope.dateOptionsStart = {

    };

    $scope.dateOptionsEnd = {

    };

    function ReformateDateTime (date, time) {
      if(!date || !time) return false;
      date = new Date(date.valueOf() + 1*24*60*60*1000);
      var s_h = time.getUTCHours() + 8,
          s_min = time.getUTCMinutes();
      date.setUTCHours(s_h);
      date.setUTCMinutes(s_min);
      return date;
    }


    $scope.submitTrial = function () {
      var trial_start_datetime = ReformateDateTime($scope.trial_startdate, $scope.trial_starttime),
        trial_end_datetime = ReformateDateTime($scope.trial_enddate, $scope.trial_endtime);
      // console.log(trial_end_datetime, trial_start_datetime, $scope.trial_starttime)
      if(goods.id && goods.id !== "") {
        var dataSet = {
          product_id: goods.id,
          trial_start_datetime: trial_start_datetime,
          trial_end_datetime: trial_end_datetime,
          is_trial_available: 1
        };
        BatchService.addBatch(dataSet).success(function (data) {
          if(data.ret_code == 0) {
            modAlert.success('新增试用成功！');
            $uibModalInstance.close(true);
          }
        })
      }

    }
  })
});
