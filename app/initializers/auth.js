import Ember from 'ember';
import DS from 'ember-data';

// @todo get this ref from the application adapter somehow
var Ref = new window.Firebase('https://muchplay.firebaseio.com/');

// To use this object globally we'll need to inject it into all our controllers and routes.
export default {
	name: 'auth',
	after: 'store',

	initialize: function(container, app) {

		// This object will be used for authentication. The variable auth will be used later.
		var auth = Ember.Object.extend({
			authed: false,
			user: null,

			init: function() {
				var self = this;

				// get access to the ember data store
				this.store = container.lookup('store:main');

				// login with Firebase
				this.authClient = new window.FirebaseSimpleLogin(Ref, function(error, user) {
					if (error) {
						// an error occurred while attempting login
						alert('Authentication failed: ' + error);

					} else if (user) {
						// login
						console.log('logged in');

						// @todo emberfire doesn't support findQuery so…
						// self.get('store').find('user', { authId: self.get('user.id') }).then(function(promise) {

						// check if a user already exists
						self.get('store').find('user', user.id).then(function(promise) {
							// we have a user with that id already
							// console.log(promise.get('playlist'));
							self.set('user', promise);
							self.set('authed', true);
						}, function() {
							// or we don't so create one
							self.createUser(user);
						});


					} else {
						// logout
						self.set('authed', false);
						self.set('user', null);
					}
				});
			},

			login: function(provider) {
				this.authClient.login(provider);
			},
			logout: function() {
				this.authClient.logout();
			},

			createUser: function(user) {
				var self = this;
				var newUser = this.get('store').createRecord('user', {
					id: user.id, // set id to the id of firebase auth social id
					name: user.displayName,
					created: new Date().getTime(),
					email: user.thirdPartyUserData.email // sometimes email is private and this will be empty
				});

				newUser.save().then(function(){
					console.log('created a new user');
					self.set('user', newUser);
					self.set('authed', true);
				});
			}
		});

		// Register and inject the initializer into all controllers and routes
		app.register('auth:main', auth, {singleton: true});
		app.inject('controller', 'auth', 'auth:main');
		app.inject('route', 'auth', 'auth:main');
	}
};
