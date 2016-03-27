/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsRackingCtrl', ['$scope','ProductService','$uibModal','$state', function ($scope, ProductService, $uibModal, $state) {

    $scope.hc = 14;

    $scope.updateList = function () {
      console.log('ddd')
    };

    /** 获取所有记录 **/
    $scope.getProductList = function () {
      ProductService.getProductList().success(function (data) {
        if(data.ret_code = 0) {
          $scope.product_list = data.data;
        }
      })
    };


    /** 下架商品 **/
    $scope.banGoods = function (product_id) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/common/modal-simple.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "确认下架改商品？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        var data = {product_id: product_id};
        ProductService.deleteProduct(data).success(function (data) {
          if(data.ret_code == 0) {
            alert("下架成功！");
          }
        })
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


});
