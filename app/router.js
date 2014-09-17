import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	this.resource('about');
	this.resource('styleguide');

	this.resource('playlists', function() {
		this.route('new');
	});
	this.resource('playlist', { path: '/playlist/:playlist_id' }, function() {
		this.resource('tracks', { path: 'tracks' });
		this.resource('track', { path: ':track_id' }); // not nested to avoid double tracks
	});
  this.route('dashboard');
});

export default Router;
