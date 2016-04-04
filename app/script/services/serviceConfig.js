define(['./module'], function(services) {
  'use strict';

  services.factory('ServiceInterceptor', ['$q', '$httpParamSerializerJQLike','modAlert', function ($q, $httpParamSerializerJQLike, modAlert) {
    return {
      'request': function (config) {
        if(config.method == 'POST') {
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          config.data = $httpParamSerializerJQLike(config.data);
        }
        return config;
      },

      'response': function (response) {
        var ret = response.data;

        if(typeof ret === "string")
          return response;
        if(typeof ret === "object") {
          if (ret.ret_code == 10000) {
            //没有权限
            window.location.href = '/';
          } else return response;
        }
      }
    }
  }])


});
