import {linkHashtags} from 'radio4000/helpers/link-hashtags'
import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('helper:link-hashtags', function(hooks) {
	setupRenderingTest(hooks)

	test('without slug it returns original string', async function(assert) {
		this.set('inputValue', '1234 #cool')
		await render(hbs`{{link-hashtags inputValue}}`)

		assert.equal(
			this.$()
				.text()
				.trim(),
			'1234 #cool'
		)
	})

	test('with slug it transforms hashtags to links', function(assert) {
		const result = linkHashtags(['1234 #cool', '200ok'])
		assert.equal(
			result.string,
			'1234 <a href="/200ok/tracks?search=%23cool">#cool</a>'
		)
	})
})
