import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | cloudinary upload', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		await render(hbs`{{cloudinary-upload}}`)
		assert.equal(this.$('input[type="file"]').length, 1)
		assert.ok(this.$('button').length > 0)
	})
})
