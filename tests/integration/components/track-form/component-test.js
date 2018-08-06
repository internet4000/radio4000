import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | track form', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		assert.expect(2)

		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function(val) { ... });

		await render(hbs`{{track-form}}`)

		assert.equal(
			this.$()
				.text()
				.trim(),
			''
		)

		// Template block usage:
		await render(hbs`
          {{#track-form}}
              template block text
          {{/track-form}}
      `)

		assert.equal(
			this.$()
				.text()
				.trim(),
			'template block text'
		)
	})
})
