require.config({
  baseUrl: './script',
  paths: {
    angular: '../vender/angular/angular',
    domReady: '../vender/domready/ready',
    uiRouter: '../vender/angular-ui-router/release/angular-ui-router.min',
    uiBootstrap: '../vender/angular-bootstrap/ui-bootstrap.min',
    uitlps: '../vender/angular-bootstrap/ui-bootstrap-tpls.min',
    xeditable: '../vender/angular-xeditable/dist/js/xeditable',



    rangy: '../vender/rangy/rangy-core',
    saveSelection: '../vender/rangy/rangy-selectionsaverestore',
    sanitize: '../vender/textAngular/dist/textAngular-sanitize.min',
    textAngularSetup: '../vender/textAngular/dist/textAngularSetup',
    textAngular: '../vender/textAngular/dist/textAngular'
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
    },
    rangy: {
      exports: 'rangy'
    },
    saveSelection: {
      deps: ['rangy'],
      exports: ['saveSelection']
    },
    sanitize: {
      deps: ['angular'],
      exports: 'sanitize'
    },
    textAngularSetup: {
      deps: ['angular'],
      exports: 'textAngularSetup'
    },
    // saveSelection: {
    //   deps: ['rangy'],
    //   exports: 'saveSelection'
    // },
    textAngular: {
      deps: ['angular','sanitize','textAngularSetup'],
      exports: 'textAngular'
    }
  },
  deps: ['./bootstrap'],
  urlArgs: "bust=160326"
});


