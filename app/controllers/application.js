import Ember from 'ember';

export default Ember.ObjectController.extend({
	needs: ['playback'],

	// get gui state so we can update markup in this template as well
	isMaximized: Ember.computed.alias('controllers.playback.isMaximized')
	// ,

	// userPlaylist: function() {
	// 	return this.get('session.user.playlists').then(function(playlists) {
	// 		// return playlists.get('firstObject.title');
	// 		Ember.debug(playlists);
	// 	});
	// }.property('session.user.playlist.@each.title')
});
