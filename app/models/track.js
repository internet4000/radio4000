import Ember from 'ember';
import DS from 'ember-data';
import firebase from 'firebase';
import {task} from 'ember-concurrency';
import {validator, buildValidations} from 'ember-cp-validations';
import youtubeUrlToId from 'radio4000/utils/youtube-url-to-id';
import format from 'npm:date-fns/format';

const {Model, attr, belongsTo} = DS;
const {get, set, computed} = Ember;

export const Validations = buildValidations({
	url: [
		validator('presence', {
			presence: true,
			message: 'Paste a YouTube URL here'
		}),
		validator('youtube-url')
	],
	title: [
		validator('presence', {
			presence: true,
			ignoreBlank: true,
			message: 'Field should not be empty'
		}),
		validator('length', {
			max: 256
		})
	],
	body: [
		validator('length', {
			max: 300
		})
	]
});

export default Model.extend(Validations, {
	created: attr('number', {
		defaultValue() {
			return firebase.database.ServerValue.TIMESTAMP;
		}
	}),
	url: attr('string'),
	title: attr('string'),
	body: attr('string'),
	ytid: attr('string'),

	// relationships
	channel: belongsTo('channel', {
		async: true,
		inverse: 'tracks'
	}),

	// Own properties
	// property for local use only, not planned to save them
	liveInCurrentPlayer: false,
	playedInCurrentPlayer: false,
	finishedInCurrentPlayer: false,

	createdMonth: computed('created', function () {
		let created = get(this, 'created');
		return format(created, 'MMMM YYYY');
	}),

	// If the user changes the url, we need to update the YouTube id.
	updateYoutubeId() {
		const url = get(this, 'url');
		const ytid = youtubeUrlToId(url);
		if (ytid) {
			set(this, 'ytid', ytid);
		}
	},
	update: task(function * () {
		if (!get(this, 'hasDirtyAttributes')) {
			return
		}

		// In case url changed, we need to set the ytid
		yield this.updateYoutubeId();
		yield this.save()
	}).drop(),

	delete: task(function * () {
		const track = this
		const channel = yield get(this, 'channel');
		const tracks = yield channel.get('tracks');

		yield tracks.removeObject(track);
		yield channel.save();
		return track.destroyRecord();
	}).drop()
});
