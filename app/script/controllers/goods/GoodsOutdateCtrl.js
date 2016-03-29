/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsOutdateCtrl', ['$scope','ProductService','$uibModal','$state', '$filter', function ($scope, ProductService, $uibModal, $state, $filter) {


    /** 获取所有记录 **/
    $scope.getProductList = function () {
      ProductService.getProductList().success(function (data) {
        if(data.ret_code == 0) {
          $scope.product_list = $filter('filter')(data.data, function (value, index) {
            return value.is_delete == 1;
          })
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
        var data = {id: product_id, is_delete: 0};
        ProductService.deleteProduct(data).success(function (data) {
          if(data.ret_code == 0) {
            alert("上架成功！");
            window.location.reload();
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

  }]);


});
