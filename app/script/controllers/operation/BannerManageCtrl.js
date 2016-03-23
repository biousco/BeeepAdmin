/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('BannerManageCtrl', ['$scope','AdminService','$uibModal', function ($scope, AdminService, $uibModal) {

    /** 下线banner **/
    $scope.setoffBanner = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-simple.html',
        controller: 'SimpleDialogInstanceCtrl',
        resolve: {
          modal : {
            title: "您确认要将该banner下线吗"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});


    };

    /** 编辑banner **/
    $scope.editBanner = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-createBanner.html',
        controller: 'BannerInstanceCtrl',
        resolve: {
          modal : {
            title: "更新banner"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});
    }

    /** 创建banner **/
    $scope.createBanner = function () {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'views/common/modal-createBanner.html',
        controller: 'BannerInstanceCtrl',
        resolve: {
          modal : {
            title: "创建banner"
          }
        }
      });

      modalInstance.result.then(function (isBan) {
        if(!isBan) return false;
        console.log('yes');
      }, function () {});
    }

  }]);

  controllers.controller('BannerInstanceCtrl', function ($scope, $uibModalInstance, modal) {
    $scope.modal = modal;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  })

});
