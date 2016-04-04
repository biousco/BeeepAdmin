/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsTrialCtrl', ['$scope','TrialService','$state','$uibModal','$stateParams', 'ProductService', 'modAlert',
    function ($scope, TrialService, $state, $uibModal, $stateParams, ProductService, modAlert) {

    $scope.product_id = $stateParams.product_id;

    $scope.Init = function () {
      ProductService.getProductDetail({id: $scope.product_id}).success(function (data) {
        if(data.ret_code == 0) {
          $scope.goodsDetail = data.data;
        }
      });
      var param = {product_id: $scope.product_id};
      TrialService.getTrialList(param).success(function (data) {
        if(data.ret_code == 0) {
          $scope.goodsTrialList = data.data;
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
      }, function () {});
    }


  }]);


  controllers.controller('NewTrialModalCtrl', function ($scope, $uibModalInstance, goods, ProductService, modAlert) {
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
    $scope.submitTrial = function () {
      if(goods.id && goods.id !== "") {
        var dataSet = {
          id: goods.id,
          trial_startdate: $scope.trial_startdate,
          trial_enddate: $scope.trial_enddate,
          is_trial_available: 1
        };
        ProductService.updateProduct(dataSet).success(function (data) {
          if(data.ret_code == 0) {
            modAlert.success('新增试用成功！');
            $uibModalInstance.close(true);
          }
        })
      }

    }
  })
});
