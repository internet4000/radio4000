import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | about/contact', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		let route = this.owner.lookup('route:about/contact')
		assert.ok(route)
	})
})
