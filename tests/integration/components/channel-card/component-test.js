import Ember from 'ember'
import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | channel card', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders a title', async function(assert) {
		this.owner.register('service:session', Ember.Service.extend())
		this.set('model', {title: 'It works!'})
		await render(hbs`{{channel-card channel=model}}`)
		assert.equal(
			this.$('h3')
				.text()
				.trim(),
			'It works!'
		)
	})
})
