import Ember from 'ember';
import DS from 'ember-data';
import youtubeRegex from 'npm:youtube-regex';

const {debug} = Ember;
const {attr, belongsTo} = DS;

export default DS.Model.extend({
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

	// Updates provider Id automatically from the URL
	updateProvider() {
		let id = youtubeRegex().exec(this.get('url'))[1];

		if (!id) {
			return false;
		}

		this.set('ytid', id);
		this.save();
		debug('Updated track.ytid');
	}

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
