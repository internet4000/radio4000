/* global Firebase, FirebaseSimpleLogin */
var AuthController = Ember.Controller.extend({
	dbRef: new Firebase('https://muchplay.firebaseio.com'),
	isLoggedIn: false,
	currentUser: null,

	init: function() {
		this._super();
		this.fireBaseAuth();
	},

	fireBaseAuth: function() {
		// Create the Firebase login object
		this.authClient = new FirebaseSimpleLogin(this.dbRef, function(error, user) {

			if (user) {
				// Success: user authenticated with Firebase
				console.log('Logged in. Checking user in Firebase');

				// Save the authenticated object into our app
				this.set('isLoggedIn', true);
				this.set('currentUser', user);

				// Check if the user already exists in the DB, else create the user
				this.get('util').getUserByUsername(this.get('currentUser'));

			} else if (error) {
				// Error: not authenticated
				console.log('Authentication failed: ' + error);

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
			if (!provider) provider = 'google';
			this.authClient.login(provider);
		},
		logout: function() {
			this.authClient.logout();
		}
	}
});

export default AuthController;

/*

google
id "115381854197443652376"
uid "google:115381854197443652376"
email
displayName
accesstoken "ya29.GABHC6UhMimZeiAAAADsrClKDMZLIGACh-TM4-B4PdBywgjgcORdgDq0PlJCJQ"
firebaseAuthToken "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MDA4NjMzMDgsInYiOjAsImQiOnsiaWQiOiIxMTUzODE4NTQxOTc0NDM2NTIzNzYiLCJ1aWQiOiJnb29nbGU6MTE1MzgxODU0MTk3NDQzNjUyMzc2IiwicHJvdmlkZXIiOiJnb29nbGUiLCJlbWFpbCI6Im9za2FyQHJvdWdoLmRrIn0sImlhdCI6MTQwMDI1ODUwN30.FjnKRWNZP4ADGcqmMX0mQ3TbokP1srplSE9JomMS0Ts"

id
uid "facebook:10152422494934521"
*/
