import {module, test} from 'qunit'
import {setupRenderingTest} from 'ember-qunit'
import {render} from '@ember/test-helpers'
import hbs from 'htmlbars-inline-precompile'

module('Integration | Component | aside channels', function(hooks) {
	setupRenderingTest(hooks)

	test('it renders', async function(assert) {
		// we have no tests....
		await render(hbs`{{aside-channels}}`)
		assert.equal(1, 1)
	})
})
