// /* global Firebase, FirebaseSimpleLogin, dbRef */
// var AuthController = Ember.Controller.extend({
// 	isLoggedIn: false,
// 	currentUser: null,

// 	init: function() {
// 		this.authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {

// 			// Error: not authenticated
// 			if (error) {
// 				console.log('Authentication failed: ' + error);

// 			// Success: user authenticated with Firebase
// 			} else if (user) {
// 				this.set('isLoggedIn', true);
// 				this.set('currentUser', user);
// 				console.log(user);

// 			// HMMM
// 			} else {
// 				this.set('isLoggedIn', false);
// 			}
// 		}.bind(this));
// 	},
// 	login: function() {
// 		this.authClient.login('google');
// 	},
// 	logout: function() {
// 		this.authClient.logout();
// 	}
// });

// export default AuthController;


// // var userRef = new Firebase('https://muchplay.firebaseio.com/users/' + user.username);
// // var controller = this;

// // var properties = {
// // 	id: user.username,
// // 	name: user.username,
// // 	displayName: user.displayName,
// // 	avatarUrl: user.avatar_url
// // };

// // userRef.once('value', function(snapshot) {
// // 	// var user = this.store.createRecord('user', {
// // 	// 	ref: userRef
// // 	// });
// // 	// user.setProperties(properties);
// // 	controller.set('currentUser', user);
// // 	user.save(); // Save the user
// // });
