var Router = Ember.Router.extend({
  location: ENV.locationType
});

Router.map(function() {
	this.resource('playlists', { path: '/playlists' }, function() {
		this.route('new');
	});

	this.resource('playlist', { path: '/p/:playlist_id' }, function() {
		this.resource('track', { path: '/t/:track_id' });
	});

	this.resource('about');

	// this.resource('users', { path: '/users' });
	// this.resource('user', { path: '/user/:user_id' });
});

export default Router;
