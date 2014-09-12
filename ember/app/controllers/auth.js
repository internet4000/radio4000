/* global Firebase, FirebaseSimpleLogin */
import Ember from 'ember';

export default Ember.Controller.extend({
	dbRef: new Firebase('https://muchplay.firebaseio.com'),
	isLoggedIn: false,

	// checkPlaylists: function() {
	// 	this.get('store').find('user', this.get('currentUser.id')).then(function(data) {
	// 		Ember.debug('really ran');
	// 		Ember.debug(data);
	// 	});

	// }.observes('currentUser'),

	init: function() {
		this._super();
		this.fireBaseAuth();
	},

	fireBaseAuth: function() {
		var self = this;

		// Create the Firebase login object
		this.authClient = new FirebaseSimpleLogin(this.dbRef, function(error, user) {

			if (user) {
				// Success: user authenticated with Firebase
				Ember.debug('Logged in');

				// Set the authenticated user object in our app
				this.set('isLoggedIn', true);
				this.set('currentUser', user);

				// Checks if the user already exists, if so, it returns the user object
				// otherwise it creates the user
				this.get('util').getUserByUsername(this.get('currentUser'));

				this.get('store').find('user', this.get('currentUser.id')).then(function(promise) {
					self.set('currentUserModel', promise);
				});

			} else if (error) {
				// Error: not authenticated
				Ember.debug('Authentication failed: ' + error);

			} else {
				// User is logged out
				this.set('isLoggedIn', false);
				this.set('curentUser', null);
				console.log('Not logged in');
			}
		}.bind(this));
	},

	actions: {
		login: function(provider) {
			// if (!provider) provider = 'google';
			this.authClient.login(provider);
		},
		logout: function() {
			this.authClient.logout();
		}
	}
});
