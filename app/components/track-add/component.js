import Ember from 'ember';
import config from '../../config/environment';
import youtube from 'radio4000/utils/youtube';
import EmberValidations from 'ember-validations';

const {debug, Component, observer, on, run, warn} = Ember;

export default Component.extend(EmberValidations, {
	box: false,

	// validations
	// TODO make this a mixin with track.edit
	showErrors: false,
	validations: {
		url: {
			presence: true,
			// TODO make a check for utube URL regex
			length: {
				// http://you.be
				minimum: 13
			}
		},
		title: {
			presence: true,
			length: {
				// http://dougscripts.com/itunes/itinfo/id3tags00.php
				// artist + songTitle
				maximum: 60
			}
		},
		body: {
			length: {
				maximum: 300
			}
		}
	},

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	automaticSetTitle: on('init', observer('url', function () {
		let url = this.get('url');

		if (!url) {
			warn('No URL to find a YT ID: ' + url);
			return false;
		}

		let id = youtube(url);

		if (!id) {
			// TODO make this warn become part of the validation error messages
			warn('Could not detect a YouTube ID from this URL: ' + url);
			return false;
		}

		// call set title but throttle it so it doesn't happen on every key-stroke
		this.set('youtubeId', id);
		run.throttle(this, this.setTitle, 1000);
	})),

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	setTitle() {
		// TODO make this a service?
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
			// first validate the track object
			this.validate().then(() => {
				debug('Track validates!');
				// we let the route decide which model to use
				let trackObject = {
					url: this.get('url'),
					title: this.get('title'),
					body: this.get('body')
				};
				this.sendAction('submit', trackObject);
			}).catch(() => {
				this.set('showErrors', true);
				debug('Track does not validate…');
				return;
			});
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
