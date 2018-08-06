import Ember from 'ember'
import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | user signup', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		this.owner.register('service:session', Ember.Service.extend())
		// no real tests yet
		await render(hbs`{{user-login}}`)
		assert.equal(1, 1)
	})
})
