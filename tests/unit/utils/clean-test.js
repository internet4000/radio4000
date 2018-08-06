import clean from 'radio4000/utils/clean'

import {module, test} from 'qunit'

module('clean', function() {
	test('it works', function(assert) {
		let string = '&$#! S??omething// With UPPERCASE and SPACES and CH#$@#%(*!'
		let result = clean(string)

		assert.ok(result.indexOf('<') < 1, 'String can not contain HTML tags.')
		assert.ok(result.indexOf('<') < 1, 'String can not contain HTML tags.')
		assert.ok(result.indexOf('/') < 1, 'String can not contain HTML tags.')
		assert.ok(result.indexOf('\\') < 1, 'String can not contain HTML tags.')
		assert.ok(result.indexOf(' ') < 1, 'String can not contain spaces.')
		assert.ok(result.indexOf('/') < 1, 'String can not contain a slash.')
		assert.ok(
			result.indexOf('?') < 1,
			'String can not contain a question mark.'
		)
	})
})
