import DS from 'ember-data';
import youtubeRegex from 'npm:youtube-regex';

const {Model, attr, belongsTo} = DS;

export default Model.extend({
	url: attr('string'),
	title: attr('string'),
	body: attr('string'),
	created: attr('number', {
		defaultValue() {
			return new Date().getTime();
		}
	}),
	ytid: attr('string'),

	// relationships
	channel: belongsTo('channel', {
		async: true,
		inverse: 'tracks'
	}),

	// Updates provider ID automatically from the URL
	updateYouTubeId() {
		const id = youtubeRegex().exec(this.get('url'))[1];
		if (!id) {
			return;
		}
		this.set('ytid', id);
		return this;
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
