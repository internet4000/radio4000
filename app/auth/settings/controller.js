import Ember from 'ember';

const {Controller, inject, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	init() {
		this._super();
		this.getActiveUserAccounts();
	},
	accounts: null,
	getActiveUserAccounts() {
		// This called will set the `accounts` array, triggering the `hasProviderName`s CPs
		// used to display link/unLink buttons for each of them
		// this method is called after each link/unlink and on page controller load
		// because the firebaseApp.auth() cannot be made a CP
		let accounts = this.get('firebaseApp').auth().currentUser.providerData.map(provider => {
			if (provider.providerId === 'facebook.com') {
				debug('provider = facebook');
				return 'facebook';
			} else if (provider.providerId === 'google.com') {
				debug('provider = google');
				return 'google';
			} else {
				debug('unknown provider');
			}
		});
		this.set('accounts', accounts);
	},
	hasGoogle: computed('accounts', function() {
		return this.get('accounts').contains('google');
	}),
	hasFacebook: computed('accounts', function() {
		return this.get('accounts').contains('facebook');
	}),
	hasEmail: false,

	actions: {
		linkAccount(provider) {
			let auth = this.get('firebaseApp').auth();
			auth.currentUser.linkWithPopup(provider).then(result => {
				Ember.debug('Accounts successfully linked');
				this.getActiveUserAccounts();
				Ember.debug(result.credential, result.user);
			}).catch(err => {
				Ember.debug(err);
			});
		}
	}
});
