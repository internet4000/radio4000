import Ember from 'ember'

const { Component, computed, get } = Ember

// Render an input to share the channel url OR the embed code.

export default Component.extend({
	// slug: '',
	// showEmbed: false,
	// showIcon: false,

	permalink: computed('slug', function () {
		return `https://radio4000.com/${get(this, 'slug')}`
	}),
	embedCode: computed('slug', function () {
		return `<iframe src="https://api.radio4000.com/embed?slug=${get(this, 'slug')}" width="320" height="500" frameborder="0"></iframe>`
	}),
	iconUrl: computed('slug', function () {
		const slug = get(this, 'slug')
		return `<a href="https://radio4000.com/${slug}"><img width="30" src="https://assets.radio4000.com/icon-r4.svg" alt="${slug}@r4"></a>`
	}),

	url: computed('slug', 'showEmbed', function() {
		if (get(this, 'showEmbed')) {
			return get(this, 'embedCode')
		}
		if (get(this, 'showIcon')) {
			return get(this, 'iconUrl')
		}
		return get(this, 'permalink')
	})
})
