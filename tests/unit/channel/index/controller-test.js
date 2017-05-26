import {moduleFor, test} from 'ember-qunit';

moduleFor('controller:channel/index', {
	// Specify the other units that are required for this test.
	needs: ['controller:application', 'controller:channel']
});

// Replace this with your real tests.
test('it exists', function (assert) {
	let controller = this.subject();
	assert.ok(controller);
});
