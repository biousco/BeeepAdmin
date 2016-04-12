/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsRackingCtrl', ['$scope','ProductService','$uibModal','$state', '$filter', 'modAlert', function ($scope, ProductService, $uibModal, $state, $filter, modAlert) {



    /** 获取所有记录 **/
    $scope.getProductList = function () {
      ProductService.getProductList({is_delete: 0}).success(function (data) {
        if(data.ret_code == 0) {
          $scope.product_list = data.data;
        }
      })
    };

    /** 预览 **/
    $scope.previewGoods = function (preview_link) {
      window.open(preview_link);
    };


    /** 下架商品 **/
    $scope.banGoods = function (product_id) {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/common/modal-simple.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "确认下架该商品？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        var data = {id: product_id, is_delete: 1};
        ProductService.updateProduct(data).success(function (data) {
          if(data.ret_code == 0) {
            modAlert.success('下架成功!');
            $state.go('goods.outdate');
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

    /** 更新排序因子 **/
    $scope.updateRank = function (product_id, rank) {
      var data = {id: product_id, rank: rank};
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
