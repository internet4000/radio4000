import {module, test} from 'qunit'
import {visit, currentURL, fillIn, click, waitFor} from '@ember/test-helpers'
import {setupApplicationTest} from 'ember-qunit'

module('Acceptance | autocomplete', function(hooks) {
	setupApplicationTest(hooks)

	test('search autocomplete redirects to a channel', async function(assert) {
		await visit('/about/contact')
		assert.equal(currentURL(), '/about/contact')
		assert.dom('.aa-input').exists()
		await fillIn('.aa-input', 'Radio Oskar')
		assert.dom('.aa-input').hasValue('Radio Oskar')
		await waitFor('.aa-suggestion')
		await click('.aa-suggestion')
		assert.equal(currentURL(), '/oskar')
	})
})
