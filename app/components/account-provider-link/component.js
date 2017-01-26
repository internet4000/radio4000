import Ember from 'ember';
import firebase from 'npm:firebase';

const {Component, get} = Ember;

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
			// pass data up to action link (user account)
			const provider = this.extractProvider(get(this, 'providerId'));
			get(this, 'link')(provider);
		}
	}
});
