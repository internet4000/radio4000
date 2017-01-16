import Ember from 'ember';

const {Component, get, inject} = Ember;

export default Component.extend({
	firebaseApp: inject.service(),

	actions: {
		login(provider, email, password) {
			get(this, 'onLogin')(provider, email, password);
		},

		resetPassword(email) {
			const auth = get(this, 'firebaseApp').auth();
			auth.sendPasswordResetEmail(email)
				.then(() => {
					get(this, 'notifications').success('Password reset. Check your email.', {
						autoClear: false
					});
				})
				.catch(err => Ember.debug(err));
		}
	}
});
