/* global Firebase, FirebaseSimpleLogin, dbRef */
var AuthController = Ember.Controller.extend({
	isLoggedIn: false,
	currentUser: null,

	init: function() {
		this.authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
			if (error) {
				// Error: not authenticated
				console.log('Authentication failed: ' + error);
			} else if (user) {
				// Success: user authenticated with Firebase
				this.set('isLoggedIn', true);
				this.set('currentUser', user);
				console.log(user);
				// console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);

				// var userRef = new Firebase('https://muchplay.firebaseio.com/users/' + user.username);
				// var controller = this;

				var properties = {
					id: user.username,
					name: user.username,
					displayName: user.displayName,
					avatarUrl: user.avatar_url
				};

				// userRef.once('value', function(snapshot) {
				// 	// var user = this.store.createRecord('user', {
				// 	// 	ref: userRef
				// 	// });
				// 	// user.setProperties(properties);
				// 	controller.set('currentUser', user);
				// 	user.save(); // Save the user
				// });

			} else {
				this.set('isLoggedIn', false);
			}
		}.bind(this));
	},
	login: function() {
		this.authClient.login('google');
	},
	logout: function() {
		this.authClient.logout();
	}
});

export default AuthController;
