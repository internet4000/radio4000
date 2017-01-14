import Ember from 'ember';

const {Controller} = Ember;

export default Controller.extend({
	actions: {
		// Logs in a user. Provider has to match what we've enabled in Firebase authentication.
		// That is: 'password' or 'google' or 'facebook'
		login(data) {
			return data;
		},
		redirectAfterAuth() {
			// on the route, true to bubble up
			return true;
		}
	}
});
