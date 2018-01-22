import {linkHashtags} from 'radio4000/helpers/link-hashtags'
import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('link-hashtags', 'helper:link-hashtags', {
	integration: true
})

test('without slug it returns original string', function(assert) {
	this.set('inputValue', '1234 #cool')
	this.render(hbs`{{link-hashtags inputValue}}`)

	assert.equal(this.$().text().trim(), '1234 #cool')
})

test('with slug it transforms hashtags to links', function(assert) {
	const result = linkHashtags(['1234 #cool', '200ok'])
	assert.equal(result.string, '1234 <a href="200ok/tracks?search=%23cool">#cool</a>')
})
