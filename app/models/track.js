import DS from 'ember-data';
import youtube from 'radio4000/utils/youtube';

export default DS.Model.extend({
	url: DS.attr('string'),
	title: DS.attr('string'),
	body: DS.attr('string'),
	created: DS.attr('string', {
		defaultValue: function() { return new Date(); }
	}),
	channel: DS.belongsTo('channel', { async: true }),
	ytid: DS.attr('string'),

	// Returns a YouTube ID from an URL
	// TODO: this should definitely be saved in the db
	// and not computed every time like it is now
	updateProvider() {
		let id = youtube(this.get('url'));
		console.log('updateYtid');

		this.set('ytid', id);
		this.save();
	},

	hashtags: Ember.computed('body', function() {
		let body = this.get('body');

		if (!body) { return; }

		// find " #hashtags" (with space) https://regex101.com/r/pJ4wC5/4
		let hashtags = body.match(/(^|\s)(#[a-z\d-]+)/ig);

		if (!hashtags) { return; }

		// // remove spaces on each item
		// return hashtags.map(function(tag) {
		// 	return tag.trim();
		// });

		return hashtags;
	})

	// bodyPlusMentions: function() {
	// 	var body = this.get('body');

	// 	// find " @channel" (with space)
	// 	return body.replace(/(^|\s)(@[a-z\d-]+)/ig,'$1<a href="http://radio4000.com/c/$2" class="Mention">$2</a>');
	// }.property('body')

});
