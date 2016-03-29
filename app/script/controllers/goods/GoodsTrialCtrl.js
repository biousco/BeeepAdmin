/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsTrialCtrl', ['$scope','AdminService','$state','$uibModal', function ($scope, AdminService, $state, $uibModal) {

    $scope.createTrial = function () {
      var modalInstance = $uibModal.open({
        templateUrl: 'views/common/modal-newtrial.html',
        controller: 'NewTrialModalCtrl',
        windowClass: 'mod-newtrial-wrapper',
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
    }


  }]);


  controllers.controller('NewTrialModalCtrl', function ($scope, $uibModalInstance, modal) {
    $scope.modal = modal;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  })
});
