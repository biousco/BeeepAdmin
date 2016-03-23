/**
 * Created by Biousco on 3/23.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('DialogCtrl', ['$scope',function ($scope, AdminService) {



  }]);

  controllers.controller('SimpleDialogInstanceCtrl', function ($scope, $uibModalInstance, modal) {
    $scope.modal = modal;
    $scope.ok = function () {
      $uibModalInstance.close(true);
    };
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  })


});
