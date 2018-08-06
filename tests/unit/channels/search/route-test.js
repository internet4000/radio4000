import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | channels/search', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:channels/search')
		assert.ok(route)
	})
})
