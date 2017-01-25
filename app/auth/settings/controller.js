import Ember from 'ember';

const {Controller, inject, computed, debug} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),
	session: inject.service(),
	userAccounts: computed('session', 'firebaseApp', function() {
		return this.get('firebaseApp').auth().currentUser.providerData.map(provider => {
			if (provider.providerId === 'facebook.com') {
				debug('provider: facebook');
				this.set('hasFacebook', true);
				return 'facebook';
			} else if (provider.providerId === 'google.com') {
				debug('provider: google')
				this.set('hasGoogle', true);
				return 'google';
			} else {
				debug('provider: default')
			}
		});
	}),
	hasGoogle: false,
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
