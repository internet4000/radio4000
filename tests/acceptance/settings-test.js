import {test} from 'qunit'
import moduleForAcceptance from 'radio4000/tests/helpers/module-for-acceptance'

moduleForAcceptance('Acceptance | settings')

test('visiting /settings without auth redirects to login', function(assert) {
	visit('/settings')

	andThen(function() {
		assert.equal(currentURL(), '/auth/login')
	})
})
