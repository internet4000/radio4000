/* global moment */
var FirePlaylistSlugComponent = Ember.Component.extend({
	classNames: ['playlist-slug'],
	createdMonth: function() {
		return moment(this.get('playlist.created')).format('MMM');
	}.property('playlist.created'),
	createdDay: function() {
		return moment(this.get('playlist.created')).format('D');
	}.property('playlist.created')
});

export default FirePlaylistSlugComponent;
