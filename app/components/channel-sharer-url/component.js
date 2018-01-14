import Ember from 'ember'

const { Component, computed, get } = Ember

// Render an input to share the channel url OR the embed code.

export default Component.extend({
	// slug: '',
	// showEmbed: false,

	permalink: computed('slug', function () {
		return `https://radio4000.com/${get(this, 'slug')}`
	}),
	embedCode: computed('slug', function () {
		return `<iframe src="https://api.radio4000.com/embed?slug=${get(this, 'slug')}" width="320" height="500" frameborder="0"></iframe>`
	}),

	url: computed('slug', 'showEmbed', function() {
		if (get(this, 'showEmbed')) {
			return get(this, 'embedCode')
		}
		return get(this, 'permalink')
	})
})
