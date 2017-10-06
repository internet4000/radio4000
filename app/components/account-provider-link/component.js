import Component from '@ember/component';
import { get } from '@ember/object';
import firebase from 'npm:firebase';

export default Component.extend({
	tagName: ['article'],
	classNames: ['ProviderAccount'],

	extractProvider(providerId) {
		const auth = firebase.auth;
		if (providerId === 'google.com') {
			return new auth.GoogleAuthProvider();
		} else if (providerId === 'facebook.com') {
			return new auth.FacebookAuthProvider();
		}
		throw new Error('Provider is not supported for extraction');
	},

	actions: {
		add() {
			// Pass provider object up to action link.
			const provider = this.extractProvider(get(this, 'providerId'));
			get(this, 'onLink')(provider);
		}
	}
});
