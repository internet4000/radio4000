import Ember from 'ember';
import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';
import {fetchTitle} from 'radio4000/utils/youtube-api';
import {fetchDiscogsInfo} from 'radio4000/utils/discogs-api';
import {task, timeout} from 'ember-concurrency';
import {mediaUrlParser} from 'media-url-parser';
import {and, or, not} from 'ember-awesome-macros'

const {Component, get, set, observer, computed} = Ember;

export default Component.extend({
	tagName: 'form',
	classNames: ['Form'],
	classNameBindings: ['box:Form--box'],

	// This is not the "track model", but an ordinary object.
	track: null,
	initialUrl: '',

	// Display discogs interface.
	showDiscogs: false,

	didInsertElement() {
		this._super()
		this.automaticSetTitle()
	},

	// Gets called when you paste into the input-url component.
	// Takes an URL and turns it into a YouTube ID,
	// which we use to query the API for a title.
	automaticSetTitle: observer('track.url', function () {
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
		const newid = youtubeUrlToId(track.get('url'))
		if (newid) {
			track.set('ytid', newid);
			get(this, 'fetchTitle').perform()
		}
	}),

	automaticSetDiscogsInfo: observer('track.discogsUrl', function () {
		const track = get(this, 'track')
		if (track && track.get('discogsUrl')) {
			get(this, 'fetchDiscogsInfo').perform()
		}
	}),

	submitDisabled: or(not('track.hasDirtyAttributes'), 'submitTask.isRunning'),
	showDiscogsSearchSuggestion: and('track.title', not('track.discogsUrl')),

	discogsSearchUrl: computed('track.title', function() {
		let title = encodeURIComponent(this.get('track.title'));
		return `https://www.discogs.com/search/?q=${title}&type=all`
	}),

	fetchTitle: task(function * () {
		yield timeout(250); // throttle
		const track = get(this, 'track')
		const ytid = track.get('ytid')
		let title = yield fetchTitle(ytid)
		track.set('title', title)
	}).restartable(),

	fetchDiscogsInfo: task(function * () {
		const mediaUrl = mediaUrlParser(this.get('track.discogsUrl'))
		// Make sure we are dealing with a Discogs URL
		if (mediaUrl.id && mediaUrl.provider === 'discogs') {
			const type = mediaUrl.url.includes('master/') ? 'master' : 'release'
			const info = yield fetchDiscogsInfo(mediaUrl.id, type)
			this.set('discogsInfo', info)
		}
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
			const track = get(this, 'track')
			if (track.hasDirtyAttributes) {
				track.rollbackAttributes();
			}
			const onCancel = get(this, 'onCancel')
			if (onCancel) {
				onCancel();
			}
		},
		showDiscogs() {
			this.set('showDiscogs', true);
		},
		addDiscogsInfo(info) {
			let body = this.get('track.body')
			this.set('track.body', `${body ? body + ' ' : ''}${info}`)
		}
	}
});
