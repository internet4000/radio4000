import Service from '@ember/service';
import { moduleFor, test } from 'ember-qunit';

moduleFor('route:auth', 'Unit | Route | auth', {
	// Specify the other units that are required for this test.
	// needs: ['controller:foo']
});

test('it exists', function (assert) {
	this.register('service:session', Service.extend());
	this.register('service:flashMessages', Service.extend());
	let route = this.subject();
	assert.ok(route);
});
