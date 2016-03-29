'use strict';
define([
    'angular',
    'uiRouter',
    'uiBootstrap',
    'uitlps',
    'xeditable',
    'textAngular',
    'saveSelection',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (ng) {
    window.rangy = require('rangy');
    require('textAngular');
    return ng.module('beepAdminApp', [
      'ui.router',
      'ui.bootstrap',
      'xeditable',
      'textAngular',
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives'

    ]);
});
