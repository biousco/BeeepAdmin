require.config({
  baseUrl: './script',
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
      deps: ['angular'],
      exports: 'uiRouter'
    },
    uiBootstrap: {
      deps: ['angular'],
      exports: 'uiBootstrap'
    },
    uitlps: {
      deps: ['angular','uiBootstrap']
    }
  },
  deps: ['./bootstrap']
});


