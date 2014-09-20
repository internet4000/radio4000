import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		var authed = this.get('auth.authed');
		var hasPlaylist = this.get('auth.user.playlists.content').length > 0;

		// abort if not logged in
		// @todo this only works if you enter the route from an internal link
		if (!authed) {
			console.log('sorry, not logged in');
			this.transitionToRoute('application');
		}

		// abort if user already has a playlist
		// @todo doesn't work anymore
		if (hasPlaylist) {
			this.transitionToRoute('application');
		}
	}
});
