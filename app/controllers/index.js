import Ember from 'ember';

export default Ember.ArrayController.extend({

	// true if the user should be allowed to create new playlists
	// canCreatePlaylist: function() {
	// 	return auth.authed && !auth.user.playlists;
	// }.property('auth'),

	deactivate: function() {
		// reset show login each time we enter index
		this.set('showLogin', false);
	},

	// pass the actions to the auth controller
	actions: {
		login: function(provider) {
			this.get('auth').login(provider);
		},
		logout: function() {
			this.get('auth').logout();
		},
		showLogin: function() {
			this.set('showLogin', true);
		}
	}
});
