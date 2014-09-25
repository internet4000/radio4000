import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {

		// @todo this only works if you enter the route from an internal link
		// var authed = this.get('auth.authed');
		// if (!authed) {
		// 	console.log('sorry, not logged in');
		// 	this.transitionToRoute('application');
		// }

		// @todo doesn't work anymore
		// var hasPlaylist = this.get('auth.user.playlists');
		// if (hasPlaylist) {
		// 	Ember.debug('Already has a playlist, redirecting…');
		// 	this.transitionToRoute('application');
		// }
	}

	// ,
	// renderTemplate: function() {
	// 	this.render('playlists/new', {
	// 		into: 'application'
	// 	});
	// }
});
