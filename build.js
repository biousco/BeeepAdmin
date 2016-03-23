({
    appDir:'./app',
    baseUrl: './script',
    dir:'./.build',
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
    fileExclusionRegExp: /css|^(r|build)\.js|node_modules|test|idea|git/,
    modules:[
    // {
    //     name: "script/app",
    //     exclude: ['angular','jquery','uiRouter','uiBootstrap','uitlps']
    // },
    // {
    //     name: "script/controllers/index",
    //     exclude: ['angular','uiRouter','uiBootstrap','uitlps']
    // }
    {
         name: "bootstrap",
         exclude: ['angular','uiRouter','uiBootstrap','uitlps']
    }
    ],
    optimize: "none"
});
