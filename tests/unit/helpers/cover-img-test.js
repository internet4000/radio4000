import {coverImg} from 'radio4000/helpers/cover-img'
import {module, test} from 'qunit'

module('Unit | Helper | cover img', function() {
	test('it works', function(assert) {
		// {{cover-img src size=250}}
		const result = coverImg(['somestringid'], {size: 250})
		assert.equal(typeof result, 'string')
		assert.ok(result.indexOf('w_250') !== -1)
		assert.ok(result.indexOf('h_250') !== -1)
	})

	test('it supports changing format', function(assert) {
		const result = coverImg(['abc123'], {format: 'jpg'})
		assert.ok(result.indexOf('.jpg') !== -1)
	})

	test('animated webp format includes fl_webap', function(assert) {
		const result = coverImg(['abc123'], {format: 'awebp'})
		assert.ok(result.indexOf('fl_awebp') !== -1)
	})
})
