import Ember from 'ember';
import CreateTrackMixin from '../../../mixins/create-track';
import {module, test} from 'qunit';

module('Unit | Mixin | create track');

// Replace this with your real tests.
test('it works', function (assert) {
  var CreateTrackObject = Ember.Object.extend(CreateTrackMixin);
  var subject = CreateTrackObject.create();
  assert.ok(subject);
});
