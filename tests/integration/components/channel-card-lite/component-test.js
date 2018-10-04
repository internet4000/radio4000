import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
// import {render} from '@ember/test-helpers'
// import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | channel-card-lite', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		assert.ok(true)
		// await render(hbs`{{channel-card-lite channel=channel}}`)
		// assert.equal(this.element.textContent.trim(), '');

		// // Template block usage:
		// await render(hbs`
		//   {{#channel-card-lite}}
		//     template block text
		//   {{/channel-card-lite}}
		// `);

		// assert.equal(this.element.textContent.trim(), 'template block text');
	})
})
