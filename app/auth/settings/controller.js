import Ember from 'ember';

const {Controller, inject, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	flashMessages: inject.service(),
	init() {
		this._super();
		this.getActiveUserAccounts();
	},
	accounts: null,
	providerData: null,
	getActiveUserAccounts() {
		// This called will set the `accounts` array, triggering the `hasProviderName`s CPs
		// used to display link/unLink buttons for each of them
		// this method is called after each link/unlink and on page controller load
		// because the firebaseApp.auth() cannot be made a CP
		let providerData = this.get('firebaseApp').auth().currentUser.providerData;
		let accounts = providerData.mapBy('providerId');
		this.set('accounts', accounts);
		this.set('providerData', providerData);
	},
	hasGoogle: computed('accounts', function() {
		return this.get('accounts').contains('google.com');
	}),
	hasFacebook: computed('accounts', function() {
		return this.get('accounts').contains('facebook.com');
	}),
	hasEmail: false,

	actions: {
		linkAccount(provider) {
			let auth = this.get('firebaseApp').auth();
			auth.currentUser.linkWithPopup(provider).then(user => {
				debug(`Accounts successfully linked: ${user}`);
				this.getActiveUserAccounts();
			}).catch(error => {
				debug(error);
				this.get('flashMessages').info(error)
			});
		},
		unlinkAccount(providerId) {
			debug(`provider ${providerId} unlink starting`);
			this.get('firebaseApp').auth().currentUser.unlink(providerId).then(user => {
				debug(`provider ${providerId} un-linked; user: ${user}`);
				this.getActiveUserAccounts();
			}).catch(error => {
				debug(`provider ${providerId} un-linked ERROR: ${error}`);
			});
		}
	}
});
