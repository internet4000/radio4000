/* eslint array-callback-return:0 */
import EmberRouter from '@ember/routing/router'
import config from './config/environment'

const Router = EmberRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL
})

Router.map(function() {
	this.route('channels', {path: '/'}, function() {
		this.route('all')
		this.route('history')
		this.route('map')
		this.route('new')
		this.route('search')
		this.route('explore')
	})
	this.route('channel', {path: '/:channel_slug'}, function() {
		this.route('index', {path: '/'})
		this.route('home')
		this.route('deprecated-track', {path: ':track_id'})
		this.route('tracks', function() {
			this.route('track', {path: ':track_id'}, function() {
				this.route('index', {path: '/'})
			})
		})
		this.route('add')
		this.route('edit')
		this.route('delete')
		this.route('favorites')
		this.route('followers')
		this.route('play', function() {
			this.route('random')
		})
		this.route('player');
	})
	this.authenticatedRoute('add')
	this.authenticatedRoute('bookmarklet')
	this.route('about', function() {
		this.route('intro', {path: '/'})
		this.route('contact')
	})
	this.route('feedback')
	this.route('auth', function() {
		this.route('signup')
		this.route('login')
		this.route('logout', {path: '/logout'})
	})
	this.route('styleguide', function() {
		this.route('typography')
		this.route('colors')
		this.route('forms')
		this.route('tabs')
		this.route('buttons')
	})
	this.route('404')
	this.authenticatedRoute('settings', function() {
		this.route('channel', function() {
			this.route('image')
			this.route('backup')
			this.route('delete')
			this.route('map')
		})
		this.route('account')
	})
	this.authenticatedRoute('premium')
	this.route('menu');
})

export default Router
