import Ember from 'ember';

const {Controller} = Ember;

export default Controller.extend({
	actions: {
		// Logs in a user. Provider has to match what we've enabled in Firebase authentication. That is 'google' or 'facebook'.
		// a) if the user has a channel, we transition to it
		// b) otherwise we transition to create a new channel
		login(data) {
				const flashMessages = get(this, 'flashMessages');
				console.log('data',data);
				get(this, 'session').open('firebase', {
						provider,
						email,
						password
				}).then(() => {
				flashMessages.info('You are now signed in!');
				this.redirectIfAuthenticated(); // on the route
			}).catch(err => {
				console.log(err);
			});
		}
	}
});
