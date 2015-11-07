import Ember from 'ember';
import config from './config/environment';
import googlePageview from './mixins/google-pageview';

var Router = Ember.Router.extend(googlePageview, {
	location: config.locationType
});

Router.map(function () {
	// pages
	this.route('about', function () {
		this.route('contact');
		this.route('technology');
	});
	this.route('bookmarklet');
	this.route('dashboard');
	this.route('help', function () {
		// help.index
	});
	this.route('intro');
	this.route('404');
	this.route('styleguide', function () {
		this.route('colors');
		this.route('typography');
		this.route('forms');
	});
	this.route('login');
	this.route('logout');

	this.route('channels', {path: '/'}, function () {
		this.route('all');
		this.route('new');
		this.route('history');
	});

	// Support deprecated channels urls. Needs to be defined before 'channel' route.
	this.route('channel-alias', {path: '/c/:slug'});

	this.route('channel', {path: '/:slug'}, function () {
		this.authenticatedRoute('add', function () {
			this.route('bookmarklet');
		});
		this.authenticatedRoute('edit');
		this.authenticatedRoute('delete');
		this.route('dashboard', {});
		this.route('index', {path: '/'}, function () {
			this.route('track', {path: ':track_id', resetNamespace: true});
		});
		this.route('favorites');
		this.route('followers');
	});
});

export default Router;
