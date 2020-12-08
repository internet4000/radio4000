import Controller from '@ember/controller'
import Ember from 'ember';
const {get, computed} = Ember;

export default Controller.extend({
	hasSigned: computed.alias('session.currentUser.settings.signedUserAgreement'),
	loggedOut: computed.not('session.currentUser'),
	hideUserAgreements: computed.or('loggedOut', 'hasSigned'),
	actions: {
		signAgreement() {
			get(this, 'session.currentUser.settings').then(settings => {
				if (!settings) {
					const flashMessages = get(this, 'flashMessages')
					flashMessages.success(`Our excuses. Settings signedUserAgreement failed to be saved... try again later`);
				} else {
					settings.set('signedUserAgreement', true)
					settings.save()
				}
			})
		}
	}
})
