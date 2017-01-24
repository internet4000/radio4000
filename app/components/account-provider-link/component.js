import Ember from 'ember';

const {Component, get, debug} = Ember;

export default Component.extend({
	tagName: ["button"],
	classNames: ["Btn"],
	extractProvider(name) {
		debug( `generating provider: ${name}` );
		let provider,
				auth = get(this, 'auth')();

		switch (name) {
		case "google":
			provider = new auth().GoogleAuthProvider();
			break;
		case "facebook":
			provider = new auth().FacebookAuthProvider();
			break;
		default:
			new Error("Provider is not supported for extraction")
			break;
		}
		console.log( "PROVIDER", provider );
		return provider;
	},
	click() {
		get(this, 'link')(this.extractProvider(get(this, 'providerName')));
	}
});
