/* jshint unused:false */
import Ember from 'ember';

const { computed, debug, inject, run } = Ember;

export default Ember.Object.extend({
	firebase: inject.service(),
	store: inject.service(),

	createSettings(user) {
		let newSettings = this.get('store').createRecord('user-setting', {
			user: user
		});

		newSettings.save().then((settings) => {
			user.set('settings', settings).save().then(() => {
				Ember.debug('saved user settings');
			});
		});
	},

	// creating a new authorization or authenticating a new session
	open(auth) {
		var self = this;
		const store = this.get('store');

		return new Ember.RSVP.Promise((resolve, reject) => {

			debug('finding user', auth.uid);
			return store.findRecord('user', auth.uid)

				// we have a user, create settings if needed
				// and resolve
				.then((user) => {
					debug('found user');

					user.get('settings').then((settings) => {
						if (settings) { return; }
						debug('no settings for user, creating them');
						this.createSettings(user);
					});

					run.bind(null, resolve({ currentUser: user }));
				})

				// no user, so create one
				.catch(() => {

					debug('no user found, creating one');

					// but first avoid this bug about unresolved record
					// @todo maybe nut needed anymore?!
					// store.recordForId('user', auth.uid).unloadRecord();
					this.createUser(auth).then((user) => {
						debug('created a user');
						run.bind(null, resolve({ currentUser: user }));
					});
			});
		});
	},

	// validating an existing authorization (like a session stored in cookies)
	fetch() {
		let firebase = this.get('firebase');

		// This is what should be done to determine how to fetch a session. Here I am
		// retrieving the auth from firebase and checking if I have a user for that auth.
		// If so, I set currentUser.

		// The object containing the currentUser is merged onto the session.
		// Because the session is injected onto controllers and routes,
		// these values will be available to templates.
		// https://github.com/Vestorly/torii#adapters-in-torii

		return new Ember.RSVP.Promise((resolve, reject) => {
			let auth = firebase.getAuth();

			if (auth == null) {
				debug('no auth');
				reject('No session available');
			}

			debug('fetch resolving, looking for user');
			this.store.findRecord('user', auth.uid).then((user) => {
				debug('found user');
				resolve({ currentUser: user });
			}, () => {
				debug('no user found');
				reject(new Error('no user found'));
			});
		});
	},

	// This is what should be done to teardown a session. Here I am unloading my
	// models and setting currentUser to null. here an authorization is destroyed
	close() {
		let firebase = this.get('firebase');

		firebase.unauth();

		// @todo keep this until sure we don't need it
		// let store = this.get('store');
		// store.unloadAll('user');

		return Ember.RSVP.resolve();
	},

	createUser(auth) {
		let user = this.store.createRecord('user', {
			id: auth.uid,
			provider: auth.provider,
			name: this._nameFor(auth)
		});

		return user.save().then((user) => {
			debug('created user');
			this.createSettings(user);
			return user;
		}, () => {
			debug('couldnt create user');
		});
	},

	_nameFor(auth) {
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
