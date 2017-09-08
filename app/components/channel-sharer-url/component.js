import Ember from 'ember';

const {Component, computed, get} = Ember;

export default Component.extend({
	// props
	channel: null,
	iframe: false,

	// const
	iframeApiUrl: 'https://api.radio4000.com/iframe',

	// logic
	slug: computed.reads('channel.slug'),

	channelUrl: computed('slug', function() {
		return 'https://radio4000.com/' + get(this, 'slug')
	}),

	buildUrl: computed('slug', function() {
		const channelUrl = get(this, 'channelUrl');
		const iframe = get(this, 'iframe');
		const apiUrl = get(this, 'buildApiUrl');

		if (iframe) {
			return `<iframe src="${apiUrl}" width="320" height="400" frameborder="0"></iframe>`
		}
		return channelUrl
	}),
	buildApiUrl: computed('slug', function() {
		const iframeApiUrl = get(this, 'iframeApiUrl');
		const slug = get(this, 'slug');
		return `${iframeApiUrl}?slug=${slug}`;
	})
});
