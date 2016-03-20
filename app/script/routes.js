define(['./app'], function(app) {
    'use strict';
    return app.config(function($stateProvider) {
        $stateProvider.state('view1',{
            url: '/view1',
            templateUrl: 'views/partial1.html',
            controller:'MyCtrl1'
        })
        .state('view2',{
            url: '/view2',
            templateUrl: 'views/partial2.html',
            controller: 'MyCtrl2'
        });
    })
});
