import Ember from 'ember';
// import DS from 'ember-data';

var ref = new window.Firebase('https://jsbin-test.firebaseio.com/');

// To use this object globally we'll need to inject it into all our controllers and routes.
export default {
	name: 'auth',
	after: 'store',

	initialize: function(container, app) {

		// This object will be used for authentication. The variable auth will be used later.
		var auth = Ember.Object.extend({
			authed: false,

			init: function() {
				// get access to the ember data store
				this.store = container.lookup('store:main');

				// NEW METHOD (see old method above)
				ref.onAuth(function(authData) {
					if (authData) {
						Ember.debug('Logged in');
						this.set('authed', true);
						this.set('authData', authData);

						// @todo if we check first, we cant later create user firebase bug already in use
						// this.checkUser();
						this.createUser();
					} else {
						Ember.debug('Logged out');
						this.set('authed', false);
						this.set('authData', null);
						this.set('user', null);
					}
				}.bind(this));
			},
			login: function(provider) {
				Ember.debug('trying to login');
				this.loginWithPopup(provider); // firebase 1.1.1
			},
			// firebase 1.1.1 login with popup
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
						Ember.debug('Logged in with popup');
						// console.log(authData);
					}
				});
			},
			// firebase 1.1.1 login with redirect (needed for chrome on iOS)
			loginWithRedirect: function(provider) {
				var self = this;
				Ember.debug('logging in with redirect');
				ref.authWithOAuthRedirect(provider, function(error, authData) {
					if (error) {
						console.log('errrrror');
					} else if (authData) {
						Ember.debug('Logged in with redirect');
					}
				});
			},
			logout: function() {
				Ember.debug('trying to log out');
				// this.authClient.logout(); // firebase simple login
				ref.unauth(); // firebase 1.1.1
			},

			// @todo can't use the uid as id for the new user model because ember complains it was already used
			checkUser: function() {
				var self = this;
				Ember.debug('Checking whether the user already exists…');
				var savedUser = this.get('store').find('user', this.get('authData.uid'));
				savedUser.then(function(user) {
					Ember.debug('user already exists');
					self.set('user', user);
				}, function(user) {
					Ember.debug('no user found');
				});
			},

			createUser: function(user) {
				Ember.debug('Trying to create a new user');
				var self = this;

				console.log(this.get('authData'));

				// provider
				// facebook.displayName
				// facebook.email

				var newUser = this.get('store').createRecord('user', {
					id: this.get('authData.uid'), // use uid as id
					name: this.get('authData.facebook.displayName'),
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
		app.register('auth:main', auth);
		app.inject('controller', 'auth', 'auth:main');
		app.inject('route', 'auth', 'auth:main');
	}
};
