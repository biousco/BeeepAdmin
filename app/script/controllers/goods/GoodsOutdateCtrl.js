/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsOutdateCtrl', ['$scope','ProductService','$uibModal','$state',function ($scope, ProductService, $uibModal, $state) {


    /** 获取所有记录 **/
    $scope.getProductList = function () {
      ProductService.getProductList().success(function (data) {
        if(data.ret_code = 0) {
          $scope.product_list = data.data;
        }
      })
    };


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
