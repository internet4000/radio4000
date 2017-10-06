import Service from '@ember/service';
import { moduleFor, test } from 'ember-qunit';

moduleFor('route:auth/settings', 'Unit | Route | auth/settings', {
	// Specify the other units that are required for this test.
	// needs: ['controller:foo']
});

test('it exists', function (assert) {
	this.register('service:firebaseApp', Service.extend());
	let route = this.subject();
	assert.ok(route);
});
