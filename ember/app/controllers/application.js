/* global Firebase, FirebaseSimpleLogin */
var ApplicationController = Ember.Controller.extend({
	dbRoot: 'https://muchplay.firebaseio.com',
	dbRef: new Firebase('https://muchplay.firebaseio.com'),
	isLoggedIn: false,
	currentUser: null,

	init: function() {
		this.authClient = new FirebaseSimpleLogin(this.dbRef, function(error, user) {

			// Error: not authenticated
			if (error) {
				console.log('Authentication failed: ' + error);

			// Success: user authenticated with Firebase
			} else if (user) {
				this.set('isLoggedIn', true);
				this.set('currentUser', user);
				console.log(user);

			// HMMM
			} else {
				this.set('isLoggedIn', false);
			}
		}.bind(this));
	},

	actions: {
		login: function() {
			this.authClient.login('google');
		},
		logout: function() {
			this.authClient.logout();
		}
	}
});

export default ApplicationController;
