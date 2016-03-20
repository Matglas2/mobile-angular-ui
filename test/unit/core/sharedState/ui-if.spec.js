'use strict';

describe('core', function() {
  describe('sharedState', function() {
    var scope;
    var compile;
    var SharedState;

    beforeEach(function() {
      module('mobile-angular-ui.core');
      inject(function($rootScope, $compile, _SharedState_) {
        scope = $rootScope.$new();
        compile = $compile;
        SharedState = _SharedState_;
      });
    });

    describe('ui-if', function() {
      it('should remove elem if state is false', function() {
        SharedState.initialize(scope, 'state1', {defaultValue: false});

        var elem = compile(angular.element('<div><div ui-if="state1">content</div></div>'))(scope);

        scope.$digest();
        expect(elem.text()).not.toContain('content');
      });

      it('should not remove elem if state is true', function() {
        SharedState.initialize(scope, 'state1', {defaultValue: true});

        var elem = compile(angular.element('<div><div ui-if="state1">content</div></div>'))(scope);

        scope.$digest();
        expect(elem.text()).toContain('content');
      });

      it('should remove elem if interpolated state is false', function() {
        SharedState.initialize(scope, 'state1', {defaultValue: false});

        scope.x = 1;
        var elem = compile(angular.element('<div><div ui-if="state{{x}}">content</div></div>'))(scope);

        scope.$digest();
        expect(elem.text()).not.toContain('content');
      });

      it('should not remove elem if interpolated state is true', function() {
        SharedState.initialize(scope, 'state1', {defaultValue: true});

        scope.x = 1;
        var elem = compile(angular.element('<div><div ui-if="state{{x}}">content</div></div>'))(scope);

        scope.$digest();
        expect(elem.text()).toContain('content');
      });
    });
  });
});