import Ember from 'ember';
import {moduleFor, test} from 'ember-qunit';

moduleFor('controller:auth/settings', 'Unit | Controller | auth/settings', {
	// Specify the other units that are required for this test.
	// needs: ['service:firebaseApp']
});

// Replace this with your real tests.
test('it exists', function (assert) {
	this.register('service:firebaseApp', Ember.Service.extend());
	this.register('service:flashMessages', Ember.Service.extend());
	let controller = this.subject();
	assert.ok(controller);
});
