import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | channels/index', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		var route = this.owner.lookup('route:channels/index')
		assert.ok(route)
	})
})
