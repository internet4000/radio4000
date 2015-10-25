import Ember from 'ember';
import OwnerRouteMixin from '../../../mixins/owner-route';
import { module, test } from 'qunit';

module('Unit | Mixin | owner route');

// Replace this with your real tests.
test('it works', function(assert) {
  var OwnerRouteObject = Ember.Object.extend(OwnerRouteMixin);
  var subject = OwnerRouteObject.create();
  assert.ok(subject);
});
