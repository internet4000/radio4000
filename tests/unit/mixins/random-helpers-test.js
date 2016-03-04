import Ember from 'ember';
import RandomHelpersMixin from '../../../mixins/random-helpers';
import {module, test} from 'qunit';

module('Unit | Mixin | random helpers');

// Replace this with your real tests.
test('it works', function (assert) {
  var RandomHelpersObject = Ember.Object.extend(RandomHelpersMixin);
  var subject = RandomHelpersObject.create();
  assert.ok(subject);
});
