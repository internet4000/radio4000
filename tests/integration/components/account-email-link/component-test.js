import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | account email link', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		await render(hbs`{{account-email-link}}`)
		assert.equal(
			this.$()
				.text()
				.trim(),
			'Add'
		)
	})
})
