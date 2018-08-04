import Ember from 'ember';
import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';
import {fetchTitle} from 'radio4000/utils/youtube-api';
import {fetchReleaseInfos} from 'radio4000/utils/discogs-api';
import {task, timeout} from 'ember-concurrency';
import { mediaUrlParser } from 'media-url-parser';

const {Component, get, set, observer, computed} = Ember;

export default Component.extend({
	tagName: 'form',
	classNames: ['Form'],
	classNameBindings: ['box:Form--box'],

	// This is not the "track model", but an ordinary object.
	track: null,
	initialUrl: '',

	didInsertElement() {
		this.automaticSetTitle()
		this._super()
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

	automaticGetDiscogsInfo: observer('track.discogsUrl', async function () {
		const track = get(this, 'track');

		// Can not continue without a track or URL.
		if (!track || !track.get('discogsUrl')) {
			return;
		}

		// Because the URL might have changed
		const mediaUrl = mediaUrlParser(track.get('discogsUrl'))
		if (mediaUrl.id) {
			await fetchReleaseInfos(mediaUrl.id)
		}
	}),

	submitDisabled: computed('track.hasDirtyAttributes', 'submitTask', function() {
		return !this.get('track.hasDirtyAttributes') || this.get('submitTask.isRunning')
	}),

	fetchTitle: task(function * () {
		yield timeout(250); // throttle
		const track = get(this, 'track')
		const ytid = track.get('ytid')
		let title = yield fetchTitle(ytid)
		track.set('title', title)
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
		}
	}
});
