import Ember from 'ember';

// reading: http://www.webhook.com/blog/how-we-use-firebases-simple-login-with-ember-to-manage-authentication/

export default Ember.Object.extend({

	// creating a new authorization or authenticating a new session
	open: function(authorization) {
		Ember.debug('open');

		// This is what should be done after authentication
		let store = this.get('container').lookup('store:main');

		return new Ember.RSVP.Promise((resolve) => {
			return store.find('user', authorization.uid).then((user) => {

				// we have a user, set it and channel
				Ember.debug('open with user');
				Ember.run.bind(null, resolve({ currentUser: user }));

			}, () => {
				// no user found, create one
				Ember.debug('open without user');

				// but first avoid this bug about unresolved record
				store.recordForId('user', authorization.uid).unloadRecord();

				let newUser = store.createRecord('user', {
					id: authorization.uid,
					provider: authorization.provider,
					name: this._nameFor(authorization)
				});

				newUser.save().then((user) => {
					Ember.run.bind(null, resolve({ currentUser: user }));
				});
			});
		});
	},

	// validating an existing authorization (like a session stored in cookies)
	fetch: function() {
		// This is what should be done to determine how to fetch a session. Here I am
		// retrieving the auth from firebase and checking if I have a user for that auth.
		// If so, I set currentUser.
		let firebase = this.get('container').lookup('adapter:application').firebase;
		let store = this.get('container').lookup('store:main');

		// Ember.debug('firebase');
		// Ember.debug('fetch');
		let firebaseAuthAnswer = firebase.getAuth();
		// Ember.debug('firebaseAuthAnswer');

		return new Ember.RSVP.Promise(function(resolve, reject) {

			// Ember.debug(firebaseAuthAnswer, 'firebaseAuthAnswer is null');

			// we have something
			if (firebaseAuthAnswer) {

				// look for a user, then assign in to the session
				store.find('user', firebaseAuthAnswer.uid).then(function(user) {

					Ember.run.bind(null, resolve({ currentUser: user }));
				}, function() {

					// no user
					// Ember.debug('callback store.find.user from authdata');
					Ember.run.bind(null, reject('no session'));
				});

			} else {
				// return a null user because user is not logged in
				// The object containing the currentUser is merged onto the session. Because the session is injected onto controllers and routes, these values will be available to templates.
				// https://github.com/Vestorly/torii#adapters-in-torii
				// Ember.debug('no firebaseAuthAnswer');
				Ember.run.bind(null, resolve({ currentUser: null }));
			}
		});
	},

	// here an authorization is destroyed
	close: function() {
		// This is what should be done to teardown a session. Here I am unloading my
		// models and setting currentUser to null.
		let firebase = this.get('container').lookup('adapter:application').firebase;
		let store = this.get('container').lookup('store:main');

		return new Ember.RSVP.Promise(function(resolve) {
			store.unloadAll('user');
			firebase.unauth();
			resolve({ currentUser: null });
		});
	},

	_nameFor: function(auth) {
		if (auth.github) {
			return auth.github.username;
		} else if (auth.facebook) {
			return auth.facebook.displayName;
		} else if (auth.twitter) {
			return auth.twitter.displayName;
		} else if (auth.google) {
			return auth.google.displayName;
		} else {
			throw new Error('could not find a username!');
		}
	}
});
