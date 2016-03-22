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
      //商品
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
      .state('goods.update', {
        url: '/update/:product_id',
        templateUrl: 'views/goods/update.html',
        controller: 'GoodsUpdateCtrl'
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
      .state('goods.trial', {
        url: '/trial/:product_id',
        templateUrl: 'views/goods/trial.html',
        controller: 'GoodsTrialCtrl'
      })
      .state('goods.newtrial', {
        url: '/newtrial',
        templateUrl: 'views/goods/newtrial.html',
        controller: 'GoodsNewTrialCtrl'
      })
      //运营
      .state('operation', {
        abstract: true,
        url: '/operation',
        template: '<ui-view/>'
      })
      .state('operation.banner', {
        url: '/bannermanage',
        templateUrl: 'views/operation/bannermanage.html',
        controller: 'BannerManageCtrl'
      })
      //文章
      .state('article', {
        url: '/article',
        templateUrl: 'views/article/index.html'
      })
      .state('article.manage', {
        url: '/manage',
        templateUrl: 'views/article/manage.html',
        controller: 'ArticleManageCtrl'
      })
      .state('article.post', {
        url: '/post',
        templateUrl: 'views/article/post.html',
        controller: 'ArticlePostCtrl'
      })
      //用户
      .state('account', {
        url: '/account',
        templateUrl: 'views/account/index.html'
      })
      .state('account.normal', {
        url: '/normal',
        templateUrl: 'views/account/normal.html',
        controller: 'AccountNormalCtrl'
      })
      .state('account.media', {
        url: '/media',
        templateUrl: 'views/account/media.html',
        controller: 'AccountMediaCtrl'
      })
      //订单
      .state('order', {
        abstract: true,
        url: '/order',
        template: '<ui-view/>'
      })
      .state('order.alllist', {
        url: '/alllist',
        templateUrl: 'views/order/alllist.html',
        controller: 'OrderAllListCtrl'
      });

  })
});
