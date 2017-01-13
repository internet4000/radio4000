import Ember from 'ember';

const {Controller, get} = Ember;

export default Controller.extend({
		onLoginError(data) {
				get(this, 'flashMessages').info(data.message);
				// auth/invalid-email
				// auth/user-disabled
				// auth/user-not-found
				// auth/wrong-password
		},
		actions: {
				// Logs in a user. Provider has to match what we've enabled in Firebase authentication.
				// That is: 'password' or 'google' or 'facebook'
				login(data) {
						const flashMessages = get(this, 'flashMessages');
						get(this, 'session').open('firebase', data).then(() => {
								flashMessages.info('You are now signed in!');
								this.send('redirectAfterAuth');
						}).catch(error => {
								this.onLoginError(error)
						});
				},
				redirectAfterAuth() {
						// on the route, true to bubble up
						return true;
				}
		}
});
