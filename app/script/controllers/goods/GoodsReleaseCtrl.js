/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsReleaseCtrl', ['$scope','ProductService','$state',function ($scope, ProductService,$state) {

    $scope.buy_channel_list = [
      'Amazon','Ebay','Taobao','TianMao'
    ];
    $scope.buy_channel = 'Amazon';

    $scope.releaseGoods = function () {
      var dataSet = {
        name: $scope.name,
        brief: $scope.brief,
        content: $scope.htmlContent,
        banner: 'http://placehold.it/100x100',
        is_trial_avaliable: 1,
        coupon: $scope.coupon,
        buy_channel: $scope.buy_channel,
        buy_link: $scope.buy_link,
        buy_store: $scope.buy_store
      };
      if($scope.releaseForm.$valid) {
        ProductService.addProduct(dataSet).success(function (data) {
          if(data.ret_code == 0) {
            alert('发布成功');
            $state.go('goods.racking');
          }
        })
      } else {
        console.log($scope.releaseForm,'表单不合法');
      }

    }

  }]);
});
