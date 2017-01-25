import Ember from 'ember';

const {Controller, inject} = Ember;

export default Controller.extend({
	firebaseApp: inject.service(),

	actions: {
		linkAccount(provider) {
			console.log('provider:controler', provider);
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
