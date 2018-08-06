import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'
import Ember from 'ember'

module('Integration | Component | play random channel', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		this.owner.register('service:session', Ember.Service.extend())
		await render(hbs`{{play-random-channel}}`)
		assert.equal(1, 1)
	})
})
