import Ember from 'ember';
import ENV from '../config/environment';

var ref = new window.Firebase(ENV.firebaseURL);

// To use this object globally we'll need to inject it into all our controllers and routes.
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
					if (authData) {
						Ember.debug('Logged in');
						this.set('authed', true);
						this.set('authData', authData);
						// @todo if we check first, we cant later create user firebase bug already in use
						// this.checkUser();
						this.createUser();
					} else {
						Ember.debug('Not logged in');
						this.set('authed', false);
						this.set('authData', null);
						this.set('user', null);
					}
				}.bind(this));
			},
			login: function(provider) {
				Ember.debug('trying to login');
				this.loginWithPopup(provider);
			},
			// login with popup
			loginWithPopup: function(provider) {
				var self = this;
				Ember.debug('logging in with popup');
				ref.authWithOAuthPopup(provider, function(error, authData) {
					if (error) {
						if (error.code === "TRANSPORT_UNAVAILABLE") {
							// fall-back to browser redirects, and pick up the session
							// automatically when we come back to the origin page
							self.loginWithRedirect(provider);
						}
					} else if (authData) {
						// Ember.debug('Logged in with popup');
						// console.log(authData);
					}
				});
			},
			// firebase login with redirect (needed for chrome on iOS)
			loginWithRedirect: function(provider) {
				var self = this;
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
			// @todo can't use the uid as id for the new user model because ember complains it was already used
			checkUser: function() {
				var self = this;
				Ember.debug('Checking whether the user already exists…');

				var existingUser = this.get('store').find('user', this.get('authData.uid'));
				existingUser.then(function(user) {
					Ember.debug('User already exists, done.');
					self.set('user', user);
				}, function(user) {
					Ember.debug('No user found');
					self.createUser(user);
				});
			},

			createUser: function(user) {
				var self = this;

				// @todo harvest email
				var newUser = this.get('store').createRecord('user', {
					id: this.get('authData.uid'), // use uid as id
					provider: this.get('authData.provider'),
					name: this.get('authData.facebook.displayName') || this.get('authData.google.displayName'),
					created: new Date().getTime()
				}).save().then(function(user){
					Ember.debug('created a new user');
					self.set('user', user);
				}, function() {
					Ember.debug('could not save user');
					self.set('user', null);
				});
			}
		});

		// Register and inject the initializer into all controllers and routes
		app.register('session:main', session);
		app.inject('route', 'session', 'session:main');
		app.inject('controller', 'session', 'session:main');
	}
};
