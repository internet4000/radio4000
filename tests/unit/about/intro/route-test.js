import Service from '@ember/service';
import { moduleFor, test } from 'ember-qunit';

moduleFor('route:about/intro', 'Unit | Route | about/intro', {
	// Specify the other units that are required for this test.
	// needs: ['service:session']
});

test('it exists', function (assert) {
	this.register('service:session', Service.extend());
	this.register('service:uiStates', Service.extend());
	var route = this.subject();
	assert.ok(route);
});
