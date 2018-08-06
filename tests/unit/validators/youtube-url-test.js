import {module, test} from 'qunit'
import {setupTest} from 'ember-qunit'

module('Unit | Validator | youtube-url', function(hooks) {
	setupTest(hooks)

	test('it works', function(assert) {
		assert.expect(1)
		const validator = this.owner.lookup('validator:youtube-url')
		const isvalid = validator.validate(
			'https://www.youtube.com/watch?v=-Op4D4bkK6Y'
		)
		assert.equal(isvalid, true)
	})
})
