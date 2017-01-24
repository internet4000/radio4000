import Ember from 'ember';
import firebase from 'npm:firebase';

const {Component, get, debug} = Ember;

export default Component.extend({
	tagName: ["button"],
	classNames: ["Btn"],

	click() {
		get(this, 'link')(this.extractProvider(get(this, 'providerName')));
	},

	extractProvider(name) {
		const auth = firebase.auth;
		let provider;

		debug(`generating provider: ${name}`);

		switch (name) {
			case "google":
				provider = new auth.GoogleAuthProvider();
				break;
			case "facebook":
				provider = new auth.FacebookAuthProvider();
				break;
			default:
				new Error("Provider is not supported for extraction")
				break;
		}
		console.log("PROVIDER", provider);
		return provider;
	}
});
