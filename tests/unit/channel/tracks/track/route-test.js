import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | channel/tracks/track', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:channel/tracks/track')
		assert.ok(route)
	})
})
