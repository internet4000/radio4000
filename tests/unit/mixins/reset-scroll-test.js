import Ember from 'ember';
import {module, test} from 'qunit';
import ResetScrollMixin from 'radio4000/mixins/reset-scroll';

module('ResetScrollMixin');

// Replace this with your real tests.
test('it works', function (assert) {
	let ResetScrollObject = Ember.Object.extend(ResetScrollMixin);
	let subject = ResetScrollObject.create();
	assert.ok(subject);
});
