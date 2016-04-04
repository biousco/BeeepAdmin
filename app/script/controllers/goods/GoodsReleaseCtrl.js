/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsReleaseCtrl', ['$scope','ProductService','$state','CON_goodsRelate', 'modAlert',function ($scope, ProductService,$state,CON_goodsRelate, modAlert) {

    $scope.buy_channel_list = CON_goodsRelate.buy_channel;
    $scope.buy_channel = CON_goodsRelate.buy_channel[0];
    $scope.currency_type = CON_goodsRelate.currency_type;
    $scope.price_type = CON_goodsRelate.currency_type[0];

    $scope.releaseGoods = function () {
      var dataSet = {
        name: $scope.name,
        brief: $scope.brief,
        content: $scope.htmlContent,
        banner: 'http://placehold.it/100x100',
        is_trial_avaliable: 0,
        coupon: $scope.coupon,
        buy_channel: $scope.buy_channel,
        buy_link: $scope.buy_link,
        buy_store: $scope.buy_store,
        price: $scope.price
      };
      if($scope.releaseForm.$valid) {
        ProductService.addProduct(dataSet).success(function (data) {
          if(data.ret_code == 0) {
            modAlert.success('发布成功！');
            $state.go('goods.racking');
          } else {
            modAlert.fail('发布失败！失败原因：' + data.ret_msg);
          }
        })
      } else {
        console.log($scope.releaseForm,'表单不合法');
      }

    }

  }]);
});
