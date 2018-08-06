import Ember from 'ember'
import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | app root', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		this.owner.register('service:session', Ember.Service.extend())

		// assert.expect(2);
		await render(hbs`{{app-root}}`)
		assert.ok(true)
	})
})
