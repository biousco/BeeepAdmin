define(['./app'], function (app) {
  'use strict';
  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('ServiceInterceptor');
  });
  return app.config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      });
  })
});
