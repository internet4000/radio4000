import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Service | ui states', function(hooks) {
	setupTest(hooks)

	// Replace this with your real tests.
	test('it exists', function(assert) {
		var service = this.owner.lookup('service:ui-states')
		assert.ok(service)
	})
})
