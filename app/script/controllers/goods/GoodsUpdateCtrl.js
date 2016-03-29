/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsUpdateCtrl', ['$scope','ProductService', '$stateParams', function ($scope, ProductService, $stateParams) {

    $scope.product_id = $stateParams.product_id;

    $scope.getProductDetail = function () {
      var data = {id: $scope.product_id};
      ProductService.getProductDetail(data).success(function (data) {
        if(data.ret_code == 0) {
          $scope.product_detail = data.data;
        }
      })
    }

  }]);
});
