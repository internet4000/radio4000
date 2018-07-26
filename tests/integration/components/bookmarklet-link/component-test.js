import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | bookmarklet link', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		// assert.expect(1);
		await render(hbs`{{bookmarklet-link}}`)
		assert.ok(this.$().find('a').length)
	})
})
