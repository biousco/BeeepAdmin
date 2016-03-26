define(['./app'], function (app) {
  'use strict';
  app.config(function ($httpProvider) {
    $httpProvider.interceptors.push('ServiceInterceptor');
  });
  app.run(function(editableOptions) {
    editableOptions.theme = 'bs3';
  });

  var routerMap = {
    goods: [
      {
        title: "已上架商品",
        route: "goods.racking"
      },
      {
        title: "发布商品",
        route: "goods.release"
      },
      {
        title: "已下架商品",
        route: "goods.outdate"
      }
    ],
    order: [
      {
        title: "全部订单",
        route: "order.alllist"
      }
    ],
    operation: [
      {
        title: "banner管理",
        route: "operation.banner"
      }
    ],
    article: [
      {
        title: "文章管理",
        route: "article.manage"
      },
      {
        title: "发表文章",
        route: "article.post"
      }
    ],
    account: [
      {
        title: "普通用户",
        route: "account.normal"
      },
      {
        title: "媒体用户",
        route: "account.media"
      }
    ]
  };

  app.config(function ($stateProvider,$urlRouterProvider) {

    $urlRouterProvider
      .when('/goods','/goods/racking')
      .when('/article','/article/manage')
      .when('/account','/account/normal');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      //商品
      .state('goods', {
        url: '/goods',
        templateUrl: 'views/common/modal-sidebar.html',
        data: routerMap.goods,
        controller: 'SidebarCtrl'
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
        url: "/operation",
        templateUrl: 'views/common/modal-sidebar.html',
        data: routerMap.operation,
        controller: 'SidebarCtrl'
      })
      .state('operation.banner', {
        url: '/bannermanage',
        templateUrl: 'views/operation/bannermanage.html',
        controller: 'BannerManageCtrl'
      })
      //文章
      .state('article', {
        url: '/article',
        templateUrl: 'views/common/modal-sidebar.html',
        data: routerMap.article,
        controller: 'SidebarCtrl'
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
      .state('article.update', {
        url: '/update/:article_id',
        templateUrl: 'views/article/update.html',
        controller: 'ArticleUpdateCtrl'
      })
      //用户
      .state('account', {
        url: '/account',
        templateUrl: 'views/common/modal-sidebar.html',
        data: routerMap.account,
        controller: 'SidebarCtrl'
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
        url: '/order',
        templateUrl: 'views/common/modal-sidebar.html',
        data: routerMap.order,
        controller: 'SidebarCtrl'
      })
      .state('order.alllist', {
        url: '/alllist',
        templateUrl: 'views/order/alllist.html',
        controller: 'OrderAllListCtrl'
      });



  })
});