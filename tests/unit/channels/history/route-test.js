import Ember from 'ember';
import {moduleFor, test} from 'ember-qunit';

moduleFor('route:channels/history', 'Unit | Route | channels/history', {
	// Specify the other units that are required for this test.
	// needs: ['controller:foo']
});

test('it exists', function (assert) {
	this.register('service:playerHistory', Ember.Service.extend());
	var route = this.subject();
	assert.ok(route);
});
