import Ember from 'ember';

const {Route, get, inject} = Ember;

export default Route.extend({
	flashMessages: inject.service(),
	onLoginError(err) {
		let messages = 	get(this, 'flashMessages');
		messages.info(err.message, {
			timeout: 10000
		});

		if (err.name === 'auth/email-not-verified') {
			this.transitionTo('auth.login');
		}
		// auth/invalid-email
		// auth/user-disabled
		// auth/user-not-found
		// auth/wrong-password
	},
	actions: {
		login(provider, email, password) {
			const flashMessages = get(this, 'flashMessages');

			let data = {
				provider,
				email,
				password
			};

			get(this, 'session').open('firebase', data).then(() => {
				flashMessages.info('You are now signed in!');
				this.send('redirectAfterAuth');
			}).catch(error => {
				this.onLoginError(error);
			});
		},
		redirectAfterAuth() {
			return get(this, 'session.currentUser.channels').then(channels => {
				const userChannel = get(channels, 'firstObject');
				if (userChannel) {
					return this.transitionTo('channel', userChannel);
				}
				return this.transitionTo('channels.new');
			});
		}
	}
});
