import Ember from 'ember';
import config from '../../config/environment';
import youtube from 'radio4000/utils/youtube';

const {debug, computed, observer} = Ember;

export default Ember.Component.extend({
	box: false,

	// Check if the track is valid before saving
	isValid: computed('url', 'title', function () {
		return this.get('url') && this.get('title');
	}),

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	automaticSetTitle: Ember.on('init', observer('url', function () {
		let url = this.get('url');

		if (!url) {
			Ember.warn('No URL to find a YT ID: ' + url);
			return false;
		}

		let id = youtube(url);

		if (!id) {
			Ember.warn('Could not detect a YouTube ID from this URL: ' + url);
			return false;
		}

		// call set title but throttle it so it doesn't happen on every key-stroke
		this.set('youtubeId', id);
		Ember.run.throttle(this, this.setTitle, 1000);
	})),

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	setTitle() {
		let id = this.get('youtubeId');
		let endpoint = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${config.youtubeApiKey}&fields=items(id,snippet(title))&part=snippet`;
		debug('setTitle');

		// Use cache if we have it
		if (this.get('cachedId') === id) {
			debug('Setting cached title');
			return this.set('title', this.get('cachedTitle'));
		}

		this.set('isFetchingTitle', true);

		Ember.$.getJSON(endpoint).then(response => {
			this.set('isFetchingTitle', false);

			if (!response.items.length) {
				debug('Could not find a title');
				return false;
			}

			let title = response.items[0].snippet.title;

			debug('Setting title to: ' + title);
			this.set('title', title);

			// cache our title and ID so we don't request the same video twice
			this.set('cachedTitle', title);
			this.set('cachedId', id);
		});
	},

	actions: {
		submit() {
			if (!this.get('isValid')) {
				Ember.debug('not valid');
				return;
			}

			// we let the route decide which model to use
			let trackObject = {
				url: this.get('url'),
				title: this.get('title'),
				body: this.get('body')
			};

			this.sendAction('submit', trackObject);
		},
		cancel() {
			this.sendAction('cancel');
		}
	}
});

// @todo save this, DONT DELETE THIS!
// this get's called from our youtube-search component
// addFromSearch(item) {
// 	let title = item.get('title');
// 	let url = item.get('url');
//
// 	// clean the url
// 	url = url.replace('&feature=youtube_gdata_player', '');
//
// 	// update current model with properties from the chosen search
// 	this.set('title', title);
// 	this.set('url', url);
// }
