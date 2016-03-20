define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('MyCtrl1', ['$scope',function ($scope) {
      $scope.awesomeThings = [1,2,3];
      $scope.text = 'h';
    }]);
});
