import Ember from 'ember';
import {moduleFor, test} from 'ember-qunit';

moduleFor('route:about/intro', 'Unit | Route | about/intro', {
	// Specify the other units that are required for this test.
	// needs: ['service:session']
});

test('it exists', function (assert) {
	this.register('service:session', Ember.Service.extend());
	this.register('service:uiStates', Ember.Service.extend());
	var route = this.subject();
	assert.ok(route);
});
