/* jshint unused:false */
import Ember from 'ember';

const { computed, debug, run } = Ember;

// reading: http://www.webhook.com/blog/how-we-use-firebases-simple-login-with-ember-to-manage-authentication/

export default Ember.Object.extend({
	store: Ember.inject.service(),

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
		// debug('torii:open');

		// This is what should be done after authentication
		let store = this.get('container').lookup('store:main');

		return new Ember.RSVP.Promise((resolve) => {
			return store.find('user', authorization.uid).then((user) => {

				// create settings for old users
				// now we create settings on user create
				user.get('settings').then((settings) => {
					// debug(settings);
					if (!settings) {
						this.createSettings(user);
					}
				});

				// we have a user, set it and channel
				// debug('open with user');
				run.bind(null, resolve({ currentUser: user }));

			}, () => {
				// no user found, create one
				// debug('open without user');

				// but first avoid this bug about unresolved record
				store.recordForId('user', authorization.uid).unloadRecord();

				let newUser = store.createRecord('user', {
					id: authorization.uid,
					provider: authorization.provider,
					name: this._nameFor(authorization)
				});

				newUser.save().then((user) => {
					this.createSettings(user);

					run.bind(null, resolve({ currentUser: user }));
				});
			});
		});
	},

	// validating an existing authorization (like a session stored in cookies)
	fetch: function() {
		// debug('torii:fetch');

		// This is what should be done to determine how to fetch a session. Here I am
		// retrieving the auth from firebase and checking if I have a user for that auth.
		// If so, I set currentUser.
		let firebase = this.get('container').lookup('adapter:application').firebase;
		let firebaseAuthAnswer = firebase.getAuth();

		// The object containing the currentUser is merged onto the session.
		// Because the session is injected onto controllers and routes,
		// these values will be available to templates.
		// https://github.com/Vestorly/torii#adapters-in-torii
		return new Ember.RSVP.Promise((resolve, reject) => {
			// debug('triggers fetch:return:promise, before if:firebaseAuthAnswer check');

			// what do we have in firebaseAuthAnswer
			if (firebaseAuthAnswer) {

				// look for a user, then assign in to the session
				// debug('store.find.user with firebaseAuthAnswer.uid, promise');
				this.get('store').find('user', firebaseAuthAnswer.uid).then(function(user) {
					// debug('store.find.user with firebaseAuthAnswer.uid, promise succeeds');
					run.bind(null, resolve({ currentUser: user }));
				}, function() {

					// no user
					// todo: seems to fail sometimes
					// debug('store.find.user with firebaseAuthAnswer.uid, promise failed');
					run.bind(null, reject('store.find.user with firebaseAuthAnswer.uid, promise failed'));
				});

			} else {

				run.bind(null, reject('no session'));

				// return a null user because user is not logged in
				// debug('firebaseAuthAnswer is empty, user is not logged in');
				// // run.bind(null, resolve({ currentUser: null }));
				// run.bind(null, reject('firebaseAuthAnswer is empty, user is not logged in'));
			}
		});
	},

	// here an authorization is destroyed
	close: function() {
		// debug('torii:close');
		// This is what should be done to teardown a session. Here I am unloading my
		// models and setting currentUser to null.
		let firebase = this.get('container').lookup('adapter:application').firebase;
		let store = this.get('store');

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
