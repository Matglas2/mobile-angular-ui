'use strict';

describe('core', function() {
  describe('capture', function() {
    var scope;
    var compile;

    beforeEach(function() {
      module('mobile-angular-ui.core');
      inject(function($rootScope, $compile) {
        scope = $rootScope.$new();
        compile = $compile;
      });
    });

    describe('ui-yield-to', function() {
      it('should allow ng-click to work', function() {
        scope.myVar = 0;

        var elem = angular.element(
          '<div ui-yield-to="placeholder"><a href ng-click="myVar = 1">Ng Click</a></div>'
        );

        elem = compile(elem)(scope);
        scope.$digest();

        elem.find('a').triggerHandler('click');

        expect(scope.myVar).toBe(1);
      });
    });
  });
});