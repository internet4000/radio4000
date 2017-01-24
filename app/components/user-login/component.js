import Ember from 'ember';

const {Component, get, inject} = Ember;

export default Component.extend({
	firebaseApp: inject.service(),

	actions: {
		login(provider, email, password) {
			this.sendAction('onLogin', provider, email, password);
		},

		resetPassword(email) {
			const auth = get(this, 'firebaseApp').auth();

			if (!email) {
				get(this, 'flashMessages').warning('Enter your e-mail address to reset your email.');
			}

			auth.sendPasswordResetEmail(email)
				.then(() => {
					get(this, 'flashMessages').success('Password reset. Check your email.', {
						autoClear: false
					});
				})
				.catch(err => Ember.debug(err));
		}
	}
});
