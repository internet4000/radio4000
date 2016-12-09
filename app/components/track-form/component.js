import Ember from 'ember';
import config from 'radio4000/config/environment';
import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';
import {task, timeout} from 'ember-concurrency';

const {Component, debug, get, on, observer} = Ember;

export default Component.extend({
	tagName: 'form',
	classNames: ['Form'],
	classNameBindings: ['box:Form--box'],

	// This is not the "track model", but an ordinary object.
	track: null,
	initialUrl: '',

	// This gets called when you paste something into the input-url component
	// it takes a URL and turns it into a YouTube ID which we use to query the API for a title
	automaticSetTitle: on('init', observer('track.url', function () {
		const track = get(this, 'track');

		// Can not continue without a track or URL.
		if (!track || !track.get('url')) {
			return;
		}

		// Because the URL might have changed
		const newid = youtubeUrlToId(track.get('url'));
		if (newid) {
			track.set('ytid', newid);
		}

		get(this, 'fetchTitle').perform();
	})),

	fetchTitle: task(function * () {
		const track = get(this, 'track');
		const ytid = track.get('ytid');
		const endpoint = `https://www.googleapis.com/youtube/v3/videos?
			id=${ytid}
			&key=${config.youtubeApiKey}
			&fields=items(id,snippet(title))
			&part=snippet`;

		yield timeout(1000);

		// Fetch and set it
		const promise = Ember.$.getJSON(endpoint);
		const response = yield promise;
		if (!response.items.length) {
			debug('Could not find a title');
			return;
		}
		const title = response.items[0].snippet.title;
		track.set('title', title);
	}).restartable(),

	actions: {
		submit() {
			const trackProps = get(this, 'track');
			get(this, 'onSubmit')(trackProps).then(() => {
				console.log('done submitting');
				// Reset all properties so we can create another track.
				this.set('initialUrl', null);
				this.setProperties(trackProps, {
					url: null,
					title: null,
					body: null,
					ytid: null
				});
				this.$('input[type="url"]').focus();
			});
		},
		cancel() {
			this.get('onCancel')();
		}
	}
});
