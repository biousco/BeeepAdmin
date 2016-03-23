/**
 * Created by Biousco on 3/21.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('GoodsTrialCtrl', ['$scope','AdminService','$state',function ($scope, AdminService, $state) {

    $scope.createTrial = function () {
      $state.go('goods.newtrial');
    }


  }]);
});
