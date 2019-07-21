import Ember from 'ember';
import firebase from 'firebase';

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
		debug('updated current user');
	},

	// Ensure the auth data we 'cache' is cleaned.
	resetCurrentUser() {
		set(this, 'currentUser', null);
		set(this, 'providerData', null);
	},

	sendEmailVerification() {
		get(this, 'firebaseApp').auth().currentUser.sendEmailVerification();
		get(this, 'flashMessages').success(`Email sent. Check your inbox to verify your email.`, {sticky: true});
	},

	handleError(err, _this) {
		debug('@handledError');
		let messages = get(_this, 'flashMessages');
		let msg;
		let options = {
			timeout: 8000
		};

		if (err.code === 'auth/credential-already-in-use') {
			msg = 'This account is already in use.';
		} else if (err.code === 'auth/email-already-in-use') {
			msg = 'This email is already in use.';
		} else if (err.code === 'auth/requires-recent-login') {
			msg = 'This is a SENSITIVE operation, logout and login again to perform this action.';
			options.sticky = true;
		} else if (err.code === 'auth/cancelled-popup-request') {
			debug(err.code, err.message)
			return
		} else {
			msg = 'An error occured. Please refresh the page and try again.';
			debug('error in accounts.');
			throw new Error(err);
		}
		messages.warning(msg, options);
	},

	// Link a new provider to the current user.
	// Send it either a single auth provider object (google+facebook)
	// OR string "password" + email password
	linkAccount(provider, email, password) {
		let auth = get(this, 'firebaseApp').auth();
		let messages = get(this, 'flashMessages');
		let promise;

		if (provider === 'password') {
			let credential = firebase.auth.EmailAuthProvider.credential(email, password);
			promise = auth.currentUser.link(credential);
		} else {
			promise = auth.currentUser.linkWithPopup(provider);
		}

		return promise.then(() => {
			this.updateCurrentUser();
			messages.success(`Account added.`);
		});
	},

	unlinkAccount(providerId) {
		let auth = get(this, 'firebaseApp').auth();
		return auth.currentUser.unlink(providerId)
			.then(() => {
				get(this, 'flashMessages').success(`Account removed.`, {timeout: 8000});
				this.updateCurrentUser();
			})
			.catch(this.handleError);
	},

	actions: {
		linkAccount(provider) {
			this.linkAccount(provider).catch(err => this.handleError(err, this));
		},
		linkEmail(email, password) {
			this.linkAccount('password', email, password).then(() => {
				this.sendEmailVerification();
			}).catch(err => this.handleError(err, this));
		},
		unlinkAccount(providerId) {
			this.unlinkAccount(providerId);
		},
		verifyEmail() {
			this.sendEmailVerification();
		},
		updateEmail(newEmail) {
			var user = get(this, 'firebaseApp').auth().currentUser;
			let messages = get(this, 'flashMessages');
			user.updateEmail(newEmail).then(result => {
				this.sendEmailVerification();
				debug(`update email sucess: ${result}`);
			}).catch(err => {
				if (err.code === 'auth/requires-recent-login') {
					messages.warning(`For your security, please log in again before updating your email address.`, {
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
			let user = get(this, 'firebaseApp').auth().currentUser;
			user.updateProfile({
				email: ''
			}).then(data => {
				get(this, 'flashMessages').success('Email account removed');
				debug(`update email DATA: ${data}`);
			}).catch(err => {
				debug(`remove email ERROR`);
				throw new Error(err);
			});
		},
		deletedUser() {
			get(this, 'flashMessages').success('Your Radio4000 account and all its data were deleted. Farewell!', {
				sticky: true
			});
			this.transitionToRoute('auth.logout');
		},
		resetPassword() {
			const auth = get(this, 'firebaseApp').auth();
			const messages = get(this, 'flashMessages');
			const email = get(this, 'currentUser.email')

			if (!email) {
				messages.warning('Add the email provider to be able to set, anbd reset your password.');
				return;
			}

			auth.sendPasswordResetEmail(email).then(() => {
				messages.success('A link to change your password has been sent to your email.', {
					autoClear: false
				});
			}).catch(err => {
				if (err.code === 'auth/user-not-found') {
					messages.warning(`Could not reset password for ${email}`);
				}
			});
		}
	}
});
