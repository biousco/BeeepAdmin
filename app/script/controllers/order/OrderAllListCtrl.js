/**
 * Created by Biousco on 3/22.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('OrderAllListCtrl', ['$scope','AdminService','$uibModal', function ($scope, AdminService, $uibModal) {

    /** 审核成功 **/
    $scope.checkSuccess = function (product_id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-simple.html',
        controller: 'OrderModalInstanceCtrl',
        resolve: {
          modal : {
            title: "您确认将该申请状态改为审核成功吗？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});

    };

    /** 审核失败 **/
    $scope.checkFail = function (product_id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-simple.html',
        controller: 'OrderModalInstanceCtrl',
        resolve: {
          modal : {
            title: "您确认将该申请状态改为审核失败吗？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});

    };

    /** 发货 **/
    $scope.sentGoods = function (product_id) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-alllist-sentGoods.html',
        controller: 'OrderModalInstanceCtrl',
        resolve: {
          modal : {
            title: "您确认将该申请状态改为审核失败吗？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});

    };

    /** 文章已发布 **/
    $scope.sentArticleSuccess = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-alllist-articlePosted.html',
        controller: 'OrderModalInstanceCtrl',
        resolve: {
          modal : {
            title: "您确认将该申请状态改为审核失败吗？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});

    };

    /** 文章审核失败 **/
    $scope.sentArticleFail = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-simple.html',
        controller: 'OrderModalInstanceCtrl',
        resolve: {
          modal : {
            title: "您确认不通过该文章的审核吗？"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});

    };


  }]);

  controllers.controller('OrderModalInstanceCtrl', function ($scope, $uibModalInstance, modal) {
    $scope.modal = modal;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  });

});
