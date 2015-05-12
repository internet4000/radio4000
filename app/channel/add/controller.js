import config from '../../config/environment';
import Ember from 'ember';
import youtube from 'radio4000/utils/youtube';

export default Ember.Controller.extend({
	queryParams: ['url'],

	// proxy for model.url
	url: null,

	// bookmarklet
	// http://guides.emberjs.com/v1.10.0/routing/query-params/#toc_map-a-controller-s-property-to-a-different-query-param-key
	bookmarklet: Ember.computed('session.currentUser.channels.firstObject', function() {
		let slug = this.get('session.currentUser.channels.firstObject.slug');
		return `javascript:(function() {
						location.href='
							http://localhost:4000/c/${slug}/add
							?url=' + encodeURIComponent(location.href) +
								'&title=' + encodeURIComponent(document.title)
					;})();`;
	}),

	// Check if the track is valid before saving
	isValid: Ember.computed('model.url', 'model.title', function() {
		if (this.get('model.url') && this.get('model.title')) {
			return true;
		} else {
			return false;
		}
	}),

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	urlChanged: Ember.observer('url', function() {
		let url = this.get('url');
		let id = youtube(url);

		if (!id) {
			Ember.warn('Could not detect a YouTube ID from this URL: ' + url);
			return false;
		}

		// call set title but throttle it so it doesn't happen on every key-stroke
		this.set('youtubeId', id);
		Ember.run.throttle(this, this.setTitle, 1000);
	}),

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	setTitle() {
		let id = this.get('youtubeId');
		let endpoint = 'https://www.googleapis.com/youtube/v3/videos?id='+id+'&key='+config.youtubeApiKey+'&fields=items(id,snippet(title))&part=snippet';
		Ember.debug('setTitle');

		// Use cache if we have it
		if (this.get('cachedId') === id) {
			// Ember.debug('Setting cached title');
			return this.set('model.title', this.get('cachedTitle'));
		}

		this.set('isFetchingTitle', true);

		Ember.$.getJSON(endpoint).then((response) => {
			this.set('isFetchingTitle', false);

			if (!response.items.length) {
				// Ember.debug('Could not find a title');
				return false;
			}

			let title = response.items[0].snippet.title;

			// Ember.debug('Setting title to: ' + title);
			this.set('model.title', title);

			// cache our title and ID so we don't request the same video twice
			this.set('cachedTitle', title);
			this.set('cachedId', id);
		});
	},

	actions: {

		// this get's called from our youtube-search component
		addFromSearch(item) {
			let title = item.get('title');
			let url = item.get('url');

			// clean the url
			url = url.replace('&feature=youtube_gdata_player', '');

			// update current model with properties from the chosen search
			this.set('model.title', title);
			this.set('url', url);
		},

		addTrack() {
			// now we take the proxy url and use it
			this.set('model.url', this.get('url'));

			if (!this.get('isValid')) { return false; }

			// reset the query param
			this.set('url', '');

			// leave it to the router to actually save the track
			this.send('saveTrack');
		},

		// used by 'ESC' key in the view
		cancelEdit() {
			this.transitionToRoute('channel.index', this.get('session.currentUser.channels.firstObject'));
		}
	}
});
