import Controller from '@ember/controller'
import Ember from 'ember';
const {get, computed} = Ember;

export default Controller.extend({
	hasSigned: computed.alias('session.currentUser.settings.signedUserAgreement'),
	loggedOut: computed.not('session.currentUser'),
	hideUserAgreements: computed.or('loggedOut', 'hasSigned'),
	actions: {
		signAgreement() {
			if (!get(this, 'session.currentUser')) return

			get(this, 'session.currentUser.settings').then(settings => {
				settings.set('signedUserAgreement', true)
				settings.save()
			})
		}
	}
})
