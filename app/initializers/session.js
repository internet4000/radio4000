/*global md5*/
import Ember from 'ember';
import ENV from '../config/environment';
// https://gist.github.com/jkarsrud/941d8eb7a58e92953a55

var ref = new window.Firebase(ENV.firebaseURL);

export default {
	name: 'session',
	after: 'store',
	initialize: function(container, app) {
		var session = Ember.Object.extend({
			authed: false,

			init: function() {
				// get access to the ember data store
				this.store = container.lookup('store:main');

				ref.onAuth(function(authData) {
					if (!authData) {
						Ember.debug('Not logged in');
						this.set('authed', false);
						this.set('authData', null);
						this.set('user', null);
						return false;
					}

					Ember.debug('Logged in');
					this.set('authed', true);
					this.set('authData', authData);
					this.afterAuthentication(authData.uid);
				}.bind(this));
			},
			login: function(provider) {
				Ember.debug('trying to login');
				this.loginWithPopup(provider);
			},
			loginWithPopup: function(provider) {
				var _this = this;
				Ember.debug('logging in with popup');
				ref.authWithOAuthPopup(provider, function(error, authData) {
					if (error) {
						if (error.code === "TRANSPORT_UNAVAILABLE") {
							// fall-back to browser redirects, and pick up the session
							// automatically when we come back to the origin page
							_this.loginWithRedirect(provider);
						}
					} else if (authData) {
						// Ember.debug('Logged in with popup');
						// console.log(authData);
					}
				});
			},
			// firebase login with redirect (needed for chrome on iOS)
			loginWithRedirect: function(provider) {
				var _this = this;
				Ember.debug('logging in with redirect');
				ref.authWithOAuthRedirect(provider, function(error, authData) {
					if (error) {
						console.log('errrrror');
					} else if (authData) {
						// Ember.debug('Logged in with redirect');
					}
				});
			},
			logout: function() {
				ref.unauth();
			},

			afterAuthentication: function(userId) {
				var _this = this;
				// Ember.debug('Checking if user exists');

				// See if the user exists using native firebase because of emberfire problem with "id already in use"
				ref.child('users').child(userId).once('value', function(snapshot) {
					var exists = (snapshot.val() !== null);
					userExistsCallback(userId, exists);
				});

				// Do the right thing depending on whether the user exists
				function userExistsCallback(userId, exists) {
					// Ember.debug('user exists: ' + exists);
					if (exists) {
						_this.existingUser(userId);
					} else {
						_this.createUser(userId);
					}
				}
			},

			existingUser: function(userId) {
				this.store.find('user', userId).then(function(user) {
					// Ember.debug('Found an existing user, setting it…');
					this.afterUser(user);
				}.bind(this));
			},

			createUser: function(userId) {
				var _this = this;
				var hashedId = md5(userId);

				// create a user with the authdata firebase provides
				this.get('store').createRecord('user', {
					id: hashedId,
					provider: this.get('authData.provider'),
					name: this.get('authData.facebook.displayName') || this.get('authData.google.displayName'),
					email: this.get('authData.facebook.email') || this.get('authData.google.email'),
					created: new Date().getTime()
				}).save().then(function(user){
					Ember.debug('created a new user');
					_this.afterUser(user);
				});
			},

			// This is the last step in a successful authentication
			afterUser: function(user) {
				this.set('user', user);
				// also set the resolved channels
				user.get('channels').then(function(channels) {
					this.set('userChannel', channels.get('firstObject'));
				}.bind(this));
			}
		});

		// Register and inject the initializer into all controllers and routes
		app.register('session:main', session);
		app.inject('route', 'session', 'session:main');
		app.inject('controller', 'session', 'session:main');
	}
};
