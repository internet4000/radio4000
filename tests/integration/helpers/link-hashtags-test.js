import { moduleForComponent, test } from 'ember-qunit'
import hbs from 'htmlbars-inline-precompile'

moduleForComponent('link-hashtags', 'helper:link-hashtags', {
	integration: true
})

test('without slug it just returns the original string', function(assert) {
	this.set('inputValue', '1234 #cool')
	this.render(hbs`{{link-hashtags inputValue}}`)

	assert.equal(this.$().text().trim(), '1234 #cool')
})

test('with a slug it transforms hashtags to links', function(assert) {
	this.set('inputValue', 'hey #cool right')
	this.set('slugValue', '200ok')
	this.render(hbs`{{link-hashtags inputValue slugValue}}`)

	assert.equal(this.$().text().trim(), 'hey <a href="/200ok/tracks?search=%23cool">#cool</a> right')
})

