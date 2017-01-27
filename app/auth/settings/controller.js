import Ember from 'ember';
import firebase from 'npm:firebase';

const {Controller, inject, get, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	flashMessages: inject.service(),

	providerData: null,
	providerIds: computed.mapBy('providerData', 'providerId'),
	emailVerified: null,

	init() {
		this._super();
		this.updateAccounts();
	},

	// This called will set the `providerData` array, triggering the `hasProviderName`s CPs
	// used to display link/unLink buttons for each of them
	// this method is called after each link/unlink and on page controller load
	// because the firebaseApp.auth() cannot be made a CP
	updateAccounts() {
		let firebaseApp = get(this, 'firebaseApp');
		// This guard is necessary in our test.
		if (!firebaseApp) {
			return;
		}
		let currentUser = firebaseApp.auth().currentUser;
		let providerData = currentUser.providerData;
		let emailVerified = currentUser.emailVerified;

		console.log(providerData, emailVerified);

		this.setProperties({
			providerData,
			emailVerified
		});
	},

	updateEmail(newEmail) {
		var user = get(this, 'firebaseApp').auth().currentUser;
		user.updateEmail(newEmail).then(result => {
			this.sendEmailVerification();
			debug(`update email sucess: ${result}`);
			console.log('user', user);
		}).catch(err => {
			debug(`update email ERROR: ${err}`);
		});
	},

	sendEmailVerification() {
		get(this, 'firebaseApp').auth().currentUser.sendEmailVerification();
		get(this, 'flashMessages').info(`Verification email sent`);
	},

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

	willDestroy() {
		this._super();
		// Ensure the auth data we 'cache' is cleaned.
		this.setProperties({
			providerData: null,
			emailVerified: null
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
				console.log(err);
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
					this.updateEmail(null);
				}
			}).catch(err => {
				debug(`provider ${providerId} un-linked ERROR: ${err}`);
			});
		},
		verifyEmail() {
			this.sendEmailVerification();
		},
		resetPassword() {
			console.log('todo reset password');
		}
	}
});
