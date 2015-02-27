import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
	location: config.locationType
});

Router.map(function() {
	// pages
	this.route('log');
	this.route('signin');
	this.route('stats');
	this.route('styleguide');
	this.route('dashboard');

	// about route
	this.route('about', function() {
		this.route('contact');
		this.route('log');
		this.route('technology');
	});

	// help route
	this.route('help', function() {
		this.route('forum');
	});

	// new channel
	this.route('new');

	// all channels
	this.resource('channels', { path: 'discover'}, function() {
		this.route('popular');
		this.route('all');
	});

	// channel
	this.resource('channel', { path: '/c/:channel_slug' }, function() {
		this.route('favorite-channels');
		this.route('followers');
		this.route('edit'); // edit channel
		this.route('add'); // add a track to a channel

		// channel tracks
		this.resource('tracks', function() {
			this.resource('track', { path: ':track_id' }); // single track
		});
	});

	// users
	this.resource('users', function() {
		this.resource('user', { path: '/user/:user_id' });
	});
});

export default Router;
