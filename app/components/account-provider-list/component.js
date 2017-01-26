import Ember from 'ember';

const {Component, computed} = Ember;

export default Component.extend({
	classNames: ['ProviderAccounts'],
	moreThanOneAccount: computed.gt('providerData.length', 1),
	actions: {
		unlink(providerId) {
			console.log( providerId );

			this.get('unlink')(providerId);

		}
}
});
