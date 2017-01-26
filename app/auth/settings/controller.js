import Ember from 'ember';

const {Controller, inject, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	init() {
		this._super();
		this.getActiveUserAccounts();
	},
	accounts: [],
	getActiveUserAccounts() {
		let auth = this.get('firebaseApp').auth();
		let accounts = auth.currentUser.providerData.map(provider => {
			if (provider.providerId === 'facebook.com') {
				debug('provider = facebook');
				return 'facebook';
			} else if (provider.providerId === 'google.com') {
				debug('provider = google');
				return 'google';
			} else {
				debug('unknown provider');
			}
			this.set('accounts', accounts);
		});
	},
	hasGoogle: computed('accounts', function() {
		return this.get('accounts').contains('google');
	}),
	hasFacebook: false,
	hasEmail: false,

	actions: {
		linkAccount(provider) {
			let auth = this.get('firebaseApp').auth();
			auth.currentUser.linkWithPopup(provider).then(result => {
				Ember.debug('Accounts successfully linked');
				Ember.debug(result.credential, result.user);
			}).catch(err => {
				Ember.debug(err);
			});
		}
	}
});
