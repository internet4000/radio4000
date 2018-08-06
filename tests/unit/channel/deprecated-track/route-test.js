import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | channel/deprecated track', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:channel/deprecated-track')
		assert.ok(route)
	})
})
