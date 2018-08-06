import {timeAgo} from 'radio4000/helpers/time-ago'
import {module, test} from 'qunit'

module('Unit | Helper | time ago', function() {
	test('it works', function(assert) {
		let result = timeAgo([1481022124443])
		assert.ok(typeof result === 'string', 'it is a string')
		assert.ok(result.indexOf(' ago') > -1, 'it contains the word "ago"')
	})
})
