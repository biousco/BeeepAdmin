/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsOutdateCtrl', ['$scope','ProductService','$uibModal','$state', '$filter', 'modAlert', function ($scope, ProductService, $uibModal, $state, $filter, modAlert) {


    /** 获取所有记录 **/
    $scope.getProductList = function () {
      var param = {is_delete: 1};
      ProductService.getProductList(param).success(function (data) {
        if(data.ret_code == 0) {
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
        var data = {id: product_id, is_delete: 0};
        ProductService.updateProduct(data).success(function (data) {
          if(data.ret_code == 0) {
            modAlert.success("上架成功！");
            $state.go('goods.racking');
            //window.location.reload();
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

    /** 更新排序因子 **/
    $scope.updateRank = function (product_id, rank) {
      var data = {id: product_id, rank: parseInt(rank, 10)};
      ProductService.updateProduct(data).success(function (data) {
        if(data.ret_code == 0) {
          modAlert.success('排序更新成功!');
        } else {
          modAlert.success('排序更新失败!');
        }
      })
    };

    $scope.tipsRank = function () {
      modAlert.success('更新中..');
    }

  }]);


});
