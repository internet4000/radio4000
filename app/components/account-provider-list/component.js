import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['ProviderAccounts'],
	moreThanOneAccount: computed.gt('currentUserData.providerData.length', 1),
	onlyOneAccount: computed.equal('currentUserData.providerData.length', 1),
	actions: {
		unlink(providerId) {
			this.get('unlink')(providerId);
		}
	}
});
