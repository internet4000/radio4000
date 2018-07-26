import Ember from 'ember'
import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | track contextual', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		this.owner.register('service:session', Ember.Service.extend())
		await render(hbs`{{track-contextual}}`)
		assert.ok(this.$().find('button').length > 0)
		assert.ok(this.$().find('select').length > 0)
	})
})
