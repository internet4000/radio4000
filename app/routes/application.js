import Ember from 'ember';

export default Ember.Route.extend({

	userPlaylists: function() {
		return this.get('auth.user.playlists');
	}.property('auth.user.playlists.[]'),

	// yourPlaylist: function() {
	// 	var userplaylist = this.get('auth.user.playlists').objectAt(0);
	// 	Ember.debug(userplaylist);
	// 	// this.controller.set('yourPlaylist', userplaylist);
	// }.property('auth.user.playlists.[]'),

	actions: {
		login: function(provider) {
			this.get('auth').login(provider);
		},
		logout: function() {
			this.get('auth').logout();
		},
		showLogin: function(status) {
			this.transitionTo('application'); // make sure we are on the index page
			this.controllerFor('index').set('showLogin', status);
		}
	},
	deactivate: function() {
		this.controller.set('showLogin', false);
	}
});
