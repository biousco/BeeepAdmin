'use strict';
define([
    'angular',
    'uiRouter',
    'uiBootstrap',
    'uitlps',
    'xeditable',
    'angularUeditor',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (ng) {
    window.ZeroClipboard = require('zeroClipboard');
    return ng.module('beepAdminApp', [
      'ui.router',
      'ui.bootstrap',
      'xeditable',
      'ng.ueditor',
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives'

    ]);
});
