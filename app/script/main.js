require.config({
  paths: {
    angular: '../vender/angular/angular',
    domReady: '../vender/domready/ready',
    jquery: '../vender/jquery/dist/jquery',
    uiRouter: '../vender/angular-ui-router/release/angular-ui-router',
    uiBootstrap: '../vender/angular-bootstrap/ui-bootstrap',
    uitlps: '../vender/angular-bootstrap/ui-bootstrap-tpls.min'
  },
  shim: {
    angular: {
      deps: ['jquery'],
      exports: 'angular'
    },
    uiRouter: {
      deps: ['angular']
    },
    uiBootstrap: {
      deps: ['angular']
    },
    uitlps: {
      deps: ['angular','uiBootstrap']
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

