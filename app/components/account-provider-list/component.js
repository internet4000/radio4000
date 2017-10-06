import { gt, equal } from '@ember/object/computed';
import Component from '@ember/component';

export default Component.extend({
	classNames: ['ProviderAccounts'],
	moreThanOneAccount: gt('providerData.length', 1),
	onlyOneAccount: equal('providerData.length', 1)
});
