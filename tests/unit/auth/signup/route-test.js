import Ember from 'ember'
import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | auth/signup', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		this.owner.register('service:firebaseApp', Ember.Service.extend())
		this.owner.register('service:flashMessages', Ember.Service.extend())
		let route = this.owner.lookup('route:auth/signup')
		assert.ok(route)
	})
})
