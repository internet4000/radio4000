/* eslint array-callback-return:0 */
import Ember from 'ember'
import config from './config/environment'
import googlePageview from './mixins/google-pageview'

const Router = Ember.Router.extend(googlePageview, {
	location: config.locationType,
	rootURL: config.rootURL
})

Router.map(function() {
	this.route('about', function() {
		this.route('intro', { path: '/' })
		this.route('contact')
	})
	this.route('dashboard')
	this.route('404')
	this.route('styleguide', function() {
		this.route('typography')
		this.route('colors')
		this.route('forms')
		this.route('tabs')
	})
	this.route('channels', { path: '/' }, function() {
		this.route('all')
		this.route('new')
		this.route('history')
	})
	this.route('channel', { path: '/:channel_slug' }, function() {
		this.route('index', { path: '/' })
		this.route('deprecated-track', { path: ':track_id' })
		this.route('tracks', function() {
			this.route('track', { path: ':track_id' }, function() {
				this.route('index', { path: '/' })
				this.route('edit')
			})
		})
		this.route('add')
		this.route('edit')
		this.route('delete')
		this.route('dashboard')
		this.route('favorites')
		this.route('followers')
		this.route('play', function() {
			this.route('random');
		});
	})
	this.route('feedback')
	this.authenticatedRoute('add')
	this.authenticatedRoute('bookmarklet')
	// Support deprecated channels urls. Needs to be defined before 'channel' route.
	this.route('channel-alias', { path: '/c/:channel_slug' })
	this.route('auth', function() {
		this.route('signup')
		this.route('login')
		this.route('logout')
		this.route('settings', function() {
			this.route('account', { path: '/'})
			this.route('payments')
		})
	})
})

export default Router
