import Ember from 'ember';
import EmberValidations, {validator} from 'ember-validations';
import youtubeRegex from 'npm:youtube-regex';
import config from 'radio4000/config/environment';

const {Component, debug, get, set, on, observer, run} = Ember;

export default Component.extend(EmberValidations, {
	tagName: 'form',
	classNames: ['Form'],
	classNameBindings: ['box:Form--box'],
	showErrors: false,
	newUrl: '',
	isIdle: true,

	validations: {
		'track.url': {
			// format: {
			// 	with: youtubeRegex()
			// }
			inline: validator(function () {
				const isValid = Boolean(youtubeRegex().exec(get(this, 'track.url')));
				if (!isValid) {
					return 'Please enter a valid YouTube URL';
				}
			})
		},
		'track.title': {
			presence: true,
			length: {maximum: 256}
		},
		'track.body': {
			length: {maximum: 300}
		}
	},

	getYoutubeId(urlstring) {
		const isValid = youtubeRegex().exec(urlstring);
		if (!isValid) {
			return false;
		}
		return isValid[1];
	},

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	automaticSetTitle: on('init', observer('track.url', function () {
		const url = get(this, 'track.url');
		const ytid = this.getYoutubeId(url);
		if (!ytid) {
			// debug('no ytid');
			return;
		}
		if (!Ember.isEmpty(get(this, 'track.title'))) {
			// debug('The track title is not empty so we are not updating it');
			return;
		}
		set(this, 'youtubeId', ytid);
		// call setTitle but throttle it so it doesn't happen on every key-stroke
		run.throttle(this, this.setTitle, 1000);
	})),

	setTitle() {
		const id = get(this, 'youtubeId');
		const endpoint = `https://www.googleapis.com/youtube/v3/videos?
			id=${id}
			&key=${config.youtubeApiKey}
			&fields=items(id,snippet(title))
			&part=snippet`;

		// Use cache if we have it
		if (get(this, 'cachedId') === id) {
			debug('Setting cached title');
			this.set('track.title', get(this, 'cachedTitle'));
			return;
		}

		this.set('isFetchingTitle', true);

		Ember.$.getJSON(endpoint).then(response => {
			this.set('isFetchingTitle', false);

			if (!response.items.length) {
				debug('Could not find a title');
				return;
			}

			const title = response.items[0].snippet.title;
			this.set('track.title', title);

			// cache our title and ID so we don't request the same video twice
			this.set('cachedTitle', title);
			this.set('cachedId', id);
		});
	},

	actions: {
		submit() {
			set(this, 'isIdle', false);
			this.validate().then(() => {
				const trackProps = get(this, 'track');
				get(this, 'onSubmit')(trackProps).then(() => {
					// Reset all properties so we can create another track.
					this.setProperties({
						isIdle: true,
						newUrl: '',
						track: {}
					});
				});
			}).catch(err => {
				debug(err);
				set(this, 'showErrors', true);
			});
		},
		cancel() {
			this.get('onCancel')();
		}
	}
});
