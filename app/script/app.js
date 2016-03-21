'use strict';
define([
    'angular',
    'uiRouter',
    './controllers/index',
    './directives/index',
    './filters/index',
    './services/index'
], function (ng) {
    return ng.module('beepAdminApp', [
        'app.services',
        'app.controllers',
        'app.filters',
        'app.directives',
        'ui.router'
    ]);
});
