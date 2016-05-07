require.config({
  baseUrl: './script',
  paths: {
    angular: '../vender/angular/angular.min',
    domReady: '../vender/domready/ready',
    uiRouter: '../vender/angular-ui-router/release/angular-ui-router.min',
    uiBootstrap: '../vender/angular-bootstrap/ui-bootstrap.min',
    uitlps: '../vender/angular-bootstrap/ui-bootstrap-tpls.min',
    xeditable: '../vender/angular-xeditable/dist/js/xeditable',
    ueditor: '../vender/ueditor/ueditor.all',
    ueditorConfig: '../vender/ueditor/ueditor.config',
    angularUeditor: '../vender/angular-ueditor/dist/angular-ueditor.min',
    zeroClipboard: '../vender/ueditor/third-party/zeroclipboard/ZeroClipboard.min',
    angularupload: '../vender/angular-upload/angular-upload.min',
    ngupload: '../vender/ng-file-upload/ng-file-upload.min'
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
    zeroClipboard: {
      exports: 'zeroClipboard'
    },
    ueditor: {
      deps: ['ueditorConfig'],
      exports: 'Editor'
    },
    angularUeditor: {
      deps: ['ueditor','ueditorConfig','zeroClipboard'],
      exports: 'angularUeditor'
    },
    angularupload: {
      deps: ['angular'],
      exports: 'angularupload'
    },
    ngupload: {
      deps: ['angular'],
      exports: 'ngupload'
    }
  },
  deps: ['./bootstrap'],
  urlArgs: "bust=16043025"
});


