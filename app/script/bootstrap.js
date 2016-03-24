require([
  'require',
  'angular',
  './app',
  './routes',
  './constant'
], function (require, ng) {
  'use strict';
  require(['domReady!'], function (document) {
    ng.bootstrap(document, ['beepAdminApp']);
  });
});
