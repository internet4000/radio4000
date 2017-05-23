import Ember from 'ember';
import {moduleFor, test} from 'ember-qunit';

moduleFor('service:player-random', 'Unit | Service | player random', {
	// Specify the other units that are required for this test.
	// needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
	this.register('service:player', Ember.Service.extend());
	this.register('service:playerHistory', Ember.Service.extend());
	var service = this.subject();
	assert.ok(service);
});
