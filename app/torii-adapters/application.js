import Ember from 'ember';

// reading: http://www.webhook.com/blog/how-we-use-firebases-simple-login-with-ember-to-manage-authentication/

export default Ember.Object.extend({
	store: Ember.computed('', function() {
		return this.get('container').lookup('store:main');
	}),

	createSettings(user) {
		let newSettings = this.get('store').createRecord('user-setting', {
			user: user
		});

		newSettings.save().then((settings) => {
			user.set('settings', settings).save();
		});
	},

	// creating a new authorization or authenticating a new session
	open: function(authorization) {
		Ember.debug('torii:open');

		// This is what should be done after authentication
		let store = this.get('container').lookup('store:main');

		return new Ember.RSVP.Promise((resolve) => {
			return store.find('user', authorization.uid).then((user) => {

				// create settings for old users
				// now we create settings on user create
				user.get('settings').then((settings) => {
					Ember.debug(settings);
					if (!settings) {
						this.createSettings(user);
					}
				});

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
					this.createSettings(user);

					Ember.run.bind(null, resolve({ currentUser: user }));
				});
			});
		});
	},

	// validating an existing authorization (like a session stored in cookies)
	fetch: function() {
		Ember.debug('torii:fetch');

		// This is what should be done to determine how to fetch a session. Here I am
		// retrieving the auth from firebase and checking if I have a user for that auth.
		// If so, I set currentUser.
		let firebase = this.get('container').lookup('adapter:application').firebase;
		let store = this.get('container').lookup('store:main');

		let firebaseAuthAnswer = firebase.getAuth();
		Ember.debug('firebase answers getAuth()');

		// The object containing the currentUser is merged onto the session.
		// Because the session is injected onto controllers and routes,
		// these values will be available to templates.
		// https://github.com/Vestorly/torii#adapters-in-torii
		return new Ember.RSVP.Promise(function(resolve, reject) {
			Ember.debug('triggers fetch:return:promise, before if:firebaseAuthAnswer check');

			// what do we have in firebaseAuthAnswer
			if (firebaseAuthAnswer) {

				// look for a user, then assign in to the session
				Ember.debug('store.find.user with firebaseAuthAnswer.uid, promise');
				store.find('user', firebaseAuthAnswer.uid).then(function(user) {
					Ember.debug('store.find.user with firebaseAuthAnswer.uid, promise succeeds');
					Ember.run.bind(null, resolve({ currentUser: user }));
				}, function() {

					// no user
					// todo: seems to fail sometimes
					Ember.debug('store.find.user with firebaseAuthAnswer.uid, promise failed');
					Ember.run.bind(null, reject('store.find.user with firebaseAuthAnswer.uid, promise failed'));
				});

			} else {

				Ember.run.bind(null, reject('no session'));

				// return a null user because user is not logged in
				// Ember.debug('firebaseAuthAnswer is empty, user is not logged in');
				// // Ember.run.bind(null, resolve({ currentUser: null }));
				// Ember.run.bind(null, reject('firebaseAuthAnswer is empty, user is not logged in'));
			}
		});
	},

	// here an authorization is destroyed
	close: function() {
		Ember.debug('torii:close');
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
