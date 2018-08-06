import Ember from 'ember'
import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Route | about/intro', function(hooks) {
	setupTest(hooks)

	test('it exists', function(assert) {
		this.owner.register('service:session', Ember.Service.extend())
		this.owner.register('service:uiStates', Ember.Service.extend())
		var route = this.owner.lookup('route:about/intro')
		assert.ok(route)
	})
})
