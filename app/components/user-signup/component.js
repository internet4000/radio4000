import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	actions: {
		submit(provider, email, password, passwordConfirmation) {
			if (password !== passwordConfirmation) {
				Ember.warn('Passwords do not match');
				return;
			}
			let data = {
				provider,
				email,
				password
			};
			get(this, 'onSignup')(data);
		}
	}
});
