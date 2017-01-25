import Ember from 'ember';

const {Component, get} = Ember;

export default Component.extend({
	actions: {
		submit(provider, email, password, passwordConfirmation) {
			if (password !== passwordConfirmation) {
				get(this, 'flashMessages').warning('Passwords do not match');
				return;
			}
			get(this, 'onSignup')(provider, email, password);
		}
	}
});
