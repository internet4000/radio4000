import Ember from 'ember';

const {Component, get, inject, debug} = Ember;

export default Component.extend({
	firebaseApp: inject.service(),
	session: inject.service(),

	actions: {
		login(provider, email, password) {
			this.sendAction('onLogin', provider, email, password);
		},

		resetPassword(email) {
			const auth = get(this, 'firebaseApp').auth();
			const messages = get(this, 'flashMessages');

			if (!email) {
				messages.warning('Enter your e-mail address in the email field and click "Forgot password" again.');
				return;
			}

			auth.sendPasswordResetEmail(email).then(() => {
				messages.success('Password reset. Check your email.', {
					autoClear: false
				});
			}).catch(err => {
				if (err.code === 'auth/user-not-found') {
					messages.warning(`Could not reset password for ${email}`);
				}
				debug(err);
			});
		}
	}
});
