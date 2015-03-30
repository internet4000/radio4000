/*
 * Working authentication with
 * Firebase 2.0.x + Ember.js 1.9.1 + Ember Data Canary + EmberFire 1.3.1 + Ember CLI
 *
 * Note: this assumes you've set up login on your Firebase and
 * only handles Google and Facebook for now,
 *
 * In your templates: <button {{action 'login' 'google'}}>Sign in with Google</button>
 */

import Ember from 'ember';
import config from '../config/environment';
import Firebase from 'firebase';

// New firebase instance (don't know how to get the one from the adapter)
var ref = new Firebase(config.firebase);

export default {
	name: 'session',
	// Run the initializer after the store is ready
	after: 'store',

	initialize(container, application) {

		// tell the app to pause loading until advanceReadiness is declared
		// application.deferReadiness();

		var session = Ember.Object.extend({
			authed: false,
			user: null,
			userChannel: null,

			// store: container.lookup('store:main'),

			init() {
				// this runs every time you log in or out
				ref.onAuth(function(authData) {

					// Not authenticated
					if (!authData) {
						this.set('authed', false);
						this.set('authData', null);
						this.set('user', null);
						this.set('userChannel', null);
						return false;
					}

					// Authenticated
					this.set('authed', true);
					this.set('authData', authData);
					// var hashedId = md5(authData.uid);
					this.afterAuthentication(authData.uid);
				}.bind(this));
			},

			// Call this from your Ember templates
			login(provider) {
				this._loginWithPopup(provider);
			},

			// Call this from your Ember templates
			logout() {
				ref.unauth();
			},

			// Default login method
			_loginWithPopup(provider) {
				var _this = this;
				// Ember.debug('logging in with popup');
				ref.authWithOAuthPopup(provider, function(error, authData) {
					if (error) {
						if (error.code === "TRANSPORT_UNAVAILABLE") {
							// fall-back to browser redirects, and pick up the session
							// automatically when we come back to the origin page
							_this._loginWithRedirect(provider);
						}
					} else if (authData) {
						// we're good!
						// this will automatically call the on ref.onAuth method inside init()
					}
				});
			},

			// Alternative login with redirect (needed for Chrome on iOS)
			_loginWithRedirect(provider) {
				ref.authWithOAuthRedirect(provider, function(error, authData) {
					if (error) {

					} else if (authData) {
						// we're good!
						// this will automatically call the on ref.onAuth method inside init()
					}
				});
			},

			// Runs after succesful auth
			afterAuthentication(userId) {
				var _this = this;

				// Either reuse or create a user
				container.lookup('store:main').find('user', userId).then(function() {
					_this.existingUser(userId);
				}, function() {
					_this.createUser(userId);
				});
			},

			// Existing user
			existingUser(userId) {
				var _this = this;

				// Set the user and user channel for easy access later
				container.lookup('store:main').find('user', userId).then(function(user) {
					user.get('channels').then(function(channels) {

						// Proceed with existing user
						var userChannel = channels.get('firstObject');
						_this.set('userChannel', userChannel);
						_this.set('user', user);
						console.log('we got a user');
						_this.afterUser();
					});
				});
			},

			// Create a new user
			createUser(userId) {
				var _this = this;

				// Without this, Emberfire gives an error
				container.lookup('store:main').unloadAll('user');

				container.lookup('store:main').createRecord('user', {
					id: userId,
					provider: this.get('authData.provider'),
					name: this.get('authData.facebook.displayName') || this.get('authData.google.displayName'),
					created: new Date().getTime()
				}).save().then(function(user) {

					// Proceed with the newly create user
					_this.set('user', user);
					_this.afterUser();
				});
			},

			afterUser() {
				console.log('afterUser');
				console.log('advancing');
				application.advanceReadiness();
			}
		});

		// Register and inject the 'session' initializer into all controllers and routes
		application.register('session:main', session);
		application.inject('controller', 'session', 'session:main');
		application.inject('route', 'session', 'session:main');
	}
};
