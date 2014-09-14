import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {

		// abort if not logged in
		if (!this.get('auth.authed') ) {
			this.transitionTo('application');
		}

		// abort if user already has a playlist
		if (this.get('auth.user.hasPlaylist')) {
			this.transitionTo('application');
		}
	}
});
