import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		var authed = this.get('auth.authed');
		var hasPlaylist = this.get('auth.user.playlist');

		// abort if not logged in
		// @todo this only works if you enter the route from an internal link
		if (!authed) {
			console.log('sorry, not logged in');
			this.transitionTo('application');
		}

		// abort if user already has a playlist
		if (hasPlaylist) {
			this.transitionTo('application');
		}
	}
});
