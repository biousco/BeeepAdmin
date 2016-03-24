define(['./module'], function(services) {
  'use strict';

  services.factory('ServiceInterceptor', ['$q', '$httpParamSerializerJQLike',  function ($q, $httpParamSerializerJQLike) {
    return {
      'request': function (config) {
        console.log(config);
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
          if (ret.ret_code !== 0) {
            console.warn('Service Error');
          } else return response;
        }
      }
    }
  }])


});
