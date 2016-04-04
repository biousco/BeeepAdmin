define(['./module'], function(services) {
  'use strict';

  services.service('modAlert', [ '$timeout' , function ($timeout) {

    var getSingle = function ( fn ) {
      var result;
      return function () {
        return result || ( result = fn.apply(this, arguments) );
      }
    };

    var CONFIG = {
      timeout: 2000,
      showCls: 'show',
      successCls: '',
      failCls: 'fail',
      eleId: 'mod-alert'
    };

    var config = function (_config) {
      CONFIG = angular.extend(CONFIG, _config);
    };

    var init = function () {
      config();
      var dom = document.getElementById(CONFIG.eleId),
        $dom = angular.element(dom);
      return $dom;
    };

    function Showsuccess(text) {
      var $dom = getSingle(init)();

      $dom.addClass(CONFIG.showCls).addClass(CONFIG.successCls).text(text);
      $timeout(function () {
        $dom.removeClass(CONFIG.showCls).text("");
        $timeout(function () {
          $dom.removeClass(CONFIG.successCls)
        }, 1000);
      }, CONFIG.timeout);

    }

    function ShowFail(text) {
      var $dom = getSingle(init)();

      $dom.addClass(CONFIG.showCls).addClass(CONFIG.failCls).text(text);
      $timeout(function () {
        $dom.removeClass(CONFIG.showCls).text("");
        $timeout(function () {
          $dom.removeClass(CONFIG.failCls)
        }, 1000);
      }, CONFIG.timeout);
    }

    return {
      config: config,
      success: Showsuccess,
      fail: ShowFail
    }

  }]);


});
