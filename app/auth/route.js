import Ember from 'ember';

const {Route, get, inject, debug} = Ember;

export default Route.extend({
	flashMessages: inject.service(),
	onLoginError(err) {
		const messages = get(this, 'flashMessages');
		let msg;

		if (err.code === 'auth/email-not-verified') {
			msg = 'This email address is not verified. Check your inbox.';
			this.transitionTo('auth.login');
		} else if (err.code === 'auth/invalid-email') {
			msg = 'Invalid email.';
		} else if (err.code === 'auth/user-disabled') {
			msg = 'This account has been disabled. Contact an admin.';
		} else if (err.code === 'auth/user-not-found') {
			msg = 'This account does not exist.';
		} else if (err.code === 'auth/wrong-password') {
			message = 'Password and email do not match.';
		} else if (err.code === 'auth/internal-error') {
			message = 'Internal error, please try again later.';
			debug(`auth/internal-error: ${err}`);
		} else {
			debug(`Login error is not referenced: ${err}`);
		}

		if (msg) {
			mssages.warning(msg, {timeout: 10000});
		}
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
