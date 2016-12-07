import DS from 'ember-data';
import youtubeRegex from 'npm:youtube-regex';
import {validator, buildValidations} from 'ember-cp-validations';

const {Model, attr, belongsTo} = DS;

const Validations = buildValidations({
	title: [
		validator('presence', true),
		validator('length', {
			max: 256
		})
	],
	body: [
		validator('length', {
			max: 300
		})
	],
	url: [
		validator('presence', true),
		validator('format', {
			type: 'url',
			regex: youtubeRegex(),
			message: 'The URL has to be a valid and complete YouTube URL'
		})
	]
});

export default Model.extend(Validations, {
	url: attr('string'),
	title: attr('string'),
	body: attr('string'),
	ytid: attr('string'),
	created: attr('number', {
		defaultValue() {
			return new Date().getTime();
		}
	}),

	// relationships
	channel: belongsTo('channel', {
		async: true,
		inverse: 'tracks'
	}),

	// Updates provider ID from the URL
	updateYouTubeId() {
		const id = youtubeRegex().exec(this.get('url'))[1];
		if (!id) {
			return;
		}
		this.set('ytid', id);
		return id;
	},

	// Own properties
	// property for local use only, not planned to save them
	usedInCurrentPlayer: false,
	finishedInCurrentPlayer: false

	// // Finds an array of all " #hashtags " from the body property
	// hashtags: Ember.computed('body', function () {
	// 	let body = this.get('body');
	// 	let hashtags;
	// 	if (!body) { return; }
	// 	// find " #hashtags" (with space) https://regex101.com/r/pJ4wC5/4
	// 	hashtags = body.match(/(^|\s)(#[a-z\d-]+)/ig);
	// 	if (!hashtags) { return; }
	// 	// remove spaces on each item
	// 	return hashtags.map((tag) => tag.trim());
	// })
	// bodyPlusMentions: Ember.computed('body', function () {
	// 	let body = this.get('body');
	// 	// find " @channel" (with space)
	// 	return body.replace(/(^|\s)(@[a-z\d-]+)/ig,'$1<a href="https://radio4000.com/$2" class="Mention">$2</a>');
	// })
});
