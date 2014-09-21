import Ember from 'ember';

export default Ember.ArrayController.extend({

	// true if the user should be allowed to create new playlists
	// canCreatePlaylist: function() {
	// 	return auth.authed && !auth.user.playlists;
	// }.property('auth'),

	showLogin: false,

	deactivate: function() {
		this.controller.set('showLogin', false);
	},

	// pass the actions to the auth controller
	actions: {
		login: function(provider) {
			this.get('auth').login(provider);
		},
		logout: function() {
			this.get('auth').logout();
		},
		showLogin: function(status) {
			this.set('showLogin', status);
			console.log(status + " is cool");
		}
	}
});
