import {module, test} from 'qunit'
import {visit, currentURL} from '@ember/test-helpers'
import {setupApplicationTest} from 'ember-qunit'

module('Acceptance | settings', function(hooks) {
	setupApplicationTest(hooks)

	test('visiting /settings without auth redirects to login', async function(assert) {
		await visit('/settings')

		assert.equal(currentURL(), '/auth/login')
	})
})
