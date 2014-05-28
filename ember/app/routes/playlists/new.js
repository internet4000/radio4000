var PlaylistsNewRoute = Ember.Route.extend({
	beforeModel: function() {
		var self = this;
		var auth = this.controllerFor('auth');

		// Redirect to 'Application/Home' if the user already has a playlist
		this.get('store').find('user', auth.get('currentUser.id')).then(function(user) {
			if (user.get('hasPlaylist')) {
				self.transitionTo('application');
			}
		});
	}
});

export default PlaylistsNewRoute;
