import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['ProviderAccounts'],
	moreThanOneAccount: computed.gt('providerData.length', 1),
	onlyOneAccount: computed.equal('providerData.length', 1),
	actions: {
		unlink(providerId) {
			this.get('unlink')(providerId);
		},
		resetPassword() {

		}
	}
});
