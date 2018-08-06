import Ember from 'ember'
import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | auth', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		this.owner.register('service:session', Ember.Service.extend())
		this.owner.register('service:flashMessages', Ember.Service.extend())
		let route = this.owner.lookup('route:auth')
		assert.ok(route)
	})
})
