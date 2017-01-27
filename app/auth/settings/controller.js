import Ember from 'ember';
import firebase from 'npm:firebase';

const {Controller, inject, get, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	flashMessages: inject.service(),
	init() {
		this._super();
		this.updateAccounts();
	},
	accounts: null,
	currentUserData: null,
	providerData: null,
	updateAccounts() {
		// This called will set the `accounts` array, triggering the `hasProviderName`s CPs
		// used to display link/unLink buttons for each of them
		// this method is called after each link/unlink and on page controller load
		// because the firebaseApp.auth() cannot be made a CP
		let currentUserData = this.get('firebaseApp').auth().currentUser;
		let providerData = currentUserData.providerData;
		let accounts = providerData.mapBy('providerId');
		console.log( "accounts", accounts );

		var user = this.get('firebaseApp').auth().currentUser;
		console.log( "user", user );


		this.setProperties({
			'accounts': accounts,
			'currentUserData': currentUserData,
			'providerData': providerData
		});
	},
	updateEmail(newEmail) {
		var user = this.get('firebaseApp').auth().currentUser;
		user.updateEmail(newEmail).then(result => {
			this.sendConfirmationEmail();
			debug(`update email sucess: ${result}`);
			console.log( 'user', user );
		}).catch(error => {
			debug(`update email ERROR: ${error}`);
		});
	},
	sendConfirmationEmail() {
		this.get('firebaseApp').auth().currentUser.sendEmailVerification();
		debug(`Confirmation email sent`);
	},
	hasGoogle: computed('accounts', function() {
		return this.get('accounts').includes('google.com');
	}),
	hasFacebook: computed('accounts', function() {
		return this.get('accounts').includes('facebook.com');
	}),
	hasEmail: computed('accounts', function() {
		return this.get('accounts').includes('password');
	}),

	actions: {
		linkAccount(provider) {
			this.get('firebaseApp').auth().currentUser.linkWithPopup(provider).then(user => {
				debug(`Accounts successfully linked: ${user}`);
				this.updateAccounts();
			}).catch(error => {
				console.log('could not link account');
				console.log(error);
				this.get('flashMessages').info(error)
			});
		},
		linkEmail(email, password) {
			let auth = this.get('firebaseApp').auth();
			let credential = firebase.auth.EmailAuthProvider.credential(email, password);
			auth.currentUser.link(credential).then(user => {
				this.sendConfirmationEmail;
				this.getActiveUserAccounts();
				debug(`Account linking success: ${user}`);
			}).catch(error => {
				this.get('flashMessages').info(error)
			});
		},
		unlinkAccount(providerId) {
			debug(`provider ${providerId} unlink starting`);
			this.get('firebaseApp').auth().currentUser.unlink(providerId).then(user => {
				debug(`provider ${providerId} un-linked; user: ${user}`);
				this.updateAccounts();
				if(providerId === 'password') {
					this.updateEmail('');
				}
			}).catch(error => {
				debug(`provider ${providerId} un-linked ERROR: ${error}`);
			});
		},
		resetPassword() {
		}
	}
});
