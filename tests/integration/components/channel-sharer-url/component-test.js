import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | channel sharer url', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		await render(hbs`
      {{channel-sharer-url
          showEmbed=showEmbed
          slug="my-radio"
      }}
    `)
		assert.equal(
			this.$('input').val(),
			'https://radio4000.com/my-radio',
			'by default it shows the Radio4000 URL'
		)
		this.set('showEmbed', true)
		assert.equal(
			this.$('input').val(),
			'<iframe src="https://api.radio4000.com/embed?slug=my-radio" width="320" height="500" frameborder="0"></iframe>',
			'it can switch to show iframe/embed code'
		)

		// Template block usage:
		await render(hbs`
      {{#channel-sharer-url}}
        template block text
      {{/channel-sharer-url}}
    `)
		assert.equal(
			this.$('label')
				.text()
				.trim(),
			'template block text',
			'you can pass in a label'
		)
	})
})
