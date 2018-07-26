import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | x aside', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		assert.expect(1)

		// Set any properties with this.set('myProperty', 'value');
		// Handle any actions with this.on('myAction', function(val) { ... });

		await render(hbs`{{aside-left}}`)
		assert.ok(this.$('a').length > 0)

		// @todo make sure the click handler runs
		// this.$('a').eq(0).click();
	})
})
