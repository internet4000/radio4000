import youtube from 'radio4000/utils/youtube';
import DS from 'ember-data';

export default DS.Model.extend({
	url: DS.attr('string'),
	title: DS.attr('string', { defaultValue: 'Untitled' }),
	body: DS.attr('string'),
	created: DS.attr('number'),
	channel: DS.belongsTo('channel', { async: true }),

	// Format the date
	createdDate: function() {
		var m = window.moment(this.get('created'));
		// return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'), m.format('h:mm:ss a'));
		// return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'));
		return m.fromNow(); // 19 hours ago
	}.property('created'),

	// Returns a YouTube ID from an URL
	ytid: function() {
		return youtube(this.get('url'));
	}.property('url'),

	// Create a URL to embed in an iframe
	embedUrl: function() {
		return '//www.youtube.com/embed/'+ this.get('ytid') + '?enablejsapi=1&autoplay=1&rel=0&showinfo=0&autohide=1';
	}.property('ytid'),
});
