/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsOutdateCtrl', ['$scope','AdminService','$uibModal','$state',function ($scope, AdminService, $uibModal, $state) {

    $scope.groundGoods = function (product_id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-simple.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "确认上架该商品？"
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

  }]);


});
