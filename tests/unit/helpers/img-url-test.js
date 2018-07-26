import {imgUrl} from 'radio4000/helpers/img-url'
import {module, test} from 'qunit'

module('Unit | Helper | img url', function() {
	// Replace this with your real tests.
	test('it works', function(assert) {
		let result = imgUrl('someCloudinaryImageIdString')
		assert.equal(typeof result, 'string')
	})

	// {{img-url src w="250" h="250" transforms="c_thumb,c_fill,fl_lossy"}}
})
