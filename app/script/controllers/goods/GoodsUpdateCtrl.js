/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsUpdateCtrl', ['$scope','ProductService', '$stateParams', '$state','CON_goodsRelate',function ($scope, ProductService, $stateParams, $state, CON_goodsRelate) {

    $scope.buy_channel_list = CON_goodsRelate.buy_channel;
    $scope.product_id = $stateParams.product_id;

    $scope.getProductDetail = function () {
      var data = {id: $scope.product_id};
      ProductService.getProductDetail(data).success(function (data) {
        if(data.ret_code == 0) {
          $scope.product_detail = data.data;
        }
      })
    }

    $scope.updateGoods = function () {
      var dataSet = {
        id: $scope.product_id,
        name: $scope.product_detail.name,
        brief: $scope.product_detail.brief,
        content: $scope.product_detail.htmlContent,
        banner: 'http://placehold.it/100x100',
        is_trial_avaliable: 1,
        coupon: $scope.product_detail.coupon,
        buy_channel: $scope.product_detail.buy_channel,
        buy_link: $scope.product_detail.buy_link,
        buy_store: $scope.product_detail.buy_store
      };
      if($scope.updateForm.$valid) {
        ProductService.updateProduct(dataSet).success(function (data) {
          if(data.ret_code == 0) {
            alert('更新成功');
            $state.go('goods.racking');
          }
        })
      } else {
        console.log($scope.releaseForm,'表单不合法');
      }
    }

  }]);
});
