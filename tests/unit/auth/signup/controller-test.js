import Ember from 'ember'
import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Controller | auth/signup', function(hooks) {
	setupTest(hooks)

	// Replace this with your real tests.
	test('it exists', function(assert) {
		this.owner.register('service:firebaseApp', Ember.Service.extend())
		let controller = this.owner.lookup('controller:auth/signup')
		assert.ok(controller)
	})
})
