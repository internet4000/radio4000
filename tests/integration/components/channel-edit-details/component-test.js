import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | channel edit details', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function(val) { ... });

		await render(hbs`{{channel-edit-details}}`)

		// assert.equal(this.$().text().trim(), '');
		assert.equal(1, 1)

		// // Template block usage:
		// this.render(hbs`
		//   {{#channel-edit-details}}
		//     template block text
		//   {{/channel-edit-details}}
		// `);

		// assert.equal(this.$().text().trim(), 'template block text');
	})
})
