/**
 * Created by Biousco on 3/27.
 */
define(['./module'], function (directives) {
  'use strict';
  directives.directive('modSearchBar', ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      templateUrl: "views/common/mod-search-bar.html",
      replace: true,
      scope: {
        labelText: '=labelText'
      },
      link: function (scope, element, attrs) {
        element[0].focus();

        scope.show = function () {
          console.log('h')
        }
      }
    }
  }])
});
