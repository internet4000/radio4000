import Ember from 'ember';
import firebase from 'npm:firebase';

const {Controller, inject, get, set, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	flashMessages: inject.service(),

	newEmail: null,
	currentUser: null,
	providerData: null,

	providerIds: computed.mapBy('providerData', 'providerId'),
	hasGoogle: computed('providerIds', function () {
		return get(this, 'providerIds').includes('google.com');
	}),
	hasFacebook: computed('providerIds', function () {
		return get(this, 'providerIds').includes('facebook.com');
	}),
	hasEmail: computed('providerIds', function () {
		return get(this, 'providerIds').includes('password');
	}),
	// password+google+facebook = 3
	hasEverything: computed.equal('providerIds.length', 3),

	init() {
		this._super();
		this.updateCurrentUser();
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
		set(this, 'providerData', currentUser.providerData);
		console.log('updated current user');
	},

	// Ensure the auth data we 'cache' is cleaned.
	resetCurrentUser() {
		set(this, 'currentUser', null);
		set(this, 'providerData', null);
		console.log('reset current user');
	},

	sendEmailVerification() {
		get(this, 'firebaseApp').auth().currentUser.sendEmailVerification();
		get(this, 'flashMessages').info(`Verification email sent`);
	},

	// Link a new provider to the current user.
	// Send it either a single auth provider object (google+facebook)
	// OR string "password" + email password
	linkAccount(provider, email, password) {
		let auth = get(this, 'firebaseApp').auth();
		let messages = get(this, 'flashMessages');
		let promise;

		if (provider === 'password') {
			let credential = firebase.auth.EmailAuthProvider
				.credential(email, password);
			console.log(credential);
			promise = auth.currentUser.link(credential);
		} else {
			console.log(provider);
			promise = auth.currentUser.linkWithPopup(provider);
		}

		return promise.then(() => {
			this.updateCurrentUser();
			messages.success(`Added ${provider.providerId || name} account`);
		}, err => {
			console.log(err);
			if (err.code === 'auth/credential-already-in-use') {
				messages.warning('Could not add account. Credentials are already in use.');
			} else if (err.code === 'auth/email-already-in-use') {
				messages.warning(`Could not add account. The e-mail ${email} is already in use.`);
			} else if (err.code === 'auth/requires-recent-login') {
				messages.warning(`For your security, please log out and sign back in to add a new account.`, {
					sticky: true
				});
			} else {
				messages.warning('Could not add account.');
			}
			throw new Error(err);
		});
	},

	unlinkAccount(providerId) {
		let auth = get(this, 'firebaseApp').auth();
		return auth.currentUser.unlink(providerId)
			.then(user => {
				debug(`provider ${providerId} un-linked; user: ${user}`);
				this.updateCurrentUser();
				// if (providerId === 'password') {
				// 	this.removeEmailOnly();
				// }
			})
			.catch(err => {
				debug(`provider ${providerId} un-linked ERROR`);
				throw new Error(err);
			});
	},

	actions: {
		linkAccount(provider) {
			console.log(provider);
			this.linkAccount(provider);
		},
		linkEmail(email, password) {
			this.linkAccount('password', email, password).then(() => {
				this.sendEmailVerification();
			});
		},
		unlinkAccount(providerId) {
			this.unlinkAccount(providerId);
		},
		verifyEmail() {
			this.sendEmailVerification();
		},
		resetPassword() {
			debug('todo reset password');
		},
		updateEmail(newEmail) {
			var user = get(this, 'firebaseApp').auth().currentUser;
			let messages = get(this, 'flashMessages');
			user.updateEmail(newEmail).then(result => {
				this.sendEmailVerification();
				debug(`update email sucess: ${result}`);
				console.log({user, result});
			}).catch(err => {
				if (err.code === 'auth/requires-recent-login') {
					messages.warning(err.message, {
						sticky: true
					});
				} else {
					messages.warning(err.message);
				}
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
