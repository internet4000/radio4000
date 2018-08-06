import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('controller:channel/index', function(hooks) {
	setupTest(hooks)

	// Replace this with your real tests.
	test('it exists', function(assert) {
		let controller = this.owner.lookup('controller:channel/index')
		assert.ok(controller)
	})
})
