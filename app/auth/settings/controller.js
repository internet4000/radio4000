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
		let currentUser = get(this, 'firebaseApp').auth().currentUser;
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
		}).catch(error => {
			debug(`update email ERROR: ${error}`);
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

	actions: {
		linkAccount(provider) {
			get(this, 'firebaseApp').auth().currentUser.linkWithPopup(provider).then(user => {
				debug(`Accounts successfully linked: ${user}`);
				this.updateAccounts();
				get(this, 'flashMessages').success(`Added ${provider.providerId} account`);
			}).catch(error => {
				console.log('could not link account');
				console.log(error);
				get(this, 'flashMessages').warning(error);
			});
		},
		linkEmail(email, password) {
			let auth = get(this, 'firebaseApp').auth();
			let credential = firebase.auth.EmailAuthProvider.credential(email, password);
			auth.currentUser.link(credential).then(user => {
				this.sendEmailVerification();
				this.updateAccounts();
				debug(`Added ${user} account`);
			}).catch(error => {
				get(this, 'flashMessages').warning(error);
			});
		},
		unlinkAccount(providerId) {
			debug(`provider ${providerId} unlink starting`);
			get(this, 'firebaseApp').auth().currentUser.unlink(providerId).then(user => {
				debug(`provider ${providerId} un-linked; user: ${user}`);
				this.updateAccounts();
				if (providerId === 'password') {
					this.updateEmail('');
				}
			}).catch(error => {
				debug(`provider ${providerId} un-linked ERROR: ${error}`);
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
