import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | tracks list', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders with items and sorting works', async function(assert) {
		assert.expect(1)

		this.set('items', [
			{title: 'Michael', created: 1},
			{title: 'Jackson', created: 2}
		])

		await render(hbs`
          {{#tracks-list items=items as |item|}}
              <h2>{{item.title}}</h2>
          {{/tracks-list}}
      `)

		// console.log(this.$().html());
		assert.equal(
			this.$()
				.find('h2:first')
				.text()
				.trim(),
			'Jackson',
			'it renders newest item on top'
		)
	})
})
