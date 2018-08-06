import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | styleguide/colors', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:styleguide/colors')
		assert.ok(route)
	})
})
