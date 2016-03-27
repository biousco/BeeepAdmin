/**
 * Created by Biousco on 3/27.
 */
define(['./module'], function (directives) {
  'use strict';
  directives.directive('ngEnter', ['$rootScope', function ($rootScope) {
    return function (scope, element, attrs) {
      element.bind("keydown keypress", function (event) {
        if(event.which === 13) {
          scope.$apply(function (){
            scope.$eval(attrs.ngEnter);
          });

          event.preventDefault();
        }
      });
    };
  }])
});
