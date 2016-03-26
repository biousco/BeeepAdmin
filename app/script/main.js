require.config({
  baseUrl: './script',
  paths: {
    angular: '../vender/angular/angular.min',
    domReady: '../vender/domready/ready',
    uiRouter: '../vender/angular-ui-router/release/angular-ui-router.min',
    uiBootstrap: '../vender/angular-bootstrap/ui-bootstrap.min',
    uitlps: '../vender/angular-bootstrap/ui-bootstrap-tpls.min',
    xeditable: '../vender/angular-xeditable/dist/js/xeditable.min'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    uiRouter: {
      deps: ['angular'],
      exports: 'uiRouter'
    },
    uiBootstrap: {
      deps: ['angular'],
      exports: 'uiBootstrap'
    },
    uitlps: {
      deps: ['angular','uiBootstrap']
    },
    xeditable: {
      deps: ['angular'],
      exports: 'xeditable'
    }
  },
  deps: ['./bootstrap'],
  urlArgs: "bust=160326"
});


