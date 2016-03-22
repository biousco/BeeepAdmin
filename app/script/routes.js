define(['./app'], function (app) {
  'use strict';
  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('ServiceInterceptor');
  });
  return app.config(function ($stateProvider,$urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .state('goods', {
        url: '/goods',
        templateUrl: 'views/goods/index.html',
        controller: 'GoodsCtrl'
      })
      .state('goods.release', {
        url: '/release',
        templateUrl: 'views/goods/release.html',
        controller: 'GoodsReleaseCtrl'
      })
      .state('goods.racking', {
        url: '/racking',
        templateUrl: 'views/goods/racking.html',
        controller: 'GoodsRackingCtrl'
      })
      .state('goods.outdate', {
        url: '/outdate',
        templateUrl: 'views/goods/outdate.html',
        controller: 'GoodsOutdateCtrl'
      })
      .state('operation', {
        abstract: true,
        url: '/operation',
        template: '<ui-view/>'
      })
      .state('operation.banner', {
        url: '/bannermanage',
        templateUrl: 'views/operation/bannermanage.html',
        controller: 'BannerManageCtrl'
      });
    
  })
});
