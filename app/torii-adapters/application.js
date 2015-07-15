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
	open: function(auth) {
		var self = this;
		const store = this.get('store');

		return new Ember.RSVP.Promise((resolve, reject) => {

			return store.find('user', auth.uid)

				// we have a user, create settings if needed
				// and resolve
				.then((user) => {
					user.get('settings').then((settings) => {
						if (settings) { return; }
						this.createSettings(user);
					});

					run.bind(null, resolve({ currentUser: user }));
				})

				// no user, so create one
				.catch(() => {

					// but first avoid this bug about unresolved record
					// @todo maybe nut needed anymore?!
					store.recordForId('user', auth.uid).unloadRecord();

					let newUser = store.createRecord('user', {
						id: auth.uid,
						provider: auth.provider,
						name: this._nameFor(auth)
					}).save().then((newUser) => {
						this.createSettings(newUser);
						run.bind(null, resolve({ currentUser: newUser }));
					});
			});
		});
	},

	// validating an existing authorization (like a session stored in cookies)
	fetch: function() {
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
				reject('No session available');
			} else {
				resolve(this.open(auth));
			}
		});
	},

	// This is what should be done to teardown a session. Here I am unloading my
	// models and setting currentUser to null. here an authorization is destroyed
	close: function() {
		let firebase = this.get('firebase');

		firebase.unauth();

		// @todo keep this until sure we don't need it
		// let store = this.get('store');
		// store.unloadAll('user');

		return Ember.RSVP.resolve();
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
