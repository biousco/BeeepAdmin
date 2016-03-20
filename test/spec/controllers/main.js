'use strict';

define(['angularMocks','controllers/module','controllers/my-ctrl-1'], function () {
  describe('Controller: MainCtrl', function () {

    // load the controller's module
    beforeEach(module('app.controllers'));

    var MainCtrl,
        scope;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MyCtrl1', {
        $scope: scope
        // place here mocked dependencies
      });
    }));

    it('should attach a list of awesomeThings to the scopesss', function () {
      expect(scope.text).toBe('h');
    });
  });
});

