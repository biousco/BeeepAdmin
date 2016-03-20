var tests = [];

for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    // Add all spec files and helpers
    if (/spec\/.+.js$/.test(file)) {
      tests.push(file);
    }
  }
}

require.config({
  baseUrl: '/base/app/script',
  paths: {
    angular: '../vender/angular/angular',
    domReady: '../vender/domready/ready',
    jquery: '../vender/jquery/dist/jquery',
    uiRouter: '../vender/angular-ui-router/release/angular-ui-router',
    angularMocks: '../vender/angular-mocks/angular-mocks',
    angularResource: '../vender/angular-resource/angular-resource.min',
    unitTest: '../../test/spec'
  },
  shim: {
    angular: {
      exports: 'angular'
    },
    uiRouter: {
      deps: ['angular']
    },
    angularResource: {
      deps: ['angular']
    },
    angularMocks: {
      deps:['angularResource']
    }
  }
});

require([
  'domReady',
  'unitTest/controllers/main'
], function (domReady) {
  window.__karma__.start();
});

