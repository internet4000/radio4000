export function initialize(/*container, application*/) {
	// application.inject('route', 'foo', 'service:foo');

	// Loads the iframe player API asynchronously from YouTube
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstTag = document.getElementsByTagName('script')[0];
	firstTag.parentNode.insertBefore(tag, firstTag);

	// This get's called automatically by the API
	window.onYouTubePlayerAPIReady = function() {
		console.log('yt api ready');
	};
}

export default {
	name: 'youtube',
	after: 'session',
	initialize: initialize
};
