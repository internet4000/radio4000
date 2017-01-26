import Ember from 'ember';
import firebase from 'npm:firebase';

const {Component, get, debug} = Ember;

export default Component.extend({
	tagName: ['button'],
	classNames: ['Btn'],


	click() {
		// pass data up to action link (user account)
		get(this, 'link')(this.extractProvider(get(this, 'providerId')));
	},

	extractProvider(providerId) {
		const auth = firebase.auth;
		let provider;

		if (providerId === 'google.com') {
			provider = new auth.GoogleAuthProvider();
		} else if (providerId === 'facebook.com') {
			provider = new auth.FacebookAuthProvider();
		} else {
			throw new Error('Provider is not supported for extraction');
		}
		return provider;
	}
});
