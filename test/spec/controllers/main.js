'use strict';

define(['angularMocks',
  'controllers/module',
  'controllers/my-ctrl-1',
  'controllers/LoginCtrl',
  'services/module',
  'services/cgi'
], function () {
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
      });
    }));

    it('should attach a list of awesomeThings to the scopesss', function () {
      expect(scope.text).toBe('h');
      //expect(MainCtrl).not.to.equal(null);
    });
  });

  describe('Controller: LoginCtrl', function () {

    var scope, ctrl, mockBackend;

    beforeEach(function () {
      module('app.controllers');
      module('app.services');
    });

    beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
      mockBackend = _$httpBackend_;
      scope = $rootScope.$new();
      ctrl =  $controller('LoginCtrl', {$scope: scope});
    }));

    it('should login success', function () {
      mockBackend.expectPOST('/Admin/User/Login').
        respond({
        ret_code: 0,
        ret_msg: "success"
      });
      scope.name = "111";
      scope.pwd = "ddd";

      scope.adminLogin();

      expect(scope.isLogin).toBeFalsy();

      mockBackend.flush();

      expect(scope.isLogin).toBeTruthy();
    })
  })
});

