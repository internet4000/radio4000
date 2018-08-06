import reservedUrls from 'radio4000/utils/reserved-urls'
import {module, test} from 'qunit'

module('Unit | Utility | reserved urls', function() {
	test('it works', function(assert) {
		assert.ok(reservedUrls.length > 1)
		assert.ok(reservedUrls.includes('blog'))
		assert.ok(reservedUrls.includes('help'))
		assert.ok(reservedUrls.includes('bookmarklet'))
		assert.ok(reservedUrls.includes('intro'))
	})
})
