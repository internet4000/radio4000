import Ember from 'ember'
import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | channel/play/random', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		this.owner.register('service:player', Ember.Service.extend())
		let route = this.owner.lookup('route:channel/play/random')
		assert.ok(route)
	})
})
