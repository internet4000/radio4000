import Ember from 'ember';
import {moduleFor, test} from 'ember-qunit';

moduleFor('controller:auth/signup', 'Unit | Controller | auth/signup', {
	// Specify the other units that are required for this test.
	// needs: ['controller:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
	this.register('service:firebaseApp', Ember.Service.extend());
	let controller = this.subject();
	assert.ok(controller);
});
