import Ember from 'ember';
import config from 'radio4000/config/environment';
import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';
import {task, timeout} from 'ember-concurrency';

const {Component, debug, get, set, on, observer} = Ember;

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

		// Don't overwrite already existing titles
		if (track.get('title')) {
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
		yield timeout(250); // throttle
		const track = get(this, 'track');
		const ytid = track.get('ytid');
		const url = `https://www.googleapis.com/youtube/v3/videos?id=${ytid}&key=${config.youtubeApiKey}&fields=items(id,snippet(title))&part=snippet`;
		const response = yield fetch(url);
		const data = yield response.json()
		if (!data.items.length) {
			debug('Could not find title for track');
			return;
		}
		const title = data.items[0].snippet.title;
		track.set('title', title);
	}).restartable(),

	submitTask: task(function * () {
		const track = get(this, 'track');
		const action = get(this, 'onSubmit')(track);
		yield action;
		this.resetForm();
	}),

	// Reset all properties so we can create another track.
	resetForm() {
		set(this, 'initialUrl', null);
		let input = this.$('input[type="url"]');
		if (input) {
			input.focus();
		}
	},

	actions: {
		submit() {
			get(this, 'submitTask').perform();
		},
		cancel() {
			get(this, 'onCancel')();
		}
	}
});

