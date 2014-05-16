/* global moment */
var FirePlaylistSlugComponent = Ember.Component.extend({
	classNames: ['playlist-slug'],
	publishedMonth: function() {
		return moment(this.get('playlist.published')).format('MMM');
	}.property('playlist.published'),
	publishedDay: function() {
		return moment(this.get('playlist.published')).format('D');
	}.property('playlist.published')
});

export default FirePlaylistSlugComponent;
