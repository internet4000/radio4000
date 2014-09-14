import DS from 'ember-data';

export default DS.Model.extend({
	// key: DS.attr('string'),
	// provider: DS.attr('string'),
	url: DS.attr('string'),
	title: DS.attr('string'),
	body: DS.attr('string'),
	created: DS.attr('number'),
	playlist: DS.belongsTo('playlist'),

	ytID: function() {
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
		var match = this.get('url').match(regExp);
		if (match && match[7].length === 11) {
			return match[7];
		} else {
			return false;
		}
	}.property('url'),

	embedUrl: function() {
		return '//www.youtube.com/embed/'+ this.get('ytID') + '?enablejsapi=1&autoplay=1&rel=0&showinfo=0&autohide=1';
	}.property('ytID'),

	createdDate: function() {
		var m = window.moment(this.get('created'));
		return '%@ at %@'.fmt(m.format('MMMM Do, YYYY'), m.format('h:mm:ss a'));
	}.property('created')
});
