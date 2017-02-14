import Ember from 'ember';

const {Route, get, inject, debug} = Ember;

export default Route.extend({
	flashMessages: inject.service(),
	onLoginError(err) {
		let message;

		if (err.code === 'auth/email-not-verified') {
			message = 'This email address is not verified. Check your inbox.';
			this.transitionTo('auth.login');
		} else if (err.code === 'auth/invalid-email') {
			message = 'Invalid email.';
		} else if (err.code === 'auth/user-disabled') {
			message = 'This account has been disabled. Contact an admin.';
		} else if (err.code === 'auth/user-not-found') {
			message = 'This account does not exist.';
		} else if (err.code === 'auth/wrong-password') {
			message = 'Password does not match email.';
		} else {
			debug('Login error is not referenced');
		}
		this.sendErrorMessage(message);
	},
	sendErrorMessage(message) {
		get(this, 'flashMessages').info(message, {
			timeout: 10000
		});
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
