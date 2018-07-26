import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | channels/map', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:channels/map')
		assert.ok(route)
	})
})
