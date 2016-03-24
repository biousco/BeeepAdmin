require([
  'require',
  'angular',
  './app',
  './appconfig',
  './constant'
], function (require, ng) {
  'use strict';
  require(['domReady!'], function (document) {
    ng.bootstrap(document, ['beepAdminApp']);
  });
});
