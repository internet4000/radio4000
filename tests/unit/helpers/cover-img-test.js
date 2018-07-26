import {coverImg} from 'radio4000/helpers/cover-img'
import {module, test} from 'qunit'

module('Unit | Helper | cover img', function() {
	test('it works', function(assert) {
		// {{cover-img src size=250}}
		const result = coverImg(['somestringid'], {size: 250})
		assert.equal(typeof result, 'string')
	})
})
