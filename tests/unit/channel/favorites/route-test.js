import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | channel/favorites', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:channel/favorites')
		assert.ok(route)
	})
})
