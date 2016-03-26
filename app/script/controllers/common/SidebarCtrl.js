/**
 * Created by Biousco on 3/23.
 */
define(['./../module'], function (controllers) {
  'use strict';
  controllers.controller('SidebarCtrl', ['$scope','$state', function ($scope, $state) {

    $scope.route = $state.current.data;


  }]);



});
