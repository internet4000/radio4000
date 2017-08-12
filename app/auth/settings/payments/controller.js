import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
	actions: {
		processStripeToken(token, args) {
			console.log('token & args', token, args);
		}
	}
});
