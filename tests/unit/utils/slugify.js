import slugify from 'radio4000/utils/slugify'

import {module, test} from 'qunit'

module('slugify', function() {
	test('it slugifies a string', function(assert) {
		let string = '&$#! S??omething// With UPPERCASE and SPACES and CH#$@#%(*!'
		let result = slugify(string)

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
