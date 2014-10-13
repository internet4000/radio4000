import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
	// pages
	this.route('about');
	this.route('login');
	this.route('styleguide');

	// new playlist
	this.route('new', { path: '/new' });

	// many playlists
	this.resource('playlists', { path: 'discover'}, function() {
		// don't delete this anonym function, otherwise 'index' isn't generated
	});

	// single playlist
	this.resource('playlist', { path: '/p/:playlist_id' }, function() {
		this.route('add');
		this.resource('tracks', { path: 'tracks' });
		this.resource('track', { path: ':track_id' }); // not nested inside tracks avoid double tracks
	});

	// users
	this.resource('users', function(){
		this.resource('user', { path: '/user/:user_id' });
	});
});

export default Router;
