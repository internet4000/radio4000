import Ember from 'ember';
import firebase from 'npm:firebase';

const {Controller, inject, get, set, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	flashMessages: inject.service(),

	newEmail: null,

	currentUser: null,
	providerIds: computed.mapBy('currentUser.providerData', 'providerId'),
	hasGoogle: computed('providerIds', function () {
		return get(this, 'providerIds').includes('google.com');
	}),
	hasFacebook: computed('providerIds', function () {
		return get(this, 'providerIds').includes('facebook.com');
	}),
	hasEmail: computed('providerIds', function () {
		return get(this, 'providerIds').includes('password');
	}),
	hasEverything: computed.equal('providerIds.length', 3),

	init() {
		this._super();
		this.updateCurrentUser();
	},

	willDestroy() {
		this._super();
		console.log('WHY IS THIS NOT CALLED!!! OMG');
		this.resetCurrentUser();
	},

	// This caches certain auth data on the controller
	// in order to build the 'hasProvider...' CPs.
	// Called after link/unlink and on init.
	updateCurrentUser() {
		let firebaseApp = get(this, 'firebaseApp');
		// Guard is necessary in our test.
		if (!firebaseApp) {
			return;
		}
		let currentUser = firebaseApp.auth().currentUser;
		set(this, 'currentUser', currentUser);
	},

	// Ensure the auth data we 'cache' is cleaned.
	resetCurrentUser() {
		console.log('reset');
		this.set('currentUser', null);
	},

	sendEmailVerification() {
		get(this, 'firebaseApp').auth().currentUser.sendEmailVerification();
		get(this, 'flashMessages').info(`Verification email sent`);
	},


		});
	},

	actions: {
		linkAccount(provider) {
			let messages = get(this, 'flashMessages');
			let auth = get(this, 'firebaseApp').auth();

			auth.currentUser.linkWithPopup(provider).then(user => {
				this.updateAccounts();
				messages.success(`Added ${provider.providerId} account`);
			}).catch(err => {
				messages.warning('Could not link account');
				debug(err);
			});
		},
		linkEmail(email, password) {
			let messages = get(this, 'flashMessages');
			let auth = get(this, 'firebaseApp').auth();
			let credential = firebase.auth.EmailAuthProvider.credential(email, password);

			auth.currentUser.link(credential).then(user => {
				this.updateAccounts();
				messages.success(`Added email account`);
				this.sendEmailVerification();
			}).catch(err => {
				messages.warning(err);
			});
		},
		unlinkAccount(providerId) {
			debug(`provider ${providerId} unlink starting`);
			get(this, 'firebaseApp').auth().currentUser.unlink(providerId).then(user => {
				debug(`provider ${providerId} un-linked; user: ${user}`);
				this.updateAccounts();
				if (providerId === 'password') {
					this.removeEmailOnly();
				}
			}).catch(err => {
				debug(`provider ${providerId} un-linked ERROR: ${err}`);
			});
		},
		verifyEmail() {
			this.sendEmailVerification();
		},
		resetPassword() {
			debug('todo reset password');
		},
		updateEmail(newEmail) {
			var user = get(this, 'firebaseApp').auth().currentUser;
			user.updateEmail(newEmail).then(result => {
				this.sendEmailVerification();
				debug(`update email sucess: ${result}`);
				console.log({user, result});
			}).catch(err => {
				throw new Error(err);
			});
		},
		removeEmail() {
			// this.updateEmail();
			var user = get(this, 'firebaseApp').auth().currentUser;
			user.updateProfile({
				email: ''
			}).then(data => {
				get(this, 'flashMessages').success('Email account removed');
				debug(`update email DATA: ${data}`);
			}).catch(err => {
				debug(`remove email ERROR`);
				throw new Error(err);
			});
		}
	}
});
