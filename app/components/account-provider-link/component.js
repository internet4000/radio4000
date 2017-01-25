import Ember from 'ember';
import firebase from 'npm:firebase';

const {Component, get, debug} = Ember;

export default Component.extend({
	tagName: ['button'],
	classNames: ['Btn'],


	click() {
		// pass data up to action link (user account)
		get(this, 'link')(this.extractProvider(get(this, 'providerName')));
	},

	extractProvider(name) {
		const auth = firebase.auth;
		let provider;

		if (name === 'google') {
				provider = new auth.GoogleAuthProvider();
		} else if (name === 'facebook') {
				provider = new auth.FacebookAuthProvider();
		} else {
				throw new Error('Provider is not supported for extraction');
		}
		debug(`generating provider: ${name}`);
		debug(provider);

		return provider;
	}
});
