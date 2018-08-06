import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import Service from '@ember/service'

const sessionStub = Service.extend({})

module('Integration | Component | track form add', function(hooks) {
	setupRenderingTest(hooks)

	hooks.beforeEach(function() {
		this.owner.register('service:session', sessionStub)
		// Calling inject puts the service instance in the context of the test,
		// making it accessible as "locationService" within each test
		this.sessionService = this.owner.lookup('service:session')
	})

	test('it renders', async function(assert) {
		await render(hbs`{{track-form-add}}`)
		assert.ok(this.$('.Form-group').length)
		assert.ok(this.$('button[type="submit"]').length)
	})
})
