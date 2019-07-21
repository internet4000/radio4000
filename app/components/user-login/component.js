import Ember from 'ember';

const {Component, get, inject, debug} = Ember;

export default Component.extend({
	firebaseApp: inject.service(),
	session: inject.service(),

	actions: {
		login(provider, email, password) {
			this.onLogin(provider, email, password)
		},

		async resetPassword(email) {
			const messages = get(this, 'flashMessages');

			if (!email) {
				messages.warning('Enter your e-mail address in the email field and click "Forgot password" again.');
				return;
			}

			const auth = await get(this, 'firebaseApp').auth();
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
