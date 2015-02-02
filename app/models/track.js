import DS from 'ember-data';
import youtube from 'radio4000/utils/youtube';

export default DS.Model.extend({
	url: DS.attr('string'),
	title: DS.attr('string', { defaultValue: 'Untitled' }),
	body: DS.attr('string'),
	created: DS.attr('number'),
	channel: DS.belongsTo('channel', { async: true }),

	// Format the date
	createdDate: function() {
		var m = window.moment(this.get('created'));
		return m.fromNow(); // "19 hours ago"
	}.property('created'),

	// Returns a YouTube ID from an URL
	// TODO: this should definitely be saved in the db
	// and not computed every time like it is now
	ytid: function() {
		var id = youtube(this.get('url'));
		return id;
	}.property('url')
});
