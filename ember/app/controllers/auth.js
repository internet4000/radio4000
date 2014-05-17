/* global Firebase, FirebaseSimpleLogin */
var AuthController = Ember.Controller.extend({
	dbRef: new Firebase('https://muchplay.firebaseio.com'),
	isLoggedIn: false,
	currentUser: null,

	init: function() {

		// Create the Firebase login object
		this.authClient = new FirebaseSimpleLogin(this.dbRef, function(error, user) {

			// Error: not authenticated
			if (error) {
				console.log('Authentication failed: ' + error);

			// Success: user authenticated with Firebase
			} else if (user) {
				this.set('isLoggedIn', true);
				this.set('currentUser', user);
				console.log('Logged in');

				this.userExists();

			// Not logged in
			} else {
				this.set('isLoggedIn', false);
				this.set('curentUser', null);
				console.log('Not logged in');
			}
		}.bind(this));
	},

	createUser: function() {
		var userRef = new Firebase('https://muchplay.firebaseio.com/users/' + user.username);

		var properties = {
			id: user.username,
			name: user.username,
			displayName: user.displayName,
			avatarUrl: user.avatar_url
		};

		var controller = this;
		userRef.once('value', function(snapshot) {
			var user = this.store.createRecord('user', {
				ref: userRef
			});
			user.setProperties(properties);
			controller.set('currentUser', user);
			user.save(); // Save the user
		});
	},

	userExists: function() {
		var store = this.get('store');
		var currentUser = this.get('currentUser');
		var username = this.get('currentUser.displayName');

		// console.log(username);
		// username = username.replace(/[^a-zA-Z0-9 -]/g, '');
		// console.log(username);


		return this.get('store').find('user', username).then(function(user) {
			// User already exists so just return it
			console.log('exists');
			console.log(user);
			return user;
		}, function() {

			console.log('doesnt?');
			console.log(user);

			// // HACK: `find()` creates an entry in store.typeMapFor().idToRecord which prevents `createRecord()` from working
			// delete store.typeMapFor(store.modelFor('user')).idToRecord[username];

			// A user couldn't be found, so create a new user
			var user = store.createRecord('user', {
				displayName: currentUser.get('displayName'),
				id: currentUser.get('id'),
				created: new Date().getTime()
			});
			// Save the user
			user.save();
			return user;
		});
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
