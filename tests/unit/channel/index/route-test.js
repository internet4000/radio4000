import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('route:channel/index', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:channel/index')
		assert.ok(route)
	})
})
