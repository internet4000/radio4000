// https://www.firebase.com/docs/web/guide/user-auth.html
// @todo user vs currentUser naming
import Ember from 'ember';
import DS from 'ember-data';

var Ref = new window.Firebase('https://muchplay.firebaseio.com/');

// To use this object globally we'll need to inject it into all our controllers and routes.
export default {
	name: 'auth', // or 'Auth' ?
	after: 'store',

	initialize: function(container, app) {

		// This object will be used for authentication. The variable auth will be used later.
		var auth = Ember.Object.extend({
			authed: false,
			user: null,

			init: function() {
				// get access to the ember data store
				this.store = container.lookup('store:main');

				// login with Firebase
				this.authClient = new window.FirebaseSimpleLogin(Ref, function(error, user) {
					if (error) {
						// an error occurred while attempting login
						alert('Authentication failed: ' + error);
					} else if (user) {
						// user authenticated with Firebase
						this.set('authed', true);
						this.initUser(user.id);
						Ember.debug('authenticated');
					} else {
						// user is logged out
						this.set('authed', false);
						this.set('user', null);
						Ember.debug('Not authenticated');
					}
				}.bind(this));
			},

			login: function(provider) {
				this.authClient.login(provider);
			},

			logout: function() {
				this.authClient.logout();
			},

			// Tests if the user already exists
			initUser: function(id) {
				var self = this;

				// @todo emberfire doesn't support findQuery so…
				// this.get('store').find('user', { authId: this.get('user.id') }).then(function(promise) {
				this.get('store').find('user', id).then(function(promise) {
					// we have a user with that id already
					console.log('we have a user already');
					self.set('user', promise);
				}, function() {
					console.log('we dont');
					// or we don't so create one
					self.createUser();
				});
			},

			createUser: function() {
				var store = this.get('store');

				var newUser = store.createRecord('user', {
					id: this.get('user.id'), // set id to the id of firebase auth social id
					name: this.get('user.displayName'),
					created: new Date().getTime()
				}).save();

				console.log('created a user');

				this.set('user', newUser);
			}
		});

		app.register('auth:main', auth, {singleton: true});
		app.inject('controller', 'auth', 'auth:main');
		app.inject('route', 'auth', 'auth:main');
	}
};
