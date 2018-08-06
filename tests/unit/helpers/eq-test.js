import {eq} from 'radio4000/helpers/eq'
import {module, test} from 'qunit'

module('Unit | Helper | eq', function() {
	test('it works', function(assert) {
		let result = eq([42, 42])
		assert.ok(result)

		result = eq(['a', 'b'])
		assert.notOk(result)
	})
})
