'use strict';
define([
    'angular',
    'uiRouter',
    'uiBootstrap',
    'uitlps',
    'xeditable',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (ng) {
    return ng.module('beepAdminApp', [
      'ui.router',
      'ui.bootstrap',
      'xeditable',
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives'

    ]);
});
