'use strict';
define([
  'angular',
  'uiRouter',
  'uiBootstrap',
  'uitlps',
  'xeditable',
  'angularUeditor',
  'angularupload',
  'ngupload',
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
    'lr.upload',
    'ngFileUpload',
    'app.services',
    'app.controllers',
    'app.filters',
    'app.directives'

  ]);
});
