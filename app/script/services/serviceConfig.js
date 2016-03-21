define(['./module'], function(services) {
  'use strict';

  services.factory('ServiceInterceptor', ['$q', function ($q) {
    return {
      'request': function (config) {
        return config;
      },

      'response': function (response) {
        var ret = response.data;

        if(typeof ret === "string")
          return response;
        if(typeof ret === "object") {
          if (ret.ret_code !== 0) {
            console.warn('Service Error');
          } else return response;
        }
      }
    }
  }])


});
