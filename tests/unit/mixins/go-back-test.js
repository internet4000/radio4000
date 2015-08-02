import Ember from 'ember';
import GoBackMixin from '../../../mixins/go-back';
import { module, test } from 'qunit';

module('Unit | Mixin | go back');

// Replace this with your real tests.
test('it works', function(assert) {
  var GoBackObject = Ember.Object.extend(GoBackMixin);
  var subject = GoBackObject.create();
  assert.ok(subject);
});
