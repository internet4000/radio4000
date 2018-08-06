import Ember from 'ember'
import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('service:player', function(hooks) {
	setupTest(hooks)

	// Replace this with your real tests.
	test('it exists', function(assert) {
		this.owner.register('service:playerRandom', Ember.Service.extend())
		this.owner.register('service:session', Ember.Service.extend())
		var service = this.owner.lookup('service:player')
		assert.ok(service)
	})
})
