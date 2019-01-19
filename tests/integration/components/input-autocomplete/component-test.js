import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | input-autocomplete', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		await render(hbs`{{input-autocomplete}}`)
		assert.ok(this.element.querySelector('.aa-container'), 'has required class')
		assert.ok(this.element.querySelector('input'), 'has an input')
	})
})
