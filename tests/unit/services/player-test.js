import Ember from 'ember';
import {moduleFor, test} from 'ember-qunit';

moduleFor('service:player', {
	// Specify the other units that are required for this test.
	// needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
	this.register('service:playerRandom', Ember.Service.extend());
	this.register('service:session', Ember.Service.extend());
	var service = this.subject();
	assert.ok(service);
});
