import Ember from 'ember'
import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | x playback', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		this.owner.register('service:session', Ember.Service.extend())
		await render(hbs`{{x-playback}}`)
		assert.equal(this.$('radio4000-player').length, 1)
	})
})
