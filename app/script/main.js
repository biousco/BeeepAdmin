require.config({
  paths: {
    angular: '../vender/angular/angular',
    domReady: '../vender/domready/ready',
    jquery: '../vender/jquery/dist/jquery',
    uiRouter: '../vender/angular-ui-router/release/angular-ui-router'
  },
  shim: {
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    uiRouter: {
      deps: ['angular']
    }
  }
});


define([
  'require',
  'angular',
  'app',
  'routes'
], function (require, ng) {
  'use strict';
  require(['domReady!'], function (document) {
    ng.bootstrap(document, ['beepAdminApp']);
  });
});
