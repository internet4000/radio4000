import Ember from 'ember';

var Router = Ember.Router.extend({
  location: PlayENV.locationType
});

Router.map(function() {

	// Playlists
	this.resource('playlists', { path: '/playlists' }, function() {
		this.route('new');
	});

	this.resource('playlist', { path: '/playlist/:playlist_id' }, function() {
		// this.route('tracks');

		this.resource('tracks', { path: 'tracks' }, function() {
			this.resource('track', { path: ':track_id' });
		});
	});

	this.resource('about');
	this.resource('styleguide');
});

export default Router;
