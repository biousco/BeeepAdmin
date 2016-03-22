/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsRackingCtrl', ['$scope','AdminService','$uibModal','$state', function ($scope, AdminService, $uibModal, $state) {

    /** 下架商品 **/
    $scope.banGoods = function (product_id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-simple.html',
        controller: 'GoodsModalInstanceCtrl',
        resolve: {
          modal : {
            title: "确认下架该商品"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});

    };

    /** 编辑商品 **/
    $scope.updateGoods = function (product_id) {
      $state.go('goods.update', {
        product_id: product_id
      })
    };

    /** 商品试用管理 **/
    $scope.trialGoods = function (product_id) {
      $state.go('goods.trial', {
        product_id: product_id
      })
    };



  }]);

  controllers.controller('GoodsModalInstanceCtrl', function ($scope, $uibModalInstance, modal) {
    $scope.modal = modal;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  })
});
