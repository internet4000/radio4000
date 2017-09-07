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

	channelFullUrl: computed('slug', function() {
		return 'https://radio4000.com/' + get(this, 'slug')
	}),

	buildUrl: computed('channelFullUrl', function() {
		const channelFullUrl = get(this, 'channelFullUrl');
		const iframe = get(this, 'iframe');
		const iframeApiUrl = get(this, 'iframeApiUrl');
		const slug = get(this, 'slug');

		if(iframe) {
			return `<iframe width="320" height="400" src="${iframeApiUrl}?slug=${slug}" frameborder="0"></iframe>`
		}
		return channelFullUrl
	})
});
