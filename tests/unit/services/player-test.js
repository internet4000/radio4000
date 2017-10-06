import Service from '@ember/service';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:player', {
	// Specify the other units that are required for this test.
	// needs: ['service:foo']
});

// Replace this with your real tests.
test('it exists', function (assert) {
	this.register('service:playerRandom', Service.extend());
	this.register('service:session', Service.extend());
	var service = this.subject();
	assert.ok(service);
});
